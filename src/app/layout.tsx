import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { site, absoluteUrl, generateStructuredData } from '@/lib/seo';
import { CountryProvider } from '@/lib/contexts/CountryContext';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import './globals.css';

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '700', '900'],
  display: 'swap',
  preload: true,
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
        url: absoluteUrl('/og-default.jpg'),
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
    images: [absoluteUrl('/og-default.jpg')],
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
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WKTV2K2D');`,
          }}
        />
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '831463455966535');
fbq('track', 'PageView');`,
          }}
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
        {/* Preconnect to external domains for performance */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${lato.variable} antialiased font-lato`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WKTV2K2D"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* Meta Pixel (noscript) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=831463455966535&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
        <CountryProvider>{children}</CountryProvider>
        <Analytics />
      </body>
    </html>
  );
}
