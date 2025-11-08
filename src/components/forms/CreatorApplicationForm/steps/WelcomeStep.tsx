import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type { Country } from '@/types/creator-application.types';

interface WelcomeStepProps {
  onNext: () => void;
  country: Country;
}

const getLocationContent = (country: Country) => {
  switch (country) {
    case 'Nigeria':
      return {
        welcomeMessage: "Welcome to Nigeria's premier creator network",
        subtitle: "We're building the future of the creator economy, one collaboration at a time.",
        description:
          'Join our verified network to connect with top brands, learn new skills, and access early creator tools designed to help you earn smarter in the Nigerian market.',
        ctaText: 'Start Your Application',
      };
    case 'United Kingdom':
      return {
        welcomeMessage: "Welcome to the UK's innovative creator network",
        subtitle: "We're building the future of the creator economy, one collaboration at a time.",
        description:
          'Join our verified network to connect with top brands, learn new skills, and access early creator tools designed to help you earn smarter in the UK market.',
        ctaText: 'Start Your Application',
      };
    default:
      return {
        welcomeMessage: 'Welcome to the global creator network',
        subtitle: "We're building the future of the creator economy, one collaboration at a time.",
        description:
          'Join our verified network to connect with top brands, learn new skills, and access early creator tools designed to help you earn smarter.',
        ctaText: 'Start Your Application',
      };
  }
};

export default function WelcomeStep({ onNext, country }: WelcomeStepProps) {
  const content = getLocationContent(country);

  return (
    <div className="text-center pt-20 pb-12">
      {/* Network Badge */}
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-8">
        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
        <span className="text-purple-300 text-sm font-medium">Stardust Creator Network</span>
      </div>

      {/* Main Headline */}
      <div className="mb-6">
        <Heading
          level={1}
          className="text-white"
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
        >
          Welcome to Stardust Creator Network
        </Heading>

        <Text
          variant="large"
          className="text-white"
          className="opacity-70 mb-6"
        >
          {content.subtitle}
        </Text>
      </div>

      {/* Description */}
      <div className="max-w-2xl mx-auto mb-12">
        <Text
          variant="large"
          className="text-white"
          className="opacity-80 leading-relaxed"
        >
          {content.description}
        </Text>
      </div>

      {/* Call to Action */}
      <div className="space-y-4">
        <button
          onClick={onNext}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 flex items-center gap-3 mx-auto"
        >
          {content.ctaText}
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>

        <Text
          variant="caption"
          className="text-white"
          className="opacity-60"
        >
          Join the network that&apos;s redefining how creators learn, collaborate, and earn.
        </Text>
      </div>

      {/* Trust indicators */}
      <div className="mt-16 pt-8 border-t border-white/10">
        <Text
          variant="caption"
          className="text-white"
          className="opacity-50 mb-4"
        >
          Trusted by creators across {country}
        </Text>
        <div className="flex justify-center items-center gap-8 opacity-30">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-white text-sm">Verified Network</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-white text-sm">Secure Application</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span className="text-white text-sm">Fast Review</span>
          </div>
        </div>
      </div>
    </div>
  );
}
