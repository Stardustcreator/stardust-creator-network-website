import type { Metadata } from 'next';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import ReactivateContent from '@/components/onboarding/ReactivateContent';

export const metadata: Metadata = {
  title: 'Reactivate Membership – Stardust Creator Network',
  robots: { index: false },
};

export default function ReactivatePage() {
  return (
    <>
      <Header variant="light" />
      <main
        id="main-content"
        className="bg-white pt-41 pb-36 flex items-center justify-center"
      >
        <div className="w-full container mx-auto px-6">
          <ReactivateContent />
        </div>
      </main>
      <Footer />
    </>
  );
}
