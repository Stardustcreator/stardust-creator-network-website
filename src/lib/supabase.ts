/**
 * Supabase client configuration for server-side operations
 * Used for database operations in API routes and server components
 */

import { createClient } from '@supabase/supabase-js';

// Environment variables validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!supabaseServiceRoleKey) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
}

// Create Supabase client with service role key for server-side operations
// This bypasses Row Level Security (RLS) and should only be used in secure server environments
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Database table names
export const CREATOR_REGISTRATION_TABLES = {
  NIGERIA: 'scn_creator_registrations_ng',
  UK: 'scn_creator_registrations_uk',
  'UNITED KINGDOM': 'scn_creator_registrations_uk',
} as const;

// Helper function to get the correct table name based on country
export function getCreatorRegistrationTable(country: string): string {
  const normalizedCountry = country.toUpperCase().trim();

  if (normalizedCountry === 'NIGERIA') {
    return CREATOR_REGISTRATION_TABLES.NIGERIA;
  }

  if (normalizedCountry === 'UNITED KINGDOM' || normalizedCountry === 'UK') {
    return CREATOR_REGISTRATION_TABLES.UK;
  }

  // Default to Nigeria table for other countries
  return CREATOR_REGISTRATION_TABLES.NIGERIA;
}

// Types for database operations
export interface CreatorRegistrationRecord {
  id?: string;

  // Personal Information
  full_name: string;
  email: string;
  phone_number?: string;
  country: string;
  city: string;
  age_range: string;

  // Creator Identity
  creator_handle: string;
  primary_platforms: string[];
  social_links: Array<{ platform: string; url: string }>;
  audience_size: string;
  content_categories: string[];
  creator_type: string;

  // Monetization Experience
  worked_with_brands: boolean;
  brand_example?: string;
  fee_range: string;
  monetization_methods: string[];
  opportunity_interests: string[];

  // Education & Tools Interest
  creator_os_features: string[];
  community_interest: string;

  // Verification & Agreement
  media_kit_url?: string;
  authenticity_confirmed: boolean;
  terms_agreed: boolean;

  // Metadata
  application_status?: string;
  location_detected?: string;
  user_agent?: string;
  ip_address?: string;
  referrer_url?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;

  // Timestamps
  created_at?: string;
  updated_at?: string;
}
