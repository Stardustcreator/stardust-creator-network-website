'use client';

import Image from 'next/image';
import Link from 'next/link';

import TypewriterText from './TypewriterText';
import VideoBackground from './VideoBackground';
import { Heading, Text } from '@/components/typography';
import { LocationSpecificContent } from '@/components/shared';

export default function Hero() {
  return (
    <section className="hero-fullwidth relative min-h-[110vh] md:min-h-[115vh] overflow-hidden bg-black rounded-br-[40px] rounded-bl-[40px]">
      {/* Mobile Background Image - LCP element, highest priority */}
      <div className="absolute inset-0 z-0 block md:hidden">
        <Image
          src="/hero.webp"
          alt="Stardust Creator Network - Empowering digital creators with brand partnerships and monetization opportunities"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* YouTube Video Background - Optimized for fast loading and seamless loop */}
      <VideoBackground
        videoId="pOlLKhn-wao"
        className="absolute top-0 left-0 w-full h-full z-0 hidden md:block overflow-hidden"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content - responsive with generous top spacing from navbar and enough bottom space for CTA */}
      <div className="absolute top-36 left-0 right-0 z-20 px-6 pt-10 pb-20 md:top-44 md:px-8 md:pt-14 md:pb-24 lg:top-48 lg:px-12 lg:pt-16 lg:pb-28 max-w-5xl">
        {/* Main Headline */}
        <Heading
          level={1}
          variant="default"
          className="mb-2"
        >
          <TypewriterText
            words={['Learn.', 'Monetize.', 'Grow.']}
            typeSpeed={100}
            deleteSpeed={50}
            delayBetweenWords={2500}
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white leading-tight tracking-tight"
            cursorClassName="bg-white"
          />
        </Heading>

        <Heading
          level={2}
          variant="gradient"
          className="mb-3 text-xl md:text-2xl lg:text-3xl"
        >
          You’re Not Just a Content Creator.
          <br />
          You’re Building a Media Business.
        </Heading>

        <Text
          variant="large"
          className="text-white max-w-2xl mb-5 text-sm md:text-base lg:text-lg"
        >
          Stardust Creator Network helps creators turn content into structured income, systems, and
          long-term ownership.
        </Text>

        {/* Enhanced value proposition */}
        <div className="flex flex-wrap gap-4 mb-6 text-white/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
            <span className="text-sm font-medium">Brand Partnerships</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
            <span className="text-sm font-medium">Creator Education</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
            <span className="text-sm font-medium">Revenue Growth</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#waitlist"
            className="btn-primary"
            onClick={e => {
              e.preventDefault();
              document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            JOIN THE COMMUNITY
          </a>
          <Link
            href="#how-scn-works"
            className="btn-secondary"
          >
            SEE HOW SCN WORKS
          </Link>
        </div>
      </div>
    </section>
  );
}
