'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import PreviewAndEditStep from '@/components/pricing-calculator/PreviewAndEditStep';
import QuoteSummary from '@/components/pricing-calculator/QuoteSummary';
import { usePricingCalculator } from '@/lib/contexts';
import { downloadQuotePdf } from '@/components/pricing-calculator/pdf.utils';
import { submitRateCardQuote, RateCardApiError } from '@/lib/api/rate-card';

export default function PreviewPage() {
  const router = useRouter();
  const { emailAddress, quote } = usePricingCalculator();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    setSubmitError(null);
  }, [emailAddress]);

  const handleSubmit = async () => {
    if (isSubmitting || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress.trim())) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitRateCardQuote({
        email: emailAddress.trim(),
        items: quote.items,
        subtotal: quote.subtotal,
        licensing: quote.licensing,
        discount: quote.discount,
        total: quote.finalTotal,
      });
      await downloadQuotePdf({ quote, email: emailAddress });
      window.sessionStorage.setItem(
        'pricing-calculator:last-quote',
        JSON.stringify({ email: emailAddress, finalTotal: quote.finalTotal })
      );
      router.push(`/pricing-calculator/success?email=${encodeURIComponent(emailAddress.trim())}`);
    } catch (error) {
      setSubmitError(
        error instanceof RateCardApiError
          ? error.message
          : 'Something went wrong. Please try again.'
      );
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header variant="light" />

      <main className="min-h-screen bg-white pt-28 md:pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Left: all editable sections — scrolls naturally */}
            <div className="w-full md:flex-1 min-w-0 lg:border-r border-stroke-secondary lg:pr-8 md:h-[calc(100vh-180px)] overflow-scroll no-scrollbar">
              <PreviewAndEditStep />
            </div>

            {/* Right: summary — sticks to top while left scrolls */}
            <div className="shrink-0 w-full lg:w-[36%] lg:sticky lg:top-36">
              <QuoteSummary
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                submitError={submitError}
                emailAddress={emailAddress}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
