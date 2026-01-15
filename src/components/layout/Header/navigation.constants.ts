export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export const navigationItems: NavigationItem[] = [
  {
    label: 'Who We Are',
    href: '/our-team',
  },
  {
    label: 'Stardust Creator Community',
    href: '/#stardust-creator-community',
  },
  {
    label: 'CreatorOS',
    href: '/#creator-os',
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
