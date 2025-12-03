'use client';

import dynamic from 'next/dynamic';

// Lazy load Vercel Analytics - non-essential, loads after page is interactive
const Analytics = dynamic(
  () => import('@vercel/analytics/react').then(mod => ({ default: mod.Analytics })),
  {
    ssr: false,
  }
);

export default function VercelAnalytics() {
  return <Analytics />;
}
