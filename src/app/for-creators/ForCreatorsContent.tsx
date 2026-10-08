'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, MotionConfig } from 'framer-motion';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

/* =========================================================
   ASSETS
========================================================= */

const creators = [
  {
    src: '/creators/Creator 1 · Finance (arch).webp',
    className: 'creator creator-1',
  },
  {
    src: '/creators/Creator 2 · Tech (pill).webp',
    className: 'creator creator-2',
  },
  {
    src: '/creators/Creator 3 · Beauty (circle).webp',
    className: 'creator creator-3',
  },
  {
    src: '/creators/Creator 4 · Unboxing (squircle).webp',
    className: 'creator creator-4',
  },
  {
    src: '/creators/Creator make up.webp',
    className: 'creator creator-5',
  },
  {
    src: '/creators/Creator food.webp',
    className: 'creator creator-6',
  },
  {
    src: '/creators/Creator 7 · Food (squircle).webp',
    className: 'creator creator-7',
  },
  {
    src: '/creators/Creator 8 · Finance (circle).webp',
    className: 'creator creator-8',
  },
  {
    src: '/creators/Creator 9 · Tech (pill).webp',
    className: 'creator creator-9',
  },
  {
    src: '/creators/Creator 10 · Food (arch).webp',
    className: 'creator creator-10',
  },
];

const creatorFeatures = [
  {
    title: 'Brand Deals',
    subtitle: 'Build a career on brand deals that fit.',
    description:
      'Get matched with campaigns in your niche, so every partnership grows your name, your portfolio and your next opportunity.',
    image: '/creator community/Visual Card (4).png',
    reverse: false,
  },
  {
    title: 'Rate Calculator',
    subtitle: 'Build an income that matches your talent.',
    description:
      'Know your true rate before any brand asks, negotiate with confidence and turn every deal into income that finally reflects the work you put in.',
    image: '/creator community/Visual Card.png',
    reverse: true,
  },
  {
    title: 'Service Creation',
    subtitle: 'Turn your skills into offers brands can buy.',
    description:
      'Package what you create into ready-to-book services with clear deliverables, timelines and prices, so you never have to quote from scratch again.',
    image: '/creator community/Visual Card (1).png',
    reverse: false,
  },
  {
    title: 'Rate Card Builder',
    subtitle: 'Be the creator brands pick first.',
    description:
      'A polished rate card sets you apart from creators still sending prices in DMs, so brands see a professional worth booking, and booking again.',
    image: '/creator community/Visual Card (2).png',
    reverse: true,
  },
  {
    title: 'Storefront',
    subtitle: "Earn even when you're not pitching.",
    description:
      'Your UGC packages live in one storefront brands can browse and book, so your income keeps moving while you focus on creating.',
    image: '/creator community/Visual Card (5).png',
    reverse: false,
  },
  {
    title: 'Audience Builder',
    subtitle: 'Build a community no algorithm can erase.',
    description:
      'Turn profile visits into subscribers you can reach directly, so your income and influence stay yours whatever the platforms change.',
    image: '/creator community/Visual Card (6).png',
    reverse: true,
  },
];

const communityImages = [
  '/creatives/image 182 (1).webp',
  '/creatives/image 183 (1).webp',
  '/creatives/Photo.webp',
  '/creatives/Photo (1).webp',
  '/creatives/Photo (2).webp',
  '/creatives/image 158.webp',
];

const faqs = [
  {
    question: 'What is Stardust Creator Network?',
    answer:
      "SCN is Africa's creator marketplace. Brands submit campaign briefs and get matched to vetted creators who are the right fit for their campaign. Creators get access to brand deals, a rate calculator, a UGC storefront, an audience builder, and a live creator community. We are the infrastructure that connects both sides of the African creator economy.",
  },
  {
    question: 'Who can join SCN as a creator?',
    answer:
      'SCN is for nano, micro, and mid-tier creators in food, beauty, lifestyle, tech, and finance who want to monetize their content through brand deals. You do not need a huge following. You need the right positioning, the right tools, and access to the right campaigns. SCN gives you all three.',
  },
  {
    question: 'How does the brand matching process work?',
    answer:
      'Brands submit a campaign brief through SCN. Our team reviews it, handpicks creators from our vetted pool who fit the niche, audience, and campaign objectives, and presents the brand with a shortlist to approve. Once approved, SCN manages the campaign from briefing through to final delivery and settlement.',
  },
  {
    question: 'How do I know what to charge brands?',
    answer:
      'The SCN rate calculator factors in your deliverables, usage rights, exclusivity, platform scope, and niche so you always have a rate you can justify and negotiate from. It is available to every creator on the platform.',
  },
  {
    question: 'Can I get brand deals with a small following?',
    answer:
      "Yes. Brands on SCN are actively looking for nano and micro creators. What matters most is your niche, your content quality, and how well your audience aligns with the brand's campaign goals. If your positioning is right and your profile is complete, you will be considered for campaigns that match your category.",
  },
  {
    question: 'How much does SCN cost for creators?',
    answer:
      'SCN has a free Starter plan and a paid Builder plan. The Starter plan gives you access to the rate calculator, storefront, and community. The Builder plan unlocks advanced features. Full pricing details are available under Creator OS.',
  },
  {
    question: 'Is SCN only for Nigerian creators?',
    answer:
      'SCN is built for African creators, starting in Nigeria. Our tools, community, and brand connections reflect the realities of the African creator economy, not Western templates adapted to fit. We are expanding across the continent as we grow.',
  },
];

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.55,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   HERO CREATOR
========================================================= */

function CreatorPortrait({
  src,
  className,
  index,
}: {
  src: string;
  className: string;
  index: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: 32,
        scale: 0.92,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.9,
        delay: 0.2 + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        scale: 1.08,
        transition: { duration: 0.25 },
      }}
    >
      {/* Continuous float. Each portrait gets its own rhythm so the arc
          feels alive rather than moving as one block. */}
      <motion.div
        style={{ position: 'absolute', inset: 0 }}
        animate={{
          y: [0, index % 2 === 0 ? -10 : 10, 0],
          rotate: [0, index % 2 === 0 ? 1.5 : -1.5, 0],
        }}
        transition={{
          duration: 4.5 + (index % 4) * 0.6,
          delay: 1.2 + index * 0.15,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes="120px"
          className="creator-image"
          priority
        />
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function ForCreatorsContent() {
  return (
    <>
      <Header />

      <MotionConfig reducedMotion="user">
        <main className="scn-creators-page">
          {/* =====================================================
            HERO
        ===================================================== */}

          <section className="scn-hero">
            {/* FULL-WIDTH HERO BACKGROUND */}

            <div className="hero-background">
              <div className="hero-blob hero-blob-purple" />
              <div className="hero-blob hero-blob-blue" />
              <div className="hero-blob hero-blob-yellow" />
              <div className="hero-blob hero-blob-dark" />
            </div>

            {/* HERO CONTENT */}

            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                ease: 'easeOut',
              }}
            >
              <h1>
                Stop chasing brand deals.
                <br />
                Start getting booked.
              </h1>

              <p>Get found, price with confidence and get paid properly. All in one place.</p>

              <Link
                href="/signup"
                className="hero-button"
              >
                <span>Join SCN</span>
                <span className="hero-arrow">→</span>
              </Link>
            </motion.div>

            {/* CREATOR ARC */}

            <div className="creator-arc">
              {creators.map((creator, index) => (
                <CreatorPortrait
                  key={creator.src}
                  src={creator.src}
                  className={creator.className}
                  index={index}
                />
              ))}

              {/* Booked chip */}

              <motion.div
                className="hero-chip hero-chip-booked"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                transition={{
                  opacity: { delay: 1.4, duration: 0.4, ease: 'easeOut' },
                  scale: { delay: 1.4, duration: 0.4, ease: 'easeOut' },
                  y: { delay: 2, duration: 3.2, ease: 'easeInOut', repeat: Infinity },
                }}
              >
                <span className="chip-dot purple-dot" />
                <span>Booked · ₦150k</span>
              </motion.div>

              {/* Subscribers chip */}

              <motion.div
                className="hero-chip hero-chip-subscribers"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, y: [0, 8, 0] }}
                transition={{
                  opacity: { delay: 1.55, duration: 0.4, ease: 'easeOut' },
                  scale: { delay: 1.55, duration: 0.4, ease: 'easeOut' },
                  y: { delay: 2.3, duration: 3.6, ease: 'easeInOut', repeat: Infinity },
                }}
              >
                <span className="chip-dot blue-dot" />
                <span>+86 subscribers</span>
              </motion.div>
            </div>
          </section>

          {/* =====================================================
            TOOLS INTRO
        ===================================================== */}

          <section className="tools-intro">
            <Reveal>
              <h2>
                The Infrastructure Your Creator
                <br />
                Business Has Been Missing
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p>
                Every tool on your SCN dashboard helps you earn what you&apos;re worth, get booked
                by brands and grow a creator business that lasts.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <Link
                href="/creators/join"
                className="purple-button"
              >
                Sign Up
                <span>→</span>
              </Link>
            </Reveal>
          </section>

          {/* =====================================================
            CREATOR TOOLS
        ===================================================== */}

          <section className="tools-section">
            <div className="tools-rows">
              {creatorFeatures.map((feature, index) => (
                <Reveal
                  key={feature.title}
                  delay={index * 0.04}
                  className={`tool-row ${feature.reverse ? 'tool-row-reverse' : ''}`}
                >
                  <div className="tool-copy">
                    <h3>{feature.title}</h3>

                    <h4>{feature.subtitle}</h4>

                    <p>{feature.description}</p>
                  </div>

                  <motion.div
                    className="visual-card"
                    initial={{ opacity: 0, x: feature.reverse ? -48 : 48, scale: 0.97 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.3 } }}
                  >
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 608px"
                      className="visual-card-image"
                    />
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* =====================================================
            COMMUNITY
        ===================================================== */}

          <section className="community-section">
            <div className="community-head">
              <Reveal>
                <h2>
                  Join a community of
                  <br />
                  like-minded creators
                </h2>
              </Reveal>

              <Reveal delay={0.08}>
                <p>
                  Live clinics, expert mentorship, templates, and a community of creators who are
                  building real businesses from their content. You do not have to figure this out
                  alone.
                </p>
              </Reveal>
            </div>

            <div className="community-window">
              <motion.div
                className="community-track"
                animate={{
                  x: ['0%', '-50%'],
                }}
                transition={{
                  duration: 90,
                  ease: 'linear',
                  repeat: Infinity,
                }}
              >
                {Array.from({ length: 4 }, () => communityImages)
                  .flat()
                  .map((image, index) => (
                    <div
                      className="community-photo"
                      key={`${image}-${index}`}
                    >
                      <Image
                        src={image}
                        alt="SCN creator community"
                        fill
                        sizes="200px"
                        className="community-photo-image"
                      />
                    </div>
                  ))}
              </motion.div>
            </div>
          </section>

          {/* =====================================================
            FREE / STARTER
        ===================================================== */}

          <section className="starter-section">
            <Reveal className="starter-inner">
              <h2 className="starter-title">Start getting booked. It&apos;s free.</h2>

              <p className="starter-text">
                Price your work, send a pro rate card, get matched with brand deals and sell your
                UGC packages.
              </p>

              <Link
                href="/signup"
                className="purple-button"
              >
                Join SCN
              </Link>

              <p className="builder-note">
                A Builder plan with higher limits is coming.
                <Link href="/creators/join">Get notified →</Link>
              </p>
            </Reveal>
          </section>

          {/* =====================================================
            FAQ
        ===================================================== */}

          <section className="faq-section">
            <div className="faq-inner">
              <Reveal className="faq-header">
                <h2>Frequently Asked Questions</h2>

                <p>Things most people want to know before they sign up.</p>
              </Reveal>

              <div className="faq-list">
                {faqs.map((faq, index) => (
                  <Reveal
                    key={faq.question}
                    delay={index * 0.03}
                  >
                    <details
                      className="faq-item"
                      open={index === 0}
                    >
                      <summary>
                        <span>{faq.question}</span>

                        <span
                          className="faq-chevron"
                          aria-hidden="true"
                        >
                          ⌄
                        </span>

                        <span
                          className="faq-plus"
                          aria-hidden="true"
                        />
                      </summary>

                      <p>{faq.answer}</p>
                    </details>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* =====================================================
            FINAL CTA
        ===================================================== */}

          <section className="final-cta">
            <Reveal>
              <div className="final-cta-inner">
                <h2>Get paid for what you already create.</h2>

                <p>
                  Set up your creator profile in two minutes. We&apos;ll match you with brands that
                  fit your content and make sure you get paid.
                </p>

                <div className="final-buttons">
                  <Link
                    href="/signup"
                    className="purple-button"
                  >
                    Join the Network
                  </Link>
                </div>
              </div>
            </Reveal>
          </section>
        </main>
      </MotionConfig>

      <Footer />

      <style
        jsx
        global
      >{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #ffffff;
        }

        .scn-creators-page {
          width: 100%;
          max-width: none;
          overflow: hidden;
          color: #262626;
          background: #ffffff;
        }

        /* =====================================================
           HERO
        ===================================================== */

        .scn-hero {
          position: relative;

          width: 100%;
          height: 795px;

          overflow: hidden;

          background: #faf9fc;
        }

        .hero-background {
          position: absolute;

          inset: 0;

          width: 100%;
          height: 100%;

          overflow: hidden;

          background: #faf9fc;

          z-index: 1;
        }

        .hero-copy {
          position: absolute;
          z-index: 30;

          top: 229px;

          left: 0;
          right: 0;

          width: 744px;
          margin-left: auto;
          margin-right: auto;

          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 20px;

          text-align: center;
        }

        .hero-copy h1 {
          width: 652px;
          max-width: 100%;

          margin: 0;

          font-family: var(--font-instrument-sans), 'Instrument Sans', sans-serif;
          font-size: 56px;
          line-height: 70px;
          font-weight: 600;
          letter-spacing: -3px;

          color: #262626;

          text-align: center;
        }

        .hero-copy p {
          width: 100%;
          max-width: 744px;

          margin: 0;

          font-family: var(--font-lato-fc), 'Lato', sans-serif;
          font-size: 20px;
          line-height: 32px;
          font-weight: 400;
          letter-spacing: -0.4px;

          color: #262626;

          text-align: center;
        }

        .hero-button {
          height: 48px;

          padding: 12px 24px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 6px;

          border-radius: 8px;

          background: #57058b;
          color: #f8fafc;

          text-decoration: none;

          font-family: var(--font-lato-fc), 'Lato', sans-serif;
          font-size: 16px;
          line-height: 24px;
          font-weight: 500;

          transition:
            transform 180ms ease,
            background 180ms ease;
        }

        .hero-button:hover {
          transform: translateY(-2px);
          background: #7805c4;
        }

        .hero-arrow {
          font-size: 20px;
          line-height: 1;
        }

        /* =====================================================
           BACKGROUND BLOBS
        ===================================================== */

        .hero-blob {
          position: absolute;

          z-index: 1;

          pointer-events: none;

          border-radius: 50%;

          filter: blur(70px);

          opacity: 0.75;

          animation: blobFloat 15s ease-in-out infinite;
        }

        .hero-blob-purple {
          width: 780px;
          height: 780px;

          left: max(calc(50% - 1039px), -319px);
          top: 152px;

          background: rgba(191, 77, 255, 0.4);
        }

        .hero-blob-blue {
          width: 650px;
          height: 650px;

          left: calc(50% + 228px);
          top: 170px;

          background: rgba(125, 166, 255, 0.27);

          animation-delay: -4s;
        }

        .hero-blob-yellow {
          width: 720px;
          height: 720px;

          left: calc(50% + 180px);
          top: 380px;

          background: rgba(255, 214, 84, 0.32);

          animation-delay: -8s;
        }

        .hero-blob-dark {
          width: 500px;
          height: 500px;

          left: max(calc(50% - 870px), -150px);
          top: 500px;

          background: rgba(33, 0, 47, 0.12);

          animation-delay: -11s;
        }

        @keyframes blobFloat {
          0%,
          100% {
            transform: scale(1);
          }

          25% {
            transform: translate(35px, -20px) scale(1.04);
          }

          50% {
            transform: translate(55px, 25px) scale(0.96);
          }

          75% {
            transform: translate(15px, 40px) scale(1.04);
          }
        }

        /* =====================================================
           CREATOR ARC
           DESKTOP - UNCHANGED
        ===================================================== */

        .creator-arc {
          position: absolute;

          z-index: 20;

          top: 0;
          left: 50%;

          width: 1440px;
          height: 795px;

          transform: translateX(-50%);

          pointer-events: none;
        }

        .creator {
          position: absolute;

          overflow: hidden;

          background: transparent;

          border: none;

          box-shadow: none;

          pointer-events: auto;

          isolation: isolate;
        }

        .creator-image {
          position: absolute !important;

          inset: -12% !important;

          width: 124% !important;
          height: 124% !important;

          max-width: none !important;
          max-height: none !important;

          object-fit: cover !important;
          object-position: center !important;

          display: block !important;

          transform: none !important;
        }

        /* Creator 1 */

        .creator-1 {
          left: 43px;
          top: 414px;

          width: 106px;
          height: 140px;

          border-radius: 53px 53px 12px 12px;
        }

        .creator-1 .creator-image {
          inset: -10% -14% !important;

          width: 128% !important;
          height: 120% !important;

          object-position: center center !important;
        }

        /* Creator 2 */

        .creator-2 {
          left: 197px;
          top: 507px;

          width: 78px;
          height: 126px;

          border-radius: 999px;
        }

        .creator-2 .creator-image {
          inset: -9% -38% !important;

          width: 176% !important;
          height: 118% !important;

          object-fit: cover !important;
          object-position: center center !important;
        }

        /* Creator 3 */

        .creator-3 {
          left: 318px;
          top: 578px;

          width: 112px;
          height: 112px;

          border-radius: 999px;
        }

        .creator-3 .creator-image {
          inset: -13% !important;

          width: 126% !important;
          height: 126% !important;

          object-position: center center !important;
        }

        /* Creator 4 */

        .creator-4 {
          left: 474px;
          top: 625px;

          width: 89px;
          height: 104px;

          border-radius: 25px;
        }

        .creator-4 .creator-image {
          inset: -13% -14% !important;

          width: 128% !important;
          height: 126% !important;

          object-position: center center !important;
        }

        /* Creator 5 */

        .creator-5 {
          left: 602px;
          top: 649px;

          width: 96px;
          height: 96px;

          border-radius: 999px;
        }

        .creator-5 .creator-image {
          inset: -16% !important;

          width: 132% !important;
          height: 132% !important;

          object-position: center center !important;
        }

        /* Creator 6 */

        .creator-6 {
          left: 752px;
          top: 647px;

          width: 67px;
          height: 100px;

          border-radius: 38px 38px 12px 12px;
        }

        .creator-6 .creator-image {
          inset: -10% -18% !important;

          width: 136% !important;
          height: 120% !important;

          object-position: center center !important;
        }

        /* Creator 7 */

        .creator-7 {
          left: 876px;
          top: 623px;

          width: 93px;
          height: 108px;

          border-radius: 26px;
        }

        .creator-7 .creator-image {
          inset: -12% -14% !important;

          width: 128% !important;
          height: 124% !important;

          object-position: center center !important;
        }

        /* Creator 8 */

        .creator-8 {
          left: 1007px;
          top: 577px;

          width: 114px;
          height: 114px;

          border-radius: 999px;
        }

        .creator-8 .creator-image {
          inset: -14% !important;

          width: 128% !important;
          height: 128% !important;

          object-position: center center !important;
        }

        /* Creator 9 */

        .creator-9 {
          left: 1165px;
          top: 506px;

          width: 79px;
          height: 128px;

          border-radius: 999px;
        }

        .creator-9 .creator-image {
          inset: -9% -38% !important;

          width: 176% !important;
          height: 118% !important;

          object-fit: cover !important;
          object-position: center center !important;
        }

        /* Creator 10 */

        .creator-10 {
          left: 1290px;
          top: 413px;

          width: 108px;
          height: 142px;

          border-radius: 54px 54px 12px 12px;
        }

        .creator-10 .creator-image {
          inset: -10% -14% !important;

          width: 128% !important;
          height: 124% !important;

          object-position: center center !important;
        }

        /* =====================================================
           CHIPS
        ===================================================== */

        .hero-chip {
          position: absolute;

          display: flex;
          align-items: center;

          gap: 6px;

          padding: 6px 12px 6px 10px;

          background: #ffffff;

          border-radius: 999px;

          box-shadow: 0 8px 20px -4px rgba(56, 13, 102, 0.18);

          font-family: var(--font-lato-fc), 'Lato', sans-serif;
          font-size: 12px;
          line-height: 16px;
          font-weight: 600;
          letter-spacing: 0.2px;

          color: #262626;

          white-space: nowrap;
        }

        .hero-chip-booked {
          left: 727px;
          top: 613px;
        }

        .hero-chip-subscribers {
          left: 1089px;
          top: 610px;
        }

        .chip-dot {
          width: 8px;
          height: 8px;

          border-radius: 50%;

          flex: 0 0 8px;
        }

        .purple-dot {
          background: #a51cff;
        }

        .blue-dot {
          background: #155dfc;
        }

        /* =====================================================
           TOOLS INTRO
        ===================================================== */

        .tools-intro {
          width: 100%;

          padding: 80px;

          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 16px;

          text-align: center;

          background: #ffffff;
        }

        .tools-intro h2 {
          width: 610px;

          margin: 0;

          font-family: var(--font-instrument-sans), 'Instrument Sans', sans-serif;
          font-size: 40px;
          line-height: 48px;
          font-weight: 600;
          letter-spacing: -1.5px;

          color: #262626;
        }

        .tools-intro p {
          width: 610px;

          margin: 0;

          font-family: var(--font-lato-fc), 'Lato', sans-serif;
          font-size: 20px;
          line-height: 32px;
          font-weight: 400;
          letter-spacing: -0.4px;

          color: #737373;
        }

        .purple-button {
          min-height: 48px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 6px;

          padding: 12px 24px;

          border-radius: 8px;

          background: #57058b;
          color: #f8fafc;

          text-decoration: none;

          font-family: var(--font-lato-fc), 'Lato', sans-serif;
          font-size: 16px;
          line-height: 24px;
          font-weight: 500;

          transition: 180ms ease;
        }

        .purple-button:hover {
          background: #7805c4;
          transform: translateY(-2px);
        }

        /* =====================================================
           TOOL ROWS
        ===================================================== */

        .tools-section {
          width: 100%;

          padding: 0 80px 80px;

          background: #ffffff;
        }

        .tools-rows {
          width: 1280px;
          max-width: 100%;

          margin: 0 auto;

          display: flex;
          flex-direction: column;

          gap: 100px;
        }

        .tool-row {
          width: 100%;
          min-height: 554px;

          display: flex;
          align-items: center;
          justify-content: flex-end;

          gap: 80px;
        }

        .tool-row-reverse {
          flex-direction: row-reverse;
          justify-content: flex-end;
        }

        .tool-copy {
          width: 552px;
          flex: 0 0 552px;

          display: flex;
          flex-direction: column;
          align-items: flex-start;

          gap: 16px;

          min-width: 0;

          opacity: 1;
          visibility: visible;
        }

        .tool-copy h3 {
          width: 100%;

          margin: 0;

          display: block;

          font-family: var(--font-instrument-sans), 'Instrument Sans', sans-serif;
          font-size: 32px;
          line-height: 44px;
          font-weight: 600;
          letter-spacing: -1.2px;

          color: #262626;
        }

        .tool-copy h4 {
          width: 100%;

          margin: 0;

          display: block;

          font-family: var(--font-instrument-sans), 'Instrument Sans', sans-serif;
          font-size: 20px;
          line-height: 24px;
          font-weight: 500;
          letter-spacing: -0.7px;

          color: #262626;
        }

        .tool-copy p {
          width: 100%;

          margin: 0;

          display: block;

          font-family: var(--font-lato-fc), 'Lato', sans-serif;
          font-size: 20px;
          line-height: 28px;
          font-weight: 400;
          letter-spacing: -0.4px;

          color: #6b6b6b;
        }

        .visual-card {
          position: relative;

          width: 608px;
          height: 554px;

          flex: 0 0 608px;

          overflow: hidden;

          border-radius: 32px;
        }

        .visual-card-image {
          position: absolute !important;

          inset: 0 !important;

          width: 100% !important;
          height: 100% !important;

          object-fit: cover !important;
        }

        /* =====================================================
           COMMUNITY
        ===================================================== */

        .community-section {
          width: 100%;

          padding: 80px;

          background: #f5f5f4;

          border-radius: 32px 32px 0 0;

          overflow: hidden;
        }

        .community-head {
          width: 100%;

          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 48px;

          text-align: center;
        }

        .community-head h2 {
          width: 430px;

          margin: 0;

          font-family: var(--font-instrument-sans), 'Instrument Sans', sans-serif;
          font-size: 40px;
          line-height: 48px;
          font-weight: 600;
          letter-spacing: -1.5px;

          color: #262626;
        }

        .community-head p {
          width: 514px;

          margin: -28px 0 0;

          font-family: var(--font-lato-fc), 'Lato', sans-serif;
          font-size: 16px;
          line-height: 24px;
          font-weight: 500;
          letter-spacing: -0.2px;

          color: #737373;
        }

        .community-window {
          width: 100%;

          margin-top: 48px;

          overflow: hidden;
        }

        .community-track {
          display: flex;

          width: max-content;

          gap: 16px;

          /* trailing gap so the -50% loop lands exactly on the duplicate set */
          padding-right: 16px;
        }

        .community-photo {
          position: relative;

          width: 200px;
          height: 300px;

          flex: 0 0 200px;

          overflow: hidden;

          border-radius: 16px;
        }

        .community-photo-image {
          position: absolute !important;

          inset: 0 !important;

          width: 100% !important;
          height: 100% !important;

          object-fit: cover !important;
        }

        /* =====================================================
           STARTER
        ===================================================== */

        .starter-section {
          width: 100%;

          padding: 64px;

          background: #ffffff;

          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 32px;
        }

        .starter-inner {
          width: 100%;
          max-width: 560px;

          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 16px;

          text-align: center;
        }

        .starter-title {
          margin: 0;

          font-family: var(--font-instrument-sans), 'Instrument Sans', sans-serif;
          font-size: 40px;
          line-height: 48px;
          font-weight: 600;
          letter-spacing: -1.5px;

          color: #262626;
        }

        .starter-text {
          max-width: 418px;

          margin: 0 0 8px;

          font-family: var(--font-lato-fc), 'Lato', sans-serif;
          font-size: 16px;
          line-height: 24px;
          font-weight: 400;
          letter-spacing: -0.2px;

          color: #737373;
        }

        .builder-note {
          display: none;

          margin: 8px 0 0;

          font-family: var(--font-lato-fc), 'Lato', sans-serif;
          font-size: 14px;
          line-height: 20px;

          color: #737373;
        }

        .builder-note a {
          display: block;

          margin-top: 4px;

          font-weight: 700;

          color: #57058b;

          text-decoration: none;
        }

        /* =====================================================
           FAQ
        ===================================================== */

        .faq-section {
          width: 100%;

          padding: 64px 24px;

          background: #fafaf9;
        }

        .faq-inner {
          width: 768px;
          max-width: 100%;

          margin: 0 auto;
        }

        .faq-header {
          display: flex;
          flex-direction: column;
          align-items: center;

          text-align: center;

          margin-bottom: 48px;
        }

        .faq-header h2 {
          margin: 0;

          font-family: var(--font-instrument-sans), 'Instrument Sans', sans-serif;
          font-size: 40px;
          line-height: 48px;
          font-weight: 600;
          letter-spacing: -1.5px;

          color: #262626;
        }

        .faq-header p {
          margin: 8px 0 0;

          font-family: var(--font-lato-fc), 'Lato', sans-serif;
          font-size: 16px;
          line-height: 24px;
          font-weight: 500;
          letter-spacing: -0.2px;

          color: #737373;
        }

        .faq-list {
          width: 720px;
          max-width: 100%;

          margin: 0 auto;

          display: flex;
          flex-direction: column;

          gap: 12px;
        }

        .faq-item {
          border-bottom: 1px solid #e7e5e4;

          background: #fafaf9;
        }

        .faq-item summary {
          min-height: 56px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 24px;

          padding: 16px;

          cursor: pointer;

          list-style: none;

          font-family: var(--font-lato-fc), 'Lato', sans-serif;
          font-size: 16px;
          line-height: 24px;
          font-weight: 500;
          letter-spacing: -0.2px;

          color: #1a002e;
        }

        .faq-item summary::-webkit-details-marker {
          display: none;
        }

        .faq-chevron {
          width: 16px;
          height: 16px;

          flex: 0 0 16px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 18px;

          transition: transform 180ms ease;
        }

        .faq-item[open] .faq-chevron {
          transform: rotate(180deg);
        }

        .faq-plus {
          position: relative;

          display: none;

          width: 14px;
          height: 14px;

          flex: 0 0 14px;
        }

        .faq-plus::before,
        .faq-plus::after {
          content: '';

          position: absolute;

          top: 50%;
          left: 0;

          width: 14px;
          height: 1.5px;

          margin-top: -0.75px;

          background: #262626;

          transition: transform 180ms ease;
        }

        .faq-plus::after {
          transform: rotate(90deg);
        }

        .faq-item[open] .faq-plus::after {
          transform: rotate(0deg);
        }

        .faq-item[open] > p {
          animation: faqReveal 320ms ease-out;
        }

        @keyframes faqReveal {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .faq-item summary:hover {
          color: #57058b;
        }

        .community-photo {
          transition: transform 300ms ease;
        }

        .community-photo:hover {
          transform: translateY(-6px) scale(1.03);
        }

        .faq-item p {
          margin: 0;

          padding: 0 16px 16px;

          font-family: var(--font-lato-fc), 'Lato', sans-serif;
          font-size: 14px;
          line-height: 20px;
          font-weight: 400;

          color: #737373;
        }

        /* =====================================================
           FINAL CTA
        ===================================================== */

        .final-cta {
          width: 100%;

          height: 388px;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 64px;

          background: #fbf3ff;

          border-radius: 16px;
        }

        /* the Reveal wrapper is the flex item - let it shrink on small screens */
        .final-cta > div {
          width: 100%;
          max-width: 880px;

          min-width: 0;
        }

        .final-cta-inner {
          width: 100%;

          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 16px;

          text-align: center;
        }

        .final-cta h2 {
          width: 478px;

          margin: 0;

          font-family: var(--font-instrument-sans), 'Instrument Sans', sans-serif;
          font-size: 40px;
          line-height: 48px;
          font-weight: 600;
          letter-spacing: -1.5px;

          color: #262626;
        }

        .final-cta p {
          width: 418px;

          margin: 0;

          font-family: var(--font-lato-fc), 'Lato', sans-serif;
          font-size: 16px;
          line-height: 28px;
          font-weight: 500;
          letter-spacing: -0.2px;

          color: #737373;
        }

        .final-buttons {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 24px;
        }

        .white-button {
          min-height: 48px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          padding: 12px 24px;

          border: 1px solid #e2e8f0;

          border-radius: 8px;

          background: #ffffff;

          color: #262626;

          text-decoration: none;

          font-family: var(--font-lato-fc), 'Lato', sans-serif;
          font-size: 14px;
          line-height: 20px;
          font-weight: 500;

          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1200px) {
          .tools-section {
            padding-left: 32px;
            padding-right: 32px;
          }

          .tool-row {
            gap: 40px;
          }

          .tool-copy {
            width: 45%;
            flex: 0 1 45%;
          }

          .visual-card {
            width: 52%;
            flex: 0 1 52%;
          }
        }

        @media (max-width: 900px) {
          .hero-copy {
            top: 190px;

            width: 680px;
          }

          .hero-copy h1 {
            font-size: 48px;
            line-height: 58px;
          }

          .hero-copy p {
            font-size: 18px;
            line-height: 28px;
          }

          .tools-intro {
            padding: 64px 24px;
          }

          .tools-intro h2,
          .tools-intro p {
            width: 100%;
            max-width: 610px;
          }

          .tools-section {
            padding: 0 24px 64px;
          }

          .tools-rows {
            gap: 64px;
          }

          .tool-row,
          .tool-row-reverse {
            flex-direction: column;
            align-items: stretch;

            gap: 32px;
          }

          .tool-copy,
          .visual-card {
            width: 100%;
            flex: none;
          }

          .visual-card {
            height: auto;

            aspect-ratio: 608 / 554;
          }

          .community-section {
            padding: 64px 24px;
          }

          .community-head {
            gap: 32px;
          }

          .community-head h2,
          .community-head p {
            width: 100%;
            max-width: 514px;
          }

          .starter-section {
            padding: 64px 24px;
          }
        }

        /* =====================================================
           MOBILE
           ONLY MOBILE IS CHANGED BELOW
        ===================================================== */

        @media (max-width: 640px) {
          /*
            HERO

            The mobile hero is intentionally taller than the
            original version. This gives the navigation, headline,
            description, button and creator arc their own space.
          */

          .scn-hero {
            height: 545px;
          }

          .hero-background {
            width: 100%;
            height: 545px;
          }

          /*
            MOBILE HERO COPY

            More top spacing so the headline does not sit against
            the header/navigation.
          */

          .hero-copy {
            top: 120px;

            width: calc(100% - 40px);
            max-width: 600px;

            gap: 16px;

            z-index: 40;
          }

          .hero-copy h1 {
            width: 100%;

            font-size: 34px;
            line-height: 40px;

            letter-spacing: -1.5px;
          }

          .hero-copy p {
            width: 100%;

            font-size: 16px;
            line-height: 24px;

            letter-spacing: -0.2px;
          }

          .hero-button {
            height: 46px;

            padding: 11px 22px;
          }

          /*
            =====================================================
            MOBILE CREATOR ARC  (Figma: For Creators – Mobile › Hero › Creator arc)
            =====================================================

            The mobile design uses 6 portraits, not 10, laid out
            in a 342 x 96 arc that sits 20px under the Join button,
            with about 60px of hero below it:

              Creator 1  (arch)      left 0    top 4   52 x 68
              Creator 3  (circle)    left 62   top 35  54 x 54
              Creator 4  (squircle)  left 125  top 48  41 x 48
              Creator 7  (squircle)  left 176  top 48  41 x 48
              Creator 5  (circle)    left 226  top 35  54 x 54
              Creator 10 (arch)      left 290  top 4   52 x 68
          */

          .creator-arc {
            position: absolute;

            top: 386px;
            left: 50%;

            width: 342px;
            height: 96px;

            transform: translateX(-50%);

            pointer-events: none;

            z-index: 20;
          }

          /* Not part of the mobile composition. */

          .creator-2,
          .creator-6,
          .creator-8,
          .creator-9 {
            display: none;
          }

          .creator {
            pointer-events: auto;
          }

          /* Creator 1 · arch, far left */

          .creator-1 {
            left: 0;
            top: 4px;

            width: 52px;
            height: 68px;

            border-radius: 26px 26px 10px 10px;
          }

          .creator-1 .creator-image {
            inset: -10% -14% !important;

            width: 128% !important;
            height: 120% !important;
          }

          /* Creator 3 · circle */

          .creator-3 {
            left: 62px;
            top: 35px;

            width: 54px;
            height: 54px;

            border-radius: 999px;
          }

          .creator-3 .creator-image {
            inset: -13% !important;

            width: 126% !important;
            height: 126% !important;
          }

          /* Creator 4 · squircle, lowest point (left of centre) */

          .creator-4 {
            left: 125px;
            top: 48px;

            width: 41px;
            height: 48px;

            border-radius: 11px;
          }

          .creator-4 .creator-image {
            inset: -13% -14% !important;

            width: 128% !important;
            height: 126% !important;
          }

          /* Creator 7 · squircle, lowest point (right of centre) */

          .creator-7 {
            left: 176px;
            top: 48px;

            width: 41px;
            height: 48px;

            border-radius: 11px;
          }

          .creator-7 .creator-image {
            inset: -12% -14% !important;

            width: 128% !important;
            height: 124% !important;
          }

          /* Creator 5 · circle */

          .creator-5 {
            left: 226px;
            top: 35px;

            width: 54px;
            height: 54px;

            border-radius: 999px;
          }

          .creator-5 .creator-image {
            inset: -16% !important;

            width: 132% !important;
            height: 132% !important;
          }

          /* Creator 10 · arch, far right */

          .creator-10 {
            left: 290px;
            top: 4px;

            width: 52px;
            height: 68px;

            border-radius: 26px 26px 10px 10px;
          }

          .creator-10 .creator-image {
            inset: -10% -14% !important;

            width: 128% !important;
            height: 124% !important;
          }

          /*
            Hide the floating desktop chips on mobile.
            They are not part of the mobile composition.
          */

          .hero-chip {
            display: none;
          }

          /* =====================================================
             MOBILE CONTENT BELOW HERO
          ===================================================== */

          .tools-intro {
            padding: 56px 20px;
          }

          .tools-intro h2 {
            font-size: 26px;
            line-height: 32px;
            letter-spacing: -1px;
          }

          .tools-intro p {
            font-size: 16px;
            line-height: 24px;
          }

          .tools-section {
            padding: 0 20px 56px;
          }

          .tools-rows {
            gap: 56px;
          }

          .tool-row,
          .tool-row-reverse {
            min-height: 0;

            gap: 20px;
          }

          .tool-copy {
            gap: 8px;
          }

          .tool-copy h3 {
            font-size: 24px;
            line-height: 30px;
            letter-spacing: -0.8px;
          }

          .tool-copy h4 {
            font-size: 16px;
            line-height: 22px;
          }

          .tool-copy p {
            font-size: 15px;
            line-height: 22px;
          }

          .visual-card {
            border-radius: 20px;
          }

          .community-section {
            padding: 56px 20px;
          }

          .community-head h2 {
            font-size: 26px;
            line-height: 32px;
            letter-spacing: -1px;
          }

          .community-head p {
            font-size: 15px;
          }

          .community-section {
            background: #fbf3ff;
          }

          .starter-section {
            padding: 56px 20px;
          }

          .starter-title {
            font-size: 26px;
            line-height: 32px;
            letter-spacing: -1px;
          }

          .builder-note {
            display: block;
          }

          .faq-section {
            padding: 56px 20px;
          }

          .faq-header h2 {
            font-size: 26px;
            line-height: 32px;
            letter-spacing: -1px;

            white-space: normal;
          }

          .faq-item summary {
            font-size: 15px;
          }

          .faq-chevron {
            display: none;
          }

          .faq-plus {
            display: block;
          }

          .faq-list {
            gap: 0;
          }

          .final-cta {
            height: auto;

            min-height: 388px;

            padding: 56px 20px;
          }

          .final-cta h2,
          .final-cta p {
            width: 100%;
          }

          .final-cta h2 {
            font-size: 26px;
            line-height: 32px;
            letter-spacing: -1px;
          }

          .final-buttons {
            flex-direction: column;

            width: 100%;
          }

          .final-buttons a {
            width: 100%;

            max-width: 320px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </>
  );
}
