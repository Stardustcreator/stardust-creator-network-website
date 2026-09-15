import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import WhoWeAreContent from '@/components/sections/WhoWeAre/WhoWeAreContent';

// Content editors change this in the admin CMS - fetched here rather than
// hardcoded in WhoWeAreContent itself. Falls back to WhoWeAreContent's own
// defaults (which match what shipped before this existed) on any failure, so
// a backend outage or missing env var never breaks the page - same
// resilience pattern as src/app/page.tsx's getHomepageHeroContent().
const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

interface WhoWeArePageContent {
  heroTitle?: string;
  heroSubtitle?: string;
  aboutContent?: string;
  problemContent?: string;
  buildingContent?: string;
  finalCtaTitle?: string;
  finalCtaDescription?: string;
}

async function getWhoWeAreContent(): Promise<WhoWeArePageContent> {
  if (!API_URL) return {};

  try {
    const res = await fetch(`${API_URL}/cms/pages/who-we-are`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return {};

    const data = await res.json();
    const content = data?.content ?? {};
    return {
      heroTitle: typeof content.heroTitle === 'string' ? content.heroTitle : undefined,
      heroSubtitle: typeof content.heroSubtitle === 'string' ? content.heroSubtitle : undefined,
      aboutContent: typeof content.aboutContent === 'string' ? content.aboutContent : undefined,
      problemContent:
        typeof content.problemContent === 'string' ? content.problemContent : undefined,
      buildingContent:
        typeof content.buildingContent === 'string' ? content.buildingContent : undefined,
      finalCtaTitle: typeof content.finalCtaTitle === 'string' ? content.finalCtaTitle : undefined,
      finalCtaDescription:
        typeof content.finalCtaDescription === 'string' ? content.finalCtaDescription : undefined,
    };
  } catch {
    return {};
  }
}

export default async function WhoWeArePage() {
  const content = await getWhoWeAreContent();

  return (
    <>
      <Header />
      <main id="main-content">
        <WhoWeAreContent
          heroTitle={content.heroTitle}
          heroSubtitle={content.heroSubtitle}
          aboutContent={content.aboutContent}
          problemContent={content.problemContent}
          buildingContent={content.buildingContent}
          finalCtaTitle={content.finalCtaTitle}
          finalCtaDescription={content.finalCtaDescription}
        />
      </main>
      <Footer />
    </>
  );
}
