import { Heading, Text } from '@/components/typography';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import Link from 'next/link';

export default function CaseStudiesNotFound() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="min-h-screen bg-black flex items-center justify-center px-6"
      >
        <div className="max-w-2xl mx-auto text-center">
          <Heading
            level={1}
            variant="gradient"
            className="text-6xl md:text-8xl mb-6"
          >
            404
          </Heading>
          <Heading
            level={2}
            variant="default"
            className="text-white text-2xl md:text-3xl mb-4"
          >
            Case Studies Not Found
          </Heading>
          <Text
            variant="body"
            className="text-white/70 mb-8 max-w-md mx-auto"
          >
            The case studies page you&apos;re looking for doesn&apos;t exist or has been moved.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 text-center"
            >
              Go Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
