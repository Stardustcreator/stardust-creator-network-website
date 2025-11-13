/**
 * Zod validation schemas for the Creator Quantitative Survey
 */

import { z } from 'zod';
import {
  PLATFORMS,
  AUDIENCE_SIZES,
  CREATOR_STATUSES,
  EDUCATION_TOPICS,
  MONETIZATION_BLOCKERS,
  PAIN_ISSUES,
  FREQUENCY_OPTIONS,
  OS_FEATURES,
} from '@/types/creator-survey.types';

// A. Screener & Profile Schema
export const screenerProfileSchema = z.object({
  platforms: z
    .array(z.enum(PLATFORMS))
    .min(1, 'Please select at least one platform')
    .max(10, 'Please select no more than 10 platforms'),
  mainPlatformAudienceSize: z.enum(AUDIENCE_SIZES),
  locationCity: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City name is too long'),
  locationCountry: z
    .string()
    .min(2, 'Country must be at least 2 characters')
    .max(100, 'Country name is too long'),
  creatorStatus: z.enum(CREATOR_STATUSES),
});

// B. Phase 1: Education & Community Schema
export const phase1EducationCommunitySchema = z.object({
  creatorClinicsHelpfulness: z
    .number()
    .min(1, 'Please rate creator clinics helpfulness')
    .max(5, 'Rating must be between 1 and 5'),
  peerCirclesHelpfulness: z
    .number()
    .min(1, 'Please rate peer circles helpfulness')
    .max(5, 'Rating must be between 1 and 5'),
  virtualWorkshopsHelpfulness: z
    .number()
    .min(1, 'Please rate virtual workshops helpfulness')
    .max(5, 'Rating must be between 1 and 5'),
  templatesHelpfulness: z
    .number()
    .min(1, 'Please rate templates helpfulness')
    .max(5, 'Rating must be between 1 and 5'),
  officeHoursHelpfulness: z
    .number()
    .min(1, 'Please rate office hours helpfulness')
    .max(5, 'Rating must be between 1 and 5'),
  onlineCoursesHelpfulness: z
    .number()
    .min(1, 'Please rate online courses helpfulness')
    .max(5, 'Rating must be between 1 and 5'),
  prioritizedTopics: z
    .array(z.enum(EDUCATION_TOPICS))
    .length(3, 'Please select exactly 3 prioritized topics'),
  paidCommunityLikelihood: z
    .number()
    .min(1, 'Please rate your likelihood to join')
    .max(5, 'Rating must be between 1 and 5'),
  paidCommunityExpectations: z
    .string()
    .min(10, 'Please provide at least 10 characters')
    .max(1000, 'Response is too long (max 1000 characters)'),
});

// C. Current Monetization Mix Schema
export const currentMonetizationMixSchema = z
  .object({
    brandDealsPercent: z.number().min(0).max(100).default(0),
    adsRevenuePercent: z.number().min(0).max(100).default(0),
    affiliatePercent: z.number().min(0).max(100).default(0),
    digitalProductsPercent: z.number().min(0).max(100).default(0),
    servicesPercent: z.number().min(0).max(100).default(0),
    membershipsPercent: z.number().min(0).max(100).default(0),
    licensingUgcPercent: z.number().min(0).max(100).default(0),
    merchPercent: z.number().min(0).max(100).default(0),
    otherPercent: z.number().min(0).max(100).default(0),
    biggestBlockers: z
      .array(z.enum(MONETIZATION_BLOCKERS))
      .min(1, 'Please select at least one blocker'),
  })
  .refine(
    data => {
      const total =
        (data.brandDealsPercent || 0) +
        (data.adsRevenuePercent || 0) +
        (data.affiliatePercent || 0) +
        (data.digitalProductsPercent || 0) +
        (data.servicesPercent || 0) +
        (data.membershipsPercent || 0) +
        (data.licensingUgcPercent || 0) +
        (data.merchPercent || 0) +
        (data.otherPercent || 0);
      return Math.abs(total - 100) < 0.01; // Allow small floating point differences
    },
    {
      message: 'Percentages must add up to 100%',
      path: ['brandDealsPercent'], // Show error on first field
    }
  );

// D. Pain Severity × Frequency Schema
const painIssueSchema = z.object({
  frequency: z.enum(FREQUENCY_OPTIONS),
  severity: z.number().min(1, 'Please rate severity').max(5, 'Severity must be between 1 and 5'),
});

export const painSeverityFrequencySchema = z.object({
  issues: z.record(z.enum(PAIN_ISSUES), painIssueSchema) as z.ZodType<
    Record<
      (typeof PAIN_ISSUES)[number],
      { frequency: (typeof FREQUENCY_OPTIONS)[number]; severity: number }
    >
  >,
});

// E. Phase 2: Infrastructure/OS Feature Resonance Schema
const featureValueSchema = z
  .number()
  .min(1, 'Please rate each feature')
  .max(5, 'Rating must be between 1 and 5');

export const phase2InfrastructureOSSchema = z.object({
  featureValues: z.record(z.enum(OS_FEATURES), featureValueSchema) as z.ZodType<
    Record<(typeof OS_FEATURES)[number], number>
  >,
  priorityFeature: z.enum([...OS_FEATURES, ''] as const),
  adoptionBlockers: z
    .string()
    .min(10, 'Please provide at least 10 characters')
    .max(1000, 'Response is too long (max 1000 characters)'),
});

// F. Willingness-to-Pay Schema
export const willingnessToPaySchema = z.object({
  currency: z.string().min(1, 'Please select a currency'),
  communityTooCheap: z.string().min(1, 'Please provide a price'),
  communityBargain: z.string().min(1, 'Please provide a price'),
  communityExpensive: z.string().min(1, 'Please provide a price'),
  communityTooExpensive: z.string().min(1, 'Please provide a price'),
  osTooCheap: z.string().min(1, 'Please provide a price'),
  osBargain: z.string().min(1, 'Please provide a price'),
  osExpensive: z.string().min(1, 'Please provide a price'),
  osTooExpensive: z.string().min(1, 'Please provide a price'),
  revenueBasedPricingLikelihood: z
    .number()
    .min(1, 'Please rate your likelihood')
    .max(5, 'Rating must be between 1 and 5'),
});

// G. Adoption & Beta Schema
export const adoptionBetaSchema = z.object({
  joinCommunityBeta: z.boolean(),
  joinOsBeta: z.boolean(),
  contactEmail: z.string().email('Please enter a valid email address'),
  contactPhone: z
    .string()
    .min(1, 'Phone number is required')
    .refine(val => {
      // Basic international phone number validation
      return /^\+?[\d\s\-\(\)]+$/.test(val) && val.replace(/\D/g, '').length >= 10;
    }, 'Please enter a valid phone number'),
});

// Complete Survey Schema
export const creatorSurveySchema = z.object({
  screenerProfile: screenerProfileSchema,
  phase1EducationCommunity: phase1EducationCommunitySchema,
  currentMonetizationMix: currentMonetizationMixSchema,
  painSeverityFrequency: painSeverityFrequencySchema,
  phase2InfrastructureOS: phase2InfrastructureOSSchema,
  willingnessToPay: willingnessToPaySchema,
  adoptionBeta: adoptionBetaSchema,
});

// Step-by-step validation schemas
export const creatorSurveyStepSchemas = {
  'screener-profile': screenerProfileSchema,
  'phase1-education': phase1EducationCommunitySchema,
  'monetization-mix': currentMonetizationMixSchema,
  'pain-severity': painSeverityFrequencySchema,
  'phase2-infrastructure': phase2InfrastructureOSSchema,
  'willingness-to-pay': willingnessToPaySchema,
  'adoption-beta': adoptionBetaSchema,
} as const;

// Export types inferred from schemas
export type ScreenerProfileInput = z.infer<typeof screenerProfileSchema>;
export type Phase1EducationCommunityInput = z.infer<typeof phase1EducationCommunitySchema>;
export type CurrentMonetizationMixInput = z.infer<typeof currentMonetizationMixSchema>;
export type PainSeverityFrequencyInput = z.infer<typeof painSeverityFrequencySchema>;
export type Phase2InfrastructureOSInput = z.infer<typeof phase2InfrastructureOSSchema>;
export type WillingnessToPayInput = z.infer<typeof willingnessToPaySchema>;
export type AdoptionBetaInput = z.infer<typeof adoptionBetaSchema>;
export type CreatorSurveyInput = z.infer<typeof creatorSurveySchema>;
