'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const heroImages = [
  '/who we are/Frame 1.png',
  '/who we are/Frame 2.png',
  '/who we are/Frame 3.png',
  '/who we are/Frame 4.png',
  '/who we are/Frame 5.png',
  '/who we are/Frame 6.png',
];

const leftColumnImages = [heroImages[0], heroImages[2], heroImages[4]];

const rightColumnImages = [heroImages[1], heroImages[3], heroImages[5]];

/* =========================================================
   VERTICAL IMAGE COLUMN
========================================================= */

function VerticalImageColumn({
  images,
  direction = 'up',
}: {
  images: string[];
  direction?: 'up' | 'down';
}) {
  const duplicatedImages = [...images, ...images];

  return (
    <div className="relative h-[760px] w-full overflow-hidden">
      {/*
        pb-[10px] matches the gap, so the track is exactly two identical
        sets tall and -50% lands precisely on the duplicate set. Keyframes
        use plain percentages: Framer Motion cannot interpolate between '0%'
        and a calc() value, which froze the upward column.
      */}
      <motion.div
        className="flex w-full flex-col gap-[10px] pb-[10px]"
        initial={{
          y: direction === 'down' ? '-50%' : '0%',
        }}
        animate={{
          y: direction === 'down' ? ['-50%', '0%'] : ['0%', '-50%'],
        }}
        transition={{
          duration: 35,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        {duplicatedImages.map((image, index) => (
          <motion.div
            key={`${image}-${index}`}
            className="
              relative
              h-[245px]
              w-full
              shrink-0
              overflow-hidden
              rounded-[24px]
              bg-transparent
            "
            whileHover={{
              scale: 1.015,
              transition: {
                duration: 0.25,
                ease: 'easeOut',
              },
            }}
          >
            <Image
              src={image}
              alt="Creator"
              fill
              sizes="269px"
              className="object-cover"
              priority={index < 3}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: `
          linear-gradient(
            180deg,
            #E3D7FB 0%,
            #DCC9F9 18%,
            #D5BEF8 32%,
            #C9A7F5 55%,
            #C08FF3 76%,
            #BA7CF1 100%
          )
        `,
      }}
    >
      {/* =====================================================
          DESKTOP HERO
      ====================================================== */}

      <div
        className="
          relative
          mx-auto
          hidden
          min-h-[795px]
          w-full
          max-w-[1440px]
          lg:block
        "
      >
        {/* ===================================================
            LEFT CONTENT
        ==================================================== */}

        <motion.div
          className="
            absolute
            left-[52px]
            top-[243px]
            z-20
            w-[680px]
          "
          initial={{
            opacity: 0,
            x: -35,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
          }}
        >
          {/* =================================================
              HEADING
          ================================================== */}

          <motion.h1
            className="
              max-w-[650px]
              font-[var(--font-bricolage-grotesque)]
              text-[56px]
              font-semibold
              leading-[1.25]
              tracking-[-2.8px]
              text-[#262626]
            "
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: 'easeOut',
            }}
          >
            The right creators. Your campaign. Managed end to end.
          </motion.h1>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <motion.p
            className="
              mt-[16px]
              max-w-[680px]
              font-[var(--font-lato)]
              text-[18px]
              font-normal
              leading-[28px]
              tracking-[-0.2px]
              text-[#262626]
            "
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.35,
              ease: 'easeOut',
            }}
          >
            Access thousands of vetted and trusted creators across niches, tiers and locations. SCN
            manages the entire process, from creator matching to campaign execution and performance
            reporting.
          </motion.p>

          {/* =================================================
              CTA BUTTONS
          ================================================== */}

          <motion.div
            className="mt-[24px] flex items-center gap-[16px]"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: 'easeOut',
            }}
          >
            {/* START A CAMPAIGN */}

            <Link
              href="https://www.stardustcreatornetwork.com/signin"
              className="
                inline-flex
                h-[48px]
                items-center
                justify-center
                gap-[10px]
                rounded-[8px]
                bg-[#57058B]
                px-[24px]
                font-[var(--font-lato)]
                text-[14px]
                font-medium
                leading-[20px]
                text-white
                transition-all
                duration-200
                hover:scale-[1.02]
                hover:opacity-90
              "
            >
              <span>Start a Campaign Brief</span>

              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M5 12H19"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                <path
                  d="M13 6L19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            {/* BECOME A CREATOR */}

            <Link
              href="/for-creators"
              className="
                inline-flex
                h-[48px]
                items-center
                justify-center
                rounded-[8px]
                border
                border-[#E2E8F0]
                bg-white
                px-[24px]
                font-[var(--font-lato)]
                text-[14px]
                font-medium
                leading-[20px]
                text-[#262626]
                transition-all
                duration-200
                hover:scale-[1.02]
                hover:bg-[#F8F8F8]
              "
            >
              Become a Creator
            </Link>
          </motion.div>
        </motion.div>

        {/* ===================================================
            RIGHT IMAGE AREA
            TWO VERTICAL LOOPING COLUMNS
        ==================================================== */}

        <div
          className="
            absolute
            right-[61px]
            top-[85px]
            z-10
            grid
            w-[554px]
            grid-cols-2
            gap-[10px]
          "
        >
          {/* LEFT COLUMN
              Frame 1 → 3 → 5
              Moves upward */}

          <VerticalImageColumn
            images={leftColumnImages}
            direction="up"
          />

          {/* RIGHT COLUMN
              Frame 2 → 4 → 6
              Moves downward */}

          <VerticalImageColumn
            images={rightColumnImages}
            direction="down"
          />
        </div>
      </div>

      {/* =====================================================
          MOBILE / TABLET HERO
      ====================================================== */}

      <div
        className="
          block
          px-6
          pb-16
          pt-28
          lg:hidden
        "
      >
        {/* =================================================
            MOBILE HEADING
        ================================================== */}

        <motion.h1
          className="
            max-w-[700px]
            font-[var(--font-bricolage-grotesque)]
            text-[42px]
            font-semibold
            leading-[1.15]
            tracking-[-2px]
            text-[#262626]
            sm:text-[48px]
          "
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          The right creators. Your campaign. Managed end to end.
        </motion.h1>

        {/* =================================================
            MOBILE DESCRIPTION
        ================================================== */}

        <motion.p
          className="
            mt-5
            max-w-[680px]
            font-[var(--font-lato)]
            text-[16px]
            leading-[25px]
            text-[#262626]
          "
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.25,
          }}
        >
          Access thousands of vetted and trusted creators across niches, tiers and locations. SCN
          manages the entire process, from creator matching to campaign execution and performance
          reporting.
        </motion.p>

        {/* =================================================
            MOBILE CTA BUTTONS
        ================================================== */}

        <motion.div
          className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.4,
          }}
        >
          {/* PRIMARY */}

          <Link
            href="https://www.stardustcreatornetwork.com/signin"
            className="
              flex
              h-[48px]
              w-full
              items-center
              justify-center
              gap-2
              rounded-[8px]
              bg-[#57058B]
              px-5
              sm:inline-flex
              sm:w-auto
              font-[var(--font-lato)]
              text-[14px]
              font-medium
              text-white
              transition-all
              duration-200
              hover:scale-[1.02]
              hover:opacity-90
            "
          >
            <span>Start a Campaign Brief</span>

            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M5 12H19"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />

              <path
                d="M13 6L19 12L13 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          {/* SECONDARY */}

          <Link
            href="/for-creators"
            className="
              flex
              h-[48px]
              w-full
              items-center
              justify-center
              rounded-[8px]
              border
              border-[#E2E8F0]
              bg-white
              px-5
              sm:inline-flex
              sm:w-auto
              font-[var(--font-lato)]
              text-[14px]
              font-medium
              text-[#262626]
              transition-all
              duration-200
              hover:scale-[1.02]
              hover:bg-[#F8F8F8]
            "
          >
            Become a Creator
          </Link>
        </motion.div>

        {/* =================================================
            MOBILE IMAGE LOOP
            Two horizontal rows that scroll together (same speed,
            same direction) so the section stays short on phones.
            Each row repeats its images 4 times: -50% moves exactly
            two copies, so the loop is seamless and always wider than
            the screen up to the lg breakpoint.
        ================================================== */}

        <div className="relative -mx-6 mt-10 flex flex-col gap-3 overflow-hidden">
          {[leftColumnImages, rightColumnImages].map((rowImages, row) => (
            <div
              key={`mobile-row-${row}`}
              className="overflow-hidden"
            >
              <motion.div
                className="flex w-max gap-3 pr-3"
                initial={{
                  x: '0%',
                }}
                animate={{
                  x: ['0%', '-50%'],
                }}
                transition={{
                  duration: 40,
                  ease: 'linear',
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              >
                {Array.from({ length: 4 }, () => rowImages)
                  .flat()
                  .map((image, index) => (
                    <div
                      key={`${image}-mobile-${row}-${index}`}
                      className="
                        relative
                        h-[170px]
                        w-[150px]
                        shrink-0
                        overflow-hidden
                        rounded-[16px]
                        bg-transparent
                      "
                    >
                      <Image
                        src={image}
                        alt="Creator"
                        fill
                        sizes="150px"
                        className="object-cover"
                        priority={row === 0 && index < 3}
                      />
                    </div>
                  ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
