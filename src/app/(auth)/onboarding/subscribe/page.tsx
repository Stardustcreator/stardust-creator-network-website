import type { Metadata } from 'next';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import PricingSection from '@/components/pricing/PricingSection';

export const metadata: Metadata = {
  title: 'Choose a Plan – Stardust Creator Network',
  robots: { index: false },
};

export default function SubscribePage() {
  return (
    <>
      <Header variant="light" />
      <main
        id="main-content"
        className="bg-white pt-28"
      >
        <PricingSection ctaBase="/onboarding/payment" />
      </main>
      <Footer />
    </>
  );
}
