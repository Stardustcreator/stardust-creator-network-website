'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Text } from '@/components/typography';
import { SectionHeader } from '@/components/shared';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const creatorTestimonials = [
  {
    coverImage: '/case-studies/Influencer 12.webp',
    youtubeShortId: '575zHUMhoAc',
    subtext: 'A high-performing creator collaboration driving strong audience engagement.',
  },
  {
    coverImage: '/case-studies/favimore 2.webp',
    youtubeShortId: 'Q1J4s6zahFo',
    subtext: 'A food-focused campaign blending creativity with authentic storytelling.',
  },
  {
    coverImage: '/case-studies/raeedas made.webp',
    youtubeShortId: 'gbycxCdgdW8',
    subtext: 'A visually compelling campaign capturing attention and driving interaction.',
  },
];

export default function TestimonialsSection() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px',
    triggerOnce: true,
  });

  const openVideo = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

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
                { text: 'Creator ', className: 'text-white' },
                {
                  text: 'Wins',
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
              See how creators are thriving with authentic brand collaborations.
              <br />
              Real campaigns, real impact, real success.
            </Text>
          </div>

          {/* Creator Testimonials Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {creatorTestimonials.map((testimonial, index) => (
                <div
                  key={index}
                  onClick={() => openVideo(testimonial.youtubeShortId)}
                  className={`group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-purple-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 cursor-pointer ${
                    isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Cover Image */}
                  <div className="relative w-full h-64 overflow-hidden bg-neutral-900">
                    <Image
                      src={testimonial.coverImage}
                      alt="Creator success story"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={90}
                      style={index === 2 ? { objectPosition: 'center 30%' } : undefined}
                    />

                    {/* Dark overlay on hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                        <svg
                          className="w-8 h-8 text-purple-600 ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <Text
                      variant="small"
                      className="!text-white/70 text-sm leading-relaxed"
                    >
                      {testimonial.subtext}
                    </Text>
                  </div>

                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Video Modal */}
          {selectedVideo && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 transition-opacity duration-200"
              onClick={closeVideo}
            >
              <div
                className="relative w-full max-w-md aspect-[9/16] bg-black rounded-lg overflow-hidden shadow-2xl transform transition-all duration-300 scale-95 animate-in"
                onClick={e => e.stopPropagation()}
                style={{ animation: 'scaleIn 0.3s ease-out forwards' }}
              >
                {/* Close Button */}
                <button
                  onClick={closeVideo}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-200 group"
                  aria-label="Close video"
                >
                  <svg
                    className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* YouTube Embed */}
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&controls=1&modestbranding=1&rel=0`}
                  title="Creator Success Story"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
