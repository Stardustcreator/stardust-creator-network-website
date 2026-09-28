import FindCreatorsContent, { type ProcessStep } from './FindCreatorsContent';

// Content editors change this in the admin CMS - fetched here rather than
// hardcoded in FindCreatorsContent itself. Falls back to FindCreatorsContent's
// own defaults (which match what shipped before this existed) on any
// failure, so a backend outage or missing env var never breaks the page -
// same resilience pattern as src/app/page.tsx's getHomepageHeroContent().
const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

interface FindCreatorsPageContent {
  heroTitle?: string;
  heroSubtitle?: string;
  processSteps?: ProcessStep[];
  finalCtaTitle?: string;
}

function isValidProcessSteps(value: unknown): value is ProcessStep[] {
  return (
    Array.isArray(value) &&
    value.every(
      item =>
        item &&
        typeof item === 'object' &&
        typeof (item as ProcessStep).number === 'string' &&
        typeof (item as ProcessStep).title === 'string' &&
        typeof (item as ProcessStep).description === 'string'
    )
  );
}

async function getFindCreatorsContent(): Promise<FindCreatorsPageContent> {
  if (!API_URL) return {};

  try {
    const res = await fetch(`${API_URL}/cms/pages/find-creators`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return {};

    const data = await res.json();
    const content = data?.content ?? {};
    return {
      heroTitle: typeof content.heroTitle === 'string' ? content.heroTitle : undefined,
      heroSubtitle: typeof content.heroSubtitle === 'string' ? content.heroSubtitle : undefined,
      processSteps: isValidProcessSteps(content.processSteps) ? content.processSteps : undefined,
      finalCtaTitle: typeof content.finalCtaTitle === 'string' ? content.finalCtaTitle : undefined,
    };
  } catch {
    return {};
  }
}

export default async function FindCreatorsPage() {
  const content = await getFindCreatorsContent();

  return (
    <FindCreatorsContent
      heroTitle={content.heroTitle}
      heroSubtitle={content.heroSubtitle}
      processSteps={content.processSteps}
      finalCtaTitle={content.finalCtaTitle}
    />
  );
}
