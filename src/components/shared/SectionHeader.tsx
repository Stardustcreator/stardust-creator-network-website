'use client';

import { useEffect, useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Heading, Text } from '@/components/typography';
import type { SectionHeaderProps } from './SectionHeader.types';

export default function SectionHeader({
  words,
  subtitle,
  level = 2,
  staggerDelay = 400,
  className = '',
  subtitleClassName = '',
  headingClassName = '',
  threshold = 0.3,
  rootMargin = '-50px',
  centered = true,
  variant = 'fadeUp',
}: SectionHeaderProps) {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  const [visibleWords, setVisibleWords] = useState<number>(0);

  useEffect(() => {
    if (isIntersecting) {
      // Start the staggered animation
      words.forEach((_, index) => {
        setTimeout(() => {
          setVisibleWords(prev => Math.max(prev, index + 1));
        }, index * staggerDelay);
      });
    }
  }, [isIntersecting, words, staggerDelay]);

  const getAnimationClasses = (wordIndex: number) => {
    const baseClasses = 'inline-block transition-all duration-700 ease-out';
    const isVisible = wordIndex < visibleWords;

    const variants = {
      fadeUp: isVisible
        ? 'opacity-100 translate-y-0 scale-100'
        : 'opacity-0 translate-y-8 scale-95',
      slideIn: isVisible
        ? 'opacity-100 translate-x-0 scale-100'
        : 'opacity-0 -translate-x-8 scale-95',
      scale: isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50',
      flip: isVisible ? 'opacity-100 rotateX-0' : 'opacity-0 rotateX-90',
    };

    return `${baseClasses} ${variants[variant]}`;
  };

  const containerClasses = centered ? `text-center ${className}` : className;

  return (
    <div
      ref={elementRef}
      className={containerClasses}
    >
      {/* Animated Heading */}
      <Heading
        level={level}
        variant="default"
        className={`mb-6 ${headingClassName}`}
      >
        {words.map((word, index) => (
          <span
            key={`${word.text}-${index}`}
            className={`${getAnimationClasses(index)} ${word.className || ''}`}
            style={{
              transitionDelay: isIntersecting ? `${index * 100}ms` : '0ms',
            }}
          >
            {word.text}
            {index < words.length - 1 && ' '}
          </span>
        ))}
      </Heading>

      {/* Subtitle */}
      {subtitle && (
        <Text
          variant="large"
          className="text-white"
          className={`opacity-90 transition-all duration-700 delay-300 ${
            isIntersecting ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-4'
          } ${subtitleClassName}`}
        >
          {subtitle}
        </Text>
      )}
    </div>
  );
}
