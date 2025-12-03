import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import BlogPostContent from '@/components/blog/BlogPostContent';
import { getPostBySlug, getAllPostSlugs } from '@/lib/services/sanity-blog.service';
import { generateMetaTags, generateStructuredData } from '@/lib/seo';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    return slugs.map((slug: string) => ({
      slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);

    if (!post) {
      return {
        title: 'Post Not Found | Stardust Creator Network',
      };
    }

    // Include primary keyword in description for SEO
    const description = post.excerpt
      ? `${post.excerpt} Discover influencer marketing tips, trends, and strategies.`
      : 'Discover influencer marketing tips, trends, and strategies from Stardust Creator Network.';

    const metadata = generateMetaTags({
      title: post.title,
      description,
      image: post.featuredImage,
      url: `/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      tags: post.tags,
      author: post.author.name,
    });

    return {
      ...metadata,
      keywords: post.keywords,
      other: {
        'article:published_time': post.publishedAt,
        'article:author': post.author.name,
        'article:section': post.category,
        'article:tag': [...post.tags, ...(post.keywords || [])].join(', '),
      },
      alternates: {
        ...metadata.alternates,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error | Stardust Creator Network',
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const structuredData = generateStructuredData.article({
    title: post.title,
    description: post.excerpt,
    author: post.author.name,
    publishedTime: post.publishedAt,
    url: `/blog/${post.slug}`,
    imageUrl: post.featuredImage,
    tags: [...post.tags, ...(post.keywords || [])],
  });

  return (
    <>
      {/* Article Structured Data - Deferred, non-blocking */}
      <script
        type="application/ld+json"
        defer
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black pt-32 pb-20">
        <BlogPostContent post={post} />
      </main>
      <Footer />
    </>
  );
}
