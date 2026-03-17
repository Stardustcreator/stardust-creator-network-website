import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = generateMetaTags({
  title: 'Our Brand Partnership Process | Stardust Creator Network',
  description:
    'Learn about our streamlined process for connecting brands with top creators. Discover how we match brands with the right influencers to create authentic, impactful campaigns.',
  url: '/brands/process',
});

export default function BrandProcessPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-purple-900 text-white relative">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/brands/happy-teenager-apartment-delighted-discuss-topics-with-fans.webp"
            alt="Creator taking a selfie in a creative workspace"
            fill
            priority
            className="object-cover opacity-30"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-24 pt-36 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
              Our Brand Partnership Process
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              We've streamlined the brand-creator collaboration process to ensure authentic
              partnerships that drive real results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-purple-300">Step 1: Discovery</h3>
              </div>
              <p className="text-white/80">
                <strong>For Brands:</strong> We understand your goals, target audience, and campaign
                objectives.
                <br />
                <strong>For Creators:</strong> We learn about your niche, audience, and
                collaboration preferences to find perfect brand matches.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-purple-300">Step 2: Matching</h3>
              </div>
              <p className="text-white/80">
                Our team analyzes profiles, engagement rates, and audience demographics to create
                perfect partnerships that align with both brand values and creator authenticity.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3 5.197z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-purple-300">Step 3: Collaboration</h3>
              </div>
              <p className="text-white/80">
                We facilitate seamless communication and provide tools for content planning,
                ensuring both brands and creators feel supported throughout the partnership journey.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-purple-300">Step 4: Results</h3>
              </div>
              <p className="text-white/80">
                Track campaign performance with detailed analytics. Brands measure ROI and reach,
                while creators gain insights to grow their audience and enhance future
                collaborations.
              </p>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/creators/join"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-colors text-center"
              >
                Join as a Creator
              </Link>
              <Link
                href="/"
                className="bg-transparent border-2 border-purple-500 hover:bg-purple-500 text-white px-8 py-3 rounded-full font-semibold transition-colors text-center"
              >
                Explore Network
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
