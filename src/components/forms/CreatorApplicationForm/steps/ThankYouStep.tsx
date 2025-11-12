import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type { Country } from '@/types/creator-application.types';

interface ThankYouStepProps {
  country: Country;
}

const getSocialLinks = () => {
  // This could be country-specific in the future
  return {
    surveyUrl: 'https://forms.gle/creator-os-survey', // Placeholder URL
    waitlistUrl: 'https://stardustcreatornetwork.com/community-waitlist', // Placeholder URL
  };
};

export default function ThankYouStep({ country }: ThankYouStepProps) {
  const socialLinks = getSocialLinks();

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
          className="text-white mb-4 text-3xl md:text-4xl"
        >
          You&apos;re officially part of the Stardust orbit
        </Heading>

        <Text
          variant="large"
          className="text-white opacity-80 mb-6"
        >
          Thank you for applying to join the Stardust Creator Network!
        </Text>
      </div>

      {/* Next Steps */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-8">
        <Heading
          level={2}
          size="fixed"
          className="text-white text-lg! mb-6"
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
                className="text-white font-medium mb-1"
              >
                Review Process
              </Text>
              <Text
                variant="caption"
                className="text-white opacity-70"
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
                className="text-white font-medium mb-1"
              >
                Onboarding
              </Text>
              <Text
                variant="caption"
                className="text-white opacity-70"
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
                className="text-white font-medium mb-1"
              >
                Start Collaborating
              </Text>
              <Text
                variant="caption"
                className="text-white opacity-70"
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
          className="!text-white text-xl mb-6"
        >
          While you wait, here&apos;s how to stay connected:
        </Heading>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Survey CTA */}
          <a
            href={socialLinks.surveyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 flex items-center justify-center"
          >
            Take 2-Minute Survey
          </a>

          {/* Community Waitlist */}
          <a
            href={socialLinks.waitlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center"
          >
            Join Community Waitlist
          </a>
        </div>
      </div>

      {/* Final Note */}
      <div className="mt-8 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
        <Text
          variant="caption"
          className="text-white opacity-70"
        >
          Thank you for choosing Stardust Creator Network. We&apos;re excited to potentially welcome
          you to our community of innovative creators in {country}.
        </Text>
      </div>
    </div>
  );
}
