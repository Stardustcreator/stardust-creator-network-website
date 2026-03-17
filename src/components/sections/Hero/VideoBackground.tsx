'use client';

import { useState, useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  videoId: string;
  className?: string;
}

export default function VideoBackground({ videoId, className = '' }: VideoBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use IntersectionObserver to load video only when in viewport
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !shouldLoad) {
            setShouldLoad(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (shouldLoad) {
      // Preload the iframe faster by setting loaded state
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [shouldLoad]);

  // Optimized YouTube URL parameters for faster loading and seamless looping
  // Using hd720 instead of hd1080 for faster loading
  const videoUrl = shouldLoad
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&vq=hd720&disablekb=1&fs=0&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`
    : '';

  return (
    <div
      ref={containerRef}
      className={className}
    >
      {shouldLoad && (
        <iframe
          ref={iframeRef}
          className={`absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          src={videoUrl}
          title="Hero Background Video"
          allow="autoplay; encrypted-media"
          loading="lazy"
          style={{
            border: 'none',
          }}
        />
      )}
      {/* Loading placeholder */}
      {!isLoaded && <div className="absolute inset-0 bg-black" />}
    </div>
  );
}
