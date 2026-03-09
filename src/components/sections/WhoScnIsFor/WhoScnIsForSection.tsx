'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heading, Text } from '@/components/typography';
import { SectionHeader } from '@/components/shared';
import { encodeImagePath } from '@/lib/utils';

const targetAudience = [
  {
    title: 'Emerging creators making their first ₦100k–₦500k months',
    icon: '🚀',
  },
  {
    title: 'Scaling creators who want systems and structure',
    icon: '📊',
  },
  {
    title: 'Educators building courses',
    icon: '👨‍🏫',
  },
  {
    title: 'Entertainers diversifying income',
    icon: '🎬',
  },
  {
    title: 'Tastemakers monetizing influence',
    icon: '💫',
  },
  {
    title: 'Creative professionals building studio brands',
    icon: '🎨',
  },
  {
    title: 'Community builders launching paid circles',
    icon: '🤝',
  },
  {
    title: 'Tech & business experts building authority platforms',
    icon: '💻',
  },
];

export default function WhoScnIsForSection() {
  return (
    <section
      id="who-scn-is-for"
      className="relative py-20 md:py-32 bg-gradient-to-b from-black via-neutral-950 to-black overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Label */}
        <div className="text-center mb-6">
          <Text
            variant="small"
            className="text-purple-400 uppercase tracking-[0.2em] font-bold text-sm"
          >
            WHO SCN IS FOR
          </Text>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-8">
          <SectionHeader
            words={[
              { text: 'If ', className: 'text-white' },
              { text: "You're ", className: 'text-white' },
              {
                text: 'Serious ',
                className:
                  'bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent',
              },
              { text: 'About ', className: 'text-white' },
              {
                text: 'Growth',
                className:
                  'bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent',
              },
            ]}
            headingClassName="text-4xl md:text-5xl lg:text-6xl font-bold"
            className="mb-4"
            centered={true}
            staggerDelay={300}
          />
          <Heading
            level={3}
            variant="default"
            className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mt-2 drop-shadow-lg !text-white"
          >
            Then You Belong Here.
          </Heading>
        </div>

        {/* Description */}
        <div className="text-center mb-16">
          <Text
            variant="large"
            className="text-white font-semibold max-w-2xl mx-auto text-xl md:text-2xl"
          >
            SCN is built for:
          </Text>
        </div>

        {/* Grid Layout with Image */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 items-stretch mb-16">
            {/* Image Side */}
            <div className="relative h-[450px] md:h-[550px] lg:h-auto rounded-l-2xl overflow-hidden shadow-2xl shadow-purple-500/20 order-2 lg:order-1 ring-2 ring-purple-500/30">
              <Image
                src={encodeImagePath('/creatives/SCN-1 no logoArtboard 1 copy 8.webp')}
                alt="Diverse community of creators collaborating"
                fill
                className="object-cover brightness-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
              />
              {/* Black overlay to reduce brightness */}
              <div className="absolute inset-0 bg-black/25"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>

            {/* Cards Side */}
            <div className="order-1 lg:order-2">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                {targetAudience.map((item, index) => (
                  <div
                    key={index}
                    className="group relative p-6 rounded-xl bg-gradient-to-br from-neutral-900/80 via-neutral-900/60 to-neutral-950/80 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 flex flex-col items-center text-center"
                  >
                    {/* Icon */}
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                      {item.icon}
                    </div>

                    {/* Title */}
                    <Text
                      variant="body"
                      className="text-white font-semibold leading-snug text-base drop-shadow-md"
                    >
                      {item.title}
                    </Text>

                    {/* Hover gradient border effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-purple-500/0 group-hover:from-purple-500/30 group-hover:via-pink-500/30 group-hover:to-purple-500/30 transition-all duration-300 pointer-events-none"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <Link
            href="/brands"
            className="btn-primary"
            aria-label="Join Stardust Creator Network"
          >
            JOIN NOW
          </Link>
        </div>
      </div>
    </section>
  );
}
