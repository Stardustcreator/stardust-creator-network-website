'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SideMenu } from './SideMenu';

export default function Header() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

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

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide nav
        setIsNavCollapsed(true);
      } else {
        // Scrolling up - show nav
        setIsNavCollapsed(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMounted]);

  const toggleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  // Use static classes for SSR, dynamic classes only after mount
  const headerClasses = isMounted
    ? `fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
        isNavCollapsed ? 'transform -translate-y-full' : 'transform translate-y-0'
      }`
    : 'fixed top-0 left-0 right-0 z-40';

  return (
    <>
      <header className={headerClasses}>
        {/* Navigation Bar */}
        <div className="bg-black/80 backdrop-blur-lg border-b border-white/5">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center text-white hover:opacity-80 transition-opacity z-50"
              >
                <Image
                  src="/logos/scn logo white.png"
                  alt="Stardust Creator Network Logo"
                  width={120}
                  height={48}
                  className="object-contain"
                  priority
                />
              </Link>

              {/* Right Side - CTAs and Menu */}
              <div className="flex items-center gap-4 z-50">
                {/* Primary CTA */}
                <Link
                  href="/creators/join"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3 rounded-full font-semibold transition-all hidden sm:block shadow-lg"
                >
                  Join as Creator
                </Link>

                {/* Menu Button */}
                <button
                  className="p-3 text-white hover:text-purple-400 transition-colors"
                  onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
                  aria-label="Toggle navigation menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isSideMenuOpen ? (
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
          </div>
        </div>
      </header>

      {/* Collapse/Expand Toggle Button - Only show after mount */}
      {isMounted && (
        <button
          onClick={toggleNavCollapse}
          className={`fixed top-4 right-4 z-50 p-3 bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/30 transition-all duration-300 ${
            isNavCollapsed ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Show navigation"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      )}

      {/* Side Menu */}
      <SideMenu
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
      />
    </>
  );
}
