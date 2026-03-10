import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';
import CreatorJoinClient from './CreatorJoinClient';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

export const metadata: Metadata = generateMetaTags({
  title: 'Join Stardust Creator Network | Apply as a Creator',
  description:
    'Join our community of creators and unlock exclusive opportunities. Select your location to access the most relevant application form.',
  url: '/creators/join',
});

export default function CreatorJoinPage() {
  // Server-side rendered H1 for SEO
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black">
        {/* SEO-visible H1 heading */}
        <div className="sr-only">
          <h1>Join Stardust Creator Network</h1>
        </div>
        <CreatorJoinClient />
      </main>
      <Footer />
    </>
  );
}
