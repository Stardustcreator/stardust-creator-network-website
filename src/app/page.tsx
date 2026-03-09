import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { generateMetaTags, generateStructuredData } from '@/lib/seo';
import PerformanceTracker from '@/components/performance/PerformanceTracker';

// Critical above-the-fold components (load immediately)
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import Hero from '@/components/sections/Hero/Hero';
import PlatformLogosSection from '@/components/sections/PlatformLogos/PlatformLogosSection';

// Lazy load below-the-fold sections for better initial load performance
const ConnectCollaborateCreateSection = dynamic(
  () => import('@/components/sections/ConnectCollaborateCreate/ConnectCollaborateCreateSection'),
  {
    ssr: true,
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
  }
);

const IconGridSection = dynamic(() => import('@/components/sections/IconGrid/IconGridSection'), {
  ssr: true,
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
});

const WhoScnIsForSection = dynamic(
  () => import('@/components/sections/WhoScnIsFor/WhoScnIsForSection'),
  {
    ssr: true,
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
  }
);

const HowScnWorksSection = dynamic(
  () => import('@/components/sections/HowScnWorks/HowScnWorksSection'),
  {
    ssr: true,
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
  }
);

const PaidCommunitySection = dynamic(
  () => import('@/components/sections/PaidCommunity/PaidCommunitySection'),
  {
    ssr: true,
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
  }
);

const PricingSection = dynamic(() => import('@/components/sections/Pricing/PricingSection'), {
  ssr: true,
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
});

const WhatMakesScnDifferentSection = dynamic(
  () => import('@/components/sections/WhatMakesScnDifferent/WhatMakesScnDifferentSection'),
  {
    ssr: true,
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
  }
);

const WhatHappensWhenYouJoinSection = dynamic(
  () => import('@/components/sections/WhatHappensWhenYouJoin/WhatHappensWhenYouJoinSection'),
  {
    ssr: true,
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
  }
);

const TestimonialsSection = dynamic(
  () => import('@/components/sections/Testimonials/TestimonialsSection'),
  {
    ssr: true,
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
  }
);

const CreatorOsSection = dynamic(
  () => import('@/components/sections/creator-os/CreatorOsSection'),
  {
    ssr: true,
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
  }
);

const CreativesShowcaseSection = dynamic(
  () => import('@/components/sections/CreativesShowcase/CreativesShowcaseSection'),
  {
    ssr: true,
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
  }
);

const StatisticsDashboardSection = dynamic(
  () => import('@/components/sections/Statistics/StatisticsDashboardSection'),
  {
    ssr: true,
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
  }
);

const CaseStudiesSection = dynamic(
  () => import('@/components/sections/CaseStudies/CaseStudiesSection'),
  {
    ssr: true,
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
  }
);

const CTASection = dynamic(() => import('@/components/sections/CTA/CTASection'), {
  ssr: true,
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
});

// ✅ Page-specific SEO metadata (NO structuredData here)
export const metadata: Metadata = generateMetaTags({
  title: 'Stardust Creator Network – Empowering Creators in Nigeria & Beyond',
  description:
    'Stardust Creator Network connects creators with top brands for high-value partnerships, campaign collaborations, and scalable monetization opportunities across the creator economy',
  image: '/who we are/creators.webp',
  url: '/',
  tags: ['creators', 'network', 'monetization', 'collaboration', 'digital business'],
});

export default function Home() {
  // ✅ Structured data belongs in JSON-LD scripts, not metadata
  const breadcrumbData = generateStructuredData.breadcrumb([{ name: 'Home', url: '/' }]);

  return (
    <>
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        defer
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />

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

        {/* Who SCN Is For */}
        <WhoScnIsForSection />

        {/* How SCN Works */}
        <HowScnWorksSection />

        {/* Paid Community */}
        <PaidCommunitySection />

        {/* What Makes SCN Different */}
        <WhatMakesScnDifferentSection />

        {/* What Happens When You Join */}
        <WhatHappensWhenYouJoinSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Pricing */}
        <PricingSection />

        {/* Icon Grid Features */}
        <IconGridSection />

        {/* Creator OS */}
        <CreatorOsSection />

        {/* Creatives Showcase */}
        <CreativesShowcaseSection />

        {/* Credibility & Vision */}
        <StatisticsDashboardSection />

        {/* Case Studies */}
        <CaseStudiesSection />

        {/* CTA */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Performance Tracking */}
      <PerformanceTracker />
    </>
  );
}
