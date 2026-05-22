import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Security and performance proxy for the application
 * Handles security headers, rate limiting, and request optimization
 */
export default function proxy(request: NextRequest) {
  // Get the response
  const response = NextResponse.next();

  // Security Headers

  // Prevent the page from being displayed in a frame (clickjacking protection)
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');

  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // XSS protection (legacy but still useful for older browsers)
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Referrer policy for privacy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions policy to restrict access to browser features
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=()'
  );

  // Content Security Policy (CSP)
  // Comprehensive CSP that allows Google Tag Manager, Analytics, Facebook Pixel, and other required services
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://tagmanager.google.com https://googletagmanager.com https://connect.facebook.net https://*.facebook.com https://platform.twitter.com https://*.twitter.com https://cdn.syndication.twimg.com https://*.paystack.com https://*.paystack.co https://js.paystack.co;
    script-src-elem 'self' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://tagmanager.google.com https://googletagmanager.com https://connect.facebook.net https://*.facebook.com https://core.sanity-cdn.com https://*.sanity.io;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://tagmanager.google.com;
    img-src 'self' blob: data: https: https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://stats.g.doubleclick.net https://googletagmanager.com https://*.google-analytics.com https://*.googletagmanager.com https://*.facebook.com;
    font-src 'self' data: https://fonts.gstatic.com;
    connect-src 'self' https://192.168.0.116:3001 https://scn-backend-production.up.railway.app https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://region1.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.facebook.com https://*.sanity.io https://*.api.sanity.io https://*.run.app https://*.conversionsapigateway.com https://ipapi.co https://api.twitter.com https://*.twitter.com https://syndication.twitter.com https://publish.twitter.com https://api.instagram.com https://*.instagram.com https://*.paystack.com https://*.paystack.co;
    frame-src 'self' https://vercel.live https://www.googletagmanager.com https://td.doubleclick.net https://*.sanity.io https://*.sanity.studio https://www.youtube.com https://youtube.com https://*.youtube.com https://www.youtube-nocookie.com https://*.youtube-nocookie.com https://platform.twitter.com https://*.twitter.com https://twitter.com https://x.com https://*.x.com https://www.instagram.com https://*.instagram.com https://*.paystack.com https://*.paystack.co;
    img-src 'self' blob: data: https: https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://stats.g.doubleclick.net https://googletagmanager.com https://*.google-analytics.com https://*.googletagmanager.com https://*.facebook.com https://pbs.twimg.com https://*.twimg.com https://*.cdninstagram.com https://*.fbcdn.net;
    media-src 'self' https://www.youtube.com https://*.youtube.com https://www.youtube-nocookie.com https://*.youtube-nocookie.com https://*.cdninstagram.com https://*.fbcdn.net;
    child-src 'self' https://www.youtube.com https://*.youtube.com https://www.youtube-nocookie.com https://*.youtube-nocookie.com https://www.instagram.com https://*.instagram.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'self';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, ' ')
    .trim();

  response.headers.set('Content-Security-Policy', cspHeader);

  // HSTS (HTTP Strict Transport Security) - only in production
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload'
    );
  }

  // Performance headers

  // Enable DNS prefetching
  response.headers.set('X-DNS-Prefetch-Control', 'on');

  // Optimize connection handling
  response.headers.set('Connection', 'keep-alive');
  response.headers.set('Keep-Alive', 'timeout=5, max=1000');

  // Caching headers for static assets
  const { pathname } = request.nextUrl;

  if (
    pathname.includes('/_next/static/') ||
    pathname.includes('/images/') ||
    pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/)
  ) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // API route rate limiting headers (basic implementation)
  if (pathname.startsWith('/api/')) {
    response.headers.set('X-RateLimit-Limit', '100');
    response.headers.set('X-RateLimit-Remaining', '99'); // This would be dynamic in a real implementation
    response.headers.set('X-RateLimit-Reset', new Date(Date.now() + 60000).toISOString());
  }

  // CORS headers for API routes if needed
  if (pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: response.headers });
  }

  // Host canonicalization is handled by Vercel platform

  // Block known bot patterns that we don't want
  const userAgent = request.headers.get('user-agent') || '';
  const blockedBots = ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot'];

  if (blockedBots.some(bot => userAgent.includes(bot))) {
    return new Response('Bot blocked', { status: 403 });
  }

  // Add custom headers for debugging (only in development)
  if (process.env.NODE_ENV === 'development') {
    response.headers.set('X-Pathname', pathname);
    response.headers.set('X-User-Agent', userAgent);
  }

  return response;
}

// Configure which routes the proxy should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
