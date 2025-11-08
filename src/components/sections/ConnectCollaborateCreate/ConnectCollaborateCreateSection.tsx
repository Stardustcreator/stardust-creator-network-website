'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heading, Text } from '@/components/typography';

export default function ConnectCollaborateCreateSection() {
  return (
    <section
      id="who-we-are"
      className="relative py-32 bg-black overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <Heading
            level={2}
            variant="default"
            className="text-white mb-6"
          >
            Connect. <span className="text-gradient-primary">Collaborate.</span> Create.
          </Heading>
          <Text
            variant="large"
            color="white"
            className="max-w-4xl mx-auto opacity-90"
          >
            We connect leading brands with Nigeria and the UK&apos;s most dynamic creators — from
            nano storytellers to macro influencers — to craft authentic campaigns that convert. More
            countries coming soon.
          </Text>
        </div>

        {/* Split-Screen Layout */}
        <div className="grid lg:grid-cols-2 gap-0 max-w-7xl mx-auto">
          {/* For Brands - Left Side */}
          <div className="group relative h-[600px] lg:h-[700px] overflow-hidden rounded-t-3xl lg:rounded-r-none lg:rounded-l-3xl">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/who we are/brand.webp"
                alt="For Brands - Connect with creators"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/60 via-purple-700/50 to-purple-900/70 group-hover:from-purple-600/70 group-hover:via-purple-700/60 group-hover:to-purple-900/80 transition-all duration-500"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-8 lg:p-12">
              {/* Floating Stats Badge */}
              <div className="self-start animate-float">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 shadow-xl">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">500+</div>
                  <div className="text-sm text-white/80 font-medium">Brands Served</div>
                </div>
              </div>

              {/* Bottom Content */}
              <div className="space-y-6">
                <div>
                  <Heading
                    level={3}
                    variant="default"
                    className="!text-white mb-4 text-3xl lg:text-4xl font-bold"
                  >
                    For Brands
                  </Heading>
                  <Text
                    variant="body"
                    color="white"
                    className="text-lg opacity-95 max-w-md"
                  >
                    Tell us your goals — we&apos;ll curate creators who bring your vision to life.
                  </Text>
                </div>
                <Link
                  href="/brands"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-button rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
                >
                  Find Creators
                </Link>
              </div>
            </div>

            {/* Diagonal Divider Effect */}
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-white/20 to-transparent hidden lg:block"></div>
          </div>

          {/* For Creators - Right Side */}
          <div className="group relative h-[600px] lg:h-[700px] overflow-hidden rounded-b-3xl lg:rounded-l-none lg:rounded-r-3xl">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/who we are/creators.webp"
                alt="For Creators - Join our network"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/60 via-pink-700/50 to-purple-900/70 group-hover:from-pink-600/70 group-hover:via-pink-700/60 group-hover:to-purple-900/80 transition-all duration-500"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-8 lg:p-12">
              {/* Floating Stats Badge */}
              <div
                className="self-start lg:self-end animate-float"
                style={{ animationDelay: '1s' }}
              >
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 shadow-xl">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">10+</div>
                  <div className="text-sm text-white/80 font-medium">Years Experience</div>
                </div>
              </div>

              {/* Bottom Content */}
              <div className="space-y-6">
                <div>
                  <Heading
                    level={3}
                    variant="default"
                    className="!text-white mb-4 text-3xl lg:text-4xl font-bold"
                  >
                    For Creators
                  </Heading>
                  <Text
                    variant="body"
                    color="white"
                    className="text-lg opacity-95 max-w-md"
                  >
                    Join our verified network and start collaborating today.
                  </Text>
                </div>
                <Link
                  href="/creators"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-button rounded-full hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-white/10"
                >
                  Join as Creator
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
