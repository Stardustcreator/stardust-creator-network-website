import { Heading, Text } from '@/components/typography';

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
                color="white"
                weight={600}
                as="span"
                className="opacity-75"
              >
                Powered by Stardust
              </Text>
            </div>

            {/* Headline */}
            <Heading
              level={2}
              variant="default"
              className="text-white mb-8"
            >
              Create. <span className="text-gradient-primary">Connect.</span> Convert.
            </Heading>

            <Text
              variant="large"
              color="white"
              className="mb-16 max-w-2xl mx-auto opacity-90"
            >
              Join thousands of creators building sustainable businesses and authentic connections
              with their audiences.
            </Text>
          </div>

          {/* Newsletter Subscription */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <Heading
                level={3}
                variant="default"
                className="!text-white mb-2 text-lg md:text-xl"
              >
                Stay in the Loop
              </Heading>
              <Text
                variant="body"
                color="white"
                className="opacity-75"
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
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-full text-button transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            <Text
              variant="caption"
              color="white"
              className="text-center mt-4 opacity-60"
            >
              No spam, unsubscribe at any time.
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}
