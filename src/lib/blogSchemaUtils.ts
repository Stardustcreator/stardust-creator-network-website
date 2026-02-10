import { BlogPostSchemaParams } from './schemaGenerators';

type SanityBlock = {
  _type: string;
  children?: Array<{
    _type: string;
    text: string;
  }>;
};

interface SanityBlogPost {
  title: string;
  slug: { current: string };
  author: { name: string; bio?: string };
  mainImage?: { url: string };
  publishedAt: string;
  body: SanityBlock[];
  categories?: { title: string }[];
  aiMetadata?: {
    readingTime?: number;
    keywords?: string[];
    category?: string;
  };
}

export function extractBlogPostSchemaParams(post: SanityBlogPost): BlogPostSchemaParams {
  const wordCount = post.body?.reduce((count, block) => {
    if (block._type === 'block' && block.children) {
      return count + block.children
        .filter(child => child._type === 'span')
        .reduce((wordCount, child) => 
          wordCount + (child.text || '').trim().split(/\s+/).length, 0
        );
    }
    return count;
  }, 0) || 0;

  return {
    title: post.title,
    description: extractTextFromBody(post.body),
    authorName: post.author?.name || 'Stardust Creator',
    authorBio: post.author?.bio,
    publishDate: post.publishedAt,
    imageUrl: post.mainImage?.url,
    category: post.categories?.map(cat => cat.title),
    tags: post.aiMetadata?.keywords,
    readingTime: post.aiMetadata?.readingTime || Math.ceil(wordCount / 200),
    wordCount
  };
}

function extractTextFromBody(body: SanityBlock[]): string {
  return body
    ?.filter(block => block._type === 'block')
    .map(block => 
      block.children
        ?.filter(child => child._type === 'span')
        .map(child => child.text)
        .join(' ') || ''
    )
    .join(' ')
    .slice(0, 250) + '...' || '';
}