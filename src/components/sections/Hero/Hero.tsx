'use client';

import Image from 'next/image';
import Link from 'next/link';

import TypewriterText from './TypewriterText';
import { Heading, Text } from '@/components/typography';

export default function Hero() {
  return (
    <section className="hero-fullwidth relative min-h-screen overflow-hidden bg-black rounded-br-[40px] rounded-bl-[40px]">
      {/* Mobile Background Image */}
      <Image
        src="/hero background picture.png"
        alt="Galaxy-inspired background with vibrant lighting effects"
        fill
        priority
        sizes="100vw"
        className="z-0 object-cover md:hidden"
      />

      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full min-w-full min-h-full object-cover z-0 hidden md:block"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source
          src="/hero%20background.mp4"
          type="video/mp4"
        />
        {/* Fallback for browsers that don't support video */}
      </video>

      {/* Background with Gradient Overlays */}
      <div className="absolute inset-0 bg-black/30 z-10">
        {/* Primary Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-black/40 via-neutral-900/30 to-black/40" />
        {/* Secondary Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-purple-900/20 via-transparent to-transparent" />
      </div>

      {/* Content - Bottom Left */}
      <div className="absolute bottom-0 left-0 z-20 p-6 pb-16 md:p-8 md:pb-20 lg:p-12 lg:pb-24">
        <div className="max-w-4xl">
          {/* Main Headline */}
          <div className="mb-8">
            <Heading
              level={1}
              variant="default"
              className="mb-4"
            >
              <TypewriterText
                words={['Build.', 'Collaborate.', 'Monetize.']}
                typeSpeed={100}
                deleteSpeed={50}
                delayBetweenWords={2500}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight tracking-tight"
                cursorClassName="bg-white"
              />
            </Heading>
            <Heading
              level={2}
              variant="gradient"
              className="mb-4"
            >
              The Future of the Creator Economy Starts Here.
            </Heading>
            <Text
              variant="large"
              color="white"
              className="max-w-3xl mb-8"
            >
              Stardust Creator Network connects creators and brands today, and is building the
              infrastructure that will power tomorrow&apos;s creative businesses.
            </Text>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/creators/join"
              className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3 rounded-full font-medium transition-all whitespace-nowrap shadow-lg text-center"
            >
              Join as Creator
            </Link>
            <Link
              href="/brands/find"
              className="inline-flex items-center justify-center text-white/90 hover:text-white hover:bg-white/10 hover:backdrop-blur-sm border border-white/20 hover:border-white/50 px-6 py-3 rounded-full font-medium transition-all whitespace-nowrap text-center"
            >
              Find Creators
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
