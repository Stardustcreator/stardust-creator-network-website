'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import TypewriterText from './TypewriterText';
import { Heading, Text } from '@/components/typography';
import { LocationSpecificContent } from '@/components/shared';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    // Load video only when hero section is visible (it always is, but this ensures it loads after initial render)
    // Use a small delay to prioritize image loading first
    const timer = setTimeout(() => {
      setShouldLoadVideo(true);
      if (videoRef.current) {
        videoRef.current.load();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero-fullwidth relative min-h-screen overflow-hidden bg-black rounded-br-[40px] rounded-bl-[40px]">
      {/* Mobile Background Image - LCP element, highest priority */}
      <Image
        src="/hero.webp"
        alt="Stardust Creator Network - Empowering digital creators with brand partnerships and monetization opportunities"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="z-0 object-cover md:hidden"
      />

      {/* Video Background - Loaded after initial render for better performance */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0 hidden md:block"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
      >
        {shouldLoadVideo && (
          <source
            src="/output.webm"
            type="video/webm"
          />
        )}
        {/* Fallback for browsers that don't support video */}
        <Image
          src="/hero.webp"
          alt="Stardust Creator Network - Empowering digital creators with brand partnerships and monetization opportunities"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </video>

      {/* Simplified gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/30 to-black/60 z-10" />

      {/* Content - responsive: top-anchored on small screens, bottom-anchored on md+ */}
      <div className="absolute top-20 md:top-auto md:bottom-0 left-0 z-20 p-6 pt-6 pb-16 md:p-8 md:pt-24 md:pb-20 lg:p-12 lg:pt-28 lg:pb-24 max-w-4xl">
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
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight tracking-tight"
            cursorClassName="bg-white"
          />
        </Heading>

        <Heading
          level={2}
          variant="gradient"
          className="mb-4 text-2xl md:text-3xl lg:text-4xl"
        >
          You’re Not Just a Content Creator.
          <br />
          You’re Building a Media Business.
        </Heading>

        <Text
          variant="large"
          className="text-white max-w-3xl mb-6 text-base md:text-lg"
        >
          Stardust Creator Network helps creators turn content into structured income, systems, and
          long-term ownership.
        </Text>

        {/* Enhanced value proposition */}
        <div className="flex flex-wrap gap-6 mb-8 text-white/80">
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

        {/* CTA Button */}
        <div>
          <Link
            href="/creator-community"
            className="btn-primary"
          >
            JOIN THE COMMUNITY
          </Link>
        </div>
      </div>
    </section>
  );
}
