'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

/* =========================================================
   TALK TO SALES  (Figma: SCN › Talk to Sales)
   Desktop 16704-5613 · Mobile 16707-6033
   Confirmation desktop 16721-6590 · mobile 16781-1229

   Left: title + "How it works" (accordion on mobile)
   Right card, in three steps:
     1. "Your details" form (Figma form)
     2. Calendly calendar, with name and email filled in and the
        other details passed into Calendly's notes box, so they
        show on the booking the sales team sees
     3. "You're booked in" confirmation, once Calendly reports a booking
========================================================= */

// Direct link to the "Talk To SCN Sales Team" event, so the calendar shows straight away.
const CALENDLY_URL = 'https://calendly.com/oluwatobi-stardustcreatornetwork/30min';
const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';

const BUDGET_OPTIONS = ['Less than 1M', '1M - 3M', '3M - 5M', '5M - 10M', '10M - 20M', '20M+'];
// Only one option for now; add more here later (e.g. 'Custom scope', 'General demo').
const TOPIC_OPTIONS = ['Retainer package'];

const STEPS = [
  { title: 'Book a call', text: 'Share a few details and pick a time that suits you.' },
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

interface FormState {
  firstName: string;
  lastName: string;
  company: string;
  website: string;
  email: string;
  budget: string;
  phone: string;
  topic: string;
  goals: string;
}

type FieldErrors = Partial<Record<keyof FormState, string>>;
type Step = 'details' | 'schedule' | 'booked';

const EMPTY_FORM: FormState = {
  firstName: '',
  lastName: '',
  company: '',
  website: '',
  email: '',
  budget: '',
  phone: '',
  topic: TOPIC_OPTIONS[0],
  goals: '',
};

const inputClass =
  'h-11 w-full rounded-[8px] border bg-white px-3 font-lato text-[14px] text-[#262626] placeholder:text-[#A3A3A3] outline-none transition-colors focus:border-[#57058B] focus:ring-2 focus:ring-[#57058B]/15';

function borderFor(error?: string) {
  return error ? 'border-[#F04438]' : 'border-[#E7E5E4]';
}

/** Adds https:// when someone types "www.example.com". */
function normaliseWebsite(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.firstName.trim()) errors.firstName = 'Enter your first name';
  if (!form.lastName.trim()) errors.lastName = 'Enter your last name';
  if (!form.company.trim()) errors.company = 'Enter your company name';
  if (form.website.trim().length < 3) errors.website = 'Enter your website';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errors.email = 'Enter a valid work email';
  if (form.phone.replace(/\D/g, '').length < 7) errors.phone = 'Enter a valid phone number';
  return errors;
}

/** Calendly link with name and email filled in, and the rest in the notes box (a1). */
function buildCalendlyUrl(form: FormState) {
  const notes = [
    `Company: ${form.company.trim()}`,
    `Website: ${normaliseWebsite(form.website)}`,
    `Phone: ${form.phone.trim()}`,
    `Campaign budget: ${form.budget || 'Not given'}`,
    `Topic: ${form.topic}`,
    `Hoping to achieve: ${form.goals.trim() || 'Not given'}`,
  ].join('\n');

  const params = new URLSearchParams({
    hide_gdpr_banner: '1',
    primary_color: '57058b',
    name: `${form.firstName.trim()} ${form.lastName.trim()}`,
    email: form.email.trim(),
    a1: notes,
  });

  return `${CALENDLY_URL}?${params.toString()}`;
}

/** Adds Calendly's script once, so the calendar is ready by the time the form is done. */
function loadCalendlyScript() {
  if (typeof document === 'undefined') return null;
  let script = document.querySelector<HTMLScriptElement>(`script[src="${CALENDLY_SCRIPT}"]`);
  if (!script) {
    script = document.createElement('script');
    script.src = CALENDLY_SCRIPT;
    script.async = true;
    document.body.appendChild(script);
  }
  return script;
}

/* ---------------- Icons ---------------- */

function ArrowIcon({ direction = 'right' }: { direction?: 'left' | 'right' }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={direction === 'right' ? 'M3 8H13M13 8L9 4M13 8L9 12' : 'M13 8H3M3 8L7 4M3 8L7 12'}
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

/* ---------------- Small pieces ---------------- */

function Field({
  label,
  required,
  optional,
  error,
  htmlFor,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="font-lato text-[14px] leading-[20px] text-[#262626]"
      >
        {label}
        {required && <span aria-hidden="true"> *</span>}
        {optional && <span className="italic text-[#737373]"> (optional)</span>}
      </label>
      {children}
      {error && <p className="font-lato text-[12px] leading-[16px] text-[#D92D20]">{error}</p>}
    </div>
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
   Uses Calendly's own embed markup (div with data-url). If the
   script has already loaded, the widget is started by hand.
   The loading message hides once Calendly's iframe appears,
   and a fallback link shows if it never does.
========================================================= */
function CalendlyInline({ url, onScheduled }: { url: string; onScheduled: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const hasIframe = () => Boolean(container.querySelector('iframe'));

    const observer = new MutationObserver(() => {
      if (hasIframe()) setStatus('ready');
    });
    observer.observe(container, { childList: true, subtree: true });

    const startWidget = () => {
      if (!window.Calendly || hasIframe()) return;
      window.Calendly.initInlineWidget({ url, parentElement: container });
    };

    const script = loadCalendlyScript();
    const onLoad = () => setTimeout(startWidget, 300);
    const onError = () => setStatus('failed');

    if (window.Calendly) {
      startWidget();
    } else if (script) {
      script.addEventListener('load', onLoad);
      script.addEventListener('error', onError);
    }

    const timer = window.setTimeout(() => {
      if (!hasIframe()) setStatus('failed');
    }, 12000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      script?.removeEventListener('load', onLoad);
      script?.removeEventListener('error', onError);
    };
  }, [url]);

  // Calendly posts a message to the page when someone books.
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
                href={url}
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
      <div
        ref={containerRef}
        className="calendly-inline-widget w-full"
        data-url={url}
        style={{ minWidth: 320, height: 700 }}
      />
    </div>
  );
}

/* =========================================================
   Page
========================================================= */
export default function TalkToSalesContent() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [step, setStep] = useState<Step>('details');
  const [stepsOpen, setStepsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Start loading Calendly while people fill the form.
  useEffect(() => {
    loadCalendlyScript();
  }, []);

  const scrollToCard = () =>
    requestAnimationFrame(() =>
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(current => ({ ...current, [key]: value }));
    if (errors[key]) setErrors(current => ({ ...current, [key]: undefined }));
  }

  function handleContinue(event: React.FormEvent) {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(`tts-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setStep('schedule');
    scrollToCard();
  }

  const handleScheduled = useCallback(() => {
    setStep('booked');
    requestAnimationFrame(() =>
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[linear-gradient(160deg,#FFFFFF_0%,#FBF6FF_45%,#F4EAFE_100%)] px-4 pb-16 pt-[104px] sm:px-6 sm:pt-[132px] lg:pb-24 lg:pt-[150px]">
      <div className="mx-auto grid w-full max-w-[1312px] grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_640px] lg:gap-16">
        {/* =================================================
            LEFT: intro + how it works
        ================================================== */}
        <div className="lg:pt-8">
          {step !== 'booked' && (
            <Link
              href="/pricing"
              className="mb-6 hidden items-center gap-2 font-lato text-[14px] font-medium text-[#57058B] hover:underline lg:inline-flex"
            >
              <ArrowIcon direction="left" />
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
            RIGHT: details → calendar → confirmation
        ================================================== */}
        <div
          ref={cardRef}
          className="scroll-mt-28 overflow-hidden rounded-[16px] border border-[#E7E5E4] bg-white shadow-[0_12px_32px_rgba(87,5,139,0.06)]"
        >
          {step === 'details' && (
            <form
              onSubmit={handleContinue}
              noValidate
              className="p-4 sm:p-6"
            >
              <h2 className="font-instrument-sans text-[20px] font-medium leading-[28px] text-[#262626]">
                Your details
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-4">
                <Field
                  label="First name"
                  required
                  htmlFor="tts-firstName"
                  error={errors.firstName}
                >
                  <input
                    id="tts-firstName"
                    autoComplete="given-name"
                    placeholder="e.g. Ada"
                    value={form.firstName}
                    onChange={e => update('firstName', e.target.value)}
                    className={`${inputClass} ${borderFor(errors.firstName)}`}
                  />
                </Field>

                <Field
                  label="Last name"
                  required
                  htmlFor="tts-lastName"
                  error={errors.lastName}
                >
                  <input
                    id="tts-lastName"
                    autoComplete="family-name"
                    placeholder="e.g. Okonkwo"
                    value={form.lastName}
                    onChange={e => update('lastName', e.target.value)}
                    className={`${inputClass} ${borderFor(errors.lastName)}`}
                  />
                </Field>

                <Field
                  label="Company"
                  required
                  htmlFor="tts-company"
                  error={errors.company}
                >
                  <input
                    id="tts-company"
                    autoComplete="organization"
                    placeholder="e.g. QA Industries"
                    value={form.company}
                    onChange={e => update('company', e.target.value)}
                    className={`${inputClass} ${borderFor(errors.company)}`}
                  />
                </Field>

                <Field
                  label="Website URL"
                  required
                  htmlFor="tts-website"
                  error={errors.website}
                >
                  <input
                    id="tts-website"
                    type="url"
                    inputMode="url"
                    autoComplete="url"
                    placeholder="www.qaindustries.com"
                    value={form.website}
                    onChange={e => update('website', e.target.value)}
                    onBlur={e =>
                      e.target.value && update('website', normaliseWebsite(e.target.value))
                    }
                    className={`${inputClass} ${borderFor(errors.website)}`}
                  />
                </Field>

                <Field
                  label="Work email"
                  required
                  htmlFor="tts-email"
                  error={errors.email}
                >
                  <input
                    id="tts-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={e => update('email', e.target.value)}
                    className={`${inputClass} ${borderFor(errors.email)}`}
                  />
                </Field>

                <Field
                  label="Campaign Budget"
                  htmlFor="tts-budget"
                >
                  <div className="relative">
                    <select
                      id="tts-budget"
                      value={form.budget}
                      onChange={e => update('budget', e.target.value)}
                      className={`${inputClass} ${borderFor()} appearance-none pr-10 ${
                        form.budget ? '' : 'text-[#A3A3A3]'
                      }`}
                    >
                      <option value="">Select a range (₦)</option>
                      {BUDGET_OPTIONS.map(option => (
                        <option
                          key={option}
                          value={option}
                          className="text-[#262626]"
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#525252]" />
                  </div>
                </Field>

                <Field
                  label="Phone number"
                  required
                  htmlFor="tts-phone"
                  error={errors.phone}
                >
                  <input
                    id="tts-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+234 xxx xxx xxxx"
                    value={form.phone}
                    onChange={e => update('phone', e.target.value)}
                    className={`${inputClass} ${borderFor(errors.phone)}`}
                  />
                </Field>

                <Field
                  label="What would you like to discuss?"
                  required
                  htmlFor="tts-topic"
                >
                  <div className="relative">
                    <select
                      id="tts-topic"
                      value={form.topic}
                      onChange={e => update('topic', e.target.value)}
                      className={`${inputClass} ${borderFor()} appearance-none pr-10`}
                    >
                      {TOPIC_OPTIONS.map(option => (
                        <option
                          key={option}
                          value={option}
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#525252]" />
                  </div>
                </Field>

                <div className="sm:col-span-2">
                  <Field
                    label="What are you hoping to achieve?"
                    optional
                    htmlFor="tts-goals"
                  >
                    <textarea
                      id="tts-goals"
                      rows={3}
                      placeholder="e.g. Launch our new product with 10 creators in Lagos"
                      value={form.goals}
                      onChange={e => update('goals', e.target.value)}
                      className={`${inputClass} ${borderFor()} h-auto min-h-[88px] resize-y py-3`}
                    />
                  </Field>
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-[#57058B] font-lato text-[15px] font-medium text-white transition-colors hover:bg-[#45046F]"
              >
                Continue to pick a time
                <ArrowIcon />
              </button>

              <p className="mt-4 text-center font-lato text-[12px] leading-[18px] text-[#737373]">
                Next, pick a time on our calendar. We only use your details to prepare for the call.
              </p>
            </form>
          )}

          {step === 'schedule' && (
            <>
              <div className="flex items-start justify-between gap-4 px-4 pt-4 sm:px-6 sm:pt-6">
                <div>
                  <h2 className="font-instrument-sans text-[20px] font-medium leading-[28px] text-[#262626]">
                    Pick a time for your call
                  </h2>
                  <p className="mt-0.5 font-lato text-[13px] leading-[20px] text-[#737373]">
                    Booking for {form.firstName.trim()} {form.lastName.trim()} at{' '}
                    {form.company.trim()}. All times in your local time zone.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="shrink-0 font-lato text-[13px] font-medium text-[#57058B] hover:underline"
                >
                  Edit details
                </button>
              </div>
              <CalendlyInline
                url={buildCalendlyUrl(form)}
                onScheduled={handleScheduled}
              />
            </>
          )}

          {step === 'booked' && <Confirmation form={form} />}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Confirmation card (after Calendly reports a booking)
========================================================= */
function Confirmation({ form }: { form: FormState }) {
  const rows: Array<[string, string]> = [
    ['Name', `${form.firstName} ${form.lastName}`.trim()],
    ['Company', form.company],
    ['Work email', form.email],
    ['Website URL', normaliseWebsite(form.website)],
    ['Campaign Budget', form.budget || 'Not given'],
    ['Phone', form.phone],
    ['Topic', form.topic],
  ];

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
        You&apos;re booked in, {form.firstName.trim()}.
      </h2>
      <p className="mt-1 font-lato text-[13px] leading-[20px] text-[#737373]">
        Your calendar invite is on its way to {form.email.trim()}.
      </p>

      <dl className="mt-5 overflow-hidden rounded-[10px] bg-[#FFF7EC] px-4">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-4 border-b border-[#F3E6D3] py-3 last:border-b-0"
          >
            <dt className="font-lato text-[13px] text-[#737373]">{label}</dt>
            <dd className="break-all text-right font-lato text-[13px] text-[#262626]">{value}</dd>
          </div>
        ))}
      </dl>

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
