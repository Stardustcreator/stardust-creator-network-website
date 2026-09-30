'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface WhoWeAreContentProps {
  heroTitle?: string;
  heroSubtitle?: string;
  aboutContent?: string;
  problemContent?: string;
  buildingContent?: string;
  finalCtaTitle?: string;
  finalCtaDescription?: string;
}

const heroImages = [
  '/who we are/header 1.webp',
  '/who we are/header 2.webp',
  '/who we are/header 3.webp',
];

const benefitItems = [
  {
    icon: '/icons/icon-1.png',
    title: 'Own the moments that matter',
    description:
      'With the right creators and a clear strategy, your brand joins cultural conversations early and becomes the name people link to them.',
    className: 'bg-[#FBF3FF]',
  },
  {
    icon: '/icons/icon-2.png',
    title: 'More impact from every naira',
    description:
      'Your budget goes to the creators and moments that move your audience, not to guesswork.',
    className: 'bg-[#FFFEE7]',
  },
  {
    icon: '/icons/icon-3.png',
    title: 'Recognised in every scroll',
    description:
      'Every creator tells your story the way you would, so your brand stays consistent and credible wherever it shows up.',
    className: 'bg-[#FFF7EC]',
  },
  {
    icon: '/icons/icon-4.png',
    title: 'Marketing that earns its seat at the table',
    description:
      'Show leadership what creator marketing did for the brand, and make the case for your next big idea with confidence.',
    className: 'bg-[#F5F5F5]',
  },
];

const logos = [
  '/brand logos/logo 1.webp',
  '/brand logos/logo 3.webp',
  '/brand logos/logo 4.webp',
  '/brand logos/logo 5.webp',
  '/brand logos/logo 6.webp',
];

const creators = [
  '/creators/creator 1.webp',
  '/creators/creator 2.webp',
  '/creators/creator 3.webp',
  '/creators/creator 4.webp',
  '/creators/creator 5.webp',
  '/creators/creator 6.webp',
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function WhoWeAreContent({
  heroTitle = 'We help brands grow through the creators people trust most.',
  heroSubtitle = `SCN is Africa's creator marketplace. We connect brands with vetted creators and manage every campaign from brief to results, so creator marketing becomes a growth channel you can count on.`,
}: WhoWeAreContentProps) {
  return (
    <div className="w-full overflow-hidden bg-white">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative min-h-[795px] w-full overflow-hidden bg-gradient-to-r from-[#FF3E1C] to-[#C52D07]">
        <div className="relative z-20 mx-auto flex min-h-[795px] w-full max-w-[1440px] items-center px-6 pb-20 pt-32 sm:px-10 lg:px-[57px]">
          <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            {/* HERO COPY */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="relative z-30 max-w-[685px]"
            >
              <motion.h1
                variants={fadeUp}
                className="
                  font-bricolage-grotesque
                  text-[40px]
                  font-semibold
                  leading-[1.08]
                  tracking-[-2px]
                  text-white
                  sm:text-[48px]
                  lg:text-[56px]
                  lg:leading-[70px]
                  lg:tracking-[-3px]
                "
              >
                {heroTitle}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="
                  mt-5
                  max-w-[685px]
                  font-lato
                  text-[16px]
                  leading-[25px]
                  tracking-[-0.2px]
                  text-[#F2F2F2]
                  sm:text-[18px]
                  sm:leading-[28px]
                "
              >
                {heroSubtitle}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-7"
              >
                <Link
                  href="/signin"
                  className="
                    inline-flex
                    h-[48px]
                    items-center
                    justify-center
                    gap-[6px]
                    rounded-[8px]
                    bg-[#57058B]
                    px-[24px]
                    py-[12px]
                    font-lato
                    text-[16px]
                    font-medium
                    leading-[24px]
                    tracking-[-0.2px]
                    text-white
                    shadow-[0_4px_4px_rgba(0,0,0,0.1),0_2px_2px_rgba(0,0,0,0.04)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:opacity-95
                  "
                >
                  <span>Start a Campaign</span>

                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19M19 12L13 6M19 12L13 18"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>

            {/* =====================================================
                HERO IMAGE COLLAGE
            ====================================================== */}
            <div className="relative mx-auto h-[430px] w-full max-w-[610px] lg:h-[520px]">
              {/* LEFT IMAGE */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: 80,
                  y: 20,
                  rotate: -5,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: -9,
                }}
                transition={{
                  opacity: {
                    duration: 0.7,
                  },
                  x: {
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  y: {
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  rotate: {
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                whileHover={{
                  y: -6,
                  rotate: -7,
                  transition: {
                    duration: 0.3,
                  },
                }}
                className="
                  absolute
                  left-[8%]
                  top-[34%]
                  z-20
                  h-[243px]
                  w-[218px]
                  overflow-hidden
                  rounded-[19px]
                "
              >
                <Image
                  src={heroImages[0]}
                  alt="Creator"
                  fill
                  priority
                  className="object-cover"
                  sizes="218px"
                />
              </motion.div>

              {/* CENTER / TOP IMAGE */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 80,
                  rotate: 0,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: 2,
                }}
                transition={{
                  opacity: {
                    duration: 0.7,
                  },
                  y: {
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  rotate: {
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                whileHover={{
                  y: -7,
                  rotate: 3,
                  transition: {
                    duration: 0.3,
                  },
                }}
                className="
                  absolute
                  left-[38%]
                  top-[6%]
                  z-30
                  h-[243px]
                  w-[218px]
                  overflow-hidden
                  rounded-[19px]
                "
              >
                <Image
                  src={heroImages[1]}
                  alt="Creator"
                  fill
                  priority
                  className="object-cover"
                  sizes="218px"
                />
              </motion.div>

              {/* RIGHT IMAGE */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: -80,
                  y: 20,
                  rotate: 5,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: 9,
                }}
                transition={{
                  opacity: {
                    duration: 0.7,
                  },
                  x: {
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  y: {
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  rotate: {
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                whileHover={{
                  y: -6,
                  rotate: 7,
                  transition: {
                    duration: 0.3,
                  },
                }}
                className="
                  absolute
                  right-[3%]
                  top-[36%]
                  z-10
                  h-[243px]
                  w-[218px]
                  overflow-hidden
                  rounded-[19px]
                "
              >
                <Image
                  src={heroImages[2]}
                  alt="Creator"
                  fill
                  priority
                  className="object-cover"
                  sizes="218px"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TURN CREATOR TRUST INTO BRAND GROWTH
      ========================================================== */}
      <section className="w-full bg-[#F5F5F4] px-6 py-16 sm:px-10 lg:px-[80px] lg:py-[80px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={staggerContainer}
          className="mx-auto w-full max-w-[1440px]"
        >
          <motion.div
            variants={fadeUp}
            className="max-w-[760px]"
          >
            <h2 className="font-bricolage-grotesque text-[32px] font-semibold leading-[40px] tracking-[-1.2px] text-[#262626] sm:text-[40px] sm:leading-[48px] sm:tracking-[-1.5px]">
              Turn creator trust into brand growth
            </h2>

            <p className="mt-3 max-w-[727px] font-lato text-[17px] leading-[27px] tracking-[-0.2px] text-[#737373] sm:text-[20px] sm:leading-[28px] sm:tracking-[-0.4px]">
              Your audience already trusts creators. We connect your budget to the right ones and
              take the mess out of the middle, so every campaign reaches people who listen and moves
              your brand forward.
            </p>

            <div className="mt-6">
              <Link
                href="/signin"
                className="
                  inline-flex
                  h-[48px]
                  items-center
                  justify-center
                  gap-[6px]
                  rounded-[8px]
                  bg-[#57058B]
                  px-[24px]
                  py-[12px]
                  font-lato
                  text-[16px]
                  font-medium
                  leading-[24px]
                  tracking-[-0.2px]
                  text-white
                  transition-all
                  duration-300
                  hover:opacity-90
                "
              >
                Start a Campaign
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 12H19M19 12L13 6M19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* =========================================================
          WHAT WE DO
      ========================================================== */}
      <section
        className="
          relative
          w-full
          overflow-hidden
          rounded-tl-[32px]
          rounded-tr-[32px]
          bg-gradient-to-b
          from-[rgba(131,52,248,0.20)]
          via-[rgba(172,61,244,0.70)]
          to-[rgba(25,1,39,0.12)]
          px-6
          py-16
          sm:px-10
          lg:px-[80px]
          lg:py-[64px]
        "
      >
        <div className="mx-auto w-full max-w-[1440px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="
                mx-auto
                max-w-[650px]
                font-bricolage-grotesque
                text-[32px]
                font-semibold
                leading-[40px]
                tracking-[-1.2px]
                text-[#262626]
                sm:text-[40px]
                sm:leading-[48px]
                sm:tracking-[-1.5px]
              "
            >
              From brief to live campaign, handled start to finish.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="
                mx-auto
                mt-2
                max-w-[578px]
                font-lato
                text-[16px]
                font-medium
                leading-[24px]
                tracking-[-0.2px]
                text-[#262626]
              "
            >
              Get your brand in front of the right people, content that lands on the first try, and
              results you can stand behind, without a single follow-up thread.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {[
              {
                number: '01',
                title: 'The right creators, matched to your brief',
                description:
                  'Send the brief. Get a vetted shortlist back, picked for fit, not followers.',
              },
              {
                number: '02',
                title: 'We keep you in control, every step',
                description:
                  'You pick from the shortlist, sign off on content and request changes anytime. We handle the logistics behind it.',
              },
              {
                number: '03',
                title: 'Results, delivered with proof',
                description:
                  'Real numbers on what ran, what it reached, what it did. Ready for leadership.',
              },
            ].map(step => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                className="
                  min-h-[235px]
                  rounded-[20px]
                  border
                  border-[#EDE3FF]
                  bg-white
                  px-[29px]
                  py-[33px]
                  text-left
                "
              >
                <div className="font-bricolage-grotesque text-[40px] font-semibold leading-[48px] tracking-[-1.5px] text-[#EDE3FF]">
                  {step.number}
                </div>

                <h3 className="mt-5 font-bricolage-grotesque text-[20px] font-semibold leading-[24px] tracking-[-0.7px] text-[#1A002E]">
                  {step.title}
                </h3>

                <p className="mt-2 font-lato text-[16px] leading-[24px] tracking-[-0.2px] text-[#6B6B6B]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          BECOME THE BRAND PEOPLE REMEMBER
      ========================================================== */}
      <section className="w-full border-y border-[#E0E0E0] bg-[#FAFAF9]">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 lg:grid-cols-[683px_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="px-6 py-16 sm:px-10 lg:px-[80px] lg:py-[64px]"
          >
            <h2 className="font-bricolage-grotesque text-[32px] font-semibold leading-[40px] tracking-[-1.2px] text-[#170F24] sm:text-[40px] sm:leading-[48px] sm:tracking-[-1.5px]">
              Become the brand people remember
            </h2>

            <p className="mt-4 max-w-[500px] font-lato text-[17px] leading-[1.55] text-[#6B6B6B]">
              Show up in the right cultural moments, through voices your audience trusts, with the
              numbers to back every decision you make.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 border-t border-[#E0E0E0] sm:grid-cols-2 lg:border-l lg:border-t-0">
            {benefitItems.map((item, index) => (
              <motion.div
                key={item.title}
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
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                className={`
                  ${item.className}
                  flex
                  min-h-[275px]
                  flex-col
                  justify-end
                  gap-4
                  border-[#E0E0E0]
                  px-8
                  pb-8
                  pt-14
                  ${index % 2 === 1 ? 'sm:border-l' : ''}
                  ${index >= 2 ? 'border-t' : ''}
                `}
              >
                <div className="h-7 w-7">
                  <Image
                    src={item.icon}
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain"
                  />
                </div>

                <div>
                  <h3 className="font-bricolage-grotesque text-[20px] font-medium leading-[24px] tracking-[-0.7px] text-[#170F24]">
                    {item.title}
                  </h3>

                  <p className="mt-2 font-lato text-[15px] leading-[1.5] text-[#6B6B6B]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          TRUSTED BY
      ========================================================== */}
      <section className="w-full bg-white py-[56px]">
        <p className="text-center font-bricolage-grotesque text-[18px] font-medium leading-[20px] tracking-[-0.4px] text-[#737373]">
          Trusted by
        </p>

        <div className="relative mt-6 w-full overflow-hidden">
          <motion.div
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              duration: 45,
              ease: 'linear',
              repeat: Infinity,
            }}
            className="flex w-max items-center gap-[72px] px-12"
          >
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={`${logo}-${index}`}
                className="flex h-[60px] w-[110px] shrink-0 items-center justify-center"
              >
                <Image
                  src={logo}
                  alt="Brand logo"
                  width={110}
                  height={60}
                  className="max-h-[56px] w-auto max-w-[110px] object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          CREATOR NETWORK
      ========================================================== */}
      <section className="w-full overflow-hidden rounded-tl-[32px] rounded-tr-[32px] bg-white py-[80px]">
        <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-[80px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="
                mx-auto
                max-w-[520px]
                font-bricolage-grotesque
                text-[32px]
                font-semibold
                leading-[40px]
                tracking-[-1.2px]
                text-[#262626]
                sm:text-[40px]
                sm:leading-[48px]
                sm:tracking-[-1.5px]
              "
            >
              Creators who've done their homework.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="
                mx-auto
                mt-2
                max-w-[514px]
                font-lato
                text-[16px]
                font-medium
                leading-[24px]
                tracking-[-0.2px]
                text-[#737373]
              "
            >
              Through our live business clinics, creators in our network learn briefs, deadlines and
              professionalism. You feel it in your campaign.
            </motion.p>
          </motion.div>

          <div className="relative mt-12 w-full overflow-hidden">
            <motion.div
              animate={{
                x: [0, -1296, -1296],
              }}
              transition={{
                duration: 45,
                times: [0, 0.4526, 1],
                ease: 'linear',
                repeat: Infinity,
              }}
              className="flex w-max gap-4"
            >
              {[...creators, ...creators].map((creator, index) => (
                <div
                  key={`${creator}-${index}`}
                  className="
                    relative
                    h-[300px]
                    w-[200px]
                    shrink-0
                    overflow-hidden
                    rounded-[16px]
                  "
                >
                  <Image
                    src={creator}
                    alt="Creator in the SCN network"
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================== */}
      <section className="w-full rounded-[16px] bg-[#FBF3FF] px-6 py-16 sm:px-10 lg:h-[388px] lg:py-[64px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={staggerContainer}
          className="mx-auto flex h-full max-w-[880px] flex-col items-center justify-center text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="
              max-w-[678px]
              font-bricolage-grotesque
              text-[32px]
              font-semibold
              leading-[40px]
              tracking-[-1.2px]
              text-[#262626]
              sm:text-[40px]
              sm:leading-[48px]
              sm:tracking-[-1.5px]
            "
          >
            Picture your next launch: on time, on brand and worth every naira.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="
              mt-2
              font-lato
              text-[16px]
              font-medium
              leading-[28px]
              tracking-[-0.2px]
              text-[#737373]
            "
          >
            It starts with telling us what you want to achieve.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-4 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Link
              href="/signin"
              className="
                inline-flex
                h-[48px]
                items-center
                justify-center
                rounded-[8px]
                bg-[#57058B]
                px-[24px]
                py-[12px]
                font-lato
                text-[16px]
                font-medium
                leading-[24px]
                tracking-[-0.2px]
                text-white
                transition-all
                duration-300
                hover:opacity-90
              "
            >
              Find your Creator match
            </Link>

            <Link
              href="/signin"
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
                py-[12px]
                font-lato
                text-[14px]
                font-medium
                leading-[20px]
                text-[#262626]
                shadow-[0_1px_1px_rgba(0,0,0,0.05)]
                transition-all
                duration-300
                hover:bg-gray-50
              "
            >
              I'm a Creator
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
