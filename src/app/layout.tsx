import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { site, absoluteUrl, generateStructuredData } from '@/lib/seo';
import './globals.css';

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  display: 'swap',
});

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
    <html lang="en">
      <head>
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
