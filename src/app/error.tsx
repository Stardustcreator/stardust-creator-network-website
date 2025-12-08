'use client';

import { useEffect } from 'react';
import { Heading, Text } from '@/components/typography';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <Heading
          level={1}
          variant="gradient"
          className="text-6xl md:text-8xl mb-6"
        >
          Oops!
        </Heading>
        <Heading
          level={2}
          variant="default"
          className="text-white text-2xl md:text-3xl mb-4"
        >
          Something went wrong
        </Heading>
        <Text
          variant="body"
          className="text-white/70 mb-8 max-w-md mx-auto"
        >
          We encountered an unexpected error. Don&apos;t worry, our team has been notified and is
          working on a fix.
        </Text>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
          >
            Try Again
          </button>
          <button
            onClick={() => {
              window.location.href = '/';
            }}
            className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white/20 transition-all duration-300"
          >
            Go Home
          </button>
        </div>
        {error.digest && (
          <Text
            variant="small"
            className="text-white/40 mt-8"
          >
            Error ID: {error.digest}
          </Text>
        )}
      </div>
    </div>
  );
}
