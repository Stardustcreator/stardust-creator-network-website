import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import OurTeamContent from '@/components/our-team/OurTeamContent';

// Page-specific SEO metadata
export const metadata: Metadata = generateMetaTags({
  title: 'Our Team – Stardust Creator Network',
  description:
    'Meet the talented team behind Stardust Creator Network. We connect brands with creators to build authentic partnerships and drive meaningful engagement.',
  image: '/who we are/creators.webp',
  url: '/our-team',
});

export default function OurTeamPage() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="min-h-screen bg-black"
      >
        <OurTeamContent />
      </main>
      <Footer />
    </>
  );
}
