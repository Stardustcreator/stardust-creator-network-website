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
  {
    id: 'leadway-no-lose-guard-campaign',
    title: 'NO LOSE GUARD CAMPAIGN',
    images: ['/case-studies/laye.webp'],
    logo: '/case-studies/leaday.webp',
    excerpt:
      "A strategic campaign that ignited vital conversations about preparedness in the face of life's uncertainties, effectively raising awareness about the importance of planning ahead with Leadway.",
    client: 'Leadway',
    industry: 'Insurance',
    metrics: {
      impressionShare: '62%',
      costPerAcquisition: 'N7,200',
      returnOnAdSpend: '5.2x',
    },
    tags: ['Insurance', 'Brand Awareness', 'Performance'],
  },
  {
    id: 'axa-mansard-autoflex-campaign',
    title: 'AXA MANSARD AUTOFLEX',
    images: ['/case-studies/laye.webp'],
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
  // Add more case studies here as needed
];
