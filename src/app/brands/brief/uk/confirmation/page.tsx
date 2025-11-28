import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import ThankYouStep from '@/components/forms/BrandBriefForm/steps/ThankYouStep';
import ConversionTracker from '@/components/analytics/ConversionTracker';

export const metadata: Metadata = generateMetaTags({
  title: 'UK Brand Campaign Submission Confirmation | Stardust Creator Network',
  description:
    'Your brand campaign brief for the UK has been successfully submitted. Our partnerships team will review your request and contact you within 72 hours to match you with the perfect UK influencers.',
  url: '/brands/brief/uk/confirmation',
});

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
