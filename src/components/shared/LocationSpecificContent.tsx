'use client';

import { useState, useEffect } from 'react';
import { useCountry, type Country } from '@/lib/contexts/CountryContext';
import type { ReactNode } from 'react';

interface LocationSpecificContentProps {
  nigeria?: ReactNode;
  uk?: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

export default function LocationSpecificContent({
  nigeria,
  uk,
  fallback,
  className = '',
}: LocationSpecificContentProps) {
  // Hooks must be called at top level, but we'll ignore the values until after mount
  const { country, isDetecting } = useCountry();
  const [isMounted, setIsMounted] = useState(false);

  // Ensure we only render country-specific content after hydration completes
  // This is necessary for preventing hydration mismatch in Next.js
  useEffect(() => {
    // Updating state based on URL pathname is necessary for country detection
    /* eslint-disable react-hooks/set-state-in-effect */
    setIsMounted(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // During SSR and initial client render, ALWAYS render fallback to ensure perfect match
  // This prevents hydration errors - both server and client will render the same fallback initially
  // After mount, we'll update to show country-specific content
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isHydrated = typeof window !== 'undefined' && isMounted;
  if (!isHydrated) {
    const fallbackContent = fallback || <div className="bg-white/10 rounded h-8 w-32" />;
    return (
      <div 
        className={className} 
        suppressHydrationWarning
        key="location-fallback"
      >
        {fallbackContent}
      </div>
    );
  }

  // Show loading state during detection
  if (isDetecting) {
    return (
      <div className={`animate-pulse ${className}`}>
        {fallback || <div className="bg-white/10 rounded h-8 w-32" />}
      </div>
    );
  }

  // Render content based on country after mount
  // Only use country value after mount to prevent SSR/client mismatch
  const getContentForCountry = (countryCode: Country): ReactNode => {
    switch (countryCode) {
      case 'nigeria':
        return nigeria ?? fallback;
      case 'uk':
        return uk ?? fallback;
      default:
        return fallback;
    }
  };

  const content = getContentForCountry(country);

  // Always render something to prevent hydration mismatch
  // Use suppressHydrationWarning to prevent React warnings during the transition from fallback to country-specific content
  // Use a key to force React to treat this as a controlled update
  return (
    <div 
      className={className} 
      suppressHydrationWarning
      key="location-content"
    >
      {content ?? fallback}
    </div>
  );
}
