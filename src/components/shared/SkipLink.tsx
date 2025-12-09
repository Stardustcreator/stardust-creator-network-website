'use client';

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="absolute left-0 top-0 z-[9999] -translate-y-full rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white shadow-lg outline-none ring-2 ring-purple-400 ring-offset-2 ring-offset-black transition-transform focus:translate-y-4 focus:left-4"
    >
      Skip to main content
    </a>
  );
}
