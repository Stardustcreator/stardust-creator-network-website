export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'leye-makanjuola',
    name: 'Leye Makanjuola',
    position: 'CEO',
    image: '/leye.webp',
  },
  {
    id: 'bukonla-adebakin',
    name: 'Bukonla Adebakin',
    position: 'COO',
    image: '/bukky.webp',
  },
  {
    id: 'ifeanyi-otunji',
    name: 'Ifeanyi Otunji',
    position: 'Account Director',
    image: '/ifeanyi.webp',
  },
  {
    id: 'oyindamola-bello',
    name: 'Oyindamola Bello',
    position: 'Business Director',
    image: '/oyi.webp',
  },
  {
    id: 'ikeh-chidi',
    name: 'Ikeh Chidi',
    position: 'Creative Director',
    image: '/ikeh2.webp',
  },
  {
    id: 'kate-adekunle',
    name: 'Kate Adekunle',
    position: 'Influencer Manager',
    image: '/Kate.webp',
  },
];
