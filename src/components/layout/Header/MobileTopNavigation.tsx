'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navigationItems } from './navigation.constants';
import CountrySelector from './CountrySelector';

interface MobileTopNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  menuId: string;
}

export function MobileTopNavigation({ isOpen, onClose, menuId }: MobileTopNavigationProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch by only rendering interactive content after mount
  useEffect(() => {
    // This is necessary for preventing hydration mismatch in Next.js
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const toggleExpanded = (label: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(label)) {
      newExpanded.delete(label);
    } else {
      newExpanded.add(label);
    }
    setExpandedItems(newExpanded);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') {
      return undefined;
    }

    const { body } = document;
    const originalOverflow = body.style.overflow;

    if (isOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = originalOverflow;
    }

    return () => {
      body.style.overflow = originalOverflow;
    };
  }, [isOpen, isMounted]);

  // Prevent hydration mismatch - render consistent structure on server
  if (!isMounted) {
    return (
      <div
        id={menuId}
        role="dialog"
        aria-modal="false"
        className="fixed top-0 left-0 right-0 bottom-0 h-screen bg-black/95 backdrop-blur-lg z-50 lg:hidden transform -translate-y-full opacity-0 pointer-events-none"
        aria-hidden="true"
      />
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm transition-all duration-300 lg:hidden z-40 ${
          isOpen
            ? 'opacity-100 visible pointer-events-auto'
            : 'opacity-0 invisible pointer-events-none'
        }`}
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Mobile Menu Panel - Full Height Dropdown */}
      <div
        id={menuId}
        role="dialog"
        aria-modal="true"
        onClick={e => e.stopPropagation()}
        className={`fixed top-0 left-0 right-0 bottom-0 h-screen bg-black/95 backdrop-blur-lg z-50 lg:hidden transform transition-all duration-300 ease-in-out overflow-y-auto ${
          isOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        {/* Header with Logo and Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 sticky top-0 bg-black/95 backdrop-blur-lg z-10">
          {/* Logo */}
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center text-white hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logos/scn logo white.png"
              alt="Stardust Creator Network Logo"
              width={120}
              height={48}
              className="object-contain"
              priority
            />
          </Link>

          {/* Close Button */}
          <button
            type="button"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="p-2 text-white hover:text-purple-300 transition-colors rounded-lg hover:bg-white/10"
            aria-label="Close navigation menu"
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

          {/* Country Selector */}
          <div className="mb-6">
            <CountrySelector variant="mobile" />
          </div>

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
