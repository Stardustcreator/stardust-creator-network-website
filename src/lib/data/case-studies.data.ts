import type { CaseStudy } from '@/types/case-study.types';

/**
 * Centralized data file for all case studies
 * Easy to add new case studies by adding objects to this array
 */

export const caseStudies: CaseStudy[] = [
  {
    id: 'honeywell-relaunch-campaign',
    title: 'HONEYWELL RELAUNCH CAMPAIGN',
    images: [
      '/case-studies/honeywell.webp',
      '/case-studies/honeywell2.webp',
      '/case-studies/honeywell3.webp',
      '/case-studies/honeywell4.webp',
    ],
    logo: '/case-studies/logo honeywell.webp',
    excerpt:
      'A comprehensive relaunch campaign that connected Honeywell with top creators to drive brand awareness and engagement.',
    client: 'Honeywell',
    industry: 'Technology',
    metrics: {
      totalImpression: '70m+',
      reach: '26m+',
      totalEngagement: '5m+',
      engagementRate: '7.2%',
    },
    tags: ['Technology', 'Relaunch', 'Brand Awareness'],
    // content will be added later
  },
  {
    id: 'honeywell-always-on-influencer-marketing',
    title: 'HONEYWELL ALWAYS ON INFLUENCER MARKETING ENGAGEMENT',
    images: [
      '/case-studies/Aramide\u2019s Kitchen.webp',
      '/case-studies/Ifeth Delight.webp',
      '/case-studies/Fabulous Nosh Kitchen.webp',
      '/case-studies/Riaz Kitchens.webp',
      "/case-studies/Omoye's Cooks.webp",
      '/case-studies/Foodies Delecty.webp',
      '/case-studies/Chef AHR.webp',
      '/case-studies/Favimore Kitchen.webp',
      '/case-studies/Redgrape Cafe.webp',
      '/case-studies/Chef Lola.webp',
    ],
    logo: '/case-studies/logo honeywell.webp',
    excerpt:
      'An always-on influencer marketing strategy that drives consistent engagement and brand awareness through strategic creator partnerships.',
    client: 'Honeywell',
    industry: 'Technology',
    metrics: {
      totalImpression: '6.4m',
      reach: '4.65m',
      engagementRate: '3.69%',
    },
    tags: ['Technology', 'Always-On', 'Influencer Marketing'],
  },
  {
    id: 'leadway-travel-insurance-campaign',
    title: 'LEADWAY TRAVEL INSURANCE CAMPAIGN',
    images: ['/case-studies/laye.webp'],
    logo: '/case-studies/leaday.webp',
    excerpt:
      'A strategic travel insurance campaign that connected Leadway with audiences to drive awareness and engagement.',
    client: 'Leadway',
    industry: 'Insurance',
    metrics: {
      views: '300k+',
      likes: '11.8K',
      comments: '160K',
      saves: '344',
    },
    tags: ['Insurance', 'Travel', 'Brand Awareness'],
  },
  // Add more case studies here as needed
];
