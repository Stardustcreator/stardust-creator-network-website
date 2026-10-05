import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import { generateMetaTags } from '@/lib/seo';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import RedirectAuthenticatedUser from '@/components/auth/RedirectAuthenticatedUser';
// import PricingSection from '@/components/pricing/PricingSection';
import PlanPricingSection from '@/components/pricing/PlanPricingSection';

// Self-hosted by next/font (CSP only allows fonts from 'self').
// Google's Lato ships 400 and 700 only, so the design's Medium (500) and
// Semibold (600) render with the nearest available weight.
const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-lato-pp',
});

export const metadata: Metadata = generateMetaTags({
  title: 'Plans & Pricing – Stardust Creator Network',
  description:
    "Start free and get paid what you're worth. Price your work, send professional rate cards and invoices, and land brand deals.",
  url: '/onboarding',
});

export default function OnboardingPage() {
  return (
    <>
      <Header variant="light" />
      <main
        id="main-content"
        className={`${lato.variable} bg-white pt-28`}
      >
        <RedirectAuthenticatedUser inactiveRedirect="/onboarding/reactivate">
          {/* <PricingSection /> */}
          <PlanPricingSection />
        </RedirectAuthenticatedUser>
      </main>
      <Footer />
    </>
  );
}
