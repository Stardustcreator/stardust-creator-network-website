import Image from 'next/image';
import Link from 'next/link';
import type { PortableTextBlock } from '@portabletext/types';
import { BlogPost } from '@/types/blog.types';
import PortableTextContent from '@/components/blog/PortableTextContent';

interface BlogPostContentProps {
  post: BlogPost & { body?: PortableTextBlock[] };
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  // Format date consistently for SSR and client to prevent hydration mismatch
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = date.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' });
    const day = date.getUTCDate();
    return `${month} ${day}, ${year}`;
  };

  const formattedDate = formatDate(post.publishedAt);

  return (
    <article className="w-full bg-white">
      {/* Hero Section with Featured Image and Title Overlay */}
      <div className="relative w-screen h-[60vh] md:h-[70vh] lg:h-screen -mx-[calc(50vw-50%)] left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Title Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-12 lg:p-16">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-6">
              <span className="px-3 sm:px-4 py-1 sm:py-2 bg-red-500 text-white text-xs sm:text-sm font-semibold rounded-full">
                {post.category}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bricolage-grotesque font-bold text-white leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm font-lato">
              <time dateTime={post.publishedAt}>{formattedDate}</time>
              <span>•</span>
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg sm:text-xl text-black mb-8 sm:mb-12 leading-relaxed font-lato">
            {post.excerpt}
          </p>
        )}

        {/* Author Info */}
        <div className="flex items-center gap-4 p-6 bg-gray-100 border border-gray-200 rounded-2xl mb-12 sm:mb-16">
          {post.author.avatar && (
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 flex-shrink-0">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
                sizes="64px"
                loading="lazy"
              />
            </div>
          )}
          <div>
            <p className="text-black font-semibold text-lg font-lato">{post.author.name}</p>
            <p className="text-gray-600 font-lato">{post.author.role}</p>
          </div>
        </div>

        {/* Article Content */}
        <div className="mb-12 sm:mb-16 text-black text-base sm:text-lg leading-relaxed font-lato space-y-4">
          {post.body && Array.isArray(post.body) ? (
            <PortableTextContent value={post.body} />
          ) : (
            <div
              className="text-black space-y-4"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
            />
          )}
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12 sm:mb-16">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-4 py-2 bg-gray-100 border border-gray-300 text-black text-sm rounded-full hover:bg-gray-200 transition-colors font-lato"
              >
                #{tag.toLowerCase().replace(/\s+/g, '')}
              </span>
            ))}
          </div>
        )}

        {/* Author Bio */}
        {post.author.bio && (
          <div className="p-6 sm:p-8 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-3xl mb-12 sm:mb-16">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              {post.author.avatar && (
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-purple-300 flex-shrink-0">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bricolage-grotesque font-bold text-black mb-2">
                  About {post.author.name}
                </h2>
                <p className="text-black mb-2 text-sm sm:text-base font-lato">{post.author.role}</p>
                <p className="text-black text-sm sm:text-base font-lato">{post.author.bio}</p>
              </div>
            </div>
          </div>
        )}

        {/* Related Resources Section */}
        <div className="p-6 sm:p-8 bg-gray-100 border border-gray-300 rounded-3xl">
          <h2 className="text-2xl font-bricolage-grotesque font-bold text-black mb-4">
            Related Resources
          </h2>
          <p className="text-black mb-6 text-sm sm:text-base font-lato">
            Explore how we&apos;ve helped brands succeed with authentic creator partnerships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/case-studies"
              className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 border border-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all text-center text-sm sm:text-base font-medium font-lato"
            >
              View Case Studies
            </Link>
            <Link
              href="/blog"
              className="flex-1 px-6 py-4 bg-white border border-gray-300 text-black rounded-xl hover:bg-gray-50 transition-all text-center text-sm sm:text-base font-medium font-lato"
            >
              Read More Articles
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
