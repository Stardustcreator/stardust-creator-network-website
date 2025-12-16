import Link from 'next/link';
import Image from 'next/image';
import { Heading, Text } from '@/components/typography';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <Image
              src="/404.svg"
              alt="404"
              width={400}
              height={200}
              className="w-full max-w-[300px] sm:max-w-[400px] h-auto"
              priority
            />
          </div>
          <Heading
            level={2}
            variant="default"
            className="text-white text-2xl md:text-3xl mb-4"
          >
            Page Not Found
          </Heading>
          <Text
            variant="body"
            className="text-white/70 mb-8 max-w-md mx-auto"
          >
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get
            you back on track.
          </Text>
          <div className="flex flex-col items-center gap-8">
            <Link
              href="/"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              Go Home
            </Link>
            <div className="pt-4 border-t border-white/10 w-full max-w-md">
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
                <Link
                  href="/case-studies"
                  className="text-white hover:text-purple-300 transition-colors whitespace-nowrap"
                >
                  Case Studies
                </Link>
                <span className="text-white/40">•</span>
                <Link
                  href="/blog"
                  className="text-white hover:text-purple-300 transition-colors whitespace-nowrap"
                >
                  Visit Blog
                </Link>
                <span className="text-white/40">•</span>
                <Link
                  href="/brands/brief"
                  className="text-white hover:text-purple-300 transition-colors whitespace-nowrap"
                >
                  Contact / Brand Brief
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
