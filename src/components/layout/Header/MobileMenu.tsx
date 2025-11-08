'use client';

import { useState } from 'react';
import Link from 'next/link';

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
    label: 'CreatorOS',
    href: '/#creator-os',
  },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
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

  if (!isOpen) return null;

  return (
    <div className="lg:hidden">
      <div
        className="fixed inset-0 z-50 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 z-50 h-full w-80 max-w-sm bg-white shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <span className="text-lg font-semibold text-brand-purple">Menu</span>
          <button
            onClick={onClose}
            className="p-2 text-neutral-600 hover:text-brand-purple transition-colors"
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

        <nav className="p-6">
          <ul className="space-y-4">
            {navigationItems.map(item => (
              <li key={item.label}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleExpanded(item.label)}
                      className="flex items-center justify-between w-full text-left text-neutral-700 hover:text-brand-purple font-medium transition-colors py-2"
                    >
                      {item.label}
                      <svg
                        className={`w-4 h-4 transition-transform ${
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
                      <ul className="ml-4 mt-2 space-y-2">
                        {item.children.map(child => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className="block text-neutral-600 hover:text-brand-purple transition-colors py-1"
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
                    className="block text-neutral-700 hover:text-brand-purple font-medium transition-colors py-2"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile CTAs */}
          <div className="mt-8 space-y-3">
            <Link
              href="/brands/brief"
              onClick={onClose}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-button rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 w-full text-center"
            >
              Find a Creator
            </Link>
            <Link
              href="/creators/join"
              onClick={onClose}
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-purple-500 text-purple-500 text-button rounded-full hover:bg-purple-500 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 w-full text-center"
            >
              Join as Creator
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
