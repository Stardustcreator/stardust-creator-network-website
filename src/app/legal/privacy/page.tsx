import type { Metadata } from 'next';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import { Heading, Text } from '@/components/typography';
import { generateMetaTags, generateStructuredData } from '@/lib/seo';
import PrivacyPolicyContent from '@/components/legal/PrivacyPolicyContent';
import PrivacyPolicyNigeria from '@/components/legal/PrivacyPolicyNigeria';
import PrivacyPolicyUK from '@/components/legal/PrivacyPolicyUK';
import PrivacyPolicySidebar from '@/components/legal/PrivacyPolicySidebar';

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
        {/* Title Section */}
        <section className="bg-gradient-to-br from-purple-900/20 via-black to-black border-b border-white/10 py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <div className="max-w-4xl">
              <Heading
                level={1}
                variant="gradient"
                className="mb-3 md:mb-4 text-3xl sm:text-4xl md:text-5xl leading-tight"
              >
                Privacy{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Policy
                </span>
              </Heading>
              <Text
                variant="body"
                color="white"
                className="text-white/80 text-base sm:text-lg leading-relaxed"
              >
                Thanks for using Stardust Creator Network! Our Privacy Policy details how we handle
                your info. By using Stardust Creator Network, you agree to these practices.
              </Text>
            </div>
          </div>
        </section>

        {/* Privacy Policy Content with Sidebar */}
        <section className="py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
              {/* Left Sidebar Navigation - Hidden on mobile, shown in content area */}
              <aside className="lg:col-span-1">
                <PrivacyPolicySidebar />
              </aside>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <PrivacyPolicyContent
                  nigeriaContent={<PrivacyPolicyNigeria />}
                  ukContent={<PrivacyPolicyUK />}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
