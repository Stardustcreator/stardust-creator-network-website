import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { generateMetaTags, generateStructuredData } from '@/lib/seo';
import PerformanceTracker from '@/components/performance/PerformanceTracker';

// Critical above-the-fold components (load immediately)
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import Hero from '@/components/sections/Hero/Hero';

// Content editors change this in the admin CMS - fetched here rather than
// hardcoded in Hero itself. Falls back to Hero's own defaults (which match
// what shipped before this existed) on any failure, so a backend outage or
// missing env var never breaks the page - same resilience pattern as
// src/app/event/route.ts's own backend fetch.
const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

interface ChangeItem {
  before: string;
  after: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface HomepageContent {
  heroTitle?: string;
  heroSubtitle?: string;
  heroButton?: string;
  featuresTitle?: string;
  featuresSubtitle?: string;
  learnContent?: string;
  buildContent?: string;
  earnContent?: string;
  growContent?: string;
  testimonialsTitle?: string;
  changesTitle?: string;
  changes?: ChangeItem[];
  faqTitle?: string;
  faqs?: FaqItem[];
  finalCtaTitle?: string;
  finalCtaDescription?: string;
  finalCtaButton?: string;
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

function asChangeArray(value: unknown): ChangeItem[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const items = value.filter(
    (item): item is ChangeItem =>
      !!item && typeof item.before === 'string' && typeof item.after === 'string'
  );
  return items.length > 0 ? items : undefined;
}

function asFaqArray(value: unknown): FaqItem[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const items = value.filter(
    (item): item is FaqItem =>
      !!item && typeof item.question === 'string' && typeof item.answer === 'string'
  );
  return items.length > 0 ? items : undefined;
}

// Fetches the full `homepage` CMS content object once so every section below
// can pull its own slice out of it. Falls back to each section's own
// defaults (which match what shipped before this existed) on any failure, so
// a backend outage or missing env var never breaks the page - same
// resilience pattern as src/app/event/route.ts's own backend fetch.
async function getHomepageContent(): Promise<HomepageContent> {
  if (!API_URL) return {};

  try {
    const res = await fetch(`${API_URL}/cms/pages/homepage`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return {};

    const data = await res.json();
    const content = data?.content ?? {};
    return {
      heroTitle: asString(content.heroTitle),
      heroSubtitle: asString(content.heroSubtitle),
      heroButton: asString(content.heroButton),
      featuresTitle: asString(content.featuresTitle),
      featuresSubtitle: asString(content.featuresSubtitle),
      learnContent: asString(content.learnContent),
      buildContent: asString(content.buildContent),
      earnContent: asString(content.earnContent),
      growContent: asString(content.growContent),
      testimonialsTitle: asString(content.testimonialsTitle),
      changesTitle: asString(content.changesTitle),
      changes: asChangeArray(content.changes),
      faqTitle: asString(content.faqTitle),
      faqs: asFaqArray(content.faqs),
      finalCtaTitle: asString(content.finalCtaTitle),
      finalCtaDescription: asString(content.finalCtaDescription),
      finalCtaButton: asString(content.finalCtaButton),
    };
  } catch {
    return {};
  }
}

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

export default async function Home() {
  const breadcrumbData = generateStructuredData.breadcrumb([{ name: 'Home', url: '/' }]);
  const homepageContent = await getHomepageContent();

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
        <Hero
          title={homepageContent.heroTitle}
          subtitle={homepageContent.heroSubtitle}
          buttonText={homepageContent.heroButton}
        />

        {/* ========== SECTION 2 ========== */}
        <ConnectCollaborateCreateSection
          featuresTitle={homepageContent.featuresTitle}
          featuresSubtitle={homepageContent.featuresSubtitle}
        />

        {/* ========== SECTION 3 ========== */}
        <WhoScnIsForSection
          learnContent={homepageContent.learnContent}
          buildContent={homepageContent.buildContent}
          earnContent={homepageContent.earnContent}
          growContent={homepageContent.growContent}
        />

        {/* ========== SECTION 4 ========== */}
        <TestimonialsSection testimonialsTitle={homepageContent.testimonialsTitle} />

        {/* ========== SECTION 5 ========== */}
        <WhatChangesWhenYouJoinSection
          changesTitle={homepageContent.changesTitle}
          changes={homepageContent.changes}
        />

        {/* ========== SECTION 6 ========== */}
        <FAQSection
          faqTitle={homepageContent.faqTitle}
          faqs={homepageContent.faqs}
        />

        {/* ========== SECTION 7 - Final CTA ========== */}
        <FinalCTASection
          finalCtaTitle={homepageContent.finalCtaTitle}
          finalCtaDescription={homepageContent.finalCtaDescription}
          finalCtaButton={homepageContent.finalCtaButton}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Performance Tracking */}
      <PerformanceTracker />
    </>
  );
}
