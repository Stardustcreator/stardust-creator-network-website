'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

export default function CreatorOSPage() {
  // Animation Variants
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.2, ease: 'easeOut' },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <section className="relative w-full h-screen min-h-[500px] sm:min-h-[600px] flex items-center justify-center overflow-hidden">
          <Image
            src="/who we are/HERO IMAGE.webp"
            alt="Creator OS Hero"
            fill
            priority
            className="object-cover object-center"
            quality={90}
          />

          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(87, 5, 139, 0.15)' }}
          />

          <motion.div
            className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-24 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-full max-w-4xl mx-auto">
              <motion.h1
                className="mb-6 sm:mb-8 md:mb-12 text-white"
                style={{
                  fontFamily: 'var(--font-bricolage-grotesque)',
                  fontSize: 'clamp(32px, 6vw, 56px)',
                  fontWeight: 700,
                  lineHeight: 'clamp(40px, 8vw, 68px)',
                  letterSpacing: '-2px',
                }}
                variants={titleVariants}
                initial="hidden"
                animate="visible"
              >
                Everything You Need to Run Your Creator Business, Finally in One Place
              </motion.h1>

              <motion.p
                className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-8 sm:mb-10 md:mb-12 leading-relaxed font-lato max-w-4xl mx-auto"
                variants={subtitleVariants}
                initial="hidden"
                animate="visible"
              >
                When your tools are scattered, your business feels scattered. SCN gives you one
                place to price your work, get paid, grow your audience, and connect with brands.
              </motion.p>

              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
              >
                <Link href="/creators/join">
                  <button
                    className="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:opacity-90 transition-all text-sm sm:text-base"
                    style={{ backgroundColor: '#57058B', color: 'white' }}
                  >
                    Join the Network
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="hidden sm:inline"
                    >
                      <path
                        d="M4 10H16M16 10L11 5M16 10L11 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
