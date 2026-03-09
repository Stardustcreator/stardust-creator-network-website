'use client';

import { useState } from 'react';
import { Heading, Text } from '@/components/typography';
import { SectionHeader } from '@/components/shared';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import {
  CURRENCIES,
  BASE_PRICE_NGN,
  convertPrice,
  formatPrice,
  getCurrencyLabel,
} from '@/lib/currency';

const benefits = [
  {
    id: 'live-clinics',
    title: 'Live clinics',
    icon: '📹',
  },
  {
    id: 'templates',
    title: 'Templates',
    icon: '📄',
  },
  {
    id: 'playbooks',
    title: 'Playbooks',
    icon: '📚',
  },
  {
    id: 'community',
    title: 'Community',
    icon: '👥',
  },
  {
    id: 'founder-insights',
    title: 'Founder insights',
    icon: '💡',
  },
];

export default function PricingSection() {
  const [selectedCurrency, setSelectedCurrency] = useState('NGN');
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px',
    triggerOnce: true,
  });

  const convertedPrice = convertPrice(BASE_PRICE_NGN, selectedCurrency);
  const formattedPrice = formatPrice(convertedPrice, selectedCurrency);

  return (
    <section
      id="pricing"
      ref={elementRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-black via-neutral-950 to-neutral-900 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/5 rounded-full blur-3xl"></div>
        {/* Subtle pattern texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Label */}
        <div className="text-center mb-6">
          <Text
            variant="small"
            className="text-purple-400 uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-xs sm:text-sm"
          >
            MEMBERSHIP PRICING
          </Text>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-6">
          <SectionHeader
            words={[
              { text: 'Affordable ', className: 'text-white' },
              { text: 'Access ', className: 'text-white' },
              { text: 'for ', className: 'text-white' },
              {
                text: 'Serious ',
                className:
                  'bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent',
              },
              {
                text: 'Creators',
                className:
                  'bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent',
              },
            ]}
            headingClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
            className="mb-0"
            centered={true}
            staggerDelay={150}
            level={2}
          />
        </div>

        {/* Supporting Text */}
        <div className="text-center mb-12 sm:mb-16">
          <Text
            variant="large"
            className="text-white/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-4 px-2"
          >
            A professional membership platform designed for creators who are serious about building
            their business.
          </Text>
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 mt-4">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0"
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
              variant="body"
              className="text-purple-300 font-medium text-sm sm:text-base"
            >
              Monthly Membership · Cancel Anytime
            </Text>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="max-w-lg mx-auto px-2 sm:px-0">
          {/* Glow effect */}
          <div
            className={`absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-0 transition-opacity duration-700 ${
              isIntersecting ? 'opacity-30' : ''
            }`}
          ></div>

          <div
            className={`relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl transition-all duration-700 ${
              isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Currency Selector */}
            <div className="mb-6 sm:mb-8">
              <label
                htmlFor="currency-selector"
                className="block text-white/70 text-sm font-medium mb-3"
              >
                Select Your Currency
              </label>
              <div className="relative">
                <select
                  id="currency-selector"
                  value={selectedCurrency}
                  onChange={e => setSelectedCurrency(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 sm:py-3.5 text-white text-sm sm:text-base font-medium appearance-none cursor-pointer transition-all hover:bg-white/15 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.keys(CURRENCIES).map(code => (
                    <option
                      key={code}
                      value={code}
                      className="bg-neutral-900 text-white"
                    >
                      {getCurrencyLabel(code)}
                    </option>
                  ))}
                </select>
                {/* Custom dropdown arrow */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-white/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6 sm:mb-8"></div>

            {/* Membership Benefits Header */}
            <div className="mb-4 sm:mb-6">
              <Heading
                level={3}
                variant="default"
                className="!text-white text-xl sm:text-2xl md:text-3xl font-bold"
                as="h3"
              >
                Monthly Membership
              </Heading>
            </div>

            {/* Price Display */}
            <div className="mb-6">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <div className="flex items-baseline gap-1.5 sm:gap-2">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {formattedPrice}
                  </span>
                  <span className="text-white/60 text-lg sm:text-xl font-medium">/month</span>
                </div>
              </div>
              <Text
                variant="small"
                className="text-white/60 mt-2 sm:mt-3 text-sm sm:text-base"
              >
                Get instant access to everything you need to grow:
              </Text>
            </div>

            {/* Benefits List */}
            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {benefits.map((benefit, index) => (
                <li
                  key={benefit.id}
                  className={`flex items-center gap-3 sm:gap-4 transition-all duration-500 ${
                    isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Check icon with gradient background */}
                  <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  {/* Benefit text */}
                  <Text
                    variant="body"
                    className="text-white/90 text-base sm:text-lg font-medium"
                  >
                    <span className="mr-1.5 sm:mr-2">{benefit.icon}</span>
                    {benefit.title}
                  </Text>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              onClick={() => {
                // TODO: Integrate with payment provider
                window.location.href = '/creators/join';
              }}
              className="group w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-base sm:text-lg py-4 sm:py-5 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/40 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-neutral-900 active:scale-[0.98]"
            >
              <span className="flex items-center justify-center gap-2">
                JOIN NOW
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>

            {/* Payment Info */}
            <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-white/10">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-2 sm:mb-3">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-green-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <Text
                    variant="small"
                    className="text-white/50 text-xs text-center sm:text-left"
                  >
                    Secure payment powered by Stripe, Paystack & Flutterwave
                  </Text>
                </div>
              </div>
              <Text
                variant="small"
                className="text-white/40 text-center text-xs leading-relaxed"
              >
                Billed monthly · Cancel anytime · No hidden fees
              </Text>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-10 sm:mt-12 px-4">
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 mb-6">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <Text
                variant="small"
                className="text-white/60 text-sm sm:text-base"
              >
                Monthly billing
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <Text
                variant="small"
                className="text-white/60 text-sm sm:text-base"
              >
                Cancel anytime
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <Text
                variant="small"
                className="text-white/60 text-sm sm:text-base"
              >
                Secure payments
              </Text>
            </div>
          </div>
          <Text
            variant="small"
            className="text-white/50 max-w-2xl mx-auto text-sm sm:text-base"
          >
            Join hundreds of creators who are building sustainable creator businesses with SCN.
          </Text>
        </div>
      </div>
    </section>
  );
}
