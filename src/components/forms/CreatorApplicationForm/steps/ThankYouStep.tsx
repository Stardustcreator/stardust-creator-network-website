import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type { Country } from '@/types/creator-application.types';

interface ThankYouStepProps {
  country: Country;
}

const getSocialLinks = () => {
  // This could be country-specific in the future
  return {
    surveyUrl: '/creators/survey',
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

      {/* Social Media Follow Section */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6 mb-8">
        <Heading
          level={3}
          className="!text-white text-lg mb-4"
        >
          Follow us on social media
        </Heading>
        <Text
          variant="small"
          className="text-white opacity-70 mb-4"
        >
          Stay updated with creator opportunities, tips, and community highlights
        </Text>
        <div className="flex gap-4 justify-center">
          <a
            href="https://www.instagram.com/stardustcreatornetwork/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition-colors p-2"
            aria-label="Follow us on Instagram"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            href="https://www.tiktok.com/@stardustcreatornetwork"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition-colors p-2"
            aria-label="Follow us on TikTok"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@StardustCreatorNetwork"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition-colors p-2"
            aria-label="Subscribe to our YouTube channel"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/stardust-creator-network"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition-colors p-2"
            aria-label="Connect with us on LinkedIn"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
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
