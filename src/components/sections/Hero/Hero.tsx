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
   DESKTOP HERO GEOMETRY

   The nav bar is fixed and floats over the hero: 16px top padding plus a
   68px bar, so it ends 84px from the top of the hero.

   At rest the image columns sit 48px below the nav bar and 48px above the
   bottom of the hero. Each column shows 3 images, so the image height is
   worked out from the hero height:

     84 (nav) + 48 + 3 images + 2 gaps of 10 + 48 = hero height

   The hero is 100% of the viewport height (never shorter than 640px so
   the text still fits on very short windows).
========================================================= */

const HERO_HEIGHT = 'max(100dvh, 640px)';
const NAV_BOTTOM = 84;
const EDGE_GAP = 48;
const IMAGE_GAP = 10;

// 84 + 48 + 48 + 2 x 10 = 200px of the hero is not image.
const IMAGE_HEIGHT = `calc((${HERO_HEIGHT} - ${NAV_BOTTOM + EDGE_GAP * 2 + IMAGE_GAP * 2}px) / 3)`;

// One set = 3 images + 3 gaps (the trailing gap keeps the loop seamless).
const SET_HEIGHT = `calc(${IMAGE_HEIGHT} * 3 + ${IMAGE_GAP * 3}px)`;

/* =========================================================
   VERTICAL IMAGE COLUMN (DESKTOP)

   The column runs the full height of the hero and is clipped only by the
   hero's own edges, so images enter and leave at the very top and bottom
   of the hero, passing behind the nav bar and through the 48px gaps.

   The track holds 4 identical sets. It is shifted up by one set so a set
   always fills the space above the first visible image. Moving it by
   exactly 25% (one set) then lands on an identical frame, so the loop is
   endless with no jump. Plain percentages only: Framer Motion cannot
   animate between '0%' and a calc() value.
========================================================= */

function VerticalImageColumn({
  images,
  direction = 'up',
}: {
  images: string[];
  direction?: 'up' | 'down';
}) {
  const repeatedImages = [...images, ...images, ...images, ...images];

  return (
    <div className="relative h-full w-full">
      <div
        style={{
          marginTop: `calc(${NAV_BOTTOM + EDGE_GAP}px - ${SET_HEIGHT})`,
        }}
      >
        <motion.div
          className="flex w-full flex-col"
          style={{
            gap: IMAGE_GAP,
            paddingBottom: IMAGE_GAP,
          }}
          initial={{
            y: direction === 'down' ? '-25%' : '0%',
          }}
          animate={{
            y: direction === 'down' ? ['-25%', '0%'] : ['0%', '-25%'],
          }}
          transition={{
            duration: 30,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
          }}
        >
          {repeatedImages.map((image, index) => (
            <motion.div
              key={`${image}-${index}`}
              className="relative w-full shrink-0 overflow-hidden rounded-[24px] bg-transparent"
              style={{ height: IMAGE_HEIGHT }}
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
                sizes="(min-width: 1440px) 272px, 19vw"
                className="object-cover"
                priority={index >= 3 && index < 6}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
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
          Full viewport height. Text is centred in the space below
          the nav bar; the image columns fill the right-hand side.
          Sizes scale with the screen between 1024px and 1440px so
          the text never runs into the images.
      ====================================================== */}

      <div
        className="relative mx-auto hidden w-full max-w-[1440px] lg:flex"
        style={{ height: HERO_HEIGHT }}
      >
        {/* ===================================================
            LEFT CONTENT
        ==================================================== */}

        <div
          className="
            flex
            min-w-0
            flex-1
            items-center
            pl-[clamp(32px,3.6vw,52px)]
            pr-[clamp(32px,4vw,64px)]
          "
          style={{ paddingTop: NAV_BOTTOM }}
        >
          <motion.div
            className="w-full max-w-[680px]"
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
                font-instrument-sans
                text-[clamp(40px,3.9vw,56px)]
                font-semibold
                leading-[1.25]
                tracking-[-0.05em]
                text-balance
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
                font-lato
                text-[clamp(16px,1.25vw,18px)]
                font-normal
                leading-[1.55]
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
              Access thousands of vetted and trusted creators across niches, tiers and locations.
              SCN manages the entire process, from creator matching to campaign execution and
              performance reporting.
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
                  font-lato
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
                  font-lato
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
        </div>

        {/* ===================================================
            RIGHT IMAGE AREA
            TWO VERTICAL LOOPING COLUMNS
        ==================================================== */}

        <div
          className="
            relative
            z-10
            grid
            h-full
            w-[clamp(420px,38.5vw,554px)]
            shrink-0
            grid-cols-2
            gap-[10px]
            mr-[clamp(24px,4.2vw,61px)]
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
            font-instrument-sans
            text-[clamp(34px,10vw,48px)]
            font-semibold
            leading-[1.15]
            tracking-[-0.045em]
            text-balance
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
            font-lato
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
              font-lato
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
              font-lato
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
