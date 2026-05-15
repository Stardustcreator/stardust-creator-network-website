import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import PricingSection from '@/components/pricing/PricingSection';

export const metadata: Metadata = generateMetaTags({
  title: 'Join the Community – Stardust Creator Network',
  description:
    'Join the Stardust Creator Community. One plan, everything you need — structured live clinics, negotiation playbooks, peer network, and weekly office hours.',
  url: '/onboarding',
});

export default function OnboardingPage() {
  return (
    <>
      <Header variant="light" />
      <main
        id="main-content"
        className="min-h-screen bg-white pt-28"
      >
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
