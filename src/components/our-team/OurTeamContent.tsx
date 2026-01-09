import Link from 'next/link';
import { Heading, Text } from '@/components/typography';
import { teamMembers } from '@/lib/data/team-members.data';
import TeamMemberCard from './TeamMemberCard';

/**
 * Our Team Content Component
 *
 * Well-organized team page with clear sections and professional layout.
 */
export default function OurTeamContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center w-full bg-black">
        {/* Content - Left Aligned with Padding */}
        <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-20 lg:py-24 relative z-20 w-full">
          <div className="max-w-4xl px-4 sm:px-6 md:px-8">
            <Heading
              level={1}
              variant="gradient"
              className="mb-4 md:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight"
            >
              Our{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Team
              </span>
            </Heading>
            <Text
              variant="body"
              color="white"
              className="text-white text-base sm:text-lg md:text-xl leading-relaxed font-medium drop-shadow-lg"
            >
              Meet the passionate people behind Stardust Creator Network, dedicated to connecting
              brands with creators to build authentic partnerships and drive meaningful engagement.
            </Text>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-16 bg-gradient-to-b from-black via-neutral-950 to-black">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <Heading
              level={2}
              variant="default"
              className="text-white mb-12 text-center text-3xl md:text-4xl"
            >
              Meet the Team
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {teamMembers.map((member, index) => (
                <TeamMemberCard
                  key={member.id}
                  name={member.name}
                  position={member.position}
                  image={member.image}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Our Team Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Heading
              level={2}
              variant="default"
              className="text-white mb-6 text-3xl md:text-4xl"
            >
              About Our Team
            </Heading>
            <div className="space-y-6 mb-8">
              <Text
                variant="body"
                className="text-white/90 leading-relaxed text-lg"
              >
                At Stardust Creator Network, we&apos;re a passionate team dedicated to connecting
                brands with creators to build authentic partnerships and drive meaningful
                engagement. Our diverse team brings together expertise in marketing, technology,
                content creation, and business strategy.
              </Text>
              <Text
                variant="body"
                className="text-white/90 leading-relaxed text-lg"
              >
                We believe in the power of authentic storytelling and strategic creator partnerships
                to help brands reach their audiences in meaningful ways. Our team works tirelessly
                to ensure every campaign delivers results that matter.
              </Text>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="/brands/brief"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-button rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
              >
                Find a Creator
              </Link>
              <Link
                href="/creators/join"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-button rounded-full hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-white/10"
              >
                Join as Creator
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
