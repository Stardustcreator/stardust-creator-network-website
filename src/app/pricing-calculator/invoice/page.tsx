'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

function InvoiceContent() {
  const router = useRouter();

  return (
    <>
      <Header variant="light" />

      <main className="min-h-screen bg-white pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Top Label */}
          <div className="mb-8">
            <span className="inline-block px-4 py-1.5 bg-gray-800 text-white text-xs font-medium rounded-full">
              Rate card Invoice
            </span>
          </div>

          {/* Content */}
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Your Invoice is Ready</h2>
              <p className="text-lg text-gray-600">
                You can preview and edit your invoice however you want before sending it to your
                email.
              </p>
            </div>

            {/* Email Preview Label */}
            <div className="mb-3">
              <p className="text-sm text-gray-500">Email preview</p>
            </div>

            {/* Invoice Preview Image */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden mb-8">
              <Image
                src="/invoice card.webp"
                alt="Invoice Preview"
                width={800}
                height={1000}
                className="w-full h-auto"
                priority
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => router.push('/pricing-calculator')}
                className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← Restart Process
              </button>
              <button
                onClick={() => {
                  // Pass data via URL params
                  const params = new URLSearchParams(window.location.search);
                  router.push(`/pricing-calculator/invoice/edit?${params.toString()}`);
                }}
                className="w-full sm:w-auto px-8 py-3 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                Preview & Edit Invoice
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function InvoicePreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-gray-900 text-lg">Loading invoice...</div>
        </div>
      }
    >
      <InvoiceContent />
    </Suspense>
  );
}
