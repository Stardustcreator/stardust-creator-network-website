import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';
import CreatorApplicationForm from '@/components/forms/CreatorApplicationForm/CreatorApplicationForm';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

// Page-specific SEO metadata for Nigeria
export const metadata: Metadata = generateMetaTags({
  title: 'Apply as Nigerian Creator | Stardust Creator Network',
  description:
    "Apply as a Nigerian creator and join Nigeria's leading influencer network. Connect with top brands, access exclusive campaigns, and grow your creator career with verified opportunities in Nigeria.",
  url: '/join/creator/nigeria',
});

export default function NigeriaCreatorApplicationPage() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Application Form */}
      <main className="min-h-screen bg-black">
        <CreatorApplicationForm country="Nigeria" />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
