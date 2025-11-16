export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: BlogAuthor;
  publishedAt: string;
  readTime: number;
  category: BlogCategory;
  tags: string[];
  keywords?: string[];
  featuredImage: string;
  featured?: boolean;
}

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
}

export type BlogCategory =
  | 'Creator Tips'
  | 'Brand Strategy'
  | 'Industry News'
  | 'Platform Updates'
  | 'Success Stories'
  | 'Marketing';

export interface BlogFilters {
  category?: BlogCategory;
  searchQuery?: string;
}
