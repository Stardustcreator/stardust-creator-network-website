import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { generateMetaTags, generateStructuredData } from '@/lib/seo';
import PerformanceTracker from '@/components/performance/PerformanceTracker';

// Critical above-the-fold components
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import Hero from '@/components/sections/Hero/Hero';

// =====================================================
// SECTION 2 - CONNECT, COLLABORATE, CREATE
// =====================================================

const ConnectCollaborateCreateSection = dynamic(
  () => import('@/components/sections/ConnectCollaborateCreate/ConnectCollaborateCreateSection'),
  {
    ssr: true,
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
  }
);

// =====================================================
// SECTION 3 - WHO SCN IS FOR
// =====================================================

const WhoScnIsForSection = dynamic(
  () => import('@/components/sections/WhoScnIsFor/WhoScnIsForSection'),
  {
    ssr: true,
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
  }
);

// =====================================================
// SECTION 4 - TESTIMONIALS
// =====================================================

const TestimonialsSection = dynamic(
  () => import('@/components/sections/Testimonials/TestimonialsSection'),
  {
    ssr: true,
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
  }
);

// =====================================================
// SECTION 5 - WHAT CHANGES WHEN YOU JOIN
// =====================================================

const WhatChangesWhenYouJoinSection = dynamic(
  () => import('@/components/sections/WhatChangesWhenYouJoin/WhatChangesWhenYouJoinSection'),
  {
    ssr: true,
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
  }
);

// =====================================================
// SECTION 6 - CREATOR GROWTH
// =====================================================

const CreatorGrowthSection = dynamic(
  () => import('@/components/sections/CreatorGrowth/CreatorGrowthSection'),
  {
    ssr: true,
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
  }
);

// =====================================================
// SECTION 7 - LIVE CAMPAIGN
// =====================================================

const LiveCampaignSection = dynamic(
  () => import('@/components/sections/LiveCampaign/LiveCampaignSection'),
  {
    ssr: true,
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
  }
);

// =====================================================
// SECTION 8 - CASE STUDIES
// =====================================================

const CaseStudiesSection = dynamic(
  () => import('@/components/sections/CaseStudies/CaseStudiesSection'),
  {
    ssr: true,
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
  }
);

// =====================================================
// SECTION 9 - FAQ
// =====================================================

const FAQSection = dynamic(() => import('@/components/sections/FAQS/FAQSection'), {
  ssr: true,
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
});

// =====================================================
// SECTION 10 - FINAL CTA
// =====================================================

const FinalCTASection = dynamic(() => import('@/components/sections/FinalCTA/FinalCTASection'), {
  ssr: true,
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
});

// =====================================================
// PAGE SEO METADATA
// =====================================================

export const metadata: Metadata = generateMetaTags({
  title: 'Stardust Creator Network – Empowering Creators in Nigeria & Beyond',

  description:
    'Stardust Creator Network connects creators with top brands for high-value partnerships, campaign collaborations, and scalable monetization opportunities across the creator economy',

  image: '/who we are/creators.webp',

  url: '/',

  tags: ['creators', 'network', 'monetization', 'collaboration', 'digital business'],
});

// =====================================================
// HOME PAGE
// =====================================================

export default function Home() {
  const breadcrumbData = generateStructuredData.breadcrumb([
    {
      name: 'Home',
      url: '/',
    },
  ]);

  return (
    <>
      {/* =================================================
          BREADCRUMB STRUCTURED DATA
      ================================================= */}

      <script
        type="application/ld+json"
        defer
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />

      {/* =================================================
          HEADER
      ================================================= */}

      <Header />

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main
        id="main-content"
        className="bg-black"
      >
        {/* ===============================================
            SECTION 1 - HERO
        =============================================== */}

        <Hero />

        {/* ===============================================
            SECTION 2 - CONNECT, COLLABORATE, CREATE
        =============================================== */}

        <ConnectCollaborateCreateSection />

        {/* ===============================================
            SECTION 3 - WHO SCN IS FOR
        =============================================== */}

        <WhoScnIsForSection />

        {/* ===============================================
            SECTION 4 - TESTIMONIALS
        =============================================== */}

        <TestimonialsSection />

        {/* ===============================================
            SECTION 5 - WHAT CHANGES WHEN YOU JOIN
        =============================================== */}

        <WhatChangesWhenYouJoinSection />

        {/* ===============================================
            SECTION 6 - CREATOR GROWTH
        =============================================== */}

        <CreatorGrowthSection />

        {/* ===============================================
            SECTION 7 - LIVE CAMPAIGN
        =============================================== */}

        <LiveCampaignSection />

        {/* ===============================================
            SECTION 8 - CASE STUDIES
        =============================================== */}

        <CaseStudiesSection />

        {/* ===============================================
            SECTION 9 - FAQ
        =============================================== */}

        <FAQSection />

        {/* ===============================================
            SECTION 10 - FINAL CTA
        =============================================== */}

        <FinalCTASection />
      </main>

      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />

      {/* =================================================
          PERFORMANCE TRACKING
      ================================================= */}

      <PerformanceTracker />
    </>
  );
}
