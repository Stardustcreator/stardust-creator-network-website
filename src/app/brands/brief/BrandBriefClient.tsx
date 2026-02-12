'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';

export default function BrandBriefClient() {
  const router = useRouter();
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    const detectLocationAndRedirect = async () => {
      try {
        // Try to get user's location from various sources
        const response = await fetch('/api/geolocation');
        if (response.ok) {
          const data = await response.json();
          const country = data.country;

          // Redirect based on detected country
          if (country === 'NG' || country === 'Nigeria') {
            router.push('/brands/brief/nigeria');
            return;
          } else if (country === 'GB' || country === 'UK' || country === 'United Kingdom') {
            router.push('/brands/brief/uk');
            return;
          }
        }
      } catch {
        console.log('Location detection failed, showing manual selection');
      }

      // If detection fails or country is not supported, show manual selection
      setIsDetecting(false);
    };

    // Add a small delay to show the loading state
    setTimeout(detectLocationAndRedirect, 1000);
  }, [router]);

  if (isDetecting) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin mx-auto mb-6"></div>
          <Heading
            level={2}
            className="text-white text-xl mb-2"
          >
            Personalizing...
          </Heading>
          <Text
            variant="body"
            className="text-white opacity-70"
          >
            Finding the best creators for your region
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
            <span className="text-purple-300 text-sm font-medium">Brand Partnerships</span>
          </div>

          <Heading
            level={1}
            className="text-white text-3xl md:text-4xl mb-4"
          >
            Choose Your Region
          </Heading>

          <Text
            variant="large"
            className="text-white opacity-80 mb-4"
          >
            Select your location to connect with verified creators in your market
          </Text>

          {/* Case Studies Link */}
          <div className="mt-6">
            <Text
              variant="body"
              className="text-purple-300 text-sm"
            >
              Want to see our work first?{' '}
              <Link
                href="/case-studies"
                className="underline hover:text-purple-200 transition-colors"
              >
                View Case Studies
              </Link>
            </Text>
          </div>
        </div>

        {/* Location Selection */}
        <div className="space-y-4 mb-8">
          {/* Nigeria Option */}
          <Link
            href="/brands/brief/nigeria"
            className="group relative overflow-hidden rounded-xl border border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-6 transition-all hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/10"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-2xl">🇳🇬</div>
                  <Heading
                    level={3}
                    className="text-white text-xl font-semibold"
                  >
                    Nigeria
                  </Heading>
                </div>
                <Text
                  variant="body"
                  className="text-white opacity-70"
                >
                  Connect with Nigeria's top creators and influencers
                </Text>
              </div>
              <div className="flex items-center text-purple-300 transition-transform group-hover:translate-x-1">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* UK Option */}
          <Link
            href="/brands/brief/uk"
            className="group relative overflow-hidden rounded-xl border border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-6 transition-all hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/10"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-2xl">🇬🇧</div>
                  <Heading
                    level={3}
                    className="text-white text-xl font-semibold"
                  >
                    United Kingdom
                  </Heading>
                </div>
                <Text
                  variant="body"
                  className="text-white opacity-70"
                >
                  Partner with UK-based creators and content makers
                </Text>
              </div>
              <div className="flex items-center text-purple-300 transition-transform group-hover:translate-x-1">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <Text
            variant="body"
            className="text-white opacity-60 text-sm"
          >
            Don't see your region?{' '}
            <Link
              href="/contact"
              className="text-purple-300 hover:text-purple-200 underline"
            >
              Contact us
            </Link>{' '}
            to discuss expansion opportunities.
          </Text>
        </div>
      </div>
    </div>
  );
}
