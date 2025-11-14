# Mailchimp Integration for Brand Briefs

This document explains how brand brief submissions are automatically synced to your Mailchimp audience.

## Overview

When a brand completes the brand brief form, their contact information is automatically added to your Mailchimp audience list alongside creator applicants. Both groups use the same Mailchimp audience but are distinguished by different tags.

## What Gets Synced

When a brand submits a brief, the following information is sent to Mailchimp:

- **Email address** - The brand's contact email
- **First name** - Extracted from the contact person field
- **Last name** - Extracted from the contact person field
- **Phone number** - The brand's contact phone (if provided)
- **Brand name** - The brand name (stored in BRAND merge field)
- **Tag**: `Brands-Find-Creators` - Identifies this as a brand lead

## How It Works

### Data Flow

```
Brand submits brief
    ↓
Save to database
    ↓
Sync to Google Sheets (Nigeria only)
    ↓
Send to Mailchimp (all countries)
    ↓
Show confirmation page
```

### Name Splitting

The form collects "Contact Person" as a full name. The integration automatically splits it:

**Examples:**

- "Sarah Johnson" → First: "Sarah", Last: "Johnson"
- "María García López" → First: "María", Last: "García López"
- "Adebayo" → First: "Adebayo", Last: ""

### Integration Points

Both creator applicants and brand contacts go to the **same Mailchimp audience** but with different tags:

| Form Type       | Tag                    | Use Case                         |
| --------------- | ---------------------- | -------------------------------- |
| Join as Creator | `join-as-creator`      | Creator applicants               |
| Brand Brief     | `Brands-Find-Creators` | Brand leads looking for creators |

This allows you to:

- Manage all contacts in one place
- Segment by form type using tags
- Cross-reference brands and creators
- Send targeted campaigns to each group

## Setup Requirements

### Environment Variables

The brand brief integration uses the same Mailchimp configuration as the creator form:

```bash
MAILCHIMP_API_KEY=your-api-key-here
MAILCHIMP_SERVER_PREFIX=us12
MAILCHIMP_AUDIENCE_ID=your-audience-id-here
```

If you've already set these up for the creator form, **no additional configuration is needed**.

If not, follow the setup guide: [mailchimp-integration-setup.md](mailchimp-integration-setup.md)

### Mailchimp Merge Fields

Ensure these merge fields exist in your Mailchimp audience:

1. **FNAME** (First Name) - Usually exists by default
2. **LNAME** (Last Name) - Usually exists by default
3. **PHONE** (Phone Number) - May need to add
4. **BRAND** (Brand Name) - May need to add

#### Adding the BRAND Field

1. Go to **Audience** → **All contacts** in Mailchimp
2. Click **Settings** → **Audience fields and _|MERGE|_ tags**
3. Click **Add A Field**
4. Select **Text** as the field type
5. Name it "Brand Name"
6. Set the merge tag to `BRAND`
7. Click **Save**

## Using Tags for Segmentation

### View Brand Leads Only

1. Go to **Audience** → **All contacts**
2. Click **View contacts**
3. Click **New segment**
4. Choose **Tag** → **is** → `Brands-Find-Creators`
5. Save as "Brand Leads"

### View Creator Applicants Only

1. Create a segment with **Tag** → **is** → `join-as-creator`
2. Save as "Creator Applicants"

### View Both Groups

1. Create a segment with **Tag** → **is any of** → Select both tags
2. Save as "All Stardust Leads"

## Campaign Ideas

### For Brands

**Welcome Email**:

- Thank them for submitting a brief
- Explain what happens next
- Share creator success stories

**Nurture Campaign**:

- Tips for working with creators
- Case studies
- Platform updates

### For Creators

**Welcome Email**:

- Confirm their application
- Explain the approval process
- Share brand partnership tips

**Cross-Promotion**:

- Send brands to creators when there's a good match
- Notify creators about new brand opportunities

## Testing

### Test the Integration

1. Ensure environment variables are set
2. Restart your development server: `npm run dev`
3. Submit a test brand brief
4. Check Mailchimp - contact should appear with:
   - First name, last name from contact person
   - Email address
   - Phone number (if provided)
   - Company/brand name
   - `Brands-Find-Creators` tag

### Verify Segmentation

1. Submit both a creator application and a brand brief
2. In Mailchimp, create segments for each tag
3. Confirm contacts appear in the correct segments

## Troubleshooting

### Contact Not Appearing in Mailchimp

1. **Check server logs** (Vercel or local terminal)
   - Look for "Successfully added brand to Mailchimp"
   - Or errors like "Failed to add brand to Mailchimp"

2. **Verify environment variables**

   ```bash
   # In your project root
   echo $MAILCHIMP_API_KEY
   echo $MAILCHIMP_SERVER_PREFIX
   echo $MAILCHIMP_AUDIENCE_ID
   ```

3. **Check Mailchimp directly**
   - Search for the email in your audience
   - If found but not tagged, tagging may have failed
   - If not found, the API request likely failed

### Tag Not Applied

If contact appears in Mailchimp but without the tag:

1. Check Mailchimp API logs for tag errors
2. Verify tag name is exactly `Brands-Find-Creators` (case-sensitive)
3. Manually add the tag in Mailchimp as a test
4. Resubmit a test brief to see if it works

### BRAND Field Errors

Error: `Merge field 'BRAND' does not exist`

**Solution**: Add the BRAND merge field (see "Mailchimp Merge Fields" section above)

### Phone Number Format Issues

If phone numbers aren't syncing:

1. Verify the PHONE merge field exists and type is "Phone"
2. Check if Mailchimp has phone format requirements
3. The integration sends the phone "as-is" from the form

## Non-Blocking Behavior

Like the creator form integration, brand brief Mailchimp sync is **non-blocking**:

- If Mailchimp fails, the brief submission still succeeds
- Users see their confirmation page normally
- Errors are logged for you to review
- No user experience disruption

This ensures business continuity even if Mailchimp has issues.

## Data Privacy

### What's Stored

All data sent to Mailchimp comes from the brand brief form:

- Contact information (name, email, phone)
- Brand name

**Not synced to Mailchimp**:

- Campaign details
- Budget information
- Internal notes
- Other sensitive data

### Compliance

- Users consent via the terms agreement checkbox
- You can update or delete contacts in Mailchimp
- GDPR/privacy controls available in Mailchimp settings

## Advanced Usage

### Automation Workflows

Set up automated workflows in Mailchimp:

1. **Brand Welcome Series**
   - Trigger: Contact added with `Brands-Find-Creators` tag
   - Action: Send welcome email series

2. **Creator Welcome Series**
   - Trigger: Contact added with `join-as-creator` tag
   - Action: Send creator onboarding emails

3. **Match Notifications**
   - When you match a brand with creators
   - Send customized emails to both groups

### Custom Merge Fields

You can extend the integration to send more data:

1. Add merge fields in Mailchimp (e.g., INDUSTRY, BUDGET)
2. Update `addBrandToMailchimp` function in `src/lib/services/mailchimp.service.ts`
3. Add the data to the `merge_fields` object

Example:

```typescript
merge_fields: {
  FNAME: firstName,
  LNAME: lastName,
  PHONE: data.phoneNumber || '',
  BRAND: data.brandName,
  INDUSTRY: data.industry, // Add this
  BUDGET: data.budget,     // Add this
}
```

## Monitoring

### Check Sync Success Rate

In your server logs, look for:

**Success**:

```
Successfully added brand to Mailchimp: {
  email: "brand@example.com",
  brandName: "Example Brand",
  id: "abc123",
  status: "subscribed"
}
```

**Failure**:

```
Failed to add brand to Mailchimp: {
  email: "brand@example.com",
  brandName: "Example Brand",
  error: "API error message"
}
```

### Mailchimp Dashboard

Monitor in Mailchimp:

- **Audience growth** - Track new brand contacts
- **Tag performance** - See how many brands vs creators
- **Engagement rates** - Open/click rates by segment

## Support

- **General Mailchimp setup**: [mailchimp-integration-setup.md](mailchimp-integration-setup.md)
- **Quick reference**: [mailchimp-quick-start.md](mailchimp-quick-start.md)
- **Mailchimp documentation**: https://mailchimp.com/help/
- **Mailchimp API docs**: https://mailchimp.com/developer/marketing/api/

## Summary

The brand brief Mailchimp integration:

- ✓ Uses the same audience as creator applications
- ✓ Tags contacts with `Brands-Find-Creators`
- ✓ Includes contact name, email, phone, and brand name
- ✓ Works alongside Google Sheets sync
- ✓ Non-blocking (won't break form submissions)
- ✓ Requires no additional configuration if creator integration is already set up

Both creator and brand contacts flow into one centralized Mailchimp audience, making it easy to manage and nurture both sides of your marketplace.
