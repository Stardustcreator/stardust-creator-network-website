'use client';

import Image from 'next/image';
import Link from 'next/link';

import TypewriterText from './TypewriterText';
import { Heading, Text } from '@/components/typography';
import { LocationSpecificContent } from '@/components/shared';

export default function Hero() {
  return (
    <section className="hero-fullwidth relative min-h-screen overflow-hidden bg-black rounded-br-[40px] rounded-bl-[40px]">
      {/* Mobile Background Image */}
      <Image
        src="/hero.webp"
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
          src="/output.webm"
          type="video/webm"
        />
        {/* Fallback for browsers that don't support video */}
        <Image
          src="/hero.webp"
          alt="Galaxy-inspired background with vibrant lighting effects"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover"
        />
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
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-tight tracking-tight"
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
            <LocationSpecificContent
              nigeria={
                <Text
                  variant="large"
                  className="text-white max-w-3xl mb-8"
                >
                  Stardust Creator Network connects the creator community with brand partnerships in
                  Nigeria today, building the infrastructure that enables creator monetization and
                  powers tomorrow&apos;s creative ecosystem.
                </Text>
              }
              uk={
                <Text
                  variant="large"
                  className="text-white max-w-3xl mb-8"
                >
                  Stardust Creator Network connects the creator community with brand partnerships in
                  the UK today, building the infrastructure that enables creator monetization and
                  powers tomorrow&apos;s creative ecosystem.
                </Text>
              }
              fallback={
                <Text
                  variant="large"
                  className="text-white max-w-3xl mb-8"
                >
                  Stardust Creator Network connects the creator community with brand partnerships
                  today, building the infrastructure that enables creator monetization and powers
                  tomorrow&apos;s creative ecosystem.
                </Text>
              }
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/brands/brief"
              className="inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-purple-500 to-pink-500 text-white text-button rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
            >
              Find a Creator
            </Link>
            <Link
              href="/creators/join"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-button rounded-full hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-white/10"
            >
              Join as Creator
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
