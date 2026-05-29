'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import { checkSubscriptionAccess } from '@/lib/api/subscriptions';
import { toast } from '@/lib/toast';

export default function SubscriptionGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    checkSubscriptionAccess().then(result => {
      if (!result.ok) {
        if (result.reason === 'unauthorized') {
          toast.error('Unauthorized');
          setTimeout(() => router.replace('/signin'), 1500);
        } else if (result.reason === 'no-subscription') {
          toast.error('Please complete the onboarding process.');
          setTimeout(() => router.replace('/onboarding/payment'), 1500);
        } else {
          toast.error('No active subscription');
          setTimeout(() => router.replace('/onboarding/reactivate'), 1500);
        }
        return;
      }
      setReady(true);
    });
  }, [router]);

  if (!ready) {
    return (
      <>
        <Header variant="light" />
        <main className="min-h-screen flex items-center justify-center bg-white">
          <div
            className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: 'var(--color-deep-purple)', borderTopColor: 'transparent' }}
          />
        </main>
        <Footer />
      </>
    );
  }

  return <>{children}</>;
}
