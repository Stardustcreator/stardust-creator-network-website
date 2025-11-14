# Mailchimp Integration Quick Start

Quick reference for setting up Mailchimp integration with the "Join as a Creator" form.

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

When someone completes the creator application form:

- Email address
- First name (from full name)
- Last name (from full name)
- Phone number
- Tag: `join-as-creator`

## Testing

1. Add the environment variables
2. Restart your dev server: `npm run dev`
3. Submit a test application
4. Check Mailchimp - contact should appear with the `join-as-creator` tag

## Troubleshooting

Check your server logs (terminal or Vercel logs) for error messages.

Common issues:

- "Configuration missing" → Check environment variables are set
- "401 Unauthorized" → API key is incorrect
- "404 Not Found" → Audience ID or Server Prefix is wrong
- "Merge field error" → Add PHONE field in Mailchimp (Audience → Settings → Audience fields)

## Full Documentation

For detailed setup instructions: [mailchimp-integration-setup.md](mailchimp-integration-setup.md)

## Need Help?

The integration is non-blocking - if Mailchimp fails, form submissions still work. Check logs to debug issues without disrupting users.
