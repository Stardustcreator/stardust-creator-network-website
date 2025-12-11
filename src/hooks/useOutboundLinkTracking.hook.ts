'use client';

import { useEffect } from 'react';
import { trackOutboundClick } from '@/lib/analytics/eventTracking.utils';

/**
 * Hook to automatically track outbound link clicks
 *
 * This hook attaches click listeners to all external links on the page
 * and tracks them as outbound clicks in GA4 and GTM.
 *
 * Usage: Simply call useOutboundLinkTracking() in a component
 */
export function useOutboundLinkTracking() {
  useEffect(() => {
    const handleOutboundClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a') as HTMLAnchorElement;

      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Check if it's an external link
      const isExternal =
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        link.getAttribute('target') === '_blank';

      // Skip internal links and anchor links
      if (!isExternal || href.startsWith('#') || href.startsWith('/')) {
        return;
      }

      // Get link text for better tracking
      const linkText = link.textContent?.trim() || link.getAttribute('aria-label') || '';

      // Track the outbound click
      trackOutboundClick(href, linkText, {
        location: window.location.pathname,
      });
    };

    // Attach event listener to document
    document.addEventListener('click', handleOutboundClick, true);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleOutboundClick, true);
    };
  }, []);
}
