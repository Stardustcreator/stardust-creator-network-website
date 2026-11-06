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
      'Launch a single creator campaign or partner with Stardust on a year-round retainer. Vetted creators, approvals, contracts and reporting handled for you, priced to your goals and budget.',
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
