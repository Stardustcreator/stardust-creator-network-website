'use client';

import Image from 'next/image';
import Link from 'next/link';
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

// Array of all influencer images for the header grid (27 images total)
const headerImages = [
  '/case-studies/Influencer 3.webp',
  '/case-studies/Influencer 7.webp',
  '/case-studies/Influencer 11.webp',
  '/case-studies/Influencer 12.webp',
  '/case-studies/Influencer 13.webp',
  '/case-studies/Influencer 17.webp',
  '/case-studies/Influencer 19.webp',
  '/case-studies/Influencer 20.webp',
  '/case-studies/Influencer 23.webp',
  '/case-studies/Influencer 25.webp',
  '/case-studies/Influencer 26.webp',
  '/case-studies/Chef Lizz.webp',
  '/case-studies/d360 Cuisine.webp',
  '/case-studies/omoye Cooks.webp',
  '/case-studies/T-Spices.webp',
  '/case-studies/Joy Etor.webp',
  '/case-studies/Riaz Kitchen.webp',
  '/case-studies/SB-Treats.webp',
  '/case-studies/Aramide\u2019s Kitchen.webp',
  '/case-studies/Asy Munchies.webp',
  "/case-studies/Cara's Kitchen.webp",
  '/case-studies/Chef AHR.webp',
  '/case-studies/Fabulous Nosh Kitchen.webp',
  '/case-studies/Favimore Kitchen.webp',
  '/case-studies/Foodies Delecty.webp',
  '/case-studies/Ifeth Delight.webp',
  "/case-studies/Omoye's Cooks.webp",
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
                src={
                  imagePath.includes(' ')
                    ? imagePath
                        .split('/')
                        .map(part => (part ? encodeURIComponent(part) : ''))
                        .join('/')
                    : imagePath
                }
                alt={`Creator ${index + 1}`}
                fill
                sizes="(max-width: 640px) 33.33vw, (max-width: 768px) 16.66vw, 11.11vw"
                className="object-cover w-full h-full"
                priority={index < 9}
                quality={index < 9 ? 90 : 75}
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
              className="text-white text-base sm:text-lg md:text-xl leading-relaxed font-medium drop-shadow-lg mb-6"
            >
              Discover how Stardust Creator Network connects brands with creators to deliver
              authentic campaigns that drive real results. From consumer goods to financial
              services, our strategic partnerships create meaningful engagement that converts
              audiences into customers.
            </Text>

            {/* Success metrics (removed '500+ Brands Served' as requested) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 max-w-2xl">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">85%</div>
                <div className="text-white/80 text-sm">Campaign Success</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">10M+</div>
                <div className="text-white/80 text-sm">Impressions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">15%</div>
                <div className="text-white/80 text-sm">Avg. Engagement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Grid Layout: 1 column mobile, 2 columns tablet, 3 columns desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
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

          {/* CTA Section - Brand Brief Conversion */}
          {studies.length > 0 && (
            <div className="mt-16 md:mt-20">
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto">
                <Heading
                  level={2}
                  variant="gradient"
                  className="text-2xl md:text-3xl mb-4"
                >
                  Ready to Work With Us?
                </Heading>
                <Text
                  variant="large"
                  className="text-white/80 mb-6 max-w-2xl mx-auto"
                >
                  See how we&apos;ve helped brands succeed. Let&apos;s create your own success
                  story.
                </Text>
                <Link
                  href="/brands/brief"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
                >
                  Start Your Campaign
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
