'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function Spinner() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div
        className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: 'var(--color-deep-purple)', borderTopColor: 'transparent' }}
      />
    </div>
  );
}

// The "sourcing tail" (terms, mobilization invoice, sourcing desk) for a
// multi-creator brief is /brief-status - it already covers all three: brief
// terms/summary, the mobilization invoice/payment link, and status as the
// sourcing desk works the brief. This route exists as a stable destination
// name for the backend's nextRoute signal; it just forwards straight there.
function SourcingTailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');

  useEffect(() => {
    router.replace(token ? `/brief-status?token=${encodeURIComponent(token)}` : '/brief-status');
  }, [router, token]);

  return <Spinner />;
}

export default function SourcingTailPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <SourcingTailContent />
    </Suspense>
  );
}
