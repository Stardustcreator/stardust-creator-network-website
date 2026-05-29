'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Heading, Text } from '@/components/typography';
import Button from '@/components/ui/Button';
import PaymentStep from './PaymentStep';
import { initializePayment } from '@/lib/api/payments';
import { getCircleUrl } from '@/lib/api/subscriptions';
import { toast } from '@/lib/toast';

type Billing = 'annual' | 'monthly';
type Step = 'selecting' | 'paying' | 'redirecting';

const PLANS: { billing: Billing; label: string; price: string; cadence: string }[] = [
  {
    billing: 'annual',
    label: 'Community (Annual)',
    price: '₦50,000 / year',
    cadence: 'Billed annually',
  },
  {
    billing: 'monthly',
    label: 'Community (Monthly)',
    price: '₦5,000 / month',
    cadence: 'Billed monthly',
  },
];

export default function ReactivateContent() {
  const router = useRouter();
  const [selected, setSelected] = useState<Billing | null>(null);
  const [step, setStep] = useState<Step>('selecting');
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [_reference, setReference] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReactivate = useCallback(async () => {
    if (!selected) return;
    setIsLoading(true);
    try {
      const { checkoutUrl, reference } = await initializePayment(selected);
      setCheckoutUrl(checkoutUrl);
      setReference(reference);
      setStep('paying');
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Failed to start payment. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [selected]);

  const handlePaymentSuccess = useCallback(async () => {
    setStep('redirecting');
    // try {
    //   const base = process.env.NEXT_PUBLIC_API_URL;
    //   window.location.href = `${base}/payments/callback?trxref=${reference}&reference=${reference}`;
    // } catch {
    //   const circleUrl = await getCircleUrl();
    //   if (circleUrl) {
    //     window.location.href = circleUrl;
    //   } else {
    //     router.push('/onboarding/subscribe');
    //   }
    // }
    window.location.href = 'https://stardust-creators-network.circle.so';
  }, []);

  if (step === 'paying') {
    return (
      <PaymentStep
        checkoutUrl={checkoutUrl}
        onSuccess={handlePaymentSuccess}
        onCancel={() => {
          setCheckoutUrl('');
          setStep('selecting');
        }}
      />
    );
  }

  if (step === 'redirecting') {
    return (
      <div className="flex flex-col items-center justify-center py-44 gap-4">
        <div
          className="w-9 h-9 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: 'var(--color-deep-purple)', borderTopColor: 'transparent' }}
        />
        <p className="text-neutral-600 text-sm font-medium">Taking you to your dashboard…</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto text-center px-4">
      <span className="inline-block mb-3 px-6 py-2 rounded-md text-sm font-semibold bg-surface-warning text-text-warning">
        Your access is paused
      </span>

      <Heading
        level={4}
        variant="default"
        className="text-text-primary! mb-2"
      >
        Pick up right where you left off
      </Heading>

      <Text
        variant="body"
        className="text-text-secondary! mb-6 w-auto lg:w-3/4 mx-auto"
      >
        Reactivate your membership in under a minute and get back to building your creator business.
      </Text>

      <div className="flex flex-col gap-3 mb-8">
        {PLANS.map(plan => (
          <button
            key={plan.billing}
            type="button"
            onClick={() => setSelected(plan.billing)}
            className="w-full hover:border-comp-primary-100! flex cursor-pointer items-start gap-4 px-6 py-5 rounded-md border text-left transition-colors duration-150 bg-surface-primary"
            style={{
              borderColor:
                selected === plan.billing
                  ? 'var(--color-stroke-action)'
                  : 'var(--color-stroke-tertiary)',
            }}
          >
            <span
              className="w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center"
              style={{
                borderColor:
                  selected === plan.billing
                    ? 'var(--color-deep-purple)'
                    : 'var(--color-stroke-primary)',
              }}
            >
              {selected === plan.billing && (
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: 'var(--color-deep-purple)' }}
                />
              )}
            </span>
            <div className="-mt-1">
              <p className="text-base font-medium text-text-primary mb-1">{plan.label}</p>
              <p className="text-sm text-text-secondary">
                {plan.price} &middot; {plan.cadence}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3">
        <Button
          type="button"
          disabled={isLoading || !selected}
          onClick={handleReactivate}
          className={`px-4 text-sm! rounded-md! ${!selected && 'bg-[#F1F5F9]! text-text-primary!'}`}
        >
          {isLoading ? 'Please wait…' : 'Reactivate now'}
        </Button>
        <button
          type="button"
          onClick={() => router.push('/signin')}
          className="px-4 py-3 rounded-md text-sm font-semibold text-neutral-700 border border-neutral-300 hover:bg-neutral-50 transition-colors duration-150"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
