'use client';

import Image from 'next/image';
import { Text } from '@/components/typography';
import { SectionHeader } from '@/components/shared';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const instagramTestimonials = [
  {
    coverImage: '/case-studies/Influencer 12.webp',
    instagramUrl: 'https://www.instagram.com/reel/DScbmVvDD87/?igsh=c2xwa2pzZ2VweTM3',
    subtext: 'A high-performing creator collaboration driving strong audience engagement.',
  },
  {
    coverImage: '/case-studies/Favimore Kitchen.webp',
    instagramUrl: 'https://www.instagram.com/reel/DSSIgiPjLF1/?igsh=ZTlydTRpMXJ2M2I3',
    subtext: 'A food-focused campaign blending creativity with authentic storytelling.',
  },
  {
    coverImage: '/case-studies/reedas.webp',
    instagramUrl: 'https://www.instagram.com/reel/DSH1u6hDB5Z/?igsh=cWpwYXIzaDZndGZp',
    subtext: 'A visually compelling campaign capturing attention and driving interaction.',
  },
];

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

        {/* Instagram Testimonials Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instagramTestimonials.map((testimonial, index) => (
              <a
                key={index}
                href={testimonial.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
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
                  />
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
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
