import type { ReactNode } from 'react';
import InsightReportForm from './InsightReportForm';

const ICON_PROPS = {
  width: 36,
  height: 36,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: '#57058b',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const ITEMS: { text: string; icon: ReactNode }[] = [
  {
    text: 'What brands look for when working with creators.',
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M3 10v4a1 1 0 0 0 1 1h3l7 4V5L7 9H4a1 1 0 0 0-1 1Z" />
        <path d="M17 9a4 4 0 0 1 0 6M19.5 6.5a8 8 0 0 1 0 11" />
      </svg>
    ),
  },
  {
    text: 'What creators expect from brand partnerships.',
    icon: (
      <svg {...ICON_PROPS}>
        <circle
          cx="12"
          cy="8"
          r="3"
        />
        <circle
          cx="5.5"
          cy="10"
          r="2"
        />
        <circle
          cx="18.5"
          cy="10"
          r="2"
        />
        <path d="M6.5 19a5.5 5.5 0 0 1 11 0M2 18a3.5 3.5 0 0 1 4-3M22 18a3.5 3.5 0 0 0-4-3" />
      </svg>
    ),
  },
  {
    text: 'The challenges agencies face in managing creator campaigns.',
    icon: (
      <svg {...ICON_PROPS}>
        <circle
          cx="12"
          cy="12"
          r="3"
        />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
      </svg>
    ),
  },
  {
    text: 'Where expectations differ and opportunities for better collaboration exist.',
    icon: (
      <svg {...ICON_PROPS}>
        <path d="m11 17 2 2a1.4 1.4 0 0 0 2-2M14 14l2.5 2.5a1.4 1.4 0 0 0 2-2L15 11M8 12l-2.5 2.5a1.4 1.4 0 0 0 2 2L10 14" />
        <path d="m2 11 4-4 4 1 3-1 3 1 4 3 2 1M2 11l4 4M22 12l-3 3" />
      </svg>
    ),
  },
];

export default function InsightReportDiscover() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-16">
      <div className="h-[3px] w-14 bg-[#57058b]" />
      <h2 className="mt-4 font-[family-name:var(--font-instrument-sans)] text-4xl font-bold tracking-tight text-[#1a002e]">
        What You&apos;ll Discover
      </h2>

      <ul className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {ITEMS.map(({ text, icon }, index) => (
          <li
            key={text}
            className={`flex flex-col items-center px-6 text-center ${
              index > 0 ? 'lg:border-l lg:border-[#57058b]/20' : ''
            }`}
          >
            <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#ede4fb]">
              {icon}
            </span>
            <p className="mt-5 max-w-[220px] text-base leading-snug text-[#2b1a3d]">{text}</p>
          </li>
        ))}
      </ul>

      <div className="mt-12 flex justify-center">
        <InsightReportForm />
      </div>
    </section>
  );
}
