/**
 * Zod validation schemas for the Creator Application Form
 * Used for both client-side and server-side validation
 */

import { z } from 'zod';
import {
  COUNTRIES,
  AGE_RANGES,
  PLATFORMS,
  AUDIENCE_SIZES,
  CONTENT_CATEGORIES,
  CREATOR_TYPES,
  NIGERIA_FEE_RANGES,
  UK_FEE_RANGES,
  MONETIZATION_METHODS,
  OPPORTUNITY_INTERESTS,
  CREATOR_OS_FEATURES,
  COMMUNITY_INTEREST_LEVELS,
  type Country,
} from '@/types/creator-application.types';

// Helper function to get fee ranges based on country
function getFeeRanges(country: Country) {
  switch (country) {
    case 'Nigeria':
      return NIGERIA_FEE_RANGES;
    case 'United Kingdom':
      return UK_FEE_RANGES;
    default:
      return NIGERIA_FEE_RANGES; // Default to Nigeria ranges
  }
}

// Personal Information Schema
export const personalInformationSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters')
    .regex(
      /^[a-zA-Z\s'-]+$/,
      'Full name can only contain letters, spaces, hyphens, and apostrophes'
    ),

  email: z
    .string()
    .email('Please enter a valid email address')
    .max(254, 'Email address is too long'),

  phoneNumber: z
    .string()
    .optional()
    .refine(val => {
      if (!val) return true; // Optional field
      // Basic international phone number validation
      return /^\+?[\d\s\-\(\)]+$/.test(val) && val.replace(/\D/g, '').length >= 10;
    }, 'Please enter a valid phone number'),

  country: z.enum(COUNTRIES, {
    message: 'Please select your country',
  }),

  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City name is too long')
    .regex(
      /^[a-zA-Z\s'-]+$/,
      'City name can only contain letters, spaces, hyphens, and apostrophes'
    ),

  ageRange: z.enum(AGE_RANGES, {
    message: 'Please select your age range',
  }),
});

// Social Links Schema
const socialLinkSchema = z.object({
  platform: z.enum(PLATFORMS),
  url: z
    .string()
    .url('Please enter a valid URL')
    .refine(() => {
      // Basic validation for social media URLs
      // Allow all for now, can be stricter later
      return true;
    }, 'Please enter a valid social media URL'),
});

// Creator Identity Schema
export const creatorIdentitySchema = z.object({
  creatorHandle: z
    .string()
    .min(2, 'Creator handle must be at least 2 characters')
    .max(30, 'Creator handle must be less than 30 characters')
    .regex(
      /^[a-zA-Z0-9._-]+$/,
      'Creator handle can only contain letters, numbers, dots, underscores, and hyphens'
    ),

  primaryPlatforms: z
    .array(z.enum(PLATFORMS))
    .min(1, 'Please select at least one platform')
    .max(5, 'Please select no more than 5 platforms'),

  socialLinks: z
    .array(socialLinkSchema)
    .min(1, 'Please provide at least one social media link')
    .max(10, 'Please provide no more than 10 social media links'),

  audienceSize: z.enum(AUDIENCE_SIZES, {
    message: 'Please select your audience size',
  }),

  contentCategories: z
    .array(z.enum(CONTENT_CATEGORIES))
    .min(1, 'Please select at least one content category')
    .max(5, 'Please select no more than 5 content categories'),

  creatorType: z.enum(CREATOR_TYPES, {
    message: 'Please select your creator type',
  }),
});

// Dynamic fee range schema based on country
export const createMonetizationExperienceSchema = (country: Country) => {

  return z.object({
    workedWithBrands: z.boolean({
      message: 'Please indicate if you have worked with brands before',
    }),

    brandExample: z
      .string()
      .max(100, 'Brand name is too long')
      .optional()
      .refine((val, ctx) => {
        // Required if workedWithBrands is true
        const workedWithBrands = ctx.parent?.workedWithBrands;
        if (workedWithBrands && (!val || val.trim().length === 0)) {
          return false;
        }
        return true;
      }, "Please provide an example of a brand you've worked with"),

    feeRange: z.string({
      message: 'Please select your typical fee range',
    }),

    monetizationMethods: z
      .array(z.enum(MONETIZATION_METHODS))
      .min(1, 'Please select at least one monetization method'),

    opportunityInterests: z
      .array(z.enum(OPPORTUNITY_INTERESTS))
      .min(1, 'Please select at least one opportunity type'),
  });
};

// Education & Tools Interest Schema
export const educationToolsInterestSchema = z.object({
  creatorOSFeatures: z
    .array(z.enum(CREATOR_OS_FEATURES))
    .max(5, 'Please select no more than 5 features')
    .min(1, 'Please select at least one feature'),

  communityInterest: z.enum(COMMUNITY_INTEREST_LEVELS, {
    message: 'Please select your community interest level',
  }),
});

// Verification & Agreement Schema
export const verificationAgreementSchema = z.object({
  mediaKit: z
    .instanceof(File)
    .optional()
    .refine(file => {
      if (!file) return true; // Optional

      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        return false;
      }

      // Check file type
      const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];

      return allowedTypes.includes(file.type);
    }, 'File must be a PDF, image, or Word document under 10MB'),

  authenticityConfirmed: z
    .boolean()
    .refine(val => val === true, 'You must confirm authenticity of your content'),

  termsAgreed: z
    .boolean()
    .refine(val => val === true, 'You must agree to the Terms of Service and Privacy Policy'),
});

// Complete form schema factory
export const createCompleteFormSchema = (country: Country) => {
  return z.object({
    personalInformation: personalInformationSchema,
    creatorIdentity: creatorIdentitySchema,
    monetizationExperience: createMonetizationExperienceSchema(country),
    educationToolsInterest: educationToolsInterestSchema,
    verificationAgreement: verificationAgreementSchema,
  });
};

// API request schema (without File objects)
export const apiCreatorApplicationSchema = z.object({
  personalInformation: personalInformationSchema,
  creatorIdentity: creatorIdentitySchema,
  monetizationExperience: z.object({
    workedWithBrands: z.boolean(),
    brandExample: z.string().optional(),
    feeRange: z.string(),
    monetizationMethods: z.array(z.string()),
    opportunityInterests: z.array(z.string()),
  }),
  educationToolsInterest: z.object({
    creatorOSFeatures: z.array(z.string()),
    communityInterest: z.string(),
  }),
  verificationAgreement: z.object({
    authenticityConfirmed: z.boolean(),
    termsAgreed: z.boolean(),
  }),
  // Additional metadata
  location: z.string(),
  submittedAt: z.string().datetime(),
});

// Form step validation schemas
export const formStepSchemas = {
  'personal-information': personalInformationSchema,
  'creator-identity': creatorIdentitySchema,
  'education-tools-interest': educationToolsInterestSchema,
  'verification-agreement': verificationAgreementSchema,
} as const;

// Export types inferred from schemas
export type PersonalInformationInput = z.infer<typeof personalInformationSchema>;
export type CreatorIdentityInput = z.infer<typeof creatorIdentitySchema>;
export type EducationToolsInterestInput = z.infer<typeof educationToolsInterestSchema>;
export type VerificationAgreementInput = z.infer<typeof verificationAgreementSchema>;
export type ApiCreatorApplicationInput = z.infer<typeof apiCreatorApplicationSchema>;
