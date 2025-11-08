'use client';

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

  // Show loading state during detection
  if (isDetecting) {
    return (
      <div className={`animate-pulse ${className}`}>
        {fallback || <div className="bg-white/10 rounded h-8 w-32" />}
      </div>
    );
  }

  // Render content based on country
  const getContentForCountry = (countryCode: Country): ReactNode => {
    switch (countryCode) {
      case 'nigeria':
        return nigeria || fallback;
      case 'uk':
        return uk || fallback;
      default:
        return fallback;
    }
  };

  const content = getContentForCountry(country);

  if (!content) {
    return null;
  }

  return <div className={className}>{content}</div>;
}
