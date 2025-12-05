'use client';

import LocationSpecificContent from '@/components/shared/LocationSpecificContent';
import type { ReactNode } from 'react';

interface PrivacyPolicyContentProps {
  nigeriaContent: ReactNode;
  ukContent?: ReactNode;
}

export default function PrivacyPolicyContent({
  nigeriaContent,
  ukContent,
}: PrivacyPolicyContentProps) {
  return (
    <LocationSpecificContent
      nigeria={nigeriaContent}
      uk={ukContent}
      fallback={nigeriaContent} // Show Nigeria content as fallback
    />
  );
}
