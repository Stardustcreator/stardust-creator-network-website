'use client';

import Link from 'next/link';

const changes = [
  {
    stop: 'Guessing your rates every deal',
    start: 'Confident, defensible pricing backed by data',
  },
  {
    stop: 'Waiting for brands to DM you',
    start: 'Brands reach you through the SCN desk',
  },
  {
    stop: 'Accepting vague, unpaid briefs',
    start: 'Structured contracts with clear deliverables',
  },
  {
    stop: "Signing bad deals you can't undo",
    start: 'Professional invoicing, on-time payments',
  },
  {
    stop: 'Relying on a single income stream',
    start: 'Multiple intentional revenue channels',
  },
];

export default function WhatHappensWhenYouJoinSection() {
  return (
    <section
      id="what-happens-when-you-join"
      className="relative py-16 md:py-24 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Main Heading */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-black text-3xl md:text-4xl lg:text-5xl font-bold">
            What Changes when you Join
          </h2>
        </div>

        {/* Changes List - Fixed Height Rows */}
        <div className="space-y-3 md:space-y-4 mb-16">
          {changes.map((item, index) => (
            <div
              key={index}
              className="flex items-center h-20 md:h-24 p-4 md:p-5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all"
            >
              {/* Left Column - Stop (with X icon) */}
              <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0 h-full">
                <span className="text-lg md:text-xl shrink-0">❌</span>
                <span className="text-gray-700 text-sm md:text-base font-medium line-through">
                  {item.stop}
                </span>
              </div>

              {/* Middle Column - Arrow (FIXED WIDTH, CENTERED) */}
              <div className="w-16 md:w-20 flex justify-center items-center h-full shrink-0">
                <span className="text-gray-400 text-xl md:text-2xl">→</span>
              </div>

              {/* Right Column - Start (with checkmark icon) */}
              <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0 h-full justify-end">
                <span className="text-gray-700 text-sm md:text-base font-medium">{item.start}</span>
                <span className="text-lg md:text-xl shrink-0">✅</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link href="/signin">
            <button
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#57058B' }}
            >
              Join now
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
        </div>
      </div>
    </section>
  );
}
