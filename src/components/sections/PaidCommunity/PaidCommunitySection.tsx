'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heading, Text } from '@/components/typography';
import { SectionHeader } from '@/components/shared';
import { encodeImagePath } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const features = [
  {
    icon: '🎯',
    title: 'Monthly Live Clinics',
    description:
      'Deep-dive sessions on pricing, licensing, digital products, community building, and scaling.',
  },
  {
    icon: '📚',
    title: 'Playbooks & Templates',
    description: '',
    expandable: true,
    items: [
      'Media kit templates',
      'Brand pitch scripts',
      'Rate calculators',
      'Contract clause breakdowns',
      'Proposal & SOW templates',
      'Community launch frameworks',
      'Course outline planners',
    ],
  },
  {
    icon: '💬',
    title: "Q&A's",
    description: 'Ask real questions about real deals.',
  },
  {
    icon: '📊',
    title: 'Creator Case Studies',
    description: 'Breakdowns of what worked, what failed, and how to improve.',
  },
  {
    icon: '🤝',
    title: 'Peer Network',
    description: 'Connect with creators who think in systems, not just aesthetics.',
  },
];

export default function PaidCommunitySection() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px',
    triggerOnce: true,
  });

  return (
    <section
      id="paid-community"
      ref={elementRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Label */}
        <div className="text-center mb-6">
          <Text
            variant="small"
            className="text-purple-400 uppercase tracking-[0.3em] font-bold text-sm"
          >
            INTRODUCING THE PAID COMMUNITY
          </Text>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-6">
          <SectionHeader
            words={[
              { text: 'The ', className: 'text-white' },
              { text: 'SCN ', className: 'text-white' },
              {
                text: 'Paid ',
                className:
                  'bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent',
              },
              {
                text: 'Community',
                className:
                  'bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent',
              },
            ]}
            headingClassName="text-4xl md:text-5xl lg:text-6xl font-bold"
            className="mb-0"
            centered={true}
            staggerDelay={150}
            level={2}
          />
        </div>

        {/* Supporting Text */}
        <div className="text-center mb-16">
          <Text
            variant="large"
            className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto"
          >
            This is where serious creators operate. Inside, you get:
          </Text>
        </div>

        {/* Main Content - Split Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto mb-16">
          {/* Left Side - Image */}
          <div
            className={`relative transition-all duration-1000 ${
              isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/30">
              <Image
                src={encodeImagePath(
                  '/creator community/diversity-people-digital-device-communication-concept.webp'
                )}
                alt="SCN Paid Community"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-pink-600/20"></div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 bg-neutral-900/95 backdrop-blur-md border-2 border-purple-500/60 rounded-xl p-4 shadow-xl shadow-purple-900/30">
              <Text
                variant="body"
                className="!text-white font-black text-lg mb-0.5"
              >
                Premium
              </Text>
              <Text
                variant="small"
                className="!text-purple-300 text-xs"
              >
                Access
              </Text>
            </div>
          </div>

          {/* Right Side - Features */}
          <div
            className={`space-y-4 transition-all duration-1000 delay-300 ${
              isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                onClick={() =>
                  feature.expandable && setExpandedCard(expandedCard === index ? null : index)
                }
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="text-2xl shrink-0">{feature.icon}</div>

                  <div className="flex-1">
                    {/* Title */}
                    <Heading
                      level={3}
                      variant="default"
                      className="!text-white text-sm font-bold mb-1"
                    >
                      {feature.title}
                    </Heading>

                    {/* Description */}
                    {feature.description && (
                      <Text
                        variant="body"
                        className="!text-white/70 text-[11px] leading-relaxed"
                      >
                        {feature.description}
                      </Text>
                    )}

                    {/* Expandable List */}
                    {feature.expandable && (
                      <div className="mt-2">
                        <button className="text-white/60 text-xs font-semibold flex items-center gap-2 hover:text-white/80 transition-colors">
                          <span>{expandedCard === index ? 'Hide' : 'Show'} Templates</span>
                          <span
                            className={`transform transition-transform duration-300 ${
                              expandedCard === index ? 'rotate-180' : ''
                            }`}
                          >
                            ▼
                          </span>
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-500 ${
                            expandedCard === index ? 'max-h-96 mt-3' : 'max-h-0'
                          }`}
                        >
                          <ul className="space-y-1.5 pl-3">
                            {feature.items?.map((item, itemIndex) => (
                              <li
                                key={itemIndex}
                                className="text-white/60 text-xs flex items-start gap-2"
                              >
                                <span className="text-white/40 mt-0.5">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon Banner */}
        <div
          className={`max-w-4xl mx-auto mb-12 transition-all duration-1000 delay-500 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-4">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                <Text
                  variant="small"
                  className="!text-white font-bold uppercase tracking-wider animate-pulse"
                >
                  Coming Soon
                </Text>
              </div>

              <Heading
                level={3}
                variant="default"
                className="!text-white text-xl md:text-2xl font-bold mb-2"
              >
                The Paid Community Is Coming Soon
              </Heading>

              <Text
                variant="body"
                className="!text-white/90 text-sm md:text-base max-w-2xl mx-auto"
              >
                Be among the first to access exclusive resources, expert sessions, and a network of
                serious creators.
              </Text>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href="#waitlist"
            onClick={e => {
              e.preventDefault();
              document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <span>JOIN THE WAITLIST</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
