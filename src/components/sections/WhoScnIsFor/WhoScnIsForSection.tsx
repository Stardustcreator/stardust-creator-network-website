'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Brand-aligned from the start',
    description:
      "Every creator is checked for content quality and conduct before they're ever recommended to you. We find creators who get your brand seen and remembered.",
  },
  {
    title: 'Your yes unlocks their payday',
    description:
      'Creators receive their final payment only after the work is approved. This ensures you get satisfactory value for your investment.',
  },
  {
    title: 'Your team, freed up',
    description:
      'We handle contracts, payments and settlement. Your people stay on strategy, aiding their focus and productivity on what matters most.',
  },
  {
    title: 'Doors already open',
    description:
      'Our creators know, trust, and have an existing relationship with us, so things move faster.',
  },
];

export default function FindCreatorsSection() {
  return (
    <section className="relative w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-20">
        {/* =========================================
            SECTION HEADING
        ========================================= */}
        <div className="mx-auto max-w-[850px] pt-16 text-center sm:pt-20 lg:pt-24">
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
              duration: 0.8,
              ease: 'easeOut',
            }}
            style={{
              fontFamily: 'var(--font-instrument-sans)',
              fontWeight: 600,
              fontStyle: 'normal',
              fontSize: '40px',
              lineHeight: '48px',
              letterSpacing: '-1.5px',
              textAlign: 'center',
            }}
            className="text-[#242424]"
          >
            Why brands stop searching once they find us.
          </motion.h2>

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
              delay: 0.15,
              ease: 'easeOut',
            }}
            className="mx-auto mt-6 max-w-[760px] text-[#777777]"
            style={{
              fontFamily: 'var(--font-lato)',
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              lineHeight: '1.5',
            }}
          >
            Whether it’s creator sourcing or end-to-end campaign management, we’ve got you covered.
          </motion.p>
        </div>

        {/* =========================================
            VETTED CREATORS
        ========================================= */}
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
            duration: 0.8,
            ease: 'easeOut',
          }}
          className="
            relative
            mt-12
            overflow-hidden
            rounded-[20px]
            bg-[#F0EAFB]
            sm:mt-14
            lg:mt-16
          "
          style={{
            minHeight: '144px',
          }}
        >
          {/* =========================================
              TEXT
          ========================================= */}
          <motion.div
            initial={{
              opacity: 0,
              x: -25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: 'easeOut',
            }}
            className="
              relative
              z-10
              flex
              min-h-[144px]
              items-center
              px-8
              py-8
              sm:px-10
              lg:px-12
            "
          >
            <div className="max-w-[570px]">
              <h3
                className="text-[#161616]"
                style={{
                  fontFamily: 'var(--font-instrument-sans)',
                  fontSize: '24px',
                  fontWeight: 600,
                  lineHeight: '1.2',
                  letterSpacing: '-0.5px',
                }}
              >
                Creators who've done the homework
              </h3>

              <p
                className="mt-3 max-w-[600px] text-[#777777]"
                style={{
                  fontFamily: 'var(--font-lato)',
                  fontSize: '16px',
                  lineHeight: '1.55',
                }}
              >
                Our live business clinics teach briefs, deadlines and professionalism. It shows up
                in your campaign.
              </p>
            </div>
          </motion.div>

          {/* =========================================
              DESKTOP CREATOR CARDS
          ========================================= */}
          <div
            className="
              absolute
              right-[30px]
              top-1/2
              hidden
              -translate-y-1/2
              lg:block
            "
            style={{
              width: '570px',
              height: '100px',
            }}
          >
            {/* Aisha */}
            <motion.div
              className="absolute"
              initial={{
                opacity: 0,
                x: -40,
                y: 25,
                rotate: -8,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 12,
                rotate: -8,
              }}
              animate={{
                y: [12, 7, 12],
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                opacity: {
                  duration: 0.6,
                  delay: 0.15,
                },
                x: {
                  duration: 0.7,
                  delay: 0.15,
                  ease: 'easeOut',
                },
                y: {
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                },
                rotate: {
                  duration: 0.7,
                  delay: 0.15,
                },
              }}
              style={{
                left: '0px',
                top: '12px',
                width: '165px',
                transformOrigin: 'center center',
              }}
            >
              <Image
                src="/creators/Aisha K..webp"
                alt="Aisha"
                width={165}
                height={62}
                priority
                unoptimized
                className="block h-auto w-full"
              />
            </motion.div>

            {/* Chiamaka */}
            <motion.div
              className="absolute"
              initial={{
                opacity: 0,
                y: 35,
                scale: 0.9,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              animate={{
                y: [0, -6, 0],
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                opacity: {
                  duration: 0.6,
                  delay: 0.3,
                },
                scale: {
                  duration: 0.6,
                  delay: 0.3,
                  ease: 'easeOut',
                },
                y: {
                  duration: 3.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.2,
                },
              }}
              style={{
                left: '175px',
                top: '8px',
                width: '165px',
                transformOrigin: 'center center',
              }}
            >
              <Image
                src="/creators/Chiamaka O..webp"
                alt="Chiamaka"
                width={165}
                height={62}
                priority
                unoptimized
                className="block h-auto w-full"
              />
            </motion.div>

            {/* Tobi */}
            <motion.div
              className="absolute"
              initial={{
                opacity: 0,
                x: 40,
                y: 25,
                rotate: 7,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 12,
                rotate: 7,
              }}
              animate={{
                y: [12, 6, 12],
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                opacity: {
                  duration: 0.6,
                  delay: 0.45,
                },
                x: {
                  duration: 0.7,
                  delay: 0.45,
                  ease: 'easeOut',
                },
                rotate: {
                  duration: 0.7,
                  delay: 0.45,
                },
                y: {
                  duration: 3.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.4,
                },
              }}
              style={{
                left: '355px',
                top: '12px',
                width: '165px',
                transformOrigin: 'center center',
              }}
            >
              <Image
                src="/creators/Tobi B..webp"
                alt="Tobi"
                width={165}
                height={62}
                priority
                unoptimized
                className="block h-auto w-full"
              />
            </motion.div>
          </div>

          {/* =========================================
              MOBILE CREATOR CARDS
          ========================================= */}
          <div className="relative z-20 flex items-center justify-center gap-3 px-6 pb-7 lg:hidden">
            {/* Aisha */}
            <motion.div
              initial={{
                opacity: 0,
                x: -30,
                rotate: -8,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                rotate: -8,
              }}
              animate={{
                y: [0, -5, 0],
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                opacity: {
                  duration: 0.6,
                  delay: 0.1,
                },
                x: {
                  duration: 0.6,
                  delay: 0.1,
                },
                y: {
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                },
              }}
              style={{
                width: '125px',
                transformOrigin: 'center center',
              }}
            >
              <Image
                src="/creators/Aisha K..webp"
                alt="Aisha"
                width={165}
                height={62}
                priority
                unoptimized
                className="block h-auto w-full"
              />
            </motion.div>

            {/* Chiamaka */}
            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              animate={{
                y: [0, -5, 0],
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                opacity: {
                  duration: 0.6,
                  delay: 0.25,
                },
                y: {
                  duration: 3.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.2,
                },
              }}
              style={{
                width: '125px',
                transformOrigin: 'center center',
              }}
            >
              <Image
                src="/creators/Chiamaka O..webp"
                alt="Chiamaka"
                width={165}
                height={62}
                priority
                unoptimized
                className="block h-auto w-full"
              />
            </motion.div>

            {/* Tobi */}
            <motion.div
              initial={{
                opacity: 0,
                x: 30,
                rotate: 7,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                rotate: 7,
              }}
              animate={{
                y: [0, -5, 0],
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                opacity: {
                  duration: 0.6,
                  delay: 0.4,
                },
                x: {
                  duration: 0.6,
                  delay: 0.4,
                },
                y: {
                  duration: 3.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.4,
                },
              }}
              style={{
                width: '125px',
                transformOrigin: 'center center',
              }}
            >
              <Image
                src="/creators/Tobi B..webp"
                alt="Tobi"
                width={165}
                height={62}
                priority
                unoptimized
                className="block h-auto w-full"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* =========================================
            FEATURE CARDS
        ========================================= */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{
                opacity: 0,
                y: 35,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              whileHover={{
                y: -5,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              className="
                min-h-[145px]
                rounded-[20px]
                border
                border-[#E9DDFB]
                bg-white
                px-7
                py-7
                transition-shadow
                duration-300
                hover:shadow-lg
                sm:px-8
                sm:py-8
              "
            >
              <motion.h3
                initial={{
                  opacity: 0,
                  x: -15,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + index * 0.1,
                }}
                className="text-[#170038]"
                style={{
                  fontFamily: 'var(--font-instrument-sans)',
                  fontSize: '22px',
                  fontWeight: 600,
                  lineHeight: '1.25',
                  letterSpacing: '-0.4px',
                }}
              >
                {feature.title}
              </motion.h3>

              <motion.p
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
                  delay: 0.25 + index * 0.1,
                }}
                className="mt-3 text-[#777777]"
                style={{
                  fontFamily: 'var(--font-lato)',
                  fontSize: '16px',
                  lineHeight: '1.55',
                }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
