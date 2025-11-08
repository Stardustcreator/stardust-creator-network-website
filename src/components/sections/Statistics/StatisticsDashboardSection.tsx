import { Text } from '@/components/typography';

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
        </div>
      </div>
    </section>
  );
}
