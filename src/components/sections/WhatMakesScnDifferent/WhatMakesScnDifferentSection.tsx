'use client';

import Image from 'next/image';
import { Heading, Text } from '@/components/typography';
import { SectionHeader } from '@/components/shared';
import { encodeImagePath } from '@/lib/utils';

const differentiators = [
  {
    title: "We're Not a Course Platform.",
    icon: '📚',
  },
  {
    title: "We're Not a Vibes Community.",
    icon: '🎭',
  },
];

const focusPoints = [
  { text: 'Long-term income', icon: '💰' },
  { text: 'Structured monetization', icon: '📊' },
  { text: 'Sustainable systems', icon: '⚙️' },
  { text: 'Ownership and leverage', icon: '🔑' },
];

export default function WhatMakesScnDifferentSection() {
  return (
    <section
      id="what-makes-scn-different"
      className="relative py-16 md:py-24 bg-gradient-to-b from-black via-neutral-950 to-black overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Label */}
        <div className="text-center mb-6">
          <Text
            variant="small"
            className="text-purple-400 uppercase tracking-[0.2em] font-bold text-sm"
          >
            WHAT MAKES SCN DIFFERENT
          </Text>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-6">
          <SectionHeader
            words={[
              { text: "We're ", className: 'text-white' },
              { text: 'Not ', className: 'text-white' },
              { text: 'an ', className: 'text-white' },
              {
                text: 'Influencer ',
                className:
                  'bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent',
              },
              {
                text: 'Agency.',
                className:
                  'bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent',
              },
            ]}
            headingClassName="text-3xl md:text-4xl lg:text-5xl font-bold"
            className="mb-0"
            centered={true}
            staggerDelay={200}
          />
        </div>

        {/* Grid Layout with Image */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-4 items-center">
            {/* Content Side */}
            <div className="order-2 lg:order-1 space-y-3 flex flex-col justify-center">
              {/* Differentiators Cards - Stacked Vertically */}
              {differentiators.map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/15 hover:border-purple-500/60 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                      {item.icon}
                    </div>
                    <Text
                      variant="body"
                      className="text-white font-semibold leading-snug text-sm drop-shadow-md"
                    >
                      {item.title}
                    </Text>
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-purple-500/0 group-hover:from-purple-500/30 group-hover:via-pink-500/30 group-hover:to-purple-500/30 transition-all duration-300 pointer-events-none"></div>
                </div>
              ))}

              {/* Core Statement */}
              <div className="bg-white/10 backdrop-blur-md border border-purple-500/40 rounded-xl p-4 shadow-xl shadow-purple-500/20">
                <Heading
                  level={3}
                  variant="default"
                  className="!text-white text-base md:text-lg font-bold mb-2"
                >
                  We are a creator of business infrastructure.
                </Heading>
                <Text
                  variant="body"
                  className="!text-white/90 text-xs font-semibold mb-2"
                >
                  We focus on:
                </Text>
                <div className="space-y-1.5">
                  {focusPoints.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2"
                    >
                      <span className="text-lg shrink-0">{point.icon}</span>
                      <Text
                        variant="body"
                        className="!text-white/80 text-xs"
                      >
                        {point.text}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>

              {/* Closing Statement */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                <Text
                  variant="body"
                  className="!text-purple-300 text-xs italic font-medium"
                >
                  SCN is built for the creator economy starting with Nigeria but thinking global.
                </Text>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative h-[450px] md:h-[550px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20 order-1 lg:order-2 ring-2 ring-purple-500/30">
              <Image
                src={encodeImagePath('/creatives/SCN-1 no logoArtboard 1 copy 11.webp')}
                alt="What makes SCN different"
                fill
                className="object-cover brightness-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
              />
              <div className="absolute inset-0 bg-black/10"></div>
              {/* Light bottom overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
