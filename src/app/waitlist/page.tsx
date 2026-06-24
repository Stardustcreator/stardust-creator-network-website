import type { Metadata } from 'next';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import WaitlistHero from '@/components/sections/Waitlist/WaitlistHero';
import WaitlistBenefits from '@/components/sections/Waitlist/WaitlistBenefits';
import WaitlistFormSection from '@/components/sections/Waitlist/WaitlistFormSection';

export const metadata: Metadata = {
  title: 'Join The Waitlist | Stardust Creator Network',
  description:
    'Turn your content into a structured business. Join the waitlist for early access to brand opportunities, creator tools, and a community of serious creators.',
  openGraph: {
    title: 'Join The Waitlist | Stardust Creator Network',
    description:
      'Turn your content into a structured business. Join the waitlist for early access to brand opportunities, creator tools, and a community of serious creators.',
    type: 'website',
  },
};

export default function WaitlistPage() {
  return (
    <>
      <Header />
      <main className="relative bg-white">
        <WaitlistHero />
        <WaitlistBenefits />
        <WaitlistFormSection />
      </main>
      <Footer />
    </>
  );
}
