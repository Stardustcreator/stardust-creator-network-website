'use client';

import { useEffect, useRef, useState } from 'react';

const WORDS = [
  { text: 'Backed', isHighlight: false },
  { text: 'by', isHighlight: false },
  { text: 'a', isHighlight: false },
  { text: 'team', isHighlight: false },
  { text: 'that', isHighlight: false },
  { text: 'has', isHighlight: false },
  { text: 'powered', isHighlight: false },
  { text: 'top', isHighlight: true },
  { text: 'brands,', isHighlight: true },
  { text: 'creators,', isHighlight: true },
  { text: 'and', isHighlight: false },
  { text: 'media', isHighlight: true },
  { text: 'campaigns', isHighlight: true },
  { text: 'across', isHighlight: false },
  { text: 'the', isHighlight: false },
  { text: 'globe,', isHighlight: false },
  { text: 'SCN', isHighlight: false },
  { text: 'is', isHighlight: false },
  { text: 'on', isHighlight: false },
  { text: 'a', isHighlight: false },
  { text: 'mission', isHighlight: false },
  { text: 'to', isHighlight: false },
  { text: 'build', isHighlight: false },
  { text: 'the', isHighlight: false },
  { text: 'infrastructure', isHighlight: false },
  { text: 'that', isHighlight: false },
  { text: 'turns', isHighlight: false },
  { text: 'creativity', isHighlight: true },
  { text: 'into', isHighlight: false },
  { text: 'sustainable', isHighlight: true },
  { text: 'business.', isHighlight: true },
];

export default function StatisticsDashboardSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleWords, setVisibleWords] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Reset counter when section comes into view
            setVisibleWords(0);

            // Animate words appearing over time
            const interval = setInterval(() => {
              setVisibleWords(prev => {
                if (prev >= WORDS.length) {
                  clearInterval(interval);
                  return prev;
                }
                return prev + 1;
              });
            }, 120); // 120ms delay between each word

            // Store interval reference for cleanup
            const timeoutId = setTimeout(
              () => {
                clearInterval(interval);
              },
              WORDS.length * 120 + 1000
            );

            return () => {
              clearInterval(interval);
              clearTimeout(timeoutId);
            };
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="vision"
      className="py-32 bg-black"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Label */}
          <div className="mb-8"></div>

          {/* Main Content */}
          <div className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed">
            {WORDS.map((word, index) => (
              <span
                key={index}
                className={`
                  inline transition-all duration-700 ease-out
                  ${
                    index < visibleWords
                      ? 'opacity-100 transform translate-y-0 blur-none'
                      : 'opacity-20 transform translate-y-6 blur-sm'
                  }
                  ${
                    word.isHighlight && index < visibleWords
                      ? 'text-gradient-primary font-semibold'
                      : index < visibleWords
                        ? 'text-white'
                        : 'text-gray-600'
                  }
                `}
                style={{
                  transitionDelay: `${Math.max(0, (index - visibleWords + 1) * 50)}ms`,
                }}
              >
                {word.text}
                {index < WORDS.length - 1 ? ' ' : ''}
              </span>
            ))}
          </div>

          {/* Decorative Element */}
          <div
            className={`
              mt-12 flex justify-center transition-all duration-1000 delay-300
              ${visibleWords >= WORDS.length ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-75'}
            `}
          >
            <div className="w-24 h-1 bg-linear-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
