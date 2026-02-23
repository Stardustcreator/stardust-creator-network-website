import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';

export const metadata: Metadata = generateMetaTags({
  title: 'Creator Success Stories | Stardust Creator Network',
  description:
    'Inspiring success stories from creators who have thrived through brand partnerships and leveraged our platform to grow their careers.',
  url: '/creators/stories',
});

import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

export default function CreatorStoriesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-purple-900 text-white flex items-center justify-center">
        <div className="max-w-2xl text-center p-6">
          <div className="mx-auto w-28 h-28 rounded-full bg-gradient-to-br from-purple-700 to-pink-500 flex items-center justify-center mb-6">
            <div className="text-4xl">📖</div>
          </div>
          <Heading
            level={1}
            className="text-white text-3xl mb-4"
          >
            Stories — Coming Soon
          </Heading>
          <Text
            variant="large"
            className="text-white opacity-80 mb-4"
          >
            We’re collecting creator success stories to showcase here. Expect inspiring case studies
            soon.
          </Text>
          <Text
            variant="body"
            className="text-white opacity-60 text-sm"
          >
            Explore our{' '}
            <a
              href="/case-studies"
              className="text-purple-300 underline"
            >
              case studies
            </a>{' '}
            for published stories now.
          </Text>
        </div>
      </main>
      <Footer />
    </>
  );
}
