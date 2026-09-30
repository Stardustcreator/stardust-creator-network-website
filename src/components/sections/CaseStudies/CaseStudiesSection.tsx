'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, type Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const caseStudies = [
  {
    title: 'HONEYWELL RELAUNCH',
    logo: '/brand logos/honeywell.webp',
    logoAlt: 'Honeywell',
    logoBackground: '#F5F5F5',
    description:
      'A comprehensive relaunch campaign that connected Honeywell with top creators to drive brand awareness and engagement.',
    metrics: [
      { value: '70m', label: 'Total Impression' },
      { value: '26m+', label: 'Reach' },
      { value: '5m+', label: 'Total Engagement' },
      { value: '7.2%', label: 'Engagement rate' },
    ],
    tags: ['Technology', 'Relaunch', 'Brand Awareness'],
    link: '/case-studies/honeywell',
  },
  {
    title: 'LEADWAY TRAVEL INSURANCE CAMPAIGN',
    logo: '/brand logos/original leadway.webp',
    logoAlt: 'Leadway',
    logoBackground: '#2D2D2D',
    description:
      'A strategic travel insurance campaign that educated young Nigerians traveling abroad about travel insurance while positioning Leadway as the accessible, trusted choice for protection.',
    metrics: [
      { value: '93k+', label: 'Views' },
      { value: '18.3k+', label: 'Likes' },
      { value: '500+', label: 'Comments' },
      { value: '344', label: 'Saves' },
    ],
    tags: ['Technology', 'Relaunch', 'Brand Awareness'],
    link: '/case-studies/leadway',
  },
  {
    title: 'AXA MANSARD AUTOFLEX',
    logo: '/brand logos/image.webp',
    logoAlt: 'AXA Mansard',
    logoBackground: '#F5F5F5',
    description:
      'A comprehensive motor insurance campaign aimed at providing flexibility to vehicle owners who are price sensitive but still need comprehensive insurance coverage.',
    metrics: [
      { value: '68%', label: 'Impression' },
      { value: '18.3k+', label: 'CPA' },
      { value: '6.1x', label: 'ROAS' },
    ],
    tags: ['Technology', 'Relaunch', 'Brand Awareness'],
    link: '/case-studies/axa',
  },
];

/* =========================================================
   CARD ANIMATION
========================================================= */

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),

  hover: {
    y: -8,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

/* =========================================================
   ANIMATED METRIC
========================================================= */

function AnimatedMetric({ value }: { value: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    /*
      Extract:

      70m   -> 70 + m
      26m+  -> 26 + m+
      7.2%  -> 7.2 + %
      6.1x  -> 6.1 + x
    */

    const match = value.match(/^([\d.]+)(.*)$/);

    if (!match) {
      setDisplayValue(value);
      return;
    }

    const target = parseFloat(match[1]);
    const suffix = match[2];

    const duration = 1400;
    const startTime = performance.now();

    let animationFrame: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      /*
        Ease-out animation.
        Starts quickly and slows down naturally.
      */
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = target * easedProgress;

      let formattedValue: string;

      /*
        Keep decimals when the original value has decimals.
      */
      if (String(target).includes('.')) {
        formattedValue = currentValue.toFixed(1);
      } else {
        formattedValue = Math.floor(currentValue).toString();
      }

      setDisplayValue(`${formattedValue}${suffix}`);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isInView, value]);

  return (
    <motion.p
      ref={ref}
      className="font-bricolage-grotesque text-lg font-bold text-black"
      initial={{
        opacity: 0,
        y: 8,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.5,
      }}
      transition={{
        duration: 0.4,
        delay: 0.15,
      }}
    >
      {displayValue}
    </motion.p>
  );
}

/* =========================================================
   MAIN SECTION
========================================================= */

export default function CaseStudySection() {
  return (
    <section className="w-full overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-16 md:py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-12 text-center md:mb-16">
          <motion.h2
            className="
              font-bricolage-grotesque
              mb-3
              text-2xl
              font-bold
              leading-tight
              text-black
              sm:text-3xl
              md:text-4xl
              lg:text-5xl
            "
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
          >
            Brands who've already found their match
          </motion.h2>

          <motion.p
            className="
              font-lato
              text-sm
              text-gray-600
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
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            A look at the campaigns we've run and the numbers behind them.
          </motion.p>
        </div>

        {/* =====================================================
            CASE STUDY CARDS
        ===================================================== */}

        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              className="
                flex
                h-full
                flex-col
                rounded-[12px]
                border
                border-[#E7E5E4]
                bg-[#FAFAF9]
                p-6
              "
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{
                once: true,
                amount: 0.2,
              }}
            >
              {/* =================================================
                  TITLE
              ================================================= */}

              <motion.h3
                className="
                  font-bricolage-grotesque
                  mb-4
                  text-sm
                  font-bold
                  tracking-wide
                  text-black
                  sm:text-base
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
                  delay: index * 0.1 + 0.15,
                }}
              >
                {study.title}
              </motion.h3>

              {/* =================================================
                  LOGO
              ================================================= */}

              <motion.div
                className="mb-6 flex h-24 items-center"
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1 + 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div
                  className="relative flex h-20 w-20 items-center justify-center overflow-hidden"
                  style={{
                    backgroundColor: study.logoBackground,
                    borderRadius: '8px',
                  }}
                >
                  <Image
                    src={study.logo}
                    alt={study.logoAlt}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </motion.div>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <motion.p
                className="
                  font-lato
                  mb-6
                  text-xs
                  leading-relaxed
                  text-gray-600
                  sm:text-sm
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
                  delay: index * 0.1 + 0.25,
                }}
              >
                {study.description}
              </motion.p>

              {/* =================================================
                  RESULTS HEADING
              ================================================= */}

              <motion.h4
                className="
                  mb-4
                  text-xs
                  font-bold
                  tracking-widest
                  text-gray-500
                "
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.1 + 0.3,
                }}
              >
                MONTHLY INTERACTIONS RESULTS
              </motion.h4>

              {/* =================================================
                  METRICS
              ================================================= */}

              <div className="mb-6 grid flex-grow grid-cols-2 gap-x-4 gap-y-6">
                {study.metrics.map((metric, metricIndex) => (
                  <motion.div
                    key={metric.label}
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
                      amount: 0.5,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.1 + 0.35 + metricIndex * 0.08,
                    }}
                  >
                    <p className="font-lato mb-1 text-sm text-gray-500">{metric.label}</p>

                    {/* Animated Number */}
                    <AnimatedMetric value={metric.value} />
                  </motion.div>
                ))}
              </div>

              {/* =================================================
                  TAGS
              ================================================= */}

              <motion.div
                className="mb-6 flex flex-wrap gap-2"
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
                  delay: index * 0.1 + 0.55,
                }}
              >
                {study.tags.map(tag => (
                  <span
                    key={tag}
                    className="
                      font-lato
                      rounded-full
                      bg-gray-100
                      px-2.5
                      py-1
                      text-xs
                      text-gray-600
                    "
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* =================================================
                  VIEW CASE STUDY
              ================================================= */}

              <Link
                href={study.link}
                className="mt-auto block w-full"
              >
                <motion.div
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="
                    w-full
                    rounded
                    bg-[#F1F5F9]
                    px-6
                    py-2.5
                    text-center
                    text-xs
                    font-medium
                    text-[#262626]
                    transition-colors
                    duration-200
                    hover:bg-[#E8EDF3]
                    sm:text-sm
                  "
                >
                  View Case Study
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* =====================================================
            SEE MORE
        ===================================================== */}

        <div className="flex justify-center">
          <Link href="/case-studies">
            <motion.div
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                duration: 0.2,
              }}
              className="
                rounded-lg
                bg-[#57058B]
                px-6
                py-2
                text-sm
                font-semibold
                text-white
                transition-opacity
                duration-200
                hover:opacity-90
                md:px-8
                md:py-3
                md:text-base
              "
            >
              See more
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}
