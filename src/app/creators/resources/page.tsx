import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
export const metadata: Metadata = generateMetaTags({
  title: 'Creator Resources | Stardust Creator Network',
  description:
    'Access valuable resources, guides, and tools for creators to grow their skills, monetize their content, and build successful digital careers.',
  url: '/creators/resources',
});

export default function CreatorResourcesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-purple-900 text-white flex items-center justify-center">
        <div className="max-w-2xl text-center p-6">
          <div className="mx-auto w-28 h-28 rounded-full bg-gradient-to-br from-purple-700 to-pink-500 flex items-center justify-center mb-6">
            <div className="text-4xl">🔧</div>
          </div>
          <Heading
            level={1}
            className="text-white text-3xl mb-4"
          >
            Resources — Coming Soon
          </Heading>
          <Text
            variant="large"
            className="text-white opacity-80 mb-4"
          >
            We're preparing guides, tools, and templates to help creators grow. We'll publish
            resources shortly.
          </Text>
          <Text
            variant="body"
            className="text-white opacity-60 text-sm"
          >
            Want to be notified? Visit our{' '}
            <a
              href="/creators/join"
              className="text-purple-300 underline"
            >
              creator page
            </a>{' '}
            to stay updated.
          </Text>
        </div>
      </main>
      <Footer />
    </>
  );
}
