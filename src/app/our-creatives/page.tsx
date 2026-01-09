import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import OurCreativesContent from '@/components/our-creatives/OurCreativesContent';

// Page-specific SEO metadata
export const metadata: Metadata = generateMetaTags({
  title: 'Our Creatives – Stardust Creator Network',
  description:
    'Explore our collection of social media creative designs from Stardust Creator Network. Discover innovative visual content, campaign designs, and creative assets that showcase our brand identity and creative excellence.',
  image: '/who we are/creators.webp',
  url: '/our-creatives',
});

export default function OurCreativesPage() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="min-h-screen bg-black"
      >
        <OurCreativesContent />
      </main>
      <Footer />
    </>
  );
}
