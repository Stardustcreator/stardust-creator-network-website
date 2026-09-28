import type { Metadata } from 'next';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import { Heading, Text } from '@/components/typography';
import { generateMetaTags, generateStructuredData } from '@/lib/seo';
import TermsOfServiceContent from '@/components/legal/TermsOfServiceContent';
import TermsOfServiceNigeria from '@/components/legal/TermsOfServiceNigeria';
import TermsOfServiceUK from '@/components/legal/TermsOfServiceUK';
import TermsOfServiceSidebar from '@/components/legal/TermsOfServiceSidebar';

// Content editors change this in the admin CMS - fetched here rather than
// hardcoded in TermsOfServiceNigeria itself. Falls back to that component's
// own default (which matches what shipped before this existed) on any
// failure, so a backend outage or missing env var never breaks the page -
// same resilience pattern as src/app/page.tsx's getHomepageHeroContent().
// The CMS's "terms-conditions" slug is independent of this route's actual
// /legal/terms path. Note: this only covers the Nigeria/fallback variant -
// TermsOfServiceUK stays fully hardcoded since the CMS has no UK-specific
// content for this page.
const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

interface TermsContent {
  fullContent?: string;
}

async function getTermsContent(): Promise<TermsContent> {
  if (!API_URL) return {};

  try {
    const res = await fetch(`${API_URL}/cms/pages/terms-conditions`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return {};

    const data = await res.json();
    const content = data?.content ?? {};
    return {
      fullContent: typeof content.fullContent === 'string' ? content.fullContent : undefined,
    };
  } catch {
    return {};
  }
}

export default async function TermsOfServicePage() {
  const breadcrumbData = generateStructuredData.breadcrumb([
    { name: 'Home', url: '/' },
    { name: 'Terms of Service', url: '/legal/terms' },
  ]);
  const termsContent = await getTermsContent();

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
      <main
        id="main-content"
        className="min-h-screen bg-black"
      >
        {/* Title Section */}
        <section className="bg-gradient-to-br from-purple-900/20 via-black to-black border-b border-white/10 pt-32 md:pt-40 lg:pt-48 pb-8 md:pb-12 lg:pb-16">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <div className="max-w-4xl">
              <Heading
                level={1}
                variant="gradient"
                className="mb-3 md:mb-4 text-3xl sm:text-4xl md:text-5xl leading-tight"
              >
                Terms of{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Service
                </span>
              </Heading>
              <Text
                variant="body"
                color="white"
                className="text-white/80 text-base sm:text-lg leading-relaxed"
              >
                Thanks for using Stardust Creator Network! These Terms of Service outline the rules
                and guidelines for using our platform. By using Stardust Creator Network, you agree
                to these terms.
              </Text>
            </div>
          </div>
        </section>

        {/* Terms of Service Content with Sidebar */}
        <section className="py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
              {/* Left Sidebar Navigation - Hidden on mobile, shown in content area */}
              <aside className="lg:col-span-1">
                <TermsOfServiceSidebar />
              </aside>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <TermsOfServiceContent
                  nigeriaContent={<TermsOfServiceNigeria fullContent={termsContent.fullContent} />}
                  ukContent={<TermsOfServiceUK />}
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
