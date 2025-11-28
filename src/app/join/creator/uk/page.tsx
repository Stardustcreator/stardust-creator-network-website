import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';
import CreatorApplicationForm from '@/components/forms/CreatorApplicationForm/CreatorApplicationForm';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

// Page-specific SEO metadata for UK
export const metadata: Metadata = generateMetaTags({
  title: 'Apply as UK Creator | Stardust Creator Network',
  description:
    "Apply as a UK creator and join the United Kingdom's leading influencer network. Connect with top brands, access exclusive campaigns, and grow your creator career with verified opportunities in the UK.",
  url: '/join/creator/uk',
});

export default function UKCreatorApplicationPage() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Application Form */}
      <main className="min-h-screen bg-black">
        <CreatorApplicationForm country="United Kingdom" />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
