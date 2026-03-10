'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Heading, Text } from '@/components/typography';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

type PaymentStatus = 'loading' | 'success' | 'failed' | 'abandoned';

interface VerificationData {
  success: boolean;
  status: string;
  reference: string;
  amount: number;
  currency: string;
  customer: {
    email: string;
    firstName: string | null;
    lastName: string | null;
  };
}

function CallbackContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<PaymentStatus>('loading');
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!searchParams) {
        setStatus('failed');
        setError('No payment reference found');
        return;
      }

      const reference = searchParams.get('reference') || searchParams.get('trxref');

      if (!reference) {
        setStatus('failed');
        setError('No payment reference found');
        return;
      }

      try {
        const response = await fetch(`/api/membership/verify?reference=${reference}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Verification failed');
        }

        setVerificationData(data);

        if (data.success && data.status === 'success') {
          setStatus('success');
        } else if (data.status === 'abandoned') {
          setStatus('abandoned');
        } else {
          setStatus('failed');
          setError(data.message || 'Payment was not successful');
        }
      } catch (err) {
        setStatus('failed');
        setError(err instanceof Error ? err.message : 'Failed to verify payment');
      }
    };

    verifyPayment();
  }, [searchParams]);

  // Loading state
  if (status === 'loading') {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin mx-auto mb-6" />
        <Heading
          level={2}
          className="text-white text-2xl mb-2"
        >
          Verifying your payment...
        </Heading>
        <Text
          variant="body"
          className="text-white/70"
        >
          Please wait while we confirm your membership
        </Text>
      </div>
    );
  }

  // Success state
  if (status === 'success' && verificationData) {
    return (
      <div className="text-center py-12">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg
            className="w-12 h-12 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <Heading
          level={1}
          className="text-white text-3xl md:text-4xl mb-4"
        >
          Welcome to the Community!
        </Heading>

        <Text
          variant="large"
          className="text-white/80 mb-8 max-w-md mx-auto"
        >
          Your payment was successful. You&apos;re now a member of the Stardust Creator Community!
        </Text>

        {/* Payment Details */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 max-w-md mx-auto mb-8">
          <div className="space-y-3 text-left">
            <div className="flex justify-between">
              <span className="text-white/60">Amount Paid</span>
              <span className="text-white font-semibold">
                {verificationData.currency === 'NGN'
                  ? '₦'
                  : verificationData.currency === 'GBP'
                    ? '£'
                    : '$'}
                {verificationData.amount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Email</span>
              <span className="text-white">{verificationData.customer.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Reference</span>
              <span className="text-white text-sm">{verificationData.reference}</span>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6 max-w-md mx-auto mb-8">
          <Heading
            level={3}
            className="text-white text-lg mb-4"
          >
            What&apos;s Next?
          </Heading>
          <ul className="space-y-3 text-left">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-purple-400 text-sm font-semibold">1</span>
              </div>
              <Text
                variant="body"
                className="text-white/80"
              >
                Check your email for your welcome message and community access details
              </Text>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-purple-400 text-sm font-semibold">2</span>
              </div>
              <Text
                variant="body"
                className="text-white/80"
              >
                Join our exclusive Discord community using the invite link
              </Text>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-purple-400 text-sm font-semibold">3</span>
              </div>
              <Text
                variant="body"
                className="text-white/80"
              >
                Introduce yourself and start connecting with other creators
              </Text>
            </li>
          </ul>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
        >
          Return to Homepage
        </Link>
      </div>
    );
  }

  // Abandoned state
  if (status === 'abandoned') {
    return (
      <div className="text-center py-12">
        {/* Warning Icon */}
        <div className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg
            className="w-12 h-12 text-yellow-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <Heading
          level={1}
          className="text-white text-3xl md:text-4xl mb-4"
        >
          Payment Incomplete
        </Heading>

        <Text
          variant="large"
          className="text-white/80 mb-8 max-w-md mx-auto"
        >
          It looks like you didn&apos;t complete your payment. No worries - you can try again
          whenever you&apos;re ready!
        </Text>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/creator-community/join"
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            Try Again
          </Link>
          <Link
            href="/creator-community"
            className="inline-flex items-center justify-center px-8 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
          >
            View Pricing
          </Link>
        </div>
      </div>
    );
  }

  // Failed state
  return (
    <div className="text-center py-12">
      {/* Error Icon */}
      <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
        <svg
          className="w-12 h-12 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

      <Heading
        level={1}
        className="text-white text-3xl md:text-4xl mb-4"
      >
        Payment Failed
      </Heading>

      <Text
        variant="large"
        className="text-white/80 mb-4 max-w-md mx-auto"
      >
        Unfortunately, your payment could not be processed.
      </Text>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg max-w-md mx-auto mb-8">
          {error}
        </div>
      )}

      <Text
        variant="body"
        className="text-white/60 mb-8 max-w-md mx-auto"
      >
        Please check your card details and try again. If the problem persists, contact your bank or
        try a different payment method.
      </Text>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/creator-community/join"
          className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
        >
          Try Again
        </Link>
        <a
          href="mailto:support@stardustcreators.com"
          className="inline-flex items-center justify-center px-8 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}

export default function PaymentCallbackPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl mx-auto">
            <Suspense
              fallback={
                <div className="text-center py-20">
                  <div className="w-20 h-20 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin mx-auto mb-6" />
                  <Text
                    variant="body"
                    className="text-white/70"
                  >
                    Loading...
                  </Text>
                </div>
              }
            >
              <CallbackContent />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
