'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heading, Text } from '@/components/typography';

export default function Footer() {
  return (
    <footer
      className="bg-gradient-footer rounded-t-footer border-t border-white/10 py-16"
      style={{
        background: 'linear-gradient(135deg, #57058B 0%, #000000 100%)',
        borderRadius: '40px 40px 0 0',
      }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <Image
                src="/logos/scn logo white.png"
                alt="Stardust Creator Network Logo"
                width={100}
                height={40}
                className="object-contain"
                sizes="(max-width: 480px) 80px, (max-width: 768px) 90px, 100px"
                loading="lazy"
              />
            </div>
            <Text
              variant="small"
              className="text-white/80 mb-6"
            >
              Building the infrastructure that turns creativity into sustainable business.
            </Text>
            <div className="flex gap-5">
              <Link
                href="https://www.instagram.com/stardustcreatornetwork/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-400 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
              <Link
                href="https://www.tiktok.com/@stardustcreatornetwork"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-400 transition-colors"
                aria-label="TikTok"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </Link>
              <Link
                href="https://www.youtube.com/@StardustCreatorNetwork"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-400 transition-colors"
                aria-label="YouTube"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link>
              <Link
                href="https://www.linkedin.com/company/stardust-creator-network"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-400 transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* For Creators */}
          <div>
            <Heading
              level={4}
              variant="default"
              className="!text-white text-xs font-semibold mb-4"
              as="h4"
            >
              For Creators
            </Heading>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/creators/join"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Join Our Network
                </Link>
              </li>
              <li>
                <Link
                  href="/creators/opportunities"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Creator Opportunities
                </Link>
              </li>
              <li>
                <Link
                  href="/creators/stories"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/creators/resources"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Creator Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing-calculator"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Pricing Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* For Brands */}
          <div>
            <Heading
              level={4}
              variant="default"
              className="!text-white text-xs font-semibold mb-4"
              as="h4"
            >
              For Brands
            </Heading>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/brands/brief"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Find a Creator
                </Link>
              </li>
              <li>
                <Link
                  href="/case-studies"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Campaign Examples
                </Link>
              </li>
              <li>
                <Link
                  href="/brands/process"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <Heading
              level={4}
              variant="default"
              className="!text-white text-xs font-semibold mb-4"
              as="h4"
            >
              Company
            </Heading>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/#who-we-are"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm cursor-pointer bg-transparent border-none p-0"
                >
                  Join Waitlist
                </button>
              </li>
              <li>
                <Link
                  href="/#creator-os"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  CreatorOS
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 mt-12 border-t border-white/10">
          <Text
            variant="small"
            className="text-white opacity-40"
          >
            © 2025 Stardust Creator Network. Powered by Intense Group.
          </Text>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link
              href="/legal/privacy"
              className="text-gray-500 hover:text-purple-400 transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/terms"
              className="text-gray-500 hover:text-purple-400 transition-colors text-sm"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
