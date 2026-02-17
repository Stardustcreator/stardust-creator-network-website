'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heading, Text } from '@/components/typography';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import {
  PricingCard,
  ValuePropositions,
  FAQSection,
  SocialProof,
} from '@/components/creator-community';
import {
  MEMBERSHIP_PRICING,
  type SupportedCountry,
  type MembershipPricing,
} from '@/types/creator-community.types';

// Map country codes to display names (only Nigeria and UK available)
const COUNTRY_NAMES: Partial<Record<SupportedCountry, string>> = {
  NG: 'Nigeria',
  GB: 'United Kingdom',
};

export default function CreatorCommunityPricingPage() {
  const [pricing, setPricing] = useState<MembershipPricing>(MEMBERSHIP_PRICING.NG);
  const [countryCode, setCountryCode] = useState<SupportedCountry>('NG');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectLocation = async () => {
      try {
        const response = await fetch('/api/geolocation');
        if (response.ok) {
          const data = await response.json();
          const country = data.countryCode || data.country;

          // Map country to pricing (only Nigeria and UK supported)
          if (country === 'United Kingdom' || country === 'GB' || country === 'UK') {
            setCountryCode('GB');
            setPricing(MEMBERSHIP_PRICING.GB);
          } else {
            // Default to Nigeria for all other countries
            setCountryCode('NG');
            setPricing(MEMBERSHIP_PRICING.NG);
          }
        }
      } catch (error) {
        console.log('Location detection failed, defaulting to Nigeria:', error);
      } finally {
        setIsLoading(false);
      }
    };

    detectLocation();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-8">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-purple-300 text-sm font-medium">Now Open for Membership</span>
              </div>

              {/* Headline */}
              <Heading
                level={1}
                className="text-white text-4xl md:text-5xl lg:text-6xl mb-6"
              >
                Join the <span className="text-gradient-primary">Stardust Creator Community</span>
              </Heading>

              {/* Subtitle */}
              <Text
                variant="large"
                className="text-white/80 max-w-2xl mx-auto mb-8"
              >
                Connect, collaborate, and grow with Africa&apos;s most ambitious creators. Get
                access to exclusive opportunities, resources, and a supportive community.
              </Text>

              {/* Scroll indicator */}
              <div className="flex justify-center">
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <span>See Pricing</span>
                  <svg
                    className="w-5 h-5 animate-bounce"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Value Propositions */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-6">
            <ValuePropositions />
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="py-16 md:py-24 scroll-mt-24"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Heading
                  level={2}
                  className="text-white text-2xl md:text-3xl lg:text-4xl mb-4"
                >
                  Simple, Transparent Pricing
                </Heading>
                <Text
                  variant="large"
                  className="text-white/70"
                >
                  One membership. Everything you need to grow.
                </Text>
              </div>

              {/* Currency selector */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2">
                  <Text
                    variant="small"
                    className="text-white/60"
                  >
                    Showing prices for:
                  </Text>
                  <select
                    value={countryCode}
                    onChange={e => {
                      const code = e.target.value as SupportedCountry;
                      setCountryCode(code);
                      setPricing(MEMBERSHIP_PRICING[code]);
                    }}
                    className="bg-neutral-900 text-white font-medium border border-white/20 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer appearance-none pr-8"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.5rem center',
                      backgroundSize: '1rem',
                    }}
                    disabled={isLoading}
                  >
                    {Object.entries(COUNTRY_NAMES).map(([code, name]) => (
                      <option
                        key={code}
                        value={code}
                        className="bg-neutral-900 text-white py-2"
                      >
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pricing Card */}
              <div className="max-w-lg mx-auto">
                {isLoading ? (
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 animate-pulse">
                    <div className="h-8 bg-white/10 rounded mb-4 w-1/3"></div>
                    <div className="h-12 bg-white/10 rounded mb-6 w-1/2"></div>
                    <div className="h-4 bg-white/10 rounded mb-2 w-full"></div>
                    <div className="h-4 bg-white/10 rounded mb-8 w-3/4"></div>
                    <div className="h-14 bg-white/10 rounded mb-8"></div>
                    <div className="space-y-3">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div
                          key={i}
                          className="h-12 bg-white/10 rounded"
                        ></div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <PricingCard
                    pricing={pricing}
                    countryName={COUNTRY_NAMES[countryCode]}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 md:py-24 bg-black/50">
          <div className="container mx-auto px-6">
            <SocialProof />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <FAQSection />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <Heading
                level={2}
                className="text-white text-2xl md:text-3xl lg:text-4xl mb-6"
              >
                Ready to Join?
              </Heading>
              <Text
                variant="large"
                className="text-white/70 mb-8"
              >
                Start your creator journey with the support of a thriving community.
              </Text>
              <Link
                href="/creator-community/join"
                className="inline-flex items-center justify-center px-12 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
              >
                Join Now - {pricing.formatted}/{pricing.period}
              </Link>
              <div className="mt-6">
                <Text
                  variant="small"
                  className="text-white/50"
                >
                  Cancel anytime
                </Text>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
