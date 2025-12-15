import type { Metadata } from 'next';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogGrid from '@/components/blog/BlogGrid';
import { getAllPosts } from '@/lib/services/sanity-blog.service';
import { BlogCategory } from '@/types/blog.types';

import { generateMetaTags, generateStructuredData } from '@/lib/seo';

export const metadata: Metadata = generateMetaTags({
  title: 'Stardust Blog – Tips, Insights & Creator Stories',
  description:
    'Read expert guides, success stories, and actionable insights for creators looking to grow their audience and revenue.',
  image: '/creator community/creator-network.webp',
  url: '/blog',
});

// Revalidate this page every 30 seconds
export const revalidate = 30;

function calculateCategories(posts: Array<{ category: string }>) {
  const categoryMap = new Map<string, number>();

  posts.forEach(post => {
    const count = categoryMap.get(post.category) || 0;
    categoryMap.set(post.category, count + 1);
  });

  const allCategories: BlogCategory[] = [
    'Creator Tips',
    'Brand Strategy',
    'Industry News',
    'Platform Updates',
    'Success Stories',
    'Marketing',
  ];

  return allCategories.map(category => ({
    name: category,
    count: categoryMap.get(category) || 0,
  }));
}

export default async function BlogPage() {
  let posts = [];
  let error = null;

  try {
    posts = await getAllPosts();
    console.log('Blog posts fetched:', posts.length);
  } catch (err) {
    console.error('Error fetching blog posts:', err);
    error = err instanceof Error ? err.message : 'Failed to fetch blog posts';
  }

  const categories = calculateCategories(posts);

  const breadcrumbData = generateStructuredData.breadcrumb([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
  ]);

  return (
    <>
      {/* Breadcrumb Structured Data - Deferred, non-blocking */}
      <script
        type="application/ld+json"
        defer
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black pt-24 pb-20">
        <BlogHeader />
        {error ? (
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="text-center p-8 bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl">
              <p className="text-red-400 text-lg mb-2">Error loading blog posts</p>
              <p className="text-white/60 text-sm">{error}</p>
              <p className="text-white/40 text-xs mt-4">
                Please check your Sanity CMS configuration and ensure posts exist.
              </p>
            </div>
          </div>
        ) : (
          <BlogGrid
            posts={posts}
            categories={categories}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
