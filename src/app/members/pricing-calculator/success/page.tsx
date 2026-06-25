import { Suspense } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import SuccessContent from '@/components/pricing-calculator/SuccessContent';

export default function MemberPricingCalculatorSuccessPage() {
  return (
    <>
      <Header variant="light" />

      <main className="bg-white pt-41 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <Suspense>
            <SuccessContent />
          </Suspense>

          <div className="text-center">
            <Link
              href="/members/pricing-calculator"
              className="inline-block px-6 py-2.5 bg-surface-action text-white text-sm font-medium rounded-lg hover:bg-surface-action/80 transition-colors"
            >
              Calculate Another Quote
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
