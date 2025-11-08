import { Heading, Text } from '@/components/typography';

export default function IconGridSection() {
  return (
    <section
      id="stardust-creator-community"
      className="py-32 bg-gradient-to-b from-black via-neutral-950 to-black"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <Heading
            level={2}
            variant="default"
            className="text-white mb-8"
          >
            <span className="text-gradient-primary">Learn. Collaborate. Scale.</span>
            <br />
            <Text
              variant="large"
              color="white"
              weight={600}
              as="span"
              className="text-3xl md:text-4xl lg:text-5xl"
            >
              The Stardust Creator Community is Launching Soon.
            </Text>
          </Heading>

          {/* Main Copy */}
          <Text
            variant="large"
            color="white"
            className="mb-12 max-w-4xl mx-auto opacity-90"
          >
            The SCN Creator Community will empower creators with access to education, monetization
            playbooks, and peer collaboration, all within a private, growth-focused ecosystem.
          </Text>

          <Text
            variant="body"
            color="white"
            className="mb-12 max-w-3xl mx-auto opacity-75"
          >
            Join the waitlist to be first in line when we open doors next month.
          </Text>

          {/* Call-to-Action */}
          <div className="flex justify-center">
            <button className="group relative inline-flex items-center justify-center px-12 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-button rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25">
              <span className="relative z-10">Join the Waitlist</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
            </button>
          </div>

          {/* Coming Soon Badge */}
          <div className="mt-12 inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-3"></div>
            <Text
              variant="small"
              color="white"
              weight={500}
              as="span"
              className="opacity-75"
            >
              Opening Next Month
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}
