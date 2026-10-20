import Link from 'next/link';

/* =========================================================
   BRAND PRICING  (Figma: SCN › New website › Plan & Pricing – Brands)

   - Hero & Plans: padding 160 top / 64 sides / 56 bottom, gap 56
   - Plan card: white, 1px #E7E5E4, radius 12, padding 32/24, gap 24
     Scale ("Most Popular"): 2px #57058B border + soft shadow
   - Big moment band: #FBF3FF, padding 48/64, gap 16
   - Every package: #FAFAF9, padding 48/64, gap 40
   Headings Instrument Sans, body Lato (site-wide font utilities).
========================================================= */

const BRAND_SIGNUP_HREF = 'https://brand-os.scn.africa/signup';

type MixRow = { tier: string; followers: string; count: number | null };

interface Plan {
  name: string;
  tagline: string;
  monthly: string;
  yearly: string;
  videos: string;
  videosNote: string;
  mix: MixRow[];
  bestFor: string;
  popular?: boolean;
}

function mix(nano: number, micro: number, mid: number, macro: number | null, mega: number | null) {
  return [
    { tier: 'Nano', followers: '1K–10K followers', count: nano },
    { tier: 'Micro', followers: '10K–100K followers', count: micro },
    { tier: 'Mid-tier', followers: '100K–500K followers', count: mid },
    { tier: 'Macro', followers: '500K–1M followers', count: macro },
    { tier: 'Mega', followers: '1M+ followers', count: mega },
  ];
}

const plans: Plan[] = [
  {
    name: 'Starter',
    tagline: 'Start showing up where your customers scroll',
    monthly: '₦5,000,000',
    yearly: '₦60,000,000 a year',
    videos: '8 videos a month',
    videosNote: 'From 8 creators, one creator per video',
    mix: mix(4, 3, 1, null, null),
    bestFor: 'Brands starting with creators: consistent content and grassroots reach',
  },
  {
    name: 'Growth',
    tagline: 'Be seen more, and believed more',
    monthly: '₦10,000,000',
    yearly: '₦120,000,000 a year',
    videos: '12 videos a month',
    videosNote: 'From 12 creators, one creator per video',
    mix: mix(6, 4, 2, null, null),
    bestFor: 'Brands adding reach and credibility to steady content',
  },
  {
    name: 'Scale',
    tagline: 'Show up strong in every market you serve',
    monthly: '₦20,000,000',
    yearly: '₦240,000,000 a year',
    videos: '17 videos a month',
    videosNote: 'From 17 creators, one creator per video',
    mix: mix(6, 4, 5, 1, 1),
    bestFor: 'Multi-SKU or multi-market brands that need reach with credibility',
    popular: true,
  },
  {
    name: 'Signature',
    tagline: 'Stay part of the conversation, all year round',
    monthly: '₦30,000,000',
    yearly: '₦360,000,000 a year',
    videos: '20 videos a month',
    videosNote: 'From 20 creators, one creator per video',
    mix: mix(6, 5, 5, 2, 2),
    bestFor: 'Large FMCG, banking and telco brands running an always-on creator presence',
  },
];

const packageColumns = [
  {
    title: 'Every video works twice',
    bullet: 'check' as const,
    items: [
      "Posted on the creator's own page",
      'Handed over to you, ready to post on your brand pages and run as ads for 12 months',
      'Comes with performance metrics: views, reach and engagement',
    ],
  },
  {
    title: 'Everything handled, nothing chased',
    bullet: 'check' as const,
    items: [
      'Creator sourcing, vetting and shortlisting by SCN, with final selection approved by you',
      'Briefs, contracts and creator payments handled on SCN',
      'Every piece reviewed before it goes live, and published only with your approval',
      'Monthly performance report',
    ],
  },
  {
    title: 'The fine print, made simple',
    bullet: 'dot' as const,
    items: [
      '12-month retainer, paid monthly in advance',
      'Prices include VAT',
      'Paid amplification and ad spend are separate',
      'Scripting and creative development are quoted separately',
      'Usage rights on handed-over videos last 12 months per video',
      'Pricing is set for the length of your contract and reviewed at renewal. Additional deliverables or scope are quoted separately.',
    ],
  },
];

/* =========================================================
   ICONS
========================================================= */

function ArrowRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M3.75 10H16.25M11.25 5L16.25 10L11.25 15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Check() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="mt-[2px] shrink-0"
    >
      <path
        d="M5 10.4L8.33 14.16L15 5.83"
        stroke="#A51CFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Dot() {
  return (
    <span
      aria-hidden="true"
      className="mt-[8px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#57058B]"
    />
  );
}

/* =========================================================
   PLAN CARD
========================================================= */

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`relative flex flex-col gap-6 rounded-[12px] bg-white px-6 py-8 ${
        plan.popular
          ? 'border-2 border-[#57058B] shadow-[0_4px_6px_-2px_rgba(0,0,0,0.03),0_12px_16px_-4px_rgba(0,0,0,0.08)]'
          : 'border border-[#E7E5E4]'
      }`}
    >
      {plan.popular && (
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-[#EDD1FF] bg-white px-3 py-[2px] font-lato text-[14px] font-medium leading-[20px] text-[#A51CFF]">
          Most Popular
        </span>
      )}

      {/* Name, price, CTA */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-instrument-sans text-[20px] font-medium leading-[24px] tracking-[-0.7px] text-[#262626]">
            {plan.name}
          </h3>
          <p className="min-h-[40px] font-lato text-[14px] leading-[20px] text-[#737373]">
            {plan.tagline}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="flex items-baseline gap-1">
            <span className="font-instrument-sans text-[30px] font-medium leading-[44px] tracking-[-1.2px] text-[#262626] lg:text-[32px]">
              {plan.monthly}
            </span>
            <span className="font-lato text-[12px] leading-[16px] text-[#737373]">/month</span>
          </p>
          <p className="font-lato text-[14px] leading-[20px] text-[#737373]">{plan.yearly}</p>
        </div>

        <Link
          href={BRAND_SIGNUP_HREF}
          className={`inline-flex h-10 w-full items-center justify-center gap-2 rounded-[8px] px-4 font-lato text-[14px] font-medium leading-[20px] transition-colors duration-200 ${
            plan.popular
              ? 'bg-[#57058B] text-white hover:bg-[#470473]'
              : 'border border-[#57058B] bg-white text-[#57058B] hover:bg-[#FBF3FF]'
          }`}
        >
          Start a Campaign Brief
          <ArrowRight />
        </Link>
      </div>

      <div className="h-px w-full bg-[#EEF0F1]" />

      {/* Videos + creator mix */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="font-instrument-sans text-[20px] font-medium leading-[24px] tracking-[-0.7px] text-[#262626]">
            {plan.videos}
          </p>
          <p className="font-lato text-[12px] leading-[16px] text-[#737373]">{plan.videosNote}</p>
        </div>

        <div className="flex flex-col">
          <p className="mb-2 font-lato text-[12px] font-bold uppercase leading-[16px] tracking-[0.2px] text-[#737373]">
            Creator mix
          </p>

          <ul className="flex flex-col">
            {plan.mix.map(row => (
              <li
                key={row.tier}
                className="flex items-center justify-between border-b border-[#F3F4F6] py-2 last:border-b-0"
              >
                <span className="flex flex-col">
                  <span className="font-lato text-[14px] font-medium leading-[20px] text-[#262626]">
                    {row.tier}
                  </span>
                  <span className="font-lato text-[12px] leading-[16px] text-[#737373]">
                    {row.followers}
                  </span>
                </span>
                <span
                  className={`font-lato text-[16px] font-medium leading-[24px] ${
                    row.count ? 'text-[#262626]' : 'text-[#A3A3A3]'
                  }`}
                >
                  {row.count ?? '—'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Best for */}
      <div className="mt-auto flex flex-col gap-1">
        <p className="font-lato text-[12px] font-bold uppercase leading-[16px] tracking-[0.2px] text-[#737373]">
          Best for
        </p>
        <p className="font-lato text-[14px] leading-[20px] text-[#262626]">{plan.bestFor}</p>
      </div>
    </div>
  );
}

/* =========================================================
   PAGE CONTENT
========================================================= */

export default function BrandPricingContent() {
  return (
    <div className="bg-white">
      {/* HERO & PLANS */}
      <section className="px-5 pb-14 pt-28 sm:px-8 lg:px-16 lg:pt-40">
        <div className="mx-auto flex w-full max-w-[1312px] flex-col items-center gap-10 lg:gap-14">
          <div className="flex max-w-[720px] flex-col items-center gap-4 text-center">
            <h1 className="max-w-[520px] text-balance font-instrument-sans text-[30px] font-semibold leading-[38px] tracking-[-1px] text-[#262626] sm:text-[40px] sm:leading-[48px] sm:tracking-[-1.5px]">
              Be the brand your customers see every month
            </h1>
            <p className="font-lato text-[16px] leading-[24px] text-[#737373]">
              A year-round creator presence that keeps your brand in feeds, in conversations and top
              of mind, with every creator, contract and report handled for you.
            </p>

            <p className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-2 rounded-[8px] border border-[#E7E5E4] bg-white px-4 py-2 font-lato text-[12px] leading-[16px] text-[#262626] sm:text-[14px] sm:leading-[20px]">
              <span>Annual plans, billed monthly</span>
              <span aria-hidden="true">·</span>
              <span>Prices are all-in, VAT included</span>
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-6 pt-3 sm:grid-cols-2 xl:grid-cols-4">
            {plans.map(plan => (
              <PlanCard
                key={plan.name}
                plan={plan}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ONE BIG MOMENT */}
      <section className="bg-[#FBF3FF] px-5 py-12 sm:px-8 lg:px-16">
        <div className="mx-auto flex max-w-[640px] flex-col items-center gap-4 text-center">
          <h2 className="font-instrument-sans text-[26px] font-semibold leading-[32px] tracking-[-1px] text-[#262626] sm:text-[32px] sm:leading-[40px] sm:tracking-[-1.2px]">
            Have one big moment to win?
          </h2>
          <p className="font-lato text-[16px] leading-[24px] text-[#737373]">
            Run a one-off campaign from ₦1,000,000 with the same vetted creators and hands-on
            management.
          </p>
          <Link
            href={BRAND_SIGNUP_HREF}
            className="mt-2 inline-flex h-10 items-center justify-center gap-2 rounded-[8px] bg-[#57058B] px-5 font-lato text-[14px] font-medium leading-[20px] text-white transition-colors duration-200 hover:bg-[#470473]"
          >
            Start a one-off campaign
            <ArrowRight />
          </Link>
        </div>
      </section>

      {/* WHAT COMES WITH EVERY PACKAGE */}
      <section className="bg-[#FAFAF9] px-5 py-12 sm:px-8 lg:px-16">
        <div className="mx-auto flex w-full max-w-[1312px] flex-col items-center gap-8 lg:gap-10">
          <h2 className="text-center font-instrument-sans text-[26px] font-semibold leading-[32px] tracking-[-1px] text-[#262626] sm:text-[32px] sm:leading-[40px] sm:tracking-[-1.2px]">
            What comes with every package
          </h2>

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            {packageColumns.map(column => (
              <div
                key={column.title}
                className="flex flex-col gap-4 rounded-[12px] border border-[#E7E5E4] bg-white p-6"
              >
                <h3 className="font-instrument-sans text-[18px] font-medium leading-[24px] tracking-[-0.5px] text-[#262626] sm:text-[20px]">
                  {column.title}
                </h3>
                <ul className="flex flex-col gap-4">
                  {column.items.map(item => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-lato text-[14px] leading-[20px] text-[#525252]"
                    >
                      {column.bullet === 'check' ? <Check /> : <Dot />}
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
