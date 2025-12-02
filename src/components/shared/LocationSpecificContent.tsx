'use client';

import { useState, useLayoutEffect } from 'react';
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
  const { country, isDetecting } = useCountry();
  const [isMounted, setIsMounted] = useState(false);

  // Use useLayoutEffect to ensure state update happens synchronously after DOM mutations
  // but before browser paint, ensuring server and client render match initially
  useLayoutEffect(() => {
    // Only set mounted after the first render is complete
    // This ensures the initial client render matches the server render
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  // During SSR and initial client render (before mount), ALWAYS render fallback
  // This ensures perfect match between server and client initial render
  const shouldRenderFallback = typeof window === 'undefined' || !isMounted;

  if (shouldRenderFallback) {
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
      <div
        className={`animate-pulse ${className}`}
        suppressHydrationWarning
      >
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

  // Render country-specific content after mount
  // Use suppressHydrationWarning to prevent React warnings during the transition
  return (
    <div
      className={className}
      suppressHydrationWarning
      key={`location-content-${country}`}
    >
      {content ?? fallback}
    </div>
  );
}
