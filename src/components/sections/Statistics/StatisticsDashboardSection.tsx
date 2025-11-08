import { Heading, Text } from '@/components/typography';

export default function StatisticsDashboardSection() {
  return (
    <section
      id="vision"
      className="py-32 bg-black"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Label */}
          <div className="mb-8"></div>

          {/* Main Content */}
          <Text
            variant="large"
            color="white"
            weight={300}
            className="text-2xl md:text-3xl lg:text-4xl"
          >
            Backed by a team that has powered{' '}
            <span className="text-gradient-primary font-semibold">
              top brands, creators, and media campaigns
            </span>{' '}
            across the globe, SCN is on a mission to build the infrastructure that turns{' '}
            <span className="text-gradient-primary font-semibold">
              creativity into sustainable business
            </span>
            .
          </Text>

          {/* Decorative Element */}
          <div className="mt-12 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>

          {/* Testimonial Card */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-3xl p-8 md:p-12">
              {/* Quote Icon */}
              <div className="mb-6">
                <svg
                  className="w-12 h-12 text-purple-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
              </div>

              {/* Main Quote */}
              <Text
                variant="large"
                color="white"
                weight={300}
                className="mb-6 text-xl md:text-2xl"
              >
                Thanks to Stardust Creator Network, I transformed my content creation into a
                thriving business. The community, tools, and support are unmatched. I went from
                posting sporadically to running a sustainable creative enterprise with consistent
                income.
              </Text>

              {/* Secondary Quote */}
              <Text
                variant="body"
                color="white"
                className="mb-8 opacity-75"
              >
                The analytics helped me understand my audience better, and the monetization features
                made it easy to turn my passion into profit. I couldn&apos;t have done this without
                the platform.
              </Text>

              {/* User Profile */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center text-xl font-bold text-white">
                  JM
                </div>
                <div className="text-left">
                  <Heading
                    level={4}
                    variant="default"
                    className="text-white text-lg"
                  >
                    Jessica Martinez
                  </Heading>
                  <Text
                    variant="small"
                    color="white"
                    className="opacity-75"
                  >
                    Content Creator & Entrepreneur
                  </Text>
                  <Text
                    variant="caption"
                    color="white"
                    className="opacity-60"
                  >
                    850K followers
                  </Text>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-700/50">
                <div className="text-center">
                  <Text
                    variant="large"
                    color="white"
                    weight={700}
                    className="text-3xl md:text-4xl mb-2"
                  >
                    5/5
                  </Text>
                  <Text
                    variant="caption"
                    color="white"
                    className="opacity-60"
                  >
                    Rating
                  </Text>
                </div>
                <div className="text-center">
                  <Text
                    variant="large"
                    color="white"
                    weight={700}
                    className="text-3xl md:text-4xl mb-2"
                  >
                    2,500+
                  </Text>
                  <Text
                    variant="caption"
                    color="white"
                    className="opacity-60"
                  >
                    Reviews
                  </Text>
                </div>
                <div className="text-center">
                  <Text
                    variant="large"
                    color="white"
                    weight={700}
                    className="text-3xl md:text-4xl mb-2"
                  >
                    98%
                  </Text>
                  <Text
                    variant="caption"
                    color="white"
                    className="opacity-60"
                  >
                    Satisfaction
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
