/**
 * Zod validation schemas for the Brand Brief Form
 * Used for both client-side and server-side validation
 */

import { z } from 'zod';
import {
  COUNTRIES,
  INDUSTRIES,
  BUSINESS_TYPES,
  CAMPAIGN_GOALS,
  CAMPAIGN_TYPES,
  TARGET_AUDIENCES,
  TARGET_MARKETS,
  CREATOR_TIERS,
  CONTENT_CATEGORIES,
  PLATFORMS,
  PAYMENT_MODELS,
  ONGOING_COLLABORATION_OPTIONS,
  CAMPAIGN_DURATIONS,
  DELIVERABLES,
  REFERRAL_SOURCES,
  COLLABORATION_TYPES,
  COMMUNITY_INTEREST_LEVELS,
  type Country,
} from '@/types/brand-brief.types';

// Brand / Company Information Schema
export const brandCompanyInformationSchema = z.object({
  brandName: z
    .string()
    .min(2, 'Brand/Company name must be at least 2 characters')
    .max(100, 'Brand/Company name must be less than 100 characters'),

  companyWebsite: z
    .string()
    .url('Please enter a valid website URL')
    .max(200, 'Website URL is too long'),

  country: z.enum(COUNTRIES, {
    message: 'Please select your country',
  }),

  industry: z.enum(INDUSTRIES, {
    message: 'Please select your industry',
  }),

  businessType: z.enum(BUSINESS_TYPES, {
    message: 'Please select your business type',
  }),

  contactPerson: z
    .string()
    .min(2, 'Contact person name must be at least 2 characters')
    .max(100, 'Contact person name must be less than 100 characters')
    .regex(
      /^[a-zA-Z\s'-]+$/,
      'Contact person name can only contain letters, spaces, hyphens, and apostrophes'
    ),

  email: z
    .string()
    .email('Please enter a valid email address')
    .max(254, 'Email address is too long'),

  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .refine(val => {
      // Basic international phone number validation
      return /^\+?[\d\s\-\(\)]+$/.test(val) && val.replace(/\D/g, '').length >= 10;
    }, 'Please enter a valid phone number'),
});

// Campaign Objectives Schema
export const campaignObjectivesSchema = z.object({
  campaignName: z
    .string()
    .min(2, 'Campaign name must be at least 2 characters')
    .max(100, 'Campaign name must be less than 100 characters'),

  campaignGoals: z
    .array(z.enum(CAMPAIGN_GOALS))
    .min(1, 'Please select at least one campaign goal')
    .max(5, 'Please select no more than 5 campaign goals'),

  campaignType: z.enum(CAMPAIGN_TYPES, {
    message: 'Please select a campaign type',
  }),

  targetAudiences: z
    .array(z.enum(TARGET_AUDIENCES))
    .min(1, 'Please select at least one target audience')
    .max(5, 'Please select no more than 5 target audiences'),

  targetMarkets: z
    .array(z.enum(TARGET_MARKETS))
    .min(1, 'Please select at least one target market')
    .max(4, 'Please select no more than 4 target markets'),
});

// Creator Preferences Schema
export const creatorPreferencesSchema = z.object({
  preferredCreatorTier: z.enum(CREATOR_TIERS, {
    message: 'Please select your preferred creator tier',
  }),

  contentCategories: z
    .array(z.enum(CONTENT_CATEGORIES))
    .min(1, 'Please select at least one content category')
    .max(5, 'Please select no more than 5 content categories'),

  platformFocus: z
    .array(z.enum(PLATFORMS))
    .min(1, 'Please select at least one platform')
    .max(5, 'Please select no more than 5 platforms'),

  brandCreatorFit: z
    .string()
    .max(500, 'Brand-creator fit description must be less than 500 characters')
    .optional(),
});

// Dynamic budget range schema based on country
export const createBudgetPaymentPreferenceSchema = (_country: Country) => {
  return z.object({
    estimatedBudget: z.string({
      message: 'Please select your estimated campaign budget',
    }),

    paymentModel: z.enum(PAYMENT_MODELS, {
      message: 'Please select your preferred payment model',
    }),

    ongoingCollaboration: z.enum(ONGOING_COLLABORATION_OPTIONS, {
      message: 'Please select your ongoing collaboration preference',
    }),
  });
};

// Timeline & Deliverables Schema
export const timelineDeliverablesSchema = z.object({
  campaignStartDate: z
    .string()
    .min(1, 'Please select a campaign start date')
    .refine(val => {
      const date = new Date(val);
      return !isNaN(date.getTime()) && date >= new Date();
    }, 'Campaign start date must be today or in the future'),

  campaignDuration: z.enum(CAMPAIGN_DURATIONS, {
    message: 'Please select campaign duration',
  }),

  deliverables: z
    .array(z.enum(DELIVERABLES))
    .min(1, 'Please select at least one deliverable')
    .max(7, 'Please select no more than 7 deliverables'),
});

// Additional Information Schema
export const additionalInformationSchema = z.object({
  referralSource: z.enum(REFERRAL_SOURCES, {
    message: 'Please select how you heard about SCN',
  }),

  collaborationType: z.enum(COLLABORATION_TYPES, {
    message: 'Please select your collaboration type preference',
  }),

  communityInterest: z.enum(COMMUNITY_INTEREST_LEVELS, {
    message: 'Please indicate your interest in joining the community',
  }),

  additionalNotes: z
    .string()
    .max(1000, 'Additional notes must be less than 1000 characters')
    .optional(),
});

// Agreement & Submission Schema
export const agreementSubmissionSchema = z.object({
  authorizedConfirmed: z
    .boolean()
    .refine(
      val => val === true,
      'You must confirm you are authorized to represent this brand or agency'
    ),

  termsAgreed: z
    .boolean()
    .refine(val => val === true, 'You must agree to the Terms of Service and Privacy Policy'),
});

// Complete form schema factory
export const createCompleteBrandBriefFormSchema = (country: Country) => {
  return z.object({
    brandCompanyInformation: brandCompanyInformationSchema,
    campaignObjectives: campaignObjectivesSchema,
    creatorPreferences: creatorPreferencesSchema,
    budgetPaymentPreference: createBudgetPaymentPreferenceSchema(country),
    timelineDeliverables: timelineDeliverablesSchema,
    additionalInformation: additionalInformationSchema,
    agreementSubmission: agreementSubmissionSchema,
  });
};

// API request schema
export const apiBrandBriefSchema = z.object({
  brandCompanyInformation: brandCompanyInformationSchema,
  campaignObjectives: campaignObjectivesSchema,
  creatorPreferences: creatorPreferencesSchema,
  budgetPaymentPreference: z.object({
    estimatedBudget: z.string(),
    paymentModel: z.string(),
    ongoingCollaboration: z.string(),
  }),
  timelineDeliverables: z.object({
    campaignStartDate: z.string(),
    campaignDuration: z.string(),
    deliverables: z.array(z.string()),
  }),
  additionalInformation: z.object({
    referralSource: z.string(),
    collaborationType: z.string(),
    communityInterest: z.string(),
    additionalNotes: z.string().optional(),
  }),
  agreementSubmission: z.object({
    authorizedConfirmed: z.boolean(),
    termsAgreed: z.boolean(),
  }),
  // Additional metadata
  location: z.string(),
  submittedAt: z.string().datetime(),
});

// Form step validation schemas
export const brandBriefFormStepSchemas = {
  'brand-company-information': brandCompanyInformationSchema,
  'campaign-objectives': campaignObjectivesSchema,
  'creator-preferences': creatorPreferencesSchema,
  'timeline-deliverables': timelineDeliverablesSchema,
  'additional-information': additionalInformationSchema,
  'agreement-submission': agreementSubmissionSchema,
} as const;

// Export types inferred from schemas
export type BrandCompanyInformationInput = z.infer<typeof brandCompanyInformationSchema>;
export type CampaignObjectivesInput = z.infer<typeof campaignObjectivesSchema>;
export type CreatorPreferencesInput = z.infer<typeof creatorPreferencesSchema>;
export type TimelineDeliverablesInput = z.infer<typeof timelineDeliverablesSchema>;
export type AdditionalInformationInput = z.infer<typeof additionalInformationSchema>;
export type AgreementSubmissionInput = z.infer<typeof agreementSubmissionSchema>;
export type ApiBrandBriefInput = z.infer<typeof apiBrandBriefSchema>;
