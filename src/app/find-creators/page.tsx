'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

// Animated Counter Component
function AnimatedMetric({ value, label }) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);
  const hasStarted = React.useRef(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;

          const targetValue = parseInt(value.toString().replace(/[^0-9]/g, ''));
          const isMillion = value.toString().includes('m');
          const isDecimal = value.toString().includes('.');

          let startValue = isMillion ? 1000000 : 0;
          let duration = 2000;
          let startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            let currentValue;
            if (isDecimal) {
              currentValue = (targetValue * progress).toFixed(1);
            } else {
              currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
            }

            setCount(currentValue);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          animate();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref}>
      <p className="text-sm text-gray-500 font-lato mb-1">{label}</p>
      <p className="text-lg font-bold text-black">
        {value.toString().includes('m') && count > 1000000
          ? `${(count / 1000000).toFixed(0)}m`
          : count}
        {value.toString().includes('%') ? '%' : ''}
        {value.toString().includes('+') &&
        count.toString() === value.toString().replace(/[^0-9.]/g, '')
          ? '+'
          : ''}
      </p>
    </div>
  );
}

export default function FindCreatorsPage() {
  const cards = [
    {
      number: '01',
      title: 'You fill the brief',
      description:
        'Takes under 2 minutes. Tell us your niche, your goals, and what a successful campaign looks like for your brands, and we will use this information to recommend the right creators for your campaign.',
    },
    {
      number: '02',
      title: 'We match creators',
      description:
        'Our team reviews your brief and handpicks creators whose audience, niche, and content style actually fit your brand, delivered to you within 24 hours, not weeks.',
    },
    {
      number: '03',
      title: 'You approve',
      description:
        'Review the shortlist at your own pace. Pick your favourites yourself, or tell us your priorities and let our team make the call for you.',
    },
    {
      number: '04',
      title: 'Campaign goes live',
      description:
        "Once you've approved your creators, we handle the rest; briefing them on your goals, managing delivery and deadlines, and tracking performance so you always know what's working.",
    },
  ];

  const brands = [
    { name: 'Honeywell', logo: '/brand logos/honeywell.webp' },
    { name: 'Chevrolet', logo: '/brand logos/chevrolet.webp' },
    { name: 'FMN', logo: '/brand logos/fmn.webp' },
    { name: 'Golden Penny', logo: '/brand logos/golden penny.webp' },
    { name: 'Daily Trust', logo: '/brand logos/daily trust.webp' },
    { name: 'Leadway', logo: '/brand logos/leadway.webp' },
  ];

  // Animation Variants
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.2 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.4 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
      },
    }),
  };

  const caseCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
      },
    }),
    hover: {
      y: -8,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <section className="relative w-full h-screen min-h-[500px] sm:min-h-[600px] flex items-center justify-center overflow-hidden">
          <Image
            src="/who we are/find a creator.webp"
            alt="Find Creators Hero"
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
            className="relative z-10 px-4 py-12 sm:py-16 md:px-6 lg:px-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-3xl mx-auto">
              <motion.h1
                className="font-bricolage-grotesque text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 text-white leading-tight"
                variants={titleVariants}
                initial="hidden"
                animate="visible"
              >
                Find the Right Creators for Your Campaign
              </motion.h1>

              <motion.p
                className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 md:mb-10 leading-relaxed font-lato"
                variants={subtitleVariants}
                initial="hidden"
                animate="visible"
              >
                Brief us. We match you with vetted Nigerian creators, handle the coordination, and
                deliver the shortlist within your timeline.
              </motion.p>

              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
              >
                <Link href="/brief">
                  <button
                    className="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:opacity-90 transition-all text-sm sm:text-base"
                    style={{ backgroundColor: '#57058B', color: 'white' }}
                  >
                    Start Your Brief
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

        {/* Logos Section - Animated Scrolling */}
        <section className="w-full py-4 sm:py-5 md:py-8 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-300 border-b">
          <div className="container mx-auto px-6">
            <div className="relative overflow-hidden">
              <div
                className="absolute left-0 top-0 bottom-0 w-24 md:w-32 lg:w-40 bg-gradient-to-r z-10 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(to right, #ffffff, transparent)' }}
              />

              <div
                className="absolute right-0 top-0 bottom-0 w-24 md:w-32 lg:w-40 bg-gradient-to-l z-10 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(to left, #ffffff, transparent)' }}
              />

              <motion.div
                className="flex gap-4 md:gap-6 lg:gap-8 animate-scroll-logos"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {brands.map((brand, index) => (
                  <motion.div
                    key={brand.name}
                    className="group cursor-pointer shrink-0 flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                  >
                    <div className="w-14 h-10 md:w-16 md:h-12 lg:w-20 lg:h-14 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        width={80}
                        height={60}
                        className="object-contain max-w-full max-h-full transition-all duration-300"
                        sizes="(max-width: 480px) 56px, (max-width: 768px) 64px, (max-width: 1024px) 80px, 80px"
                        loading="lazy"
                      />
                    </div>
                  </motion.div>
                ))}
                {brands.map((brand, index) => (
                  <motion.div
                    key={`${brand.name}-duplicate`}
                    className="group cursor-pointer shrink-0 flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 + 0.3, duration: 0.5 }}
                  >
                    <div className="w-14 h-10 md:w-16 md:h-12 lg:w-20 lg:h-14 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        width={80}
                        height={60}
                        className="object-contain max-w-full max-h-full transition-all duration-300"
                        sizes="(max-width: 480px) 56px, (max-width: 768px) 64px, (max-width: 1024px) 80px, 80px"
                        loading="lazy"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section
          className="w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8"
          style={{ backgroundColor: '#FBF3FF' }}
        >
          <div className="max-w-6xl mx-auto text-center mb-12 md:mb-16">
            <motion.h2
              className="font-bricolage-grotesque text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              From Brief to Live Campaign,
              <br className="hidden sm:block" />
              Executed by the Right Creators
            </motion.h2>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-3xl p-6 sm:p-7 md:p-8 shadow-sm transition-all hover:shadow-lg"
                  style={{
                    borderRadius: '20px',
                    padding: '28px 32px',
                  }}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ y: -8 }}
                >
                  <motion.div
                    className="text-6xl sm:text-7xl md:text-8xl font-bold mb-4 leading-none"
                    style={{
                      color: '#EDE3FF',
                      fontSize: '72px',
                      fontFamily: 'var(--font-bricolage-grotesque)',
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                  >
                    {card.number}
                  </motion.div>

                  <motion.h3
                    className="font-bricolage-grotesque text-lg sm:text-xl md:text-2xl font-bold text-black mb-3 sm:mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                  >
                    {card.title}
                  </motion.h3>

                  <motion.p
                    className="text-sm sm:text-base text-gray-700 leading-relaxed font-lato"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                  >
                    {card.description}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <motion.h2
                className="font-bricolage-grotesque text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight mb-3 sm:mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
              >
                Brands who've already found their match
              </motion.h2>
              <motion.p
                className="text-sm sm:text-base text-gray-600 font-lato"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                A look at the campaigns we've run and the numbers behind them.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 md:gap-8 mb-10 md:mb-12 auto-rows-max">
              {/* Card 1 - Honeywell */}
              <motion.div
                className="flex flex-col h-full"
                style={{
                  backgroundColor: '#FAFAF9',
                  border: '1px solid #E7E5E4',
                  borderRadius: '12px',
                  padding: '24px',
                }}
                custom={0}
                variants={caseCardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, amount: 0.3 }}
              >
                <h3 className="font-bricolage-grotesque text-sm sm:text-base font-bold text-black mb-4 tracking-wide">
                  HONEYWELL RELAUNCH
                </h3>

                <div className="mb-6 h-24 flex items-center">
                  <div
                    className="relative w-20 h-20 flex items-center justify-center"
                    style={{ backgroundColor: '#F5F5F5', borderRadius: '8px' }}
                  >
                    <Image
                      src="/brand logos/honeywell.webp"
                      alt="Honeywell"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 font-lato mb-6 leading-relaxed">
                  A comprehensive relaunch campaign that connected Honeywell with top creators to
                  drive brand awareness and engagement.
                </p>

                <h4 className="text-xs font-bold text-gray-500 mb-4 tracking-widest">
                  MONTHLY INTERACTIONS RESULTS
                </h4>

                <div className="grid grid-cols-2 gap-4 mb-6 flex-grow">
                  <AnimatedMetric
                    value="70m"
                    label="Total Impression"
                  />
                  <AnimatedMetric
                    value="26m+"
                    label="Reach"
                  />
                  <AnimatedMetric
                    value="5m+"
                    label="Total Engagement"
                  />
                  <AnimatedMetric
                    value="7.2%"
                    label="Engagement rate"
                  />
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full font-lato">
                    Technology
                  </span>
                  <span className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full font-lato">
                    Relaunch
                  </span>
                  <span className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full font-lato">
                    Brand Awareness
                  </span>
                </div>

                <Link
                  href="/case-studies/honeywell"
                  className="w-full mt-auto"
                >
                  <button
                    className="w-full px-6 py-2.5 rounded text-center font-medium hover:opacity-90 transition-all text-xs sm:text-sm"
                    style={{
                      backgroundColor: '#F1F5F9',
                      color: '#262626',
                    }}
                  >
                    View Case Study
                  </button>
                </Link>
              </motion.div>

              {/* Card 2 - Leadway */}
              <motion.div
                className="flex flex-col h-full"
                style={{
                  backgroundColor: '#FAFAF9',
                  border: '1px solid #E7E5E4',
                  borderRadius: '12px',
                  padding: '24px',
                }}
                custom={1}
                variants={caseCardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, amount: 0.3 }}
              >
                <h3 className="font-bricolage-grotesque text-sm sm:text-base font-bold text-black mb-4 tracking-wide">
                  LEADWAY TRAVEL INSURANCE CAMPAIGN
                </h3>

                <div className="mb-6 h-24 flex items-center">
                  <div
                    className="relative w-20 h-20 flex items-center justify-center"
                    style={{ backgroundColor: '#2D2D2D', borderRadius: '8px' }}
                  >
                    <Image
                      src="/brand logos/original leadway.webp"
                      alt="Leadway"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 font-lato mb-6 leading-relaxed">
                  A strategic travel insurance campaign that educated young Nigerians traveling
                  abroad about travel insurance while positioning Leadway as the accessible, trusted
                  choice for protection.
                </p>

                <h4 className="text-xs font-bold text-gray-500 mb-4 tracking-widest">
                  MONTHLY INTERACTIONS RESULTS
                </h4>

                <div className="grid grid-cols-2 gap-4 mb-6 flex-grow">
                  <AnimatedMetric
                    value="93k+"
                    label="Views"
                  />
                  <AnimatedMetric
                    value="18.3k+"
                    label="Likes"
                  />
                  <AnimatedMetric
                    value="500+"
                    label="Comments"
                  />
                  <AnimatedMetric
                    value="344"
                    label="Saves"
                  />
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full font-lato">
                    Technology
                  </span>
                  <span className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full font-lato">
                    Relaunch
                  </span>
                  <span className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full font-lato">
                    Brand Awareness
                  </span>
                </div>

                <Link
                  href="/case-studies/leadway"
                  className="w-full mt-auto"
                >
                  <button
                    className="w-full px-6 py-2.5 rounded text-center font-medium hover:opacity-90 transition-all text-xs sm:text-sm"
                    style={{
                      backgroundColor: '#F1F5F9',
                      color: '#262626',
                    }}
                  >
                    View Case Study
                  </button>
                </Link>
              </motion.div>

              {/* Card 3 - AXA Mansard */}
              <motion.div
                className="flex flex-col h-full"
                style={{
                  backgroundColor: '#FAFAF9',
                  border: '1px solid #E7E5E4',
                  borderRadius: '12px',
                  padding: '24px',
                }}
                custom={2}
                variants={caseCardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, amount: 0.3 }}
              >
                <h3 className="font-bricolage-grotesque text-sm sm:text-base font-bold text-black mb-4 tracking-wide">
                  AXA MANSARD AUTOFLEX
                </h3>

                <div className="mb-6 h-24 flex items-center">
                  <div
                    className="relative w-20 h-20 flex items-center justify-center"
                    style={{ backgroundColor: '#F5F5F5', borderRadius: '8px' }}
                  >
                    <Image
                      src="/brand logos/image.webp"
                      alt="AXA Mansard"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 font-lato mb-6 leading-relaxed">
                  A comprehensive motor insurance campaign aimed at providing flexibility to vehicle
                  owners who are price sensitive but still need comprehensive insurance coverage.
                </p>

                <h4 className="text-xs font-bold text-gray-500 mb-4 tracking-widest">
                  MONTHLY INTERACTIONS RESULTS
                </h4>

                <div className="grid grid-cols-2 gap-4 mb-6 flex-grow">
                  <AnimatedMetric
                    value="68%"
                    label="Impression"
                  />
                  <AnimatedMetric
                    value="18.3k+"
                    label="CPA"
                  />
                  <AnimatedMetric
                    value="6.1x"
                    label="ROAS"
                  />
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full font-lato">
                    Technology
                  </span>
                  <span className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full font-lato">
                    Relaunch
                  </span>
                  <span className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full font-lato">
                    Brand Awareness
                  </span>
                </div>

                <Link
                  href="/case-studies/axa"
                  className="w-full mt-auto"
                >
                  <button
                    className="w-full px-6 py-2.5 rounded text-center font-medium hover:opacity-90 transition-all text-xs sm:text-sm"
                    style={{
                      backgroundColor: '#F1F5F9',
                      color: '#262626',
                    }}
                  >
                    View Case Study
                  </button>
                </Link>
              </motion.div>
            </div>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/case-studies">
                <button
                  className="px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:opacity-90 transition-all text-sm sm:text-base"
                  style={{ backgroundColor: '#57058B', color: 'white' }}
                >
                  See more
                </button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <motion.section
          className="w-full py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 text-center"
          style={{ backgroundColor: '#FAFAF9' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl mx-auto">
            <motion.h2
              className="font-bricolage-grotesque text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-black leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Ready to Find Creators Who Help You Achieve Your Campaign Goals?
            </motion.h2>

            <motion.p
              className="text-sm sm:text-base md:text-lg leading-relaxed font-lato text-gray-700 mb-6 sm:mb-8 md:mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Tell us about your brand and your campaign objective. We will match you with the right
              creators from our vetted pool within your timeline.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/brief">
                <button
                  className="px-5 sm:px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:opacity-90 transition-all text-sm sm:text-base"
                  style={{ backgroundColor: '#57058B', color: 'white' }}
                >
                  Sign Up Now
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </>
  );
}
