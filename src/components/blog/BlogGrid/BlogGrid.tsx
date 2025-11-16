'use client';

import { useState, useMemo } from 'react';
import { BlogPost, BlogCategory } from '@/types/blog.types';
import BlogCard from '@/components/blog/BlogCard';
import BlogFilters from '@/components/blog/BlogFilters';

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
