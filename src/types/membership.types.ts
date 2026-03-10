/**
 * Types for Membership Subscription
 */

import { SupportedCountry } from './creator-community.types';

export interface MembershipApplication {
  // Personal info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: SupportedCountry;

  // Creator info
  primaryPlatform: string;
  handle: string;
  niche: string;
  followerCount: string;

  // Goals and referral
  goals: string[];
  referralSource: string;

  // Terms
  agreedToTerms: boolean;
}

export interface MembershipSubscription {
  id: string;
  userId: string;
  email: string;
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  plan: string;
  country: SupportedCountry;
  subscriptionCode?: string;
  customerCode?: string;
  authorizationCode?: string;
  startDate: string;
  nextPaymentDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentInitRequest {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  country: SupportedCountry;
  metadata?: {
    primaryPlatform?: string;
    handle?: string;
    niche?: string;
    followerCount?: string;
    goals?: string[];
    referralSource?: string;
  };
}

export interface PaymentCallbackData {
  reference: string;
  status: 'success' | 'failed' | 'abandoned';
  transactionId?: number;
  subscriptionCode?: string;
}

// Platform options
export const CREATOR_PLATFORMS = [
  'YouTube',
  'Instagram',
  'TikTok',
  'Twitter/X',
  'LinkedIn',
  'Facebook',
  'Twitch',
  'Snapchat',
  'Pinterest',
  'Blog/Website',
  'Podcast',
  'Other',
] as const;

export type CreatorPlatform = (typeof CREATOR_PLATFORMS)[number];

// Niche options
export const CREATOR_NICHES = [
  'Tech & Gadgets',
  'Fashion & Beauty',
  'Food & Cooking',
  'Travel & Lifestyle',
  'Fitness & Health',
  'Finance & Business',
  'Education & Learning',
  'Entertainment & Comedy',
  'Music & Arts',
  'Gaming',
  'Sports',
  'Parenting & Family',
  'DIY & Crafts',
  'Photography & Videography',
  'News & Current Affairs',
  'Other',
] as const;

export type CreatorNiche = (typeof CREATOR_NICHES)[number];

// Follower count ranges
export const FOLLOWER_RANGES = [
  '0 - 1,000',
  '1,000 - 5,000',
  '5,000 - 10,000',
  '10,000 - 50,000',
  '50,000 - 100,000',
  '100,000 - 500,000',
  '500,000 - 1M',
  '1M+',
] as const;

export type FollowerRange = (typeof FOLLOWER_RANGES)[number];

// Creator goals
export const CREATOR_GOALS = [
  'Get brand sponsorships',
  'Collaborate with other creators',
  'Grow my audience',
  'Learn from industry experts',
  'Access resources and templates',
  'Build my network',
  'Monetize my content',
  'Transition to full-time creating',
] as const;

export type CreatorGoal = (typeof CREATOR_GOALS)[number];

// Referral sources
export const REFERRAL_SOURCES = [
  'Social media',
  'Friend or colleague',
  'Online search',
  'Blog or article',
  'Podcast',
  'Event or workshop',
  'Email',
  'Other',
] as const;

export type ReferralSource = (typeof REFERRAL_SOURCES)[number];
