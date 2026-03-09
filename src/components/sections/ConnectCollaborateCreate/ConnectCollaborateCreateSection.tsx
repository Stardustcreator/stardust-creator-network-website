'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heading, Text } from '@/components/typography';
import { SectionHeader } from '@/components/shared';
import { encodeImagePath } from '@/lib/utils';

export default function ConnectCollaborateCreateSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    {
      src: '/who we are/side-view-teen-playing-ukulele.webp',
      alt: 'Teen creator with ukulele making content',
    },
    {
      src: '/who we are/collage-people-using-reels.webp',
      alt: 'Collage of creators using reels and producing content',
    },
    {
      src: '/who we are/full-length-portrait-lovely-afro-american-woman.webp',
      alt: 'Full length portrait of Afro-American woman creator',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [images.length]);
  return (
    <section
      id="who-we-are"
      className="relative py-20 md:py-32 bg-black overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header - Centered */}
        <div className="text-center mb-16">
          <SectionHeader
            words={[
              { text: 'What ' },
              {
                text: 'SCN ',
                className:
                  'bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent',
              },
              { text: 'Does' },
            ]}
            headingClassName="text-white text-4xl md:text-5xl lg:text-6xl"
            className="mb-0"
            centered={true}
            staggerDelay={300}
          />
        </div>

        {/* Main Content Card */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-0 lg:min-h-[600px]">
            {/* Left Side - Image Slider */}
            <div className="relative h-[550px] lg:h-full overflow-hidden lg:rounded-l-3xl shadow-2xl">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={encodeImagePath(image.src)}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                    quality={85}
                  />
                </div>
              ))}

              {/* Slide Indicators - Absolute at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 py-5 bg-gradient-to-t from-black/60 to-transparent z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-8'
                        : 'bg-white/70 hover:bg-white'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 lg:rounded-r-3xl backdrop-blur-sm border border-white/10 p-8 md:p-10 lg:p-12 flex flex-col justify-center h-full">
              <Heading
                level={2}
                variant="default"
                className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-6"
              >
                We Turn Creators Into Creator Businesses.
              </Heading>

              <div className="mb-8">
                <Text
                  variant="body"
                  className="text-white/90 text-lg font-semibold mb-4"
                >
                  Most creators are stuck here:
                </Text>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-white/80">
                    <span className="text-pink-400 mt-1">•</span>
                    <span>Posting consistently but underpricing</span>
                  </li>
                  <li className="flex items-start gap-3 text-white/80">
                    <span className="text-pink-400 mt-1">•</span>
                    <span>Getting random brand deals but no system</span>
                  </li>
                  <li className="flex items-start gap-3 text-white/80">
                    <span className="text-pink-400 mt-1">•</span>
                    <span>Growing followers but not predictable income</span>
                  </li>
                  <li className="flex items-start gap-3 text-white/80">
                    <span className="text-pink-400 mt-1">•</span>
                    <span>Burning out because everything depends on them</span>
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <Text
                  variant="body"
                  className="text-white font-bold text-xl mb-4"
                >
                  SCN exists to fix that.
                </Text>
                <Text
                  variant="body"
                  className="text-white/90 text-lg font-semibold mb-4"
                >
                  We help you:
                </Text>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2 text-white/80">
                    <span className="text-green-400">✓</span>
                    <span>Price properly</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/80">
                    <span className="text-green-400">✓</span>
                    <span>Pitch strategically</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/80">
                    <span className="text-green-400">✓</span>
                    <span>Package your offers</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/80">
                    <span className="text-green-400">✓</span>
                    <span>Build systems</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/80">
                    <span className="text-green-400">✓</span>
                    <span>Launch digital products</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/80">
                    <span className="text-green-400">✓</span>
                    <span>Design memberships</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/80 sm:col-span-2">
                    <span className="text-green-400">✓</span>
                    <span>Understand contracts & licensing</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/80 sm:col-span-2">
                    <span className="text-green-400">✓</span>
                    <span>Think long-term (equity, IP, ownership)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 mb-6">
                <Text
                  variant="body"
                  className="text-white/90 text-lg font-semibold italic"
                >
                  We don't teach trends. We teach creator business infrastructure.
                </Text>
              </div>

              {/* CTA Button */}
              <div>
                <a
                  href="#waitlist"
                  onClick={e => {
                    e.preventDefault();
                    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-primary"
                >
                  JOIN NOW
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
