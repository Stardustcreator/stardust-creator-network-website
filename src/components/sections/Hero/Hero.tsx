'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
      <div className="relative mx-auto hidden min-h-[795px] w-full max-w-[1440px] lg:block">
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
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
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
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: 'easeOut',
            }}
          >
            Creators your customers already trust.
            <br />
            <span>
              <motion.span
                className="inline-block"
                animate={{
                  y: [0, -3, 0],
                  color: ['#262626', '#57058B', '#262626'],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  repeatDelay: 2.5,
                  ease: 'easeInOut',
                }}
              >
                Campaigns
              </motion.span>{' '}
              that actually move them.
            </span>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.35,
              ease: 'easeOut',
            }}
          >
            Skip the search, get memorable content from vetted creators and report that proves what
            it achieved. Whatever your goal, we handle everything in between.
          </motion.p>

          {/* =================================================
              CTA BUTTONS
          ================================================== */}
          <motion.div
            className="mt-[24px] flex items-center gap-[16px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: 'easeOut',
            }}
          >
            {/* =================================================
                START A CAMPAIGN
            ================================================== */}
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

            {/* =================================================
                BECOME A CREATOR
            ================================================== */}
            <Link
              href="https://www.stardustcreatornetwork.com/creator-os"
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
            RIGHT IMAGE GRID
        ==================================================== */}
        <div
          className="
            absolute
            right-[61px]
            top-[132px]
            z-10
            grid
            w-[554px]
            grid-cols-2
            gap-[16px]
          "
        >
          {/* =================================================
              FRAME 2
          ================================================== */}
          <motion.div
            className="
              relative
              h-[299px]
              w-[269px]
              overflow-hidden
              rounded-[24px]
            "
            initial={{
              opacity: 0,
              y: -30,
            }}
            animate={{
              opacity: 1,
              y: [0, -7, 0, 7, 0],
            }}
            transition={{
              opacity: {
                duration: 0.8,
                delay: 0.25,
              },
              y: {
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.2,
              },
            }}
            whileHover={{
              scale: 1.02,
              transition: {
                duration: 0.25,
              },
            }}
          >
            <Image
              src="/who we are/Frame 2.webp"
              alt="Creator working on content"
              fill
              priority
              sizes="269px"
              className="object-cover"
            />
          </motion.div>

          {/* =================================================
              FRAME 4
          ================================================== */}
          <motion.div
            className="
              relative
              h-[299px]
              w-[269px]
              overflow-hidden
              rounded-[24px]
            "
            initial={{
              opacity: 0,
              y: -30,
            }}
            animate={{
              opacity: 1,
              y: [0, 7, 0, -7, 0],
            }}
            transition={{
              opacity: {
                duration: 0.8,
                delay: 0.35,
              },
              y: {
                duration: 6.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              },
            }}
            whileHover={{
              scale: 1.02,
              transition: {
                duration: 0.25,
              },
            }}
          >
            <Image
              src="/who we are/Frame 4.webp"
              alt="Content creator"
              fill
              priority
              sizes="269px"
              className="object-cover"
            />
          </motion.div>

          {/* =================================================
              FRAME 1
          ================================================== */}
          <motion.div
            className="
              relative
              h-[289px]
              w-[269px]
              overflow-hidden
              rounded-[24px]
            "
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: [0, -6, 0, 6, 0],
            }}
            transition={{
              opacity: {
                duration: 0.8,
                delay: 0.45,
              },
              y: {
                duration: 7,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.8,
              },
            }}
            whileHover={{
              scale: 1.02,
              transition: {
                duration: 0.25,
              },
            }}
          >
            <Image
              src="/who we are/Frame 1.webp"
              alt="Creator"
              fill
              priority
              sizes="269px"
              className="object-cover"
            />
          </motion.div>

          {/* =================================================
              FRAME 3
          ================================================== */}
          <motion.div
            className="
              relative
              h-[289px]
              w-[269px]
              overflow-hidden
              rounded-[24px]
            "
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: [0, 6, 0, -6, 0],
            }}
            transition={{
              opacity: {
                duration: 0.8,
                delay: 0.55,
              },
              y: {
                duration: 6.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              },
            }}
            whileHover={{
              scale: 1.02,
              transition: {
                duration: 0.25,
              },
            }}
          >
            <Image
              src="/who we are/Frame 3.webp"
              alt="Creator"
              fill
              priority
              sizes="269px"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* =====================================================
          MOBILE / TABLET HERO
      ====================================================== */}
      <div className="block px-6 pb-16 pt-28 lg:hidden">
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
          Creators your customers already trust.
          <br />
          <span>
            <motion.span
              className="inline-block"
              animate={{
                y: [0, -3, 0],
                color: ['#262626', '#57058B', '#262626'],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 2.5,
                ease: 'easeInOut',
              }}
            >
              Campaigns
            </motion.span>{' '}
            that actually move them.
          </span>
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
          Skip the search, get memorable content from vetted creators and report that proves what it
          achieved. Whatever your goal, we handle everything in between.
        </motion.p>

        {/* =================================================
            MOBILE CTA BUTTONS
        ================================================== */}
        <motion.div
          className="mt-6 flex flex-wrap gap-3"
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
          {/* Primary */}
          <Link
            href="https://www.stardustcreatornetwork.com/signin"
            className="
              inline-flex
              h-[48px]
              items-center
              justify-center
              gap-2
              rounded-[8px]
              bg-[#57058B]
              px-5
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

          {/* Secondary */}
          <Link
            href="https://www.stardustcreatornetwork.com/creator-os"
            className="
              inline-flex
              h-[48px]
              items-center
              justify-center
              rounded-[8px]
              border
              border-[#E2E8F0]
              bg-white
              px-5
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
            MOBILE IMAGE GRID
        ================================================== */}
        <div className="mt-12 grid grid-cols-2 gap-3">
          {/* Frame 2 */}
          <motion.div
            className="
              relative
              aspect-[0.9]
              overflow-hidden
              rounded-[20px]
            "
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: [0, -5, 0, 5, 0],
            }}
            transition={{
              opacity: {
                duration: 0.8,
                delay: 0.5,
              },
              y: {
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          >
            <Image
              src="/who we are/Frame 2.webp"
              alt="Creator working on content"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </motion.div>

          {/* Frame 4 */}
          <motion.div
            className="
              relative
              aspect-[0.9]
              overflow-hidden
              rounded-[20px]
            "
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: [0, 5, 0, -5, 0],
            }}
            transition={{
              opacity: {
                duration: 0.8,
                delay: 0.6,
              },
              y: {
                duration: 6.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.4,
              },
            }}
          >
            <Image
              src="/who we are/Frame 4.webp"
              alt="Content creator"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </motion.div>

          {/* Frame 1 */}
          <motion.div
            className="
              relative
              aspect-[0.9]
              overflow-hidden
              rounded-[20px]
            "
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: [0, -4, 0, 4, 0],
            }}
            transition={{
              opacity: {
                duration: 0.8,
                delay: 0.7,
              },
              y: {
                duration: 7,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.7,
              },
            }}
          >
            <Image
              src="/who we are/Frame 1.webp"
              alt="Creator"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </motion.div>

          {/* Frame 3 */}
          <motion.div
            className="
              relative
              aspect-[0.9]
              overflow-hidden
              rounded-[20px]
            "
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: [0, 4, 0, -4, 0],
            }}
            transition={{
              opacity: {
                duration: 0.8,
                delay: 0.8,
              },
              y: {
                duration: 6.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              },
            }}
          >
            <Image
              src="/who we are/Frame 3.webp"
              alt="Creator"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
