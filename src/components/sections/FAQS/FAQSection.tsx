'use client';

import { useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';

/* =========================================================
   FAQ  (Figma: SCN (For Uche) › Home › FAQ, node 801-11577)

   - Frame: full width, padding 64 top/bottom, Surface/Primary #FAFAF9
   - Header: Instrument Sans 600 32/44 -1.2px #262626,
     subheading Lato 16/24 #737373, 48px above the list
   - List: 720px wide, 12px between items, every item opened
   - Item: padding 16, question/answer gap 16, divider at the bottom
     Question H6 Lato 16/24 #1A002E · Answer H7 Lato 14/20 #737373
   Fonts come from the root layout (--font-instrument-sans, --font-lato).
========================================================= */

const faqs = [
  {
    question: 'What is Stardust Creator Network?',
    answer:
      "SCN is Africa's creator marketplace. Brands submit campaign briefs and get matched to vetted creators who are the right fit for their campaign. Creators get access to brand deals, a rate calculator, a UGC storefront, an audience builder, and a live creator community. We are the infrastructure that connects both sides of the African creator economy.",
  },
  {
    question: 'How much does a campaign cost?',
    answer:
      "It depends on your goals, creators and deliverables. You'll see a clear, all-in proposal before you commit.",
  },
  {
    question: 'How fast can we start a campaign?',
    answer: "Share your timeline in the brief and we'll build your shortlist around it.",
  },
  {
    question: 'How do you keep our brand safe?',
    answer:
      'Every creator is vetted for quality and conduct, and every piece of content is reviewed before it goes live.',
  },
  {
    question: 'Who owns the content?',
    answer:
      'Usage rights are agreed upfront, so you know exactly where and for how long you can run it.',
  },
  {
    question: 'Can we pick our own creators?',
    answer: 'Yes. Choose from your shortlist, or let us make the call.',
  },
  {
    question: 'Do we pay creators directly?',
    answer: 'No. One invoice to SCN covers every creator.',
  },
  {
    question: "I'm a creator. How do I join?",
    answer: 'Sign up free, complete your profile and get considered for briefs in your niche.',
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function ChevronDownIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FAQSection() {
  // Every item is shown opened in the design, so all start expanded.
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>(faqs.map((_, index) => index));

  const toggleFAQ = (index: number) => {
    setExpandedIndexes(current =>
      current.includes(index) ? current.filter(item => item !== index) : [...current, index]
    );
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="w-full bg-[#FAFAF9] px-5 py-16 sm:px-8"
        style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif" }}
      >
        <div className="mx-auto w-full max-w-[720px]">
          {/* =====================================================
              HEADER
          ===================================================== */}
          <motion.div
            className="mb-10 text-center sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h2
              className="text-[28px] font-semibold leading-[36px] tracking-[-1px] text-[#262626] sm:text-[32px] sm:leading-[44px] sm:tracking-[-1.2px]"
              style={{
                fontFamily: "var(--font-instrument-sans), 'Instrument Sans', sans-serif",
              }}
            >
              Frequently Asked Questions
            </h2>

            <p className="mt-1 text-[16px] font-medium leading-[24px] tracking-[-0.2px] text-[#737373] sm:mt-0">
              Things most people want to know before they sign up.
            </p>
          </motion.div>

          {/* =====================================================
              FAQ LIST
          ===================================================== */}
          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => {
              const isExpanded = expandedIndexes.includes(index);
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-button-${index}`;

              return (
                <motion.div
                  key={faq.question}
                  className="border-b border-[#E7E5E4]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
                >
                  {/* QUESTION */}
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isExpanded}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 rounded-[8px] p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A51CFF]"
                  >
                    <span className="text-[16px] font-medium leading-[24px] tracking-[-0.2px] text-[#1A002E]">
                      {faq.question}
                    </span>

                    <motion.span
                      className="flex h-5 w-5 shrink-0 items-center justify-center text-[#1A002E]"
                      // Figma's opened state shows the chevron pointing down,
                      // so closed items turn it to point right.
                      animate={{ rotate: isExpanded ? 0 : -90 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <ChevronDownIcon />
                    </motion.span>
                  </button>

                  {/* ANSWER */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="answer"
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.35, ease: EASE },
                          opacity: { duration: 0.25, ease: 'easeOut' },
                        }}
                      >
                        <p className="px-4 pb-4 text-[14px] font-normal leading-[20px] text-[#737373]">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
