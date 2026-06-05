import type { Metadata } from 'next';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import SignInForm from '@/components/signin/SignInForm';
import RedirectAuthenticatedUser from '@/components/auth/RedirectAuthenticatedUser';
import { generateMetaTags } from '@/lib/seo';

export const metadata: Metadata = generateMetaTags({
  title: 'Sign In – Stardust Creator Network',
  description: 'Sign in to your Stardust Creator Network account.',
  url: '/signin',
});

export default function SignInPage() {
  return (
    <>
      <Header variant="light" />

      <main
        id="main-content"
        className="bg-white pt-41 pb-36"
      >
        <RedirectAuthenticatedUser
          inactiveRedirect="/onboarding/reactivate"
          noSubscriptionRedirect="/onboarding"
        >
          <div className="w-full container mx-auto px-6">
            <SignInForm />
          </div>
        </RedirectAuthenticatedUser>
      </main>

      <Footer />
    </>
  );
}
