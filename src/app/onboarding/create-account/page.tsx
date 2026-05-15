import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import OnboardingStepper from '@/components/onboarding/OnboardingStepper';
import CreateAccountForm from '@/components/onboarding/CreateAccountForm';

export const metadata: Metadata = {
  title: 'Create Account – Stardust Creator Network',
  robots: { index: false },
};

function BackArrow() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
}

export default function CreateAccountPage() {
  return (
    <>
      <Header variant="light" />

      <main
        id="main-content"
        className="min-h-screen bg-white pt-32 pb-20"
      >
        <div className="w-full container mx-auto px-6">
          {/* Top bar: back link + stepper */}
          <div className="flex items-start flex-col md:flex-row justify-between mb-16 gap-10 md:gap-5">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-800 transition-colors"
            >
              <BackArrow />
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
                  style={{ borderColor: 'var(--color-deep-purple)', borderTopColor: 'transparent' }}
                />
              </div>
            }
          >
            <CreateAccountForm />
          </Suspense>
        </div>
      </main>

      <Footer />
    </>
  );
}
