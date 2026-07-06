'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { BlogPost, BlogCategory } from '@/types/blog.types';
import BlogCard from '@/components/blog/BlogCard';
import { Heading, Text } from '@/components/typography';

// Lazy load BlogFilters - only needed when user interacts with filters
const BlogFilters = dynamic(
  () => import('@/components/blog/BlogFilters').then(mod => mod.BlogFilters),
  {
    ssr: true,
  }
);

interface BlogGridProps {
  posts: BlogPost[];
  categories: Array<{ name: string; count: number }>;
}

const POSTS_PER_PAGE = 8;

export default function BlogGrid({ posts, categories }: BlogGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

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

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const featuredPosts = paginatedPosts.filter(post => post.featured);
  const regularPosts = paginatedPosts.filter(post => !post.featured);

  const allCategories = [{ name: 'All', count: posts.length }, ...categories];

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="w-full bg-white py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar - Full Width */}
          <div className="mb-8 md:mb-16">
            <div className="relative mb-6 md:mb-0">
              <input
                type="text"
                placeholder="Search articles by title or topic"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                }}
                className="w-full px-6 py-3 sm:py-4 pl-12 sm:pl-14 bg-white border border-gray-300 rounded-full text-black placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <svg
                className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
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
                  onClick={() => {
                    setSearchQuery('');
                  }}
                  className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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

            {/* Mobile Categories - Horizontal Scrollable */}
            <div className="md:hidden overflow-x-auto -mx-4 px-4">
              <div className="flex gap-3 pb-2">
                {allCategories.map(category => (
                  <button
                    key={category.name}
                    onClick={() => {
                      setSelectedCategory(category.name as BlogCategory | 'All');
                    }}
                    className={`whitespace-nowrap px-4 py-2 rounded-full font-medium text-sm transition-all ${
                      selectedCategory === category.name
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Grid - 2 Columns (Content + Sidebar) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Blog Posts (spans 2 columns) */}
            <div className="lg:col-span-2">
              {/* Featured Posts */}
              {featuredPosts.length > 0 && (
                <div className="mb-12">
                  <div className="grid gap-6 sm:gap-8">
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

              {/* Regular Posts Grid - 2 Columns */}
              {regularPosts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-12">
                  {regularPosts.map(post => (
                    <BlogCard
                      key={post.slug}
                      post={post}
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {filteredPosts.length > 0 && totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mb-16 md:mb-20">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all ${
                      currentPage === 1
                        ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 font-medium">
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all ${
                      currentPage === totalPages
                        ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              )}

              {/* No Results */}
              {filteredPosts.length === 0 && (
                <div className="text-center py-20">
                  <div className="inline-block p-6 bg-gray-50 border border-gray-200 rounded-2xl">
                    <p className="text-gray-600 text-lg mb-2">
                      {searchQuery
                        ? `No articles found matching "${searchQuery}"`
                        : 'No posts found in this category yet.'}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {searchQuery
                        ? 'Try different keywords or browse all categories'
                        : 'Check back soon for new content!'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Categories Sidebar (Desktop Only) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-32 bg-purple-200/50 rounded-2xl p-6">
                <h3 className="text-lg sm:text-xl font-bricolage-grotesque font-bold text-purple-900 mb-6">
                  Categories
                </h3>

                <div className="space-y-3">
                  {allCategories.map(category => (
                    <button
                      key={category.name}
                      onClick={() => {
                        setSelectedCategory(category.name as BlogCategory | 'All');
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                        selectedCategory === category.name
                          ? 'bg-purple-600 text-white'
                          : 'bg-purple-100/50 hover:bg-purple-100 text-purple-900'
                      }`}
                    >
                      <span
                        className={`font-medium text-sm ${
                          selectedCategory === category.name
                            ? 'text-white font-semibold'
                            : 'text-purple-900'
                        }`}
                      >
                        {category.name}
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          selectedCategory === category.name ? 'text-white' : 'text-purple-700'
                        }`}
                      >
                        ({category.count})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - EXACT MATCH */}
      <motion.section
        className="w-full py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 text-center"
        style={{ backgroundColor: '#FAFAF9' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="font-bricolage-grotesque text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-black leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Ready to Find Creators Who Help You Achieve Your Campaign Goals?
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base md:text-lg leading-relaxed font-lato text-gray-700 mb-6 sm:mb-8 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Tell us about your brand and your campaign objective. We will match you with the right
            creators from our vetted pool within your timeline.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/brief">
              <button
                className="px-5 sm:px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:opacity-90 transition-all text-sm sm:text-base"
                style={{ backgroundColor: '#57058B', color: 'white' }}
              >
                Sign Up Now
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
