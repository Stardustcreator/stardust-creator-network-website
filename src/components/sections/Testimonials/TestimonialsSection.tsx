'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TestimonialsSection() {
  const googleDriveImage =
    'https://drive.google.com/thumbnail?id=1fDisDYT2KiZqdZNKGkjDuiLWR9dFc5JA&sz=w1600';

  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden bg-white"
    >
      <div
        className="
          mx-auto
          flex
          w-full
          max-w-[1440px]
          flex-col
          gap-[40px]
          px-6
          py-16
          sm:px-8
          lg:px-[80px]
        "
      >
        {/* =========================
            HEADER / COPY
        ========================== */}
        <div className="flex w-full flex-col items-start gap-[20px]">
          {/* Heading */}
          <motion.h2
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
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              w-full
              max-w-[760px]
              text-[32px]
              font-semibold
              leading-[40px]
              tracking-[-1.2px]
              text-[#262626]
              sm:text-[36px]
              sm:leading-[44px]
              sm:tracking-[-1.4px]
              lg:text-[40px]
              lg:leading-[48px]
              lg:tracking-[-1.5px]
            "
            style={{
              fontFamily: 'var(--font-instrument-sans)',
            }}
          >
            People buy from people they trust.
          </motion.h2>

          {/* Description */}
          <motion.p
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
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              w-full
              text-[17px]
              leading-[26px]
              tracking-[-0.2px]
              text-[#737373]
              sm:text-[18px]
              sm:leading-[27px]
              lg:text-[20px]
              lg:leading-[28px]
              lg:tracking-[-0.4px]
            "
            style={{
              fontFamily: 'var(--font-lato)',
            }}
          >
            Your customers take recommendations from creators they follow every day. We make sure
            those recommendations are about you.
          </motion.p>

          {/* Bold Statement */}
          <motion.p
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
              delay: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              w-full
              max-w-[680px]
              text-[16px]
              font-bold
              leading-[24px]
              text-[#262626]
              sm:text-[17px]
              lg:text-[18px]
              lg:leading-[27px]
            "
            style={{
              fontFamily: 'var(--font-lato)',
            }}
          >
            This isn't a trend to plan around. It's already how your customers decide.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.98,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="pt-1"
          >
            <Link
              href="/signin"
              className="
                group
                inline-flex
                h-[48px]
                items-center
                justify-center
                gap-[6px]
                rounded-[8px]
                bg-[#57058B]
                px-[24px]
                py-[12px]
                text-[16px]
                font-medium
                leading-[24px]
                tracking-[-0.2px]
                text-white
                transition-all
                duration-300
                hover:opacity-90
                hover:shadow-[0_8px_25px_rgba(87,5,139,0.25)]
              "
              style={{
                fontFamily: 'var(--font-lato)',
              }}
            >
              <span>Start a Campaign</span>

              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                whileHover={{
                  x: 4,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <path
                  d="M5 12H19M19 12L13 6M19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </Link>
          </motion.div>
        </div>

        {/* =========================
            CREATOR VIDEO / TESTIMONIAL
        ========================== */}
        <motion.div
          initial={{
            opacity: 0,
            y: 45,
            scale: 0.98,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.85,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            flex
            w-full
            flex-col
            overflow-hidden
            rounded-[16px]
            bg-white
            lg:h-[420px]
            lg:flex-row
          "
        >
          {/* =========================
              GOOGLE DRIVE IMAGE
          ========================== */}
          <motion.div
            className="
              relative
              h-[300px]
              w-full
              overflow-hidden
              sm:h-[380px]
              lg:h-[420px]
              lg:flex-1
            "
            whileHover={{
              scale: 1.01,
            }}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
            }}
          >
            <img
              src={googleDriveImage}
              alt="Helen, UGC creator"
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* =========================
              PURPLE TESTIMONIAL PANEL
          ========================== */}
          <motion.div
            initial={{
              opacity: 0,
              x: 35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.75,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              flex
              min-h-[360px]
              w-full
              flex-col
              justify-center
              gap-[18px]
              overflow-hidden
              bg-[#A51CFF]
              p-[32px]
              sm:p-[40px]
              lg:h-[420px]
              lg:flex-1
              lg:p-[48px]
            "
          >
            {/* =========================
                QUOTE
            ========================== */}
            <motion.p
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
                duration: 0.7,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                w-full
                text-[21px]
                font-medium
                leading-[29px]
                tracking-[-0.3px]
                text-white
                sm:text-[23px]
                sm:leading-[31px]
                lg:text-[24px]
                lg:leading-[32px]
                lg:tracking-[-0.4px]
              "
              style={{
                fontFamily: 'var(--font-instrument-sans)',
              }}
            >
              “Send in your brief to SCN, tell them about your campaign and they’ll take it from
              there.”
            </motion.p>

            {/* =========================
                CREATOR DETAILS
            ========================== */}
            <div className="flex w-full flex-col items-start gap-[2px]">
              {/* Helen */}
              <motion.p
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
                  duration: 0.55,
                  delay: 0.52,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  text-[16px]
                  font-semibold
                  leading-[24px]
                  tracking-[-0.2px]
                  text-white
                "
                style={{
                  fontFamily: 'var(--font-lato)',
                }}
              >
                Helen.
              </motion.p>

              {/* UGC creator */}
              <motion.p
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
                  duration: 0.55,
                  delay: 0.62,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  text-[14px]
                  font-normal
                  leading-[20px]
                  text-white/80
                "
                style={{
                  fontFamily: 'var(--font-lato)',
                }}
              >
                UGC creator.
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
