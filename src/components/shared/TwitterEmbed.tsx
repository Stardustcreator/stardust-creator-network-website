'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TwitterEmbedProps {
  tweetUrl: string;
  className?: string;
}

interface TweetData {
  html: string;
  author_name: string;
  author_url: string;
  url: string;
  width?: number;
  height?: number;
  thumbnailUrl?: string | null;
}

/**
 * Twitter/X Embed Component
 *
 * Shows a preview of the Twitter video with a link to play on Twitter.
 *
 * @param tweetUrl - Twitter/X tweet URL
 * @param className - Optional additional CSS classes
 */
export default function TwitterEmbed({ tweetUrl, className = '' }: TwitterEmbedProps) {
  const [tweetData, setTweetData] = useState<TweetData | null>(null);
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

    // Extract tweet ID from URL
    const tweetIdMatch = tweetUrl.match(/status\/(\d+)/);
    if (!tweetIdMatch) {
      setError('Invalid Twitter URL');
      setIsLoading(false);
      return;
    }

    // Check if this is the AXA Mansard tweet - use specific thumbnail
    const isAxaTweet = tweetUrl.includes('1358775318430027777');
    const customThumbnail = isAxaTweet ? '/case-studies/Timini.webp' : null;

    // Use our API route to fetch Twitter oEmbed (avoids CORS issues)
    const fetchTweet = async () => {
      try {
        const response = await fetch(`/api/twitter-oembed?url=${encodeURIComponent(tweetUrl)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tweet');
        }

        const data = await response.json();
        // Use custom thumbnail if available, otherwise use API thumbnail
        setTweetData({
          ...data,
          thumbnailUrl: customThumbnail || data.thumbnailUrl,
        });
        setIsLoading(false);
        setImageError(false); // Reset image error when new data loads
      } catch (err) {
        console.error('Error fetching Twitter embed:', err);
        // Even if API fails, set thumbnail if we have a custom one
        if (customThumbnail) {
          setTweetData({
            html: '',
            author_name: 'AXA Mansard',
            author_url: 'https://twitter.com/AXAMansard',
            url: tweetUrl,
            thumbnailUrl: customThumbnail,
          });
          setIsLoading(false);
        } else {
          setError('Failed to load tweet');
          setIsLoading(false);
        }
      }
    };

    fetchTweet();
  }, [tweetUrl, isMounted]);

  // Extract video thumbnail/image from tweet HTML
  const extractVideoThumbnail = (html: string): string | null => {
    // Try multiple patterns to find images
    // Pattern 1: Look for img tags with src
    const imgMatch = html.match(/<img[^>]+src="([^"]+)"/);
    if (imgMatch) {
      return imgMatch[1];
    }

    // Pattern 2: Look for video poster or thumbnail
    const posterMatch = html.match(/poster="([^"]+)"/);
    if (posterMatch) {
      return posterMatch[1];
    }

    // Pattern 3: Look for any image URL in the HTML
    const urlMatch = html.match(/https?:\/\/[^\s"<>]+\.(jpg|jpeg|png|webp|gif)/i);
    if (urlMatch) {
      return urlMatch[0];
    }

    return null;
  };

  // Always render the same structure on server and client
  return (
    <div
      className={`relative w-full ${className}`}
      suppressHydrationWarning
    >
      <div className="relative w-full rounded-lg overflow-hidden bg-black border border-white/10 shadow-xl">
        {!isMounted ? (
          // Server-side render - show loading state
          <div className="flex items-center justify-center h-[400px]">
            <p className="text-white/60 text-sm">Loading tweet...</p>
          </div>
        ) : error ? (
          // Error state
          <div className="flex items-center justify-center h-[500px]">
            <div className="text-center">
              <p className="text-white/60 text-sm mb-4">{error}</p>
              <Link
                href={tweetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                View tweet on Twitter
              </Link>
            </div>
          </div>
        ) : isLoading ? (
          // Loading state
          <div className="flex items-center justify-center h-[400px]">
            <p className="text-white/60 text-sm">Loading tweet...</p>
          </div>
        ) : tweetData ? (
          // Tweet preview with video thumbnail
          <div className="relative group">
            <Link
              href={tweetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative w-full aspect-video bg-black overflow-hidden"
            >
              {/* Video Thumbnail/Preview */}
              {tweetData.thumbnailUrl && !imageError ? (
                <div className="relative w-full h-full">
                  <img
                    src={tweetData.thumbnailUrl}
                    alt={`${tweetData.author_name} tweet video preview`}
                    className="w-full h-full object-cover"
                    onError={() => {
                      setImageError(true);
                    }}
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
                      Watch Video on Twitter
                    </p>
                    <p className="text-white/70 text-sm">Click to play the full video</p>
                  </div>
                </div>
              )}
            </Link>

            {/* Tweet Info */}
            <div className="p-4 bg-black/80 backdrop-blur-sm border-t border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-white font-semibold">{tweetData.author_name}</span>
                <span className="text-white/60 text-sm">@AXAMansard</span>
              </div>
              <p className="text-white/80 text-sm mb-3 line-clamp-2">
                A comprehensive car insurance where you can choose what cover matters to you? Yes!
                That&apos;s exactly what AutoFlex gives you. Flexibility! #AutoFlex
                #ChooseWhatMatters
              </p>
              <Link
                href={tweetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
              >
                <span>Watch on Twitter</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ) : (
          // Fallback
          <div className="flex items-center justify-center h-[400px]">
            <Link
              href={tweetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 underline"
            >
              View tweet on Twitter
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
