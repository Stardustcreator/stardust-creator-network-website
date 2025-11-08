import type { Country } from '@/lib/contexts/CountryContext';

interface CountryFlagProps {
  country: Country;
  className?: string;
}

export default function CountryFlag({ country, className = '' }: CountryFlagProps) {
  if (country === 'nigeria') {
    return (
      <svg
        className={className}
        viewBox="0 0 60 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          width="60"
          height="40"
          fill="#008751"
        />
        <rect
          y="13.33"
          width="60"
          height="13.33"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // UK Flag (Union Jack) - Simplified but recognizable
  return (
    <svg
      className={className}
      viewBox="0 0 60 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        width="60"
        height="40"
        fill="#012169"
      />
      {/* White diagonal cross */}
      <path
        d="M0 0L60 40M60 0L0 40"
        stroke="#FFFFFF"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* White horizontal and vertical cross */}
      <path
        d="M0 20L60 20M30 0L30 40"
        stroke="#FFFFFF"
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* Red diagonal cross */}
      <path
        d="M0 0L60 40M60 0L0 40"
        stroke="#C8102E"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Red horizontal and vertical cross */}
      <path
        d="M0 20L60 20M30 0L30 40"
        stroke="#C8102E"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
