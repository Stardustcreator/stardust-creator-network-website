'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

// Animated Counter Component
function AnimatedMetric({ value, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasStarted = useRef(false);

  useEffect(() => {
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

          <div className="relative z-10 px-4 py-12 sm:py-16 md:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="font-bricolage-grotesque text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 text-white leading-tight">
                Find the Right Creators for Your Campaign
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 md:mb-10 leading-relaxed font-lato">
                Brief us. We match you with vetted Nigerian creators, handle the coordination, and
                deliver the shortlist within your timeline.
              </p>

              <Link href="/brief">
                <button
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:opacity-90 transition-all text-sm sm:text-base"
                  style={{ backgroundColor: '#57058B', color: 'white' }}
                >
                  Start brief
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
            </div>
          </div>
        </section>

        {/* Logos Section */}
        <section className="w-full py-8 sm:py-10 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="w-full flex items-center justify-center">
              <Image
                src="/who we are/logos.webp"
                alt="Brand logos"
                width={1200}
                height={80}
                className="object-contain"
                quality={100}
                priority
              />
            </div>
          </div>
        </section>

        {/* Process Section Title */}
        <section
          className="w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8"
          style={{ backgroundColor: '#FBF3FF' }}
        >
          <div className="max-w-6xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="font-bricolage-grotesque text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
              From Brief to Live Campaign,
              <br className="hidden sm:block" />
              Executed by the Right Creators
            </h2>
          </div>

          {/* Cards Section */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-6 sm:p-7 md:p-8 shadow-sm transition-all hover:shadow-md"
                  style={{
                    borderRadius: '20px',
                    padding: '28px 32px',
                  }}
                >
                  <div
                    className="text-6xl sm:text-7xl md:text-8xl font-bold mb-4 leading-none"
                    style={{
                      color: '#EDE3FF',
                      fontSize: '72px',
                      fontFamily: 'var(--font-bricolage-grotesque)',
                    }}
                  >
                    {card.number}
                  </div>

                  <h3 className="font-bricolage-grotesque text-lg sm:text-xl md:text-2xl font-bold text-black mb-3 sm:mb-4">
                    {card.title}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-lato">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-bricolage-grotesque text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight mb-3 sm:mb-4">
                Brands who've already found their match
              </h2>
              <p className="text-sm sm:text-base text-gray-600 font-lato">
                A look at the campaigns we've run and the numbers behind them.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 md:gap-8 mb-10 md:mb-12 auto-rows-max">
              {/* Card 1 - Honeywell */}
              <div
                className="flex flex-col h-full"
                style={{
                  backgroundColor: '#FAFAF9',
                  border: '1px solid #E7E5E4',
                  borderRadius: '12px',
                  padding: '24px',
                }}
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
              </div>

              {/* Card 2 - Leadway */}
              <div
                className="flex flex-col h-full"
                style={{
                  backgroundColor: '#FAFAF9',
                  border: '1px solid #E7E5E4',
                  borderRadius: '12px',
                  padding: '24px',
                }}
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
              </div>

              {/* Card 3 - AXA Mansard */}
              <div
                className="flex flex-col h-full"
                style={{
                  backgroundColor: '#FAFAF9',
                  border: '1px solid #E7E5E4',
                  borderRadius: '12px',
                  padding: '24px',
                }}
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
              </div>
            </div>

            <div className="flex justify-center">
              <Link href="/case-studies">
                <button
                  className="px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:opacity-90 transition-all text-sm sm:text-base"
                  style={{ backgroundColor: '#57058B', color: 'white' }}
                >
                  See more
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section
          className="w-full py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 text-center"
          style={{ backgroundColor: '#FAFAF9' }}
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="font-bricolage-grotesque text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-black leading-tight">
              Ready to Find Creators Who Help You Achieve Your Campaign Goals?
            </h2>

            <p className="text-sm sm:text-base md:text-lg leading-relaxed font-lato text-gray-700 mb-6 sm:mb-8 md:mb-10">
              Tell us about your brand and your campaign objective. We will match you with the right
              creators from our vetted pool within your timeline.
            </p>

            <Link href="/brief">
              <button
                className="px-5 sm:px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:opacity-90 transition-all text-sm sm:text-base"
                style={{ backgroundColor: '#57058B', color: 'white' }}
              >
                Sign Up Now
              </button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
