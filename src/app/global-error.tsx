'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log error for debugging

  console.error('Global error:', error);
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-black flex items-center justify-center px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6">Error</h1>
            <h2 className="text-2xl md:text-3xl text-white mb-4">Something went wrong</h2>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              A critical error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={reset}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
