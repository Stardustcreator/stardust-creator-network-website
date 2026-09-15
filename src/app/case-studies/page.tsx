import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import CaseStudiesContent, {
  type CaseStudyStat,
} from '@/components/case-studies/CaseStudiesContent';

// Page-specific SEO metadata
export const metadata: Metadata = generateMetaTags({
  title: 'Case Studies – Stardust Creator Network',
  description:
    'Explore successful creator-brand partnerships and campaign results from Stardust Creator Network. See how we connect brands with creators to drive authentic engagement and conversions.',
  image: '/who we are/creators.webp',
  url: '/case-studies',
});

// Content editors change this in the admin CMS - fetched here rather than
// hardcoded in CaseStudiesContent itself. Falls back to CaseStudiesContent's
// own defaults (which match what shipped before this existed) on any
// failure, so a backend outage or missing env var never breaks the page -
// same resilience pattern as src/app/page.tsx's getHomepageHeroContent().
//
// The individual case-study cards (`caseStudies` CMS key) are deliberately
// NOT wired here - the CMS array's metric keys (roi, cpa, roas, impression,
// completion) don't match the site's CaseStudyMetrics type (engagementRate,
// costPerAcquisition, returnOnAdSpend, impressionShare, completionRate), and
// the CMS items carry no `id`/`logo`/`images`, which CaseStudyCard and the
// /case-studies/[slug] detail route both depend on. Wiring it would break
// card rendering and detail-page links, so those cards stay sourced from
// src/lib/data/case-studies.data.ts.
const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

interface CaseStudiesPageContent {
  heroTitle?: string;
  heroDescription?: string;
  stats?: CaseStudyStat[];
  finalCtaTitle?: string;
}

function parseStats(value: unknown): CaseStudyStat[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const stats: CaseStudyStat[] = [];
  for (const item of value) {
    if (
      item &&
      typeof item === 'object' &&
      typeof (item as { label?: unknown }).label === 'string' &&
      typeof (item as { value?: unknown }).value === 'string'
    ) {
      stats.push({
        label: (item as { label: string }).label,
        value: (item as { value: string }).value,
      });
    } else {
      // One malformed entry means we can't trust the shape of the whole
      // array - fall back to CaseStudiesContent's hardcoded defaults rather
      // than rendering a partial/broken stats row.
      return undefined;
    }
  }
  return stats;
}

async function getCaseStudiesContent(): Promise<CaseStudiesPageContent> {
  if (!API_URL) return {};

  try {
    const res = await fetch(`${API_URL}/cms/pages/case-studies`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return {};

    const data = await res.json();
    const content = data?.content ?? {};
    return {
      heroTitle: typeof content.heroTitle === 'string' ? content.heroTitle : undefined,
      heroDescription:
        typeof content.heroDescription === 'string' ? content.heroDescription : undefined,
      stats: parseStats(content.stats),
      finalCtaTitle: typeof content.finalCtaTitle === 'string' ? content.finalCtaTitle : undefined,
    };
  } catch {
    return {};
  }
}

export default async function CaseStudiesPage() {
  const content = await getCaseStudiesContent();

  return (
    <>
      <Header variant="fixed" />
      <main
        id="main-content"
        className="min-h-screen bg-black"
      >
        <CaseStudiesContent
          heroTitle={content.heroTitle}
          heroDescription={content.heroDescription}
          stats={content.stats}
          finalCtaTitle={content.finalCtaTitle}
        />
      </main>
      <Footer />
    </>
  );
}
