'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navigationItems, type NavigationItem } from './navigation.constants';

interface MobileTopNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileTopNavigation({ isOpen, onClose }: MobileTopNavigationProps) {
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
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-all duration-300 lg:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* Mobile Menu Panel - Full Height Dropdown */}
      <div
        className={`fixed top-20 left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-white/10 z-50 lg:hidden transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="container mx-auto px-6 py-6">
          {/* Navigation Links */}
          <nav className="mb-6">
            <ul className="space-y-2">
              {navigationItems.map(item => (
                <li key={item.label}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleExpanded(item.label)}
                        className="flex items-center justify-between w-full text-left text-white hover:text-purple-300 font-medium transition-all py-3 px-4 rounded-lg hover:bg-white/10"
                      >
                        <span>{item.label}</span>
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
                        <ul className="ml-4 mt-2 space-y-1 border-l-2 border-purple-300/30 pl-4">
                          {item.children.map(child => (
                            <li key={child.label}>
                              <Link
                                href={child.href}
                                onClick={onClose}
                                className="block text-gray-300 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
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
                      className="block text-white hover:text-purple-300 font-medium transition-all py-3 px-4 rounded-lg hover:bg-white/10"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3">
            <Link
              href="/creators/join"
              onClick={onClose}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3 rounded-lg font-medium transition-all text-center shadow-lg"
            >
              Join as Creator
            </Link>
            <Link
              href="/brands/find"
              onClick={onClose}
              className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-6 py-3 rounded-lg font-medium transition-all text-center"
            >
              Find Creators
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
