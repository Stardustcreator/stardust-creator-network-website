import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';

// Components
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import Hero from '@/components/sections/Hero/Hero';
import PlatformLogosSection from '@/components/sections/PlatformLogos/PlatformLogosSection';
import ConnectCollaborateCreateSection from '@/components/sections/ConnectCollaborateCreate/ConnectCollaborateCreateSection';
import IconGridSection from '@/components/sections/IconGrid/IconGridSection';
import CreatorShowcaseSection from '@/components/sections/CreatorShowcase/CreatorShowcaseSection';
import StatisticsDashboardSection from '@/components/sections/Statistics/StatisticsDashboardSection';
import CTASection from '@/components/sections/CTA/CTASection';

// Page-specific SEO metadata
export const metadata: Metadata = generateMetaTags({
  title: 'The Fastest Growing Creators of TikTok Shop - Stardust Creator Network',
  description:
    'Join thousands of creators building sustainable businesses on Stardust Creator Network. Create. Connect. Convert. Access powerful tools, analytics, and monetization features.',
  url: '/',
});

export default function Home() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="bg-black">
        {/* Hero Section */}
        <Hero />

        {/* Platform Logos */}
        <PlatformLogosSection />

        {/* Connect. Collaborate. Create. */}
        <ConnectCollaborateCreateSection />

        {/* Icon Grid Features */}
        <IconGridSection />

        {/* Creator Showcase with Analytics */}
        <CreatorShowcaseSection />

        {/* Credibility & Vision Statement */}
        <StatisticsDashboardSection />

        {/* Final CTA Section */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
