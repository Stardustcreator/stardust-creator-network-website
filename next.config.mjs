import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  // No external server packages configured

  // Image optimization configuration
  images: {
    // Enable remote image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.stardustcreators.com',
      },
      {
        protocol: 'https',
        hostname: 'stardustcreators.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
    ],
    // Image formats supported - prioritize AVIF and WebP for better compression
    formats: ['image/avif', 'image/webp'],
    // Image sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Performance and security settings
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Increase cache TTL for better performance
    minimumCacheTTL: 31536000, // 1 year
    // Allow unoptimized images if optimization fails (for images with spaces in paths)
    unoptimized: false,
  },

  // Note: Webpack configuration removed for Turbopack compatibility
  // Custom webpack configs can be migrated to Turbopack if needed

  // Enable static exports for better SEO (uncomment if you want full static export)
  // output: 'export',
  // trailingSlash: true,

  // Redirects for SEO (add your legacy URLs here)
  async redirects() {
    return [
      // Redirect non-www to www for canonical URLs
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'stardustcreatornetwork.com',
          },
        ],
        destination: 'https://www.stardustcreatornetwork.com/:path*',
        permanent: true,
      },
      // Example redirect from old URL structure
      // {
      //   source: '/old-path/:slug',
      //   destination: '/new-path/:slug',
      //   permanent: true,
      // },
    ];
  },

  // Rewrites for API routes or proxying
  async rewrites() {
    return [
      // Example: Proxy blog requests to external CMS
      // {
      //   source: '/blog/:slug*',
      //   destination: 'https://your-headless-cms.com/api/posts/:slug*',
      // },
    ];
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://stardustcreatornetwork.com https://www.stardustcreatornetwork.com https://vercel.live https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://tagmanager.google.com https://googletagmanager.com https://connect.facebook.net https://*.facebook.com https://platform.twitter.com https://*.twitter.com https://cdn.syndication.twimg.com",
              "script-src-elem 'self' 'unsafe-inline' https://stardustcreatornetwork.com https://www.stardustcreatornetwork.com https://vercel.live https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://tagmanager.google.com https://googletagmanager.com https://connect.facebook.net https://*.facebook.com https://core.sanity-cdn.com https://*.sanity.io https://platform.twitter.com https://*.twitter.com https://cdn.syndication.twimg.com",
              "style-src 'self' 'unsafe-inline' https://stardustcreatornetwork.com https://www.stardustcreatornetwork.com https://fonts.googleapis.com https://tagmanager.google.com",
              "img-src 'self' data: blob: https: https://stardustcreatornetwork.com https://www.stardustcreatornetwork.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://stats.g.doubleclick.net https://googletagmanager.com https://*.google-analytics.com https://*.googletagmanager.com https://*.facebook.com",
              "font-src 'self' data: https://stardustcreatornetwork.com https://www.stardustcreatornetwork.com https://fonts.gstatic.com",
              "connect-src 'self' https://stardustcreatornetwork.com https://www.stardustcreatornetwork.com https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://region1.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.facebook.com https://*.sanity.io https://*.api.sanity.io https://*.run.app https://*.conversionsapigateway.com https://ipapi.co https://api.twitter.com https://*.twitter.com https://syndication.twitter.com https://publish.twitter.com https://api.instagram.com https://*.instagram.com",
              "frame-src 'self' https://www.googletagmanager.com https://td.doubleclick.net https://*.sanity.io https://*.sanity.studio https://www.youtube.com https://youtube.com https://*.youtube.com https://www.youtube-nocookie.com https://*.youtube-nocookie.com https://platform.twitter.com https://*.twitter.com https://twitter.com https://x.com https://*.x.com https://www.instagram.com https://*.instagram.com",
              "img-src 'self' data: blob: https: https://stardustcreatornetwork.com https://www.stardustcreatornetwork.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://stats.g.doubleclick.net https://googletagmanager.com https://*.google-analytics.com https://*.googletagmanager.com https://*.facebook.com https://pbs.twimg.com https://*.twimg.com https://*.cdninstagram.com https://*.fbcdn.net",
              "media-src 'self' https://www.youtube.com https://*.youtube.com https://www.youtube-nocookie.com https://*.youtube-nocookie.com https://*.cdninstagram.com https://*.fbcdn.net",
              "child-src 'self' https://www.youtube.com https://*.youtube.com https://www.youtube-nocookie.com https://*.youtube-nocookie.com https://www.instagram.com https://*.instagram.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests"
            ].join('; ')
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/(.*)\\.(js|css|woff|woff2|eot|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
      {
        // Cache images with longer duration
        source: '/(.*)\\.(jpg|jpeg|png|gif|ico|svg|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
      {
        // Cache video files
        source: '/(.*)\\.(webm|mp4|mov)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
    ];
  },

  // Compiler options
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Enable powered by header (set to false for security)
  poweredByHeader: false,

  // Generate source maps in development
  productionBrowserSourceMaps: false,

  // Enable React strict mode
  reactStrictMode: true,

  // TypeScript configuration
  typescript: {
    // Type check during build
    ignoreBuildErrors: false,
  },

  // Note: ESLint configuration moved to eslint.config.mjs
  // Skip ESLint during build to avoid CI failures when local dev plugins differ
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Experimental features for better performance
  experimental: {
    // Optimize package imports for smaller bundles
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  
  // SWC minifier is enabled by default in Next.js 16 (no config needed)
  // Tailwind CSS 4 automatically purges unused CSS
  // Compression and font optimization are enabled by default in Next.js 16
};

export default withBundleAnalyzer(nextConfig);
