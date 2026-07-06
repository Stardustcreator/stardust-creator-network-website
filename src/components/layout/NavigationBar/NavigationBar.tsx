'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TopNavigation } from '../Header/TopNavigation';
import { MobileTopNavigation } from '../Header/MobileTopNavigation';
import { MobileMenu } from '../Header/MobileMenu';

interface NavigationBarProps {
  className?: string;
  logoSrc?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
  variant?: 'default' | 'fixed' | 'light';
}

export default function NavigationBar({
  className = '',
  logoSrc = '/logos/scn logo black.png',
  logoAlt = 'Stardust Creator Network Logo',
  logoWidth = 120,
  logoHeight = 48,
  variant = 'default',
}: NavigationBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const headerClasses = `fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${className}`;

  return (
    <>
      <header className={headerClasses}>
        {/* Desktop Navigation - White background with border */}
        <div className="hidden lg:flex items-center justify-center px-4 py-4">
          <div
            className="flex items-center justify-between w-full max-w-331.25 h-17 px-8 py-2 rounded-2xl transition-all duration-300"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #E2E8F0',
            }}
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity shrink-0"
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

            {/* Navigation Pills */}
            <div className="flex items-center justify-center flex-1 mx-6">
              <TopNavigation variant="light" />
            </div>

            {/* Sign Up Button */}
            <div className="flex items-center gap-4 shrink-0">
              <Link href="/onboarding">
                <button
                  className="px-5 py-2 rounded-lg font-semibold hover:opacity-90 transition-all text-sm"
                  style={{
                    backgroundColor: '#57058B',
                    color: '#FFFFFF',
                  }}
                >
                  Sign up
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - White Bar (Floats over hero) */}
        <div className="lg:hidden pt-2">
          <MobileTopNavigation
            onMenuClick={() => setIsMobileMenuOpen(true)}
            logoSrc={logoSrc}
            logoAlt={logoAlt}
            logoWidth={logoWidth}
            logoHeight={logoHeight}
          />
        </div>
      </header>

      {/* Mobile Menu - Black Drawer */}
      {isMounted && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
