'use client';

import Link from 'next/link';
import { Text } from '@/components/typography';
import { SectionHeader } from '@/components/shared';
import SplitScreenCarousel from './SplitScreenCarousel';

export default function IconGridSection() {
  return (
    <section
      id="stardust-creator-community"
      className="py-32 bg-gradient-to-b from-black via-neutral-950 to-black"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <SectionHeader
            words={[
              { text: 'Learn.', className: 'text-gradient-primary' },
              { text: 'Collaborate.', className: 'text-gradient-primary' },
              { text: 'Scale.', className: 'text-gradient-primary' },
            ]}
            subtitle="The Stardust Creator Community is Now Live."
            headingClassName="text-white"
            subtitleClassName="text-xl md:text-2xl lg:text-3xl font-semibold text-white mt-4"
            className="mb-8"
            staggerDelay={350}
            variant="fadeUp"
          />

          {/* Main Copy */}
          <Text
            variant="large"
            className="text-white mb-12 max-w-4xl mx-auto opacity-90"
          >
            The Stardust Creator Community will empower creators with access to education,
            monetization playbooks, and peer collaboration, all within a private, growth-focused
            ecosystem.
          </Text>

          <Text
            variant="body"
            className="text-white mb-12 max-w-3xl mx-auto opacity-75"
          >
            Join today and start connecting with fellow creators and brand opportunities.
          </Text>

          {/* Split Screen Carousel */}
          <div className="mb-16">
            <SplitScreenCarousel />
          </div>

          {/* Call-to-Action */}
          <div className="flex justify-center px-4">
            <button
              type="button"
              onClick={() => {
                document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center justify-center px-8 sm:px-12 py-3 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 w-full sm:w-auto max-w-sm sm:max-w-none cursor-pointer"
            >
              <span className="relative z-10">Join the Waitlist</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
            </button>
          </div>

          {/* Now Open Badge */}
          <div className="mt-12 inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-3"></div>
            <Text
              variant="small"
              className="text-white opacity-75"
              weight={500}
              as="span"
            >
              Now Open - ₦5,000/month
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}
