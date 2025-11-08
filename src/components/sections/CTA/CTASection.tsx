import { Text } from '@/components/typography';
import { SectionHeader } from '@/components/shared';

export default function CTASection() {
  return (
    <section className="py-32 bg-gradient-to-b from-black via-purple-950/20 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-16">
            {/* Brand Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 mb-8">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <Text
                variant="small"
                className="text-white opacity-75"
                weight={600}
                as="span"
              >
                Powered by Intense Group
              </Text>
            </div>

            {/* Headline */}
            <SectionHeader
              words={[
                { text: 'Create.' },
                { text: 'Connect.', className: 'text-gradient-primary' },
                { text: 'Convert.' },
              ]}
              subtitle="Join thousands of creators building sustainable businesses and authentic connections with their audiences."
              headingClassName="text-white"
              subtitleClassName="max-w-2xl mx-auto"
              className="mb-16"
              staggerDelay={300}
              variant="scale"
            />
          </div>

          {/* Newsletter Subscription */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <Text
                variant="large"
                className="text-white text-xl md:text-2xl lg:text-3xl mb-2"
                weight={600}
              >
                Stay in the Loop
              </Text>
              <Text
                variant="body"
                className="text-white opacity-75"
              >
                Get updates on new features, creator spotlights, and industry insights.
              </Text>
            </div>

            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            <Text
              variant="caption"
              className="text-white text-center mt-4 opacity-60"
            >
              No spam, unsubscribe at any time.
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}
