'use client';

import { useState } from 'react';
import Link from 'next/link';
import { navigationItems, type NavigationItem } from './navigation.constants';

interface TopNavigationProps {
  className?: string;
}

export function TopNavigation({ className = '' }: TopNavigationProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className={`flex items-center ${className}`}>
      <ul className="flex items-center gap-2">
        {navigationItems.map(item => (
          <li
            key={item.label}
            className="relative group"
          >
            {item.children ? (
              <div
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-white/90 hover:text-white hover:bg-white/20 font-medium transition-all duration-300 py-2 px-4 rounded-full whitespace-nowrap backdrop-blur-sm">
                  {item.label}
                  <svg
                    className="w-4 h-4 transition-transform group-hover:rotate-180"
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

                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full left-0 mt-2 w-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl transition-all duration-200 ${
                    activeDropdown === item.label
                      ? 'opacity-100 visible transform translate-y-0'
                      : 'opacity-0 invisible transform -translate-y-2'
                  }`}
                >
                  <div className="py-3">
                    {item.children.map(child => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2 text-white/90 hover:text-white hover:bg-white/20 transition-all duration-200 rounded-lg mx-2"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href={item.href}
                className="text-white/90 hover:text-white hover:bg-white/20 font-medium transition-all duration-300 py-2 px-4 rounded-full whitespace-nowrap backdrop-blur-sm"
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
