'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { detectUserCountry } from '@/lib/services/geolocation.service';

export type Country = 'nigeria' | 'uk';

interface CountryContextType {
  country: Country;
  setCountry: (country: Country) => void;
  isAutoDetected: boolean;
  isDetecting: boolean;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

const STORAGE_KEY = 'stardust-country-selection';
const AUTO_DETECT_FLAG_KEY = 'stardust-country-auto-detected';
const DEFAULT_COUNTRY: Country = 'nigeria';

interface CountryProviderProps {
  children: ReactNode;
}

export function CountryProvider({ children }: CountryProviderProps) {
  const [country, setCountryState] = useState<Country>(DEFAULT_COUNTRY);
  const [isAutoDetected, setIsAutoDetected] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load country from localStorage and perform auto-detection on mount
  useEffect(() => {
    let mounted = true;

    const initializeCountry = async () => {
      // This is necessary for preventing hydration mismatch in Next.js
      if (mounted) {
        setIsMounted(true);
      }

      if (typeof window === 'undefined' || !mounted) return;

      // Check if user has manually selected a country
      const storedCountry = localStorage.getItem(STORAGE_KEY);
      const isAutoDetectedFlag = localStorage.getItem(AUTO_DETECT_FLAG_KEY) === 'true';

      if (storedCountry === 'nigeria' || storedCountry === 'uk') {
        // User has a stored preference
        if (mounted) {
          setCountryState(storedCountry);
          setIsAutoDetected(isAutoDetectedFlag);
        }
      } else {
        // No stored preference - perform auto-detection
        if (mounted) {
          setIsDetecting(true);
        }

        try {
          const detectedCountry = await detectUserCountry();

          if (mounted) {
            setCountryState(detectedCountry);
            setIsAutoDetected(true);
            setIsDetecting(false);

            // Store the auto-detected country
            localStorage.setItem(STORAGE_KEY, detectedCountry);
            localStorage.setItem(AUTO_DETECT_FLAG_KEY, 'true');
          }
        } catch (error) {
          console.error('Auto-detection failed:', error);

          if (mounted) {
            setCountryState(DEFAULT_COUNTRY);
            setIsAutoDetected(false);
            setIsDetecting(false);

            localStorage.setItem(STORAGE_KEY, DEFAULT_COUNTRY);
            localStorage.setItem(AUTO_DETECT_FLAG_KEY, 'false');
          }
        }
      }
    };

    initializeCountry();

    return () => {
      mounted = false;
    };
  }, []);

  // Save country to localStorage when it changes (manual selection)
  const setCountry = (newCountry: Country) => {
    setCountryState(newCountry);
    setIsAutoDetected(false); // Mark as manually selected

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newCountry);
      localStorage.setItem(AUTO_DETECT_FLAG_KEY, 'false');
    }
  };

  // Prevent hydration mismatch by using default until mounted
  const value = {
    country: isMounted ? country : DEFAULT_COUNTRY,
    setCountry,
    isAutoDetected: isMounted ? isAutoDetected : false,
    isDetecting: isMounted ? isDetecting : false,
  };

  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>;
}

export function useCountry(): CountryContextType {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
}
