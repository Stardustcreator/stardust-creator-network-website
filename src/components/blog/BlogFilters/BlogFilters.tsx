'use client';

import { BlogCategory } from '@/types/blog.types';

interface BlogFiltersProps {
  selectedCategory: BlogCategory | 'All';
  onCategoryChange: (category: BlogCategory | 'All') => void;
  categories: Array<{ name: string; count: number }>;
}

export default function BlogFilters({
  selectedCategory,
  onCategoryChange,
  categories,
}: BlogFiltersProps) {
  const allCategories = [
    { name: 'All', count: categories.reduce((sum, cat) => sum + cat.count, 0) },
    ...categories,
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {allCategories.map(category => (
        <button
          key={category.name}
          onClick={() => onCategoryChange(category.name as BlogCategory | 'All')}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            selectedCategory === category.name
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
              : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/30'
          }`}
        >
          {category.name}
          {category.count > 0 && (
            <span
              className={`ml-2 ${
                selectedCategory === category.name ? 'text-white/80' : 'text-white/60'
              }`}
            >
              ({category.count})
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
