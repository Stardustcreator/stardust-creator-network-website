'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import { Text } from '@/components/typography';
import { CURRENCIES, FIXED_PRICES } from '@/lib/currency';
import { detectUserCurrency } from '@/lib/services/geolocation.service';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const benefits = [
  {
    icon: '📹',
    title: 'Live Clinics',
    description: 'Weekly sessions with industry experts',
  },
  {
    icon: '📚',
    title: 'Playbooks & Templates',
    description: 'Proven frameworks to grow your business',
  },
  {
    icon: '🎯',
    title: 'Creator Case Studies',
    description: 'Learn from real success stories',
  },
  {
    icon: '👥',
    title: 'Community Access',
    description: 'Connect with serious creators',
  },
  {
    icon: '💡',
    title: 'Founder Insights',
    description: 'Direct access to SCN leadership',
  },
];

export default function SCNPaidCommunityPage() {
  const [selectedCurrency, setSelectedCurrency] = useState<'NGN' | 'USD' | 'GBP' | 'CAD'>('USD');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paystackReady, setPaystackReady] = useState(false);
  const [isDetectingCountry, setIsDetectingCountry] = useState(true);

  // Auto-detect user's currency on mount
  useEffect(() => {
    const detectCurrency = async () => {
      try {
        const detectedCurrency = await detectUserCurrency();
        setSelectedCurrency(detectedCurrency);
      } catch (error) {
        console.warn('Failed to detect currency:', error);
        setSelectedCurrency('USD'); // Fallback to USD
      } finally {
        setIsDetectingCountry(false);
      }
    };

    detectCurrency();
  }, []);

  const currency = CURRENCIES[selectedCurrency];
  const amount = FIXED_PRICES[selectedCurrency];

  const handlePayment = () => {
    setPaymentLoading(true);

    // Check if PaystackPop is available
    if (typeof window === 'undefined' || !(window as any).PaystackPop) {
      alert('Payment system is loading. Please try again in a moment.');
      setPaymentLoading(false);
      return;
    }

    const PaystackPop = (window as any).PaystackPop;

    // Convert amount to kobo for NGN (Paystack requires smallest currency unit)
    const amountInSmallestUnit = selectedCurrency === 'NGN' ? amount * 100 : amount * 100;

    const handler = PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxxxxxxxxxx', // Replace with actual key
      email: '', // Will be collected by Paystack
      amount: amountInSmallestUnit,
      currency: selectedCurrency,
      ref: 'SCN_' + Math.floor(Math.random() * 1000000000 + 1),
      metadata: {
        custom_fields: [
          {
            display_name: 'Product',
            variable_name: 'product',
            value: 'SCN Paid Community Membership',
          },
        ],
      },
      onClose: function () {
        setPaymentLoading(false);
      },
      callback: function (response: any) {
        // Payment successful
        setPaymentLoading(false);
        window.location.href = `/join/scn-paid-community/success?ref=${response.reference}`;
      },
    });

    handler.openIframe();
  };

  return (
    <>
      {/* Load Paystack Inline JS */}
      <Script
        src="https://js.paystack.co/v1/inline.js"
        onLoad={() => setPaystackReady(true)}
        strategy="lazyOnload"
      />

      <Header />

      <main className="relative bg-gradient-to-b from-neutral-950 via-neutral-900 to-black overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-20 md:py-32">
          {/* Hero Section */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Join The{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                SCN Paid Community
              </span>
            </h1>
            <Text
              variant="large"
              className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto"
            >
              Access the systems, playbooks, and community designed to help creators build
              structured, sustainable income.
            </Text>
          </div>

          {/* Pricing Card */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-30"></div>

              {/* Card */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                {/* Title */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    SCN Paid Community Access
                  </h2>
                  <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 mt-2">
                    <svg
                      className="w-4 h-4 text-purple-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <Text
                      variant="small"
                      className="text-purple-300 font-medium text-sm"
                    >
                      Monthly · Cancel Anytime
                    </Text>
                  </div>
                </div>

                {/* Detected Location Display */}
                <div className="mb-8">
                  <label className="block text-white/70 text-sm font-medium mb-3">
                    Your Location & Currency
                  </label>
                  <div className="relative">
                    <div className="w-full px-4 py-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl">
                      {isDetectingCountry ? (
                        <div className="flex items-center justify-center gap-3">
                          <svg
                            className="animate-spin h-5 w-5 text-purple-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <Text
                            variant="small"
                            className="text-white/70 text-sm font-medium"
                          >
                            Detecting your location...
                          </Text>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{currency.flag}</span>
                            <div>
                              <div className="text-white font-semibold">{currency.name}</div>
                              <Text
                                variant="small"
                                className="text-white/60 text-xs"
                              >
                                Currency: {currency.code} ({currency.symbol})
                              </Text>
                            </div>
                          </div>
                          <svg
                            className="w-5 h-5 text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  <Text
                    variant="small"
                    className="text-white/50 text-xs mt-2"
                  >
                    💡 Pricing is automatically set based on your location
                  </Text>
                </div>

                {/* Price Display */}
                <div className="text-center mb-8">
                  <div className="inline-block">
                    <div className="flex items-baseline justify-center gap-2 mb-2">
                      <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                        {currency.symbol}
                        {amount}
                      </span>
                      <span className="text-xl md:text-2xl text-white/60 font-medium">/month</span>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-8 space-y-4">
                  <Text
                    variant="small"
                    className="text-white/70 font-medium uppercase tracking-wider text-xs mb-4"
                  >
                    What's Included:
                  </Text>
                  {benefits.map(benefit => (
                    <div
                      key={benefit.title}
                      className="flex items-start gap-3"
                    >
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg">
                        <span className="text-lg">{benefit.icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-semibold mb-1">{benefit.title}</div>
                        <Text
                          variant="small"
                          className="text-white/60 text-sm"
                        >
                          {benefit.description}
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={handlePayment}
                  disabled={paymentLoading || !paystackReady || isDetectingCountry}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-xl py-4 px-8 rounded-xl shadow-lg shadow-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/60 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {paymentLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span
                      className="flex items-center justify-center gap-3"
                      style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5), 0 0 2px rgba(0,0,0,0.8)' }}
                    >
                      <span className="text-2xl">👉</span>
                      <span className="tracking-wide text-white">GET ACCESS NOW</span>
                    </span>
                  )}
                </button>

                {/* Trust Indicators */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-white/50">
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Monthly Billing</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span>Cancel Anytime</span>
                  </div>
                </div>

                {/* Payment Provider */}
                <div className="mt-6 text-center">
                  <Text
                    variant="small"
                    className="text-white/40 text-xs"
                  >
                    Powered by Stardust Creator Network
                  </Text>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-12 max-w-2xl mx-auto">
            <Text
              variant="small"
              className="text-white/50 text-sm"
            >
              Need help? Contact us at{' '}
              <a
                href="mailto:support@stardustcreatornetwork.com"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                support@stardustcreatornetwork.com
              </a>
            </Text>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
