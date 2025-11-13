'use client';

import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import CreatorSurvey from '@/components/forms/CreatorSurvey/CreatorSurvey';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';

export default function CreatorSurveyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black pt-32">
        <div className="container mx-auto px-4 pb-16">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
              <span className="text-purple-300 text-sm font-medium">Creator Survey</span>
            </div>

            <Heading
              level={1}
              className="text-white text-3xl md:text-4xl mb-4"
            >
              Help Us Build Better Tools for Creators
            </Heading>

            <Text
              variant="large"
              className="text-white opacity-80 max-w-2xl mx-auto"
            >
              Take a 2-minute survey to help us understand creator needs and shape the future of
              Stardust Creator Network. Your feedback will help us prioritize features and build
              tools that matter most to creators like you.
            </Text>
          </div>

          {/* Survey Component */}
          <CreatorSurvey />
        </div>
      </main>
      <Footer />
    </>
  );
}
