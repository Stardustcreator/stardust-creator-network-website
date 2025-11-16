import type { Metadata } from 'next';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogGrid from '@/components/blog/BlogGrid';
import { getAllPosts } from '@/lib/services/sanity-blog.service';
import { BlogCategory } from '@/types/blog.types';

export const metadata: Metadata = {
  title: 'Blog - Creator Insights & Strategies | Stardust Creator Network',
  description:
    'Expert insights, strategies, and stories from the forefront of the creator economy. Learn how to build authentic partnerships, grow your brand, and thrive as a creator.',
  openGraph: {
    title: 'Blog - Creator Insights & Strategies | Stardust Creator Network',
    description:
      'Expert insights, strategies, and stories from the forefront of the creator economy.',
    type: 'website',
    url: 'https://stardustcreatornetwork.com/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Creator Insights & Strategies | Stardust Creator Network',
    description:
      'Expert insights, strategies, and stories from the forefront of the creator economy.',
  },
};

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

  return (
    <>
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
