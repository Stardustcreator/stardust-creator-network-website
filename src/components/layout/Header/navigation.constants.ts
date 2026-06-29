export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export const navigationItems: NavigationItem[] = [
  {
    label: 'Who we are',
    href: '/who-we-are',
  },
  {
    label: 'Creator OS',
    href: '/#creator-os',
  },
  {
    label: 'Find Creators',
    href: '/find-creators',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Pricing',
    href: '/pricing',
  },
];
