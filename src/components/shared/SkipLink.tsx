'use client';

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-purple-600 focus:px-6 focus:py-3 focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black"
    >
      Skip to main content
    </a>
  );
}
