import InsightReportForm from './InsightReportForm';

const HEADING_FONT = 'font-[family-name:var(--font-instrument-sans)]';

function BookCover() {
  return (
    <div
      className="relative mx-auto w-[300px] sm:w-[340px] lg:w-[360px]"
      aria-hidden="true"
    >
      <div
        className="relative flex aspect-[3/4] flex-col overflow-hidden rounded-md bg-[#3b1d8f] p-6 text-white"
        style={{ boxShadow: '0 24px 48px -16px rgba(36, 0, 68, 0.45)' }}
      >
        <div className="flex items-start justify-between">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/scn%20logo%20white.png"
            alt=""
            className="h-8 w-auto"
          />
          <span className="text-[8px] font-medium uppercase tracking-widest text-white/80">
            Field Report · October 2026
          </span>
        </div>

        <svg
          viewBox="0 0 200 160"
          className="mx-auto mt-6 w-[62%]"
          fill="none"
        >
          <path
            d="M100 10 A70 70 0 0 0 100 150"
            stroke="#c9bdf0"
            strokeWidth="1"
          />
          <path
            d="M104 10 A70 70 0 0 1 104 150 Z"
            fill="#d8ccf5"
          />
          <rect
            x="98"
            y="2"
            width="4"
            height="156"
            fill="#f5c518"
          />
          <text
            x="30"
            y="158"
            fontSize="6"
            fill="#c9bdf0"
            letterSpacing="1"
          >
            BRANDS
          </text>
          <text
            x="140"
            y="158"
            fontSize="6"
            fill="#c9bdf0"
            letterSpacing="1"
          >
            CREATORS
          </text>
        </svg>

        <div className="mt-auto">
          <p className="text-[8px] font-bold uppercase tracking-widest text-[#f5c518]">
            Influencer Marketing in Nigeria
          </p>
          <p
            className={`${HEADING_FONT} mt-2 text-[34px] font-semibold leading-[1.02] tracking-tight`}
          >
            Both Sides
            <br />
            of the <span className="text-[#f5c518]">Brief</span>
          </p>
          <p className="mt-3 max-w-[85%] text-[8px] leading-snug text-white/80">
            What 10 brand and agency teams and 20 creators told us about where creator campaigns go
            wrong, and how to fix it.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function InsightReportHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft background shapes */}
      <div className="pointer-events-none absolute -right-24 -top-20 h-[420px] w-[420px] rounded-full bg-[#ede4fb]" />
      <div className="pointer-events-none absolute bottom-0 right-[8%] h-[360px] w-[460px] rounded-full bg-[#ece3fa]/70 blur-sm" />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-6 pb-20 pt-10 lg:grid-cols-2 lg:pt-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#57058b]/40 bg-white/60 px-4 py-1.5 text-sm font-semibold text-[#3d0461]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect
                x="2"
                y="9"
                width="3"
                height="5"
                rx="0.5"
              />
              <rect
                x="6.5"
                y="5"
                width="3"
                height="9"
                rx="0.5"
              />
              <rect
                x="11"
                y="2"
                width="3"
                height="12"
                rx="0.5"
              />
            </svg>
            Insight Report
          </span>

          <h1
            className={`${HEADING_FONT} mt-6 text-5xl font-bold leading-[1.02] tracking-tight text-[#1a002e] sm:text-6xl lg:text-[68px]`}
          >
            Both Sides
            <br />
            of the <span className="text-[#57058b]">Brief</span>
          </h1>

          <h2
            className={`${HEADING_FONT} mt-8 max-w-md text-2xl font-semibold leading-snug text-[#1a002e]`}
          >
            Are your creator campaigns delivering the results you expect?
          </h2>

          <p className="mt-5 max-w-md text-lg leading-relaxed text-[#2b1a3d]">
            Get practical perspectives from brands, creators and agencies on what makes creator
            partnerships work, and where expectations often differ.
          </p>

          <InsightReportForm className="mt-8" />
        </div>

        <BookCover />
      </div>
    </section>
  );
}
