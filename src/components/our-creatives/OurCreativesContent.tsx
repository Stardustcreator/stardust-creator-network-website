'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heading, Text } from '@/components/typography';
import { useState, useEffect } from 'react';

/**
 * Our Creatives Content Component
 *
 * Displays a gallery of social media creative designs with:
 * - Hero section with gradient background
 * - Modern masonry-style grid layout
 * - Smooth animations and hover effects
 * - Lightbox/modal for viewing full-size images
 */

interface CreativeDesign {
  id: string;
  title: string;
  image: string;
  category?: string;
}

// All creative designs from the creatives folder
const creativeDesigns: CreativeDesign[] = [
  {
    id: '1',
    title: 'Creative Design 1',
    image: '/creatives/2.webp',
  },
  {
    id: '2',
    title: 'Creative Design 2',
    image: '/creatives/3.webp',
  },
  {
    id: '3',
    title: 'Creative Design 3',
    image: '/creatives/4.webp',
  },
  {
    id: '4',
    title: 'Creative Design 4',
    image: '/creatives/6.webp',
  },
  {
    id: '5',
    title: 'Creative Design 5',
    image: '/creatives/7.webp',
  },
  {
    id: '6',
    title: 'Creative Design 6',
    image: '/creatives/8.webp',
  },
  {
    id: '7',
    title: 'SCN Campaign Design 1',
    image: '/creatives/SCN-1Artboard 1 copy 3.webp',
  },
  {
    id: '8',
    title: 'SCN Campaign Design 2',
    image: '/creatives/SCN-1Artboard 1 copy 5.webp',
  },
  {
    id: '9',
    title: 'SCN Campaign Design 3',
    image: '/creatives/SCN-1Artboard 1 copy 6.webp',
  },
  {
    id: '10',
    title: 'SCN Campaign Design 4',
    image: '/creatives/SCN-1Artboard 1 copy 7.webp',
  },
  {
    id: '11',
    title: 'SCN Campaign Design 5',
    image: '/creatives/SCN-1Artboard 1 copy 8.webp',
  },
  {
    id: '12',
    title: 'SCN Campaign Design 6',
    image: '/creatives/SCN-1Artboard 1 copy 10.webp',
  },
  {
    id: '13',
    title: 'SCN Campaign Design 7',
    image: '/creatives/SCN-1Artboard 1 copy 11.webp',
  },
  {
    id: '14',
    title: 'SCN Campaign Design 8',
    image: '/creatives/SCN-1Artboard 1 copy 12.webp',
  },
];

export default function OurCreativesContent() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isVisible] = useState(true); // Initialize to true to trigger animations immediately

  // Close lightbox on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        setSelectedImage(null);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [selectedImage]);

  return (
    <>
      {/* Creatives Gallery Section - Moved to top */}
      <section className="pt-24 pb-12 md:pb-16 lg:pb-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Modern Grid Layout - Responsive for all devices */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-0">
            {creativeDesigns.map((design, index) => (
              <div
                key={design.id}
                className="group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20"
                style={{
                  animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.05}s both` : 'none',
                  opacity: isVisible ? 1 : 0,
                }}
                onClick={() => setSelectedImage(design.image)}
              >
                {/* Image Container */}
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={design.image}
                    alt={design.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    loading={index < 8 ? 'eager' : 'lazy'}
                  />

                  {/* Gradient Overlay - appears on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  {/* View Icon - appears on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/20 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section - Start Your Campaign */}
          <div className="mt-16 md:mt-20">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto">
              <Heading
                level={2}
                variant="gradient"
                className="text-2xl md:text-3xl mb-4"
              >
                Ready to Create Your Own?
              </Heading>
              <Text
                variant="large"
                className="text-white/80 mb-6 max-w-2xl mx-auto"
              >
                Love what you see? Let&apos;s bring your brand&apos;s vision to life with stunning
                creative designs that connect with your audience.
              </Text>
              <Link
                href="/brands/brief"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
              >
                Start Your Campaign
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal with Animation */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/98 backdrop-blur-sm flex items-center justify-center p-4"
          style={{
            animation: 'fadeIn 0.3s ease-out',
          }}
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:text-purple-400 transition-all duration-300 z-10 bg-black/50 backdrop-blur-md rounded-full p-3 hover:bg-black/70 hover:scale-110 border border-white/10"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            <svg
              className="w-6 h-6 md:w-8 md:h-8"
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

          {/* Image Container */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full"
            style={{
              animation: 'scaleIn 0.4s ease-out',
            }}
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Creative design"
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Instructions */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm">
            Press ESC to close
          </div>
        </div>
      )}
    </>
  );
}
