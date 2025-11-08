import Link from 'next/link';
import { Heading, Text } from '@/components/typography';

export default function ConnectCollaborateCreateSection() {
  return (
    <section
      id="who-we-are"
      className="py-20 bg-slate-900 rounded-[40px]"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Heading
              level={2}
              variant="default"
              className="text-white mb-6"
            >
              Connect. Collaborate. Create.
            </Heading>
            <Text
              variant="large"
              color="white"
              className="max-w-4xl mx-auto opacity-90"
            >
              We connect leading brands with Nigeria and the UK&apos;s most dynamic creators — from
              nano storytellers to macro influencers — to craft authentic campaigns that convert.
              More countries coming soon.
            </Text>
          </div>

          {/* Two-Column Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* For Brands Card */}
            <div className="group bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/70 hover:border-slate-600/50 transition-all duration-300">
              <Heading
                level={3}
                variant="default"
                className="text-white mb-4"
              >
                For Brands
              </Heading>
              <Text
                variant="body"
                color="white"
                className="mb-6 opacity-90"
              >
                Tell us your goals — we&apos;ll curate creators who bring your vision to life.
              </Text>
              <Link
                href="/brands"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-button rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
              >
                Find Creators
              </Link>
            </div>

            {/* For Creators Card */}
            <div className="group bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/70 hover:border-slate-600/50 transition-all duration-300">
              <Heading
                level={3}
                variant="default"
                className="text-white mb-4"
              >
                For Creators
              </Heading>
              <Text
                variant="body"
                color="white"
                className="mb-6 opacity-90"
              >
                Join our verified network and start collaborating today.
              </Text>
              <Link
                href="/creators"
                className="inline-flex items-center justify-center px-8 py-3 bg-slate-700 text-white text-button rounded-full hover:bg-slate-600 transition-all duration-300 transform hover:scale-105"
              >
                Join as Creator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
