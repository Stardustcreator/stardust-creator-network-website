import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';
import BrandBriefForm from '@/components/forms/BrandBriefForm/BrandBriefForm';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

// Page-specific SEO metadata for UK
export const metadata: Metadata = generateMetaTags({
  title: 'Hire UK Influencers for Campaigns | Stardust Creator Network',
  description:
    "Hire UK influencers for your brand campaigns. Connect with the United Kingdom's top verified creators who drive authentic engagement and real results. Submit your brief and get matched with the perfect creators for your campaign.",
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
