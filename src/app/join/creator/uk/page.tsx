import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';
import CreatorApplicationForm from '@/components/forms/CreatorApplicationForm/CreatorApplicationForm';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

// Page-specific SEO metadata for UK
export const metadata: Metadata = generateMetaTags({
  title: 'Join as a Creator - UK | Stardust Creator Network',
  description:
    "Join the UK's leading creator network. Connect with top brands, learn new skills, and access creator tools designed to help you earn smarter. Apply now to become a verified Stardust creator.",
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
