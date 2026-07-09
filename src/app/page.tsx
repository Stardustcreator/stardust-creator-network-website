import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { generateMetaTags, generateStructuredData } from '@/lib/seo';
import PerformanceTracker from '@/components/performance/PerformanceTracker';

// Critical above-the-fold components (load immediately)
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import Hero from '@/components/sections/Hero/Hero';

// Lazy load below-the-fold sections for better initial load performance
const ConnectCollaborateCreateSection = dynamic(
  () => import('@/components/sections/ConnectCollaborateCreate/ConnectCollaborateCreateSection'),
  {
    ssr: true,
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
  }
);

const WhoScnIsForSection = dynamic(
  () => import('@/components/sections/WhoScnIsFor/WhoScnIsForSection'),
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

const WhatChangesWhenYouJoinSection = dynamic(
  () => import('@/components/sections/WhatChangesWhenYouJoin/WhatChangesWhenYouJoinSection'),
  {
    ssr: true,
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
  }
);

const FAQSection = dynamic(() => import('@/components/sections/FAQS/FAQSection'), {
  ssr: true,
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
});

const FinalCTASection = dynamic(() => import('@/components/sections/FinalCTA/FinalCTASection'), {
  ssr: true,
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-200"></div>,
});

// ✅ Page-specific SEO metadata
export const metadata: Metadata = generateMetaTags({
  title: 'Stardust Creator Network – Empowering Creators in Nigeria & Beyond',
  description:
    'Stardust Creator Network connects creators with top brands for high-value partnerships, campaign collaborations, and scalable monetization opportunities across the creator economy',
  image: '/who we are/creators.webp',
  url: '/',
  tags: ['creators', 'network', 'monetization', 'collaboration', 'digital business'],
});

export default function Home() {
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
        {/* ========== SECTION 1 ========== */}
        <Hero />

        {/* ========== SECTION 2 ========== */}
        <ConnectCollaborateCreateSection />

        {/* ========== SECTION 3 ========== */}
        <WhoScnIsForSection />

        {/* ========== SECTION 4 ========== */}
        <TestimonialsSection />

        {/* ========== SECTION 5 ========== */}
        <WhatChangesWhenYouJoinSection />

        {/* ========== SECTION 6 ========== */}
        <FAQSection />

        {/* ========== SECTION 7 - Final CTA ========== */}
        <FinalCTASection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Performance Tracking */}
      <PerformanceTracker />
    </>
  );
}
