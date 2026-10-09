'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { buildForwardedUtmQuery } from '@/lib/attribution';

/* =========================================================
   PLAN & PRICING  (Figma: SCN (For Uche) › Sign up › Plan & Pricing)

   Design tokens used below (from the Figma file):
   - Text/Primary #262626, Text/Secondary #737373
   - Surface/Action & Stroke/Action #57058B, Surface/Action 2 #A51CFF
   - Stroke/Primary #E7E5E4, Stroke/Tertiary #F3F4F6, divider #EEF0F1
   - Corner radius: lg 12px, md 8px, theme/radius 8px
   - H2/Bold 40/56 -1.6px · H3/Medium 32/44 -1.2px · H6 16/24 -0.2px
     H7 14/20 0px · H8/Bold 12/16 +0.2px — all Lato
========================================================= */

type BillingPeriod = 'annual' | 'monthly';
type PlanId = 'starter' | 'builder';

// The design shows annual pricing only (the billing toggle is hidden in
// Figma), so billing is fixed to annual. The value is still forwarded in
// the CTA link exactly as before.
const BILLING: BillingPeriod = 'annual';

// Starter: what you get today (Figma no longer shows a value per row).
const STARTER_FEATURES = [
  'Pricing Calculator',
  'Rate card Builder',
  'Invoicing',
  '7% platform fee on transaction value',
  'Email Captures',
  'Email Broadcasts',
  'Community access',
  'Brand Deals',
  'Templates',
];

// Builder: everything else stays hidden until launch, so the design shows
// one row plus a blurred "coming soon" teaser.
const BUILDER_FEATURES = ['Everything in Starter'];

// Widths of the blurred placeholder bars in the teaser (from Figma).
const TEASER_BARS = [265, 205, 300, 220, 260, 190, 245, 215];

/* =========================================================
   ICONS (drawn to the Figma vectors)
========================================================= */

function CheckmarkIcon({ id }: { id: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <defs>
        <linearGradient
          id={id}
          x1="5"
          y1="5.83"
          x2="15"
          y2="14.16"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A51CFF" />
          <stop
            offset="1"
            stopColor="#57058B"
          />
        </linearGradient>
      </defs>
      <path
        d="M5 10.4L8.33 14.16L15 5.83"
        stroke={`url(#${id})`}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M3.75 10H16.25M11.25 5L16.25 10L11.25 15"
        stroke="#F8FAFC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockCircleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle
        cx="10"
        cy="10"
        r="8.33"
        stroke="#57058B"
        strokeWidth="1.5"
      />
      <path
        d="M10 5V10L13.33 11.67"
        stroke="#57058B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   SHARED PIECES
========================================================= */

function CardHeader({ name, price, caption }: { name: string; price: string; caption: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[16px] font-bold leading-[24px] tracking-[-0.2px] text-[#262626]">
        {name}
      </p>
      <p className="text-[32px] font-medium leading-[44px] tracking-[-1.2px] text-[#262626]">
        {price}
      </p>
      <p className="text-[14px] font-normal leading-[20px] text-[#737373]">{caption}</p>
    </div>
  );
}

function FeatureRow({ id, label }: { id: string; label: string }) {
  return (
    <li className="flex items-center gap-[2px] rounded-[8px] border-b border-[#F3F4F6] bg-white pb-2 pt-1">
      <span className="flex min-h-[23.33px] min-w-0 items-center gap-2">
        <CheckmarkIcon id={id} />
        <span className="text-[14px] font-normal leading-[20px] text-[#737373]">{label}</span>
      </span>
    </li>
  );
}

function FeaturesList({ plan }: { plan: PlanId }) {
  const features = plan === 'starter' ? STARTER_FEATURES : BUILDER_FEATURES;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[12px] font-bold uppercase leading-[16px] tracking-[0.2px] text-[#737373]">
        What you get
      </p>

      <ul className="flex flex-col gap-4">
        {features.map(feature => (
          <FeatureRow
            key={feature}
            id={`scn-check-${plan}-${feature.replace(/\W+/g, '-')}`}
            label={feature}
          />
        ))}
      </ul>
    </div>
  );
}

/* Builder "coming soon" teaser (Figma: Coming soon teaser).
   Dashed #EDD1FF box on #FBF3FF with blurred placeholder rows and a
   message card in the middle. It grows to fill the rest of the card so
   both cards end at the same height. */

function ComingSoonTeaser() {
  return (
    <div className="relative flex min-h-[300px] flex-1 flex-col overflow-hidden rounded-[16px] border border-dashed border-[#EDD1FF] bg-[#FBF3FF] px-5 py-6">
      {/* Placeholder rows, blurred so nothing can be read */}
      <ul
        aria-hidden="true"
        className="flex flex-1 flex-col justify-between gap-4 blur-[1.5px]"
      >
        {TEASER_BARS.map((width, index) => (
          <li
            key={index}
            className="flex h-5 items-center gap-3"
          >
            <span className="h-[14px] w-[14px] shrink-0 rounded-full bg-[#F4E3FF]" />
            <span
              className="h-3 max-w-[calc(100%-26px)] rounded-[6px] bg-[#F4E3FF]"
              style={{ width }}
            />
          </li>
        ))}
      </ul>

      {/* Message card */}
      <div className="absolute inset-0 flex items-center justify-center p-5">
        <div className="flex flex-col items-center gap-[6px] rounded-[14px] bg-white px-5 py-4 text-center shadow-[0_8px_24px_-4px_rgba(77,13,128,0.12)]">
          <span
            aria-hidden="true"
            className="text-[16px] leading-[24px]"
          >
            ✨
          </span>
          <p className="text-[14px] font-semibold leading-[20px] text-[#262626]">
            Plus more exciting features
          </p>
          <p className="text-[12px] font-normal leading-[16px] text-[#737373]">
            Revealed when Builder launches
          </p>
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-[#EEF0F1]" />;
}

/* =========================================================
   SECTION
========================================================= */

interface PlanPricingSectionProps {
  ctaBase?: string;
}

export default function PlanPricingSection({
  ctaBase = '/onboarding/create-account',
}: PlanPricingSectionProps) {
  const [utmQuery, setUtmQuery] = useState('');

  useEffect(() => {
    setUtmQuery(buildForwardedUtmQuery(window.location.search));
  }, []);

  const starterHref = `${ctaBase}?plan=starter&billing=${BILLING}${utmQuery ? `&${utmQuery}` : ''}`;

  return (
    <section
      className="px-5 pb-20 pt-10 sm:px-8 sm:pb-32 sm:pt-20"
      style={{ fontFamily: "var(--font-lato-pp, 'Lato'), 'Lato', sans-serif" }}
    >
      <div className="mx-auto flex w-full max-w-[1312px] flex-col gap-10 sm:gap-14">
        {/* =================================================
            HEADING
        ================================================== */}

        <div className="flex flex-col text-center">
          <h1 className="text-[28px] font-bold leading-[36px] tracking-[-1px] text-[#262626] sm:text-[40px] sm:leading-[56px] sm:tracking-[-1.6px]">
            Start free and get paid what you&apos;re worth
          </h1>

          <p className="mt-2 text-[16px] font-normal leading-[24px] tracking-[-0.2px] text-[#737373] sm:mt-0">
            Price your work, send professional rate cards and invoices, and land brand deals.
          </p>
        </div>

        {/* =================================================
            PLAN CARDS
        ================================================== */}

        <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
          {/* STARTER */}

          <div className="flex flex-col rounded-[12px] bg-white px-5 pb-8 pt-6 shadow-[0_0_0_2.5px_#57058B,0_4px_6px_-2px_rgba(0,0,0,0.03),0_12px_16px_-4px_rgba(0,0,0,0.08)] sm:px-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-6">
                  <CardHeader
                    name="Starter"
                    price="₦0/month"
                    caption="Free Forever."
                  />

                  <Link
                    href={starterHref}
                    className="flex h-[46px] w-full items-center justify-center gap-1 rounded-[8px] bg-[#57058B] px-5 py-3 text-[14px] font-medium leading-[20px] text-[#F8FAFC] transition-opacity duration-200 hover:opacity-90"
                  >
                    Get Started for Free
                    <ArrowRightIcon />
                  </Link>
                </div>

                <Divider />
              </div>

              <FeaturesList plan="starter" />
            </div>
          </div>

          {/* BUILDER */}

          <div className="relative flex flex-col rounded-[12px] bg-white px-5 pb-8 pt-6 shadow-[0_0_0_1.5px_#E7E5E4,0_1px_2px_0_rgba(0,0,0,0.06),0_1px_3px_0_rgba(0,0,0,0)] sm:px-8">
            {/* Coming soon pill, centred on the card's top edge */}
            <span className="absolute left-1/2 top-0 inline-flex h-9 -translate-x-1/2 -translate-y-1/2 items-center whitespace-nowrap rounded-full bg-white px-4 py-[6px] text-[16px] font-semibold leading-[24px] tracking-[-0.2px] text-[#A51CFF] shadow-[inset_0_1px_8px_0_rgba(0,0,0,0.25)]">
              Coming soon
            </span>

            <div className="flex flex-1 flex-col gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-6">
                  <CardHeader
                    name="Builder"
                    price="₦6,250/month"
                    caption="Billed as ₦75,000/year"
                  />

                  <div className="flex w-full items-start gap-[10px] rounded-[8px] border border-[#57058B] bg-white px-[14px] py-3">
                    <ClockCircleIcon />
                    <p className="text-[14px] font-normal leading-[20px] text-[#262626]">
                      Builder isn&apos;t available yet. Start on Starter now and upgrade when
                      Builder launches.
                    </p>
                  </div>
                </div>

                <Divider />
              </div>

              <FeaturesList plan="builder" />

              <ComingSoonTeaser />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
