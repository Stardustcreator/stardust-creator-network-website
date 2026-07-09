'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const creatorTestimonials = [
  {
    coverImage: '/case-studies/Influencer 12.webp',
    youtubeShortId: '575zHUMhoAc',
    subtext: "You definitely know you're in excellent hands when you're working with SCN.",
  },
  {
    coverImage: '/case-studies/favimore 2.webp',
    youtubeShortId: 'Q1J4s6zahFo',
    subtext:
      "I've worked with SCN for 6 months now, and they are reliable and professional. They let you tap into your creativity and content style.",
  },
  {
    coverImage: '/case-studies/raeedas made.webp',
    youtubeShortId: 'gbycxCdgdW8',
    subtext:
      "Through SCN, I've been able to work with amazing brands and it feels like a true partnership.",
  },
];

export default function TestimonialsSection() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const openVideo = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
      },
    }),
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
        className="relative py-16 md:py-32 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #7805C4 0%, #5705BB 100%)' }}
      >
        <div className="container mx-auto px-6 relative z-10">
          {/* Main Heading */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              What Creators Are Saying About SCN
            </motion.h2>
          </div>

          {/* Creator Testimonials Grid */}
          <div className="max-w-6xl mx-auto mb-12 sm:mb-16 md:mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {creatorTestimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  onClick={() => openVideo(testimonial.youtubeShortId)}
                  className="group relative rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full flex flex-col"
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {/* Cover Image */}
                  <div className="relative w-full h-64 overflow-hidden bg-neutral-400">
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
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

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

                  {/* Card Content - Dark Background */}
                  <div
                    className="p-6 sm:p-8 flex-grow flex items-center"
                    style={{ backgroundColor: '#272329' }}
                  >
                    <p
                      className="text-white/90 text-sm sm:text-base leading-relaxed"
                      style={{ fontFamily: 'var(--font-lato)' }}
                    >
                      {testimonial.subtext}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Button Below Cards */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="/signin">
                <button
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 text-black font-semibold hover:opacity-90 transition-all rounded-lg cursor-pointer"
                  style={{ backgroundColor: '#FFFFFF', border: 'none' }}
                >
                  <span style={{ fontFamily: 'var(--font-lato)' }}>Start your Story</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 10H16M16 10L11 5M16 10L11 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </Link>
            </motion.div>
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
