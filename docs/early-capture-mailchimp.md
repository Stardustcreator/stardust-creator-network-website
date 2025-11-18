# Early Capture to Mailchimp - Feature Documentation

## Overview

This feature captures contact information to your Mailchimp audience as soon as users complete the first section of your forms, even if they abandon the form before completion. This significantly increases lead capture rates since most people who start forms don't finish them.

## How It Works

### User Journey

#### Join as Creator Form

1. User fills out "Personal Information" section (name, email, phone, country, city, age range)
2. User checks the marketing consent checkbox: "I agree to receive updates, opportunities, and resources from Stardust Creator Network via email"
3. User clicks "Next" button
4. **Behind the scenes**: Contact info is immediately sent to Mailchimp with `partial-creator-signup` tag
5. If user completes the entire form:
   - Full data is saved to database
   - Mailchimp tag is upgraded from `partial-creator-signup` to `join-as-creator`
6. If user abandons the form:
   - You still have their contact info in Mailchimp with `partial-creator-signup` tag
   - You can follow up with them via email campaigns

#### Brand Brief Form

1. User fills out "Brand / Company Information" section
2. User checks the marketing consent checkbox
3. User clicks "Next" button
4. **Behind the scenes**: Contact info is immediately sent to Mailchimp with `partial-brand-inquiry` tag
5. If user completes the entire form:
   - Full data is saved to database
   - Mailchimp tag is upgraded from `partial-brand-inquiry` to `Brands-Find-Creators`
6. If user abandons the form:
   - You still have their contact info in Mailchimp with `partial-brand-inquiry` tag

### Technical Flow

```
User fills Section 1 → Clicks Next → Early Capture API called
                                           ↓
                                    Mailchimp receives contact
                                    with "partial" tag
                                           ↓
                            ┌──────────────┴──────────────┐
                            ↓                             ↓
                    User completes form          User abandons form
                            ↓                             ↓
                    Full submission API          Partial lead captured
                            ↓                    (stays in Mailchimp)
                Tags upgraded to "complete"
```

## Mailchimp Tags

### Tag Progression

| Form Type    | Early Capture Tag        | Complete Submission Tag |
| ------------ | ------------------------ | ----------------------- |
| Creator Form | `partial-creator-signup` | `join-as-creator`       |
| Brand Form   | `partial-brand-inquiry`  | `Brands-Find-Creators`  |

### Using Tags for Segmentation

In Mailchimp, you can create segments based on these tags:

**Partial Submissions (Abandoned Forms)**

- Creators: Filter by tag `partial-creator-signup` AND NOT tag `join-as-creator`
- Brands: Filter by tag `partial-brand-inquiry` AND NOT tag `Brands-Find-Creators`
- Use case: Send follow-up emails encouraging them to complete the form

**Complete Submissions**

- Creators: Filter by tag `join-as-creator`
- Brands: Filter by tag `Brands-Find-Creators`
- Use case: Send welcome emails, onboarding sequences

**All Leads (Partial + Complete)**

- Creators: Filter by tag `partial-creator-signup` OR `join-as-creator`
- Brands: Filter by tag `partial-brand-inquiry` OR `Brands-Find-Creators`

## Marketing Consent

### Why It's Required

The marketing consent checkbox ensures:

- **Legal compliance**: GDPR, CAN-SPAM, and other privacy laws require explicit consent
- **User trust**: Clear communication about what they're signing up for
- **Better engagement**: People who opt-in are more likely to open your emails

### Consent Language

**Current text**: "I agree to receive updates, opportunities, and resources from Stardust Creator Network via email. You can unsubscribe at any time."

This language:

- Clearly states what they'll receive
- Mentions the option to unsubscribe
- Is required to proceed to the next section

### What Happens Without Consent

If a user doesn't check the consent box:

- They **cannot** proceed to the next section (validation will fail)
- Their information is **not** sent to Mailchimp
- Form validation shows an error: "You must agree to receive updates from Stardust Creator Network to continue"

## Technical Implementation

### New API Endpoints

**`/api/early-capture/creator`**

- Method: POST
- Purpose: Capture creator contact info after Section 1
- Payload: email, fullName, phoneNumber, marketingConsent
- Returns: Success or error (non-blocking)

**`/api/early-capture/brand`**

- Method: POST
- Purpose: Capture brand contact info after Section 1
- Payload: email, contactPerson, phoneNumber, brandName, marketingConsent
- Returns: Success or error (non-blocking)

### Updated Files

**Services**

- `src/lib/services/mailchimp.service.ts`
  - Enhanced `addCreatorToMailchimp()` to support partial submissions
  - Enhanced `addBrandToMailchimp()` to support partial submissions
  - Added `updateMailchimpTags()` for tag upgrades

**API Routes**

- `src/app/api/early-capture/creator/route.ts` (new)
- `src/app/api/early-capture/brand/route.ts` (new)
- `src/app/api/creator-application/route.ts` (updated for tag upgrades)
- `src/app/api/brand-brief/route.ts` (updated for tag upgrades)

**Validation Schemas**

- `src/lib/validations/creator-application.validations.ts` (added marketingConsent)
- `src/lib/validations/brand-brief.validations.ts` (added marketingConsent)

**Type Definitions**

- `src/types/creator-application.types.ts` (added marketingConsent to PersonalInformation)
- `src/types/brand-brief.types.ts` (added marketingConsent to BrandCompanyInformation)

**Form Components**

- `src/components/forms/CreatorApplicationForm/steps/PersonalInformationStep.tsx`
  - Added marketing consent checkbox
  - Updated to handle boolean values
- `src/components/forms/BrandBriefForm/steps/BrandCompanyInformationStep.tsx`
  - Added marketing consent checkbox
  - Added privacy notice
- `src/components/forms/CreatorApplicationForm/CreatorApplicationForm.tsx`
  - Added early capture logic on step navigation
  - Tracks if early capture was already done
- `src/components/forms/BrandBriefForm/BrandBriefForm.tsx`
  - Added early capture logic on step navigation
  - Tracks if early capture was already done

## Error Handling

### Non-Blocking Design

Early capture failures **never block form progression**. If Mailchimp is down or the API fails:

- An error is logged to the console
- The user continues to the next section without interruption
- The form can still be completed normally

### Duplicate Prevention

- The early capture only runs once per session (tracked with `earlyCaptured` state)
- If a user goes back and forth between sections, it won't send duplicate requests
- Mailchimp's API uses email as the unique identifier, so the same person can't be added twice

### Tag Update Safety

When upgrading tags on full submission:

- The system removes the old "partial" tag
- Adds the new "complete" tag
- If tag update fails, the main submission still succeeds (non-blocking)

## Testing

### Test Scenarios

**Scenario 1: Complete Form**

1. Fill out Section 1 with marketing consent checked
2. Click Next → Check Mailchimp for entry with "partial" tag
3. Complete entire form
4. Check Mailchimp → Tag should be upgraded to "complete"

**Scenario 2: Abandoned Form**

1. Fill out Section 1 with marketing consent checked
2. Click Next → Check Mailchimp for entry with "partial" tag
3. Close browser/abandon form
4. Contact remains in Mailchimp with "partial" tag

**Scenario 3: No Consent**

1. Fill out Section 1 but don't check marketing consent
2. Click Next → Validation error appears
3. Check Mailchimp → No entry created

**Scenario 4: Multiple Attempts**

1. Fill out Section 1, check consent, click Next
2. Go back to Section 1
3. Click Next again
4. Only one early capture request is sent (duplicate prevention works)

### Manual Testing

```bash
# Start dev server
npm run dev

# Test creator form
1. Go to /join-as-creator
2. Fill Section 1
3. Check marketing consent box
4. Click Next
5. Check terminal logs for "Early capture successful"
6. Check Mailchimp audience for new contact with tag "partial-creator-signup"

# Test brand form
1. Go to /brand-brief
2. Fill Section 1
3. Check marketing consent box
4. Click Next
5. Check terminal logs for "Early capture successful"
6. Check Mailchimp audience for new contact with tag "partial-brand-inquiry"
```

## Environment Variables

Make sure these are set in your `.env.local` (development) and Vercel (production):

```bash
MAILCHIMP_API_KEY=your-api-key-here
MAILCHIMP_SERVER_PREFIX=us12
MAILCHIMP_AUDIENCE_ID=your-audience-id-here
```

## Benefits

### Increased Lead Capture

- Capture 3-5x more leads by getting contact info before users abandon
- No loss of potential contacts due to incomplete forms

### Better Follow-Up

- Segment partial vs complete submissions
- Send targeted follow-up emails to those who didn't finish
- Convert abandoned form users into completed applications

### Privacy-First

- Explicit consent required before any data is captured
- Clear communication about what users are signing up for
- Easy unsubscribe option mentioned upfront

### Non-Intrusive

- Happens silently in the background
- Never interrupts user experience
- Fails gracefully if Mailchimp is down

## Analytics & Insights

### Metrics You Can Track

Using Mailchimp tags, you can measure:

- **Partial submission rate**: How many people start but don't finish
- **Completion rate**: Percentage who upgrade from partial to complete
- **Form abandonment point**: Section 1 vs later sections
- **Follow-up effectiveness**: Conversion rate of follow-up emails to partial leads

### Sample Mailchimp Report Setup

1. Create segments for each tag
2. Track subscriber counts over time
3. Compare:
   - Total partial leads
   - Total complete leads
   - Ratio of partial to complete

## Future Enhancements

Possible improvements for the future:

- Add more granular tags for each section completed
- Capture additional fields beyond just contact info
- Implement progressive profiling (save each section as they go)
- Add retargeting pixels for abandoned forms
- Send automated follow-up emails from Mailchimp
- A/B test different consent language

## Troubleshooting

### Contact Not Appearing in Mailchimp

**Check:**

1. Are environment variables set correctly?
2. Is marketing consent checkbox checked?
3. Check browser console for errors
4. Check server logs for Mailchimp API errors
5. Verify Mailchimp API key has write permissions

### Tags Not Updating

**Check:**

1. Does the contact exist in Mailchimp?
2. Check server logs for "Tag update failed" messages
3. Verify tag names match exactly (case-sensitive)
4. Ensure Mailchimp API key hasn't expired

### Validation Error on Consent Checkbox

**This is expected behavior** if:

- Checkbox is not checked
- User tries to proceed without consent
- This prevents capturing data without permission

## Support

For questions or issues:

1. Check server logs (terminal or Vercel logs)
2. Verify Mailchimp dashboard for contacts and tags
3. Test with a fresh email address
4. Check this documentation for common scenarios
