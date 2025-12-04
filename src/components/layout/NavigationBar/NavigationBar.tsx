'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TopNavigation } from '../Header/TopNavigation';
import { MobileTopNavigation } from '../Header/MobileTopNavigation';
import CountrySelector from '../Header/CountrySelector';

interface NavigationBarProps {
  className?: string;
  logoSrc?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
}

export default function NavigationBar({
  className = '',
  logoSrc = '/logos/scn logo white.png',
  logoAlt = 'Stardust Creator Network Logo',
  logoWidth = 120,
  logoHeight = 48,
}: NavigationBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const mobileMenuId = 'mobile-navigation';

  // Handle mounting to prevent hydration mismatch
  useEffect(() => {
    // This is necessary for preventing hydration mismatch in Next.js
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  // Always keep navigation visible and fixed at top
  const headerClasses = `fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${className}`;

  return (
    <>
      <header className={headerClasses}>
        {/* Glassmorphic Navigation Container */}
        <div className="flex items-center justify-center px-6 py-4">
          {/* Single Glassmorphic Container for Everything */}
          <div
            className={`hidden lg:flex items-center justify-between w-full max-w-7xl backdrop-blur-md border border-white/20 rounded-full px-8 py-4 shadow-lg shadow-black/25 transition-all duration-300 pointer-events-none lg:pointer-events-auto ${
              isScrolled
                ? 'bg-white/15 shadow-xl shadow-black/40'
                : 'bg-white/10 shadow-lg shadow-black/25'
            }`}
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center text-white hover:opacity-80 transition-opacity"
            >
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={logoWidth}
                height={logoHeight}
                className="object-contain"
                sizes="(max-width: 480px) 100px, (max-width: 768px) 110px, 120px"
                priority
              />
            </Link>

            {/* Navigation Pills */}
            <div className="flex items-center justify-center flex-1 mx-8">
              <TopNavigation />
            </div>

            {/* Country Selector */}
            <div className="flex items-center">
              <CountrySelector variant="desktop" />
            </div>
          </div>

          {/* Mobile Layout - Outside glassmorphic container */}
          <div
            className={`lg:hidden flex items-center justify-between w-full max-w-7xl transition-all duration-300 relative ${
              isScrolled ? 'bg-black/40 backdrop-blur-md rounded-full px-6 py-2' : ''
            }`}
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center text-white hover:opacity-80 transition-opacity z-50"
            >
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={logoWidth}
                height={logoHeight}
                className="object-contain"
                sizes="(max-width: 480px) 100px, (max-width: 768px) 110px, 120px"
                priority
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="p-3 text-white hover:text-purple-400 transition-colors z-[60] relative touch-manipulation"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                setIsMobileMenuOpen(prev => !prev);
              }}
              onTouchStart={e => {
                e.stopPropagation();
              }}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls={mobileMenuId}
              aria-haspopup="true"
            >
              <svg
                className="w-6 h-6 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <MobileTopNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menuId={mobileMenuId}
      />
    </>
  );
}
