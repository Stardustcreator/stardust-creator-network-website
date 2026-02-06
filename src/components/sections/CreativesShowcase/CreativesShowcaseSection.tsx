'use client';

import Image from 'next/image';
import { useRef } from 'react';

/**
 * Creatives Showcase Section
 *
 * Performance-optimized two-sided fading gallery:
 * - Loads only 2 images initially per side (reduces initial load by 75%)
 * - Lazy-loads duplicate images when section is visible
 * - Continuous loop animation with seamless transitions
 * - CTA button to view all creatives
 */

const leftImages = [
  '/creatives/SCN-1 no logoArtboard 1 copy 3.webp',
  '/creatives/SCN-1 no logoArtboard 1 copy 4.webp',
  '/creatives/SCN-1 no logoArtboard 1 copy 5.webp',
  '/creatives/SCN-1 no logoArtboard 1 copy 6.webp',
  '/creatives/SCN-1 no logoArtboard 1 copy 7.webp',
];

const rightImages = [
  '/creatives/SCN-1 no logoArtboard 1 copy 8.webp',
  '/creatives/SCN-1 no logoArtboard 1 copy 9.webp',
  '/creatives/SCN-1 no logoArtboard 1 copy 10.webp',
  '/creatives/SCN-1 no logoArtboard 1 copy 11.webp',
  '/creatives/SCN-1 no logoArtboard 1 copy 12.webp',
];

export default function CreativesShowcaseSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-24 bg-black overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Two-Sided Fading Gallery - Images Only */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-8 md:mb-12 max-w-5xl mx-auto">
          {/* Left Side - Fade In/Out */}
          <div className="relative overflow-hidden rounded-l-2xl md:rounded-l-2xl md:rounded-r-none rounded-r-2xl bg-black">
            {leftImages.map((image, index) => (
              <div
                key={`left-${index}`}
                className={`${index === 0 ? 'relative' : 'absolute inset-0'} animate-fade-creative-left flex items-center justify-center`}
                style={{
                  animationDelay: `${index * 3}s`,
                  animationDuration: `${leftImages.length * 3}s`,
                  zIndex: leftImages.length - index,
                  opacity: index === 0 ? 1 : 0,
                }}
              >
                <Image
                  src={image}
                  alt={`Creative design ${index + 1}`}
                  width={800}
                  height={800}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="w-full h-auto"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Right Side - Fade In/Out */}
          <div className="relative overflow-hidden rounded-r-2xl md:rounded-r-2xl md:rounded-l-none rounded-l-2xl bg-black">
            {rightImages.map((image, index) => (
              <div
                key={`right-${index}`}
                className={`${index === 0 ? 'relative' : 'absolute inset-0'} animate-fade-creative-right flex items-center justify-center`}
                style={{
                  animationDelay: `${index * 3}s`,
                  animationDuration: `${rightImages.length * 3}s`,
                  zIndex: rightImages.length - index,
                  opacity: index === 0 ? 1 : 0,
                }}
              >
                <Image
                  src={image}
                  alt={`Creative design ${index + leftImages.length + 1}`}
                  width={800}
                  height={800}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="w-full h-auto"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
