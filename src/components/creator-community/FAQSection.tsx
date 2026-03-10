'use client';

import { useState } from 'react';
import { Heading, Text } from '@/components/typography';
import { MEMBERSHIP_FAQ } from '@/types/creator-community.types';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="text-center mb-12">
        <Heading
          level={2}
          className="text-white text-2xl md:text-3xl lg:text-4xl mb-4"
        >
          Frequently Asked Questions
        </Heading>
        <Text
          variant="large"
          className="text-white/70 max-w-2xl mx-auto"
        >
          Everything you need to know about the Creator Community
        </Text>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {MEMBERSHIP_FAQ.map((faq, index) => (
          <div
            key={faq.id}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors duration-200"
              aria-expanded={openIndex === index}
            >
              <Text
                variant="large"
                className="text-white font-medium pr-4"
              >
                {faq.question}
              </Text>
              <div
                className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              >
                <svg
                  className="w-5 h-5 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-6 pb-6">
                <Text
                  variant="body"
                  className="text-white/70 leading-relaxed"
                >
                  {faq.answer}
                </Text>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="text-center mt-12">
        <Text
          variant="body"
          className="text-white/60 mb-4"
        >
          Still have questions?
        </Text>
        <a
          href="mailto:hello@stardustcreatornetwork.com"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Contact us at hello@stardustcreatornetwork.com
        </a>
      </div>
    </section>
  );
}
