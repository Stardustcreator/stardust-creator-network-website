'use client';

import Link from 'next/link';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import { useSearchParams } from 'next/navigation';

export default function PricingCalculatorSuccessPage() {
  const email = useSearchParams()?.get('email');
  return (
    <>
      <Header variant="light" />

      <main className="bg-white pt-41 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Success Content */}
          <div className="text-center mb-24">
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
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Your quote has been sent successfully!
            </h1>
            <p className="text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
              Your quote PDF has been downloaded to your device and sent to{' '}
              <span className="font-semibold">{email}</span>. If the email doesn&apos;t show up in 5
              minutes, check your spam folder.
            </p>
          </div>

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
