'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';

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
    mobileTitle: 'Weeks back',
    mobileDescription: 'No sourcing, chasing or follow-up threads.',
    description:
      'With the right creators and a clear strategy, your brand joins cultural conversations early and becomes the name people link to them.',
    className: 'bg-[#FBF3FF]',
  },
  {
    icon: '/icons/icon-2.png',
    title: 'More impact from every naira',
    mobileTitle: 'Every naira accounted for',
    mobileDescription: 'One budget, tracked start to finish.',
    description:
      'Your budget goes to the creators and moments that move your audience, not to guesswork.',
    className: 'bg-[#FFFEE7]',
  },
  {
    icon: '/icons/icon-3.png',
    title: 'Recognised in every scroll',
    mobileTitle: "Content you're proud to repost",
    mobileDescription: 'Checked against your brief before it goes live.',
    description:
      'Every creator tells your story the way you would, so your brand stays consistent and credible wherever it shows up.',
    className: 'bg-[#FFF7EC]',
  },
  {
    icon: '/icons/icon-4.png',
    title: 'Marketing that earns its seat at the table',
    mobileTitle: 'Reports that make you look good',
    mobileDescription: 'Real numbers for your next leadership meeting.',
    description:
      'Show leadership what creator marketing did for the brand, and make the case for your next big idea with confidence.',
    className: 'bg-[#F5F5F5]',
  },
];

const logos = [
  '/brand logos/logo 1.webp',
  '/brand logos/logo 3.webp',
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

/* =========================================================
   ANIMATION VARIANTS
   Explicitly typed to prevent Framer Motion TypeScript errors.
========================================================= */

const fadeUp: Variants = {
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

const staggerContainer: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/* =========================================================
   RESPONSIVE COPY
   The Figma mobile and desktop frames use different copy. Phones
   (below 640px) get the mobile text, larger screens the desktop text.
========================================================= */

function Copy({ mobile, desktop }: { mobile: string; desktop: string }) {
  return (
    <>
      <span className="sm:hidden">{mobile}</span>
      <span className="hidden sm:inline">{desktop}</span>
    </>
  );
}

export default function WhoWeAreContent({
  heroTitle = 'We help brands grow through the creators people trust most.',
  heroSubtitle = `SCN is Africa's creator marketplace. We connect brands with vetted creators and manage every campaign from brief to results, so creator marketing becomes a growth channel you can count on.`,
}: WhoWeAreContentProps) {
  return (
    <div className="w-full overflow-hidden bg-white">
      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative w-full overflow-hidden bg-gradient-to-r from-[#FF3E1C] to-[#C52D07] lg:min-h-[795px] xl:min-h-[705px]">
        <div className="relative z-20 mx-auto flex w-full max-w-[1440px] items-center px-5 pb-10 pt-28 sm:px-10 sm:pb-20 sm:pt-32 lg:min-h-[795px] lg:px-[57px] xl:min-h-[705px] xl:items-start xl:pb-0 xl:pt-[140px]">
          <div className="grid w-full grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center xl:items-start">
            {/* =================================================
                HERO COPY
            ================================================= */}

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="relative z-30 max-w-[685px] xl:mt-[79px]"
            >
              <motion.h1
                variants={fadeUp}
                className="
                  font-bricolage-grotesque
                  text-[30px]
                  font-semibold
                  leading-[1.15]
                  tracking-[-1px]
                  text-white
                  sm:text-[48px]
                  sm:leading-[1.08]
                  sm:tracking-[-2px]
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
                  mt-4
                  max-w-[685px]
                  font-lato
                  text-[15px]
                  leading-[23px]
                  sm:mt-5
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
                className="mt-6 sm:mt-7"
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
                    aria-hidden="true"
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

            {/* =================================================
                HERO IMAGE COLLAGE
            ================================================= */}

            <div className="relative mx-auto h-[260px] w-full max-w-[360px] sm:h-[430px] sm:max-w-[610px] lg:h-[520px] xl:h-[460px]">
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
                  xl:left-[7.5%]
                  xl:top-[186px]
                  h-[150px]
                  w-[134px]
                  overflow-hidden
                  rounded-[14px]
                  sm:h-[243px]
                  sm:w-[218px]
                  sm:rounded-[19px]
                "
              >
                <Image
                  src={heroImages[0]}
                  alt="Creator"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 639px) 134px, 218px"
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
                  z-10
                  xl:left-[35.7%]
                  xl:top-[2px]
                  h-[150px]
                  w-[134px]
                  overflow-hidden
                  rounded-[14px]
                  sm:h-[243px]
                  sm:w-[218px]
                  sm:rounded-[19px]
                "
              >
                <Image
                  src={heroImages[1]}
                  alt="Creator"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 639px) 134px, 218px"
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
                  z-30
                  xl:left-[64.8%]
                  xl:right-auto
                  xl:top-[194px]
                  h-[150px]
                  w-[134px]
                  overflow-hidden
                  rounded-[14px]
                  sm:h-[243px]
                  sm:w-[218px]
                  sm:rounded-[19px]
                "
              >
                <Image
                  src={heroImages[2]}
                  alt="Creator"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 639px) 134px, 218px"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TURN CREATOR TRUST INTO BRAND GROWTH
      ========================================================== */}

      <section className="w-full bg-[#F5F5F4] px-5 py-12 sm:px-10 sm:py-16 lg:px-[80px] lg:py-[80px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          variants={staggerContainer}
          className="mx-auto w-full max-w-[1440px]"
        >
          <motion.div
            variants={fadeUp}
            className="max-w-[760px]"
          >
            <h2 className="font-bricolage-grotesque text-[26px] font-semibold leading-[32px] tracking-[-1px] text-[#262626] sm:text-[40px] sm:leading-[48px] sm:tracking-[-1.5px]">
              <Copy
                mobile="Creators had the trust. Brands had the budget. The middle was a mess."
                desktop="Turn creator trust into brand growth"
              />
            </h2>

            <p className="mt-3 max-w-[727px] font-lato text-[15px] leading-[23px] tracking-[-0.2px] text-[#737373] sm:text-[20px] sm:leading-[28px] sm:tracking-[-0.4px]">
              <Copy
                mobile="Endless scrolling, missed deadlines and reports that proved nothing. We built SCN to fix the middle."
                desktop="Your audience already trusts creators. We connect your budget to the right ones and take the mess out of the middle, so every campaign reaches people who listen and moves your brand forward."
              />
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
                <Copy
                  mobile="Start a campaign"
                  desktop="Start a Campaign"
                />
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="hidden sm:block"
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
          rounded-tl-[24px]
          rounded-tr-[24px]
          bg-gradient-to-b
          from-[rgba(131,52,248,0.20)]
          via-[rgba(172,61,244,0.70)]
          to-[rgba(25,1,39,0.12)]
          px-5
          py-12
          sm:rounded-tl-[32px]
          sm:rounded-tr-[32px]
          sm:px-10
          sm:py-16
          lg:px-[80px]
          lg:py-[64px]
        "
      >
        <div className="mx-auto w-full max-w-[1440px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="
                mx-auto
                max-w-[650px]
                font-bricolage-grotesque
                text-[26px]
                font-semibold
                leading-[32px]
                tracking-[-1px]
                text-[#262626]
                sm:text-[40px]
                sm:leading-[48px]
                sm:tracking-[-1.5px]
              "
            >
              <Copy
                mobile="What we do"
                desktop="From brief to live campaign, handled start to finish."
              />
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="
                mx-auto
                mt-2
                max-w-[578px]
                font-lato
                text-[14px]
                font-medium
                leading-[22px]
                tracking-[-0.2px]
                text-[#262626]
                sm:text-[16px]
                sm:leading-[24px]
              "
            >
              <Copy
                mobile="Whether it's creator sourcing or end-to-end campaign management, we've got you covered."
                desktop="Get your brand in front of the right people, content that lands on the first try, and results you can stand behind, without a single follow-up thread."
              />
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            variants={staggerContainer}
            className="mt-8 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3"
          >
            {[
              {
                number: '01',
                title: 'The right creators, matched to your brief',
                mobileTitle: 'Match',
                mobileDescription:
                  'You send a brief. We match it to vetted creators in your niche.',
                description:
                  'Send the brief. Get a vetted shortlist back, picked for fit, not followers.',
              },
              {
                number: '02',
                title: 'We keep you in control, every step',
                mobileTitle: 'Manage',
                mobileDescription:
                  'We run the campaign end to end — briefing, content review, contracts and payments.',
                description:
                  'You pick from the shortlist, sign off on content and request changes anytime. We handle the logistics behind it.',
              },
              {
                number: '03',
                title: 'Results, delivered with proof',
                mobileTitle: 'Deliver',
                mobileDescription:
                  'You get results and a report you can take straight to leadership.',
                description:
                  'Real numbers on what ran, what it reached, what it did. Ready for leadership.',
              },
            ].map(step => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                className="
                  rounded-[16px]
                  border
                  border-[#EDE3FF]
                  bg-white
                  px-5
                  py-6
                  sm:rounded-[20px]
                  sm:px-[29px]
                  sm:py-[33px]
                  md:min-h-[235px]
                  text-left
                "
              >
                <div className="font-bricolage-grotesque text-[32px] font-semibold leading-[40px] tracking-[-1.2px] text-[#EDE3FF] sm:text-[40px] sm:leading-[48px] sm:tracking-[-1.5px]">
                  {step.number}
                </div>

                <h3 className="mt-3 font-bricolage-grotesque text-[18px] font-semibold leading-[24px] sm:mt-5 sm:text-[20px] tracking-[-0.7px] text-[#1A002E]">
                  <Copy
                    mobile={step.mobileTitle}
                    desktop={step.title}
                  />
                </h3>

                <p className="mt-2 font-lato text-[15px] leading-[22px] tracking-[-0.2px] text-[#6B6B6B] sm:text-[16px] sm:leading-[24px]">
                  <Copy
                    mobile={step.mobileDescription}
                    desktop={step.description}
                  />
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
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.7,
            }}
            className="px-5 py-12 sm:px-10 sm:py-16 lg:px-[80px] lg:py-[64px]"
          >
            <h2 className="font-bricolage-grotesque text-[26px] font-semibold leading-[32px] tracking-[-1px] text-[#170F24] sm:text-[40px] sm:leading-[48px] sm:tracking-[-1.5px]">
              <Copy
                mobile="What brands get"
                desktop="Become the brand people remember"
              />
            </h2>

            <p className="mt-3 max-w-[500px] font-lato text-[15px] leading-[1.55] sm:mt-4 sm:text-[17px] text-[#6B6B6B]">
              <Copy
                mobile="Everything that used to eat your week — sourcing, chasing, checking, reporting — becomes one system you can trust from brief to results."
                desktop="Show up in the right cultural moments, through voices your audience trusts, with the numbers to back every decision you make."
              />
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
                  flex-col
                  gap-3
                  border-[#E0E0E0]
                  px-5
                  py-7
                  sm:min-h-[275px]
                  sm:justify-end
                  sm:gap-4
                  sm:px-8
                  sm:pb-8
                  sm:pt-14
                  ${index % 2 === 1 ? 'sm:border-l' : ''}
                  ${index >= 1 ? 'border-t' : ''} ${index === 1 ? 'sm:border-t-0' : ''}
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
                  <h3 className="font-bricolage-grotesque text-[18px] font-medium leading-[24px] tracking-[-0.7px] text-[#170F24] sm:text-[20px]">
                    <Copy
                      mobile={item.mobileTitle}
                      desktop={item.title}
                    />
                  </h3>

                  <p className="mt-2 font-lato text-[15px] leading-[1.5] text-[#6B6B6B]">
                    <Copy
                      mobile={item.mobileDescription}
                      desktop={item.description}
                    />
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

      <section className="w-full bg-white py-10 sm:py-[56px]">
        <p className="text-center font-bricolage-grotesque text-[18px] font-medium leading-[20px] tracking-[-0.4px] text-[#737373]">
          Trusted by
        </p>

        <div className="relative mt-6 w-full overflow-hidden">
          {/* Eight copies of the 4 logos: -50% moves exactly four copies, so
              the loop is seamless and always wider than the screen. Duration is
              set so the scroll speed matches the old 5-logo row. */}
          <motion.div
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              duration: 144,
              ease: 'linear',
              repeat: Infinity,
            }}
            className="flex w-max items-center gap-10 pr-10 sm:gap-[72px] sm:pr-[72px]"
          >
            {Array.from({ length: 8 }, () => logos)
              .flat()
              .map((logo, index) => (
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

      <section className="w-full overflow-hidden rounded-tl-[24px] rounded-tr-[24px] bg-white py-12 sm:rounded-tl-[32px] sm:rounded-tr-[32px] sm:py-[80px]">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-10 lg:px-[80px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={staggerContainer}
            className="text-left sm:text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="
                mx-auto
                max-w-[520px]
                font-bricolage-grotesque
                text-[26px]
                font-semibold
                leading-[32px]
                tracking-[-1px]
                text-[#262626]
                sm:text-[40px]
                sm:leading-[48px]
                sm:tracking-[-1.5px]
              "
            >
              <Copy
                mobile="Creators who've done the homework."
                desktop="Creators who've done their homework."
              />
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

          <div className="relative mt-8 w-full overflow-hidden sm:mt-12">
            <motion.div
              animate={{
                x: ['0%', '-50%', '-50%'],
              }}
              transition={{
                duration: 45,
                times: [0, 0.4526, 1],
                ease: 'linear',
                repeat: Infinity,
              }}
              className="flex w-max gap-4 pr-4"
            >
              {[...creators, ...creators].map((creator, index) => (
                <div
                  key={`${creator}-${index}`}
                  className="
                    relative
                    h-[250px]
                    w-[170px]
                    shrink-0
                    overflow-hidden
                    rounded-[16px]
                    sm:h-[300px]
                    sm:w-[200px]
                  "
                >
                  <Image
                    src={creator}
                    alt="Creator in the SCN network"
                    fill
                    className="object-cover"
                    sizes="(max-width: 639px) 170px, 200px"
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

      <section className="w-full rounded-[16px] bg-[#FBF3FF] px-5 py-12 sm:px-10 sm:py-16 lg:h-[388px] lg:py-[64px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          variants={staggerContainer}
          className="mx-auto flex h-full max-w-[880px] flex-col items-center justify-center text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="
              max-w-[678px]
              font-bricolage-grotesque
              text-[24px]
              font-semibold
              leading-[30px]
              tracking-[-1px]
              text-[#262626]
              sm:text-[40px]
              sm:leading-[48px]
              sm:tracking-[-1.5px]
            "
          >
            <Copy
              mobile="Your next campaign is two minutes away."
              desktop="Picture your next launch: on time, on brand and worth every naira."
            />
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
            <Copy
              mobile="That's how long it takes to tell us about your campaign goals. We handle everything after."
              desktop="It starts with telling us what you want to achieve."
            />
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-4 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4"
          >
            <Link
              href="/signin"
              className="
                flex
                h-[48px]
                w-full
                sm:inline-flex
                sm:w-auto
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
              <Copy
                mobile="Start a campaign"
                desktop="Find your Creator match"
              />
            </Link>

            <Link
              href="/for-creators"
              className="
                hidden
                h-[48px]
                sm:inline-flex
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
