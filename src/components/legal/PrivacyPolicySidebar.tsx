'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface SidebarItem {
  id: string;
  label: string;
}

const sidebarItems: SidebarItem[] = [
  { id: 'information-we-collect', label: 'Information We Collect' },
  { id: 'how-we-use', label: 'How We Use Your Information' },
  { id: 'cookies-third-party', label: 'Cookies and Third-Party Services' },
  { id: 'data-retention', label: 'Data Retention' },
  { id: 'your-rights', label: 'Your Rights' },
  { id: 'security', label: 'Security' },
  { id: 'updates', label: 'Updates to This Policy' },
  { id: 'contact-us', label: 'Contact Us' },
];

export default function PrivacyPolicySidebar() {
  const [activeSection, setActiveSection] = useState<string>('information-we-collect');

  useEffect(() => {
    const handleScroll = () => {
      const sections = sidebarItems
        .map(item => {
          const element = document.getElementById(item.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            return { id: item.id, top: rect.top, bottom: rect.bottom };
          }
          return null;
        })
        .filter(Boolean) as Array<{ id: string; top: number; bottom: number }>;

      const scrollPosition = window.scrollY + 200; // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].top) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  return (
    <>
      {/* Mobile: Horizontal Scrollable Navigation */}
      <nav className="lg:hidden mb-8 pb-4 border-b border-white/10">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-6 px-6">
          {sidebarItems.map(item => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={`#${item.id}`}
                onClick={e => handleClick(e, item.id)}
                className={`
                  flex-shrink-0 px-4 py-2 text-xs font-medium transition-colors duration-200 rounded-full whitespace-nowrap
                  ${
                    isActive
                      ? 'text-white bg-purple-500/20 border border-purple-500/50'
                      : 'text-white/70 bg-white/5 border border-white/10 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop: Vertical Sticky Sidebar */}
      <nav className="hidden lg:block sticky top-24 self-start">
        <div className="space-y-2">
          {sidebarItems.map(item => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={`#${item.id}`}
                onClick={e => handleClick(e, item.id)}
                className={`
                  block px-4 py-2 text-sm transition-colors duration-200 rounded-lg
                  ${
                    isActive
                      ? 'text-white bg-white/10 border-l-4 border-purple-500 font-semibold'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
