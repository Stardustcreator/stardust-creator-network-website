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
  const { country, isDetecting } = useCountry();
  const [isHydrated, setIsHydrated] = useState(false);
  const [hasRendered, setHasRendered] = useState(false);

  // Wait for hydration to complete before showing country-specific content
  // This ensures server and client initial render match exactly
  useEffect(() => {
    // Mark that we've rendered on the client
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasRendered(true);

    // Use multiple requestAnimationFrame calls to ensure we're well after hydration
    // This guarantees React has fully hydrated before we change content
    const rafIds: number[] = [];

    const rafId1 = requestAnimationFrame(() => {
      const rafId2 = requestAnimationFrame(() => {
        // Triple RAF to ensure we're definitely after hydration
        const rafId3 = requestAnimationFrame(() => {
          setIsHydrated(true);
        });
        rafIds.push(rafId2, rafId3);
      });
      rafIds.push(rafId1);
    });

    return () => {
      rafIds.forEach(id => cancelAnimationFrame(id));
    };
  }, []);

  // During SSR and initial client render (before hydration), ALWAYS render fallback
  // This ensures perfect match between server and client initial render
  // We must wait for hydration to prevent any mismatch between server and client
  const isServer = typeof window === 'undefined';
  const shouldShowFallback = isServer || !hasRendered || !isHydrated;

  if (shouldShowFallback) {
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
  // Also show fallback if not fully hydrated to prevent hydration mismatches
  if (isDetecting) {
    return (
      <div
        className={className}
        suppressHydrationWarning
        key="location-loading"
      >
        {fallback || <div className="bg-white/10 rounded h-8 w-32" />}
      </div>
    );
  }

  // Render content based on country after hydration is complete
  // Only use country value after hydration to prevent SSR/client mismatch
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

  // Render country-specific content after hydration
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
