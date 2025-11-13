/**
 * Type definitions for the Creator Quantitative Survey
 * Used to validate demand for Phase 1 (education/community) and Phase 2 (infrastructure/OS)
 */

// A. Screener & Profile
export const PLATFORMS = [
  'TikTok',
  'YouTube',
  'Instagram',
  'Snapchat',
  'X',
  'LinkedIn',
  'Podcasts',
  'Newsletter',
  'Website/Shop',
  'Other',
] as const;

export const AUDIENCE_SIZES = [
  '<10k (Nano)',
  '10–50k (Micro)',
  '50–250k (Mid)',
  '250k - 1M (Macro)',
  'Above 1M (Mega)',
] as const;

export const CREATOR_STATUSES = ['Full-time', 'Part-time', 'Aspiring full-time'] as const;

export type Platform = (typeof PLATFORMS)[number];
export type AudienceSize = (typeof AUDIENCE_SIZES)[number];
export type CreatorStatus = (typeof CREATOR_STATUSES)[number];

export interface ScreenerProfile {
  platforms: Platform[];
  mainPlatformAudienceSize: AudienceSize;
  locationCity: string;
  locationCountry: string;
  creatorStatus: CreatorStatus;
}

// B. Phase 1: Education & Community
export const EDUCATION_TOPICS = [
  'Pricing & rate negotiation',
  'Creation of Offers beyond brand deals (products, memberships, services)',
  'YouTube monetization (RPMs, formats)',
  'TikTok monetization (shops, live, affiliate)',
  'Licensing & rights (usage, renewals)',
  'Finance & payouts (tax, invoicing, cashflow)',
  'Sales & CRM habits (pipelines, outreach)',
] as const;

export type EducationTopic = (typeof EDUCATION_TOPICS)[number];

export interface Phase1EducationCommunity {
  creatorClinicsHelpfulness: number; // 1-5
  peerCirclesHelpfulness: number; // 1-5
  virtualWorkshopsHelpfulness: number; // 1-5
  templatesHelpfulness: number; // 1-5
  officeHoursHelpfulness: number; // 1-5
  onlineCoursesHelpfulness: number; // 1-5
  prioritizedTopics: EducationTopic[]; // Top 3
  paidCommunityLikelihood: number; // 1-5
  paidCommunityExpectations: string; // Open text
}

// C. Current Monetization Mix
export const MONETIZATION_BLOCKERS = [
  "Don't know what to sell",
  "The audience won't buy yet",
  'Setup is technical/overwhelming',
  'No storefront/process (tooling gap)',
  'Pricing uncertainty',
  'Payment/logistics/tax complexity',
] as const;

export type MonetizationBlocker = (typeof MONETIZATION_BLOCKERS)[number];

export interface CurrentMonetizationMix {
  brandDealsPercent: number;
  adsRevenuePercent: number;
  affiliatePercent: number;
  digitalProductsPercent: number;
  servicesPercent: number;
  membershipsPercent: number;
  licensingUgcPercent: number;
  merchPercent: number;
  otherPercent: number;
  biggestBlockers: MonetizationBlocker[];
}

// D. Pain Severity × Frequency
export const PAIN_ISSUES = [
  'Unpredictable income months',
  "Don't know how to price offers",
  'Hard to package non-brand products/services',
  'Licensing/usage rights confusion',
  'Late payments/invoicing admin',
  'No single view of payouts across channels',
  'Manual brand CRM mess (DMs/Sheets)',
] as const;

export type PainIssue = (typeof PAIN_ISSUES)[number];

export const FREQUENCY_OPTIONS = ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] as const;

export type Frequency = (typeof FREQUENCY_OPTIONS)[number];

export interface PainSeverityFrequency {
  issues: Record<
    PainIssue,
    {
      frequency: Frequency;
      severity: number; // 1-5
    }
  >;
}

// E. Phase 2: Infrastructure/OS Feature Resonance
export const OS_FEATURES = [
  'Digital Product Sales (Sell e-books, templates, presets, or digital files)',
  'Online Courses & Memberships (Course hosting and subscription management)',
  'Community Membership Management (create and monetize your own community)',
  'Rate Calculator (market CPMs, deliverables, usage)',
  'AI Brief Generator (turn brand ask into scope + pricing)',
  'Brand CRM Template (pipeline, follow-ups)',
  'Rights Templates (usage, renewals, buyouts)',
  'Rights and licensing manager (Protects creator IP, standardizes contracts, renewal reminders)',
  'Invoice automation (tax, late-fee nudges)',
  'Payout Wallet (for brand payment and product sales)',
  'Creator–Brand Marketplace (verified briefs, no cold DMs)',
  'Physical Product Storefront (sell products - inventory listing, payment etc)',
  'Creator Finance Hub (Track all brand payments, subscriptions, and royalties in one dashboard)',
  'AI-Powered Product Generator (Use AI to turn content into monetizable assets like eBook, course, template)',
] as const;

export type OSFeature = (typeof OS_FEATURES)[number];

export interface Phase2InfrastructureOS {
  featureValues: Record<OSFeature, number>; // 1-5 for each feature
  priorityFeature: OSFeature | '';
  adoptionBlockers: string; // Open text
}

// F. Willingness-to-Pay
export const CURRENCIES = [
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
] as const;

export interface WillingnessToPay {
  currency: string; // Currency code
  // PRO Community pricing
  communityTooCheap: string;
  communityBargain: string;
  communityExpensive: string;
  communityTooExpensive: string;
  // Creator OS pricing
  osTooCheap: string;
  osBargain: string;
  osExpensive: string;
  osTooExpensive: string;
  // Revenue-based pricing likelihood
  revenueBasedPricingLikelihood: number; // 1-5
}

// G. Adoption & Beta
export interface AdoptionBeta {
  joinCommunityBeta: boolean;
  joinOsBeta: boolean;
  contactEmail: string;
  contactPhone: string;
}

// Complete Survey Data
export interface CreatorSurveyData {
  screenerProfile: ScreenerProfile;
  phase1EducationCommunity: Phase1EducationCommunity;
  currentMonetizationMix: CurrentMonetizationMix;
  painSeverityFrequency: PainSeverityFrequency;
  phase2InfrastructureOS: Phase2InfrastructureOS;
  willingnessToPay: WillingnessToPay;
  adoptionBeta: AdoptionBeta;
}

// Survey Step Management
export type CreatorSurveyStep =
  | 'screener-profile'
  | 'phase1-education'
  | 'monetization-mix'
  | 'pain-severity'
  | 'phase2-infrastructure'
  | 'willingness-to-pay'
  | 'adoption-beta'
  | 'thank-you';

export interface CreatorSurveyState {
  currentStep: CreatorSurveyStep;
  data: Partial<CreatorSurveyData>;
  errors: Partial<Record<keyof CreatorSurveyData | 'submission', Record<string, string>>>;
  isSubmitting: boolean;
}
