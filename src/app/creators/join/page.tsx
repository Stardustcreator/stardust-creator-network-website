'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

export default function CreatorJoinPage() {
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
            router.push('/join/creator/nigeria');
            return;
          } else if (country === 'GB' || country === 'UK' || country === 'United Kingdom') {
            router.push('/join/creator/uk');
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
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin mx-auto mb-6"></div>
            <Heading
              level={2}
              className="text-white text-xl mb-2"
            >
              Detecting your location...
            </Heading>
            <Text
              variant="body"
              className="text-white opacity-70"
            >
              We&apos;re finding the best application form for your region
            </Text>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* Header */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
                <span className="text-purple-300 text-sm font-medium">Creator Applications</span>
              </div>

              <Heading
                level={1}
                className="text-white"
                className="text-3xl md:text-4xl mb-4"
              >
                Choose Your Region
              </Heading>

              <Text
                variant="large"
                className="text-white"
                className="opacity-80"
              >
                Select your location to access the most relevant application form and opportunities
              </Text>
            </div>

            {/* Location Selection */}
            <div className="space-y-4 mb-8">
              <Link
                href="/join/creator/nigeria"
                className="block w-full bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6 text-left hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">🇳🇬</div>
                    <div>
                      <Heading
                        level={3}
                        className="text-white"
                        className="text-lg mb-1"
                      >
                        Nigeria
                      </Heading>
                      <Text
                        variant="body"
                        className="text-white"
                        className="opacity-70"
                      >
                        Join Nigeria&apos;s leading creator network
                      </Text>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-white/40 group-hover:text-purple-400 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </Link>

              <Link
                href="/join/creator/uk"
                className="block w-full bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6 text-left hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">🇬🇧</div>
                    <div>
                      <Heading
                        level={3}
                        className="text-white"
                        className="text-lg mb-1"
                      >
                        United Kingdom
                      </Heading>
                      <Text
                        variant="body"
                        className="text-white"
                        className="opacity-70"
                      >
                        Join the UK&apos;s innovative creator network
                      </Text>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-white/40 group-hover:text-purple-400 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </Link>

              <div className="block w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-left opacity-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">🌍</div>
                    <div>
                      <Heading
                        level={3}
                        className="text-white"
                        className="text-lg mb-1"
                      >
                        Other Regions
                      </Heading>
                      <Text
                        variant="body"
                        className="text-white"
                        className="opacity-70"
                      >
                        Coming soon to more countries
                      </Text>
                    </div>
                  </div>
                  <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded-full">
                    Soon
                  </span>
                </div>
              </div>
            </div>

            {/* Help Text */}
            <div className="text-center">
              <Text
                variant="caption"
                className="text-white"
                className="opacity-60"
              >
                Don&apos;t see your region?{' '}
                <a
                  href="mailto:hello@stardustcreatornetwork.com"
                  className="text-purple-400 hover:text-purple-300 underline"
                >
                  Contact us
                </a>{' '}
                to learn about expansion plans.
              </Text>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
