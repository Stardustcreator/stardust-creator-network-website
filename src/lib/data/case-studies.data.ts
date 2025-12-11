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
    images: [], // No product images
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
  // Add more case studies here as needed
];
