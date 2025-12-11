'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Text } from '@/components/typography';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import type { CaseStudy } from '@/types/case-study.types';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  index?: number;
}

export default function CaseStudyCard({ caseStudy, index = 0 }: CaseStudyCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px',
    triggerOnce: true,
  });

  // Safety check
  if (!caseStudy || !caseStudy.id) {
    return null;
  }

  return (
    <div
      ref={elementRef}
      className={`group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden transition-all duration-500 ease-out ${
        isIntersecting ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
      }`}
      style={{
        transitionDelay: isIntersecting ? `${index * 100}ms` : '0ms',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-transparent z-10 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Card Content */}
      <div className="relative z-20 p-6 md:p-8">
        {/* Case Study Tag */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-xs font-semibold uppercase tracking-wider">
            CASE STUDY
          </span>
        </div>

        {/* Header with Title, Images, and Logo */}
        <div className="mb-6">
          {/* Title - White text */}
          <div className="mb-4">
            <h3 className="text-white text-xl md:text-2xl lg:text-3xl leading-tight font-bold line-clamp-2">
              {caseStudy.title}
            </h3>
          </div>

          {/* Logo - Smaller size */}
          {caseStudy.logo && (
            <div className="mb-4 flex justify-start">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/10 rounded-xl p-2 border-2 border-white/20 shadow-xl">
                <Image
                  src={caseStudy.logo}
                  alt={`${caseStudy.title} Logo`}
                  fill
                  sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                  className="object-contain"
                  priority
                  unoptimized={caseStudy.logo.includes(' ')}
                />
              </div>
            </div>
          )}
        </div>

        {/* Preview Content */}
        {caseStudy.excerpt && (
          <Text
            variant="body"
            className="text-white/80 mb-4 line-clamp-3 text-sm md:text-base"
          >
            {caseStudy.excerpt}
          </Text>
        )}

        {/* Interactive Results */}
        {caseStudy.metrics && (
          <div className="mb-4">
            <Text
              variant="small"
              className="text-white/80 font-semibold mb-3 uppercase tracking-wider"
            >
              Interactive result
            </Text>
            <div className="grid grid-cols-2 gap-3">
              {caseStudy.metrics.totalImpression && (
                <div>
                  <Text
                    variant="small"
                    className="text-white/60 mb-1"
                  >
                    Total Impression
                  </Text>
                  <Text
                    variant="body"
                    className="text-white font-semibold"
                  >
                    {caseStudy.metrics.totalImpression}
                  </Text>
                </div>
              )}
              {caseStudy.metrics.reach && (
                <div>
                  <Text
                    variant="small"
                    className="text-white/60 mb-1"
                  >
                    Reach
                  </Text>
                  <Text
                    variant="body"
                    className="text-white font-semibold"
                  >
                    {caseStudy.metrics.reach}
                  </Text>
                </div>
              )}
              {caseStudy.metrics.totalEngagement && (
                <div>
                  <Text
                    variant="small"
                    className="text-white/60 mb-1"
                  >
                    Total Engagement
                  </Text>
                  <Text
                    variant="body"
                    className="text-white font-semibold"
                  >
                    {caseStudy.metrics.totalEngagement}
                  </Text>
                </div>
              )}
              {caseStudy.metrics.engagementRate && (
                <div>
                  <Text
                    variant="small"
                    className="text-white/60 mb-1"
                  >
                    Engagement Rate
                  </Text>
                  <Text
                    variant="body"
                    className="text-white font-semibold"
                  >
                    {caseStudy.metrics.engagementRate}
                  </Text>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tags */}
        {caseStudy.tags && caseStudy.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {caseStudy.tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2 py-1 bg-white/5 border border-white/10 rounded text-white/70 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* View Case Study Button */}
        <div>
          <Link
            href={`/case-studies/${caseStudy.id}`}
            className="block w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 focus-visible:outline-2 focus-visible:outline-purple-400 focus-visible:outline-offset-2 text-center"
          >
            View Case Study
          </Link>
        </div>
      </div>

      {/* Scale effect on hover */}
      <div
        className={`absolute inset-0 transition-transform duration-300 ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}
        style={{ zIndex: 0 }}
      />
    </div>
  );
}
