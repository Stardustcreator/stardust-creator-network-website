import type { Metadata } from 'next';
import { generateMetaTags, generateStructuredData } from '@/lib/seo';

// Components
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import Hero from '@/components/sections/Hero/Hero';
import PlatformLogosSection from '@/components/sections/PlatformLogos/PlatformLogosSection';
import ConnectCollaborateCreateSection from '@/components/sections/ConnectCollaborateCreate/ConnectCollaborateCreateSection';
import IconGridSection from '@/components/sections/IconGrid/IconGridSection';
import CreatorOsSection from '@/components/sections/creator-os/CreatorOsSection';
import StatisticsDashboardSection from '@/components/sections/Statistics/StatisticsDashboardSection';
import CTASection from '@/components/sections/CTA/CTASection';

// Page-specific SEO metadata
export const metadata: Metadata = generateMetaTags({
  title: 'Stardust Creator Network – Empowering Creators in Nigeria & Beyond',
  description:
    'Join a growth-focused community for creators. Access education, monetization playbooks, and collaborate with peers to scale your creative business.',
  image: '/who we are/creators.webp',
  url: '/',
});

export default function Home() {
  const breadcrumbData = generateStructuredData.breadcrumb([{ name: 'Home', url: '/' }]);

  return (
    <>
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
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
        <CreatorOsSection />

        {/* Credibility & Vision Statement */}
        <StatisticsDashboardSection />

        {/* Trusted by Leading Brands */}
        <PlatformLogosSection />

        {/* Final CTA Section */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
