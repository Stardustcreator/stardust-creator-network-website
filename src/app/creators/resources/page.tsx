import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

export const metadata: Metadata = generateMetaTags({
  title: 'Creator Resources | Stardust Creator Network',
  description:
    'Access valuable resources, guides, and tools for creators to grow their skills, monetize their content, and build successful digital careers.',
  url: '/creators/resources',
});

import CreatorResourcesContent from '@/components/creators/CreatorResourcesContent';

export default function CreatorResourcesPage() {
  return (
    <>
      <Header />
      <CreatorResourcesContent />
      <Footer />
    </>
  );
}
