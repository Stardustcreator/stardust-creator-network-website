'use client';

import { useOutboundLinkTracking } from '@/hooks/useOutboundLinkTracking.hook';

/**
 * Component to automatically track outbound link clicks across the site
 *
 * This component uses the useOutboundLinkTracking hook to attach
 * click listeners to all external links and track them in GA4 and GTM.
 */
export default function OutboundLinkTracker() {
  useOutboundLinkTracking();
  return null;
}
