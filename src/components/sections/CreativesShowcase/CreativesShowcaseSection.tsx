'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heading } from '@/components/typography';

/**
 * Creatives Showcase Section
 *
 * Displays a two-sided sliding gallery of creative designs:
 * - Left side: 2 images sliding horizontally from right
 * - Right side: 2 images sliding horizontally from right
 * - Continuous loop animation
 * - CTA button to view all creatives
 */

const leftImages = [
  '/creatives/SCN-1Artboard 1 copy 3.webp',
  '/creatives/SCN-1Artboard 1 copy 5.webp',
];

const rightImages = [
  '/creatives/SCN-1Artboard 1 copy 7.webp',
  '/creatives/SCN-1Artboard 1 copy 11.webp',
];

export default function CreativesShowcaseSection() {
  return (
    <section className="py-16 md:py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <Heading
            level={2}
            variant="gradient"
            className="text-3xl md:text-4xl lg:text-5xl mb-4"
          >
            Our{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Creatives
            </span>
          </Heading>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            Explore our collection of stunning social media creative designs
          </p>
        </div>

        {/* Two-Sided Fading Gallery - Images Only */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-12 max-w-5xl mx-auto">
          {/* Left Side - Fade In/Out */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-l-2xl md:rounded-r-none bg-white/5 border-r-0 border border-white/10">
            {leftImages.map((image, index) => (
              <div
                key={image}
                className={`absolute inset-0 animate-fade-creative-left flex items-center justify-center`}
                style={{
                  animationDelay: `${index * 4.7}s`,
                  animationDuration: '10s',
                  zIndex: leftImages.length - index, // Ensure proper stacking
                }}
              >
                <Image
                  src={image}
                  alt={`Creative design ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover w-full h-full"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>

          {/* Right Side - Fade In/Out */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-r-2xl md:rounded-l-none bg-white/5 border-l-0 border border-white/10">
            {rightImages.map((image, index) => (
              <div
                key={image}
                className={`absolute inset-0 animate-fade-creative-right flex items-center justify-center`}
                style={{
                  animationDelay: `${index * 4.7}s`,
                  animationDuration: '10s',
                  zIndex: rightImages.length - index, // Ensure proper stacking
                }}
              >
                <Image
                  src={image}
                  alt={`Creative design ${index + 3}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover w-full h-full"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/our-creatives"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
          >
            View All Creatives
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
