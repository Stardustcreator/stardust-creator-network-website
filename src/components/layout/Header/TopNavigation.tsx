'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { navigationItems } from './navigation.constants';

interface TopNavigationProps {
  className?: string;
  variant?: 'default' | 'light';
}

// Stable className constants to prevent hydration mismatches
// Using template literals to ensure exact string matching
const getLinkClassName = (variant: 'default' | 'light' = 'default') => {
  const baseClasses = [
    'font-medium',
    'transition-all',
    'duration-300',
    'py-2',
    'px-4',
    'rounded-full',
    'whitespace-nowrap',
    'focus-visible:outline-2',
    'focus-visible:outline-purple-400',
    'focus-visible:outline-offset-2',
  ];

  if (variant === 'light') {
    return [...baseClasses, 'text-black', 'hover:text-black', 'hover:bg-black/5'].join(' ');
  }

  return [
    ...baseClasses,
    'text-white/90',
    'hover:text-white',
    'hover:bg-white/10',
    'hover:backdrop-blur-sm',
    'hover:border',
    'hover:border-white/20',
  ].join(' ');
};

export function TopNavigation({ className = '', variant = 'default' }: TopNavigationProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const linkClassName = getLinkClassName(variant);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle click outside and Escape key
  useEffect(() => {
    if (!activeDropdown) return;

    const handleClickOutside = (event: MouseEvent) => {
      const ref = dropdownRefs.current[activeDropdown];
      if (ref && !ref.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [activeDropdown]);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className={`flex items-center ${className}`}>
      <ul className="flex items-center gap-1.5 flex-wrap">
        {navigationItems.map(item => (
          <li
            key={item.label}
            className="relative"
          >
            {item.children ? (
              <div
                ref={el => {
                  dropdownRefs.current[item.label] = el;
                }}
                className="relative"
                onMouseEnter={() => {
                  if (closeTimeoutRef.current) {
                    clearTimeout(closeTimeoutRef.current);
                    closeTimeoutRef.current = null;
                  }
                  setActiveDropdown(item.label);
                }}
                onMouseLeave={() => {
                  // Add delay before closing to allow user to move to dropdown
                  closeTimeoutRef.current = setTimeout(() => {
                    setActiveDropdown(null);
                  }, 300);
                }}
              >
                <div className="flex items-center gap-1 text-white/90 hover:text-white hover:bg-white/10 hover:backdrop-blur-sm hover:border hover:border-white/20 font-medium transition-all duration-300 py-2 px-4 rounded-full whitespace-nowrap">
                  <Link
                    href={item.href}
                    className="flex items-center"
                    onClick={e => {
                      // Allow navigation but don't close dropdown on click
                      e.stopPropagation();
                    }}
                  >
                    {item.label}
                  </Link>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveDropdown(activeDropdown === item.label ? null : item.label);
                    }}
                    className="flex items-center justify-center focus-visible:outline-2 focus-visible:outline-purple-400 focus-visible:outline-offset-2"
                    aria-label="Toggle dropdown menu"
                    aria-expanded={activeDropdown === item.label}
                    aria-haspopup="true"
                  >
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.label ? 'rotate-180' : 'rotate-0'
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
                </div>

                {/* Dropdown Menu - Include gap area in hover zone */}
                {activeDropdown === item.label && (
                  <div
                    className="absolute top-full left-0 -top-2 pt-2"
                    onMouseEnter={() => {
                      if (closeTimeoutRef.current) {
                        clearTimeout(closeTimeoutRef.current);
                        closeTimeoutRef.current = null;
                      }
                      setActiveDropdown(item.label);
                    }}
                    onMouseLeave={() => {
                      closeTimeoutRef.current = setTimeout(() => {
                        setActiveDropdown(null);
                      }, 300);
                    }}
                  >
                    <div
                      className="bg-black/95 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl shadow-black/50 z-50 min-w-[180px]"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      <div className="py-1">
                        {item.children.map(child => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block w-full text-left px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 hover:text-white transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-purple-400 focus-visible:outline-offset-2"
                            suppressHydrationWarning
                            role="menuitem"
                            onClick={() => {
                              if (closeTimeoutRef.current) {
                                clearTimeout(closeTimeoutRef.current);
                                closeTimeoutRef.current = null;
                              }
                              setActiveDropdown(null);
                            }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={item.href}
                className={linkClassName}
                suppressHydrationWarning
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
