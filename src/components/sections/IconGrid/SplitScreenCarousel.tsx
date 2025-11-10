'use client';

import { useState, useEffect, useCallback } from 'react';
import CarouselVisual from './CarouselVisual';
import CarouselContent from './CarouselContent';
import { carouselSlides } from './carousel-data';

const SLIDE_DURATION = 5000; // 5 seconds

export default function SplitScreenCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = carouselSlides.length;

  // Navigate to next slide
  const goToNextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  }, [totalSlides]);

  // Navigate to previous slide
  const goToPreviousSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Navigate to specific slide
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Auto-advance logic with pause on hover
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      goToNextSlide();
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [isPaused, goToNextSlide]);

  return (
    <div
      className="relative w-full max-w-7xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Carousel Container */}
      <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-[40px] overflow-hidden">
        {/* Split Screen Layout */}
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Visual Placeholder */}
          <div className="w-full md:w-1/2 relative">
            {carouselSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`${index === currentSlide ? 'block' : 'hidden'}`}
              >
                <CarouselVisual
                  slide={slide}
                  isActive={index === currentSlide}
                />
              </div>
            ))}
          </div>

          {/* Right Side - Content */}
          <div className="w-full md:w-1/2 relative border-t md:border-t-0 md:border-l border-white/10">
            {carouselSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`${index === currentSlide ? 'block' : 'hidden'}`}
              >
                <CarouselContent
                  slide={slide}
                  isActive={index === currentSlide}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPreviousSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group z-20"
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6 text-white group-hover:text-purple-300 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={goToNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group z-20"
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6 text-white group-hover:text-purple-300 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-3 mt-8">
        {carouselSlides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className="group relative"
            aria-label={`Go to ${slide.title}`}
          >
            {/* Dot */}
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-gradient-to-r from-purple-400 to-pink-400 scale-125'
                  : 'bg-white/30 group-hover:bg-white/50'
              }`}
            />

            {/* Active Indicator Ring */}
            {index === currentSlide && (
              <div className="absolute inset-0 -m-1.5 border-2 border-purple-400/50 rounded-full animate-pulse" />
            )}

            {/* Progress Ring */}
            {index === currentSlide && !isPaused && (
              <svg
                className="absolute inset-0 -m-2 w-7 h-7 -rotate-90"
                viewBox="0 0 28 28"
              >
                <circle
                  cx="14"
                  cy="14"
                  r="12"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="75.4"
                  strokeDashoffset="0"
                  className="animate-progress"
                  style={{
                    animation: `progress ${SLIDE_DURATION}ms linear`,
                  }}
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      stopColor="#a855f7"
                    />
                    <stop
                      offset="100%"
                      stopColor="#ec4899"
                    />
                  </linearGradient>
                </defs>
              </svg>
            )}
          </button>
        ))}
      </div>

      {/* CSS for progress animation */}
      <style jsx>{`
        @keyframes progress {
          from {
            stroke-dashoffset: 75.4;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
