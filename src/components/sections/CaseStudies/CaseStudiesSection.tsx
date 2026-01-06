'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heading, Text } from '@/components/typography';
import { encodeImagePath } from '@/lib/utils';
import { caseStudies } from '@/lib/data/case-studies.data';

/**
 * Case Studies Section Component
 *
 * Displays a split-screen layout matching the Creator Network carousel design:
 * - Left: Image with purple gradient overlay
 * - Right: Content with title, subtitle, bullet points, metrics grid, and CTA
 */
export default function CaseStudiesSection() {
  const imagePath = '/case-studies/case-study image.webp';
  const encodedImagePath = encodeImagePath(imagePath);
  const totalCaseStudies = caseStudies.length;

  const bulletPoints = [
    'Strategic creator selection and authentic brand partnerships',
    'Data-driven campaign execution with measurable results',
    'Cross-industry expertise from technology to insurance',
    'Proven track record of exceeding campaign objectives',
  ];

  const metrics = [
    { value: '76m+', label: 'Total Impressions' },
    { value: '30m+', label: 'Total Reach' },
    { value: '5m+', label: 'Total Engagement' },
    { value: totalCaseStudies.toString(), label: 'Case Studies' },
  ];

  return (
    <section
      id="case-studies"
      className="py-32 bg-gradient-to-b from-black via-neutral-950 to-black"
    >
      <div className="container mx-auto px-6">
        <div className="relative w-full max-w-7xl mx-auto">
          {/* Main Container - Matching SplitScreenCarousel styling */}
          <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-[40px] overflow-hidden">
            {/* Split Screen Layout */}
            <div className="flex flex-col md:flex-row">
              {/* Left Side - Image */}
              <div className="w-full md:w-1/2 relative min-h-[500px] md:min-h-[600px]">
                <div className="relative w-full h-full overflow-hidden">
                  {/* Image Display */}
                  <div className="absolute inset-0">
                    <Image
                      src={encodedImagePath}
                      alt="Case studies and success stories showcasing brand-creator partnerships"
                      fill
                      className="object-cover"
                      sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      loading="lazy"
                      suppressHydrationWarning
                      unoptimized
                    />
                  </div>

                  {/* Brand-Colored Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-purple-500/20 to-pink-500/20" />

                  {/* Subtle Darkening for Depth */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="w-full md:w-1/2 relative border-t md:border-t-0 md:border-l border-white/10">
                <div className="w-full h-full min-h-[400px] md:min-h-[500px] flex flex-col justify-center p-8 md:p-12 text-left">
                  {/* Title */}
                  <div>
                    <Heading
                      level={3}
                      className="!text-white mb-2 text-3xl md:text-4xl lg:text-5xl text-left"
                    >
                      Case Studies
                    </Heading>
                  </div>

                  {/* Subtitle */}
                  <div>
                    <Text
                      variant="large"
                      className="text-purple-300 mb-8 text-left"
                    >
                      Success Stories
                    </Text>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-4 text-left mb-8">
                    {bulletPoints.map((point, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-4"
                      >
                        {/* Bullet Point */}
                        <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />

                        {/* Feature Text */}
                        <Text
                          variant="body"
                          className="text-gray-300 leading-relaxed text-left"
                        >
                          {point}
                        </Text>
                      </li>
                    ))}
                  </ul>

                  {/* Decorative Line */}
                  <div className="mt-8 mb-8 h-1 w-32 bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-transparent rounded-full" />

                  {/* Metrics Grid (2x2) */}
                  <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
                    {metrics.map((metric, index) => (
                      <div
                        key={index}
                        className="text-left"
                      >
                        {/* Metric Value */}
                        <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                          {metric.value}
                        </div>
                        {/* Metric Label */}
                        <Text
                          variant="small"
                          className="text-gray-300 text-sm md:text-base"
                        >
                          {metric.label}
                        </Text>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="mt-4">
                    <Link
                      href="/case-studies"
                      className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 focus-visible:outline-2 focus-visible:outline-purple-400 focus-visible:outline-offset-2 text-base md:text-lg"
                    >
                      View All Case Studies
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
