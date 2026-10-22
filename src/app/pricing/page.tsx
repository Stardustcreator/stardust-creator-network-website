import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import BrandPricingContent from '@/components/pricing/BrandPricingContent';

// Brand pricing page (Figma: Plan & Pricing – Brands).
// Creator plans still live at /onboarding.
export const metadata: Metadata = {
  ...generateMetaTags({
    title: 'Pricing for Brands | Stardust Creator Network',
    description:
      'Annual creator marketing plans for brands, from ₦5,000,000 a month. Vetted creators, contracts, approvals and reporting handled for you. Prices include VAT.',
    url: '/pricing',
    tags: ['pricing', 'influencer marketing', 'creator campaigns', 'brands'],
  }),
  title: { absolute: 'Pricing for Brands | Stardust Creator Network' },
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <BrandPricingContent />
      </main>
      <Footer />
    </>
  );
}
