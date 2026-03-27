'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Text } from '@/components/typography';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [reference, setReference] = useState<string | null>(null);

  useEffect(() => {
    const ref = searchParams?.get('ref') || null;
    setReference(ref);
  }, [searchParams]);

  return (
    <>
      <Header />
      <main className="relative min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-black flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-30"></div>

              {/* Card */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl text-center">
                {/* Success Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 rounded-full flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Payment Successful! 🎉
                </h1>

                {/* Message */}
                <Text
                  variant="large"
                  className="text-white/80 text-lg mb-6"
                >
                  Welcome to the SCN Paid Community! Your payment has been processed successfully.
                </Text>

                {/* Reference */}
                {reference && (
                  <div className="mb-8 p-4 bg-white/5 border border-white/10 rounded-xl">
                    <Text
                      variant="small"
                      className="text-white/50 text-xs uppercase tracking-wider mb-1"
                    >
                      Transaction Reference
                    </Text>
                    <Text
                      variant="body"
                      className="text-white/90 font-mono text-sm break-all"
                    >
                      {reference}
                    </Text>
                  </div>
                )}

                {/* Next Steps */}
                <div className="mb-8 text-left bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                  <Text
                    variant="body"
                    className="text-white font-semibold mb-4 text-lg"
                  >
                    What happens next?
                  </Text>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 text-lg flex-shrink-0">✓</span>
                      <Text
                        variant="small"
                        className="text-white/70"
                      >
                        Check your email for a confirmation and access instructions
                      </Text>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 text-lg flex-shrink-0">✓</span>
                      <Text
                        variant="small"
                        className="text-white/70"
                      >
                        You'll receive an invite to join the community within 24 hours
                      </Text>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 text-lg flex-shrink-0">✓</span>
                      <Text
                        variant="small"
                        className="text-white/70"
                      >
                        Access all playbooks, templates, and live clinics
                      </Text>
                    </li>
                  </ul>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/60 active:scale-95"
                  >
                    Return to Homepage
                  </Link>
                </div>

                {/* Support */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <Text
                    variant="small"
                    className="text-white/50 text-sm"
                  >
                    Questions?{' '}
                    <a
                      href="mailto:support@stardustcreatornetwork.com"
                      className="text-purple-400 hover:text-purple-300 underline"
                    >
                      Contact Support
                    </a>
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
