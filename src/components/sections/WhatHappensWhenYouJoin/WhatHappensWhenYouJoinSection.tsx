'use client';

import Link from 'next/link';
import { Heading, Text } from '@/components/typography';
import { SectionHeader } from '@/components/shared';

const stopDoing = [
  { text: 'Guessing your rates', icon: '❌' },
  { text: 'Waiting for brands to DM you', icon: '⏳' },
  { text: 'Accepting vague briefs', icon: '📄' },
  { text: 'Signing bad contracts', icon: '📝' },
  { text: 'Relying on one income stream', icon: '💸' },
];

const startDoing = [
  { text: 'Building predictable revenue', icon: '✅' },
  { text: 'Structuring recurring offers', icon: '🎯' },
  { text: 'Designing monetization intentionally', icon: '💡' },
  { text: 'Thinking like a business', icon: '🚀' },
];

export default function WhatHappensWhenYouJoinSection() {
  return (
    <section
      id="what-happens-when-you-join"
      className="relative py-16 md:py-24 bg-gradient-to-b from-black via-neutral-950 to-black overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/2 right-1/3 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Label */}
        <div className="text-center mb-6">
          <Text
            variant="small"
            className="text-purple-400 uppercase tracking-[0.2em] font-bold text-sm"
          >
            RESULTS-ORIENTED
          </Text>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-10">
          <SectionHeader
            words={[
              { text: 'What ', className: 'text-white' },
              { text: 'Happens ', className: 'text-white' },
              { text: 'When ', className: 'text-white' },
              {
                text: 'You ',
                className:
                  'bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent',
              },
              {
                text: 'Join?',
                className:
                  'bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent',
              },
            ]}
            headingClassName="text-3xl md:text-4xl lg:text-5xl font-bold"
            className="mb-0"
            centered={true}
            staggerDelay={150}
            level={2}
          />
        </div>

        {/* Two Column Layout */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Left Column - You Stop */}
            <div className="group relative bg-red-950/10 backdrop-blur-md border border-red-500/20 rounded-xl p-4 hover:border-red-500/40 hover:bg-red-950/15 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10">
              {/* Subtle red glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

              <div className="relative z-10">
                <Heading
                  level={3}
                  variant="default"
                  className="!text-red-400 text-lg md:text-xl font-bold mb-3"
                >
                  You stop:
                </Heading>

                <div className="space-y-2.5">
                  {stopDoing.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 transform hover:translate-x-1 transition-transform duration-300"
                    >
                      <span className="text-lg shrink-0 mt-0.5">{item.icon}</span>
                      <Text
                        variant="body"
                        className="!text-white/75 text-xs md:text-sm leading-relaxed"
                      >
                        {item.text}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - You Start */}
            <div className="group relative bg-green-950/10 backdrop-blur-md border border-green-500/20 rounded-xl p-4 hover:border-green-500/40 hover:bg-green-950/15 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
              {/* Subtle green glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

              <div className="relative z-10">
                <Heading
                  level={3}
                  variant="default"
                  className="!text-green-400 text-lg md:text-xl font-bold mb-3"
                >
                  And you start:
                </Heading>

                <div className="space-y-2.5">
                  {startDoing.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 transform hover:translate-x-1 transition-transform duration-300"
                    >
                      <span className="text-lg shrink-0 mt-0.5">{item.icon}</span>
                      <Text
                        variant="body"
                        className="!text-white/75 text-xs md:text-sm leading-relaxed"
                      >
                        {item.text}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-10">
          <button
            type="button"
            onClick={() => {
              document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-base px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            aria-label="Join Stardust Creator Network"
          >
            <span>JOIN NOW</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
