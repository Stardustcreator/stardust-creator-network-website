import { Suspense } from 'react';
import type { Metadata } from 'next';

import BriefPaymentClient from './BriefPaymentClient';

export const metadata: Metadata = {
  title: 'Complete your mobilization payment | Stardust Creator Network',
  description:
    'Review your creator sourcing pricing and terms, then complete your mobilization payment to start sourcing.',
  // Reachable only with a brief's guest token, so keep it out of search results.
  robots: { index: false, follow: false },
};

export default function BriefPaymentPage() {
  return (
    <Suspense fallback={null}>
      <BriefPaymentClient />
    </Suspense>
  );
}
