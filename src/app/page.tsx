import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';

// Page-specific SEO metadata
export const metadata: Metadata = generateMetaTags({
  title: 'Home',
  description:
    'Empowering creators with innovative tools, resources, and community connections to build, grow, and monetize their digital presence.',
  url: '/',
});

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Logo/Brand */}
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <span className="text-white text-2xl font-bold">S</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Stardust Creator Network</h1>
          </div>

          {/* Tagline */}
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            Empowering creators with innovative tools, resources, and community connections to
            build, grow, and monetize their digital presence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow">
              Get Started
            </button>
            <button className="px-8 py-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Learn More
            </button>
          </div>

          {/* Foundation Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-green-600 font-bold">SEO</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">SEO Optimized</h3>
              <p className="text-gray-600 text-sm">
                Built-in SEO with dynamic Open Graph images, structured data, and automatic
                sitemaps.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-600 font-bold">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance First</h3>
              <p className="text-gray-600 text-sm">
                Optimized for speed with Next.js App Router, image optimization, and edge runtime.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-purple-600 font-bold">🔒</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Hardened</h3>
              <p className="text-gray-600 text-sm">
                Comprehensive security headers, CSP, HSTS, and bot protection built-in.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-orange-600 font-bold">TS</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">TypeScript Ready</h3>
              <p className="text-gray-600 text-sm">
                Full TypeScript support with strict mode and comprehensive type safety.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-red-600 font-bold">🧪</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Testing Suite</h3>
              <p className="text-gray-600 text-sm">
                Comprehensive testing with Vitest, Playwright, and accessibility checks.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-indigo-600 font-bold">🚀</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">CI/CD Ready</h3>
              <p className="text-gray-600 text-sm">
                GitHub Actions workflow with automated testing, security audits, and deployment.
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mt-20 p-8 bg-gray-50 rounded-2xl max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Built with Modern Tech</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div className="text-center">
                <div className="font-semibold text-gray-900">Next.js 16</div>
                <div className="text-gray-600">App Router</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900">TypeScript</div>
                <div className="text-gray-600">Strict Mode</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900">Tailwind CSS</div>
                <div className="text-gray-600">Version 4</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900">Vercel</div>
                <div className="text-gray-600">Analytics</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-20 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            <p>&copy; 2024 Stardust Creator Network. Built with Next.js and deployed on Vercel.</p>
            <div className="mt-4 flex justify-center gap-4">
              <a
                href="/og?title=Stardust Creator Network&subtitle=Dynamic OG Image Test"
                className="hover:text-gray-700 transition-colors"
              >
                Test OG Image
              </a>
              <a
                href="/sitemap.xml"
                className="hover:text-gray-700 transition-colors"
              >
                Sitemap
              </a>
              <a
                href="/robots.txt"
                className="hover:text-gray-700 transition-colors"
              >
                Robots.txt
              </a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
