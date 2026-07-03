'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface BlogHeaderProps {
  className?: string;
}

export default function BlogHeader({ className = '' }: BlogHeaderProps) {
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.2 },
    },
  };

  return (
    <section className="-mt-24 relative min-h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/who we are/blog.webp"
          alt="Blog Header"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={100}
          className="object-cover"
          style={{
            objectPosition: 'center',
          }}
        />
      </div>

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
      />

      {/* Content */}
      <div className="relative z-20 px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto w-full text-center">
        <motion.h1
          className="mb-6 sm:mb-8 md:mb-12 text-white"
          style={{
            fontFamily: 'var(--font-bricolage-grotesque)',
            fontSize: 'clamp(1.5rem, 6vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: '1.3',
            letterSpacing: '-0.02em',
          }}
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          Everything You Need to Know to Build a Profitable Creator Business.
        </motion.h1>

        <motion.p
          className="text-white/90 max-w-3xl mx-auto px-2"
          style={{
            fontFamily: 'var(--font-lato)',
            fontSize: 'clamp(0.875rem, 3vw, 1.125rem)',
            lineHeight: '1.7',
          }}
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          Expert insights, strategies, and stories from the forefront of the creator economy. Learn
          how to build authentic partnerships, grow your brand, and thrive in today's digital
          landscape.
        </motion.p>
      </div>
    </section>
  );
}
