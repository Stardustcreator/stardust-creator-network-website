'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Who We Are',
    href: '/#who-we-are',
  },
  {
    label: 'Stardust Creator Community',
    href: '/#stardust-creator-community',
  },
  {
    label: 'Creator OS',
    href: '/#creator-os',
  },
  {
    label: 'Vision',
    href: '/#vision',
  },
];

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (label: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(label)) {
      newExpanded.delete(label);
    } else {
      newExpanded.add(label);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* Side Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-96 max-w-[90vw] z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Background with Gradient - matching Hero section */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-black">
          {/* Gradient Overlay - matching Hero section */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 backdrop-blur-sm bg-white/5">
            <div className="flex items-center">
              <Image
                src="/logos/scn logo white.png"
                alt="Stardust Creator Network Logo"
                width={80}
                height={32}
                className="object-contain"
              />
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Content */}
          <nav className="flex-1 p-6 overflow-y-auto">
            <ul className="space-y-3">
              {navigationItems.map(item => (
                <li key={item.label}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleExpanded(item.label)}
                        className="flex items-center justify-between w-full text-left text-white hover:text-purple-300 font-bold transition-all py-4 px-4 rounded-lg hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-purple-300/30"
                      >
                        <span className="text-xl tracking-tight">{item.label}</span>
                        <svg
                          className={`w-5 h-5 transition-transform ${
                            expandedItems.has(item.label) ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {expandedItems.has(item.label) && (
                        <ul className="ml-6 mt-3 space-y-2 border-l-2 border-purple-300/30 pl-6">
                          {item.children.map(child => (
                            <li key={child.label}>
                              <Link
                                href={child.href}
                                onClick={onClose}
                                className="block text-gray-300 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5 text-lg leading-relaxed"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block text-white hover:text-purple-300 font-bold transition-all py-4 px-4 rounded-lg hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-purple-300/30 text-xl tracking-tight"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Section at Bottom */}
          <div className="p-6 border-t border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="space-y-4">
              <Link
                href="/creators/join"
                onClick={onClose}
                className="block bg-gradient-to-r from-brand-orange to-brand-purple hover:from-brand-orange/90 hover:to-brand-purple/90 text-white px-6 py-4 rounded-lg font-bold transition-all text-center text-lg tracking-tight shadow-lg hover:shadow-purple-500/25"
              >
                Join as Creator
              </Link>
              <Link
                href="/brands/find"
                onClick={onClose}
                className="block bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-purple-300/50 px-6 py-4 rounded-lg font-bold transition-all text-center text-lg tracking-tight backdrop-blur-sm"
              >
                Find Creators
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
