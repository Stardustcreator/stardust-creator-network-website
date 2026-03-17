'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heading, Text } from '@/components/typography';
import { SectionHeader } from '@/components/shared';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { caseStudies } from '@/lib/data/case-studies.data';

// Select the 5 case studies to display with specific images
const featuredCaseStudies = [
  caseStudies.find(cs => cs.id === 'honeywell-relaunch-campaign'),
  caseStudies.find(cs => cs.id === 'axa-mansard-autoflex-campaign'),
  caseStudies.find(cs => cs.id === 'leadway-travel-insurance-campaign'),
  caseStudies.find(cs => cs.id === 'cleamax-campaign'),
  caseStudies.find(cs => cs.id === 'so-fresh-salad-campaign'),
].filter(Boolean); // Remove any undefined entries

// Specific images for each campaign
const campaignImages: Record<string, string> = {
  'honeywell-relaunch-campaign': '/case-studies/T-Spices.webp',
  'leadway-travel-insurance-campaign': '/case-studies/Influencer 19.webp',
  'axa-mansard-autoflex-campaign': '/case-studies/Influencer 13.webp',
  'cleamax-campaign': '/case-studies/Uriel.webp',
  'so-fresh-salad-campaign': '/case-studies/so fresh image 2.webp',
};

export default function TestimonialsSection() {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px',
    triggerOnce: true,
  });

  return (
    <section
      id="testimonials"
      ref={elementRef}
      className="relative py-16 md:py-24 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Heading */}
        <div className="text-center mb-4">
          <SectionHeader
            words={[
              { text: 'Campaign ', className: 'text-white' },
              {
                text: 'Case Studies',
                className:
                  'bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent',
              },
            ]}
            headingClassName="text-3xl md:text-4xl lg:text-5xl font-bold"
            className="mb-0"
            centered={true}
            staggerDelay={200}
            level={2}
          />
        </div>

        {/* Section Subtext */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Text
            variant="body"
            className="!text-white/70 text-base md:text-lg leading-relaxed"
          >
            Real creator-led campaigns executed with leading brands.
            <br />
            Explore how influencer collaborations drive measurable results.
          </Text>
        </div>

        {/* Case Studies Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCaseStudies.map((caseStudy, index) => {
              if (!caseStudy) return null;

              return (
                <Link
                  key={caseStudy.id}
                  href={`/case-studies/${caseStudy.id}`}
                  className={`group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-purple-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 cursor-pointer ${
                    isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Cover Image */}
                  {campaignImages[caseStudy.id] ? (
                    <div className="relative w-full h-64 overflow-hidden bg-neutral-900">
                      <Image
                        src={campaignImages[caseStudy.id]}
                        alt={caseStudy.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={90}
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-64 bg-gradient-to-br from-purple-900/20 to-pink-900/20" />
                  )}

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Brand Logo */}
                    <div className="mb-3">
                      {caseStudy.logo && (
                        <div className="relative w-16 h-16">
                          <Image
                            src={caseStudy.logo}
                            alt={`${caseStudy.client} logo`}
                            fill
                            className="object-contain"
                            sizes="64px"
                            quality={90}
                          />
                        </div>
                      )}
                    </div>

                    {/* Campaign Name */}
                    <Heading
                      level={3}
                      variant="default"
                      className="!text-white text-sm font-bold mb-2 line-clamp-2"
                    >
                      {caseStudy.title.replace('\n', ' ')}
                    </Heading>

                    {/* Campaign Subtext */}
                    {caseStudy.excerpt && (
                      <Text
                        variant="small"
                        className="!text-white/70 text-sm leading-relaxed line-clamp-3"
                      >
                        {caseStudy.excerpt}
                      </Text>
                    )}
                  </div>

                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
