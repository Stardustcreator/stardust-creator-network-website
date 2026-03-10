'use client';

import { useState, useEffect } from 'react';
import { MembershipPricing, type SupportedCountry } from '@/types/creator-community.types';

interface PaystackButtonProps {
  pricing: MembershipPricing;
  country: SupportedCountry;
  className?: string;
  children: React.ReactNode;
}

// Declare Paystack types
declare global {
  interface Window {
    PaystackPop: {
      setup: (config: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        metadata?: Record<string, unknown>;
        callback: (response: { reference: string; status: string }) => void;
        onClose: () => void;
      }) => {
        openIframe: () => void;
      };
    };
  }
}

export default function PaystackButton({
  pricing,
  country,
  className = '',
  children,
}: PaystackButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paystackLoaded, setPaystackLoaded] = useState(false);

  // Load Paystack script
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.PaystackPop) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => setPaystackLoaded(true);
      document.body.appendChild(script);
    } else if (window.PaystackPop) {
      setPaystackLoaded(true);
    }
  }, []);

  const generateReference = () => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `SCN-${timestamp}-${randomStr}`.toUpperCase();
  };

  const handlePayment = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // Get the public key from environment
      const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

      if (!publicKey) {
        throw new Error('Paystack is not configured');
      }

      if (!paystackLoaded || !window.PaystackPop) {
        throw new Error('Payment system is loading. Please try again.');
      }

      // Convert amount to smallest unit (kobo for NGN, pence for GBP)
      const amountInSmallestUnit = pricing.amount * 100;

      const handler = window.PaystackPop.setup({
        key: publicKey,
        email: email,
        amount: amountInSmallestUnit,
        currency: pricing.currency,
        ref: generateReference(),
        metadata: {
          country: country,
          membershipType: 'creator-community',
        },
        callback: response => {
          // Payment successful
          setShowModal(false);
          setIsLoading(false);
          // Redirect to callback page for verification
          window.location.href = `/creator-community/join/callback?reference=${response.reference}`;
        },
        onClose: () => {
          setIsLoading(false);
        },
      });

      handler.openIframe();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={className}
      >
        {children}
      </button>

      {/* Email Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => !isLoading && setShowModal(false)}
          />

          {/* Modal */}
          <div className="relative bg-neutral-900 border border-white/10 rounded-2xl p-6 md:p-8 w-full max-w-md">
            {/* Close button */}
            <button
              onClick={() => !isLoading && setShowModal(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              disabled={isLoading}
            >
              <svg
                className="w-6 h-6"
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
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="text-white text-xl font-bold mb-2">Join Creator Community</h3>
              <p className="text-white/60 text-sm">
                Enter your email to complete payment of{' '}
                <span className="text-white font-semibold">{pricing.formatted}/month</span>
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-white/80 text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={isLoading}
                autoFocus
                onKeyDown={e => e.key === 'Enter' && handlePayment()}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handlePayment}
              disabled={isLoading || !paystackLoaded}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-8 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Pay {pricing.formatted}
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </>
              )}
            </button>

            {/* Security note */}
            <div className="flex items-center justify-center gap-2 mt-4 text-white/40">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="text-xs">Secured by Paystack</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
