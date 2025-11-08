import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';
import BrandBriefForm from '@/components/forms/BrandBriefForm/BrandBriefForm';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

// Page-specific SEO metadata for UK
export const metadata: Metadata = generateMetaTags({
  title: 'Find Creators - United Kingdom | Stardust Creator Network',
  description:
    "Connect your brand with the UK's top verified creators. Complete our quick brief to get matched with creators who move culture and drive real results for your campaigns.",
  url: '/brands/brief/uk',
});

export default function UKBrandBriefPage() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Brief Form */}
      <main className="min-h-screen bg-black">
        <BrandBriefForm country="United Kingdom" />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
