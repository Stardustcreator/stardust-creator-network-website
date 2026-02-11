import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import CreatorOpportunitiesContent from '@/components/creators/CreatorOpportunitiesContent';

export const metadata: Metadata = generateMetaTags({
  title: 'Creator Opportunities | Stardust Creator Network',
  description:
    'Discover exclusive brand partnerships, collaboration opportunities, and career-defining projects for creators. Stay ahead of the curve with our curated opportunities.',
  url: '/creators/opportunities',
});

export default function CreatorOpportunitiesPage() {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-black via-neutral-900 to-purple-900 text-white min-h-screen flex flex-col">
        <CreatorOpportunitiesContent />
      </main>
      <Footer />
    </>
  );
}
