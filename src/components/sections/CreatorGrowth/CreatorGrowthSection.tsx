'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Food',
    image: '/creators/Food category card.webp',
  },
  {
    name: 'Beauty',
    image: '/creators/Beauty category card.webp',
  },
  {
    name: 'Tech',
    image: '/creators/Tech category card.webp',
  },
  {
    name: 'Finance',
    image: '/creators/Finance category card.webp',
  },
  {
    name: 'Lifestyle',
    image: '/creators/Lifestyle category card.webp',
  },
];

export default function CreatorGrowthSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-14 sm:py-16 md:py-20">
      {/* =========================
          HEADER
      ========================== */}
      <div className="mx-auto w-full px-6 sm:px-8 lg:px-20">
        <div className="mb-10 flex w-full flex-col gap-7 md:mb-12">
          {/* Heading */}
          <motion.h2
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
              ease: 'easeOut',
            }}
            className="max-w-[700px] text-[32px] font-semibold leading-[38px] tracking-[-1.5px] text-[#262626] sm:text-[38px] sm:leading-[44px] md:text-[42px] md:leading-[48px]"
            style={{
              fontFamily: 'var(--font-instrument-sans)',
            }}
          >
            Every niche has a voice people trust. We know who they are.
          </motion.h2>

          {/* Buttons */}
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.6,
              delay: 0.15,
            }}
            className="flex flex-wrap items-center gap-3"
          >
            {/* Find your Creator match */}
            <Link
              href="/find-creators"
              className="inline-flex h-[48px] items-center justify-center rounded-[8px] bg-[#57058B] px-6 text-[14px] font-medium text-white transition-opacity duration-200 hover:opacity-90"
              style={{
                fontFamily: 'var(--font-lato)',
              }}
            >
              Find your Creator match
            </Link>

            {/* I'm a Creator */}
            <Link
              href="/signin"
              className="inline-flex h-[48px] items-center justify-center rounded-[8px] border border-[#E5E5E5] bg-white px-6 text-[14px] font-medium text-[#262626] transition-colors duration-200 hover:bg-[#f7f7f7]"
              style={{
                fontFamily: 'var(--font-lato)',
              }}
            >
              I’m a Creator
            </Link>
          </motion.div>
        </div>
      </div>

      {/* =========================
          CATEGORY CARD MARQUEE
      ========================== */}
      <div className="relative w-full overflow-hidden">
        {/* Left fade */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-20 h-full w-12 sm:w-20 md:w-28"
          style={{
            background: 'linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0) 100%)',
          }}
        />

        {/* Right fade */}
        <div
          className="pointer-events-none absolute right-0 top-0 z-20 h-full w-12 sm:w-20 md:w-28"
          style={{
            background: 'linear-gradient(to left, #ffffff 0%, rgba(255,255,255,0) 100%)',
          }}
        />

        {/* =========================
            ANIMATED TRACK
        ========================== */}
        <motion.div
          className="flex w-max"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
            },
          }}
        >
          {/* =========================
              FIRST SET
          ========================== */}
          <div className="flex shrink-0 gap-5 px-3 sm:gap-6 sm:px-4 md:gap-6 md:px-5">
            {categories.map((category, index) => (
              <motion.div
                key={`${category.name}-first`}
                className="relative h-[340px] w-[260px] shrink-0 overflow-hidden rounded-[16px] sm:h-[360px] sm:w-[275px] md:h-[340px] md:w-[260px]"
                whileHover={{
                  scale: 1.015,
                }}
                transition={{
                  duration: 0.25,
                }}
              >
                <Image
                  src={category.image}
                  alt={`${category.name} creator category`}
                  fill
                  sizes="260px"
                  priority={index < 3}
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>

          {/* =========================
              SECOND SET
              DUPLICATE FOR LOOP
          ========================== */}
          <div className="flex shrink-0 gap-5 px-3 sm:gap-6 sm:px-4 md:gap-6 md:px-5">
            {categories.map(category => (
              <motion.div
                key={`${category.name}-second`}
                className="relative h-[340px] w-[260px] shrink-0 overflow-hidden rounded-[16px] sm:h-[360px] sm:w-[275px] md:h-[340px] md:w-[260px]"
                whileHover={{
                  scale: 1.015,
                }}
                transition={{
                  duration: 0.25,
                }}
              >
                <Image
                  src={category.image}
                  alt={`${category.name} creator category`}
                  fill
                  sizes="260px"
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
