'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PaymentStep from './PaymentStep';
import PlanBanner from './PlanBanner';
import { initializePayment } from '@/lib/api/payments';
import { toast } from '@/lib/toast';

type BillingPeriod = 'annual' | 'monthly';
type PlanId = 'community' | 'starter' | 'builder';

function getBillingPeriod(value: string | null): BillingPeriod {
  return value === 'annual' ? 'annual' : 'monthly';
}

function getPlanId(value: string | null): PlanId | null {
  if (value === 'community' || value === 'starter' || value === 'builder') return value;
  return null;
}

function getStoredValue(key: 'scn_billing' | 'scn_plan') {
  return sessionStorage.getItem(key) ?? localStorage.getItem(key);
}

function clearStoredPlanSelection() {
  sessionStorage.removeItem('scn_billing');
  sessionStorage.removeItem('scn_plan');
  localStorage.removeItem('scn_billing');
  localStorage.removeItem('scn_plan');
}

export default function PaymentPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [reference, setReference] = useState('');
  const [billing, setBilling] = useState<BillingPeriod>('monthly');
  const [plan, setPlan] = useState<PlanId | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [retryMessage, setRetryMessage] = useState('');

  const billingRef = useRef<BillingPeriod>('monthly');
  const planRef = useRef<PlanId>('community');
  const initialized = useRef(false);

  const runInitialize = useCallback(
    (billingValue: BillingPeriod, planValue: PlanId) => {
      setIsLoading(true);
      setRetryMessage('');
      setCheckoutUrl('');

      initializePayment(billingValue, planValue)
        .then(({ checkoutUrl, reference }) => {
          setCheckoutUrl(checkoutUrl);
          setReference(reference);
        })
        .catch(err => {
          const message =
            err instanceof Error ? err.message : 'Failed to start payment. Please try again.';

          if (message.toLowerCase().includes('unauthorized')) {
            toast.error('Please choose a plan to continue.');
            router.replace('/onboarding');
            return;
          }

          setRetryMessage(message);
          toast.error(message);
        })
        .finally(() => setIsLoading(false));
    },
    [router]
  );

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const resolvedBilling = getBillingPeriod(
      searchParams?.get('billing') ?? getStoredValue('scn_billing')
    );
    const resolvedPlan = getPlanId(searchParams?.get('plan') ?? getStoredValue('scn_plan'));

    clearStoredPlanSelection();

    if (!resolvedPlan) {
      router.replace('/onboarding');
      return;
    }

    setBilling(resolvedBilling);
    setPlan(resolvedPlan);
    billingRef.current = resolvedBilling;
    planRef.current = resolvedPlan;

    runInitialize(resolvedBilling, resolvedPlan);
  }, [router, searchParams, runInitialize]);

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
        {plan && (
          <div className="mb-8">
            <PlanBanner
              billing={billing}
              plan={plan}
              hideChanger
            />
          </div>
        )}
        {spinner}
      </div>
    );
  }

  if (retryMessage) {
    return (
      <div className="max-w-3xl mx-auto">
        {plan && (
          <div className="mb-8">
            <PlanBanner
              billing={billing}
              plan={plan}
              hideChanger
            />
          </div>
        )}
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <p className="text-neutral-600">{retryMessage}</p>
          <div className="flex gap-3">
            <button
              onClick={() => runInitialize(billingRef.current, planRef.current)}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--color-deep-purple)' }}
            >
              Try Again
            </button>
            <button
              onClick={() => router.push('/onboarding')}
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
      onSuccess={() => {
        const params = new URLSearchParams({ reference });
        router.push(`/onboarding/success?${params.toString()}`);
      }}
      onCancel={() => {
        setCheckoutUrl('');
        setRetryMessage('Payment cancelled. Ready to try again?');
      }}
    />
  );
}
