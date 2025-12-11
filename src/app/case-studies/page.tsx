import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import CaseStudiesContent from '@/components/case-studies/CaseStudiesContent';

// Page-specific SEO metadata
export const metadata: Metadata = generateMetaTags({
  title: 'Case Studies – Stardust Creator Network',
  description:
    'Explore successful creator-brand partnerships and campaign results from Stardust Creator Network. See how we connect brands with creators to drive authentic engagement and conversions.',
  image: '/who we are/creators.webp',
  url: '/case-studies',
});

export default function CaseStudiesPage() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="min-h-screen bg-black"
      >
        <CaseStudiesContent />
      </main>
      <Footer />
    </>
  );
}
