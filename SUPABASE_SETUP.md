# Supabase Setup for Creator Registration

This document outlines the setup process for storing creator application data in Supabase.

## Database Schema

Two tables have been created to store creator registrations:

- `scn_creator_registrations_ng` - For Nigerian registrants
- `scn_creator_registrations_uk` - For UK registrants

### Table Structure

Both tables contain the following fields:

**Personal Information:**

- `full_name` - Creator's full name
- `email` - Email address (unique per table)
- `phone_number` - Optional phone number
- `country` - Country (Nigeria/United Kingdom)
- `city` - City of residence
- `age_range` - Age range selection

**Creator Identity:**

- `creator_handle` - Social media handle
- `primary_platforms` - Array of main social platforms
- `social_links` - JSON array of social media links
- `audience_size` - Audience size category
- `content_categories` - Array of content categories
- `creator_type` - Type of creator

**Monetization Experience:**

- `worked_with_brands` - Boolean flag
- `brand_example` - Example brand worked with
- `fee_range` - Typical fee range (location-specific)
- `monetization_methods` - Array of monetization methods
- `opportunity_interests` - Array of opportunity interests

**Education & Tools Interest:**

- `creator_os_features` - Array of interested features
- `community_interest` - Community participation interest level

**Verification & Agreement:**

- `media_kit_url` - URL to uploaded media kit
- `authenticity_confirmed` - Authenticity confirmation
- `terms_agreed` - Terms agreement

**Metadata:**

- `application_status` - Status: submitted, under-review, approved, rejected
- `location_detected` - Detected location via geolocation API
- `user_agent` - Browser user agent
- `ip_address` - IP address for tracking
- `referrer_url` - Referral URL
- `utm_source`, `utm_medium`, `utm_campaign` - UTM tracking
- `created_at`, `updated_at` - Timestamps
- `reviewed_at`, `approved_at` - Review timestamps

## Environment Variables Setup

You need to create a `.env.local` file in the project root with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://mtdchowzitagopmsurzi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10ZGNob3d6aXRhZ29wbXN1cnppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTQ0NTEsImV4cCI6MjA2MzM5MDQ1MX0.Li01KuLN0F4hvUJhVIUNsm3zRg8zs7VtiM06cy2JgEk

# Service Role Key (KEEP SECRET!)
# Get this from: Supabase Dashboard > Project Settings > API > service_role key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Development settings
NODE_ENV=development
```

### Getting the Service Role Key

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Project Settings** > **API**
4. Copy the `service_role` key (NOT the `anon` key)
5. Replace `your_service_role_key_here` in the `.env.local` file

**⚠️ Important:** Never commit the service role key to version control. It bypasses Row Level Security and should only be used on the server.

## API Implementation

The creator application API (`/api/creator-application`) now:

1. **Validates** form data using Zod schemas
2. **Determines** which table to use based on the user's country
3. **Extracts** metadata (IP, user agent, UTM parameters)
4. **Stores** data in the appropriate Supabase table
5. **Handles** errors (validation, database, duplicate emails)
6. **Returns** application ID and confirmation

### Request Flow

```
Form Submission → Validation → Country Detection → Table Selection → Database Insert → Response
```

### Country-to-Table Mapping

- `Nigeria` → `scn_creator_registrations_ng`
- `United Kingdom` or `UK` → `scn_creator_registrations_uk`
- Other countries → `scn_creator_registrations_ng` (default)

## Error Handling

The API handles:

- **Validation errors** (400) - Invalid form data
- **Duplicate emails** (409) - Email already exists in table
- **Database errors** (500) - General database issues
- **Server errors** (500) - Unexpected errors

## Data Privacy & Security

- Email addresses are unique per table
- IP addresses are stored for tracking/security
- Service role key bypasses RLS - use with caution
- All sensitive data should be handled according to privacy laws

## Testing

To test the integration:

1. Ensure environment variables are set
2. Start the development server: `npm run dev`
3. Navigate to the creator application form
4. Submit a test application
5. Check the appropriate Supabase table for the stored data

## Monitoring

Monitor applications through:

- Supabase Dashboard > Table Editor
- Application logs in the console
- Error tracking via Sentry (if configured)

## Next Steps

Consider implementing:

- Email notifications for new applications
- Admin dashboard for reviewing applications
- Automated approval/rejection workflows
- Media kit file upload handling
- Application status tracking for users
- Analytics and reporting on registrations
