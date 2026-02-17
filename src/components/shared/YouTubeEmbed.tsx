'use client';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
}

/**
 * YouTube Embed Component
 *
 * Embeds a YouTube video that can be played directly on the website.
 * Extracts video ID from various YouTube URL formats.
 *
 * @param videoId - YouTube video ID or full URL (will extract ID automatically)
 * @param title - Optional title for accessibility
 * @param className - Optional additional CSS classes
 */
export default function YouTubeEmbed({
  videoId,
  title = 'YouTube video player',
  className = '',
}: YouTubeEmbedProps) {
  // Extract video ID from URL if full URL is provided
  const extractVideoId = (input: string): string => {
    // Handle different YouTube URL formats
    // https://www.youtube.com/watch?v=VIDEO_ID
    // https://youtu.be/VIDEO_ID
    // https://www.youtube.com/embed/VIDEO_ID

    if (input.includes('youtube.com/watch?v=')) {
      const match = input.match(/[?&]v=([^&]+)/);
      return match ? match[1] : input;
    }
    if (input.includes('youtu.be/')) {
      const match = input.match(/youtu\.be\/([^?]+)/);
      return match ? match[1] : input;
    }
    if (input.includes('youtube.com/embed/')) {
      const match = input.match(/embed\/([^?]+)/);
      return match ? match[1] : input;
    }
    // If it's already just an ID, return as is
    return input.trim();
  };

  const finalVideoId = extractVideoId(videoId);

  // Validate video ID
  if (!finalVideoId || finalVideoId.length < 10) {
    console.error('Invalid YouTube video ID:', videoId);
    return (
      <div className={`relative w-full ${className}`}>
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black border border-white/10 shadow-xl flex items-center justify-center">
          <p className="text-white/60 text-sm">Invalid YouTube video URL</p>
        </div>
      </div>
    );
  }

  // Use privacy-enhanced mode (youtube-nocookie.com) which is more CSP-friendly
  const embedUrl = `https://www.youtube-nocookie.com/embed/${finalVideoId}?rel=0&modestbranding=1&enablejsapi=1`;

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative w-full rounded-lg overflow-hidden bg-black border border-white/10 shadow-xl">
        <div
          className="relative w-full"
          style={{
            paddingBottom: '56.25%', // 16:9 aspect ratio (16/9 = 0.5625)
          }}
        >
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
            loading="lazy"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
}
