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

  // Check if image has an asset reference
  if (typeof image === 'object' && image !== null) {
    const img = image as { asset?: { _ref?: string; _type?: string } };
    if (!img.asset || !img.asset._ref) {
      return '';
    }
  }

  try {
    const url = urlFor(image).width(1200).height(630).url();
    return url || '';
  } catch (error) {
    console.warn('Failed to resolve image URL:', error);
    return '';
  }
}

function transformSanityAuthor(author: SanityBlogPost['author']): BlogAuthor {
  // Use a default placeholder avatar if author avatar is missing or invalid
  let avatarUrl = '';

  // Check if avatar exists and has an asset before trying to transform
  if (author.avatar && typeof author.avatar === 'object' && 'asset' in author.avatar) {
    avatarUrl = transformSanityImageUrl(author.avatar);
  }

  // Generate a data URI placeholder with the author's initial if no avatar
  const defaultAvatar =
    avatarUrl ||
    `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect fill="#9C27B0" width="64" height="64"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="24" font-weight="bold">${(author.name?.charAt(0) || 'A').toUpperCase()}</text></svg>`
    )}`;

  return {
    name: author.name,
    role: author.role || 'Author',
    avatar: avatarUrl || defaultAvatar,
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
