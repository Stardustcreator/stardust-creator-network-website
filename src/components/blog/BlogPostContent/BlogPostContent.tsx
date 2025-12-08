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
    <article className="max-w-4xl mx-auto px-6">
      {/* Header */}
      <div className="mb-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blog
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full">
            {post.category}
          </span>
          <time
            dateTime={post.publishedAt}
            className="text-white/60"
          >
            {formattedDate}
          </time>
          <span className="text-white/60">•</span>
          <span className="text-white/60">{post.readTime} min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">{post.title}</h1>

        <p className="text-xl text-white/80 mb-8">{post.excerpt}</p>

        {/* Author Info */}
        <div className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="object-cover"
              sizes="(max-width: 480px) 64px, 64px"
              loading="lazy"
            />
          </div>
          <div>
            <p className="text-white font-semibold text-lg">{post.author.name}</p>
            <p className="text-white/80">{post.author.role}</p>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-12">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 90vw, 896px"
          priority
        />
      </div>

      {/* Content */}
      <div className="mb-12">
        {post.body && Array.isArray(post.body) ? (
          <PortableTextContent value={post.body} />
        ) : (
          <div className="prose prose-invert prose-lg max-w-none">
            <div
              className="text-white/90 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
            />
          </div>
        )}
      </div>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-12">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 text-white/80 text-sm rounded-full"
            >
              #{tag.toLowerCase().replace(/\s+/g, '')}
            </span>
          ))}
        </div>
      )}

      {/* Author Bio */}
      {post.author.bio && (
        <div className="p-8 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-white/10 rounded-3xl">
          <div className="flex items-start gap-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">About {post.author.name}</h2>
              <p className="text-white/80 mb-2">{post.author.role}</p>
              <p className="text-white/80">{post.author.bio}</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 rounded-3xl text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to Join the Creator Economy?</h2>
        <p className="text-white/80 mb-6 max-w-2xl mx-auto">
          Whether you&apos;re a brand looking for creators or a creator ready to collaborate,
          Stardust Creator Network connects you with the right partnerships.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/brands/brief"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
          >
            Find a Creator
          </Link>
          <Link
            href="/creators/join"
            className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105"
          >
            Join as Creator
          </Link>
        </div>
      </div>
    </article>
  );
}
