'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  const words = [
    'Your',
    'Content',
    'Is',
    'a',
    'Business.',
    "It's",
    'Time',
    'to',
    'Run',
    'It',
    'Like',
    'One.',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const underlineVariants = {
    animate: {
      scaleX: [0, 1, 1, 0],
      opacity: [0, 1, 1, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatDelay: 1,
      },
    },
  };

  const isHighlightedWord = (word: string) => {
    return word === 'Content' || word === 'Business.';
  };

  return (
    <section className="hero-fullwidth relative min-h-screen overflow-hidden bg-black rounded-br-[40px] rounded-bl-[40px] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/who we are/herosectionimage.webp"
          alt="Stardust Creator Network hero section - Empowering African creators to build sustainable businesses from their content with professional tools and community support"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={100}
          className="object-cover"
          style={{
            objectPosition: '70% center',
          }}
        />
      </div>

      {/* Purple Overlay - Slightly darker */}
      <div
        className="absolute inset-0 z-5"
        style={{ backgroundColor: 'rgba(87, 5, 139, 0.50)' }}
      />

      {/* Content - centered and responsive with better spacing */}
      <div className="relative z-20 px-6 sm:px-8 lg:px-12 py-16 sm:py-20 md:py-24 max-w-4xl mx-auto w-full text-center">
        {/* Main Headline - Word-by-Word Fade Animation with Modern Underlines */}
        <h1
          className="mb-6 sm:mb-8 text-white flex flex-wrap justify-center gap-2 sm:gap-1 md:gap-3"
          style={{
            fontFamily: 'var(--font-bricolage-grotesque)',
            fontSize: 'clamp(1.5rem, 6vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: '1.3',
            letterSpacing: '-0.02em',
          }}
        >
          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-1 md:gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {words.map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                className="text-white inline-block relative"
              >
                {word}

                {/* Modern Gradient Underline Animation - Contained to word only */}
                {isHighlightedWord(word) && (
                  <motion.div
                    className="absolute -bottom-1 sm:-bottom-1.5 left-0 right-0 h-0.5 sm:h-1 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, transparent, #ffffff, transparent)',
                      boxShadow: '0 0 6px rgba(255, 255, 255, 0.5)',
                      originX: 0.5,
                    }}
                    variants={underlineVariants}
                    animate="animate"
                  />
                )}
              </motion.span>
            ))}
          </motion.div>
        </h1>

        {/* Subheadline - Using Lato font */}
        <motion.p
          className="text-white/90 max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 px-2"
          style={{
            fontFamily: 'var(--font-lato)',
            fontSize: 'clamp(0.875rem, 3vw, 1.125rem)',
            lineHeight: '1.7',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          SCN is the operating system for African creators. The tools, the community, and the
          education you need to turn your content into a real business.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <Link href="/signin">
            <button
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-7 md:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:opacity-90 transition-all text-xs sm:text-sm md:text-base"
              style={{ backgroundColor: '#57058B', color: 'white' }}
            >
              Join the Network
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline sm:w-4 sm:h-4 md:w-5 md:h-5"
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
    </section>
  );
}
