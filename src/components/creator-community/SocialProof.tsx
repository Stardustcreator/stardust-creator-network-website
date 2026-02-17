'use client';

import { Heading, Text } from '@/components/typography';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  platform: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote:
      "Being part of the SCN community has completely transformed my creator journey. The connections I've made have led to collaborations I never thought possible.",
    author: 'Adaeze O.',
    role: 'Lifestyle Creator',
    platform: 'Instagram',
  },
  {
    id: '2',
    quote:
      'The brand opportunities alone have paid for my membership multiple times over. But the real value is in the community and support.',
    author: 'Tunde M.',
    role: 'Tech Reviewer',
    platform: 'YouTube',
  },
  {
    id: '3',
    quote:
      "I went from struggling to find collaborations to having a network of fellow creators who genuinely support each other's growth.",
    author: 'Chioma E.',
    role: 'Fashion Creator',
    platform: 'TikTok',
  },
];

export default function SocialProof() {
  return (
    <section className="py-16 md:py-24">
      {/* Testimonials */}
      <div className="text-center mb-12">
        <Heading
          level={2}
          className="text-white text-2xl md:text-3xl lg:text-4xl mb-4"
        >
          What Our Creators Say
        </Heading>
        <Text
          variant="large"
          className="text-white/70 max-w-2xl mx-auto"
        >
          Join a community of creators who are already growing together
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map(testimonial => (
          <div
            key={testimonial.id}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300"
          >
            {/* Quote */}
            <div className="mb-6">
              <svg
                className="w-8 h-8 text-purple-400/50 mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <Text
                variant="body"
                className="text-white/80 italic leading-relaxed"
              >
                &ldquo;{testimonial.quote}&rdquo;
              </Text>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                {testimonial.author.charAt(0)}
              </div>
              <div>
                <Text
                  variant="body"
                  className="text-white font-medium"
                >
                  {testimonial.author}
                </Text>
                <Text
                  variant="small"
                  className="text-white/50"
                >
                  {testimonial.role} • {testimonial.platform}
                </Text>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
