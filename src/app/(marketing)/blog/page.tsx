import type { Metadata } from 'next';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogGrid from '@/components/blog/BlogGrid';
import { getAllPosts } from '@/lib/services/sanity-blog.service';
import { BlogCategory } from '@/types/blog.types';

import { generateMetaTags, generateStructuredData } from '@/lib/seo';

export const metadata: Metadata = generateMetaTags({
  title: 'Influencer Marketing Insights | Stardust Creator Network Blog',
  description:
    'Discover expert influencer marketing insights, strategies, and trends. Learn how to build authentic brand-creator partnerships, optimize campaigns, and grow your influence in Nigeria and the UK.',
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
  const posts = await getAllPosts();
  const categories = calculateCategories(posts);

  const breadcrumbData = generateStructuredData.breadcrumb([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
  ]);

  return (
    <>
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black pt-24 pb-20">
        <BlogHeader />
        <BlogGrid
          posts={posts}
          categories={categories}
        />
      </main>
      <Footer />
    </>
  );
}
