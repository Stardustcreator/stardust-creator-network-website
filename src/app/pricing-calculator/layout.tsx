import { Metadata } from 'next';
import { PricingCalculatorProvider } from '@/lib/contexts';

export const metadata: Metadata = {
  title: 'Pricing Calculator - Know What to Charge Brands | Stardust Creator Network',
  description:
    'Calculate your exact creator pricing for brand deals in 2 minutes. Get personalized quotes for sponsored posts, UGC content, and brand partnerships.',
  keywords:
    'creator pricing calculator, influencer rate calculator, brand deal pricing, UGC pricing, sponsored post rates, influencer calculator Nigeria',
  openGraph: {
    title: 'Pricing Calculator - Know What to Charge Brands',
    description:
      'Calculate your exact creator pricing for brand deals in 2 minutes. Get personalized quotes for sponsored posts, UGC content, and brand partnerships.',
    url: 'https://www.stardustcreatornetwork.com/pricing-calculator',
    siteName: 'Stardust Creator Network',
    images: [
      {
        url: 'https://www.stardustcreatornetwork.com/hero.webp',
        width: 1200,
        height: 630,
        alt: 'Stardust Creator Network - Pricing Calculator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing Calculator - Know What to Charge Brands',
    description: 'Calculate your exact creator pricing for brand deals in 2 minutes.',
    images: ['https://www.stardustcreatornetwork.com/hero.webp'],
  },
  alternates: {
    canonical: 'https://www.stardustcreatornetwork.com/pricing-calculator',
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
};

export default function PricingCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <PricingCalculatorProvider>{children}</PricingCalculatorProvider>;
}
