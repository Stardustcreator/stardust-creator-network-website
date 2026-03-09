'use client';

import { Heading, Text } from '@/components/typography';
import { SectionHeader } from '@/components/shared';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const testimonials = [
  {
    quote: 'After implementing the pricing playbook, I increased my brand deal rates by 2x.',
    name: 'Creator Member',
    role: 'Content Creator',
    initial: 'C',
  },
  {
    quote: 'Used the digital product planner and launched my first paid workshop in 30 days.',
    name: 'Creator Member',
    role: 'Educator',
    initial: 'M',
  },
  {
    quote: 'The contract breakdown saved me from signing away usage rights.',
    name: 'Creator Member',
    role: 'Brand Partner',
    initial: 'S',
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
        {/* Section Label */}
        <div className="text-center mb-6">
          <Text
            variant="small"
            className="text-purple-400 uppercase tracking-[0.2em] font-bold text-sm"
          >
            TESTIMONIALS
          </Text>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-12">
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

        {/* Testimonials Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-purple-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 ${
                  isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Quote Icon */}
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                  <Text
                    variant="body"
                    className="!text-white text-xl font-bold"
                  >
                    "
                  </Text>
                </div>

                {/* Testimonial Content */}
                <div className="mb-6 mt-4">
                  <Text
                    variant="body"
                    className="!text-white/90 text-sm md:text-base italic leading-relaxed"
                  >
                    "{testimonial.quote}"
                  </Text>
                </div>

                {/* Creator Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  {/* Avatar Placeholder */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                    <Text
                      variant="body"
                      className="!text-white font-bold text-sm"
                    >
                      {testimonial.initial}
                    </Text>
                  </div>

                  {/* Name and Role */}
                  <div className="flex-1">
                    <Text
                      variant="body"
                      className="!text-white font-semibold text-sm"
                    >
                      {testimonial.name}
                    </Text>
                    <Text
                      variant="small"
                      className="!text-white/60 text-xs"
                    >
                      {testimonial.role}
                    </Text>
                  </div>
                </div>

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon Note */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-500 ${
            isIntersecting ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Text
            variant="small"
            className="!text-white/50 text-xs italic"
          >
            More creator stories coming soon
          </Text>
        </div>
      </div>
    </section>
  );
}
