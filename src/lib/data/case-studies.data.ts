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
    id: 'leadway-travel-insurance-campaign',
    title: 'LEADWAY TRAVEL INSURANCE CAMPAIGN',
    images: ['/case-studies/Influencer 19.webp'],
    logo: '/case-studies/leaday.webp',
    excerpt:
      'A strategic travel insurance campaign that educated young Nigerians traveling abroad about travel insurance while positioning Leadway as the accessible, trusted choice for protection.',
    client: 'Leadway',
    industry: 'Insurance',
    metrics: {
      views: '93k+',
      likes: '18.3K',
      comments: '500+',
      saves: '344',
      impact: '180+ premium inquiries',
    },
    tags: ['Insurance', 'Travel', 'Brand Awareness'],
  },
  {
    id: 'axa-mansard-autoflex-campaign',
    title: 'AXA MANSARD AUTOFLEX',
    images: ['/case-studies/Influencer 19.webp'],
    logo: '/case-studies/axa-logo.webp',
    excerpt:
      'A comprehensive motor insurance campaign aimed at providing flexibility to vehicle owners who are price sensitive but still need comprehensive insurance coverage.',
    client: 'AXA Mansard',
    industry: 'Insurance',
    metrics: {
      impressionShare: '68%',
      costPerAcquisition: 'N4,800',
      returnOnAdSpend: '6.1x',
    },
    tags: ['Insurance', 'Motor Insurance', 'Performance'],
  },
  {
    id: 'cleamax-campaign',
    title: 'CLEANMAX\nCAMPAIGN',
    images: ['/case-studies/clean spark.webp'],
    logo: '/case-studies/clean spark.webp',
    excerpt:
      'A strategic campaign to grow product awareness, expand customer base, and drive sales for high-performing cleaning products including handwash, dishwash liquid, scouring powder, and anti-bacterial cleaners.',
    client: 'Cleamax Industries Limited',
    industry: 'Consumer Goods',
    metrics: {
      impressionShare: '77%',
      costPerAcquisition: 'N800',
      returnOnAdSpend: '8.9x',
    },
    tags: ['Consumer Goods', 'Cleaning Products', 'Performance'],
  },
  {
    id: 'so-fresh-salad-campaign',
    title: 'SO FRESH\nSALAD CAMPAIGN',
    images: ['/case-studies/so-fresh.webp'],
    logo: '/case-studies/so-fresh.webp',
    excerpt:
      'A conversion-focused salad campaign that combined paid media, creator marketing, and content distribution to scale awareness and drive measurable actions for So Fresh&apos;s premium salad offerings.',
    client: 'So Fresh',
    industry: 'Food & Beverage',
    metrics: {
      impressions: '4.96M',
      clicks: '50.7K',
      completionRate: '146.59%',
    },
    tags: ['Food & Beverage', 'E-Commerce', 'Performance', 'Conversion'],
  },
  // Add more case studies here as needed
];
