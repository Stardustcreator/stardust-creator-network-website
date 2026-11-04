export default function InsightReportBanner() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 pb-10 sm:px-6">
      <div className="relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl bg-[#3b0a6e] px-8 py-10 text-white sm:flex-row sm:gap-10 sm:px-12">
        <svg
          className="pointer-events-none absolute -right-10 bottom-0 h-full w-[420px] opacity-40"
          viewBox="0 0 420 120"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M20 140C80 -20 220 -20 300 140"
            stroke="#7b3fd0"
            strokeWidth="1.2"
          />
          <path
            d="M120 140C190 10 300 10 380 140"
            stroke="#7b3fd0"
            strokeWidth="1.2"
          />
        </svg>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logos/scn%20logo%20white.png"
          alt="Stardust Creator Network"
          className="relative h-12 w-[134px] max-w-none shrink-0 object-contain"
        />
        <span
          className="relative hidden h-12 w-px bg-white/40 sm:block"
          aria-hidden="true"
        />
        <p className="relative max-w-sm text-center text-base sm:text-left">
          Building stronger connections between brands, creators and audiences.
        </p>
      </div>
    </section>
  );
}
