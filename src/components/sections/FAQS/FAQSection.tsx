'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const faqs = [
  {
    question: 'What is Stardust Creator Network?',
    answer:
      'Stardust Creator Network, SCN, is a creator business platform and community for African creators. It gives creators the tools, education, and brand connections they need to build a sustainable creator income - from rate card calculators and professional invoicing to brand deal access and a live creator community. Think of it as the operating system for your creator business.',
  },
  {
    question: 'Who can join SCN?',
    answer:
      ' SCN is for any creator who is ready to move beyond just posting and start building a real creator business. Whether you are just starting out, trying to land your first brand deal, or already working with brands but want better rates and more structure, SCN is built for you. You do not need a large following to join - you need the right tools and the right knowledge.',
  },
  {
    question: 'How do I know what to charge for a brand deal?',
    answer:
      'The SCN rate card calculator helps you generate an accurate quote for every campaign based on your deliverables, usage rights, platform, and niche - so you always have a number you can justify. You can also produce a professional invoice directly from the calculator to send to your client.',
  },
  {
    question: 'Do I need a media kit?',
    answer:
      'Yes. A media kit significantly increases your chances of landing brand deals because it shows brands who you are, who your audience is, and why working with you is worth the investment. Inside SCN, you will learn how to build a professional creator profile and media kit, and the SCN creator dashboard gives you a storefront where brands can discover and book you directly.',
  },
  {
    question: 'Can I get paid with a small following?',
    answer:
      'Yes. Follower count is just one factor in how much you earn as a creator. UGC is one of the most effective ways to earn from your content even without a large following, because brands pay for the quality of the content, not just the reach. On the SCN creator dashboard, you can add your UGC services to your storefront so clients can book you directly.',
  },
  {
    question: 'How do I find brands to work with?',
    answer:
      'Through the SCN brand desk, vetted creators get direct access to brand campaigns from brands that are already looking for creators and ready to pay. Sign up now to get connected.',
  },
  {
    question: 'Is SCN only for Nigerian creators?',
    answer:
      ' SCN is built for African creators, starting in Nigeria. Our tools, education, and community are designed with the realities of the African creator economy in mind - not adapted from Western templates that do not reflect how brands and creators work here. As we grow, SCN will expand to serve creators across the continent and beyond.',
  },
  {
    question: 'Where can I find a community of like-minded creators?',
    answer:
      'The SCN community connects you with ambitious African creators who are building in the same direction. You get access to live business clinics, peer accountability, collaboration opportunities, and people who are one step ahead of where you are right now. Click above to join the SCN community.',
  },
];

export default function FAQSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
      },
    }),
  };

  return (
    <section className="relative w-full py-16 sm:py-20 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Title */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-3"
            style={{
              fontFamily: 'var(--font-bricolage-grotesque)',
              letterSpacing: '-0.02em',
            }}
          >
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={subtitleVariants}
        >
          <p
            className="text-gray-600 text-base sm:text-lg"
            style={{
              fontFamily: 'var(--font-lato)',
            }}
          >
            Things most people want to know before they sign up.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4 sm:space-y-5">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={itemVariants}
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-4 rounded-lg transition-all duration-300 hover:bg-gray-50"
                style={{
                  backgroundColor: expandedIndex === index ? '#F5F5F5' : '#FAFAF9',
                  borderColor: '#E7E5E4',
                  borderWidth: '1px',
                }}
              >
                {/* Question */}
                <h3
                  className="text-left text-sm sm:text-base font-semibold text-black"
                  style={{
                    fontFamily: 'var(--font-bricolage-grotesque)',
                  }}
                >
                  {faq.question}
                </h3>

                {/* Chevron Icon */}
                <motion.svg
                  className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 ml-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 9l6 6 6-6"
                  />
                </motion.svg>
              </button>

              {/* Answer - Expandable */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: expandedIndex === index ? 'auto' : 0,
                  opacity: expandedIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div
                  className="px-6 py-5 text-sm sm:text-base leading-relaxed text-gray-700"
                  style={{
                    fontFamily: 'var(--font-lato)',
                  }}
                >
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
