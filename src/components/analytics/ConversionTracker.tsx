'use client';

import { useEffect } from 'react';
import type { Country } from '@/types/creator-application.types';

type AnalyticsValue = string | number | boolean | null | undefined | Record<string, unknown>;

interface ConversionTrackerProps {
  event: string;
  country: Country;
  properties?: Record<string, AnalyticsValue>;
}

export default function ConversionTracker({
  event,
  country,
  properties = {},
}: ConversionTrackerProps) {
  useEffect(() => {
    // Track the conversion event with country-specific properties
    if (typeof window !== 'undefined') {
      // PostHog tracking (if available)
      if (window.posthog) {
        window.posthog.capture(event, {
          country,
          page_url: window.location.href,
          page_path: window.location.pathname,
          timestamp: new Date().toISOString(),
          ...properties,
        });
      }

      // Google Analytics tracking (if available)
      if (window.gtag) {
        window.gtag('event', event, {
          event_category: 'Creator Application',
          event_label: country,
          custom_map: {
            country: country,
          },
          ...properties,
        });
      }

      // Facebook Pixel tracking (if available)
      if (window.fbq) {
        window.fbq('track', 'CompleteRegistration', {
          content_name: 'Creator Application',
          content_category: 'Creator Network',
          value: 1,
          currency: country === 'Nigeria' ? 'NGN' : 'GBP',
          country: country,
          ...properties,
        });
      }

      // Custom analytics or other tracking services can be added here
      console.log(`Conversion tracked: ${event}`, {
        country,
        url: window.location.href,
        ...properties,
      });
    }
  }, [event, country, properties]);

  // This component doesn't render anything
  return null;
}

// Extend the Window interface for TypeScript
declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties: Record<string, AnalyticsValue>) => void;
    };
    gtag?: (command: string, event: string, properties: Record<string, AnalyticsValue>) => void;
    fbq?: (command: string, event: string, properties: Record<string, AnalyticsValue>) => void;
  }
}
