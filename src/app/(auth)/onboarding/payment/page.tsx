import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import OnboardingStepper from '@/components/onboarding/OnboardingStepper';
import PaymentPageContent from '@/components/onboarding/PaymentPageContent';
import BackArrowIcon from '@/components/icons/BackArrowIcon';

export const metadata: Metadata = {
  title: 'Complete Payment – Stardust Creator Network',
  robots: { index: false },
};

export default function OnboardingPaymentPage() {
  return (
    <>
      <Header variant="light" />

      <main
        id="main-content"
        className="bg-white pt-32 pb-36"
      >
        <div className="w-full container mx-auto px-6">
          <div className="flex items-start flex-col md:flex-row justify-between mb-16 gap-10 md:gap-5">
            <Link
              href="/onboarding/create-account"
              className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-800 transition-colors"
            >
              <BackArrowIcon />
              Back
            </Link>

            <OnboardingStepper currentStep={3} />
          </div>

          <Suspense
            fallback={
              <div className="flex justify-center py-20">
                <div
                  className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                  style={{ borderColor: 'var(--color-deep-purple)', borderTopColor: 'transparent' }}
                />
              </div>
            }
          >
            <PaymentPageContent />
          </Suspense>
        </div>
      </main>

      <Footer />
    </>
  );
}
