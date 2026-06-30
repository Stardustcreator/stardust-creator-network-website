'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const cards = [
  {
    id: 1,
    label: 'Learn',
    description:
      'Access creator-focused education built for the African creator. From pricing your work to understanding usage rights to building a business around your content.',
    buttonText: 'Start Learning',
    buttonLink: '#',
    image: '/who we are/card 1.webp',
  },
  {
    id: 2,
    label: 'Build',
    description:
      'Turn your content into a lasting business. The tools, systems, and strategy to grow something that belongs to you - beyond any algorithm or platform.',
    buttonText: 'Start Building',
    buttonLink: '#',
    image: '/who we are/card 2.webp',
  },
  {
    id: 3,
    label: 'Earn',
    description:
      'Stop guessing what to charge and start earning what your work is worth. Build defensible rates, invoice professionally, and connect with brands already looking for creators like you.',
    buttonText: 'Calculate Rate',
    buttonLink: '#',
    image: '/who we are/card 3.webp',
  },
  {
    id: 4,
    label: 'Grow',
    description:
      'Build an audience you actually own, not just followers on a platform you cannot control. Every visitor to your profile or storefront can join your mailing list.',
    buttonText: 'Grow your List',
    buttonLink: '#',
    image: '/who we are/card 4.webp',
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function WhoScnIsForSection() {
  const words = ['How', 'SCN', 'Helps'];

  return (
    <section className="relative w-full py-16 sm:py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12 sm:mb-16">
          {/* ANIMATED HEADING */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {words.map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                style={{
                  fontFamily: 'var(--font-bricolage-grotesque)',
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 700,
                  lineHeight: '1.3',
                  letterSpacing: '-0.02em',
                  color: '#000000',
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          {/* Rest stays the same */}
          <p
            className="text-black/70 max-w-2xl mx-auto"
            style={{
              fontFamily: 'var(--font-lato)',
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              lineHeight: '1.6',
            }}
          >
            Level up your creator game with the tools you need to learn, grow, monetize, and
            connect-all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {cards.map(card => (
            <div
              key={card.id}
              className="group relative h-96 md:h-[520px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={card.image}
                alt={card.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
              />

              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Content - All at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                {/* Label */}
                <h3
                  className="text-white mb-2"
                  style={{
                    fontFamily: 'var(--font-bricolage-grotesque)',
                    fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {card.label}
                </h3>

                {/* Description */}
                <p
                  className="text-white/90 mb-6 sm:mb-8 text-sm sm:text-base"
                  style={{
                    fontFamily: 'var(--font-lato)',
                    fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                    lineHeight: '1.5',
                  }}
                >
                  {card.description}
                </p>

                {/* Button */}
                <Link href={card.buttonLink}>
                  <button
                    className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all text-sm sm:text-base"
                    style={{ backgroundColor: '#FFFFFF', color: '#000000' }}
                  >
                    {card.buttonText}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline"
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
          ))}
        </div>
      </div>
    </section>
  );
}
