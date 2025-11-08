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
  title: 'Stardust Creator Network | Discover, Collaborate & Grow With Top Creators',
  description:
    "Join the Stardust Creator Network — where brands and creators connect through authentic stories, data-driven campaigns, and real community. Collaborate, earn, and grow your influence with Africa's most vibrant creator network.",
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
