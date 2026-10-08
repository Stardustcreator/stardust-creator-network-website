import type { Metadata } from 'next';
import Script from 'next/script';
import { site, absoluteUrl, generateStructuredData } from '@/lib/seo';
import { CountryProvider } from '@/lib/contexts/CountryContext';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import VercelAnalytics from '@/components/analytics/VercelAnalytics';
import OutboundLinkTracker from '@/components/analytics/OutboundLinkTracker';
import dynamic from 'next/dynamic';
import { Toaster } from '@/components/ui/Toaster';
import { Instrument_Sans, Lato } from 'next/font/google';

// Site-wide fonts (Figma: Instrument Sans for headings, Lato for body text).
// next/font self-hosts them at build time, so they satisfy the CSP
// (fonts from 'self' only). The CSS variables below are what every page and
// component reads: --font-instrument-sans and --font-lato.
const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-instrument-sans',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  display: 'swap',
  variable: '--font-lato',
});

const DeferredAnalytics = dynamic(() => import('@/components/analytics/DeferredAnalytics'), {
  ssr: false,
});

import './globals-new.css';

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

  verification: {},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${lato.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Google Site Verification */}
        <meta
          name="google-site-verification"
          content="sIXklRTJlN89f-fY2f1_Yd5lpiyuixk00AHGF7KKOII"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              generateStructuredData.organization(),
              generateStructuredData.website(),
            ]),
          }}
        />

        {/* External resource hints */}
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

        {/* Critical hero image */}
        <link
          rel="preload"
          href="/hero.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />

        {/* Microsoft Clarity */}
        {process.env.NEXT_PUBLIC_APP_ENV === 'production' && (
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
          >
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){
                  (c[a].q=c[a].q||[]).push(arguments)
                };
                t=l.createElement(r);
                t.async=1;
                t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];
                y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "xb45y9afql");
            `}
          </Script>
        )}
      </head>

      <body className="antialiased font-lato">
        <DeferredAnalytics />

        {/* Tapfiliate */}
        <Script
          src="https://script.tapfiliate.com/tapfiliate.js"
          strategy="afterInteractive"
        />

        <Script
          id="tapfiliate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(t,a,p){
                t.TapfiliateObject=a;
                t[a]=t[a]||function(){
                  (t[a].q=t[a].q||[]).push(arguments)
                }
              })(window,'tapfiliate');
            `,
          }}
        />

        {/* Google Analytics */}
        <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />

        {/* Outbound Link Tracking */}
        <OutboundLinkTracker />

        {/* Country Provider */}
        <CountryProvider>{children}</CountryProvider>

        <Toaster />

        {/* Vercel Analytics */}
        <VercelAnalytics />
      </body>
    </html>
  );
}
