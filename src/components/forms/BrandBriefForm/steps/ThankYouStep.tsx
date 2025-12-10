'use client';

import { useState } from 'react';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type { Country } from '@/types/brand-brief.types';
import CreatorSurvey from '@/components/forms/CreatorSurvey/CreatorSurvey';
import { trackBookCampaignClick, trackOutboundClick } from '@/lib/analytics/eventTracking.utils';

interface ThankYouStepProps {
  country: Country;
}

const getLocationContent = (country: Country) => {
  switch (country) {
    case 'Nigeria':
      return {
        title: "You're all set!",
        message:
          'Our partnerships team will review your brief and contact you within 72 hours with a curated creator shortlist and tailored proposal.',
        communityText:
          'Want to stay ahead of the curve? Join our Marketing Leaders Community focused on driving business growth using insights, case studies, reports, and tools.',
        marketSpecific: 'Nigeria',
      };
    case 'United Kingdom':
      return {
        title: "You're all set!",
        message:
          'Our partnerships team will review your brief and contact you within 72 hours with a curated creator shortlist and tailored proposal.',
        communityText:
          'Want to stay ahead of the curve? Join our Marketing Leaders Community focused on driving business growth using insights, case studies, reports, and tools.',
        marketSpecific: 'United Kingdom',
      };
    default:
      return {
        title: "You're all set!",
        message:
          'Our partnerships team will review your brief and contact you within 72 hours with a curated creator shortlist and tailored proposal.',
        communityText:
          'Want to stay ahead of the curve? Join our Marketing Leaders Community focused on driving business growth using insights, case studies, reports, and tools.',
        marketSpecific: 'Global',
      };
  }
};

export default function ThankYouStep({ country }: ThankYouStepProps) {
  const content = getLocationContent(country);
  const [showSurvey, setShowSurvey] = useState(false);

  return (
    <div className="max-w-3xl mx-auto text-center py-16">
      {/* Success Icon */}
      <div className="w-20 h-20 mx-auto mb-8 bg-linear-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Main Message */}
      <Heading
        as="h1"
        level={1}
        className="text-white mb-6 text-3xl md:text-4xl"
      >
        {content.title}
      </Heading>

      <Text
        variant="large"
        className="text-gray-300 mb-8 leading-relaxed"
      >
        {content.message}
      </Text>

      {/* Community Section */}
      <div className="bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-8 mb-8">
        <Text
          variant="body"
          className="text-purple-200 mb-6"
        >
          {content.communityText}
        </Text>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://growthauthority.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackOutboundClick(
                'https://growthauthority.co.uk/',
                'Join Growth Authority Waitlist',
                { location: 'brand_brief_thank_you' }
              )
            }
            className="group inline-flex items-center justify-center px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
          >
            Join Growth Authority Waitlist
          </a>

          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              trackBookCampaignClick('brand_brief_thank_you');
            }}
            className="group inline-flex items-center justify-center px-6 py-3 border border-purple-400/50 text-purple-300 font-semibold rounded-lg hover:bg-purple-500/10 transition-all duration-300"
          >
            Book a Brand Strategy Call
          </a>

          <a
            href="#"
            className="group inline-flex items-center justify-center px-6 py-3 border border-gray-500/50 text-gray-300 font-semibold rounded-lg hover:bg-gray-500/10 transition-all duration-300"
          >
            Explore Creator Success Stories
          </a>
        </div>
      </div>

      {/* Next Steps Timeline */}
      <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6">
        <Heading
          as="h3"
          level={3}
          className="text-white mb-6 text-xl"
        >
          What happens next?
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">1</span>
            </div>
            <Text
              variant="small"
              className="text-blue-300 font-medium mb-1"
            >
              Brief Review
            </Text>
            <Text
              variant="caption"
              className="text-gray-400"
            >
              Our team analyzes your requirements and matches you with suitable creators
            </Text>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-linear-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">2</span>
            </div>
            <Text
              variant="small"
              className="text-purple-300 font-medium mb-1"
            >
              Creator Shortlist
            </Text>
            <Text
              variant="caption"
              className="text-gray-400"
            >
              Receive a curated list of verified creators with detailed profiles and rates
            </Text>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-linear-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">3</span>
            </div>
            <Text
              variant="small"
              className="text-green-300 font-medium mb-1"
            >
              Campaign Launch
            </Text>
            <Text
              variant="caption"
              className="text-gray-400"
            >
              Start your collaboration with handpicked creators who align with your brand
            </Text>
          </div>
        </div>
      </div>

      {/* Creator Survey Section */}
      <div className="mt-12 mb-8">
        <div className="bg-linear-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-8">
          <Heading
            as="h3"
            level={3}
            className="text-white mb-4 text-xl"
          >
            Help Us Build Better Tools for Creators
          </Heading>
          <Text
            variant="body"
            className="text-blue-200 mb-6"
          >
            Take a 2-minute survey to help us understand creator needs and shape the future of
            Stardust Creator Network. Your feedback will help us prioritize features and build tools
            that matter most to creators like you.
          </Text>
          {!showSurvey ? (
            <button
              type="button"
              onClick={() => setShowSurvey(true)}
              className="inline-flex items-center justify-center px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105"
            >
              Take the 2-Minute Survey
            </button>
          ) : (
            <div className="mt-6">
              <CreatorSurvey
                onComplete={() => {
                  // Survey completed - could show a thank you message or close
                  setShowSurvey(false);
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Social Media Follow Section */}
      <div className="bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6 mb-8">
        <Heading
          as="h3"
          level={3}
          className="text-white mb-4 text-lg"
        >
          Follow us on social media
        </Heading>
        <Text
          variant="small"
          className="text-white opacity-70 mb-4"
        >
          Stay updated with creator marketing insights, success stories, and campaign inspiration
        </Text>
        <div className="flex gap-4 justify-center">
          <a
            href="https://www.instagram.com/stardustcreatornetwork/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition-colors p-2"
            aria-label="Follow us on Instagram"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            href="https://www.tiktok.com/@stardustcreatornetwork"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition-colors p-2"
            aria-label="Follow us on TikTok"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@StardustCreatorNetwork"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition-colors p-2"
            aria-label="Subscribe to our YouTube channel"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/stardust-creator-network"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition-colors p-2"
            aria-label="Connect with us on LinkedIn"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mt-8 text-center">
        <Text
          variant="small"
          className="text-gray-400 mb-2"
        >
          Questions? We&apos;re here to help.
        </Text>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
          <a
            href="mailto:hello@stardustcreatornetwork.com"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            hello@stardustcreatornetwork.com
          </a>
          <span className="hidden sm:block text-gray-600">•</span>
          <a
            href="tel:+2348120364960"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            {country === 'Nigeria' ? '+234 812 036 4960' : '+44 (XXX) XXX-XXXX'}
          </a>
        </div>
      </div>
    </div>
  );
}
