# SEO Metadata Summary

This document lists all pages with their primary SEO keywords and metadata descriptions.

## Pages with Metadata

### 1. Homepage (`/`)

- **File**: `src/app/page.tsx`
- **Primary Keyword**: Influencer Marketing Platform Nigeria & UK
- **Title**: Influencer Marketing Platform Nigeria & UK | Stardust Creator Network
- **Description**: Stardust Creator Network is the leading influencer marketing platform connecting brands with verified creators in Nigeria and the UK. Discover authentic partnerships, data-driven campaigns, and grow your brand with Africa's most vibrant creator network.

### 2. Blog Listing (`/blog`)

- **File**: `src/app/(marketing)/blog/page.tsx`
- **Primary Keyword**: Influencer Marketing Insights
- **Title**: Influencer Marketing Insights | Stardust Creator Network Blog
- **Description**: Discover expert influencer marketing insights, strategies, and trends. Learn how to build authentic brand-creator partnerships, optimize campaigns, and grow your influence in Nigeria and the UK.

### 3. Blog Post (`/blog/[slug]`)

- **File**: `src/app/(marketing)/blog/[slug]/page.tsx`
- **Primary Keyword**: Influencer Marketing Tips & Trends
- **Title**: Dynamic (uses post title)
- **Description**: Includes post excerpt + "Discover influencer marketing tips, trends, and strategies."

### 4. Brand Brief - Region Selector (`/brands/brief`)

- **File**: `src/app/brands/brief/layout.tsx` (metadata in layout)
- **Primary Keyword**: Start a Brand Campaign with Creators
- **Title**: Start a Brand Campaign with Creators | Stardust Creator Network
- **Description**: Start your brand campaign with verified creators in Nigeria and the UK. Connect with top influencers who drive authentic engagement and real results for your brand. Choose your region to begin.

### 5. Brand Brief - Nigeria (`/brands/brief/nigeria`)

- **File**: `src/app/brands/brief/nigeria/page.tsx`
- **Primary Keyword**: Hire Nigerian Influencers for Campaigns
- **Title**: Hire Nigerian Influencers for Campaigns | Stardust Creator Network
- **Description**: Hire Nigerian influencers for your brand campaigns. Connect with Nigeria's top verified creators who drive authentic engagement and real results. Submit your brief and get matched with the perfect creators for your campaign.

### 6. Brand Brief - Nigeria Confirmation (`/brands/brief/nigeria/confirmation`)

- **File**: `src/app/brands/brief/nigeria/confirmation/page.tsx`
- **Primary Keyword**: Nigeria Brand Campaign Submission Confirmation
- **Title**: Nigeria Brand Campaign Submission Confirmation | Stardust Creator Network
- **Description**: Your brand campaign brief for Nigeria has been successfully submitted. Our partnerships team will review your request and contact you within 72 hours to match you with the perfect Nigerian influencers.

### 7. Brand Brief - UK (`/brands/brief/uk`)

- **File**: `src/app/brands/brief/uk/page.tsx`
- **Primary Keyword**: Hire UK Influencers for Campaigns
- **Title**: Hire UK Influencers for Campaigns | Stardust Creator Network
- **Description**: Hire UK influencers for your brand campaigns. Connect with the United Kingdom's top verified creators who drive authentic engagement and real results. Submit your brief and get matched with the perfect creators for your campaign.

### 8. Brand Brief - UK Confirmation (`/brands/brief/uk/confirmation`)

- **File**: `src/app/brands/brief/uk/confirmation/page.tsx`
- **Primary Keyword**: UK Brand Campaign Submission Confirmation
- **Title**: UK Brand Campaign Submission Confirmation | Stardust Creator Network
- **Description**: Your brand campaign brief for the UK has been successfully submitted. Our partnerships team will review your request and contact you within 72 hours to match you with the perfect UK influencers.

### 9. Creator Join - Region Selector (`/creators/join`)

- **File**: `src/app/creators/join/layout.tsx` (metadata in layout)
- **Primary Keyword**: Join Stardust Creator Network
- **Title**: Join Stardust Creator Network | Apply as a Creator
- **Description**: Join Stardust Creator Network and connect with top brands in Nigeria and the UK. Access exclusive campaigns, grow your creator career, and monetize your influence. Choose your region to apply.

### 10. Creator Application - Nigeria (`/join/creator/nigeria`)

- **File**: `src/app/join/creator/nigeria/page.tsx`
- **Primary Keyword**: Apply as Nigerian Creator
- **Title**: Apply as Nigerian Creator | Stardust Creator Network
- **Description**: Apply as a Nigerian creator and join Nigeria's leading influencer network. Connect with top brands, access exclusive campaigns, and grow your creator career with verified opportunities in Nigeria.

### 11. Creator Application - Nigeria Confirmation (`/join/creator/nigeria/confirmation`)

- **File**: `src/app/join/creator/nigeria/confirmation/page.tsx`
- **Primary Keyword**: Nigeria Creator Application Confirmation
- **Title**: Nigeria Creator Application Confirmation | Stardust Creator Network
- **Description**: Your application to join Stardust Creator Network as a Nigerian creator has been successfully submitted. Our team will review your application and contact you soon with next steps.

### 12. Creator Application - UK (`/join/creator/uk`)

- **File**: `src/app/join/creator/uk/page.tsx`
- **Primary Keyword**: Apply as UK Creator
- **Title**: Apply as UK Creator | Stardust Creator Network
- **Description**: Apply as a UK creator and join the United Kingdom's leading influencer network. Connect with top brands, access exclusive campaigns, and grow your creator career with verified opportunities in the UK.

### 13. Creator Application - UK Confirmation (`/join/creator/uk/confirmation`)

- **File**: `src/app/join/creator/uk/confirmation/page.tsx`
- **Primary Keyword**: UK Creator Application Confirmation
- **Title**: UK Creator Application Confirmation | Stardust Creator Network
- **Description**: Your application to join Stardust Creator Network as a UK creator has been successfully submitted. Our team will review your application and contact you soon with next steps.

### 14. Creator Survey (`/creators/survey`)

- **File**: `src/app/creators/survey/layout.tsx` (metadata in layout)
- **Primary Keyword**: Creator Feedback & Survey
- **Title**: Creator Feedback & Survey | Stardust Creator Network
- **Description**: Share your feedback and help us build better tools for creators. Take our 2-minute survey to shape the future of Stardust Creator Network and influence the features we prioritize.

## Implementation Notes

1. **Client Component Pages**: Pages that use `'use client'` cannot export metadata directly. For these pages, metadata is added via `layout.tsx` files in their directories.

2. **Metadata Helper**: All pages use the `generateMetaTags` helper function from `@/lib/seo` for consistent metadata generation.

3. **Primary Keywords**: Each page's primary keyword is incorporated into the title and naturally included in the description for SEO purposes.

4. **Open Graph & Twitter Cards**: All metadata includes Open Graph and Twitter Card tags automatically via the `generateMetaTags` helper.

## Files Modified/Created

### Updated Files:

- `src/app/page.tsx` - Homepage metadata
- `src/app/(marketing)/blog/page.tsx` - Blog listing metadata
- `src/app/(marketing)/blog/[slug]/page.tsx` - Blog post metadata
- `src/app/brands/brief/nigeria/page.tsx` - Nigeria brand brief
- `src/app/brands/brief/uk/page.tsx` - UK brand brief
- `src/app/brands/brief/nigeria/confirmation/page.tsx` - Nigeria confirmation
- `src/app/brands/brief/uk/confirmation/page.tsx` - UK confirmation
- `src/app/join/creator/nigeria/page.tsx` - Nigeria creator application
- `src/app/join/creator/uk/page.tsx` - UK creator application
- `src/app/join/creator/nigeria/confirmation/page.tsx` - Nigeria creator confirmation
- `src/app/join/creator/uk/confirmation/page.tsx` - UK creator confirmation

### Created Layout Files:

- `src/app/brands/brief/layout.tsx` - Brand brief region selector metadata
- `src/app/creators/join/layout.tsx` - Creator join region selector metadata
- `src/app/creators/survey/layout.tsx` - Creator survey metadata

