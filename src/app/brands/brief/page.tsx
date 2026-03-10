import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';
import BrandBriefClient from './BrandBriefClient';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

export const metadata: Metadata = generateMetaTags({
  title: 'Start a Brand Campaign with Creators | Stardust Creator Network',
  description:
    'Connect with verified creators in your region. Choose your location to access the most relevant brand partnership opportunities.',
  url: '/brands/brief',
});

export default function BrandBriefPage() {
  // Server-side rendered H1 for SEO
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black">
        {/* SEO-visible H1 heading */}
        <div className="sr-only">
          <h1>Start a Brand Campaign with Creators</h1>
        </div>
        <BrandBriefClient />
      </main>
      <Footer />
    </>
  );
}
