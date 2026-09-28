import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import CreatorOsHero from '@/components/sections/creator-os/CreatorOsHero';
import CreatorOsInfrastructure from '@/components/sections/creator-os/CreatorOsInfrastructure';
import CreatorOsCommunity from '@/components/sections/creator-os/CreatorOsCommunity';
import CreatorOsFinalCta from '@/components/sections/creator-os/CreatorOsFinalCta';

// Content editors change this in the admin CMS - fetched here rather than
// hardcoded in the section components themselves. Falls back to each
// section's own defaults (which match what shipped before this existed) on
// any failure, so a backend outage or missing env var never breaks the page
// - same resilience pattern as src/app/page.tsx's getHomepageHeroContent().
const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

interface CreatorOsContent {
  heroTitle?: string;
  heroSubtitle?: string;
  heroButton?: string;
  finalCtaTitle?: string;
}

async function getCreatorOsContent(): Promise<CreatorOsContent> {
  if (!API_URL) return {};

  try {
    const res = await fetch(`${API_URL}/cms/pages/creator-os`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return {};

    const data = await res.json();
    const content = data?.content ?? {};
    return {
      heroTitle: typeof content.heroTitle === 'string' ? content.heroTitle : undefined,
      heroSubtitle: typeof content.heroSubtitle === 'string' ? content.heroSubtitle : undefined,
      heroButton: typeof content.heroButton === 'string' ? content.heroButton : undefined,
      finalCtaTitle: typeof content.finalCtaTitle === 'string' ? content.finalCtaTitle : undefined,
    };
  } catch {
    return {};
  }
}

export default async function CreatorOSPage() {
  const content = await getCreatorOsContent();

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <CreatorOsHero
          title={content.heroTitle}
          subtitle={content.heroSubtitle}
          buttonText={content.heroButton}
        />

        {/* Infrastructure Section - Cards (hardcoded, see CreatorOsInfrastructure.tsx) */}
        <CreatorOsInfrastructure />

        {/* Join Community Section (hardcoded, no matching CMS key) */}
        <CreatorOsCommunity />

        {/* Final CTA Section */}
        <CreatorOsFinalCta title={content.finalCtaTitle} />
      </main>
      <Footer />
    </>
  );
}
