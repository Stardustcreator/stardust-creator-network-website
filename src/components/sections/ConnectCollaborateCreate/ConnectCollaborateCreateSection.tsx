'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ConnectCollaborateCreateSection() {
  // Animation variants for the heading
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  // Animation for card titles
  const cardTitleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  // Animation for card descriptions
  const cardDescVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.1,
        ease: 'easeOut',
      },
    },
  };

  // Animation for card images
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const words = ['All', 'features', 'for', 'your', 'creator', 'business', 'in', 'One', 'place'];

  return (
    <section
      id="features-section"
      className="relative py-16 sm:py-20 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#FBF3FF' }}
    >
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          {/* ANIMATED HEADING */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {words.map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black"
                style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          {/* Subheading */}
          <p
            className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-lato)' }}
          >
            Everything you need — in one place, not scattered across five tools.
          </p>
        </div>

        {/* Card 1: Storefront */}
        <div className="max-w-6xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-lg">
            {/* Left: Text Content */}
            <div
              className="p-6 sm:p-8 md:p-10 flex flex-col justify-center"
              style={{ backgroundColor: '#FAFAF9' }}
            >
              {/* ANIMATED CARD TITLE */}
              <motion.h3
                className="text-2xl sm:text-3xl md:text-3xl font-bold text-black mb-4"
                style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
                variants={cardTitleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                Storefront
              </motion.h3>

              {/* ANIMATED CARD DESCRIPTION */}
              <motion.p
                className="text-gray-700 text-sm sm:text-base md:text-base mb-6 leading-relaxed"
                style={{ fontFamily: 'var(--font-lato)' }}
                variants={cardDescVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                Create a store that turns visitors into customers. Sell your products to anyone,
                anywhere, anytime.
              </motion.p>

              {/* Bullet Points */}
              <ul className="space-y-3 sm:space-y-4 mb-8">
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-orange-500 mt-1 font-bold">✓</span>
                  <span
                    className="text-sm sm:text-base"
                    style={{ fontFamily: 'var(--font-lato)' }}
                  >
                    Launch your online store in minutes, one place to showcase your products, manage
                    orders, and grow your brand
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-orange-500 mt-1 font-bold">✓</span>
                  <span
                    className="text-sm sm:text-base"
                    style={{ fontFamily: 'var(--font-lato)' }}
                  >
                    Reach customers from every channel with a single storefront link.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-orange-500 mt-1 font-bold">✓</span>
                  <span
                    className="text-sm sm:text-base"
                    style={{ fontFamily: 'var(--font-lato)' }}
                  >
                    Built for creators who want real sales, not just window shoppers.
                  </span>
                </li>
              </ul>

              {/* Button */}
              <Link href="/signin">
                <button
                  className="inline-flex items-center justify-center px-6 sm:px-7 md:px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all text-sm sm:text-base"
                  style={{ backgroundColor: '#57058B', color: 'white' }}
                >
                  Create Your Storefront
                </button>
              </Link>
            </div>

            {/* Right: Image - FULL HEIGHT */}
            <motion.div
              className="relative h-full overflow-hidden min-h-96"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <Image
                src="/who we are/creator business right.webp"
                alt="Storefront feature"
                fill
                className="object-cover"
                quality={90}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>

        {/* Card 2: Audience Builder */}
        <div className="max-w-6xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-lg">
            {/* Left: Image - FULL HEIGHT */}
            <motion.div
              className="relative h-full overflow-hidden min-h-96 order-2 lg:order-1"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <Image
                src="/who we are/MAN ON THE LEFT.webp"
                alt="Audience Builder feature"
                fill
                className="object-cover"
                quality={90}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            {/* Right: Text Content */}
            <div
              className="p-6 sm:p-8 md:p-10 flex flex-col justify-center order-1 lg:order-2"
              style={{ backgroundColor: '#FAFAF9' }}
            >
              {/* ANIMATED CARD TITLE */}
              <motion.h3
                className="text-2xl sm:text-3xl md:text-3xl font-bold text-black mb-4"
                style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
                variants={cardTitleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                Audience Builder
              </motion.h3>

              {/* ANIMATED CARD DESCRIPTION */}
              <motion.p
                className="text-gray-700 text-sm sm:text-base md:text-base mb-6 leading-relaxed"
                style={{ fontFamily: 'var(--font-lato)' }}
                variants={cardDescVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                Grow your subscriber list, keep your audience engaged, and reach them with
                broadcasts that feel personal — all from one place.
              </motion.p>

              {/* Bullet Points */}
              <ul className="space-y-3 sm:space-y-4 mb-8">
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-orange-500 mt-1 font-bold">✓</span>
                  <span
                    className="text-sm sm:text-base"
                    style={{ fontFamily: 'var(--font-lato)' }}
                  >
                    Build and grow your subscriber base with embeddable sign-up forms and landing
                    pages
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-orange-500 mt-1 font-bold">✓</span>
                  <span
                    className="text-sm sm:text-base"
                    style={{ fontFamily: 'var(--font-lato)' }}
                  >
                    Keep subscribers engaged with automated sequences, tags, and personalized
                    content
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-orange-500 mt-1 font-bold">✓</span>
                  <span
                    className="text-sm sm:text-base"
                    style={{ fontFamily: 'var(--font-lato)' }}
                  >
                    Send broadcast emails to thousands of subscribers in seconds – no technical
                    skills needed
                  </span>
                </li>
              </ul>

              {/* Button */}
              <Link href="/signin">
                <button
                  className="inline-flex items-center justify-center px-6 sm:px-7 md:px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all text-sm sm:text-base"
                  style={{ backgroundColor: '#57058B', color: 'white' }}
                >
                  Grow Your Audience
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Card 3: Rate Calculator */}
        <div className="max-w-6xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-lg">
            {/* Left: Text Content */}
            <div
              className="p-6 sm:p-8 md:p-10 flex flex-col justify-center"
              style={{ backgroundColor: '#FAFAF9' }}
            >
              {/* ANIMATED CARD TITLE */}
              <motion.h3
                className="text-2xl sm:text-3xl md:text-3xl font-bold text-black mb-4"
                style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
                variants={cardTitleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                Rate Calculator
              </motion.h3>

              {/* ANIMATED CARD DESCRIPTION */}
              <motion.p
                className="text-gray-700 text-sm sm:text-base md:text-base mb-6 leading-relaxed"
                style={{ fontFamily: 'var(--font-lato)' }}
                variants={cardDescVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                Know exactly what to charge brands before your next deal. Our rate calculator helps
                creators set fair, data-backed prices for sponsored posts, UGC, and brand
                partnerships.
              </motion.p>

              {/* Bullet Points */}
              <ul className="space-y-3 sm:space-y-4 mb-8">
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-orange-500 mt-1 font-bold">✓</span>
                  <span
                    className="text-sm sm:text-base"
                    style={{ fontFamily: 'var(--font-lato)' }}
                  >
                    Set rates based on your reach, engagement, and content type
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-orange-500 mt-1 font-bold">✓</span>
                  <span
                    className="text-sm sm:text-base"
                    style={{ fontFamily: 'var(--font-lato)' }}
                  >
                    Understand your market value across Instagram, TikTok, YouTube, and more
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-orange-500 mt-1 font-bold">✓</span>
                  <span
                    className="text-sm sm:text-base"
                    style={{ fontFamily: 'var(--font-lato)' }}
                  >
                    Walk into every brand deal with confidence and a number that holds up
                  </span>
                </li>
              </ul>

              {/* Button */}
              <Link href="/signin">
                <button
                  className="inline-flex items-center justify-center px-6 sm:px-7 md:px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all text-sm sm:text-base"
                  style={{ backgroundColor: '#57058B', color: 'white' }}
                >
                  Calculate My Rate
                </button>
              </Link>
            </div>

            {/* Right: Image - FULL HEIGHT */}
            <motion.div
              className="relative h-full overflow-hidden min-h-96"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <Image
                src="/who we are/Rate calculator.webp"
                alt="Rate Calculator feature"
                fill
                className="object-cover"
                quality={90}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>

        {/* Card 4: Community */}
        <div className="max-w-6xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-lg">
            {/* Left: 3x3 Image Grid - FULL HEIGHT */}
            <motion.div
              className="relative h-full overflow-hidden min-h-96 order-2 lg:order-1 bg-gray-100"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="p-3 sm:p-4 md:p-6 h-full grid grid-cols-3 gap-2 sm:gap-3">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src="/who we are/1.webp"
                    alt="Community member 1"
                    fill
                    className="object-cover"
                    quality={85}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src="/who we are/2.webp"
                    alt="Community member 2"
                    fill
                    className="object-cover"
                    quality={85}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src="/who we are/3.webp"
                    alt="Community member 3"
                    fill
                    className="object-cover"
                    quality={85}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src="/who we are/4.webp"
                    alt="Community member 4"
                    fill
                    className="object-cover"
                    quality={85}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src="/who we are/5.webp"
                    alt="Community member 5"
                    fill
                    className="object-cover"
                    quality={85}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src="/who we are/6.webp"
                    alt="Community member 6"
                    fill
                    className="object-cover"
                    quality={85}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 33vw"
                    priority={false}
                  />
                </div>
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src="/who we are/7.webp"
                    alt="Community member 7"
                    fill
                    className="object-cover"
                    quality={85}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src="/who we are/8.webp"
                    alt="Community member 8"
                    fill
                    className="object-cover"
                    quality={85}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 33vw"
                    priority={false}
                  />
                </div>
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src="/who we are/9.webp"
                    alt="Community member 9"
                    fill
                    className="object-cover"
                    quality={85}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right: Text Content */}
            <div
              className="p-6 sm:p-8 md:p-10 flex flex-col justify-center order-1 lg:order-2"
              style={{ backgroundColor: '#FAFAF9' }}
            >
              {/* ANIMATED CARD TITLE */}
              <motion.h3
                className="text-2xl sm:text-3xl md:text-3xl font-bold text-black mb-4"
                style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
                variants={cardTitleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                Community
              </motion.h3>

              {/* ANIMATED CARD DESCRIPTION */}
              <motion.p
                className="text-gray-700 text-sm sm:text-base md:text-base mb-6 leading-relaxed"
                style={{ fontFamily: 'var(--font-lato)' }}
                variants={cardDescVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                You're not building alone. Join a thriving network of creators who share ideas, lift
                each other up, and grow together.
              </motion.p>

              {/* Bullet Points */}
              <ul className="space-y-3 sm:space-y-4 mb-8">
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-orange-500 mt-1 font-bold">✓</span>
                  <span
                    className="text-sm sm:text-base"
                    style={{ fontFamily: 'var(--font-lato)' }}
                  >
                    Connect with creators just like you. Swap ideas, share what's working, and learn
                    from people who truly get it
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-orange-500 mt-1 font-bold">✓</span>
                  <span
                    className="text-sm sm:text-base"
                    style={{ fontFamily: 'var(--font-lato)' }}
                  >
                    Bring your community together and discover fellow creators who are on the exact
                    same journey
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-orange-500 mt-1 font-bold">✓</span>
                  <span
                    className="text-sm sm:text-base"
                    style={{ fontFamily: 'var(--font-lato)' }}
                  >
                    Real growth happens in community — surrounded by people who cheer you on every
                    step of the way
                  </span>
                </li>
              </ul>

              {/* Button */}
              <Link href="/signin">
                <button
                  className="inline-flex items-center justify-center px-6 sm:px-7 md:px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all text-sm sm:text-base"
                  style={{ backgroundColor: '#57058B', color: 'white' }}
                >
                  Join the Community
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* See All Features Link */}
        <div className="text-center mt-12 sm:mt-16 md:mt-20">
          <Link
            href="#"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 text-black font-semibold hover:opacity-90 transition-all rounded-lg"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}
          >
            <span style={{ fontFamily: 'var(--font-lato)' }}>See All Features</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 10H16M16 10L11 5M16 10L11 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
