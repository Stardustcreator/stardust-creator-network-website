import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import Script from 'next/script';
import { site, absoluteUrl, generateStructuredData } from '@/lib/seo';
// Commented out unused imports
// import { StructuredDataInjector } from '@/components/shared/StructuredDataInjector';
// import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/schemaGenerators';
import { CountryProvider } from '@/lib/contexts/CountryContext';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import VercelAnalytics from '@/components/analytics/VercelAnalytics';
import OutboundLinkTracker from '@/components/analytics/OutboundLinkTracker';
import dynamic from 'next/dynamic';

const DeferredAnalytics = dynamic(() => import('@/components/analytics/DeferredAnalytics'), {
  ssr: false,
});
import './globals-new.css';

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true, // Reduce CLS by matching fallback metrics
});

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = 'G-8CMEVERXXG';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.defaultDescription,
  keywords: [
    'creator network',
    'content creation',
    'digital creators',
    'creator tools',
    'creative community',
    'monetization',
    'creator economy',
  ],
  authors: [{ name: 'Stardust Creator Network Team' }],
  creator: 'Stardust Creator Network',
  publisher: 'Stardust Creator Network',
  alternates: {
    canonical: absoluteUrl(),
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    title: site.name,
    description: site.defaultDescription,
    siteName: site.name,
    images: [
      {
        url: absoluteUrl('/who we are/creators.webp'),
        width: 1200,
        height: 630,
        alt: `${site.name} - Empowering Digital Creators`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.defaultDescription,
    site: site.twitterHandle,
    images: [absoluteUrl('/who we are/creators.webp')],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification IDs here when ready
    // google: "your-google-verification-id",
    // yandex: "your-yandex-verification-id",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
    >
      <head>
        {/* Google Site Verification */}
        <meta
          name="google-site-verification"
          content="sIXklRTJlN89f-fY2f1_Yd5lpiyuixk00AHGF7KKOII"
        />
        {/* Structured Data - Deferred, non-blocking */}
        <script
          type="application/ld+json"
          defer
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              generateStructuredData.organization(),
              generateStructuredData.website(),
            ]),
          }}
        />
        {/* Preconnect to external domains for performance - only critical ones */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* DNS prefetch for non-critical resources */}
        <link
          rel="dns-prefetch"
          href="https://cdn.sanity.io"
        />
        <link
          rel="dns-prefetch"
          href="https://www.youtube-nocookie.com"
        />
        <link
          rel="dns-prefetch"
          href="https://www.googletagmanager.com"
        />
        <link
          rel="dns-prefetch"
          href="https://www.google-analytics.com"
        />
        {/* Preload critical hero image (LCP element) */}
        <link
          rel="preload"
          href="/hero.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body className={`${lato.variable} antialiased font-lato`}>
        {/* Deferred analytics: GTM & Meta Pixel load after interaction/idle to improve LCP */}
        {/* eslint-disable-next-line @next/next/no-server-import-in-page */}
        {/* Lazy client loader for analytics */}
        <DeferredAnalytics />
        {/* Note: noscript fallback is included inside DeferredAnalytics */}
        {/* Tapfiliate - Affiliate tracking */}
        <Script
          src="https://script.tapfiliate.com/tapfiliate.js"
          strategy="afterInteractive"
        />
        <Script
          id="tapfiliate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(t,a,p){t.TapfiliateObject=a;t[a]=t[a]||function(){ (t[a].q=t[a].q||[]).push(arguments)}})(window,'tap');
tap('create', '63069-ff90ee', { integration: "javascript" });
tap('detect');`,
          }}
        />
        {/* Google Analytics - Loads after page is interactive */}
        <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
        {/* Outbound Link Tracking - Tracks external link clicks */}
        <OutboundLinkTracker />
        {/* Client-only deferred analytics loader */}
        {/* @ts-ignore - client component loaded in server file */}
        <script
          dangerouslySetInnerHTML={{
            __html: `/* DeferredAnalytics is client-only and will hydrate in the browser */`,
          }}
        />
        {/* Essential: Country Provider for location-based content */}
        <CountryProvider>{children}</CountryProvider>
        {/* Vercel Analytics - Lazy loaded, non-essential */}
        <VercelAnalytics />
      </body>
    </html>
  );
}
