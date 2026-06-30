'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const faqs = [
  {
    question: 'What is Stardust Creator Network?',
    answer:
      'Stardust Creator Network is a creator operating system designed to help African creators build sustainable, profitable businesses. We provide tools, education, and community support for creators at every stage of their journey.',
  },
  {
    question: 'Who can join SCN?',
    answer:
      "SCN is open to creators of all sizes and niches – from emerging creators just starting out to established creators looking to scale. Whether you're a content creator, educator, entertainer, or professional, you're welcome.",
  },
  {
    question: 'How do I know what to charge for a brand deal?',
    answer:
      'Our Rate Calculator tool helps you determine fair pricing based on your audience size, engagement rate, and niche. We also provide templates and frameworks to help you confidently pitch your rates to brands.',
  },
  {
    question: 'Do I need a media kit?',
    answer:
      'Yes, a media kit is essential for pitching to brands. We provide customizable media kit templates that include all the information brands need to make partnership decisions.',
  },
  {
    question: 'Can I get paid with a small following?',
    answer:
      'Absolutely! While follower count matters, brands also value engagement, niche relevance, and audience quality. We help you identify and attract brands that align with your specific audience.',
  },
  {
    question: 'How do I find brands to work with?',
    answer:
      'Through SCN, you get access to our brand network, direct outreach strategies, and templates to pitch brands. We also teach you how to identify brands that align with your values and audience.',
  },
  {
    question: 'Is SCN only for Nigerian creators?',
    answer:
      "While we're based in Nigeria and deeply understand the African creator economy, our tools and community support creators across the continent and beyond.",
  },
  {
    question: 'Where can I find a community of like-minded creators?',
    answer:
      "Our Paid Community brings together serious creators who are focused on building sustainable businesses. You'll get access to monthly clinics, peer networking, and exclusive resources.",
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
