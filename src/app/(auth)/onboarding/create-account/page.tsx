import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import OnboardingStepper from '@/components/onboarding/OnboardingStepper';
import CreateAccountForm from '@/components/onboarding/CreateAccountForm';
import BackArrowIcon from '@/components/icons/BackArrowIcon';
import RedirectAuthenticatedUser from '@/components/auth/RedirectAuthenticatedUser';

export const metadata: Metadata = {
  title: 'Create Account – Stardust Creator Network',
  robots: { index: false },
};

type BillingPeriod = 'annual' | 'monthly';
type PlanId = 'community' | 'starter' | 'builder';

interface CreateAccountPageProps {
  searchParams?: {
    billing?: string;
    plan?: string;
  };
}

function getBillingPeriod(value?: string): BillingPeriod {
  return value === 'annual' ? 'annual' : 'monthly';
}

function getPlanId(value?: string): PlanId {
  if (value === 'community') return 'community';
  return value === 'starter' ? 'starter' : 'builder';
}

export default function CreateAccountPage({ searchParams }: CreateAccountPageProps) {
  const billing = getBillingPeriod(searchParams?.billing);
  const planId = getPlanId(searchParams?.plan);
  const paymentPath = `/onboarding/payment?plan=${planId}&billing=${billing}`;

  return (
    <>
      <Header variant="light" />

      <main
        id="main-content"
        className="bg-white pt-32 pb-36"
      >
        <RedirectAuthenticatedUser
          inactiveRedirect="/onboarding/reactivate"
          noSubscriptionRedirect={paymentPath}
        >
          <div className="w-full container mx-auto px-6">
            {/* Top bar: back link + stepper */}
            <div className="flex items-start flex-col md:flex-row justify-between mb-16 gap-10 md:gap-5">
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-800 transition-colors"
              >
                <BackArrowIcon />
                Back to Pricing
              </Link>

              <OnboardingStepper currentStep={2} />
            </div>

            {/* Form content */}
            <Suspense
              fallback={
                <div className="flex justify-center py-20">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                    style={{
                      borderColor: 'var(--color-deep-purple)',
                      borderTopColor: 'transparent',
                    }}
                  />
                </div>
              }
            >
              <CreateAccountForm
                initialBilling={billing}
                initialPlan={planId}
              />
            </Suspense>
          </div>
        </RedirectAuthenticatedUser>
      </main>

      <Footer />
    </>
  );
}
