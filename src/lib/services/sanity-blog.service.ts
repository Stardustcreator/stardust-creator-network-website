import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import type { SanityDocument } from 'next-sanity';
import type { PortableTextBlock } from '@portabletext/types';
import type { BlogPost, BlogAuthor, BlogCategory } from '@/types/blog.types';

export interface SanityBlogPost extends SanityDocument {
  title: string;
  slug: { current: string };
  excerpt: string;
  featuredImage: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt: string;
  };
  body: PortableTextBlock[];
  author: {
    name: string;
    role: string;
    avatar: {
      asset: {
        _ref: string;
        _type: 'reference';
      };
      alt: string;
    };
    bio?: string;
  };
  category: string;
  tags?: string[];
  keywords?: string[];
  readTime: number;
  featured?: boolean;
  publishedAt: string;
}

const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  body,
  author->{
    name,
    role,
    avatar,
    bio
  },
  category,
  tags,
  keywords,
  readTime,
  featured,
  publishedAt
}`;

const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  body,
  author->{
    name,
    role,
    avatar,
    bio
  },
  category,
  tags,
  keywords,
  readTime,
  featured,
  publishedAt
}`;

const POST_SLUGS_QUERY = `*[_type == "post"] {
  "slug": slug.current
}`;

function transformSanityImageUrl(image: unknown): string {
  if (!image) return '';
  return urlFor(image).width(1200).height(630).url() || '';
}

function transformSanityAuthor(author: SanityBlogPost['author']): BlogAuthor {
  return {
    name: author.name,
    role: author.role,
    avatar: transformSanityImageUrl(author.avatar),
    bio: author.bio,
  };
}

function transformSanityPost(post: SanityBlogPost): BlogPost & { body: PortableTextBlock[] } {
  return {
    slug: post.slug.current,
    title: post.title,
    excerpt: post.excerpt,
    content: '', // Will be rendered by PortableText component
    body: post.body, // Raw body for PortableText
    author: transformSanityAuthor(post.author),
    publishedAt: post.publishedAt,
    readTime: post.readTime,
    category: post.category as BlogCategory,
    tags: post.tags || [],
    keywords: post.keywords || [],
    featuredImage: transformSanityImageUrl(post.featuredImage),
    featured: post.featured || false,
  };
}

export async function getAllPosts(options = { next: { revalidate: 30 } }) {
  const posts = (await client.fetch(POSTS_QUERY, {}, options)) as SanityBlogPost[];
  return posts.map(transformSanityPost);
}

export async function getPostBySlug(slug: string, options = { next: { revalidate: 30 } }) {
  const post = (await client.fetch(POST_BY_SLUG_QUERY, { slug }, options)) as SanityBlogPost | null;
  return post ? transformSanityPost(post) : null;
}

export async function getAllPostSlugs() {
  const slugs = (await client.fetch(POST_SLUGS_QUERY)) as { slug: string }[];
  return slugs.map((s: { slug: string }) => s.slug);
}
