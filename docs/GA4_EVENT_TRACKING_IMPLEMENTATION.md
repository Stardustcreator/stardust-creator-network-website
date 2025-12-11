# GA4 Event Tracking Implementation Summary

**Date:** December 2025  
**Status:** ✅ Completed

## Overview

Comprehensive event tracking has been implemented across the Stardust Creator Network website using the existing GA4 setup (Measurement ID: `G-8CMEVERXXG`), Google Tag Manager (GTM), and the ConversionTracker component. All events are tracked to both GA4 and GTM with debouncing to prevent duplicate events.

---

## Events Tracked

### 1. Book a Campaign Button Click

**Event Name:** `book_campaign_click`

**Location:**

- `src/components/forms/BrandBriefForm/steps/ThankYouStep.tsx` (line 108)

**Event Properties:**

- `event_category`: "Conversion"
- `event_label`: Button location (e.g., "brand_brief_thank_you")
- `button_location`: Button location identifier

**Implementation:**

```typescript
trackBookCampaignClick('brand_brief_thank_you');
```

---

### 2. Contact Form Submission

**Event Name:** `form_submit`

**Locations:**

- `src/components/forms/BrandBriefForm/BrandBriefForm.tsx` (line 436)
- `src/components/forms/CreatorApplicationForm/CreatorApplicationForm.tsx` (line 479)

**Event Properties:**

- `event_category`: "Form"
- `event_label`: Form name (e.g., "brand_brief_form", "creator_application_form")
- `form_type`: "brand_brief" or "creator_signup"
- `country`: User's country
- `form_id`: Form submission ID (if available)

**Implementation:**

```typescript
// Brand Brief Form
trackFormSubmit('brand_brief_form', 'brand_brief', {
  country,
  form_id: result.id || 'unknown',
});

// Creator Application Form
trackFormSubmit('creator_application_form', 'creator_signup', {
  country,
  form_id: result.id || 'unknown',
});
```

**Note:** Events are only fired after successful form validation and submission.

---

### 3. Newsletter/Creator Sign-up Form Submission

**Event Name:** `signup_submit`

**Location:**

- `src/components/sections/CTA/CTASection.tsx` (line 64)

**Event Properties:**

- `event_category`: "Form"
- `event_label`: Form name (e.g., "newsletter_signup")
- `form_type`: "newsletter"
- `email`: User's email address
- `location`: "cta_section"

**Implementation:**

```typescript
trackFormSubmit('newsletter_signup', 'newsletter', {
  email,
  location: 'cta_section',
});
```

**Note:** Event is only fired after successful email validation.

---

### 4. Outbound Link Clicks

**Event Name:** `outbound_click`

**Location:**

- Automatically tracked across the entire site via `OutboundLinkTracker` component

**Event Properties:**

- `event_category`: "Outbound"
- `event_label`: External URL
- `link_url`: Full URL of the external link
- `link_text`: Text content of the link
- `location`: Current page path

**Implementation:**

- Automatic tracking via `useOutboundLinkTracking` hook
- Manually tracked in specific locations (e.g., ThankYouStep)

**Example Manual Tracking:**

```typescript
trackOutboundClick('https://growthauthority.co.uk/', 'Join Growth Authority Waitlist', {
  location: 'brand_brief_thank_you',
});
```

---

## Files Created

### 1. Event Tracking Utility

**File:** `src/lib/analytics/eventTracking.utils.ts`

**Purpose:** Centralized event tracking functions for GA4 and GTM with debouncing.

**Key Functions:**

- `trackEvent()` - Main event tracking function
- `trackBookCampaignClick()` - Track "Book a Campaign" button clicks
- `trackFormSubmit()` - Track form submissions
- `trackOutboundClick()` - Track outbound link clicks
- `trackButtonClick()` - Generic button click tracking

**Features:**

- ✅ Debouncing (1 second delay) to prevent duplicate events
- ✅ Dual tracking to both GA4 (gtag) and GTM (dataLayer)
- ✅ TypeScript support with proper type definitions
- ✅ Error handling and console warnings

---

### 2. Outbound Link Tracking Hook

**File:** `src/hooks/useOutboundLinkTracking.hook.ts`

**Purpose:** React hook to automatically track all outbound link clicks on a page.

**Features:**

- ✅ Automatically detects external links
- ✅ Captures link text and URL
- ✅ Includes page location context
- ✅ Cleanup on component unmount

---

### 3. Outbound Link Tracker Component

**File:** `src/components/analytics/OutboundLinkTracker.tsx`

**Purpose:** Client component that uses the outbound link tracking hook.

**Usage:** Added to root layout for site-wide tracking.

---

## Files Modified

### 1. Brand Brief Form - Thank You Step

**File:** `src/components/forms/BrandBriefForm/steps/ThankYouStep.tsx`

**Changes:**

- Added import for `trackBookCampaignClick` and `trackOutboundClick`
- Added click handler to "Book a Brand Strategy Call" button (line 104-109)
- Added click handler to "Join Growth Authority Waitlist" outbound link (line 96)

**Event Listeners Added:**

- Line 96: Outbound link click tracking
- Line 104-109: "Book a Campaign" button click tracking

---

### 2. Brand Brief Form

**File:** `src/components/forms/BrandBriefForm/BrandBriefForm.tsx`

**Changes:**

- Added import for `trackFormSubmit`
- Added form submission tracking after successful API response (line 436)

**Event Listeners Added:**

- Line 436: Form submission tracking (fires only after successful validation and submission)

---

### 3. Creator Application Form

**File:** `src/components/forms/CreatorApplicationForm/CreatorApplicationForm.tsx`

**Changes:**

- Added import for `trackFormSubmit`
- Added form submission tracking after successful API response (line 479)

**Event Listeners Added:**

- Line 479: Form submission tracking (fires only after successful validation and submission)

---

### 4. CTA Section (Newsletter)

**File:** `src/components/sections/CTA/CTASection.tsx`

**Changes:**

- Converted to client component (`'use client'`)
- Added form state management (email, isSubmitting)
- Added form submission handler with email validation
- Added import for `trackFormSubmit`
- Updated form to use controlled inputs and submit handler

**Event Listeners Added:**

- Line 64: Newsletter signup form submission tracking (fires only after email validation)

---

### 5. Root Layout

**File:** `src/app/layout.tsx`

**Changes:**

- Added import for `OutboundLinkTracker`
- Added `<OutboundLinkTracker />` component to body (line 175)

**Purpose:** Enables automatic outbound link tracking across the entire site.

---

## Event Tracking Flow

### How Events Are Tracked

1. **User Action** (button click, form submit, link click)
2. **Event Tracking Function Called** (e.g., `trackBookCampaignClick()`)
3. **Debounce Check** - Prevents duplicate events within 1 second
4. **GA4 Tracking** - Event sent to Google Analytics via `gtag()`
5. **GTM Tracking** - Event pushed to Google Tag Manager `dataLayer`
6. **Event Appears in GA4** - Realtime reports and DebugView

### Event Structure

All events follow this structure:

```typescript
{
  event: 'event_name',
  event_category: 'Category',
  event_label: 'Label',
  // Additional custom properties
  timestamp: 'ISO 8601 timestamp'
}
```

---

## Testing & Verification

### How to Verify Events in GA4

1. **Realtime Reports:**
   - Go to GA4 → Reports → Realtime
   - Look for events in the "Event count by Event name" section
   - Events should appear within seconds of user action

2. **DebugView:**
   - Enable GA4 DebugView in your browser
   - Navigate to GA4 → Admin → DebugView
   - Events will appear in real-time with full event parameters

3. **GTM Preview Mode:**
   - Open Google Tag Manager
   - Click "Preview" and enter your site URL
   - Navigate through the site and check the dataLayer for events

### Expected Events

When testing, you should see:

- ✅ `book_campaign_click` - When clicking "Book a Brand Strategy Call"
- ✅ `form_submit` - When submitting Brand Brief or Creator Application forms
- ✅ `signup_submit` - When submitting newsletter signup
- ✅ `outbound_click` - When clicking external links

---

## Debouncing

**Purpose:** Prevents duplicate events from being fired on page reload or rapid clicks.

**Implementation:**

- 1-second debounce window
- Events with the same name and ID are blocked within the window
- Uses `Map` to track last fired timestamp per event

**Example:**
If a user clicks "Book a Campaign" button twice within 1 second, only the first click is tracked.

---

## Best Practices Followed

✅ **Next.js Best Practices:**

- Used `'use client'` directive only where needed
- Proper event handler binding
- No inline event handlers in server components

✅ **Performance:**

- Events are debounced to prevent spam
- Tracking doesn't block UI interactions
- Lazy loading of analytics scripts (already implemented)

✅ **Type Safety:**

- Full TypeScript support
- Proper type definitions for all event properties
- Extended Window interface for gtag and dataLayer

✅ **Error Handling:**

- Try-catch blocks around tracking calls
- Console warnings when analytics not available
- Graceful degradation if GA4/GTM not loaded

---

## Integration with Existing Systems

### GA4 Integration

- Uses existing `window.gtag()` function
- Events appear in GA4 Realtime and DebugView
- Compatible with existing GA4 configuration

### GTM Integration

- Pushes events to `window.dataLayer`
- Events can be used in GTM triggers and tags
- Compatible with existing GTM setup (GTM-WKTV2K2D)

### ConversionTracker Component

- Existing `ConversionTracker` component continues to work
- New tracking system complements existing tracking
- Both systems can coexist

---

## Summary of Event Listeners

| Event                          | Location                        | Trigger                 | Debounced |
| ------------------------------ | ------------------------------- | ----------------------- | --------- |
| `book_campaign_click`          | ThankYouStep.tsx:104            | Button click            | ✅ Yes    |
| `form_submit` (brand_brief)    | BrandBriefForm.tsx:436          | Form submission success | ✅ Yes    |
| `form_submit` (creator_signup) | CreatorApplicationForm.tsx:479  | Form submission success | ✅ Yes    |
| `signup_submit`                | CTASection.tsx:64               | Newsletter form submit  | ✅ Yes    |
| `outbound_click`               | Site-wide (OutboundLinkTracker) | External link click     | ✅ Yes    |

---

## Next Steps (Optional Enhancements)

1. **Enhanced E-commerce Tracking:**
   - Track purchase events
   - Track product views
   - Track add to cart actions

2. **User Engagement Tracking:**
   - Scroll depth tracking
   - Video engagement tracking
   - Time on page tracking

3. **Custom Dimensions:**
   - User type (creator, brand, visitor)
   - Subscription tier
   - Campaign source

4. **Conversion Goals:**
   - Set up conversion goals in GA4
   - Create custom reports
   - Set up alerts for key events

---

## Support & Troubleshooting

### Events Not Appearing in GA4

1. **Check GA4 DebugView:**
   - Ensure DebugView is enabled
   - Check browser console for errors

2. **Verify GA4 is Loaded:**
   - Check Network tab for `gtag.js` requests
   - Verify `window.gtag` exists in console

3. **Check Event Names:**
   - Ensure event names match exactly
   - Check for typos in event tracking calls

4. **Debounce Issues:**
   - Wait 1+ seconds between test clicks
   - Check console for "Event is debounced" messages

### Common Issues

**Issue:** Events fire multiple times
**Solution:** Debouncing is working correctly - wait 1 second between actions

**Issue:** Events not appearing in Realtime
**Solution:**

- Check GA4 DebugView first
- Verify GA4 Measurement ID is correct
- Check browser console for errors

**Issue:** Outbound links not tracked
**Solution:**

- Verify `OutboundLinkTracker` is in layout
- Check that links have `href` starting with `http://` or `https://`
- Ensure links are not internal links (starting with `/`)

---

## Conclusion

All requested event tracking has been successfully implemented:

- ✅ Book a Campaign button clicks
- ✅ Contact form submissions (Brand Brief & Creator Application)
- ✅ Newsletter signup form submissions
- ✅ Outbound link clicks (automatic site-wide)

All events are:

- ✅ Tracked to both GA4 and GTM
- ✅ Debounced to prevent duplicates
- ✅ Following Next.js best practices
- ✅ Ready for testing in GA4 Realtime and DebugView

The implementation is production-ready and maintains compatibility with existing analytics infrastructure.
