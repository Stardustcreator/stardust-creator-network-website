import { Metadata } from 'next';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import ThankYouStep from '@/components/forms/CreatorApplicationForm/steps/ThankYouStep';
import ConversionTracker from '@/components/analytics/ConversionTracker';

export const metadata: Metadata = {
  title: 'Application Submitted - Stardust Creator Network UK',
  description: 'Thank you for applying to join the Stardust Creator Network in the United Kingdom. Your application has been successfully submitted.',
  openGraph: {
    title: 'Application Submitted - Stardust Creator Network UK',
    description: 'Thank you for applying to join the Stardust Creator Network in the UK.',
    type: 'website',
  },
};

export default function UKCreatorConfirmationPage() {
  return (
    <>
      <ConversionTracker 
        event="creator_application_completed"
        country="United Kingdom"
        properties={{
          page: 'confirmation',
          location: 'United Kingdom',
          source: 'stardust_creator_network'
        }}
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black">
        <div className="container mx-auto px-4 py-16">
          <ThankYouStep country="United Kingdom" />
        </div>
      </main>
      <Footer />
    </>
  );
}
