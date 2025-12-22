'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface InstagramEmbedProps {
  postUrl: string;
  className?: string;
}

interface InstagramData {
  html: string;
  author_name: string;
  author_url: string;
  url: string;
  width?: number;
  height?: number;
  thumbnail_url?: string | null;
  title?: string;
  description?: string;
}

/**
 * Instagram Embed Component
 *
 * Shows a preview of the Instagram post with a link to view on Instagram.
 *
 * @param postUrl - Instagram post URL
 * @param className - Optional additional CSS classes
 */
export default function InstagramEmbed({ postUrl, className = '' }: InstagramEmbedProps) {
  const [postData, setPostData] = useState<InstagramData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Ensure component only runs on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Check if URL is provided
    if (!postUrl || postUrl.trim() === '') {
      setIsLoading(false);
      setError('Instagram URL not provided');
      return;
    }

    // Extract post ID from URL
    const postIdMatch = postUrl.match(/\/p\/([^/?]+)/) || postUrl.match(/\/reel\/([^/?]+)/);
    if (!postIdMatch) {
      setError('Invalid Instagram URL');
      setIsLoading(false);
      return;
    }

    // Check if this is the Cleamax Instagram post - use custom thumbnail
    const isCleamaxPost =
      postUrl.includes('B39vNXXFViR') ||
      postUrl.includes('cleamax') ||
      postUrl.includes('cleanmax');
    const customThumbnail = isCleamaxPost ? '/case-studies/Uriel.webp' : null;

    // Use our API route to fetch Instagram oEmbed (avoids CORS issues)
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/instagram-oembed?url=${encodeURIComponent(postUrl)}`);
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to fetch Instagram post');
        }

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        // Use custom thumbnail if available, otherwise use API thumbnail
        setPostData({
          ...data,
          thumbnail_url: customThumbnail || data.thumbnail_url,
        });
        setIsLoading(false);
        setImageError(false);
      } catch (err) {
        console.error('Error fetching Instagram embed:', err);
        // Even if API fails, set thumbnail if we have a custom one
        if (customThumbnail) {
          setPostData({
            html: '',
            author_name: 'Cleanmax Sparkle',
            author_url: 'https://www.instagram.com/cleanmaxsparkle/',
            url: postUrl,
            thumbnail_url: customThumbnail,
            title: 'Cleanmax Sparkle Instagram Post',
            description: '',
          });
          setIsLoading(false);
        } else {
          setError(err instanceof Error ? err.message : 'Failed to load post');
          setIsLoading(false);
        }
      }
    };

    fetchPost();
  }, [postUrl, isMounted]);

  const extractThumbnail = (html: string): string | null => {
    // Try to extract thumbnail from oEmbed HTML
    const imgMatch = html.match(/<img[^>]+src="([^"]+)"/);
    if (imgMatch) return imgMatch[1];

    // Look for og:image patterns
    const ogImageMatch = html.match(/https?:\/\/[^\s"<>]*\.(jpg|jpeg|png|webp)/i);
    if (ogImageMatch) return ogImageMatch[0];

    return null;
  };

  // Use thumbnail_url from API response, or extract from HTML
  const thumbnailUrl =
    postData?.thumbnail_url || (postData?.html ? extractThumbnail(postData.html) : null);

  // Extract post text from description or title
  const postText = postData?.description || postData?.title || '';

  return (
    <div
      className={`relative w-full ${className}`}
      suppressHydrationWarning
    >
      <div className="relative w-full rounded-lg overflow-hidden bg-black border border-white/10 shadow-xl">
        {!isMounted || isLoading ? (
          <div className="flex items-center justify-center h-[400px]">
            <p className="text-white/60 text-sm">Loading Instagram post...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-[500px]">
            <div className="text-center">
              <p className="text-white/60 text-sm mb-4">{error}</p>
              <Link
                href={postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                View post on Instagram
              </Link>
            </div>
          </div>
        ) : postData ? (
          <div className="relative group">
            <Link
              href={postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative w-full aspect-video bg-black overflow-hidden"
            >
              {thumbnailUrl && !imageError ? (
                <div className="relative w-full h-full">
                  <img
                    src={thumbnailUrl}
                    alt={`${postData.author_name || 'Instagram'} post preview`}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                    loading="lazy"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
                    <div className="bg-white/95 rounded-full p-5 group-hover:bg-white transition-all shadow-2xl group-hover:scale-110">
                      <svg
                        className="w-14 h-14 text-black ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  {/* Video indicator badge */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span className="text-white text-xs font-semibold">VIDEO</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-purple-800/30 relative overflow-hidden">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500 rounded-full blur-3xl"></div>
                  </div>
                  <div className="text-center relative z-10">
                    <div className="bg-white/95 rounded-full p-6 mb-6 mx-auto w-fit shadow-2xl group-hover:scale-110 transition-transform">
                      <svg
                        className="w-16 h-16 text-black ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-white text-base font-semibold mb-2">
                      Watch Video on Instagram
                    </p>
                    <p className="text-white/70 text-sm">Click to play the full video</p>
                  </div>
                </div>
              )}
            </Link>

            <div className="p-4 bg-black/80 backdrop-blur-sm border-t border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-white font-semibold">
                  {postData.author_name || 'Instagram'}
                </span>
                {postData.author_url && (
                  <span className="text-white/60 text-sm">
                    @{postData.author_url.split('/').pop()}
                  </span>
                )}
              </div>
              {postText && <p className="text-white/80 text-sm mb-3 line-clamp-2">{postText}</p>}
              <Link
                href={postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-semibold rounded-full transition-colors"
              >
                View on Instagram
                <svg
                  className="w-3 h-3 ml-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[400px]">
            <Link
              href={postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 underline"
            >
              View post on Instagram
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
