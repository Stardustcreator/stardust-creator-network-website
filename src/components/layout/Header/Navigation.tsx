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
    label: 'For Creators',
    href: '/creators',
    children: [
      { label: 'Join Our Network', href: '/creators/join' },
      { label: 'Creator Opportunities', href: '/creators/opportunities' },
      { label: 'Success Stories', href: '/creators/stories' },
      { label: 'Creator Resources', href: '/creators/resources' },
    ],
  },
  {
    label: 'For Brands',
    href: '/brands',
    children: [
      { label: 'Find Creators', href: '/brands/find' },
      { label: 'Campaign Examples', href: '/brands/campaigns' },
      { label: 'How It Works', href: '/brands/process' },
    ],
  },
  {
    label: 'SCN Community',
    href: '/community',
    children: [
      { label: "What's Included", href: '/community/features' },
      { label: 'Join Waitlist', href: '/community/waitlist' },
    ],
  },
  {
    label: 'Creator OS',
    href: '/creator-os',
  },
  {
    label: 'About',
    href: '/about',
  },
];

interface NavigationProps {
  className?: string;
}

export function Navigation({ className = '' }: NavigationProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className={`${className}`}>
      <ul className="flex items-center gap-8">
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
                <button className="flex items-center gap-1 text-neutral-700 hover:text-brand-purple font-medium transition-colors py-2">
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
                  className={`absolute top-full left-0 mt-1 w-64 bg-white border border-neutral-200 rounded-lg shadow-lg transition-all duration-200 ${
                    activeDropdown === item.label
                      ? 'opacity-100 visible transform translate-y-0'
                      : 'opacity-0 invisible transform -translate-y-2'
                  }`}
                >
                  <div className="py-2">
                    {item.children.map(child => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2 text-neutral-700 hover:text-brand-purple hover:bg-neutral-50 transition-colors"
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
                className="text-neutral-700 hover:text-brand-purple font-medium transition-colors py-2"
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
