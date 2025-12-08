import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog.types';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  // Format date consistently for SSR and client to prevent hydration mismatch
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = date.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' });
    const day = date.getUTCDate();
    return `${month} ${day}, ${year}`;
  };

  const formattedDate = formatDate(post.publishedAt);

  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group relative block overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 h-full"
      >
        <div className="grid md:grid-cols-2 gap-6 p-8">
          {/* Featured Image */}
          <div className="relative h-64 md:h-full rounded-2xl overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 50vw"
              loading="lazy"
            />
            <div className="absolute top-4 left-4">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full">
                Featured
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm rounded-full">
                {post.category}
              </span>
              <span className="text-white/60 text-sm">{post.readTime} min read</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
              {post.title}
            </h2>

            <p className="text-white/80 text-lg mb-6 line-clamp-3">{post.excerpt}</p>

            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 480px) 48px, 48px"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-white font-medium">{post.author.name}</p>
                <p className="text-white/60 text-sm">{formattedDate}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 h-full flex flex-col"
    >
      {/* Featured Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold rounded-full">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3 text-sm text-white/60">
          <time dateTime={post.publishedAt}>{formattedDate}</time>
          <span>•</span>
          <span>{post.readTime} min read</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-white/80 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>

        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="object-cover"
              sizes="(max-width: 480px) 40px, 40px"
              loading="lazy"
            />
          </div>
          <div>
            <p className="text-white text-sm font-medium">{post.author.name}</p>
            <p className="text-white/60 text-xs">{post.author.role}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
