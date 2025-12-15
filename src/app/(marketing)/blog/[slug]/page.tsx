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
    const { slug } = await params;
    const post = await getPostBySlug(slug);

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
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Generate BlogPosting structured data for SEO
  // This automatically works for all blog posts - no manual configuration needed
  let structuredData;
  try {
    // Ensure description is never empty (required by Schema.org)
    const description =
      post.excerpt?.trim() || post.title || 'Blog post from Stardust Creator Network';

    // Ensure we have a valid author name
    const authorName = post.author?.name?.trim() || 'Stardust Creator Network Team';

    structuredData = generateStructuredData.blogPosting({
      title: post.title,
      description,
      author: authorName,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt, // Use updatedAt if available, otherwise fallback to publishedAt
      url: `/blog/${post.slug}`,
      imageUrl: post.featuredImage || undefined, // Only include if image exists
      tags: [...(post.tags || []), ...(post.keywords || [])].filter(Boolean), // Filter out empty tags
    });
  } catch (error) {
    console.error('Error generating BlogPosting structured data:', error);
    // Page will still render even if structured data fails
    structuredData = null;
  }

  return (
    <>
      {/* BlogPosting Structured Data (JSON-LD) - Google Rich Results compliant */}
      {/* Automatically generated for every blog post - no manual setup required */}
      {structuredData && (
        <script
          type="application/ld+json"
          defer
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black pt-32 pb-20">
        <BlogPostContent post={post} />
      </main>
      <Footer />
    </>
  );
}
