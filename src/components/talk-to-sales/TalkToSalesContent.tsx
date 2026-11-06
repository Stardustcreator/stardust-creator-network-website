'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

/* =========================================================
   TALK TO SALES  (Figma: SCN › Talk to Sales)
   Desktop 16704-5613 · Mobile 16707-6033
   Confirmation desktop 16721-6590 · mobile 16781-1229

   Left: title + "How it works" (accordion on mobile)
   Right: Calendly inline booking widget, embedded on the page.
   When Calendly reports a booking, the card switches to the
   "You're booked in" confirmation.
========================================================= */

// Direct link to the "Talk To SCN Sales Team" 30-min event, so the calendar shows straight away.
const CALENDLY_URL = 'https://calendly.com/oluwatobi-stardustcreatornetwork/30min';
const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';
// hide_gdpr_banner keeps the widget clean; primary_color matches SCN purple
// (colour only applies on paid Calendly plans, otherwise ignored).
const CALENDLY_EMBED_URL = `${CALENDLY_URL}?hide_gdpr_banner=1&primary_color=57058b`;

const STEPS = [
  { title: 'Book a call', text: 'Pick a time that suits you and share a few details.' },
  {
    title: 'Find the right fit',
    text: "We'll recommend a package, or scope something custom for you.",
  },
  {
    title: 'We set up your account',
    text: "You'll get an email to create your Brand OS password.",
  },
  {
    title: 'Activate and start',
    text: 'Pay your first month to unlock Brand OS and start briefing creators.',
  },
];

const NEXT_STEPS = [
  'We meet on your call and talk through your goals, budget and timelines',
  'We recommend a package: a standard retainer or a custom scope',
  'Once you agree, we set up Brand OS and email you a link to create your password',
];

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M13 8H3M3 8L7 4M3 8L7 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDown({ className = '' }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-[#262626]"
    >
      <path
        d="M3 8.5L6.5 12L13 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HowItWorksList() {
  return (
    <ol className="flex flex-col gap-5">
      {STEPS.map((step, i) => (
        <li
          key={step.title}
          className="flex gap-4"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white font-lato text-[13px] font-bold text-[#57058B] shadow-[0_1px_2px_rgba(16,24,40,0.06)]">
            {i + 1}
          </span>
          <span>
            <span className="block font-lato text-[15px] font-medium leading-[22px] text-[#262626]">
              {step.title}
            </span>
            <span className="block font-lato text-[13px] leading-[20px] text-[#737373]">
              {step.text}
            </span>
          </span>
        </li>
      ))}
    </ol>
  );
}

/* =========================================================
   Calendly inline widget
   Uses Calendly's own embed markup (div with data-url + widget.js),
   which Calendly fills in automatically when its script loads.
   If the script was already loaded (e.g. after moving between pages),
   the widget is started by hand. The loading message hides as soon as
   Calendly's iframe appears, and a fallback link shows if it never does.
========================================================= */
function CalendlyInline({ onScheduled }: { onScheduled: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const hasIframe = () => Boolean(container.querySelector('iframe'));

    // Hide the loading message as soon as Calendly adds its iframe.
    const observer = new MutationObserver(() => {
      if (hasIframe()) setStatus('ready');
    });
    observer.observe(container, { childList: true, subtree: true });

    const startWidget = () => {
      if (!window.Calendly || hasIframe()) return;
      window.Calendly.initInlineWidget({ url: CALENDLY_EMBED_URL, parentElement: container });
    };

    let script = document.querySelector<HTMLScriptElement>(`script[src="${CALENDLY_SCRIPT}"]`);
    if (window.Calendly) {
      // Script already on the page: start the widget ourselves.
      startWidget();
    } else {
      if (!script) {
        script = document.createElement('script');
        script.src = CALENDLY_SCRIPT;
        script.async = true;
        document.body.appendChild(script);
      }
      // Calendly normally fills the div on its own; this is a backup.
      script.addEventListener('load', () => setTimeout(startWidget, 300));
      script.addEventListener('error', () => setStatus('failed'));
    }

    // If nothing has appeared after 12 seconds, offer the fallback link.
    const timer = window.setTimeout(() => {
      if (!hasIframe()) setStatus('failed');
    }, 12000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  // Calendly posts messages to the page when someone books.
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://calendly.com') return;
      if (event.data?.event === 'calendly.event_scheduled') onScheduled();
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [onScheduled]);

  return (
    <div className="relative">
      {status !== 'ready' && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center font-lato text-[13px] text-[#737373]">
          {status === 'loading' ? (
            'Loading available times…'
          ) : (
            <span className="pointer-events-auto">
              The calendar is taking a while to load.{' '}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#57058B] underline"
              >
                Open the booking calendar
              </a>
            </span>
          )}
        </div>
      )}
      {/* Calendly's standard inline embed */}
      <div
        ref={containerRef}
        className="calendly-inline-widget w-full"
        data-url={CALENDLY_EMBED_URL}
        style={{ minWidth: 320, height: 700 }}
      />
    </div>
  );
}

export default function TalkToSalesContent() {
  const [stepsOpen, setStepsOpen] = useState(false);
  const [booked, setBooked] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleScheduled = () => {
    setBooked(true);
    requestAnimationFrame(() =>
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );
  };

  return (
    <section className="relative w-full overflow-hidden bg-[linear-gradient(160deg,#FFFFFF_0%,#FBF6FF_45%,#F4EAFE_100%)] px-4 pb-16 pt-[104px] sm:px-6 sm:pt-[132px] lg:pb-24 lg:pt-[150px]">
      <div className="mx-auto grid w-full max-w-[1312px] grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_640px] lg:gap-16">
        {/* =================================================
            LEFT: intro + how it works
        ================================================== */}
        <div className="lg:pt-8">
          {!booked && (
            <Link
              href="/pricing"
              className="mb-6 hidden items-center gap-2 font-lato text-[14px] font-medium text-[#57058B] hover:underline lg:inline-flex"
            >
              <ArrowIcon />
              Back to pricing
            </Link>
          )}

          <h1 className="font-instrument-sans text-[32px] font-semibold leading-[40px] tracking-[-1.2px] text-[#262626] lg:text-[40px] lg:leading-[48px] lg:tracking-[-1.6px]">
            Talk to sales
          </h1>
          <p className="mt-2 max-w-[520px] font-lato text-[14px] leading-[22px] text-[#737373] lg:text-[16px] lg:leading-[24px]">
            Book a 30-minute call with our team. We&apos;ll help you choose the right retainer and
            get your brand set up to work with creators.
          </p>

          {/* Desktop: full list */}
          <div className="mt-8 hidden lg:block">
            <p className="mb-5 font-lato text-[12px] font-bold uppercase tracking-[0.6px] text-[#737373]">
              How it works
            </p>
            <HowItWorksList />
          </div>

          {/* Mobile: accordion */}
          <div className="mt-5 rounded-[12px] border border-[#E7E5E4] bg-white lg:hidden">
            <button
              type="button"
              onClick={() => setStepsOpen(open => !open)}
              aria-expanded={stepsOpen}
              aria-controls="how-it-works-panel"
              className="flex w-full items-center justify-between px-4 py-3 text-left"
            >
              <span className="font-lato text-[14px] text-[#262626]">How it works</span>
              <span className="flex items-center gap-2 font-lato text-[12px] text-[#737373]">
                4 steps
                <ChevronDown className={`transition-transform ${stepsOpen ? 'rotate-180' : ''}`} />
              </span>
            </button>
            {stepsOpen && (
              <div
                id="how-it-works-panel"
                className="border-t border-[#E7E5E4] px-4 py-4"
              >
                <HowItWorksList />
              </div>
            )}
          </div>
        </div>

        {/* =================================================
            RIGHT: Calendly booking or confirmation
        ================================================== */}
        <div
          ref={cardRef}
          className="scroll-mt-28 overflow-hidden rounded-[16px] border border-[#E7E5E4] bg-white shadow-[0_12px_32px_rgba(87,5,139,0.06)]"
        >
          {booked ? (
            <Confirmation />
          ) : (
            <>
              <div className="px-4 pt-4 sm:px-6 sm:pt-6">
                <h2 className="font-instrument-sans text-[20px] font-medium leading-[28px] text-[#262626]">
                  Pick a time for your call
                </h2>
                <p className="mt-0.5 font-lato text-[13px] leading-[20px] text-[#737373]">
                  Choose any open slot, then add your details. You&apos;ll get a calendar invite and
                  a confirmation email right away.
                </p>
              </div>
              <CalendlyInline onScheduled={handleScheduled} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Confirmation card (shown after Calendly reports a booking)
========================================================= */
function Confirmation() {
  return (
    <div
      role="status"
      className="p-4 sm:p-6"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ECFDF3] text-[#12B76A]">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M8 12.5L10.75 15L16 9.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <h2 className="mt-4 font-instrument-sans text-[22px] font-semibold leading-[30px] tracking-[-0.5px] text-[#262626]">
        You&apos;re booked in.
      </h2>
      <p className="mt-1 font-lato text-[13px] leading-[20px] text-[#737373]">
        Your calendar invite and confirmation email are on their way.
      </p>

      <p className="mt-6 font-lato text-[11px] font-bold uppercase tracking-[0.6px] text-[#737373]">
        What happens next
      </p>
      <ul className="mt-3 flex flex-col gap-3">
        {NEXT_STEPS.map(step => (
          <li
            key={step}
            className="flex items-start gap-3 font-lato text-[14px] leading-[20px] text-[#262626]"
          >
            <CheckIcon />
            {step}
          </li>
        ))}
      </ul>

      <p className="mt-5 inline-block rounded-[8px] border border-dashed border-[#E7E5E4] px-3 py-2 font-lato text-[12px] leading-[18px] text-[#737373]">
        Need to change the time? Use the link in your calendar invite to reschedule.
      </p>

      <Link
        href="/pricing"
        className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-[8px] border border-[#E7E5E4] bg-white font-lato text-[14px] font-medium text-[#262626] transition-colors hover:bg-[#FAFAF9]"
      >
        Back to pricing
      </Link>
    </div>
  );
}
