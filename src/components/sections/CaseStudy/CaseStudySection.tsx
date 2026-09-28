'use client';

import React from 'react';

export default function CaseStudySection() {
  return (
    <section
      className="relative w-full"
      style={{
        backgroundColor: '#FAFAF9',
        minHeight: '400px',
      }}
    >
      <div className="mx-auto flex min-h-[400px] w-full max-w-7xl items-center justify-center px-6 py-16">
        <div className="text-center">
          <p
            className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-[#737373]"
            style={{
              fontFamily: 'var(--font-lato)',
            }}
          >
            Case Studies
          </p>

          <h2
            className="text-3xl font-semibold tracking-[-1px] text-[#262626] sm:text-4xl md:text-5xl"
            style={{
              fontFamily: 'var(--font-instrument-sans)',
            }}
          >
            Case studies coming soon
          </h2>

          <p
            className="mx-auto mt-4 max-w-xl text-base leading-6 text-[#737373]"
            style={{
              fontFamily: 'var(--font-lato)',
            }}
          >
            We are preparing the next case study section.
          </p>
        </div>
      </div>
    </section>
  );
}
