'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [retryMessage, setRetryMessage] = useState('');

  const billingRef = useRef<'annual' | 'monthly'>('monthly');
  const initialized = useRef(false);

  const runInitialize = useCallback((billingValue: 'annual' | 'monthly') => {
    setIsLoading(true);
    setRetryMessage('');
    setCheckoutUrl('');

    initializePayment(billingValue)
      .then(({ checkoutUrl, reference }) => {
        setCheckoutUrl(checkoutUrl);
        setReference(reference);
      })
      .catch(err => {
        setRetryMessage(
          err instanceof Error ? err.message : 'Failed to start payment. Please try again.'
        );
        toast.error(
          err instanceof Error ? err.message : 'Failed to start payment. Please try again.'
        );
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const param = searchParams?.get('billing') as 'annual' | 'monthly' | null;
    const stored = sessionStorage.getItem('scn_billing') as 'annual' | 'monthly' | null;
    const resolved: 'annual' | 'monthly' = param ?? stored ?? 'monthly';

    sessionStorage.removeItem('scn_billing');
    setBilling(resolved);
    billingRef.current = resolved;

    runInitialize(resolved);
  }, [searchParams, runInitialize]);

  const spinner = (
    <div className="flex justify-center py-20">
      <div
        className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: 'var(--color-deep-purple)', borderTopColor: 'transparent' }}
      />
    </div>
  );

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <PlanBanner
            billing={billing}
            hideChanger
          />
        </div>
        {spinner}
      </div>
    );
  }

  if (retryMessage) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <PlanBanner
            billing={billing}
            hideChanger
          />
        </div>
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <p className="text-neutral-600">{retryMessage}</p>
          <div className="flex gap-3">
            <button
              onClick={() => runInitialize(billingRef.current)}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--color-deep-purple)' }}
            >
              Try Again
            </button>
            <button
              onClick={() => router.push(`/signin`)}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold text-neutral-700 border border-neutral-300 hover:bg-neutral-50 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!checkoutUrl) return null;

  return (
    <PaymentStep
      checkoutUrl={checkoutUrl}
      onSuccess={() => router.push(`/onboarding/success`)}
      onCancel={() => {
        setCheckoutUrl('');
        setRetryMessage('Payment cancelled. Ready to try again?');
      }}
    />
  );
}
