'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Say what winning looks like',
    description: 'Your goal, audience, budget and timeline. Two minutes, tops.',
  },
  {
    number: '02',
    title: 'Meet your match',
    description: 'A vetted shortlist on your timeline, picked for fit, not just follower count.',
  },
  {
    number: '03',
    title: 'Approve what goes live',
    description:
      'Every piece is checked against your brief and sent to you for review before it posts.',
  },
  {
    number: '04',
    title: 'See what it achieved',
    description:
      'Track progress as it happens, then close with a report you can take straight to leadership.',
  },
];

/* =========================================================
   CARD ANIMATION
========================================================= */

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.97,
  },

  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: index * 0.12,
      ease: 'easeOut',
    },
  }),
};

export default function LiveCampaignSection() {
  return (
    <section
      className="w-full overflow-hidden px-4 sm:px-6 lg:px-8"
      style={{
        background: 'linear-gradient(135deg, #FF3E1C 0%, #AC2706 100%)',
      }}
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1440px]
          px-2
          py-16
          sm:px-4
          sm:py-20
          md:px-8
          md:py-16
          lg:px-12
          lg:py-16
        "
      >
        {/* =========================================
            HEADING
        ========================================= */}
        <motion.div
          className="mx-auto max-w-[760px] text-center"
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
          <motion.h2
            className="
              font-bricolage-grotesque
              text-3xl
              font-bold
              leading-[1.05]
              tracking-[-0.04em]
              text-white
              sm:text-4xl
              md:text-[42px]
              lg:text-[46px]
            "
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
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            You make four decisions.
            <br className="hidden sm:block" />
            We do everything else.
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="
              mx-auto
              mt-4
              max-w-[600px]
              font-lato
              text-sm
              leading-[1.5]
              text-white/90
              sm:text-base
            "
            initial={{
              opacity: 0,
              y: 20,
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
              duration: 0.65,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            One team carries your campaign from brief to results.
          </motion.p>
        </motion.div>

        {/* =========================================
            CARDS
        ========================================= */}
        <div
          className="
            mx-auto
            mt-10
            grid
            w-full
            max-w-[1200px]
            grid-cols-1
            gap-4
            sm:mt-12
            sm:gap-5
            md:grid-cols-2
            md:gap-4
            lg:gap-5
          "
        >
          {steps.map((step, index) => (
            <motion.article
              key={step.number}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              whileHover={{
                y: -6,
                transition: {
                  duration: 0.25,
                  ease: 'easeOut',
                },
              }}
              className="
                group
                flex
                min-h-[230px]
                flex-col
                rounded-[16px]
                bg-white
                p-6
                shadow-[0_0_0_rgba(0,0,0,0)]
                transition-shadow
                duration-300
                hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)]
                sm:min-h-[240px]
                sm:p-7
                md:p-8
                lg:min-h-[255px]
                lg:p-8
              "
            >
              {/* =====================================
                  NUMBER
              ====================================== */}
              <motion.div
                className="
                  font-bricolage-grotesque
                  text-[48px]
                  font-medium
                  leading-none
                  tracking-[-0.05em]
                  sm:text-[52px]
                  md:text-[56px]
                "
                style={{
                  color: '#EDE3FF',
                }}
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
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12 + 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {step.number}
              </motion.div>

              {/* =====================================
                  CARD CONTENT
              ====================================== */}
              <div className="mt-5">
                {/* Title */}
                <motion.h3
                  className="
                    font-bricolage-grotesque
                    text-base
                    font-bold
                    leading-tight
                    tracking-[-0.02em]
                    text-[#24152F]
                    sm:text-lg
                  "
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.12 + 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {step.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  className="
                    mt-3
                    max-w-[540px]
                    font-lato
                    text-xs
                    leading-[1.55]
                    text-[#737373]
                    sm:text-[13px]
                    md:text-sm
                  "
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.12 + 0.34,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {step.description}
                </motion.p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
