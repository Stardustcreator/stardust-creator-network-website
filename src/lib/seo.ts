/**
 * SEO utilities and configuration for the Stardust Creator Network website
 * Provides consistent metadata, Open Graph, and structured data helpers
 */

export const site = {
  name: 'Stardust Creator Network',
  url:
    process.env.NODE_ENV === 'production'
      ? 'https://www.stardust-creator-network.com'
      : 'http://localhost:3000',
  defaultDescription:
    'Empowering creators with innovative tools, resources, and community connections to build, grow, and monetize their digital presence.',
  defaultImage: '/og-default.jpg',
  twitterHandle: '@StardustCreators',
} as const;

/**
 * Generates absolute URLs for the site
 * @param path - The path to make absolute (defaults to empty string for homepage)
 * @returns Complete URL with protocol and domain
 */
export function absoluteUrl(path = '') {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return new URL(cleanPath, site.url).toString();
}

/**
 * Generates structured data (JSON-LD) for different page types
 */
export const generateStructuredData = {
  /**
   * Organization schema for the main site
   */
  organization: () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    description: site.defaultDescription,
    sameAs: [
      // Add your social media URLs here
      // "https://twitter.com/StardustCreators",
      // "https://linkedin.com/company/stardust-creator-network",
    ],
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/logo.png'),
      width: 512,
      height: 512,
    },
  }),

  /**
   * Website schema for the homepage
   */
  website: () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    description: site.defaultDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${site.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }),

  /**
   * Article schema for blog posts
   */
  article: (params: {
    title: string;
    description: string;
    author: string;
    publishedTime: string;
    modifiedTime?: string;
    url: string;
    imageUrl?: string;
    tags?: string[];
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.title,
    description: params.description,
    author: {
      '@type': 'Person',
      name: params.author,
    },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/logo.png'),
      },
    },
    datePublished: params.publishedTime,
    dateModified: params.modifiedTime || params.publishedTime,
    url: params.url,
    image: params.imageUrl
      ? {
          '@type': 'ImageObject',
          url: params.imageUrl,
        }
      : undefined,
    keywords: params.tags?.join(', '),
  }),
};

/**
 * Generates meta tags for Open Graph and Twitter Cards
 */
export function generateMetaTags(params: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  author?: string;
}) {
  const {
    title = site.name,
    description = site.defaultDescription,
    image = site.defaultImage,
    url = site.url,
    type = 'website',
    publishedTime,
    modifiedTime,
    tags,
    author,
  } = params;

  const metaTags = {
    title: title === site.name ? title : `${title} | ${site.name}`,
    description,
    openGraph: {
      title,
      description,
      url: absoluteUrl(url),
      siteName: site.name,
      images: [
        {
          url: absoluteUrl(image),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type,
      ...(publishedTime && {
        publishedTime,
      }),
      ...(modifiedTime && {
        modifiedTime,
      }),
      ...(tags &&
        tags.length > 0 && {
          tags,
        }),
      ...(author &&
        type === 'article' && {
          authors: [author],
        }),
    },
    twitter: {
      card: 'summary_large_image',
      site: site.twitterHandle,
      title,
      description,
      images: [absoluteUrl(image)],
      ...(author && {
        creator: `@${author}`,
      }),
    },
    alternates: {
      canonical: absoluteUrl(url),
    },
  };

  return metaTags;
}

/**
 * SEO-friendly URL slug generator
 * @param text - The text to convert to a slug
 * @returns URL-safe slug
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
}

/**
 * Truncate text for meta descriptions
 * @param text - The text to truncate
 * @param maxLength - Maximum length (default: 160 for meta descriptions)
 * @returns Truncated text
 */
export function truncateDescription(text: string, maxLength = 160): string {
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  // Cut at the last complete word to avoid cutting words in half
  return lastSpace > maxLength * 0.8 ? truncated.slice(0, lastSpace) + '...' : truncated + '...';
}
