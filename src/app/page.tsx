import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { generateMetaTags, generateStructuredData } from '@/lib/seo';

// Critical above-the-fold components (load immediately)
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import Hero from '@/components/sections/Hero/Hero';
import PlatformLogosSection from '@/components/sections/PlatformLogos/PlatformLogosSection';

// Lazy load below-the-fold sections for better initial load performance
const ConnectCollaborateCreateSection = dynamic(
  () => import('@/components/sections/ConnectCollaborateCreate/ConnectCollaborateCreateSection'),
  { ssr: true }
);
const IconGridSection = dynamic(() => import('@/components/sections/IconGrid/IconGridSection'), {
  ssr: true,
});
const CreatorOsSection = dynamic(
  () => import('@/components/sections/creator-os/CreatorOsSection'),
  { ssr: true }
);
const CreativesShowcaseSection = dynamic(
  () => import('@/components/sections/CreativesShowcase/CreativesShowcaseSection'),
  { ssr: true }
);
const StatisticsDashboardSection = dynamic(
  () => import('@/components/sections/Statistics/StatisticsDashboardSection'),
  { ssr: true }
);
const CaseStudiesSection = dynamic(
  () => import('@/components/sections/CaseStudies/CaseStudiesSection'),
  { ssr: true }
);
const CTASection = dynamic(() => import('@/components/sections/CTA/CTASection'), { ssr: true });

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
      {/* Breadcrumb Structured Data - Deferred, non-blocking */}
      <script
        type="application/ld+json"
        defer
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
      {/* Preload only the LCP image (hero) - other images will lazy load */}
      {/* Hero image is already preloaded in layout.tsx, no need to duplicate */}
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main
        id="main-content"
        className="bg-black"
      >
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

        {/* Creatives Showcase */}
        <CreativesShowcaseSection />

        {/* Credibility & Vision Statement */}
        <StatisticsDashboardSection />

        {/* Case Studies Section */}
        <CaseStudiesSection />

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
