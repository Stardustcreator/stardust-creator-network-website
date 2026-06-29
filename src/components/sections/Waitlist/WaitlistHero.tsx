'use client';

import Image from 'next/image';
import { Heading, Text } from '@/components/typography';

export default function WaitlistHero() {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist-form');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="hero-fullwidth relative min-h-[90vh] sm:min-h-[95vh] md:min-h-[100vh] overflow-hidden bg-black rounded-br-[40px] rounded-bl-[40px] flex items-center justify-center">
      {/* Background Image - All Screens */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/who we are/creators.webp"
          alt="Stardust Creator Network - Turn Your Content Into a Structured Business"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={85}
          className="object-cover object-center"
        />
      </div>

      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto w-full pt-20 md:pt-32 lg:pt-40">
        {/* Main Headline */}
        <Heading
          level={1}
          variant="default"
          className="mb-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight tracking-tight"
        >
          Turn Your Content Into a Structured Business
        </Heading>

        {/* Subheadline */}
        <Text
          variant="large"
          className="text-white/90 max-w-3xl mb-6 text-base md:text-lg lg:text-xl leading-relaxed"
        >
          Stardust Creator Network helps creators turn content into structured income, systems, and
          long-term ownership.
        </Text>

        {/* Highlights with Icons */}
        <div className="flex flex-wrap gap-4 md:gap-6 mb-8">
          <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md rounded-full px-4 py-2.5 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <span className="text-xl">🤝</span>
            <span className="text-sm md:text-base font-semibold text-white">
              Brand Opportunities
            </span>
          </div>
          <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md rounded-full px-4 py-2.5 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <span className="text-xl">🛠️</span>
            <span className="text-sm md:text-base font-semibold text-white">
              Creator Tools & Resources
            </span>
          </div>
          <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md rounded-full px-4 py-2.5 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <span className="text-xl">👥</span>
            <span className="text-sm md:text-base font-semibold text-white">
              Community of Serious Creators
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div>
          <button
            onClick={scrollToWaitlist}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-base md:text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
          >
            <span className="relative z-10">Join The Waitlist</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
}
