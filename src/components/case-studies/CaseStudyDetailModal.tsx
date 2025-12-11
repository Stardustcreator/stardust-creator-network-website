'use client';

import { useEffect } from 'react';
import { Text } from '@/components/typography';
import type { CaseStudy } from '@/types/case-study.types';

interface CaseStudyDetailModalProps {
  caseStudy: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CaseStudyDetailModal({
  caseStudy,
  isOpen,
  onClose,
}: CaseStudyDetailModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !caseStudy) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="relative w-full max-w-5xl max-h-[90vh] bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button - More visible */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-30 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 border-2 border-white/30 rounded-full text-white transition-all hover:scale-110 hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-purple-400 focus-visible:outline-offset-2 shadow-lg"
          aria-label="Close modal"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Header Section - Better spacing and layout */}
          <div className="relative bg-gradient-to-b from-black via-black to-black/95 border-b border-white/10 pt-16 md:pt-20 pb-10 md:pb-14 px-6 md:px-8">
            {/* Case Study Tag */}
            <div className="mb-6 md:mb-8">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                CASE STUDY
              </span>
            </div>

            {/* Header with Title Only - Content will be added later */}
            <div className="w-full">
              <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-bold">
                {caseStudy.title}
              </h2>
            </div>
          </div>

          {/* Content Section */}
          <div className="px-6 md:px-8 py-8 md:py-12 bg-black">
            <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
              {/* About Header */}
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-white font-semibold">
                  About
                </h2>
              </div>

              {/* Campaign Overview */}
              <section className="space-y-4">
                <h3 className="text-xl md:text-2xl text-white font-semibold mb-4">
                  Campaign Overview
                </h3>
                <Text
                  variant="body"
                  className="text-white/80 leading-relaxed"
                >
                  Honeywell redesigned their product packaging but customers thought the new packs
                  were counterfeit, leading to widespread confusion and sales decline. With Nigeria
                  in the heat of a counterfeit product crisis, the brand needed immediate damage
                  control and consumer education to restore trust.
                </Text>
              </section>

              {/* Strategy & Execution */}
              <section className="space-y-4">
                <h3 className="text-xl md:text-2xl text-white font-semibold mb-4">
                  Strategy & Execution
                </h3>
                <Text
                  variant="body"
                  className="text-white/80 leading-relaxed"
                >
                  The team created and executed a full blown marketing campaign to announce the
                  relaunch, it featured a full content strategy, launch event, digital, experiential
                  and influencer marketing. selected food and lifestyle creators received a box from
                  Honeywell branded &quot;You&apos;ve Been Served&quot;.
                </Text>
              </section>

              {/* Services Provided */}
              <section className="space-y-4">
                <h3 className="text-xl md:text-2xl text-white font-semibold mb-4">
                  Services Provided
                </h3>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>Influencers sourcing and engagement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>Content strategy management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>Creative direction</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>Timeline management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>Legal and usage rights management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>Payment management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>Campaign tracking and reporting</span>
                  </li>
                </ul>
              </section>

              {/* Platforms & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Platforms */}
                <section className="space-y-4">
                  <h3 className="text-xl md:text-2xl text-white font-semibold mb-4">Platforms</h3>
                  <div className="flex items-center gap-4">
                    {/* Instagram Icon */}
                    <a
                      href="#"
                      className="text-white/80 hover:text-purple-400 transition-colors"
                      aria-label="Instagram"
                    >
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    {/* TikTok Icon */}
                    <a
                      href="#"
                      className="text-white/80 hover:text-purple-400 transition-colors"
                      aria-label="TikTok"
                    >
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                    </a>
                    {/* YouTube Icon */}
                    <a
                      href="#"
                      className="text-white/80 hover:text-purple-400 transition-colors"
                      aria-label="YouTube"
                    >
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </div>
                </section>

                {/* Location */}
                <section className="space-y-4">
                  <h3 className="text-xl md:text-2xl text-white font-semibold mb-4">Location</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🇳🇬</span>
                    <Text
                      variant="body"
                      className="text-white/80"
                    >
                      Nigeria
                    </Text>
                  </div>
                </section>
              </div>

              {/* Impact */}
              <section className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="text-xl md:text-2xl text-white font-semibold mb-4">Impact</h3>
                <div className="space-y-3">
                  <Text
                    variant="body"
                    className="text-white/80 leading-relaxed font-semibold"
                  >
                    Over 1M organic views without paid boost, sparking nationwide conversations.
                  </Text>
                  <Text
                    variant="body"
                    className="text-white/80 leading-relaxed"
                  >
                    Exceptional value for mass education
                  </Text>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
