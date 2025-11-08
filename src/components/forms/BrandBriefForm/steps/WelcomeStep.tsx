import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type { Country } from '@/types/brand-brief.types';

interface WelcomeStepProps {
  onNext: () => void;
  country: Country;
}

const getLocationContent = (country: Country) => {
  switch (country) {
    case 'Nigeria':
      return {
        welcomeMessage: "Connect your brand with Nigeria's top creators",
        subtitle: "Let's build something extraordinary.",
        description:
          'Stardust Creator Network connects brands with verified creators across Nigeria, delivering storytelling that drives awareness, engagement, and sales.',
        briefText:
          'Complete this quick brief so we can match you with the perfect creators for your next campaign.',
        ctaText: 'Start Brief',
      };
    case 'United Kingdom':
      return {
        welcomeMessage: "Connect your brand with the UK's top creators",
        subtitle: "Let's build something extraordinary.",
        description:
          'Stardust Creator Network connects brands with verified creators across the UK, delivering storytelling that drives awareness, engagement, and sales.',
        briefText:
          'Complete this quick brief so we can match you with the perfect creators for your next campaign.',
        ctaText: 'Start Brief',
      };
    default:
      return {
        welcomeMessage: 'Connect your brand with creators who move culture',
        subtitle: "Let's build something extraordinary.",
        description:
          'Stardust Creator Network connects brands with verified creators across Nigeria and the UK, delivering storytelling that drives awareness, engagement, and sales.',
        briefText:
          'Complete this quick brief so we can match you with the perfect creators for your next campaign.',
        ctaText: 'Start Brief',
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
      <div className="max-w-4xl mx-auto mb-12">
        <Heading
          level={1}
          variant="default"
          className="text-white mb-6 leading-tight text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold"
        >
          {content.welcomeMessage}
        </Heading>

        <Heading
          level={2}
          variant="gradient"
          className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-8 font-light"
        >
          {content.subtitle}
        </Heading>

        <Text
          variant="large"
          className="text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto"
        >
          {content.description}
        </Text>

        <Text
          variant="body"
          className="text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          {content.briefText}
        </Text>
      </div>

      {/* Visual Elements */}
      <div className="flex justify-center items-center gap-8 mb-12 opacity-60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-white text-sm font-semibold">1</span>
          </div>
          <span className="text-gray-400 text-sm">Brand Info</span>
        </div>
        <div className="w-12 h-px bg-gradient-to-r from-purple-500/50 to-pink-500/50" />
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400 text-sm font-semibold">2</span>
          </div>
          <span className="text-gray-400 text-sm">Campaign Goals</span>
        </div>
        <div className="w-12 h-px bg-gray-700" />
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400 text-sm font-semibold">3</span>
          </div>
          <span className="text-gray-400 text-sm">Creator Match</span>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={onNext}
        className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        <span className="relative z-10">{content.ctaText}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-pink-600/50 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
      </button>
    </div>
  );
}
