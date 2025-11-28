import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import ThankYouStep from '@/components/forms/CreatorApplicationForm/steps/ThankYouStep';
import ConversionTracker from '@/components/analytics/ConversionTracker';

export const metadata: Metadata = generateMetaTags({
  title: 'Nigeria Creator Application Confirmation | Stardust Creator Network',
  description:
    'Your application to join Stardust Creator Network as a Nigerian creator has been successfully submitted. Our team will review your application and contact you soon with next steps.',
  url: '/join/creator/nigeria/confirmation',
});

export default function NigeriaCreatorConfirmationPage() {
  return (
    <>
      <ConversionTracker
        event="creator_application_completed"
        country="Nigeria"
        properties={{
          page: 'confirmation',
          location: 'Nigeria',
          source: 'stardust_creator_network',
        }}
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black">
        <div className="container mx-auto px-4 py-16">
          <ThankYouStep country="Nigeria" />
        </div>
      </main>
      <Footer />
    </>
  );
}
