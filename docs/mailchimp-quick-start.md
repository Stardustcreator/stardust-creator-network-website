# Mailchimp Integration Quick Start

Quick reference for setting up Mailchimp integration with both the "Join as a Creator" and "Brand Brief" forms.

## What You Need

Three pieces of information from Mailchimp:

1. **API Key**: `abc123def456-us12` (found in Account Settings → Extras → API Keys)
2. **Server Prefix**: `us12` (the part after the dash in your API key)
3. **Audience ID**: `a1b2c3d4e5` (found in Audience → Settings → Audience name and defaults)

## Environment Variables

Add these to your `.env.local` file:

```bash
MAILCHIMP_API_KEY=abc123def456-us12
MAILCHIMP_SERVER_PREFIX=us12
MAILCHIMP_AUDIENCE_ID=a1b2c3d4e5
```

For Vercel (production), add the same three variables in: Settings → Environment Variables

## What Gets Synced

Both forms sync to the **same Mailchimp audience** but with different tags:

### Join as a Creator Form

- Email address
- First name (from full name)
- Last name (from full name)
- Phone number
- **Tag**: `join-as-creator`

### Brand Brief Form

- Email address
- First name (from contact person)
- Last name (from contact person)
- Phone number
- Brand/company name
- **Tag**: `Brands-Find-Creators`

## Required Mailchimp Merge Fields

Make sure these fields exist in your Mailchimp audience:

- **FNAME** (First Name) - Usually exists by default
- **LNAME** (Last Name) - Usually exists by default
- **PHONE** (Phone Number) - May need to add
- **BRAND** (Brand Name) - May need to add for brand briefs

## Testing

1. Add the environment variables
2. Restart your dev server: `npm run dev`
3. Submit a test creator application
4. Submit a test brand brief
5. Check Mailchimp - both contacts should appear with their respective tags

## Segmenting Your Audience

In Mailchimp, create segments to view each group:

**Creators**: Filter by tag `join-as-creator`
**Brands**: Filter by tag `Brands-Find-Creators`
**All Leads**: Filter by tags containing either value

## Troubleshooting

Check your server logs (terminal or Vercel logs) for error messages.

Common issues:

- "Configuration missing" → Check environment variables are set
- "401 Unauthorized" → API key is incorrect
- "404 Not Found" → Audience ID or Server Prefix is wrong
- "Merge field error" → Add missing fields (PHONE, BRAND) in Mailchimp

## Full Documentation

For detailed instructions:

- General setup: [mailchimp-integration-setup.md](mailchimp-integration-setup.md)
- Brand brief details: [mailchimp-brand-brief-integration.md](mailchimp-brand-brief-integration.md)

## Need Help?

Both integrations are non-blocking - if Mailchimp fails, form submissions still work. Check logs to debug issues without disrupting users.
