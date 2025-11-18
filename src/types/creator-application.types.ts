/**
 * TypeScript types for the Creator Application Form
 * Supports location-specific content (Nigeria, UK, etc.)
 */

// Common enums and constants
export const COUNTRIES = ['Nigeria', 'United Kingdom', 'Other'] as const;
export const AGE_RANGES = ['18–24', '25–34', '35–44', '45+'] as const;
export const PLATFORMS = [
  'Instagram',
  'TikTok',
  'YouTube',
  'X (Twitter)',
  'LinkedIn',
  'Podcast',
  'Blog / Newsletter',
  'Twitch',
  'Other',
] as const;
export const AUDIENCE_SIZES = [
  'Under 10k (Nano)',
  '10k–50k (Micro)',
  '50k–250k (Mid-tier)',
  '250k–1M (Macro)',
  '1M+ (Mega)',
] as const;
export const CONTENT_CATEGORIES = [
  'Fashion & Beauty',
  'Lifestyle & Travel',
  'Food & Culture',
  'Education & Career',
  'Tech & Business',
  'Fitness & Wellness',
  'Art, Design & Photography',
  'Entertainment / Comedy',
  'Other',
] as const;
export const CREATOR_TYPES = [
  'Educator / Thought Leader',
  'Entertainer / Influencer',
  'Tastemaker / Trendsetter',
  'Creative Professional (e.g. designer, photographer, videographer)',
  'Other',
] as const;

// Nigeria-specific fee ranges
export const NIGERIA_FEE_RANGES = [
  'Under ₦200,000',
  '₦200,000–₦500,000',
  '₦500,000–₦1,000,000',
  'Above ₦1,000,000',
] as const;

// UK-specific fee ranges (for future use)
export const UK_FEE_RANGES = [
  'Under £2,000',
  '£2,000–£5,000',
  '£5,000–£10,000',
  'Above £10,000',
] as const;

export const MONETIZATION_METHODS = [
  'Brand Deals',
  'Digital Products',
  'Services / Freelance Work',
  'Events / Workshops',
  'Community Memberships',
  'Not monetizing yet',
] as const;

export const OPPORTUNITY_INTERESTS = [
  'Brand Campaigns',
  'Education & Training',
  'Collaborations with Other Creators',
  'Monetization Tools (Creator OS)',
] as const;

export const CREATOR_OS_FEATURES = [
  'AI Brief Generator + Rate Calculator',
  'Brand CRM Template (for managing deals)',
  'Rights & Licensing Templates',
  'Rights Renewal Commerce (automated reminders + payments)',
  'Invoice Automation (with tax + late fees)',
  'Creator Payout Wallet',
  'Digital Product & Course Builder',
  'Community Membership Manager',
  'Revenue Dashboard (track brand deals, products, royalties)',
  'Event Ticketing / Webinar Host',
] as const;

export const COMMUNITY_INTEREST_LEVELS = [
  'Yes, definitely',
  "Maybe! I'd like to learn more",
  'Not right now',
] as const;

// Type definitions
export type Country = (typeof COUNTRIES)[number];
export type AgeRange = (typeof AGE_RANGES)[number];
export type Platform = (typeof PLATFORMS)[number];
export type AudienceSize = (typeof AUDIENCE_SIZES)[number];
export type ContentCategory = (typeof CONTENT_CATEGORIES)[number];
export type CreatorType = (typeof CREATOR_TYPES)[number];
export type NigeriaFeeRange = (typeof NIGERIA_FEE_RANGES)[number];
export type UKFeeRange = (typeof UK_FEE_RANGES)[number];
export type MonetizationMethod = (typeof MONETIZATION_METHODS)[number];
export type OpportunityInterest = (typeof OPPORTUNITY_INTERESTS)[number];
export type CreatorOSFeature = (typeof CREATOR_OS_FEATURES)[number];
export type CommunityInterestLevel = (typeof COMMUNITY_INTEREST_LEVELS)[number];

// Location-specific types
export type FeeRange = NigeriaFeeRange | UKFeeRange;

// Form data interfaces
export interface PersonalInformation {
  fullName: string;
  email: string;
  phoneNumber: string;
  country: Country;
  city: string;
  ageRange: AgeRange;
  marketingConsent: boolean;
}

export interface SocialLinks {
  platform: Platform;
  url: string;
}

export interface CreatorIdentity {
  creatorHandle: string;
  primaryPlatforms: Platform[];
  socialLinks: SocialLinks[];
  audienceSize: AudienceSize;
  contentCategories: ContentCategory[];
  creatorType: CreatorType;
}

export interface MonetizationExperience {
  workedWithBrands: boolean;
  brandExample?: string;
  feeRange: FeeRange;
  monetizationMethods: MonetizationMethod[];
  opportunityInterests: OpportunityInterest[];
}

export interface EducationToolsInterest {
  creatorOSFeatures: CreatorOSFeature[];
  communityInterest: CommunityInterestLevel;
}

export interface VerificationAgreement {
  mediaKit?: File;
  authenticityConfirmed: boolean;
  termsAgreed: boolean;
}

// Complete form data
export interface CreatorApplicationFormData {
  personalInformation: PersonalInformation;
  creatorIdentity: CreatorIdentity;
  monetizationExperience: MonetizationExperience;
  educationToolsInterest: EducationToolsInterest;
  verificationAgreement: VerificationAgreement;
}

// Form step management
export type FormStep =
  | 'welcome'
  | 'personal-information'
  | 'creator-identity'
  | 'monetization-experience'
  | 'education-tools-interest'
  | 'verification-agreement';

export interface FormStepConfig {
  id: FormStep;
  title: string;
  description: string;
  isOptional?: boolean;
}

// API response types
export interface CreatorApplicationResponse {
  success: boolean;
  data?: {
    applicationId: string;
    status: 'submitted' | 'under-review' | 'approved' | 'rejected';
    submittedAt: string;
  };
  error?: string;
}

// Form validation errors
export interface FormErrors {
  personalInformation?: Partial<Record<keyof PersonalInformation, string>>;
  creatorIdentity?: Partial<Record<keyof CreatorIdentity, string>>;
  monetizationExperience?: Partial<Record<keyof MonetizationExperience, string>>;
  educationToolsInterest?: Partial<Record<keyof EducationToolsInterest, string>>;
  verificationAgreement?: Partial<Record<keyof VerificationAgreement, string>>;
  general?: string;
}

// Location context
export interface LocationConfig {
  country: Country;
  currency: string;
  feeRanges: readonly string[];
  localization: {
    welcomeMessage: string;
    feeRangeLabel: string;
    communityDescription: string;
  };
}

// Form state management
export interface FormState {
  currentStep: FormStep;
  data: Partial<CreatorApplicationFormData>;
  errors: FormErrors;
  isSubmitting: boolean;
  isValid: boolean;
  completedSteps: Set<FormStep>;
}
