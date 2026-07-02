import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog.types';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  // Format date consistently for SSR and client to prevent hydration mismatch
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Date unavailable';
    try {
      const date = new Date(dateString);
      const year = date.getUTCFullYear();
      const month = date.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' });
      const day = date.getUTCDate();
      return `${month} ${day}, ${year}`;
    } catch {
      return 'Date unavailable';
    }
  };

  // Safe date extraction with multiple fallbacks
  const safeDate = post?.publishedAt || post?._createdAt || new Date().toISOString();
  const formattedDate = formatDate(safeDate);
  const safeTitle = post?.title || 'Untitled';
  const safeSlug = post?.slug || '#';
  const safeImage = post?.featuredImage || '/placeholder.webp';
  const safeCategory = post?.category || 'Uncategorized';
  const safeExcerpt = post?.excerpt || 'No description available';
  const safeReadTime = post?.readTime || 5;

  if (featured) {
    return (
      <Link
        href={`/blog/${safeSlug}`}
        className="group h-full rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all hover:shadow-lg"
        style={{ backgroundColor: '#000000' }}
      >
        <div className="grid md:grid-cols-2 gap-6 h-full">
          {/* Featured Image */}
          <div className="relative h-64 md:h-full overflow-hidden">
            <Image
              src={safeImage}
              alt={safeTitle}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 50vw"
              loading="lazy"
            />
            <div className="absolute top-4 right-4">
              <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-bold rounded">
                Featured
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-orange-400 font-semibold text-sm">{safeCategory}</span>
              <span className="text-white/60 text-sm">{safeReadTime} min read</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-orange-300 transition-colors">
              {safeTitle}
            </h2>

            <p className="text-white/80 text-base mb-6 line-clamp-3">{safeExcerpt}</p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${safeSlug}`}
      className="group h-full flex flex-col rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all hover:shadow-lg"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Featured Image with Category Badge */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={safeImage}
          alt={safeTitle}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-3 right-3">
          <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-bold rounded">
            {safeCategory}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3 text-white/60 text-sm">
          <time>{formattedDate}</time>
          <span>•</span>
          <span>{safeReadTime} min read</span>
        </div>

        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-orange-300 transition-colors line-clamp-2">
          {safeTitle}
        </h3>

        <p className="text-white/70 mb-4 line-clamp-3 flex-grow text-sm">{safeExcerpt}</p>
      </div>
    </Link>
  );
}
