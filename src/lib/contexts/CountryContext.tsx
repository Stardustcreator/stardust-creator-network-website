'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Country = 'nigeria' | 'uk';

interface CountryContextType {
  country: Country;
  setCountry: (country: Country) => void;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

const STORAGE_KEY = 'stardust-country-selection';
const DEFAULT_COUNTRY: Country = 'nigeria';

interface CountryProviderProps {
  children: ReactNode;
}

export function CountryProvider({ children }: CountryProviderProps) {
  const [country, setCountryState] = useState<Country>(DEFAULT_COUNTRY);
  const [isMounted, setIsMounted] = useState(false);

  // Load country from localStorage on mount
  useEffect(() => {
    // This is necessary for preventing hydration mismatch in Next.js
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'nigeria' || stored === 'uk') {
        setCountryState(stored);
      }
    }
  }, []);

  // Save country to localStorage when it changes
  const setCountry = (newCountry: Country) => {
    setCountryState(newCountry);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newCountry);
    }
  };

  // Prevent hydration mismatch by using default until mounted
  const value = {
    country: isMounted ? country : DEFAULT_COUNTRY,
    setCountry,
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
