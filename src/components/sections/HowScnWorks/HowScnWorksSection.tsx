'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heading, Text } from '@/components/typography';
import { SectionHeader } from '@/components/shared';
import { encodeImagePath } from '@/lib/utils';

const frameworkStages = [
  {
    number: '01',
    title: 'Foundation',
    description: 'Clarity. Niche. Positioning. First income.',
    color: 'from-gray-700 to-gray-800',
    bgGlow: 'bg-white/5',
    borderColor: 'border-white/30',
  },
  {
    number: '02',
    title: 'Monetization',
    description: 'Rate cards. Media kits. Brand pitching. Digital products.',
    color: 'from-gray-700 to-gray-800',
    bgGlow: 'bg-white/5',
    borderColor: 'border-white/30',
  },
  {
    number: '03',
    title: 'Systems',
    description: 'Automation. Teams. Retainers. Operations.',
    color: 'from-gray-700 to-gray-800',
    bgGlow: 'bg-white/5',
    borderColor: 'border-white/30',
  },
  {
    number: '04',
    title: 'Ownership',
    description: 'Licensing. Equity deals. IP. Long-term plays.',
    color: 'from-gray-700 to-gray-800',
    bgGlow: 'bg-white/5',
    borderColor: 'border-white/30',
  },
];

export default function HowScnWorksSection() {
  return (
    <section
      id="how-scn-works"
      className="relative py-20 md:py-32 bg-gradient-to-b from-neutral-950 via-black to-neutral-950 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={encodeImagePath('/who we are/creators.webp')}
          alt="Creators background"
          fill
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-black/85"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Label */}
        <div className="text-center mb-6">
          <Text
            variant="small"
            className="text-white/60 uppercase tracking-[0.2em] font-bold text-sm"
          >
            HOW SCN WORKS
          </Text>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-8">
          <SectionHeader
            words={[
              { text: 'The ', className: 'text-white' },
              { text: 'SCN ', className: 'text-white' },
              { text: 'Framework', className: 'text-white' },
            ]}
            headingClassName="text-4xl md:text-5xl lg:text-6xl font-bold"
            className="mb-0"
            centered={true}
            staggerDelay={200}
            level={2}
          />
        </div>

        {/* Supporting Text */}
        <div className="text-center mb-16">
          <Text
            variant="large"
            className="text-white font-normal max-w-2xl mx-auto text-xl md:text-2xl"
          >
            We move creators through four levels:
          </Text>
        </div>

        {/* Framework Stages - Horizontal Progression */}
        <div className="max-w-7xl mx-auto mb-16">
          {/* Desktop View - Horizontal */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-24 left-0 right-0 h-1 bg-white/30"></div>

              <div className="grid grid-cols-4 gap-8 relative">
                {frameworkStages.map((stage, index) => (
                  <div
                    key={index}
                    className="relative"
                  >
                    {/* Stage Card */}
                    <div
                      className={`group relative bg-black/90 backdrop-blur-xl border-2 ${stage.borderColor} rounded-2xl p-6 hover:bg-black/95 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 hover:border-white/50 transition-all duration-500 ease-out h-full flex flex-col overflow-hidden cursor-pointer`}
                    >
                      {/* Stage Number Circle */}
                      <div
                        className={`w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center shadow-xl shrink-0`}
                      >
                        <Text
                          variant="body"
                          className="!text-white font-black text-lg"
                        >
                          {stage.number}
                        </Text>
                      </div>

                      {/* Stage Title */}
                      <Heading
                        level={4}
                        variant="default"
                        className="!text-white text-xs font-bold mb-2 text-center px-3 w-full whitespace-nowrap"
                      >
                        {stage.title}
                      </Heading>

                      {/* Stage Description */}
                      <Text
                        variant="body"
                        className="!text-white font-normal text-center leading-snug text-[9px] px-3 w-full"
                      >
                        {stage.description}
                      </Text>

                      {/* Arrow indicator (except last) */}
                      {index < frameworkStages.length - 1 && (
                        <div className="absolute -right-3 top-1/2 -translate-y-1/2 text-white text-3xl font-bold hidden xl:block z-20">
                          →
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tablet View - 2x2 Grid */}
          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-2 gap-8">
              {frameworkStages.map((stage, index) => (
                <div
                  key={index}
                  className="relative"
                >
                  <div
                    className={`group relative bg-black/90 backdrop-blur-xl border-2 ${stage.borderColor} rounded-2xl p-6 hover:bg-black/95 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 hover:border-white/50 transition-all duration-500 ease-out h-full flex flex-col overflow-hidden cursor-pointer`}
                  >
                    <div
                      className={`w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center shadow-xl shrink-0`}
                    >
                      <Text
                        variant="body"
                        className="!text-white font-black text-lg"
                      >
                        {stage.number}
                      </Text>
                    </div>

                    <Heading
                      level={4}
                      variant="default"
                      className="!text-white text-xs font-bold mb-2 text-center px-3 w-full whitespace-nowrap"
                    >
                      {stage.title}
                    </Heading>

                    <Text
                      variant="body"
                      className="!text-white font-normal text-center leading-snug text-[9px] px-3 w-full"
                    >
                      {stage.description}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile View - Vertical Stack */}
          <div className="block md:hidden space-y-8">
            {frameworkStages.map((stage, index) => (
              <div
                key={index}
                className="relative"
              >
                <div
                  className={`group relative bg-black/90 backdrop-blur-xl border-2 ${stage.borderColor} rounded-2xl p-6 hover:bg-black/95 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 hover:border-white/50 transition-all duration-500 ease-out flex flex-col overflow-hidden cursor-pointer`}
                >
                  <div
                    className={`w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center shadow-xl shrink-0`}
                  >
                    <Text
                      variant="body"
                      className="!text-white font-black text-lg"
                    >
                      {stage.number}
                    </Text>
                  </div>

                  <Heading
                    level={4}
                    variant="default"
                    className="!text-white text-xs font-bold mb-2 text-center px-3 w-full whitespace-nowrap"
                  >
                    {stage.title}
                  </Heading>

                  <Text
                    variant="body"
                    className="!text-white font-normal text-center leading-snug text-[10px] px-3 w-full"
                  >
                    {stage.description}
                  </Text>
                </div>

                {/* Downward arrow for mobile */}
                {index < frameworkStages.length - 1 && (
                  <div className="flex justify-center my-3">
                    <div className="text-white text-3xl font-bold">↓</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <button
            type="button"
            className="btn-primary"
            aria-label="Join Stardust Creator Network"
            onClick={() => {
              document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            JOIN NOW
          </button>
        </div>
      </div>
    </section>
  );
}
