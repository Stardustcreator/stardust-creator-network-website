'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const logos = [
  {
    src: '/brand logos/logo 1.webp',
    alt: 'Brand logo 1',
  },
  {
    src: '/brand logos/original leadway.webp',
    alt: 'Leadway',
  },
  {
    src: '/brand logos/logo 3.webp',
    alt: 'Brand logo 3',
  },
  {
    src: '/brand logos/logo 5.webp',
    alt: 'Brand logo 5',
  },
  {
    src: '/brand logos/logo 6.webp',
    alt: 'Brand logo 6',
  },
];

export default function ConnectCollaborateCreateSection() {
  return (
    <section
      id="brands-section"
      className="w-full overflow-hidden bg-white"
    >
      <div className="relative w-full py-10 sm:py-12 md:py-14">
        {/* LEFT FADE */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-20 h-full w-12 sm:w-20 md:w-28"
          style={{
            background: 'linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0) 100%)',
          }}
        />

        {/* RIGHT FADE */}
        <div
          className="pointer-events-none absolute right-0 top-0 z-20 h-full w-12 sm:w-20 md:w-28"
          style={{
            background: 'linear-gradient(to left, #ffffff 0%, rgba(255,255,255,0) 100%)',
          }}
        />

        {/* LOGO MARQUEE */}
        <motion.div
          className="flex w-max items-center"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            x: {
              duration: 76,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
            },
          }}
        >
          {/* Four identical sets. Moving -50% shifts exactly two sets, so the
              loop is seamless, and four sets are always wider than the screen
              even with only five logos. */}
          {[0, 1, 2, 3].map(set => (
            <div
              key={`set-${set}`}
              className="flex shrink-0 items-center gap-10 px-6 sm:gap-14 sm:px-8 md:gap-20 md:px-10 lg:gap-24"
              aria-hidden={set > 0 ? true : undefined}
            >
              {logos.map((logo, index) => (
                <motion.div
                  key={`${set}-${index}`}
                  className="flex h-[65px] w-[150px] shrink-0 items-center justify-center sm:w-[170px] md:w-[180px]"
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  <Image
                    src={logo.src}
                    alt={set > 0 ? '' : logo.alt}
                    width={180}
                    height={80}
                    className="h-auto max-h-[60px] w-auto max-w-[165px] object-contain"
                    sizes="180px"
                  />
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
