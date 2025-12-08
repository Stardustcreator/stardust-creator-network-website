import type { Metadata } from 'next';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import { Heading, Text } from '@/components/typography';
import { generateMetaTags, generateStructuredData } from '@/lib/seo';
import PrivacyPolicyContent from '@/components/legal/PrivacyPolicyContent';
import PrivacyPolicyNigeria from '@/components/legal/PrivacyPolicyNigeria';
import PrivacyPolicyUK from '@/components/legal/PrivacyPolicyUK';

export const metadata: Metadata = generateMetaTags({
  title: 'Privacy Policy – Stardust Creator Network',
  description:
    'Learn how Stardust Creator Network protects your personal information. We collect minimal data to improve your experience and ensure secure collaboration between creators and brands.',
  url: '/legal/privacy',
});

export default function PrivacyPolicyPage() {
  const breadcrumbData = generateStructuredData.breadcrumb([
    { name: 'Home', url: '/' },
    { name: 'Privacy Policy', url: '/legal/privacy' },
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
              Your Privacy Matters – How Stardust Creator Network Protects Your Information
            </Heading>
            <Text
              variant="body"
              color="white"
              className="text-center text-white/80 max-w-2xl mx-auto leading-relaxed"
            >
              We are committed to transparency and protecting your personal data. This policy
              explains how we collect, use, and safeguard your information.
            </Text>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <PrivacyPolicyContent
              nigeriaContent={<PrivacyPolicyNigeria />}
              ukContent={<PrivacyPolicyUK />}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
