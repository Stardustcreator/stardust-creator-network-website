/**
 * Types for Stardust Creator Community Membership
 */

// Pricing tiers by country
export const MEMBERSHIP_PRICING = {
  NG: {
    currency: 'NGN',
    symbol: '₦',
    amount: 5000,
    formatted: '₦5,000',
    period: 'month',
  },
  GH: {
    currency: 'GHS',
    symbol: 'GH₵',
    amount: 75,
    formatted: 'GH₵75',
    period: 'month',
  },
  KE: {
    currency: 'KES',
    symbol: 'KSh',
    amount: 650,
    formatted: 'KSh650',
    period: 'month',
  },
  ZA: {
    currency: 'ZAR',
    symbol: 'R',
    amount: 90,
    formatted: 'R90',
    period: 'month',
  },
  GB: {
    currency: 'GBP',
    symbol: '£',
    amount: 5,
    formatted: '£5',
    period: 'month',
  },
  DEFAULT: {
    currency: 'USD',
    symbol: '$',
    amount: 5,
    formatted: '$5',
    period: 'month',
  },
} as const;

export type SupportedCountry = keyof typeof MEMBERSHIP_PRICING;

export interface MembershipPricing {
  currency: string;
  symbol: string;
  amount: number;
  formatted: string;
  period: string;
}

// Membership benefits
export const MEMBERSHIP_BENEFITS = [
  {
    id: 'community-access',
    title: 'Exclusive Community Access',
    description: 'Join our private Discord/Slack community of ambitious creators',
    icon: 'users',
  },
  {
    id: 'collaboration-matching',
    title: 'Collaboration Matching',
    description: 'Get matched with collaboration partners based on your niche and goals',
    icon: 'handshake',
  },
  {
    id: 'brand-opportunities',
    title: 'Priority Brand Opportunities',
    description: 'First access to paid brand campaign opportunities',
    icon: 'briefcase',
  },
  {
    id: 'networking-events',
    title: 'Monthly Networking Events',
    description: 'Exclusive creator meetups and networking sessions',
    icon: 'calendar',
  },
  {
    id: 'resource-library',
    title: 'Resource Library',
    description: 'Access contracts, rate cards, pitch templates, and more',
    icon: 'folder',
  },
  {
    id: 'workshops',
    title: 'Workshops & Masterclasses',
    description: 'Creator education sessions from industry experts',
    icon: 'graduation-cap',
  },
  {
    id: 'directory-listing',
    title: 'Creator Directory Listing',
    description: 'Get discovered by brands looking for creators like you',
    icon: 'search',
  },
  {
    id: 'support',
    title: 'Direct SCN Support',
    description: 'Priority support from the Stardust Creator Network team',
    icon: 'headset',
  },
] as const;

export type MembershipBenefit = (typeof MEMBERSHIP_BENEFITS)[number];

// Value propositions
export const VALUE_PROPOSITIONS = [
  {
    id: 'collaboration',
    title: 'Collaboration Network',
    description: 'Find creators to collaborate with and grow together',
    icon: 'users',
  },
  {
    id: 'opportunities',
    title: 'Brand Opportunities',
    description: 'Get first access to paid campaigns',
    icon: 'briefcase',
  },
  {
    id: 'growth',
    title: 'Learn & Grow',
    description: 'Exclusive workshops and resources',
    icon: 'graduation-cap',
  },
  {
    id: 'community',
    title: 'Pan-African Community',
    description: 'Connect with creators across borders',
    icon: 'globe',
  },
] as const;

export type ValueProposition = (typeof VALUE_PROPOSITIONS)[number];

// FAQ items
export const MEMBERSHIP_FAQ = [
  {
    id: 'payment-methods',
    question: 'What payment methods are accepted?',
    answer:
      'We accept all major debit/credit cards, bank transfers, and mobile money payments through Paystack. International creators can pay via Stripe.',
  },
  {
    id: 'cancellation',
    question: 'Can I cancel my membership anytime?',
    answer:
      'Yes! You can cancel your membership at any time. Your access will continue until the end of your current billing period.',
  },
  {
    id: 'platforms',
    question: 'What platforms and niches are supported?',
    answer:
      'We welcome creators from all platforms including YouTube, Instagram, TikTok, Twitter/X, LinkedIn, and more. All content niches are supported.',
  },
  {
    id: 'brand-collaborations',
    question: 'How do brand collaborations work?',
    answer:
      'As a member, you get early access to brand campaign opportunities. When a brand is looking for creators, members are notified first and can apply directly through our platform.',
  },
  {
    id: 'follower-requirements',
    question: 'Are there any follower requirements to join?',
    answer:
      'No! We believe in supporting creators at every stage of their journey. Whether you have 100 or 100,000 followers, you are welcome to join.',
  },
] as const;

export type FAQItem = (typeof MEMBERSHIP_FAQ)[number];

// Membership form data
export interface MembershipFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: SupportedCountry;
  primaryPlatform: string;
  handle: string;
  niche: string;
  followerCount: string;
  goals: string[];
  referralSource: string;
  agreedToTerms: boolean;
}
