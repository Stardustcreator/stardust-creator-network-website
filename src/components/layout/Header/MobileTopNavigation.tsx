'use client';

import Image from 'next/image';
import Link from 'next/link';

interface MobileTopNavigationProps {
  onMenuClick: () => void;
  logoSrc?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
}

export function MobileTopNavigation({
  onMenuClick,
  logoSrc = '/logos/scn logo black.png',
  logoAlt = 'Stardust Creator Network',
  logoWidth = 100,
  logoHeight = 40,
}: MobileTopNavigationProps) {
  return (
    <div
      className="bg-white rounded-2xl px-4 shadow-md flex items-center justify-between mx-auto"
      style={{ width: '330px', height: '75px' }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center hover:opacity-80 transition-opacity"
      >
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={logoWidth}
          height={logoHeight}
          className="object-contain"
          priority
        />
      </Link>

      {/* Hamburger Menu Button */}
      <button
        onClick={onMenuClick}
        className="p-2 text-black hover:text-purple-600 transition-colors"
        aria-label="Open menu"
        type="button"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );
}
