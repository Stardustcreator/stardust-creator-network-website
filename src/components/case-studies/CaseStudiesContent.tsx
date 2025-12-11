'use client';

import Image from 'next/image';
import { Heading, Text } from '@/components/typography';
import CaseStudyCard from '@/components/case-studies/CaseStudyCard';
import { caseStudies } from '@/lib/data/case-studies.data';

/**
 * Case Studies Content Component
 *
 * Modern, interactive case studies page with:
 * - Hero section with grid background
 * - Grid layout of case study cards
 * - Hover effects and animations
 * - Expandable detail modal
 */

// Array of all influencer images for the header grid
const headerImages = [
  '/case-studies/Influencer 1.webp',
  '/case-studies/Influencer 2webp.webp',
  '/case-studies/Influencer 3.webp',
  '/case-studies/Influencer 4.webp',
  '/case-studies/Influencer 5.webp',
  '/case-studies/Influencer 6.webp',
  '/case-studies/Influencer 7.webp',
  '/case-studies/Influencer 8.webp',
  '/case-studies/Influencer 9.webp',
  '/case-studies/Influencer 10.webp',
  '/case-studies/Influencer 11.webp',
  '/case-studies/Influencer 12.webp',
  '/case-studies/Influencer 13.webp',
  '/case-studies/Influencer 14.webp',
  '/case-studies/Influencer 15.webp',
  '/case-studies/Influencer 16.webp',
  '/case-studies/Influencer 17.webp',
  '/case-studies/Influencer 18.webp',
  '/case-studies/Influencer 19.webp',
  '/case-studies/Influencer 20.webp',
  '/case-studies/Influencer 21.webp',
  '/case-studies/Influencer 22.webp',
  '/case-studies/Influencer 23.webp',
  '/case-studies/Influencer 24.webp',
  '/case-studies/Influencer 25.webp',
  '/case-studies/Influencer 26.webp',
  '/case-studies/Influencer 27.webp',
];

export default function CaseStudiesContent() {
  // Safety check - ensure caseStudies is available
  const studies = Array.isArray(caseStudies) ? caseStudies : [];

  if (studies.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white/60">No case studies available.</p>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section with Grid Background */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center w-full overflow-hidden">
        {/* Grid Background - 3 rows x 9 columns (all 27 images) */}
        <div className="absolute inset-0 w-full grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 grid-rows-3 z-0 gap-0">
          {headerImages.map((imagePath, index) => (
            <div
              key={index}
              className="relative w-full h-full overflow-hidden aspect-square bg-black/20"
            >
              <Image
                src={imagePath}
                alt={`Creator ${index + 1}`}
                fill
                sizes="(max-width: 640px) 33.33vw, (max-width: 768px) 16.66vw, 11.11vw"
                className="object-cover w-full h-full"
                priority={index < 9}
                unoptimized={imagePath.includes(' ')}
              />
            </div>
          ))}
        </div>

        {/* Black Overlay - 70% opacity */}
        <div className="absolute inset-0 bg-black/70 z-10" />

        {/* Content - Left Aligned with Padding */}
        <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-20 lg:py-24 relative z-20 w-full">
          <div className="max-w-4xl px-4 sm:px-6 md:px-8">
            <Heading
              level={1}
              variant="gradient"
              className="mb-4 md:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight"
            >
              Case{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Studies
              </span>
            </Heading>
            <Text
              variant="body"
              color="white"
              className="text-white text-base sm:text-lg md:text-xl leading-relaxed font-medium drop-shadow-lg"
            >
              Discover how Stardust Creator Network connects brands with creators to deliver
              authentic campaigns that drive real results.
            </Text>
          </div>
        </div>
      </section>

      {/* Case Studies Grid Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Grid Layout: 1 column mobile, 2 columns tablet, 3 columns desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {studies.map((caseStudy, index) => (
              <CaseStudyCard
                key={caseStudy.id}
                caseStudy={caseStudy}
                index={index}
              />
            ))}
          </div>

          {/* Empty State */}
          {studies.length === 0 && (
            <div className="text-center py-20">
              <Text
                variant="body"
                className="text-white/60"
              >
                No case studies available yet. Check back soon!
              </Text>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
