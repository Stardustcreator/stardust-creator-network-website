import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const isProduction = process.env.NODE_ENV === 'production';

function getOrigin(value) {
  if (!value) return undefined;

  try {
    return new URL(value).origin;
  } catch {
    return undefined;
  }
}

const configuredApiOrigin = getOrigin(process.env.NEXT_PUBLIC_API_URL);
const connectSources = Array.from(
  new Set(
    [
      "'self'",
      configuredApiOrigin,
      ...(isProduction ? [] : ['http://localhost:*', 'http://127.0.0.1:*']),
      'https://badass-renter-elevator.ngrok-free.dev',
      'https://scn-backend-production.up.railway.app',
      'https://scn-backend-staging.up.railway.app',
      'https://stardustcreatornetwork.com',
      'https://www.stardustcreatornetwork.com',
      'https://mtdchowzitagopmsurzi.supabase.co',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://analytics.google.com',
      'https://stats.g.doubleclick.net',
      'https://region1.google-analytics.com',
      'https://*.google-analytics.com',
      'https://*.analytics.google.com',
      'https://*.googletagmanager.com',
      'https://*.facebook.com',
      'https://analytics.tiktok.com',
      'https://api.analytics.tiktok.com',
      'https://log.tiktok.com',
      'https://t.tiktok.com',
      'https://business-api.tiktok.com',
      'https://*.tiktok.com',
      'https://*.tiktokcdn.com',
      'https://*.sanity.io',
      'https://*.api.sanity.io',
      'https://*.run.app',
      'https://*.conversionsapigateway.com',
      'https://ipapi.co',
      'https://api.twitter.com',
      'https://*.twitter.com',
      'https://syndication.twitter.com',
      'https://publish.twitter.com',
      'https://api.instagram.com',
      'https://*.instagram.com',
      'https://*.paystack.com',
      'https://*.paystack.co',
      'https://*.clarity.ms',
    ].filter(Boolean)
  )
).join(' ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.stardustcreators.com' },
      { protocol: 'https', hostname: 'stardustcreators.com' },
      { protocol: 'https', hostname: '**.sanity.io' },
      { protocol: 'http', hostname: 'localhost', port: '3000' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    minimumCacheTTL: 31536000,
    unoptimized: false,
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'stardustcreatornetwork.com' }],
        destination: 'https://www.stardustcreatornetwork.com/:path*',
        permanent: true,
      },
      { source: '/join', destination: '/#waitlist', permanent: true },
      { source: '/creators', destination: '/#waitlist', permanent: true },
      { source: '/creator-community', destination: '/#waitlist', permanent: true },
      { source: '/event', destination: 'https://zoom.us/meeting/register/DbjTUWLgShitp9nvR4IcGQ', permanent: false },
    ];
  },

  async rewrites() {
    return [];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://stardustcreatornetwork.com https://www.stardustcreatornetwork.com https://vercel.live https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://tagmanager.google.com https://googletagmanager.com https://connect.facebook.net https://*.facebook.com https://platform.twitter.com https://*.twitter.com https://cdn.syndication.twimg.com https://script.tapfiliate.com https://js.paystack.co https://*.paystack.com https://*.paystack.co https://analytics.tiktok.com https://api.analytics.tiktok.com https://log.tiktok.com https://t.tiktok.com https://*.tiktok.com https://*.tiktokcdn.com",
              "script-src-elem 'self' 'unsafe-inline' https://stardustcreatornetwork.com https://*.clarity.ms https://www.stardustcreatornetwork.com https://vercel.live https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://tagmanager.google.com https://googletagmanager.com https://connect.facebook.net https://*.facebook.com https://core.sanity-cdn.com https://*.sanity.io https://platform.twitter.com https://*.twitter.com https://cdn.syndication.twimg.com https://script.tapfiliate.com https://analytics.tiktok.com https://api.analytics.tiktok.com https://log.tiktok.com https://t.tiktok.com https://*.tiktok.com https://*.tiktokcdn.com",
              "style-src 'self' 'unsafe-inline' https://stardustcreatornetwork.com https://www.stardustcreatornetwork.com https://fonts.googleapis.com https://tagmanager.google.com",
              "font-src 'self' data: https://stardustcreatornetwork.com https://*.clarity.ms https://www.stardustcreatornetwork.com https://fonts.gstatic.com",
              `connect-src ${connectSources}`,
              "frame-src 'self' https://www.googletagmanager.com https://td.doubleclick.net https://*.sanity.io https://*.sanity.studio https://www.youtube.com https://youtube.com https://*.youtube.com https://www.youtube-nocookie.com https://*.youtube-nocookie.com https://platform.twitter.com https://*.twitter.com https://twitter.com https://x.com https://*.x.com https://www.instagram.com https://*.instagram.com https://*.paystack.com https://*.paystack.co",
              "img-src 'self' data: blob: https: https://stardustcreatornetwork.com https://www.stardustcreatornetwork.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://stats.g.doubleclick.net https://googletagmanager.com https://*.google-analytics.com https://*.googletagmanager.com https://*.facebook.com https://pbs.twimg.com https://*.twimg.com https://*.cdninstagram.com https://*.fbcdn.net",
              "media-src 'self' https://www.youtube.com https://*.youtube.com https://www.youtube-nocookie.com https://*.youtube-nocookie.com https://*.cdninstagram.com https://*.fbcdn.net",
              "child-src 'self' https://www.youtube.com https://*.youtube.com https://www.youtube-nocookie.com https://*.youtube-nocookie.com https://www.instagram.com https://*.instagram.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              ...(isProduction ? ['upgrade-insecure-requests'] : []),
            ].join('; '),
          },
        ],
      },
      ...(isProduction
        ? [
          {
            // Cache static assets aggressively in production only.
            source: '/(.*)\\.(js|css|woff|woff2|eot|ttf|otf)',
            headers: [
              {
                key: 'Cache-Control',
                value: 'public, max-age=31536000, immutable',
              },
            ],
          },
          {
            // Cache images with longer duration in production only.
            source: '/(.*)\\.(jpg|jpeg|png|gif|ico|svg|webp|avif)',
            headers: [
              {
                key: 'Cache-Control',
                value: 'public, max-age=31536000, immutable',
              },
            ],
          },
          {
            // Cache video files in production only.
            source: '/(.*)\\.(webm|mp4|mov)',
            headers: [
              {
                key: 'Cache-Control',
                value: 'public, max-age=31536000, immutable',
              },
            ],
          },
        ]
        : []),
    ];
  },

  compiler: {
    removeConsole: isProduction ? { exclude: ['error', 'warn'] } : false,
  },

  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: false,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
    serverComponentsExternalPackages: ['pdfkit'],
  },
};

export default withBundleAnalyzer(nextConfig);