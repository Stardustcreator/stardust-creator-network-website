'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heading, Text } from '@/components/typography';
import { caseStudies } from '@/lib/data/case-studies.data';

export default function CaseStudiesOverviewSection() {
  // Calculate aggregate metrics from all case studies
  const totalCaseStudies = caseStudies.length;

  // Aggregate metrics summary
  const aggregateMetrics = {
    totalImpression: '76m+',
    totalReach: '30m+',
    totalEngagement: '5m+',
    totalViews: '300k+',
  };

  return (
    <section
      id="case-studies-overview"
      className="relative bg-black overflow-hidden"
    >
      {/* Split Layout: Image Left, Content Right - Seamlessly joined */}
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Image - Left Side */}
        <div className="relative h-[600px] lg:h-[700px] overflow-hidden flex items-center justify-center bg-gradient-to-br from-purple-600/60 via-purple-700/50 to-purple-900/70">
          <div className="relative w-full max-w-md h-[85%] flex items-center justify-center px-8">
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src="/case-studies/man-writing-notebook.webp"
                alt="Case studies and success stories documentation"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain rounded-2xl"
                quality={85}
                priority
              />
            </div>
          </div>
        </div>

        {/* Content - Right Side */}
        <div className="bg-black flex items-center h-[600px] lg:h-[700px]">
          <div className="w-full px-8 md:px-12 lg:px-16 space-y-6">
            {/* Main Heading - Large, white, bold */}
            <Heading
              level={2}
              variant="default"
              className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-2"
            >
              Case Studies
            </Heading>

            {/* Sub-heading - Purple */}
            <Heading
              level={3}
              variant="default"
              className="text-purple-400 text-xl md:text-2xl font-semibold mb-6"
            >
              Success Stories
            </Heading>

            {/* Bullet Points - Matching reference exactly */}
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 mt-1.5 text-base">•</span>
                <Text
                  variant="body"
                  className="text-white text-base md:text-lg leading-relaxed"
                >
                  Strategic creator selection and authentic brand partnerships
                </Text>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 mt-1.5 text-base">•</span>
                <Text
                  variant="body"
                  className="text-white text-base md:text-lg leading-relaxed"
                >
                  Data-driven campaign execution with measurable results
                </Text>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 mt-1.5 text-base">•</span>
                <Text
                  variant="body"
                  className="text-white text-base md:text-lg leading-relaxed"
                >
                  Cross-industry expertise from technology to insurance
                </Text>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 mt-1.5 text-base">•</span>
                <Text
                  variant="body"
                  className="text-white text-base md:text-lg leading-relaxed"
                >
                  Proven track record of exceeding campaign objectives
                </Text>
              </li>
            </ul>

            {/* Divider - Purple to pink gradient */}
            <div className="h-px bg-gradient-to-r from-purple-400 via-pink-400 to-transparent mb-6"></div>

            {/* Summary Metrics */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                  {aggregateMetrics.totalImpression}
                </div>
                <Text
                  variant="small"
                  className="text-white/80 text-sm md:text-base"
                >
                  Total Impressions
                </Text>
              </div>
              <div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                  {aggregateMetrics.totalReach}
                </div>
                <Text
                  variant="small"
                  className="text-white/80 text-sm md:text-base"
                >
                  Total Reach
                </Text>
              </div>
              <div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                  {aggregateMetrics.totalEngagement}
                </div>
                <Text
                  variant="small"
                  className="text-white/80 text-sm md:text-base"
                >
                  Total Engagement
                </Text>
              </div>
              <div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                  {totalCaseStudies}
                </div>
                <Text
                  variant="small"
                  className="text-white/80 text-sm md:text-base"
                >
                  Case Studies
                </Text>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
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
    </section>
  );
}
