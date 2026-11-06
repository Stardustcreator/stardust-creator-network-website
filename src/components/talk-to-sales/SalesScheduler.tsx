'use client';

import { useEffect, useMemo, useState } from 'react';
import { formatDayHeading, formatTime12, watDateKey } from '@/lib/sales-call';

/* =========================================================
   Talk to Sales scheduler (Figma: "Pick a time for your call")
   Calendar on the left, open slots for the chosen day on the right.
   Stacks on small screens (used inside the mobile bottom sheet).
========================================================= */

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

interface SalesSchedulerProps {
  /** Open slots, ISO strings. */
  slots: string[];
  loading: boolean;
  error?: string | null;
  selected: string | null;
  onSelect: (slot: string) => void;
  /** Stack calendar and times (mobile sheet). */
  stacked?: boolean;
}

function ClockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r="6.25"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M8 4.75V8L10 9.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="1.75"
        y="4"
        width="8.5"
        height="8"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M10.25 7L14.25 4.75V11.25L10.25 9"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r="6.25"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M1.75 8H14.25M8 1.75C9.75 3.5 10.5 5.75 10.5 8C10.5 10.25 9.75 12.5 8 14.25C6.25 12.5 5.5 10.25 5.5 8C5.5 5.75 6.25 3.5 8 1.75Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={direction === 'left' ? 'M10 3.5L5.5 8L10 12.5' : 'M6 3.5L10.5 8L6 12.5'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function monthLabel(monthKey: string) {
  const [y, m] = monthKey.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(y, m - 1, 1)));
}

function shiftMonth(monthKey: string, by: number) {
  const [y, m] = monthKey.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1 + by, 1)).toISOString().slice(0, 7);
}

export default function SalesScheduler({
  slots,
  loading,
  error,
  selected,
  onSelect,
  stacked = false,
}: SalesSchedulerProps) {
  // Group slots by WAT day.
  const slotsByDay = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const slot of slots) {
      const key = watDateKey(new Date(slot));
      (map[key] ||= []).push(slot);
    }
    return map;
  }, [slots]);

  const openDays = useMemo(() => Object.keys(slotsByDay).sort(), [slotsByDay]);
  const todayKey = watDateKey(new Date());

  const [activeDay, setActiveDay] = useState<string | null>(
    selected ? watDateKey(new Date(selected)) : null
  );
  const [month, setMonth] = useState<string>((activeDay ?? todayKey).slice(0, 7));

  // Once slots arrive, open the first day with times.
  useEffect(() => {
    if (!activeDay && openDays.length > 0) {
      setActiveDay(openDays[0]);
      setMonth(openDays[0].slice(0, 7));
    }
  }, [activeDay, openDays]);

  const minMonth = todayKey.slice(0, 7);
  const maxMonth = (openDays[openDays.length - 1] ?? todayKey).slice(0, 7);

  const [year, monthIndex] = month.split('-').map(Number);
  const firstWeekday = new Date(Date.UTC(year, monthIndex - 1, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, monthIndex, 0)).getUTCDate();

  const cells: Array<string | null> = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => `${month}-${String(i + 1).padStart(2, '0')}`),
  ];

  const daySlots = activeDay ? (slotsByDay[activeDay] ?? []) : [];

  return (
    <div className="overflow-hidden rounded-[12px] border border-[#E7E5E4] bg-white">
      {/* Header */}
      <div className="border-b border-[#E7E5E4] px-4 py-3">
        <p className="font-instrument-sans text-[16px] font-medium leading-[24px] text-[#262626]">
          Talk to sales
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 font-lato text-[12px] leading-[18px] text-[#737373]">
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon />
            30 min appointments
          </span>
          <span className="inline-flex items-center gap-1.5">
            <VideoIcon />
            Google Meet link added after booking
          </span>
        </div>
      </div>

      <div
        className={`grid grid-cols-1 ${
          stacked ? '' : 'sm:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]'
        }`}
      >
        {/* Calendar */}
        <div className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-lato text-[14px] font-medium text-[#262626]">{monthLabel(month)}</p>
            <div className="flex items-center gap-1 text-[#525252]">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => setMonth(current => shiftMonth(current, -1))}
                disabled={month <= minMonth}
                className="rounded-md p-1 hover:bg-[#F5F5F4] disabled:opacity-30"
              >
                <Chevron direction="left" />
              </button>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => setMonth(current => shiftMonth(current, 1))}
                disabled={month >= maxMonth}
                className="rounded-md p-1 hover:bg-[#F5F5F4] disabled:opacity-30"
              >
                <Chevron direction="right" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-y-1 text-center font-lato">
            {WEEKDAYS.map((day, i) => (
              <span
                key={`${day}-${i}`}
                className="pb-1 text-[11px] text-[#737373]"
              >
                {day}
              </span>
            ))}

            {cells.map((key, i) => {
              if (!key) return <span key={`blank-${i}`} />;
              const dayNumber = Number(key.slice(8));
              const open = Boolean(slotsByDay[key]);
              const isActive = key === activeDay;

              return (
                <span
                  key={key}
                  className="flex justify-center"
                >
                  <button
                    type="button"
                    disabled={!open}
                    onClick={() => setActiveDay(key)}
                    aria-pressed={isActive}
                    aria-label={formatDayHeading(key)}
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] transition-colors ${
                      isActive
                        ? 'bg-[#57058B] font-bold text-white'
                        : open
                          ? 'bg-[#F7EDFF] font-medium text-[#57058B] hover:bg-[#EBD5FF]'
                          : 'cursor-default text-[#A3A3A3]'
                    }`}
                  >
                    {dayNumber}
                  </button>
                </span>
              );
            })}
          </div>
        </div>

        {/* Times */}
        <div
          className={`border-t border-[#E7E5E4] p-4 ${stacked ? '' : 'sm:border-l sm:border-t-0'}`}
        >
          {loading ? (
            <p className="font-lato text-[13px] text-[#737373]">Loading open times…</p>
          ) : error ? (
            <p className="font-lato text-[13px] text-[#B42318]">{error}</p>
          ) : !activeDay ? (
            <p className="font-lato text-[13px] text-[#737373]">
              No open times right now. Please check back soon.
            </p>
          ) : (
            <>
              <p className="font-lato text-[14px] font-medium text-[#262626]">
                {formatDayHeading(activeDay)}
              </p>
              <p className="mt-0.5 font-lato text-[12px] text-[#737373]">
                {daySlots.length} open slot{daySlots.length === 1 ? '' : 's'}
              </p>

              <div
                className={`mt-3 grid gap-2 ${stacked ? 'grid-cols-2' : 'grid-cols-1'} ${
                  stacked ? '' : 'sm:max-h-[260px] sm:overflow-y-auto sm:pr-1'
                }`}
              >
                {daySlots.map(slot => {
                  const isSelected = slot === selected;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => onSelect(slot)}
                      aria-pressed={isSelected}
                      className={`h-9 rounded-[8px] border font-lato text-[14px] transition-colors ${
                        isSelected
                          ? 'border-[#57058B] bg-[#57058B] font-medium text-white'
                          : 'border-[#E7E5E4] bg-white text-[#57058B] hover:border-[#57058B]'
                      }`}
                    >
                      {formatTime12(new Date(slot))}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 border-t border-[#E7E5E4] px-4 py-2.5 font-lato text-[11px] text-[#737373]">
        <span className="inline-flex items-center gap-1.5">
          <GlobeIcon />
          (GMT+01:00) West Africa Time – Lagos
        </span>
        <span className="hidden text-[#A3A3A3] sm:inline">Powered by Google Calendar</span>
      </div>
    </div>
  );
}
