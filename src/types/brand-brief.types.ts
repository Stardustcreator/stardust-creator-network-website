/**
 * TypeScript types for the Brand Brief Form
 * Supports location-specific content (Nigeria, UK, etc.)
 */

// Common enums and constants for brand brief
export const COUNTRIES = ['Nigeria', 'United Kingdom', 'Other'] as const;

export const INDUSTRIES = [
  'Fashion & Beauty',
  'Food & Beverage',
  'FMCG / Consumer Goods',
  'Tech / Fintech',
  'Media & Entertainment',
  'Lifestyle / Travel',
  'Health & Wellness',
  'Education',
  'Other',
] as const;

export const BUSINESS_TYPES = ['Brand', 'Marketing / PR Agency', 'Startup', 'Nonprofit'] as const;

export const CAMPAIGN_GOALS = [
  'Brand Awareness',
  'Product Launch',
  'Engagement & UGC Creation',
  'Sales / Conversions',
  'Community Growth',
  'Event Promotion',
  'Other',
] as const;

export const CAMPAIGN_TYPES = [
  'Influencer Marketing',
  'UGC Content Creation',
  'Co-Branded Partnership',
  'Event or Experience',
  'Sponsorship / Product Seeding',
  'Other',
] as const;

export const TARGET_AUDIENCES = [
  'Gen Z (18–24)',
  'Millennials (25–35)',
  'Gen X (35–50)',
  'Families',
  'Professionals',
  'Other',
] as const;

export const TARGET_MARKETS = ['Nigeria', 'United Kingdom', 'Pan-Africa', 'Global'] as const;

export const CREATOR_TIERS = [
  'Nano (Under 10k)',
  'Micro (10k–50k)',
  'Mid-tier (50k–250k)',
  'Macro (250k–1M)',
  'Icon (1M+)',
] as const;

export const CONTENT_CATEGORIES = [
  'Fashion / Beauty',
  'Lifestyle / Travel',
  'Food / Culture',
  'Tech / Business',
  'Fitness / Wellness',
  'Education / Thought Leadership',
  'Art / Photography',
  'Entertainment / Comedy',
  'Other',
] as const;

export const PLATFORMS = [
  'Instagram',
  'TikTok',
  'YouTube',
  'X (Twitter)',
  'LinkedIn',
  'Podcasts',
  'Other',
] as const;

// Nigeria-specific budget ranges
export const NIGERIA_BUDGET_RANGES = ['₦500k–₦1M', '₦1M–₦5M', '₦5M–₦10M', '₦10M+'] as const;

// UK-specific budget ranges
export const UK_BUDGET_RANGES = ['£5k–£10k', '£10k–£50k', '£50k–£100k', '£100k+'] as const;

export const PAYMENT_MODELS = [
  'Flat campaign fee',
  'Percentage of campaign budget (e.g. 10–15%)',
  'Per-creator fee',
  'Hybrid (flat + %)',
  'Not sure yet',
] as const;

export const ONGOING_COLLABORATION_OPTIONS = [
  'Yes, if ROI is clear',
  'Maybe',
  'No, prefer one-off campaigns',
] as const;

export const CAMPAIGN_DURATIONS = ['1–4 weeks', '1–3 months', '3–6 months', 'Ongoing'] as const;

export const DELIVERABLES = [
  'Social Media Content (Reels, TikToks, Shorts)',
  'UGC Assets (Photos, Videos)',
  'Blog / Written Content',
  'Event Appearances',
  'Product Reviews / Testimonials',
  'Licensing Rights & Paid Usage',
  'Other',
] as const;

export const REFERRAL_SOURCES = [
  'Referral',
  'Instagram',
  'LinkedIn',
  'Industry Event',
  'Other',
] as const;

export const COLLABORATION_TYPES = [
  'One-off Campaign',
  'Long-term Partnership',
  'Always-on Creator Roster',
] as const;

export const COMMUNITY_INTEREST_LEVELS = ['Yes', 'Maybe', 'Not now'] as const;

// Type definitions
export type Country = (typeof COUNTRIES)[number];
export type Industry = (typeof INDUSTRIES)[number];
export type BusinessType = (typeof BUSINESS_TYPES)[number];
export type CampaignGoal = (typeof CAMPAIGN_GOALS)[number];
export type CampaignType = (typeof CAMPAIGN_TYPES)[number];
export type TargetAudience = (typeof TARGET_AUDIENCES)[number];
export type TargetMarket = (typeof TARGET_MARKETS)[number];
export type CreatorTier = (typeof CREATOR_TIERS)[number];
export type ContentCategory = (typeof CONTENT_CATEGORIES)[number];
export type Platform = (typeof PLATFORMS)[number];
export type NigeriaBudgetRange = (typeof NIGERIA_BUDGET_RANGES)[number];
export type UKBudgetRange = (typeof UK_BUDGET_RANGES)[number];
export type PaymentModel = (typeof PAYMENT_MODELS)[number];
export type OngoingCollaborationOption = (typeof ONGOING_COLLABORATION_OPTIONS)[number];
export type CampaignDuration = (typeof CAMPAIGN_DURATIONS)[number];
export type Deliverable = (typeof DELIVERABLES)[number];
export type ReferralSource = (typeof REFERRAL_SOURCES)[number];
export type CollaborationType = (typeof COLLABORATION_TYPES)[number];
export type CommunityInterestLevel = (typeof COMMUNITY_INTEREST_LEVELS)[number];

// Location-specific types
export type BudgetRange = NigeriaBudgetRange | UKBudgetRange;

// Form data interfaces
export interface BrandCompanyInformation {
  brandName: string;
  companyWebsite: string;
  country: Country;
  industry: Industry;
  businessType: BusinessType;
  contactPerson: string;
  email: string;
  phoneNumber?: string;
}

export interface CampaignObjectives {
  campaignName: string;
  campaignGoals: CampaignGoal[];
  campaignType: CampaignType;
  targetAudiences: TargetAudience[];
  targetMarkets: TargetMarket[];
}

export interface CreatorPreferences {
  preferredCreatorTier: CreatorTier;
  contentCategories: ContentCategory[];
  platformFocus: Platform[];
  brandCreatorFit?: string;
}

export interface BudgetPaymentPreference {
  estimatedBudget: BudgetRange;
  paymentModel: PaymentModel;
  ongoingCollaboration: OngoingCollaborationOption;
}

export interface TimelineDeliverables {
  campaignStartDate: string;
  campaignDuration: CampaignDuration;
  deliverables: Deliverable[];
}

export interface AdditionalInformation {
  referralSource: ReferralSource;
  collaborationType: CollaborationType;
  communityInterest: CommunityInterestLevel;
  additionalNotes?: string;
}

export interface AgreementSubmission {
  authorizedConfirmed: boolean;
  termsAgreed: boolean;
}

// Complete form data
export interface BrandBriefFormData {
  brandCompanyInformation: BrandCompanyInformation;
  campaignObjectives: CampaignObjectives;
  creatorPreferences: CreatorPreferences;
  budgetPaymentPreference: BudgetPaymentPreference;
  timelineDeliverables: TimelineDeliverables;
  additionalInformation: AdditionalInformation;
  agreementSubmission: AgreementSubmission;
}

// Form step management
export type BrandBriefFormStep =
  | 'welcome'
  | 'brand-company-information'
  | 'campaign-objectives'
  | 'creator-preferences'
  | 'budget-payment-preference'
  | 'timeline-deliverables'
  | 'additional-information'
  | 'agreement-submission';

export interface BrandBriefFormStepConfig {
  id: BrandBriefFormStep;
  title: string;
  description: string;
  isOptional?: boolean;
}

// API response types
export interface BrandBriefResponse {
  success: boolean;
  data?: {
    briefId: string;
    status: 'submitted' | 'under-review' | 'matched' | 'completed';
    submittedAt: string;
  };
  error?: string;
}

// Form validation errors
export interface BrandBriefFormErrors {
  brandCompanyInformation?: Partial<Record<keyof BrandCompanyInformation, string>>;
  campaignObjectives?: Partial<Record<keyof CampaignObjectives, string>>;
  creatorPreferences?: Partial<Record<keyof CreatorPreferences, string>>;
  budgetPaymentPreference?: Partial<Record<keyof BudgetPaymentPreference, string>>;
  timelineDeliverables?: Partial<Record<keyof TimelineDeliverables, string>>;
  additionalInformation?: Partial<Record<keyof AdditionalInformation, string>>;
  agreementSubmission?: Partial<Record<keyof AgreementSubmission, string>>;
  general?: string;
}

// Location context
export interface BrandBriefLocationConfig {
  country: Country;
  currency: string;
  budgetRanges: readonly string[];
  localization: {
    welcomeMessage: string;
    budgetRangeLabel: string;
    communityDescription: string;
  };
}

// Form state management
export interface BrandBriefFormState {
  currentStep: BrandBriefFormStep;
  data: Partial<BrandBriefFormData>;
  errors: BrandBriefFormErrors;
  isSubmitting: boolean;
  isValid: boolean;
  completedSteps: Set<BrandBriefFormStep>;
}
