import type { Metadata } from 'next';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import { Heading, Text } from '@/components/typography';
import { generateMetaTags, generateStructuredData } from '@/lib/seo';
import TermsOfServiceContent from '@/components/legal/TermsOfServiceContent';
import TermsOfServiceNigeria from '@/components/legal/TermsOfServiceNigeria';
import TermsOfServiceUK from '@/components/legal/TermsOfServiceUK';

export const metadata: Metadata = generateMetaTags({
  title: 'Terms of Service – Stardust Creator Network',
  description:
    'Read the Terms of Service for Stardust Creator Network. Learn about platform rules, user rights, content ownership, and guidelines for creators and brands.',
  url: '/legal/terms',
});

export default function TermsOfServicePage() {
  const breadcrumbData = generateStructuredData.breadcrumb([
    { name: 'Home', url: '/' },
    { name: 'Terms of Service', url: '/legal/terms' },
  ]);

  return (
    <>
      {/* Breadcrumb Structured Data - Deferred, non-blocking */}
      <script
        type="application/ld+json"
        defer
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
      <Header />
      <main className="min-h-screen bg-black">
        {/* Header Message Section */}
        <section className="bg-gradient-to-br from-purple-900/20 via-black to-black border-b border-white/10 py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <Heading
              level={1}
              variant="gradient"
              className="text-center mb-6 animate-[fadeInUp_0.8s_ease-out]"
            >
              Terms of Service – Your Rights and Responsibilities on Stardust Creator Network
            </Heading>
            <Text
              variant="body"
              color="white"
              className="text-center text-white/80 max-w-2xl mx-auto leading-relaxed"
            >
              Understand the rules, rights, and responsibilities that govern your use of our
              platform. These terms ensure a safe and collaborative environment for all users.
            </Text>
          </div>
        </section>

        {/* Terms of Service Content */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <TermsOfServiceContent
              nigeriaContent={<TermsOfServiceNigeria />}
              ukContent={<TermsOfServiceUK />}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
