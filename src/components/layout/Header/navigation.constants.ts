export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export const navigationItems: NavigationItem[] = [
  {
    label: 'Who We Are',
    href: '/#who-we-are',
    children: [
      {
        label: 'Our Team',
        href: '/our-team',
      },
    ],
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
    label: 'Our Creatives',
    href: '/our-creatives',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
];
