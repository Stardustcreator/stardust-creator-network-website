# Hydration Error Fixes

This document summarizes all fixes applied to resolve hydration mismatches in the Next.js application.

## What is a Hydration Error?

A hydration error occurs when the HTML rendered on the server doesn't match what React renders on the client. This can happen when:

- Using browser-only APIs (localStorage, window, document) during render
- Date formatting that differs between server and client timezones
- Random values or conditional rendering based on client state
- Components that render differently on server vs client

## Fixes Applied

### 1. Date Formatting Fixes

**Problem**: `toLocaleDateString()` can produce different results on server vs client due to timezone differences.

**Files Fixed:**

- `src/components/blog/BlogPostContent/BlogPostContent.tsx`
- `src/components/blog/BlogCard/BlogCard.tsx`
- `src/components/forms/DraftResumeModal.tsx`

**Solution**:

- Use UTC dates and consistent formatting
- For BlogPostContent and BlogCard: Format dates using UTC to ensure server and client produce the same output
- For DraftResumeModal: Use `useState` and `useEffect` to format dates only on the client side

### 2. LocationSpecificContent Component

**Problem**: Component renders different content based on `useCountry()` hook which depends on client-side state (localStorage, geolocation).

**File Fixed:**

- `src/components/shared/LocationSpecificContent.tsx`

**Solution**:

- Added `isMounted` state check
- During SSR/before mount, always render fallback content
- Only render country-specific content after component mounts on client

### 3. CountryContext (Already Protected)

**Status**: ✅ Already has proper hydration protection

- Uses `isMounted` state
- Returns default values during SSR
- Only accesses localStorage after mount

### 4. DraftResumeModal Date Formatting

**Problem**: Uses `new Date()` and relative time calculations that differ between server and client.

**File Fixed:**

- `src/components/forms/DraftResumeModal.tsx`

**Solution**:

- Moved date formatting to `useEffect` hook
- Use `isMounted` state to show placeholder during SSR
- Format dates only after component mounts on client

## Best Practices Applied

1. **Client-Side Only Operations**: Use `useEffect` for any operations that depend on browser APIs
2. **Consistent Date Formatting**: Use UTC dates or consistent timezone handling
3. **Mount State Checks**: Use `isMounted` pattern to prevent SSR/client mismatches
4. **Fallback Content**: Always provide fallback content that matches between server and client

## Components Already Protected

These components already have proper hydration protection:

- ✅ `CountryContext` - Uses `isMounted` pattern
- ✅ `CountrySelector` - Uses `isMounted` pattern
- ✅ `MobileTopNavigation` - Uses `isMounted` pattern

## Testing

After these fixes, hydration errors should be resolved. To verify:

1. Check browser console for hydration warnings
2. Ensure pages render consistently on first load
3. Verify date formatting is consistent
4. Test country-specific content rendering

## Additional Notes

- The `TimelineDeliverablesStep` uses `new Date().toISOString()` for a min date attribute, which is safe as it's just an HTML attribute and doesn't affect rendered content
- All date formatting now uses UTC or client-side only rendering to ensure consistency
