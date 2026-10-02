'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'What is Stardust Creator Network?',
    answer:
      "SCN is Africa's creator marketplace. Brands submit campaign briefs and get matched to vetted creators who are the right fit for their campaign. Creators get access to brand deals, a rate calculator, a UGC storefront, an audience builder, and a live creator community. We are the infrastructure that connects both sides of the African creator economy.",
  },
  {
    question: 'Who can join SCN as a creator?',
    answer:
      'SCN is for nano, micro, and mid-tier creators in food, beauty, lifestyle, tech, and finance who want to monetize their content through brand deals. You do not need a huge following. You need the right positioning, the right tools, and access to the right campaigns. SCN gives you all three.',
  },
  {
    question: 'How does the brand matching process work?',
    answer:
      'Brands submit a campaign brief through SCN. Our team reviews it, handpicks creators from our vetted pool who fit the niche, audience, and campaign objectives, and presents the brand with a shortlist to approve. Once approved, SCN manages the campaign from briefing through to final delivery and settlement.',
  },
  {
    question: 'How do I know what to charge brands?',
    answer:
      'The SCN rate calculator factors in your deliverables, usage rights, exclusivity, platform scope, and niche so you always have a rate you can justify and negotiate from. It is available to every creator on the platform.',
  },
  {
    question: 'Can I get brand deals with a small following?',
    answer:
      'Yes. Brands on SCN are actively looking for nano and micro creators. What matters most is your niche, your content quality, and how well your audience aligns with the brand’s campaign goals. If your positioning is right and your profile is complete, you will be considered for campaigns that match your category.',
  },
  {
    question: 'How much does SCN cost for creators?',
    answer:
      'SCN has a free Starter plan and a paid Builder plan. The Starter plan gives you access to the rate calculator, storefront, and community. The Builder plan unlocks advanced features. Full pricing details are available under Creator OS.',
  },
  {
    question: 'Is SCN only for Nigerian creators?',
    answer:
      'SCN is built for African creators, starting in Nigeria. Our tools, community, and brand connections reflect the realities of the African creator economy, not Western templates adapted to fit. We are expanding across the continent as we grow.',
  },
];

export default function FAQSection() {
  // All answers open by default to match the Figma design.
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>(faqs.map((_, index) => index));

  const toggleFAQ = (index: number) => {
    setExpandedIndexes(current =>
      current.includes(index) ? current.filter(item => item !== index) : [...current, index]
    );
  };

  return (
    <section className="w-full overflow-hidden bg-[#FAFAF9] px-6 py-16 sm:px-8 sm:py-20 md:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[760px]">
        {/* =====================================================
            HEADER
        ===================================================== */}
        <motion.div
          className="mb-12 text-center sm:mb-14 md:mb-16"
          initial={{
            opacity: 0,
            y: 35,
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
        >
          <motion.h2 className="font-bricolage-grotesque mb-2 text-3xl font-bold leading-tight tracking-[-0.03em] text-[#262626] sm:text-4xl md:text-[42px]">
            Frequently Asked Questions
          </motion.h2>

          <motion.p
            className="font-lato text-sm leading-relaxed text-[#737373] sm:text-[15px]"
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
              ease: 'easeOut',
            }}
          >
            Things most people want to know before they sign up.
          </motion.p>
        </motion.div>

        {/* =====================================================
            FAQ LIST
        ===================================================== */}
        <div className="w-full">
          {faqs.map((faq, index) => {
            const isExpanded = expandedIndexes.includes(index);

            return (
              <motion.div
                key={faq.question}
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
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="border-b border-[#E5E5E5]"
              >
                {/* =================================================
                    QUESTION
                ================================================= */}
                <motion.button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isExpanded}
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-6
                    py-5
                    text-left
                    sm:py-6
                  "
                  whileHover={{
                    x: 3,
                  }}
                  transition={{
                    duration: 0.25,
                    ease: 'easeOut',
                  }}
                >
                  <motion.span
                    className="
                      font-bricolage-grotesque
                      text-[13px]
                      font-medium
                      leading-relaxed
                      text-[#262626]
                      sm:text-sm
                    "
                    animate={{
                      x: isExpanded ? 2 : 0,
                    }}
                    transition={{
                      duration: 0.25,
                      ease: 'easeOut',
                    }}
                  >
                    {faq.question}
                  </motion.span>

                  {/* Chevron */}
                  <motion.span
                    className="
                      flex
                      h-5
                      w-5
                      flex-shrink-0
                      items-center
                      justify-center
                      rounded-full
                      text-[#262626]
                    "
                    animate={{
                      rotate: isExpanded ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 4.5L6 8L9.5 4.5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.span>
                </motion.button>

                {/* =================================================
                    ANSWER
                ================================================= */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="answer"
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        height: {
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        },
                        opacity: {
                          duration: 0.25,
                          ease: 'easeOut',
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: -8,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -5,
                        }}
                        transition={{
                          duration: 0.35,
                          delay: 0.05,
                          ease: 'easeOut',
                        }}
                        className="pb-6 pr-8"
                      >
                        <p
                          className="
                            font-lato
                            text-[11px]
                            leading-[1.7]
                            text-[#737373]
                            sm:text-xs
                            md:text-[12px]
                          "
                        >
                          {faq.answer}
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
