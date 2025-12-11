import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import CaseStudyDetail from '@/components/case-studies/CaseStudyDetail';
import { caseStudies } from '@/lib/data/case-studies.data';

interface CaseStudyPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return caseStudies.map(caseStudy => ({
    slug: caseStudy.id,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = caseStudies.find(cs => cs.id === slug);

  if (!caseStudy) {
    return generateMetaTags({
      title: 'Case Study Not Found – Stardust Creator Network',
      description: 'The case study you are looking for does not exist.',
      url: `/case-studies/${slug}`,
    });
  }

  return generateMetaTags({
    title: `${caseStudy.title} – Stardust Creator Network`,
    description:
      caseStudy.excerpt || 'Explore successful creator-brand partnerships and campaign results.',
    image: caseStudy.images[0] || '/who we are/creators.webp',
    url: `/case-studies/${slug}`,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;

  return (
    <>
      <Header />
      <main
        id="main-content"
        className="min-h-screen bg-black"
      >
        <CaseStudyDetail slug={slug} />
      </main>
      <Footer />
    </>
  );
}
