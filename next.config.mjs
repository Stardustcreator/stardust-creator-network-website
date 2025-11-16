/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  experimental: {
    // Optimize package imports for better tree-shaking
    optimizePackageImports: [
      'lucide-react',
      '@heroicons/react',
      '@headlessui/react',
      'framer-motion',
    ],
  },

  // Server external packages (moved from experimental)
  serverExternalPackages: [
    '@vercel/og',
  ],

  // Turbopack configuration for Next.js 16
  turbopack: {
    // Empty config to silence the webpack warning
  },

  // Image optimization configuration
  images: {
    // Enable remote image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
    ],
    // Image formats supported
    formats: ['image/avif', 'image/webp'],
    // Optimize images for better performance
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Note: Webpack configuration removed for Turbopack compatibility
  // Custom webpack configs can be migrated to Turbopack if needed

  // Enable static exports for better SEO (uncomment if you want full static export)
  // output: 'export',
  // trailingSlash: true,

  // Redirects for SEO (add your legacy URLs here)
  async redirects() {
    return [
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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://stardustcreatornetwork.com https://www.stardustcreatornetwork.com https://vercel.live https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://tagmanager.google.com https://googletagmanager.com https://connect.facebook.net https://*.facebook.com",
              "script-src-elem 'self' 'unsafe-inline' https://stardustcreatornetwork.com https://www.stardustcreatornetwork.com https://vercel.live https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://tagmanager.google.com https://googletagmanager.com https://connect.facebook.net https://*.facebook.com https://core.sanity-cdn.com https://*.sanity.io",
              "style-src 'self' 'unsafe-inline' https://stardustcreatornetwork.com https://www.stardustcreatornetwork.com https://fonts.googleapis.com https://tagmanager.google.com",
              "img-src 'self' data: blob: https: https://stardustcreatornetwork.com https://www.stardustcreatornetwork.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://stats.g.doubleclick.net https://googletagmanager.com https://*.google-analytics.com https://*.googletagmanager.com https://www.facebook.com https://*.facebook.com",
              "font-src 'self' data: https://stardustcreatornetwork.com https://www.stardustcreatornetwork.com https://fonts.gstatic.com",
              "connect-src 'self' https://stardustcreatornetwork.com https://www.stardustcreatornetwork.com https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://region1.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://www.facebook.com https://*.facebook.com https://*.sanity.io https://*.api.sanity.io https://*.run.app https://*.conversionsapigateway.com",
              "frame-src 'self' https://www.googletagmanager.com https://td.doubleclick.net",
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
            value: 'public, max-age=86400, s-maxage=31536000'
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
  // SWC minifier is enabled by default in Next.js 16
};

export default nextConfig;
