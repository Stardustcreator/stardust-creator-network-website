import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import ForgotPasswordFlow from '@/components/forgot-password/ForgotPasswordFlow';
import BackArrowIcon from '@/components/icons/BackArrowIcon';
import { generateMetaTags } from '@/lib/seo';

export const metadata: Metadata = generateMetaTags({
  title: 'Forgot Password – Stardust Creator Network',
  description: 'Reset your Stardust Creator Network account password.',
  url: '/forgot-password',
});

export default function ForgotPasswordPage() {
  return (
    <>
      <Header variant="light" />

      <main
        id="main-content"
        className="bg-white pt-41 pb-36"
      >
        <div className="w-full container mx-auto px-6">
          <div className="mb-12">
            <Link
              href="/signin"
              className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-800 transition-colors"
            >
              <BackArrowIcon />
              Back to Sign In
            </Link>
          </div>

          <ForgotPasswordFlow />
        </div>
      </main>

      <Footer />
    </>
  );
}
