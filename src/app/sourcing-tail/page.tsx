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

// The "sourcing tail" for a multi-creator brief starts at /brief/payment: the
// brand reviews pricing and terms, then pays the mobilization fee before
// sourcing begins. /brief-status is where they go afterwards to watch the
// sourcing desk work the brief. This route exists as a stable destination name
// for the backend's nextRoute signal; it just forwards straight on.
function SourcingTailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');

  useEffect(() => {
    router.replace(token ? `/brief/payment?token=${encodeURIComponent(token)}` : '/brief/payment');
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
