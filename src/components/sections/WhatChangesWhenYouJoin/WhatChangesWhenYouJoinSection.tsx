'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const socialIcons = [
  {
    src: '/icons/Instagram.webp',
    alt: 'Instagram',
    className: 'absolute left-[46px] top-[22px]',
    delay: 0,
  },
  {
    src: '/icons/X.webp',
    alt: 'X',
    className: 'absolute left-[108px] top-[8px]',
    delay: 0.4,
  },
  {
    src: '/icons/TikTok%20(1).webp',
    alt: 'TikTok',
    className: 'absolute left-[170px] top-[34px]',
    delay: 0.8,
  },
  {
    src: '/icons/YouTube%20(1).webp',
    alt: 'YouTube',
    className: 'absolute left-[232px] top-[10px]',
    delay: 1.2,
  },
  {
    src: '/icons/Facebook%20(1).webp',
    alt: 'Facebook',
    className: 'absolute left-[77px] top-[82px]',
    delay: 0.6,
  },
  {
    src: '/icons/LinkedIn%20(1).webp',
    alt: 'LinkedIn',
    className: 'absolute left-[201px] top-[94px]',
    delay: 1,
  },
];

export default function WhatChangesWhenYouJoinSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#fafaf9] py-16 sm:py-20 md:py-16">
      <div className="mx-auto w-full px-6 sm:px-8 lg:px-20">
        {/* =========================
            HEADER
        ========================== */}
        <div className="mb-12 flex w-full flex-col gap-8 md:mb-16 md:flex-row md:items-start md:justify-between md:gap-12">
          {/* Main heading */}
          <motion.h2
            initial={{
              opacity: 0,
              y: 30,
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
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-[660px] text-[32px] font-semibold leading-[38px] tracking-[-1.2px] text-[#262626] sm:text-[36px] sm:leading-[43px] md:text-[40px] md:leading-[48px] md:tracking-[-1.5px]"
            style={{
              fontFamily: 'var(--font-instrument-sans)',
            }}
          >
            One brief. Any goal.
          </motion.h2>

          {/* Supporting text - STATIC */}
          <p
            className="max-w-[417px] text-[16px] leading-[24px] tracking-[-0.2px] text-[#737373] md:pt-1"
            style={{
              fontFamily: 'var(--font-lato)',
            }}
          >
            Awareness, trust or action, we provide the right creators to help you achieve your
            goals.
          </p>
        </div>

        {/* =========================
            CARDS
        ========================== */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {/* ==================================
              CARD 1 - SPONSORED POSTS
              ONLY THIS CARD'S ICONS ANIMATE
          =================================== */}
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[16px] bg-[#a51cff] px-7 pb-8 pt-7 shadow-[0px_12px_16px_-4px_rgba(0,0,0,0.08),0px_4px_6px_-2px_rgba(0,0,0,0.03)]">
            {/* SOCIAL ICON MOSAIC */}
            <div className="relative mx-auto mb-5 h-[168px] w-full max-w-[317px] shrink-0">
              {socialIcons.map(icon => (
                <motion.div
                  key={icon.alt}
                  className={`${icon.className} h-[56px] w-[56px]`}
                  animate={{
                    y: [0, -5, 0, 5, 0],
                  }}
                  transition={{
                    duration: 4.5,
                    delay: icon.delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  whileHover={{
                    scale: 1.08,
                  }}
                >
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    fill
                    sizes="56px"
                    className="object-contain"
                  />
                </motion.div>
              ))}
            </div>

            {/* Card copy - STATIC */}
            <div className="flex w-full flex-col gap-3 text-white">
              <h3
                className="text-[20px] font-medium leading-[24px] tracking-[-0.7px]"
                style={{
                  fontFamily: 'var(--font-instrument-sans)',
                }}
              >
                Sponsored Post
              </h3>

              <p
                className="text-[14.5px] leading-[1.45]"
                style={{
                  fontFamily: 'var(--font-lato)',
                }}
              >
                Your brand in a trusted creator&apos;s voice, on their page, to people who actually
                listen.
              </p>
            </div>
          </div>

          {/* ==================================
              CARD 2 - UGC CONTENT
              COMPLETELY STATIC
          =================================== */}
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[16px] bg-[#272329] px-7 pb-8 pt-7 shadow-[0px_12px_16px_-4px_rgba(0,0,0,0.08),0px_4px_6px_-2px_rgba(0,0,0,0.03)]">
            {/* Phone image */}
            <div className="relative mb-5 flex h-[168px] w-full shrink-0 items-center justify-center overflow-hidden">
              <div className="relative h-[168px] w-[151px] overflow-hidden rounded-[16px]">
                <Image
                  src="/who%20we%20are/frame%202.webp"
                  alt="UGC content creator"
                  fill
                  sizes="151px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Card copy */}
            <div className="flex w-full flex-col gap-3 text-white">
              <h3
                className="text-[20px] font-medium leading-[24px] tracking-[-0.7px]"
                style={{
                  fontFamily: 'var(--font-instrument-sans)',
                }}
              >
                UGC content
              </h3>

              <p
                className="text-[14.5px] leading-[1.45]"
                style={{
                  fontFamily: 'var(--font-lato)',
                }}
              >
                Creator videos for paid social, product pages and more, with usage agreed upfront.
              </p>
            </div>
          </div>

          {/* ==================================
              CARD 3 - POSTING ONLY
              COMPLETELY STATIC
          =================================== */}
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[16px] bg-[#fc0] px-7 pb-8 pt-7 shadow-[0px_12px_16px_-4px_rgba(0,0,0,0.08),0px_4px_6px_-2px_rgba(0,0,0,0.03)]">
            {/* Distribution graphic */}
            <div className="relative mb-5 h-[168px] w-full shrink-0">
              {/* Main distribution bars */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-[168px] w-[317px] max-w-full">
                  <Image
                    src="/icons/Distribution%20bars.webp"
                    alt="Distribution bars"
                    fill
                    sizes="317px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Left views chip */}
              <div className="absolute left-[-1px] top-[62px] z-10 h-auto w-[81px]">
                <Image
                  src="/icons/Views%20Chip.webp"
                  alt="12.4k views"
                  width={81}
                  height={56}
                  className="h-auto w-full object-contain"
                />
              </div>

              {/* Right engagement chip */}
              <div className="absolute right-[-1px] top-[48px] z-10 h-auto w-[81px]">
                <Image
                  src="/icons/Views%20Chip%20(1).webp"
                  alt="15.4 percent engagement"
                  width={81}
                  height={56}
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>

            {/* Card copy */}
            <div className="flex w-full flex-col gap-3 text-[#170f24]">
              <h3
                className="text-[20px] font-medium leading-[24px] tracking-[-0.7px]"
                style={{
                  fontFamily: 'var(--font-instrument-sans)',
                }}
              >
                Posting only
              </h3>

              <p
                className="text-[14.5px] leading-[1.45]"
                style={{
                  fontFamily: 'var(--font-lato)',
                }}
              >
                Got the creative asset? We put it in front of the audience you&apos;ve been chasing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
