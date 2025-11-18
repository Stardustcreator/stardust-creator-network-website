# Blog Implementation with Sanity CMS

## Overview

This document explains how the entire blog system (listing page and individual posts) is implemented using Sanity CMS as the content source.

## What Was Implemented

### 1. Sanity Blog Service (`src/lib/services/sanity-blog.service.ts`)

A centralized service that handles all interactions with Sanity CMS for blog content. This follows the project's service layer pattern.

**Key Functions:**

- `getAllPosts()` - Fetches all blog posts
- `getPostBySlug(slug)` - Fetches a single post by its URL slug
- `getAllPostSlugs()` - Gets all post slugs for static generation

**What It Does:**

- Connects to Sanity CMS and fetches blog data
- Transforms Sanity's data format into the format your website expects
- Converts Sanity image references into usable image URLs
- Handles author information and transforms it correctly

### 2. PortableText Content Component (`src/components/blog/PortableTextContent/`)

A specialized component that renders rich text content from Sanity.

**What Is PortableText?**
PortableText is Sanity's format for storing rich content (like blog posts with headings, images, links, etc.). Think of it like a structured document format that can be styled consistently.

**Features:**

- Renders headings (H2, H3) with proper styling
- Displays images with captions
- Styles links, bold text, italics, and code
- Creates properly formatted lists
- Applies your website's design theme to all content

### 3. Updated Blog Post Content Component (`src/components/blog/BlogPostContent/`)

Enhanced the existing component to handle both:

- Sanity's PortableText format (for new posts from Sanity)
- Old HTML format (for backward compatibility with mock data)

### 4. Dynamic Slug Page (`src/app/(marketing)/blog/[slug]/page.tsx`)

The main page that displays individual blog posts.

**How It Works:**

1. **Static Generation** - Next.js pre-builds pages for all blog posts at build time for fast loading
2. **SEO Optimization** - Automatically generates:
   - Page titles and descriptions
   - Open Graph tags (for social media sharing)
   - Twitter Card metadata
   - Structured data (JSON-LD) for search engines
   - Article metadata including keywords
3. **Content Fetching** - Gets the blog post from Sanity using the URL slug
4. **Error Handling** - Shows a 404 page if the post doesn't exist

## How URL Slugs Work

A **slug** is the URL-friendly version of a blog post title:

- Blog post title: "10 Tips for Content Creators"
- Slug: "10-tips-for-content-creators"
- Full URL: `https://yoursite.com/blog/10-tips-for-content-creators`

When you create a blog post in Sanity:

1. You type the title
2. Sanity automatically generates the slug (or you can customize it)
3. The system uses that slug to create the page URL
4. When someone visits that URL, the page fetches the post with that slug

## SEO Features Included

### Meta Tags

Every blog post automatically gets:

- Title tag optimized for search engines
- Meta description from the post excerpt
- Keywords from your SEO keywords field
- Canonical URL to prevent duplicate content issues

### Open Graph (Social Media)

When shared on Facebook, LinkedIn, etc.:

- Featured image appears as preview
- Title and description display correctly
- Shows as an "article" type

### Twitter Cards

When shared on Twitter/X:

- Large image card format
- Proper title and description
- Author attribution

### Structured Data (JSON-LD)

Search engines get additional context:

- Article schema with all metadata
- Author information
- Publication date
- Keywords and tags
- Featured image

## Data Flow

### Blog Listing Page (`/blog`)

```
Sanity CMS
    ↓
sanity-blog.service.ts (getAllPosts)
    ↓
blog/page.tsx (fetches all posts, calculates categories)
    ↓
BlogGrid component (organizes posts)
    ↓
BlogCard components (displays each post)
    ↓
User sees the blog listing with filters
```

### Individual Blog Post (`/blog/[slug]`)

```
Sanity CMS
    ↓
sanity-blog.service.ts (getPostBySlug)
    ↓
[slug]/page.tsx (generates page and metadata)
    ↓
BlogPostContent component
    ↓
PortableTextContent component (renders the actual content)
    ↓
User sees the formatted blog post
```

## File Structure

```
src/
├── lib/services/
│   └── sanity-blog.service.ts       # Sanity data fetching
├── components/blog/
│   ├── BlogHeader/                  # Blog page header
│   ├── BlogGrid/                    # Blog listing grid
│   ├── BlogCard/                    # Individual post card
│   ├── BlogFilters/                 # Category filters
│   ├── BlogPostContent/             # Full post display
│   └── PortableTextContent/         # Rich text rendering
└── app/(marketing)/blog/
    ├── page.tsx                     # Blog listing page
    └── [slug]/                      # Dynamic route
        └── page.tsx                 # Individual blog post page
```

## Environment Variables Required

Make sure your `.env.local` file includes:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=zif8hf3j
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

## Creating a Blog Post in Sanity Studio

1. Go to `/studio` in your browser
2. Click "Blog Post" to create a new post
3. Fill in:
   - Title (required)
   - Slug (auto-generated from title)
   - Excerpt (short summary for search results)
   - Featured Image (with alt text)
   - Content (use the rich text editor)
   - Author (select from authors)
   - Category (choose from dropdown)
   - Tags (optional, for organization)
   - SEO Keywords (5-10 keywords recommended)
   - Read Time (in minutes)
   - Featured checkbox (to highlight on blog page)
   - Published Date

4. Click "Publish"
5. Your post is now live at `/blog/your-slug`

## Performance Features

- **Static Generation** - Pages are pre-built at build time for instant loading
- **Incremental Static Regeneration (ISR)** - Both the listing page and individual posts revalidate every 30 seconds
- **Image Optimization** - Sanity automatically optimizes and serves images via CDN
- **CDN Disabled for API** - Fresh content always shown from Sanity (can be enabled for better performance if needed)
- **Smart Caching** - Blog listing calculates categories on-the-fly from actual posts

## Benefits of This Implementation

1. **No Hard-Coding** - Blog posts are managed in Sanity, not in code
2. **SEO-Ready** - All metadata automatically generated
3. **Fast Loading** - Static pages load instantly
4. **Rich Content** - Support for images, headings, links, formatting
5. **Social Media Ready** - Proper preview when shared
6. **Search Engine Friendly** - Structured data helps Google understand your content
7. **Maintainable** - Service layer pattern keeps code organized
8. **Type-Safe** - Full TypeScript support prevents errors

## How the Blog Listing Page Works

The main blog page at `/blog` displays all your published blog posts with the following features:

### Dynamic Category Filtering

- Categories are calculated automatically from your actual posts in Sanity
- No need to manually update category counts
- Filter by category using the buttons at the top
- "All" shows all posts across categories

### Featured Posts

- Posts marked as "featured" in Sanity appear larger at the top
- Featured posts have special styling (side-by-side layout on desktop)
- Multiple posts can be featured

### Regular Posts Grid

- Non-featured posts display in a 3-column grid (responsive)
- Shows key info: category, date, read time, author
- Click any card to read the full post

### Smart Updates

- Page automatically updates every 30 seconds with new content
- No need to rebuild or redeploy when publishing new posts
- New posts appear immediately (after 30 second cache)

## Next Steps

To use this system:

1. Ensure your `.env.local` file has the Sanity credentials
2. Run `npm run dev` to start the development server
3. Visit `/studio` to access Sanity Studio
4. Create authors first, then blog posts
5. View all posts at `/blog`
6. View individual posts at `/blog/[your-slug]`

## Troubleshooting

**Post not showing:**

- Check that the post is published in Sanity Studio
- Verify the slug is correct
- Restart your dev server (`npm run dev`)

**Images not loading:**

- Check that images have alt text in Sanity
- Verify your Sanity project ID is correct
- Check that the image was uploaded successfully

**Type errors:**

- Run `npm run type-check` to see specific errors
- Ensure all required fields are filled in Sanity
