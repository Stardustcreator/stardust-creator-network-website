'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Heading, Text } from '@/components/typography';
import { SectionHeader } from '@/components/shared';

const stopDoing = [
  'Guessing your rates',
  'Waiting for brands to DM you',
  'Accepting vague briefs',
  'Signing bad contracts',
  'Relying on one income stream',
];

const startDoing = [
  "Charging what you're worth",
  'Landing repeat brand deals',
  'Building predictable revenue',
  'Diversifying your income',
  'Building a creator business',
];

export default function WaitlistBenefits() {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px',
    triggerOnce: true,
  });

  return (
    <section
      ref={elementRef}
      className="relative py-16 md:py-24 bg-white overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/2 right-1/3 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Heading */}
        <div className="text-center mb-12 md:mb-16">
          <SectionHeader
            words={[
              { text: 'What ', className: 'text-gray-900' },
              { text: 'Happens ', className: 'text-gray-900' },
              { text: 'When ', className: 'text-gray-900' },
              { text: 'You ', className: 'text-gray-900' },
              {
                text: 'Join?',
                className:
                  'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent',
              },
            ]}
            headingClassName="text-3xl md:text-4xl lg:text-5xl font-bold"
            className="mb-0"
            centered={true}
            staggerDelay={150}
            level={2}
          />
        </div>

        {/* Two Column Layout */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Left Card - You Stop */}
            <div
              className={`group relative bg-red-50/50 backdrop-blur-md border border-red-200 rounded-2xl p-8 hover:border-red-300 hover:bg-red-50 transition-all duration-300 hover:shadow-lg hover:shadow-red-200/50 ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              {/* Subtle red glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

              <div className="relative z-10">
                <Heading
                  level={3}
                  variant="default"
                  className="text-2xl md:text-3xl font-bold text-red-600 mb-6"
                >
                  You Stop:
                </Heading>

                <ul className="space-y-4">
                  {stopDoing.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <span className="text-red-500 text-xl flex-shrink-0 mt-0.5">✗</span>
                      <span className="text-base md:text-lg leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Card - And You Start */}
            <div
              className={`group relative bg-green-50/50 backdrop-blur-md border border-green-200 rounded-2xl p-8 hover:border-green-300 hover:bg-green-50 transition-all duration-300 hover:shadow-lg hover:shadow-green-200/50 ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {/* Subtle green glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

              <div className="relative z-10">
                <Heading
                  level={3}
                  variant="default"
                  className="text-2xl md:text-3xl font-bold text-green-600 mb-6"
                >
                  And You Start:
                </Heading>

                <ul className="space-y-4">
                  {startDoing.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <span className="text-green-500 text-xl flex-shrink-0 mt-0.5">✓</span>
                      <span className="text-base md:text-lg leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
