'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PlanBanner from './PlanBanner';
import { CheckoutForm, type CheckoutValues } from './CheckoutForm';
import Modal from '../ui/modal';
import { initializePayment } from '@/lib/api/payments';
import { getMyProfile } from '@/lib/api/user';
import { getScnDashboardUrl } from '@/lib/scn-dashboard';
import { toast } from '@/lib/toast';

type BillingPeriod = 'annual' | 'monthly';
type PlanId = 'community' | 'starter' | 'builder';

const CHECKOUT_PRICE: Record<PlanId, Record<BillingPeriod, string>> = {
  community: { annual: '₦50,000', monthly: '₦5,000' },
  starter: { annual: '₦0', monthly: '₦0' },
  builder: { annual: '₦75,000', monthly: '₦7,500' },
};

const PLAN_NAME: Record<PlanId, string> = {
  community: 'Community',
  starter: 'Starter',
  builder: 'Builder',
};

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

  const [billing, setBilling] = useState<BillingPeriod>('monthly');
  const [plan, setPlan] = useState<PlanId | null>(null);
  const [profile, setProfile] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const initialized = useRef(false);

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

    if (resolvedPlan === 'starter') {
      window.location.href = getScnDashboardUrl();
      return;
    }

    getMyProfile()
      .then(({ firstName, lastName, email }) => {
        setProfile({ firstName, lastName, email });
        setIsLoading(false);
        setShowCheckout(true);
      })
      .catch(() => {
        toast.error('Please sign in to continue.');
        router.replace('/signin');
      });
  }, [router, searchParams]);

  async function handleCheckoutSubmit(values: CheckoutValues) {
    if (!plan) return;
    setIsSubmitting(true);
    try {
      const { checkoutUrl, reference, requiresPayment } = await initializePayment(
        billing,
        plan,
        values.couponCode
      );

      const goToSuccess = () => {
        const params = new URLSearchParams({
          reference: reference ?? '',
          firstName: profile?.firstName ?? '',
          email: profile?.email ?? '',
        });
        router.push(`/onboarding/success?${params.toString()}`);
      };

      if (!requiresPayment) {
        goToSuccess();
        return;
      }

      const accessCode = checkoutUrl?.split('/').pop();
      if (!accessCode) {
        throw new Error('Invalid payment session. Please try again.');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { default: PaystackPop } = (await import('@paystack/inline-js')) as any;
      const popup = new PaystackPop();
      const trans = popup.resumeTransaction(accessCode);

      trans.onSuccess = () => goToSuccess();
      trans.onError = () => {
        toast.error('Payment failed. Please try again.');
        setIsSubmitting(false);
      };
      trans.onCancel = () => setIsSubmitting(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  }

  const spinner = (
    <div className="flex justify-center py-20">
      <div
        className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: 'var(--color-deep-purple)', borderTopColor: 'transparent' }}
      />
    </div>
  );

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

      {isLoading && spinner}

      {plan && profile && (
        <Modal
          open={showCheckout}
          onClose={() => {
            setShowCheckout(false);
            router.push('/onboarding');
          }}
          mobileSheet
          ariaLabel="Subscription Checkout"
          className="w-xl"
        >
          <CheckoutForm
            offerId={`${plan}_${billing}`}
            priceLabel={CHECKOUT_PRICE[plan][billing]}
            planLabel={`${PLAN_NAME[plan]} Plan (${billing === 'monthly' ? 'Monthly' : 'Annual'})`}
            busy={isSubmitting}
            initialFirstName={profile.firstName}
            initialLastName={profile.lastName}
            initialEmail={profile.email}
            onSubmit={handleCheckoutSubmit}
            onCancel={() => {
              setShowCheckout(false);
              router.push('/onboarding');
            }}
          />
        </Modal>
      )}
    </div>
  );
}
