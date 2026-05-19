'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { Text } from '@/components/typography';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const benefits = [
  'Structured live clinics',
  'Pricing and negotiation playbooks',
  'Peer network of sub-10k creators',
  'Weekly office hours with the programs lead',
];

export default function SCNPaidCommunityPage() {
  const router = useRouter();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('annually');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paystackReady, setPaystackReady] = useState(true);

  // Always use Nigerian Naira
  const monthlyAmount = 5000;
  const annualAmount = 50000;
  const amount = billingPeriod === 'monthly' ? monthlyAmount : annualAmount;
  const periodText = billingPeriod === 'monthly' ? 'month' : 'year';

  const handleJoinCommunity = () => {
    // Navigate to account creation page with selected plan details
    router.push(
      `/join/scn-paid-community/create-account?plan=community&period=${billingPeriod}&amount=${amount}`
    );
  };

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
    const amountInSmallestUnit = amount * 100;

    const handler = PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxxxxxxxxxx', // Replace with actual key
      email: '', // Will be collected by Paystack
      amount: amountInSmallestUnit,
      currency: 'NGN',
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

      <Header variant="light" />

      <main className="relative bg-white min-h-screen">
        {/* Increased top spacing from navbar */}
        <div className="container mx-auto px-4 sm:px-6 pt-40 md:pt-48 pb-12 md:pb-20">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Choose your Plan</h1>
            <p className="text-gray-600 text-sm md:text-base">
              Start free with Community, upgrade when you're ready to grow
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center bg-gray-200 rounded-lg p-1">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  billingPeriod === 'monthly' ? 'text-white shadow-sm' : 'text-gray-600'
                }`}
                style={billingPeriod === 'monthly' ? { backgroundColor: '#57058B' } : {}}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('annually')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  billingPeriod === 'annually' ? 'text-white shadow-sm' : 'text-gray-600'
                }`}
                style={billingPeriod === 'annually' ? { backgroundColor: '#57058B' } : {}}
              >
                Annually
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Community Card (Purple) */}
            <div
              className="rounded-2xl p-8 text-white shadow-lg"
              style={{ background: 'linear-gradient(to bottom right, #A51CFF, #57058B)' }}
            >
              {/* Plan Title */}
              <div className="mb-6">
                <h2 className="text-xl font-medium mb-2">Community</h2>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="text-4xl font-bold">
                  ₦{amount.toLocaleString()}/{periodText}
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleJoinCommunity}
                type="button"
                className="w-full bg-white font-semibold py-2.5 px-8 rounded-lg hover:bg-gray-50 transition-colors mb-8 cursor-pointer"
                style={{ color: '#57058B' }}
              >
                Join Community
              </button>

              {/* Benefits */}
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <svg
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Creator OS Card (Gray - Coming Soon) */}
            <div className="bg-gray-100 rounded-2xl p-8 text-gray-800">
              {/* Plan Title */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">Creator OS</p>
                <h2 className="text-xl font-medium">Custom</h2>
              </div>

              {/* CTA Button (Disabled) */}
              <button
                disabled
                className="w-full bg-white text-gray-400 font-semibold py-3 px-6 rounded-lg mb-8 cursor-not-allowed border border-gray-200"
              >
                <span className="animate-pulse">Coming Soon...</span>
              </button>

              {/* Benefits */}
              <div className="space-y-3 text-gray-600">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">
                    Offer page builder — sell digital products, services, UGC packages
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">Audience capture and email list</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">Paystack payment collection</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">Subscriber broadcast tool</span>
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
