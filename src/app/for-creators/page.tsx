import type { Metadata } from 'next';
import { Instrument_Sans, Lato } from 'next/font/google';
import { generateMetaTags } from '@/lib/seo';
import ForCreatorsContent from './ForCreatorsContent';

// Self-hosted at build time by next/font, so no external font request
// (the CSP only allows fonts from 'self'). ForCreatorsContent's styles read
// these through the CSS variables below.
const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-instrument-sans',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-lato-fc',
});

export const metadata: Metadata = generateMetaTags({
  title: 'For Creators – Get Booked by Brands | Stardust Creator Network',
  description:
    'Get found by brands, price your work with confidence and get paid properly. Rate calculator, rate card builder, brand deals, storefront and audience tools for African creators.',
  image: '/who we are/creators.webp',
  url: '/for-creators',
  tags: ['creators', 'brand deals', 'rate card', 'creator tools', 'monetization'],
});

export default function ForCreatorsPage() {
  return (
    <div className={`${instrumentSans.variable} ${lato.variable}`}>
      <ForCreatorsContent />
    </div>
  );
}
