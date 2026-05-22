import { Suspense } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import SuccessContent from '@/components/pricing-calculator/SuccessContent';

export default function PricingCalculatorSuccessPage() {
  return (
    <>
      <Header variant="light" />

      <main className="bg-white pt-41 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <Suspense>
            <SuccessContent />
          </Suspense>
          {/* Community CTA Card */}
          <div className="bg-accent-2-50 shadow-md rounded-lg p-8 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold text-text-primary mb-3">
              Join the Creator Community
            </h2>
            <p className="text-base text-text-secondary mb-6 leading-relaxed w-full lg:w-3/4 mx-auto">
              Join a community of creators building, learning, and growing together beyond
              individual projects.
            </p>
            <Link
              href="/join/scn-paid-community"
              className="inline-block px-6 py-2.5 bg-surface-action text-white text-sm font-medium rounded-lg hover:bg-surface-action/80 transition-colors"
            >
              Join Community
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
