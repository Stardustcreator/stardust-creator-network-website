import { Metadata } from 'next';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import ThankYouStep from '@/components/forms/BrandBriefForm/steps/ThankYouStep';
import ConversionTracker from '@/components/analytics/ConversionTracker';

export const metadata: Metadata = {
  title: 'Brief Submitted - Stardust Creator Network UK',
  description:
    'Thank you for submitting your brand brief to Stardust Creator Network UK. Our partnerships team will contact you within 72 hours.',
  openGraph: {
    title: 'Brief Submitted - Stardust Creator Network UK',
    description: 'Thank you for submitting your brand brief to Stardust Creator Network UK.',
    type: 'website',
  },
};

export default function UKBrandBriefConfirmationPage() {
  return (
    <>
      <ConversionTracker
        event="brand_brief_completed"
        country="United Kingdom"
        properties={{
          page: 'confirmation',
          location: 'United Kingdom',
          source: 'stardust_creator_network',
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
