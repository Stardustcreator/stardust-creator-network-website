import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type { Country } from '@/types/creator-application.types';

interface ThankYouStepProps {
  country: Country;
}

const getSocialLinks = (country: Country) => {
  // This could be country-specific in the future
  return {
    instagram: 'https://instagram.com/stardustcreatornetwork',
    tiktok: 'https://tiktok.com/@stardustcreatornetwork',
    surveyUrl: 'https://forms.gle/creator-os-survey', // Placeholder URL
    waitlistUrl: 'https://stardustcreatornetwork.com/community-waitlist', // Placeholder URL
  };
};

export default function ThankYouStep({ country }: ThankYouStepProps) {
  const socialLinks = getSocialLinks(country);

  return (
    <div className="text-center py-12 max-w-3xl mx-auto">
      {/* Success Animation/Icon */}
      <div className="mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Stardust particles animation */}
        <div className="relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 bg-purple-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Message */}
      <div className="mb-8">
        <Heading
          level={1}
          className="text-white"
          className="mb-4 text-3xl md:text-4xl"
        >
          You&apos;re officially part of the Stardust orbit ✨
        </Heading>

        <Text
          variant="large"
          className="text-white"
          className="opacity-80 mb-6"
        >
          Thank you for applying to join the Stardust Creator Network!
        </Text>
      </div>

      {/* Next Steps */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-8">
        <Heading
          level={2}
          className="text-white"
          className="text-xl mb-6"
        >
          What happens next?
        </Heading>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-purple-300 font-semibold text-sm">1</span>
            </div>
            <div>
              <Text
                variant="body"
                className="text-white"
                className="font-medium mb-1"
              >
                Review Process
              </Text>
              <Text
                variant="caption"
                className="text-white"
                className="opacity-70"
              >
                Our team reviews new creators weekly and will assess your application within 3-5
                business days.
              </Text>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-pink-300 font-semibold text-sm">2</span>
            </div>
            <div>
              <Text
                variant="body"
                className="text-white"
                className="font-medium mb-1"
              >
                Onboarding
              </Text>
              <Text
                variant="caption"
                className="text-white"
                className="opacity-70"
              >
                If selected, you&apos;ll receive onboarding details via email with access to our
                creator portal.
              </Text>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-blue-300 font-semibold text-sm">3</span>
            </div>
            <div>
              <Text
                variant="body"
                className="text-white"
                className="font-medium mb-1"
              >
                Start Collaborating
              </Text>
              <Text
                variant="caption"
                className="text-white"
                className="opacity-70"
              >
                Get first access to brand collaborations, community invites, and creator tools.
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action Buttons */}
      <div className="space-y-4 mb-8">
        <Heading
          level={3}
          className="text-white"
          className="text-lg mb-6"
        >
          While you wait, here&apos;s how to stay connected:
        </Heading>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Survey CTA */}
          <a
            href={socialLinks.surveyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 flex items-center gap-2 justify-center"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Take 2-Minute Survey
          </a>

          {/* Community Waitlist */}
          <a
            href={socialLinks.waitlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 justify-center"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Join Community Waitlist
          </a>
        </div>
      </div>

      {/* Social Media Follow */}
      <div className="border-t border-white/10 pt-8">
        <Text
          variant="body"
          className="text-white"
          className="opacity-80 mb-4"
        >
          Follow us for creator tips, updates, and community highlights:
        </Text>

        <div className="flex justify-center gap-4">
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 text-sm"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Instagram
          </a>

          <a
            href={socialLinks.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 text-sm"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
            </svg>
            TikTok
          </a>
        </div>
      </div>

      {/* Final Note */}
      <div className="mt-8 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
        <Text
          variant="caption"
          className="text-white"
          className="opacity-70"
        >
          💜 Thank you for choosing Stardust Creator Network. We&apos;re excited to potentially
          welcome you to our community of innovative creators in {country}.
        </Text>
      </div>
    </div>
  );
}
