'use client';

import { useState, useEffect, useRef } from 'react';
import { useCountry, type Country } from '@/lib/contexts/CountryContext';
import CountryFlag from './CountryFlag';

interface CountrySelectorProps {
  className?: string;
  variant?: 'desktop' | 'mobile';
}

export default function CountrySelector({
  className = '',
  variant = 'desktop',
}: CountrySelectorProps) {
  const { country, setCountry, isAutoDetected, isDetecting } = useCountry();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This is necessary for preventing hydration mismatch in Next.js
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  if (!isMounted || isDetecting) {
    return (
      <div className={`${className} flex items-center gap-2`}>
        <div className="w-5 h-4 rounded bg-white/10 animate-pulse" />
        <span className="text-white/90 text-sm">{isDetecting ? 'Detecting...' : 'Nigeria'}</span>
      </div>
    );
  }

  const handleCountrySelect = (selectedCountry: Country) => {
    setCountry(selectedCountry);
    setIsOpen(false);
  };

  const getCountryName = (countryCode: Country): string => {
    return countryCode === 'nigeria' ? 'Nigeria' : 'United Kingdom';
  };

  const getCountryDisplayText = (countryCode: Country): string => {
    const name = getCountryName(countryCode);
    return isAutoDetected ? `${name} (Auto)` : name;
  };

  const isDesktop = variant === 'desktop';

  return (
    <div
      className={`${className} relative`}
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 text-white/90 hover:text-white hover:bg-white/10 hover:backdrop-blur-sm border border-white/20 font-medium transition-all duration-300 rounded-full whitespace-nowrap ${
          isDesktop ? 'py-2 px-4' : 'py-3 px-4 w-full justify-between'
        }`}
        aria-label={`Select country. Current: ${getCountryName(country)}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <CountryFlag
          country={country}
          className="w-5 h-4 rounded-sm shrink-0"
        />
        <span className="text-sm font-semibold">{getCountryDisplayText(country)}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute ${
            isDesktop ? 'top-full mt-2 right-0' : 'top-full mt-2 left-0 right-0'
          } bg-black/95 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl shadow-black/50 z-50 min-w-[160px]`}
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1">
            <button
              type="button"
              onClick={() => handleCountrySelect('nigeria')}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                country === 'nigeria'
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-white/90 hover:bg-white/5 hover:text-white'
              }`}
              role="menuitem"
            >
              <div className="flex items-center gap-3">
                <CountryFlag
                  country="nigeria"
                  className="w-6 h-4 rounded-sm shrink-0"
                />
                <span>Nigeria</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => handleCountrySelect('uk')}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                country === 'uk'
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-white/90 hover:bg-white/5 hover:text-white'
              }`}
              role="menuitem"
            >
              <div className="flex items-center gap-3">
                <CountryFlag
                  country="uk"
                  className="w-6 h-4 rounded-sm shrink-0"
                />
                <span>United Kingdom</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
