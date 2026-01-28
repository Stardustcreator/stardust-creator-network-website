import Image from 'next/image';
import Link from 'next/link';
import { Heading, Text } from '@/components/typography';

export default function CreatorOsSection() {
  return (
    <section
      id="creator-os"
      className="py-32 bg-black"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <Heading
            level={2}
            variant="default"
            className="text-white mb-8"
          >
            The <span className="text-gradient-primary">Stardust CreatorOS</span>
            <br />
            <Text
              variant="large"
              className="text-white text-xl md:text-2xl lg:text-3xl"
              weight={600}
              as="span"
            >
              Coming 2026
            </Text>
          </Heading>

          {/* Visual Divider - Feature Preview Image */}
          <div className="group relative w-full my-16">
            {/* Animated Border Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 animate-gradient-x"></div>

            {/* Image Container */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 blur-3xl"></div>
              <div className="relative aspect-video w-full">
                <Image
                  src="/vlogger-explaining-features-studio-flash-light-modifier-sitting-desk-with-microphone-vlogging-studio-portrait-photography-equipment-reviewer-presenting-beauty-dish-honeycomb-grid.webp"
                  alt="Content creator reviewing engagement results after a successful brand partnership and monetization opportunity in the creator community"
                  fill
                  className="object-cover"
                  sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 90vw, (max-width: 1200px) 80vw, 1200px"
                  loading="lazy"
                  suppressHydrationWarning
                />
                {/* Purple Color Overlay */}
                <div className="absolute inset-0 bg-purple-600/30 mix-blend-multiply"></div>
              </div>
            </div>
          </div>

          {/* Main Copy */}
          <Text
            variant="large"
            className="text-white mb-12 max-w-4xl mx-auto opacity-90"
          >
            We&apos;re building Stardust CreatorOS, the operating system for modern creators. Create
            and sell digital products, courses, memberships, or event tickets. Manage campaigns,
            license your content, and automate payments all in one platform.
          </Text>

          <Text
            variant="body"
            className="text-white mb-12 max-w-3xl mx-auto opacity-75"
          >
            Help us shape it. Take our 2-minute survey and tell us what your dream creator workspace
            looks like.
          </Text>

          {/* Call-to-Action */}
          <div className="flex justify-center">
            <Link
              href="/creators/survey"
              className="group relative inline-flex items-center justify-center px-12 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-button rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
            >
              <span className="relative z-10">Take the 2-Minute Survey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
            </Link>
          </div>

          {/* Coming Soon Badge */}
          <div className="mt-12 inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse mr-3"></div>
            <Text
              variant="small"
              className="text-white opacity-75"
              weight={500}
              as="span"
            >
              In Development - Coming 2026
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}
