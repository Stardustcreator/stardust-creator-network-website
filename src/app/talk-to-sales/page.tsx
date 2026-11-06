import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import TalkToSalesContent from '@/components/talk-to-sales/TalkToSalesContent';

// Talk to Sales booking page (Figma: SCN › Talk to Sales).
// Linked from the pricing page. Booking runs through an embedded Calendly widget.
export const metadata: Metadata = {
  ...generateMetaTags({
    title: 'Talk to Sales | Stardust Creator Network',
    description:
      'Book a 30-minute call with the Stardust team. We will help you choose the right creator retainer or campaign and get your brand set up to work with creators.',
    url: '/talk-to-sales',
    tags: ['talk to sales', 'creator marketing', 'influencer marketing', 'brands'],
  }),
  title: { absolute: 'Talk to Sales | Stardust Creator Network' },
};

export default function TalkToSalesPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <TalkToSalesContent />
      </main>
      <Footer />
    </>
  );
}
