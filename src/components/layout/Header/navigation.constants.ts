export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export const navigationItems: NavigationItem[] = [
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
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Privacy Policy',
    href: '/legal/privacy',
  },
];
