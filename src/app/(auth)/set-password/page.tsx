import type { Metadata } from 'next';
import { Suspense } from 'react';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import SetPasswordFlow from '@/components/set-password/SetPasswordFlow';

// The URL carries a one-time invite token, so keep it out of search indexes.
export const metadata: Metadata = {
  title: 'Set your password – Stardust Creator Network',
  robots: { index: false, follow: false },
};

export default function SetPasswordPage() {
  return (
    <>
      <Header variant="light" />

      <main
        id="main-content"
        className="bg-white pt-41 pb-36"
      >
        <div className="w-full container mx-auto px-6">
          <Suspense fallback={null}>
            <SetPasswordFlow />
          </Suspense>
        </div>
      </main>

      <Footer />
    </>
  );
}
