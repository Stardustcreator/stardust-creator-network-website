# Sitemap Configuration

This document describes the sitemap setup and how it automatically includes all pages.

## Auto-Update Configuration

The sitemap is **automatically generated** during every build:

```json
"build": "next build && next-sitemap"
```

This means:
- ✅ Sitemap updates automatically on every deployment
- ✅ New pages are automatically included
- ✅ Blog posts are fetched dynamically from Sanity CMS
- ✅ No manual sitemap updates needed

## What's Included in the Sitemap

### Static Pages (Auto-Detected)
Next.js automatically detects and includes all static pages in the `src/app` directory:
- Homepage (`/`)
- Blog listing (`/blog`)
- Brand brief pages (`/brands/brief/*`)
- Creator application pages (`/join/creator/*`)
- Creator survey (`/creators/survey`)
- All confirmation pages

### Dynamic Pages (Explicitly Added)

#### Blog Posts
- **Source**: Sanity CMS
- **Fetch**: All posts with valid slugs are fetched during build
- **Priority**: 0.8
- **Change Frequency**: Weekly
- **Last Modified**: Uses `_updatedAt` or `publishedAt` from Sanity

#### Legal Pages & Case Studies
- These will be automatically included if they exist as static pages
- If created as dynamic routes, they should be added to `additionalPaths` in `next-sitemap.config.js`

## Excluded Pages

The following paths are excluded from the sitemap:
- `/admin/*` - Admin pages
- `/api/*` - API routes
- `/dashboard/*` - Dashboard pages
- `/404`, `/500` - Error pages
- `/_*` - Internal Next.js routes
- `/og/*` - OG image generation routes

## Configuration File

The sitemap is configured in `next-sitemap.config.js`:

- **Site URL**: `https://www.stardust-creator-network.com`
- **Sitemap Size**: 7000 URLs per sitemap (auto-splits if needed)
- **Default Priority**: 0.7
- **Default Change Frequency**: Weekly

### Priority Settings

- **Homepage (`/`)**: Priority 1.0, Daily updates
- **Blog Posts (`/blog/*`)**: Priority 0.8, Weekly updates
- **Other Pages**: Priority 0.7, Weekly updates

## How to Verify

1. **Check sitemap generation**:
   ```bash
   npm run sitemap
   ```

2. **View generated sitemap**:
   - `public/sitemap.xml` - Main sitemap index
   - `public/sitemap-0.xml` - Actual URLs (if split)

3. **Test in browser**:
   - Visit `https://www.stardust-creator-network.com/sitemap.xml`

## Adding New Dynamic Routes

If you add new dynamic routes (like case studies or legal pages), update `next-sitemap.config.js`:

```javascript
additionalPaths: async () => {
  const result = [];
  
  // Add your dynamic routes here
  // Example:
  // const caseStudies = await fetchCaseStudies();
  // caseStudies.forEach((study) => {
  //   result.push({
  //     loc: `/case-studies/${study.slug}`,
  //     changefreq: 'monthly',
  //     priority: 0.7,
  //     lastmod: study.updatedAt,
  //   });
  // });
  
  return result;
}
```

## Current Status

✅ **Blog Posts**: Automatically included from Sanity CMS  
✅ **Static Pages**: Automatically detected by Next.js  
✅ **Auto-Update**: Runs on every build  
⏳ **Legal Pages**: Will be auto-included when created  
⏳ **Case Studies**: Will be auto-included when created  

## Troubleshooting

### Blog posts not appearing in sitemap

1. Check Sanity environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`

2. Verify blog posts exist in Sanity with valid slugs

3. Check build logs for sitemap generation errors

### Pages missing from sitemap

1. Ensure the page exists in `src/app` directory
2. Check that the path is not in the `exclude` array
3. Verify the page is a valid route (not a layout or component)

