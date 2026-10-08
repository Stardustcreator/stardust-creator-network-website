'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FinalCTASection() {
  return (
    <section
      className="w-full overflow-hidden bg-[#FBF3FF]"
      style={{
        minHeight: '388px',
      }}
    >
      <div
        className="
          mx-auto
          flex
          w-full
          max-w-[1440px]
          flex-col
          items-center
          justify-center
          px-6
          py-16
          text-center
          sm:px-8
          sm:py-20
          lg:min-h-[388px]
          lg:px-20
          lg:py-16
        "
      >
        {/* =========================
            HEADING
        ========================== */}
        <motion.h2
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
          className="
            max-w-[620px]
            text-[32px]
            font-semibold
            leading-[36px]
            tracking-[-1.4px]
            text-[#262626]
            sm:text-[36px]
            sm:leading-[40px]
            md:text-[40px]
            md:leading-[44px]
            lg:text-[42px]
            lg:leading-[46px]
          "
          style={{
            fontFamily: 'var(--font-instrument-sans)',
          }}
        >
          Your next campaign is two
          <br />
          minutes away.
        </motion.h2>

        {/* =========================
            DESCRIPTION
        ========================== */}
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
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-3
            max-w-[560px]
            text-[14px]
            leading-[20px]
            tracking-[-0.1px]
            text-[#737373]
            sm:text-[15px]
            sm:leading-[21px]
          "
          style={{
            fontFamily: 'var(--font-lato)',
          }}
        >
          That's how long it takes to tell us about your campaign goals.
          <br className="hidden sm:block" />
          We handle everything after.
        </motion.p>

        {/* =========================
            BUTTONS
        ========================== */}
        <motion.div
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
            delay: 0.22,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-5
            flex
            w-full
            flex-col
            gap-3
            sm:w-auto
            sm:flex-row
            sm:flex-wrap
            sm:items-center
            sm:justify-center
          "
        >
          {/* Find your Creator match */}
          <Link
            href="/for-creators"
            className="
              flex
              h-[40px]
              w-full
              items-center
              sm:inline-flex
              sm:w-auto
              justify-center
              rounded-[6px]
              bg-[#57058B]
              px-5
              text-[12px]
              font-medium
              leading-[18px]
              text-white
              transition-all
              duration-200
              hover:opacity-90
              hover:shadow-[0_8px_20px_rgba(87,5,139,0.2)]
              sm:h-[42px]
              sm:px-6
              sm:text-[13px]
            "
            style={{
              fontFamily: 'var(--font-lato)',
            }}
          >
            Find your Creator match
          </Link>

          {/* I'm a Creator */}
          <Link
            href="/signin"
            className="
              flex
              h-[40px]
              w-full
              items-center
              sm:inline-flex
              sm:w-auto
              justify-center
              rounded-[6px]
              border
              border-[#E5E5E5]
              bg-white
              px-5
              text-[12px]
              font-medium
              leading-[18px]
              text-[#262626]
              transition-all
              duration-200
              hover:bg-[#f8f8f8]
              sm:h-[42px]
              sm:px-6
              sm:text-[13px]
            "
            style={{
              fontFamily: 'var(--font-lato)',
            }}
          >
            I'm a Creator
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
