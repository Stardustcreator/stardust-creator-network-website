# Sanity Studio Setup Guide

This guide will help you set up and deploy your Sanity Studio for managing blog content.

## What is Sanity Studio?

Sanity Studio is your content management system (CMS) - a user-friendly editor where you can:

- Write and publish blog posts
- Upload and manage images
- Add author information
- Preview content before publishing
- Organize and categorize posts

Think of it as your website's "admin panel" specifically designed for content creation.

## Step 1: Get Your Sanity Project Credentials

1. Go to [Sanity.io](https://www.sanity.io) and sign in (or create a free account)
2. Visit your [Sanity Projects Dashboard](https://www.sanity.io/manage)
3. Find your project (or create a new one if needed)
4. Copy your **Project ID** - it looks something like: `abc123de`

## Step 2: Configure Environment Variables

Create or edit your `.env.local` file in the project root and add:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

Replace `your_project_id_here` with the Project ID you copied from Sanity.

## Step 3: Access Your Studio Locally

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Open your browser and go to:

   ```
   http://localhost:3000/studio
   ```

3. You'll be prompted to sign in with your Sanity account

4. Once signed in, you'll see your content editor dashboard

## Step 4: Deploy to Production

When you deploy your website to Vercel (or another hosting platform), your studio automatically goes live with it.

### On Vercel:

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** > **Environment Variables**
4. Add the same Sanity variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`

5. Redeploy your site (or it will deploy automatically on your next push)

6. Access your studio at: `https://your-domain.com/studio`

## Step 5: Create Your First Blog Post

1. In the studio, click **"Create"** or the **"+"** button
2. Select **"Post"** from the content types
3. Fill in the details:
   - **Title**: Your blog post title
   - **Slug**: URL-friendly version (auto-generated from title)
   - **Author**: Select or create an author
   - **Main Image**: Upload a featured image
   - **Body**: Write your content using the rich text editor
   - **Excerpt**: Brief summary for previews
   - **Published At**: Publication date

4. Click **"Publish"** when ready

## Understanding Content Structure

### Posts

Blog posts with all the content, images, and metadata for articles.

**Fields:**

- Title: Main heading for your post
- Slug: URL path (e.g., "my-first-post" becomes `/blog/my-first-post`)
- Author: Who wrote the post
- Main Image: Featured/cover image
- Body: Main content with rich formatting
- Excerpt: Short summary
- Published At: When to publish

### Authors

Information about content creators.

**Fields:**

- Name: Author's full name
- Slug: URL-friendly identifier
- Image: Profile picture
- Bio: Short biography

## Studio Features

### Content Creation

- **Rich Text Editor**: Format text, add headings, lists, and more
- **Image Upload**: Drag and drop images directly into your posts
- **Live Preview**: See how content will look while editing

### Organization

- **Drafts**: Work on posts before publishing
- **Published**: Live content visible on your website
- **Search**: Find posts quickly by title or content

### Collaboration

- **Version History**: See all changes and restore previous versions
- **Real-time**: Multiple people can edit at the same time
- **Comments**: Leave notes for team members

## Customizing Your Studio

The studio configuration is in these files:

- `sanity.config.ts`: Main studio settings
- `src/sanity/schemaTypes/`: Content structure definitions
- `src/sanity/structure.ts`: Studio navigation and organization

### Adding New Content Types

To add a new type of content (like "Events" or "Team Members"):

1. Create a schema file in `src/sanity/schemaTypes/`
2. Define your fields using the Sanity schema format
3. Import it in `src/sanity/schemaTypes/index.ts`
4. The new content type will appear in your studio

## Troubleshooting

### Studio Won't Load

**Check your environment variables:**

- Make sure `NEXT_PUBLIC_SANITY_PROJECT_ID` is set correctly
- Verify the project ID matches your Sanity project
- Restart your development server after changing `.env.local`

### Can't Sign In

**Authentication issues:**

- Clear your browser cache and cookies
- Try incognito/private browsing mode
- Check if you're signed in to Sanity.io in another tab
- Verify your Sanity account has access to the project

### Content Not Showing on Website

**Data sync issues:**

- Check that content is **published** (not just saved as draft)
- Verify the `dataset` environment variable is set to "production"
- Try refreshing the page or clearing your browser cache
- Check browser console for any API errors

### Changes Not Appearing

**Cache issues:**

- In development: The site updates automatically
- In production: May take a few minutes due to caching
- You can force a revalidation by redeploying

## Security Best Practices

### Access Control

- Only share studio access with trusted team members
- Each person should use their own Sanity account
- Regularly review who has access in your Sanity project settings

### Environment Variables

- Never commit `.env.local` to version control (it's in `.gitignore`)
- Use separate datasets for development and production
- Keep your Sanity API tokens secure

## Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Schema Reference](https://www.sanity.io/docs/schema-types)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/nextjs-app-router)
- [Portable Text (Rich Content)](https://portabletext.org/)

## Getting Help

If you run into issues:

1. Check the troubleshooting section above
2. Review the [Sanity documentation](https://www.sanity.io/docs)
3. Visit the [Sanity Community Slack](https://slack.sanity.io/)
4. Check our project documentation in `/docs`

---

**Quick Reference:**

- **Local Studio**: http://localhost:3000/studio
- **Production Studio**: https://your-domain.com/studio
- **Sanity Dashboard**: https://www.sanity.io/manage
- **Configuration**: `sanity.config.ts`
- **Schemas**: `src/sanity/schemaTypes/`
