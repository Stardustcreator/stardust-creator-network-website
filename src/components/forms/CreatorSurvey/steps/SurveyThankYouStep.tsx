import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';

export default function SurveyThankYouStep() {
  return (
    <div className="text-center py-8">
      {/* Success Icon */}
      <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Main Message */}
      <Heading
        level={2}
        className="text-white mb-6 text-3xl md:text-4xl"
      >
        Thank You!
      </Heading>

      <Text
        variant="large"
        className="text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto"
      >
        Your responses help us build better tools and communities for creators like you. We&apos;ll
        be in touch soon about beta access and updates.
      </Text>
    </div>
  );
}
