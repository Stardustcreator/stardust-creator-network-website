import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';
import BrandBriefForm from '@/components/forms/BrandBriefForm/BrandBriefForm';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

// Page-specific SEO metadata for Nigeria
export const metadata: Metadata = generateMetaTags({
  title: 'Hire Nigerian Influencers for Campaigns | Stardust Creator Network',
  description:
    "Hire Nigerian influencers for your brand campaigns. Connect with Nigeria's top verified creators who drive authentic engagement and real results. Submit your brief and get matched with the perfect creators for your campaign.",
  url: '/brands/brief/nigeria',
});

export default function NigeriaBrandBriefPage() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Brief Form */}
      <main className="min-h-screen bg-black">
        <BrandBriefForm country="Nigeria" />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
