import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';
import CreatorApplicationForm from '@/components/forms/CreatorApplicationForm/CreatorApplicationForm';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

// Page-specific SEO metadata for Nigeria
export const metadata: Metadata = generateMetaTags({
  title: 'Join as a Creator - Nigeria | Stardust Creator Network',
  description:
    "Join Nigeria's leading creator network. Connect with top brands, learn new skills, and access creator tools designed to help you earn smarter. Apply now to become a verified Stardust creator.",
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
