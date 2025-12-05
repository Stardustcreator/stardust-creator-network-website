'use client';

import LocationSpecificContent from '@/components/shared/LocationSpecificContent';
import type { ReactNode } from 'react';

interface TermsOfServiceContentProps {
  nigeriaContent: ReactNode;
  ukContent?: ReactNode;
}

export default function TermsOfServiceContent({
  nigeriaContent,
  ukContent,
}: TermsOfServiceContentProps) {
  return (
    <LocationSpecificContent
      nigeria={nigeriaContent}
      uk={ukContent}
      fallback={nigeriaContent} // Show Nigeria content as fallback
    />
  );
}
