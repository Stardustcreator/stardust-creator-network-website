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
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query) ||
          (post.author?.name && post.author.name.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [posts, selectedCategory, searchQuery]);

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles by title, topic, or author..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 bg-white/5 backdrop-blur-sm rounded-full text-white placeholder-white/40 outline-none focus:outline-none focus:ring-0 border-0"
              style={{ boxShadow: 'none' }}
            />
            <svg
              className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

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
            <p className="text-white/60 text-lg mb-2">
              {searchQuery
                ? `No articles found matching "${searchQuery}"`
                : 'No posts found in this category yet.'}
            </p>
            <p className="text-white/40 text-sm">
              {searchQuery
                ? 'Try different keywords or browse all categories'
                : 'Check back soon for new content!'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
