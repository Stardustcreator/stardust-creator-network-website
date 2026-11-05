/* =========================================================
   TALK TO SALES – shared booking rules
   Used by the /talk-to-sales page and the /api/sales-call routes,
   so the slots the page shows are the slots the API accepts.

   All times are West Africa Time (Africa/Lagos, UTC+1, no DST).
========================================================= */

export const SALES_TIME_ZONE = 'Africa/Lagos';
const WAT_OFFSET_HOURS = 1;

/** Length of a sales call. */
export const SLOT_MINUTES = 30;

/** Start times offered each weekday, in WAT (24h). Edit to change availability. */
export const SLOT_TIMES = [
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
];

/** Days (0 = Sunday) on which calls can be booked. */
export const BOOKABLE_WEEKDAYS = [1, 2, 3, 4, 5];

/** How far ahead people can book, and the minimum notice for a slot. */
export const BOOKING_WINDOW_DAYS = 60;
export const MIN_NOTICE_MINUTES = 120;

export const BUDGET_OPTIONS = [
  'Less than 1M',
  '1M - 3M',
  '3M - 5M',
  '5M - 10M',
  '10M - 20M',
  '20M+',
] as const;

export const TOPIC_OPTIONS = ['Retainer package', 'Single campaign', 'Something else'] as const;

export type Topic = (typeof TOPIC_OPTIONS)[number];

/** "YYYY-MM-DD" for the WAT calendar day a moment falls on. */
export function watDateKey(date: Date): string {
  const shifted = new Date(date.getTime() + WAT_OFFSET_HOURS * 60 * 60 * 1000);
  return shifted.toISOString().slice(0, 10);
}

/** The moment a WAT date ("YYYY-MM-DD") and time ("HH:MM") refer to. */
export function watToDate(dateKey: string, time: string): Date {
  const [y, m, d] = dateKey.split('-').map(Number);
  const [hh, mm] = time.split(':').map(Number);
  return new Date(Date.UTC(y, m - 1, d, hh - WAT_OFFSET_HOURS, mm));
}

/** Every slot the rules allow between now (+ notice) and the end of the booking window. */
export function candidateSlots(now: Date = new Date()): Date[] {
  const earliest = now.getTime() + MIN_NOTICE_MINUTES * 60 * 1000;
  const slots: Date[] = [];
  const startKey = watDateKey(now);
  const [y, m, d] = startKey.split('-').map(Number);

  for (let offset = 0; offset <= BOOKING_WINDOW_DAYS; offset += 1) {
    const day = new Date(Date.UTC(y, m - 1, d + offset));
    if (!BOOKABLE_WEEKDAYS.includes(day.getUTCDay())) continue;
    const key = day.toISOString().slice(0, 10);

    for (const time of SLOT_TIMES) {
      const slot = watToDate(key, time);
      if (slot.getTime() >= earliest) slots.push(slot);
    }
  }

  return slots;
}

/** True when the ISO string is one of the slots the rules allow right now. */
export function isAllowedSlot(iso: string, now: Date = new Date()): boolean {
  const time = new Date(iso).getTime();
  if (Number.isNaN(time)) return false;
  return candidateSlots(now).some(slot => slot.getTime() === time);
}

/** "Wed 28 Oct · 11:00 WAT" */
export function formatSlotShort(date: Date): string {
  const day = new Intl.DateTimeFormat('en-GB', {
    timeZone: SALES_TIME_ZONE,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(date);
  return `${day.replace(',', '')} · ${formatTime24(date)} WAT`;
}

/** "Wed 28 Oct at 11:00 WAT" */
export function formatSlotSentence(date: Date): string {
  return formatSlotShort(date).replace(' · ', ' at ');
}

/** "11:00" */
export function formatTime24(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: SALES_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

/** "10:00am" */
export function formatTime12(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: SALES_TIME_ZONE,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
    .format(date)
    .replace(/\s/g, '')
    .toLowerCase();
}

/** "Tuesday, November 3" */
export function formatDayHeading(dateKey: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: SALES_TIME_ZONE,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(watToDate(dateKey, '12:00'));
}

/** Adds https:// when someone types "www.example.com". */
export function normaliseWebsite(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}
