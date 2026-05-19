'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PaymentStep from './PaymentStep';
import PlanBanner from './PlanBanner';
import { initializePayment } from '@/lib/api/payments';
import { toast } from '@/lib/toast';

export default function PaymentPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [reference, setReference] = useState('');
  const [billing, setBilling] = useState<'annual' | 'monthly'>('monthly');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const param = searchParams?.get('billing') as 'annual' | 'monthly' | null;
    const stored = sessionStorage.getItem('scn_billing') as 'annual' | 'monthly' | null;
    const resolved: 'annual' | 'monthly' = param ?? stored ?? 'monthly';

    sessionStorage.removeItem('scn_billing');
    setBilling(resolved);

    initializePayment(resolved)
      .then(({ checkoutUrl, reference }) => {
        setCheckoutUrl(checkoutUrl);
        setReference(reference);
      })
      .catch(err => {
        toast.error(
          err instanceof Error ? err.message : 'Failed to start payment. Please try again.'
        );
      })
      .finally(() => setIsLoading(false));
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <PlanBanner
            billing={billing}
            hideChanger
          />
        </div>
        <div className="flex justify-center py-20">
          <div
            className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: 'var(--color-deep-purple)', borderTopColor: 'transparent' }}
          />
        </div>
      </div>
    );
  }

  if (!checkoutUrl) return null;

  return (
    <PaymentStep
      checkoutUrl={checkoutUrl}
      onSuccess={() => router.push(`/onboarding/success?reference=${reference}`)}
      onCancel={() => router.push(`/onboarding/create-account?billing=${billing}`)}
    />
  );
}
