import { Heading, Text } from '@/components/typography';

/**
 * Our Team Content Component
 *
 * Displays information about the Stardust Creator Network team.
 * This is a placeholder structure that can be expanded with team member cards.
 */
export default function OurTeamContent() {
  return (
    <section className="py-32 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Page Title */}
          <Heading
            level={1}
            variant="default"
            className="text-white mb-6"
          >
            Our Team
          </Heading>

          {/* Subtitle */}
          <Text
            variant="large"
            className="text-purple-300 mb-12"
          >
            Meet the people behind Stardust Creator Network
          </Text>

          {/* Main Content */}
          <div className="space-y-8">
            <Text
              variant="body"
              className="text-white/90 max-w-2xl mx-auto leading-relaxed"
            >
              At Stardust Creator Network, we&apos;re a passionate team dedicated to connecting
              brands with creators to build authentic partnerships and drive meaningful engagement.
              Our diverse team brings together expertise in marketing, technology, content creation,
              and business strategy.
            </Text>

            <Text
              variant="body"
              className="text-white/90 max-w-2xl mx-auto leading-relaxed"
            >
              We believe in the power of authentic storytelling and strategic creator partnerships
              to help brands reach their audiences in meaningful ways. Our team works tirelessly to
              ensure every campaign delivers results that matter.
            </Text>
          </div>

          {/* Placeholder for Team Member Cards */}
          <div className="mt-16">
            <Text
              variant="small"
              className="text-white/60 italic"
            >
              Team member profiles coming soon...
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}
