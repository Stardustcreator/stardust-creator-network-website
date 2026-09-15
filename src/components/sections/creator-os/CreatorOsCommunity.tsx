'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// No corresponding CMS key ("Join a community of like-minded creators" isn't
// heroTitle/heroSubtitle/heroButton, features, or finalCtaTitle), so this
// section stays hardcoded.
export default function CreatorOsCommunity() {
  const sectionTitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    }),
  };

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionTitleVariants}
          >
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 md:mb-6"
              style={{
                fontFamily: 'var(--font-bricolage-grotesque)',
              }}
            >
              Join a community of like-minded creators
            </h2>
            <p className="text-gray-600 text-base md:text-lg font-lato mb-6 md:mb-8 leading-relaxed">
              Live clinics, expert mentorship, templates, and a community of creators who are
              building real businesses from their content. You do not have to figure this out alone.
            </p>
            <Link href="/signin">
              <button
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all text-sm md:text-base"
                style={{ backgroundColor: '#57058B', color: 'white' }}
              >
                Join the Network
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

          {/* Right - Creator Grid */}
          <motion.div
            className="grid grid-cols-3 gap-3 md:gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <motion.div
                key={num}
                custom={num - 1}
                variants={imageVariants}
              >
                <Image
                  src={`/who we are/IMAGE ${num}.webp`}
                  alt={`Creator ${num}`}
                  width={200}
                  height={200}
                  className="w-full h-auto rounded-lg object-cover aspect-square"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
