'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/* =========================================================
   LOGIN DROPDOWN (desktop nav bar)

   "Login" opens a small menu so people pick how they log in:
   - As a Creator  -> /signin
   - As a brand    -> not live yet, shown with a "Coming soon" pill
                      and not clickable

   When brand login is ready, give BRAND_LOGIN_HREF a URL and the
   option becomes a normal link.
========================================================= */

export const CREATOR_LOGIN_HREF = '/signin';
export const BRAND_LOGIN_HREF: string | null = null;

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ComingSoonPill() {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full bg-[#F0DDFF] px-2 py-[2px] text-[11px] font-semibold leading-[16px] text-[#7200C9]">
      Coming soon
    </span>
  );
}

export default function LoginDropdown() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="relative inline-flex self-center"
    >
      <button
        type="button"
        onClick={() => setOpen(value => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center justify-center gap-1.5 rounded-lg px-5 py-2 text-sm font-semibold transition-all hover:opacity-90"
        style={{
          backgroundColor: '#FFFFFF',
          color: '#57058B',
          border: '1.5px solid #E2E8F0',
        }}
      >
        Login
        <ChevronDown open={open} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-[#E2E8F0] bg-white p-1.5 shadow-[0_12px_32px_-8px_rgba(26,0,46,0.18)]"
        >
          <Link
            href={CREATOR_LOGIN_HREF}
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium text-[#262626] transition-colors hover:bg-[#FBF3FF] hover:text-[#57058B]"
          >
            As a Creator
          </Link>

          {BRAND_LOGIN_HREF ? (
            <Link
              href={BRAND_LOGIN_HREF}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium text-[#262626] transition-colors hover:bg-[#FBF3FF] hover:text-[#57058B]"
            >
              As a brand
            </Link>
          ) : (
            <span
              role="menuitem"
              aria-disabled="true"
              className="flex w-full cursor-not-allowed items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[#A3A3A3]"
            >
              As a brand
              <ComingSoonPill />
            </span>
          )}
        </div>
      )}
    </div>
  );
}
