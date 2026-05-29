'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import PreviewAndEditStep from '@/components/pricing-calculator/PreviewAndEditStep';
import QuoteSummary from '@/components/pricing-calculator/QuoteSummary';
import { usePricingCalculator } from '@/lib/contexts';
import { downloadQuotePdf } from '@/components/pricing-calculator/pdf.utils';

export default function MemberPreviewPage() {
  const router = useRouter();
  const { quote } = usePricingCalculator();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setDownloadError(null);
    try {
      await downloadQuotePdf({ quote, email: '' });
      router.push('/member/pricing-calculator/success');
    } catch {
      setDownloadError('Failed to generate PDF. Please try again.');
      setIsDownloading(false);
    }
  };

  return (
    <>
      <Header variant="light" />

      <main className="min-h-screen bg-white pt-28 md:pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            <div className="w-full md:flex-1 min-w-0 lg:border-r border-stroke-secondary lg:pr-8 md:h-[calc(100vh-180px)] overflow-scroll no-scrollbar">
              <PreviewAndEditStep />
            </div>

            <div className="shrink-0 w-full lg:w-[36%] lg:sticky lg:top-36">
              <QuoteSummary
                onSubmit={handleDownload}
                isSubmitting={isDownloading}
                submitError={downloadError}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
