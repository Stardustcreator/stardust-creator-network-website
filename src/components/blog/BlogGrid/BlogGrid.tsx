'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { BlogPost, BlogCategory } from '@/types/blog.types';
import BlogCard from '@/components/blog/BlogCard';
import { Heading, Text } from '@/components/typography';

// Lazy load BlogFilters - only needed when user interacts with filters
const BlogFilters = dynamic(() => import('@/components/blog/BlogFilters/BlogFilters'), {
  ssr: true, // Keep SSR for SEO, but code-split the component
});

interface BlogGridProps {
  posts: BlogPost[];
  categories: Array<{ name: string; count: number }>;
}

export default function BlogGrid({ posts, categories }: BlogGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'All'>('All');

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') {
      return posts;
    }
    return posts.filter(post => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <BlogFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div className="mb-16">
          <div className="grid gap-8">
            {featuredPosts.map(post => (
              <BlogCard
                key={post.slug}
                post={post}
                featured
              />
            ))}
          </div>
        </div>
      )}

      {/* Regular Posts Grid */}
      {regularPosts.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map(post => (
            <BlogCard
              key={post.slug}
              post={post}
            />
          ))}
        </div>
      )}

      {/* Case Studies CTA Section */}
      {filteredPosts.length > 0 && (
        <div className="mt-16 md:mt-20 mb-12">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <Heading
              level={2}
              variant="gradient"
              className="text-2xl md:text-3xl mb-4"
            >
              Explore Our Success Stories
            </Heading>
            <Text
              variant="large"
              className="text-white/80 mb-6 max-w-2xl mx-auto"
            >
              See how we&apos;ve helped brands connect with creators to deliver authentic campaigns
              that drive real results.
            </Text>
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-block p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
            <p className="text-white/60 text-lg">
              No posts found in this category yet. Check back soon for new content!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
