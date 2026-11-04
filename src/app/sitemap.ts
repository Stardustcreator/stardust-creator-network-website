import { MetadataRoute } from 'next';
import { getAllPostSlugs } from '@/lib/services/sanity-blog.service';

// Rebuild the sitemap at most once an hour so new blog posts appear.
export const revalidate = 3600;

const baseUrl = 'https://www.stardustcreatornetwork.com';

// Only live, indexable pages. Every one of these sets its own canonical, so
// none are "non-canonical" in Semrush. (/find-creators was removed: it 404s
// and now redirects to /pricing.)
const staticPages: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}[] = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/for-creators', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/pricing', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/who-we-are', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/case-studies', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/onboarding', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/our-team', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/legal/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/legal/terms', changeFrequency: 'yearly', priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = staticPages.map(page => ({
    url: `${baseUrl}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // Blog posts from Sanity. If Sanity is unreachable, still serve the rest.
  let posts: MetadataRoute.Sitemap = [];
  try {
    const slugs = (await getAllPostSlugs()) as string[];
    posts = slugs.filter(Boolean).map(slug => ({
      url: `${baseUrl}/blog/${encodeURIComponent(slug)}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Sitemap: could not load blog posts from Sanity', error);
  }

  return [...pages, ...posts];
}
