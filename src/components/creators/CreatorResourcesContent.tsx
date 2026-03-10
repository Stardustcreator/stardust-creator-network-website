import Image from 'next/image';
import Heading from '@/components/typography/Heading/Heading';
import Text from '@/components/typography/Text/Text';

export default function CreatorResourcesContent() {
  return (
    <>
      <section className="relative py-24 px-4 text-center pt-36">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/who we are/creators.webp"
            alt="Creators collaborating and learning"
            fill
            priority
            className="object-cover opacity-20"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full text-sm font-semibold tracking-wide animate-pulse">
            Coming Soon
          </div>

          <Heading
            level={1}
            variant="gradient"
            className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text"
          >
            Creator Resources
          </Heading>

          <Text
            variant="large"
            className="text-white/90 max-w-3xl mx-auto text-xl leading-relaxed"
          >
            We're crafting a comprehensive toolkit to empower creators like you. From industry
            insights to practical guides, our resources are designed to elevate your creative
            journey.
          </Text>

          <div className="flex justify-center space-x-4 mt-8">
            <div className="bg-white/10 border border-white/20 rounded-lg p-4 text-center max-w-md">
              <Heading
                level={3}
                className="text-xl mb-2 text-purple-300"
              >
                What's Coming
              </Heading>
              <Text
                variant="body"
                className="text-white/70"
              >
                • Skill Development Guides • Networking Strategies • Monetization Techniques •
                Creative Tools Directory
              </Text>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 text-center">
        <div className="bg-white/5 border border-white/10 rounded-xl max-w-2xl mx-auto p-8 space-y-4">
          <Heading
            level={2}
            className="text-2xl text-purple-300 mb-4"
          >
            Stay Updated
          </Heading>
          <Text
            variant="body"
            className="text-white/70 max-w-xl mx-auto mb-6"
          >
            Join our mailing list to be the first to know when our creator resources launch.
          </Text>
          <div className="flex justify-center">
            <div className="bg-white/10 border border-white/20 rounded-full p-1 flex items-center w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent w-full px-4 py-2 text-white placeholder-white/50 focus:outline-none"
              />
              <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
