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
    label: 'For Creators',
    href: '/creators/join',
  },
  {
    label: 'Case Studies',
    href: '/case-studies',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
];
