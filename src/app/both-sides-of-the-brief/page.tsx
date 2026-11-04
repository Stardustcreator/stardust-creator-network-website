import type { Metadata } from 'next';
import Header from '@/components/layout/Header/Header';
import InsightReportHero from '@/components/sections/InsightReport/InsightReportHero';
import InsightReportDiscover from '@/components/sections/InsightReport/InsightReportDiscover';
import InsightReportBanner from '@/components/sections/InsightReport/InsightReportBanner';

const TITLE = 'Both Sides of the Brief | Stardust Creator Network';
const DESCRIPTION =
  'Practical perspectives from brands, creators and agencies on what makes creator partnerships work, and where expectations often differ. Get the free report.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/both-sides-of-the-brief' },
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website' },
};

export default function BothSidesOfTheBriefPage() {
  return (
    <>
      <Header variant="light" />
      <main
        id="main-content"
        className="bg-[#fdfbff] pt-24"
      >
        <InsightReportHero />
        <InsightReportDiscover />
        <InsightReportBanner />
      </main>
    </>
  );
}
