# Mailchimp Integration Setup Guide

This guide will help you connect your "Join as a Creator" form to your Mailchimp audience list.

## What This Does

When someone completes the creator application form, their information is automatically sent to your Mailchimp audience list with these details:

- Email address
- First name (extracted from full name)
- Last name (extracted from full name)
- Phone number
- Tag: `join-as-creator` (so you can easily find and segment this group)

## Prerequisites

You need a Mailchimp account with:

- An audience list created (this is where contacts will be added)
- An API key (to allow your website to talk to Mailchimp)

## Step 1: Get Your Mailchimp API Key

1. Log into your Mailchimp account
2. Click on your profile icon in the bottom left
3. Select **Account & Billing** (or **Account**)
4. Click on the **Extras** dropdown menu
5. Select **API keys**
6. If you don't have an API key, click **Create A Key**
7. Copy your API key (it looks like: `abc123def456-us12`)

**Important:** Keep this key secret! Don't share it publicly.

## Step 2: Find Your Server Prefix

Your server prefix is in your API key. For example:

- If your API key is: `abc123def456-us12`
- Your server prefix is: `us12`

It's the part after the dash (`-`).

## Step 3: Get Your Audience ID

1. In Mailchimp, go to **Audience** in the main menu
2. Click **All contacts**
3. Click **Settings** dropdown
4. Select **Audience name and defaults**
5. Look for **Audience ID** (it looks like: `a1b2c3d4e5`)
6. Copy this ID

## Step 4: Add Environment Variables

You need to add three pieces of information to your website's environment variables file.

### For Local Development

Create or edit the `.env.local` file in your project root:

```bash
# Mailchimp Configuration
MAILCHIMP_API_KEY=your-api-key-here
MAILCHIMP_SERVER_PREFIX=us12
MAILCHIMP_AUDIENCE_ID=your-audience-id-here
```

Replace:

- `your-api-key-here` with your actual API key from Step 1
- `us12` with your actual server prefix from Step 2
- `your-audience-id-here` with your actual Audience ID from Step 3

### For Production (Vercel)

1. Go to your project on Vercel
2. Click **Settings**
3. Click **Environment Variables**
4. Add these three variables one by one:
   - Name: `MAILCHIMP_API_KEY`, Value: your API key
   - Name: `MAILCHIMP_SERVER_PREFIX`, Value: your server prefix
   - Name: `MAILCHIMP_AUDIENCE_ID`, Value: your audience ID
5. Click **Save** for each

## Step 5: Set Up Merge Fields in Mailchimp

The integration sends first name, last name, and phone number. You need to make sure these fields exist in your Mailchimp audience:

1. Go to **Audience** in Mailchimp
2. Click **All contacts**
3. Click **Settings** dropdown
4. Select **Audience fields and _|MERGE|_ tags**
5. Verify these fields exist:
   - `FNAME` (First Name) - usually exists by default
   - `LNAME` (Last Name) - usually exists by default
   - `PHONE` (Phone Number) - you may need to add this

### To Add the Phone Field (if missing):

1. Click **Add A Field**
2. Select **Phone** as the field type
3. Name it "Phone"
4. The merge tag should be `PHONE`
5. Click **Save**

## Step 6: Test the Integration

1. Restart your local development server if it's running:

   ```bash
   npm run dev
   ```

2. Go to the creator application form in your browser
3. Fill out and submit the form
4. Check your Mailchimp audience - the new contact should appear within a few seconds
5. Verify the contact has the `join-as-creator` tag

## Understanding How It Works

### Non-Blocking Behavior

The Mailchimp integration is designed to be "non-blocking." This means:

- If Mailchimp is down or there's an error, the form submission still succeeds
- The user gets their confirmation page normally
- Errors are logged for you to review but don't interrupt the user experience

This is important because you don't want a Mailchimp issue to prevent someone from signing up!

### What Gets Synced

The integration automatically:

1. Creates a new contact if they don't exist
2. Updates the contact if they already exist (based on email)
3. Sets their status to "subscribed"
4. Adds the `join-as-creator` tag

### Name Handling

The form collects a "Full Name" field. The integration splits this:

- First word = First Name (FNAME)
- Remaining words = Last Name (LNAME)

Examples:

- "John Smith" → First: "John", Last: "Smith"
- "Maria Garcia Lopez" → First: "Maria", Last: "Garcia Lopez"
- "Adebayo" → First: "Adebayo", Last: ""

## Troubleshooting

### "Mailchimp sync failed" in logs

Check your server logs (Vercel logs or local terminal). The error will tell you:

**"Mailchimp configuration missing"**

- You're missing one or more environment variables
- Double-check Step 4

**"401 Unauthorized"**

- Your API key is incorrect
- Generate a new API key in Mailchimp (Step 1)

**"404 Not Found"**

- Your Audience ID or Server Prefix is incorrect
- Double-check Steps 2 and 3

**"400 Bad Request" with merge field errors**

- The PHONE field might not exist in your audience
- Follow Step 5 to add it

### Contact not appearing in Mailchimp

1. Check if the contact was added but not tagged:
   - Search for their email in Mailchimp
   - If found, the API key works but tagging might have failed

2. Check Vercel/local logs for errors

3. Verify your environment variables are set correctly

### Testing Mailchimp Connection

You can test your Mailchimp connection by adding a test contact manually through the API using a tool like Postman or curl:

```bash
curl -X POST \
  https://YOUR_SERVER_PREFIX.api.mailchimp.com/3.0/lists/YOUR_AUDIENCE_ID/members \
  -u "anystring:YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email_address": "test@example.com",
    "status": "subscribed"
  }'
```

Replace:

- `YOUR_SERVER_PREFIX` with your server prefix
- `YOUR_AUDIENCE_ID` with your audience ID
- `YOUR_API_KEY` with your API key

If this works, your credentials are correct.

## Using the "join-as-creator" Tag

Once contacts are tagged, you can:

1. **Create segments**: Filter your audience by the `join-as-creator` tag
2. **Send targeted campaigns**: Email only creators who joined through this form
3. **Automate workflows**: Set up automated welcome emails for new creators
4. **Track conversions**: See how many people are joining as creators over time

### Creating a Segment

1. Go to **Audience** → **All contacts**
2. Click **View contacts**
3. Click **New segment**
4. Choose **Tag** → **is** → `join-as-creator`
5. Name your segment (e.g., "Creator Applicants")
6. Save and use this segment for campaigns

## Security Notes

- Never commit your `.env.local` file to version control (it should be in `.gitignore`)
- Keep your API key secret
- If you think your API key was exposed, regenerate it in Mailchimp immediately
- Only use the minimum required permissions for your API key

## Support

For Mailchimp-specific issues:

- Visit [Mailchimp API Documentation](https://mailchimp.com/developer/marketing/api/)
- Check [Mailchimp Support](https://mailchimp.com/help/)

For integration issues:

- Check server logs for detailed error messages
- Verify all environment variables are set correctly
- Ensure your Mailchimp account is active and not suspended
