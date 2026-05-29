'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkSubscriptionAccess } from '@/lib/api/subscriptions';

export default function OnboardingCheckPage() {
  const router = useRouter();

  useEffect(() => {
    checkSubscriptionAccess().then(result => {
      if (result.ok) {
        window.location.href = 'https://stardust-creators-network.circle.so';
        return;
      }
      if (result.reason === 'inactive') {
        router.replace('/onboarding/reactivate');
        return;
      }
      router.replace('/onboarding/payment');
    });
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div
        className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: 'var(--color-deep-purple)', borderTopColor: 'transparent' }}
      />
    </div>
  );
}
