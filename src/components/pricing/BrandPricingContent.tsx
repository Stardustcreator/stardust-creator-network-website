import Image from 'next/image';

/* =========================================================
   BRAND PRICING  (Figma: SCN › Plan & Pricing
   Desktop node 16696-5243 · Mobile node 16698-5831)

   1. Hero: heading + intro
   2. Two offers: "Launch a single campaign" and
      "Partner with us on a retainer" (highlighted card)
   3. Lilac band: "Every plan is priced to your goals and budget."
   4. Grey band: brands already showing up with Stardust
   Headings Instrument Sans, body Lato (site-wide font utilities).
   Some copy differs on mobile, matching the two Figma frames.
========================================================= */

const BRAND_SIGNUP_HREF = 'https://brand-os.scn.africa/signup';
// Sales CTAs go to the Talk to Sales booking page.
const SALES_HREF = '/talk-to-sales';

interface Offer {
  title: string;
  tagline: string;
  mobileIntro: string;
  bestFor: string;
  priced: string;
  features: string[];
  cta: string;
  mobileCta: string;
  href: string;
  featured?: boolean;
}

const offers: Offer[] = [
  {
    title: 'Launch a single campaign',
    tagline: 'Start showing up where your customers scroll',
    mobileIntro: 'Brief us, approve the creators, and we handle the rest. Pay per campaign.',
    bestFor: 'Launches, promos & new markets',
    priced: 'Per campaign, all-in',
    features: [
      'Vetted creators, shortlisted for your approval',
      'You sign off on every piece before it goes live',
      'A campaign report once creators post',
      'Contracts and creator payments handled for you',
    ],
    cta: 'Start a Campaign Brief',
    mobileCta: 'Start a Campaign Brief',
    href: BRAND_SIGNUP_HREF,
  },
  {
    title: 'Partner with us on a retainer',
    tagline: 'An always-on creator presence, run for you all year.',
    mobileIntro: 'A creator programme built around your goals, run for you every month.',
    bestFor: 'Year-round growth & recall',
    priced: 'Monthly, on a 12-month plan',
    features: [
      'Fresh creator videos every month',
      'A creator mix shaped around your goals',
      'You approve every video before it goes live',
      'Monthly performance report and strategy call',
    ],
    cta: 'Talk to Sales',
    mobileCta: 'Book a strategy call',
    href: SALES_HREF,
    featured: true,
  },
];

const brandLogos = [
  { src: '/brand logos/logo 1.webp', alt: 'Honeywell', width: 91, height: 60 },
  { src: '/brand logos/original leadway.webp', alt: 'Leadway', width: 464, height: 404 },
  { src: '/brand logos/logo 3.webp', alt: 'AXA', width: 304, height: 224 },
  { src: '/brand logos/logo 5.webp', alt: 'FMN', width: 336, height: 224 },
  { src: '/brand logos/logo 6.webp', alt: 'Partner brand', width: 256, height: 256 },
];

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="mt-[3px] shrink-0 text-[#57058B]"
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
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OfferCard({ offer }: { offer: Offer }) {
  const external = offer.href.startsWith('http');

  return (
    <article
      className={`flex h-full flex-col rounded-[12px] bg-white p-4 sm:p-6 ${
        offer.featured
          ? 'border-[1.5px] border-[#57058B] shadow-[0_8px_24px_rgba(87,5,139,0.08)]'
          : 'border border-[#E7E5E4]'
      }`}
    >
      {/* Title */}
      <h2 className="font-instrument-sans text-[22px] font-medium leading-[30px] tracking-[-0.5px] text-[#262626] sm:text-[24px] sm:leading-[32px]">
        {offer.title}
      </h2>
      <p className="mt-1 font-lato text-[13px] leading-[20px] text-[#737373] sm:text-[14px]">
        {offer.tagline}
      </p>

      {/* Best for / Priced */}
      <dl className="mt-5 grid grid-cols-2 gap-4 rounded-[8px] bg-[#FAFAF9] p-4">
        <div>
          <dt className="font-lato text-[11px] font-bold uppercase leading-[16px] tracking-[0.4px] text-[#737373]">
            Best for
          </dt>
          <dd className="mt-1 font-lato text-[14px] leading-[20px] text-[#262626] sm:text-[15px]">
            {offer.bestFor}
          </dd>
        </div>
        <div>
          <dt className="font-lato text-[11px] font-bold uppercase leading-[16px] tracking-[0.4px] text-[#737373]">
            Priced
          </dt>
          <dd className="mt-1 font-lato text-[14px] leading-[20px] text-[#262626] sm:text-[15px]">
            {offer.priced}
          </dd>
        </div>
      </dl>

      <hr className="my-5 border-[#E7E5E4]" />

      {/* Mobile-only intro line (in the mobile Figma frame only) */}
      <p className="mb-4 font-lato text-[14px] leading-[22px] text-[#737373] sm:hidden">
        {offer.mobileIntro}
      </p>

      {/* Features */}
      <ul className="mb-6 flex flex-col gap-3 sm:flex-1">
        {offer.features.map(feature => (
          <li
            key={feature}
            className="flex items-start gap-3 font-lato text-[14px] leading-[22px] text-[#262626]"
          >
            <CheckIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={offer.href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-[8px] font-lato text-[14px] font-medium transition-colors ${
          offer.featured
            ? 'bg-[#57058B] text-white hover:bg-[#45046F]'
            : 'border border-[#57058B] bg-white text-[#57058B] hover:bg-[#FBF3FF]'
        }`}
      >
        <span className="sm:hidden">{offer.mobileCta}</span>
        <span className="hidden sm:inline">{offer.cta}</span>
        <ArrowIcon />
      </a>
    </article>
  );
}

export default function BrandPricingContent() {
  return (
    <>
      {/* =====================================================
          HERO + OFFERS
      ===================================================== */}
      <section className="w-full bg-white px-4 pb-12 pt-[112px] sm:px-6 sm:pb-16 sm:pt-[140px] lg:pt-[150px]">
        <div className="mx-auto w-full max-w-[1256px]">
          <div className="mx-auto max-w-[680px] text-center">
            <h1 className="font-instrument-sans text-[32px] font-semibold leading-[40px] tracking-[-1.2px] text-balance text-[#262626] sm:text-[44px] sm:leading-[52px] lg:text-[48px] lg:leading-[56px] lg:tracking-[-1.8px]">
              Be the brand your customers see every month
            </h1>

            <p className="mx-auto mt-3 max-w-[640px] font-lato text-[14px] leading-[22px] text-[#737373] sm:mt-4 sm:text-[16px] sm:leading-[24px]">
              <span className="sm:hidden">
                A year-round creator presence that keeps your brand in feeds, in conversations and
                top of mind, with every creator, contract and report handled for you.
              </span>
              <span className="hidden sm:inline">
                Start with one campaign or run a year-round creator programme. Every plan is priced
                to your goals and budget, so you only pay for what moves your numbers.
              </span>
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-12 md:grid-cols-2 md:gap-6">
            {offers.map(offer => (
              <OfferCard
                key={offer.title}
                offer={offer}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          PRICED TO YOUR GOALS
      ===================================================== */}
      <section className="w-full bg-[#FDF4FF] px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
          <h2 className="font-instrument-sans text-[24px] font-semibold leading-[32px] tracking-[-0.8px] text-balance text-[#262626] sm:text-[32px] sm:leading-[40px] sm:tracking-[-1.2px]">
            Every plan is priced to your goals and budget.
          </h2>

          <p className="mt-3 max-w-[480px] font-lato text-[14px] leading-[22px] text-[#737373] sm:text-[16px] sm:leading-[24px]">
            <span className="sm:hidden">
              Tell us what you want to achieve and get a tailored quote within 48 hours. No
              commitment.
            </span>
            <span className="hidden sm:inline">
              Send us your campaign brief and budget, and we&apos;ll help you bring your campaign to
              life.
            </span>
          </p>

          <a
            href={BRAND_SIGNUP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-[#57058B] px-5 font-lato text-[14px] font-medium text-white transition-colors hover:bg-[#45046F]"
          >
            Start a one-off campaign
            <ArrowIcon />
          </a>
        </div>
      </section>

      {/* =====================================================
          BRANDS
      ===================================================== */}
      <section className="w-full bg-[#F5F5F4] px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-[1256px] text-center">
          <p className="font-instrument-sans text-[15px] leading-[24px] text-[#737373] sm:text-[16px]">
            Brands already showing up with Stardust
          </p>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-6 sm:gap-x-16">
            {brandLogos.map(logo => (
              <li
                key={logo.src}
                className="flex h-9 items-center sm:h-14"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  sizes="96px"
                  className="h-full w-auto rounded-[4px] object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
