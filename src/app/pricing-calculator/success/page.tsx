'use client';

import Link from 'next/link';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

export default function PricingCalculatorSuccessPage() {
  return (
    <>
      <Header variant="light" />

      <main className="min-h-screen bg-[#f7f7f7] pt-40 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          {/* Success Content */}
          <div className="text-center mb-12">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Your quote has been sent successfully!
            </h1>
            <p className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
              We've sent your full quote breakdown and PDF to [email]. If it doesn't show up in 5
              minutes, check your spam folder.
            </p>
          </div>

          {/* Community CTA Card */}
          <div className="bg-[#FFF8F0] border border-gray-200 rounded-lg p-8 text-center max-w-xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Join the Creator Community</h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Join a community of creators building, learning, and growing together beyond
              individual projects.
            </p>
            <Link
              href="/join/scn-paid-community"
              className="inline-block px-6 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
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
