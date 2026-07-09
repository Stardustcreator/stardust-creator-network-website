'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const changes = [
  {
    before: 'Guessing your rates every deal',
    after: 'Confident, defensible pricing backed by data',
  },
  {
    before: 'Waiting for brands to DM you',
    after: 'Brands reach you through the SCN desk',
  },
  {
    before: 'Accepting vague, unpaid briefs',
    after: 'Structured contracts with clear deliverables',
  },
  {
    before: "Signing bad deals you can't undo",
    after: 'Professional invoicing, on-time payments',
  },
  {
    before: 'Relying on a single income stream',
    after: 'Multiple intentional revenue channels',
  },
];

const stopItems = [
  'Guessing your rates',
  'Waiting for brands to DM you',
  'Accepting vague briefs',
  'Signing bad contracts',
  'Relying on one income stream',
];

const startItems = [
  'Building predictable revenue',
  'Structuring recurring offers',
  'Designing monetization intentionally',
  'Thinking like a business',
];

export default function WhatChangesWhenYouJoinSection() {
  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.12,
      },
    }),
  };

  return (
    <section className="relative w-full py-16 sm:py-20 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Title */}
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-black"
            style={{
              fontFamily: 'var(--font-bricolage-grotesque)',
              letterSpacing: '-0.02em',
            }}
          >
            What Changes when you Join
          </h2>
        </motion.div>

        {/* ========== MOBILE LAYOUT (sm:hidden) ========== */}
        <div className="sm:hidden max-w-md mx-auto mb-12 space-y-6">
          {/* You Stop Section */}
          <motion.div
            className="rounded-2xl p-6 border"
            style={{
              backgroundColor: '#FEF2F2',
              borderColor: '#E2E8F0',
              borderWidth: '1px',
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={rowVariants}
          >
            <h3
              className="text-lg font-bold mb-4"
              style={{
                fontFamily: 'var(--font-bricolage-grotesque)',
                color: '#C10007',
              }}
            >
              You Stop
            </h3>
            <div className="space-y-3">
              {stopItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3"
                >
                  <svg
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="#C10007"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <p
                    className="text-sm leading-tight"
                    style={{
                      fontFamily: 'var(--font-lato)',
                      color: '#C10007',
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* And You Start Section */}
          <motion.div
            className="rounded-2xl p-6 border"
            style={{
              backgroundColor: '#F0FDF4',
              borderColor: '#E2E8F0',
              borderWidth: '1px',
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={rowVariants}
            custom={1}
          >
            <h3
              className="text-lg font-bold mb-4"
              style={{
                fontFamily: 'var(--font-bricolage-grotesque)',
                color: '#0D542B',
              }}
            >
              And You Start
            </h3>
            <div className="space-y-3">
              {startItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3"
                >
                  <svg
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="#0D542B"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p
                    className="text-sm leading-tight"
                    style={{
                      fontFamily: 'var(--font-lato)',
                      color: '#0D542B',
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ========== DESKTOP/TABLET LAYOUT (hidden sm:block) ========== */}
        <div className="hidden sm:block max-w-5xl mx-auto mb-12 sm:mb-16 md:mb-20 space-y-4 sm:space-y-6">
          {changes.map((change, index) => (
            <motion.div
              key={index}
              className="px-4 sm:px-8 py-6 sm:py-5 rounded-2xl border"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E7E5E4',
                borderWidth: '1px',
              }}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={rowVariants}
            >
              <div className="flex items-center gap-0">
                {/* Left - Before */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 border"
                    style={{
                      backgroundColor: 'rgba(251, 44, 54, 0.1)',
                      borderColor: 'rgba(251, 44, 54, 0.2)',
                      borderWidth: '1.5px',
                    }}
                  >
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4"
                      fill="none"
                      stroke="#FF6467"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <p
                    className="text-gray-700 text-sm leading-tight whitespace-nowrap"
                    style={{
                      fontFamily: 'var(--font-lato)',
                      textDecoration: 'line-through',
                    }}
                  >
                    {change.before}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex-1 flex items-center justify-center text-gray-400 text-base h-full">
                  →
                </div>

                {/* Right - After */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <p
                    className="text-gray-800 text-sm font-medium leading-tight whitespace-nowrap"
                    style={{
                      fontFamily: 'var(--font-lato)',
                    }}
                  >
                    {change.after}
                  </p>
                  <div
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 border"
                    style={{
                      backgroundColor: 'rgba(0, 188, 125, 0.1)',
                      borderColor: 'rgba(0, 188, 125, 0.2)',
                      borderWidth: '1.5px',
                    }}
                  >
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4"
                      fill="none"
                      stroke="#00D492"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Now Button */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all text-sm sm:text-base"
              style={{ backgroundColor: '#57058B', color: 'white' }}
            >
              <span style={{ fontFamily: 'var(--font-lato)' }}>Join now</span>
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
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
