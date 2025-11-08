import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type { Country } from '@/types/brand-brief.types';

interface ThankYouStepProps {
  country: Country;
}

const getLocationContent = (country: Country) => {
  switch (country) {
    case 'Nigeria':
      return {
        title: "You're all set!",
        message:
          'Our partnerships team will review your brief and contact you within 72 hours with a curated creator shortlist and tailored proposal.',
        communityText:
          'Want to stay ahead of the curve? Join our Marketing Leaders Community focused on driving business growth using insights, case studies, reports, and tools.',
        marketSpecific: 'Nigeria',
      };
    case 'United Kingdom':
      return {
        title: "You're all set!",
        message:
          'Our partnerships team will review your brief and contact you within 72 hours with a curated creator shortlist and tailored proposal.',
        communityText:
          'Want to stay ahead of the curve? Join our Marketing Leaders Community focused on driving business growth using insights, case studies, reports, and tools.',
        marketSpecific: 'United Kingdom',
      };
    default:
      return {
        title: "You're all set!",
        message:
          'Our partnerships team will review your brief and contact you within 72 hours with a curated creator shortlist and tailored proposal.',
        communityText:
          'Want to stay ahead of the curve? Join our Marketing Leaders Community focused on driving business growth using insights, case studies, reports, and tools.',
        marketSpecific: 'Global',
      };
  }
};

export default function ThankYouStep({ country }: ThankYouStepProps) {
  const content = getLocationContent(country);

  return (
    <div className="max-w-3xl mx-auto text-center py-16">
      {/* Success Icon */}
      <div className="w-20 h-20 mx-auto mb-8 bg-linear-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
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
        as="h1"
        level={1}
        className="text-white mb-6 text-3xl md:text-4xl"
      >
        {content.title}
      </Heading>

      <Text
        variant="large"
        className="text-gray-300 mb-8 leading-relaxed"
      >
        {content.message}
      </Text>

      {/* Community Section */}
      <div className="bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-8 mb-8">
        <Text
          variant="body"
          className="text-purple-200 mb-6"
        >
          {content.communityText}
        </Text>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#"
            className="group inline-flex items-center justify-center px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
          >
            Join Growth Authority Waitlist
          </a>

          <a
            href="#"
            className="group inline-flex items-center justify-center px-6 py-3 border border-purple-400/50 text-purple-300 font-semibold rounded-lg hover:bg-purple-500/10 transition-all duration-300"
          >
            Book a Brand Strategy Call
          </a>

          <a
            href="#"
            className="group inline-flex items-center justify-center px-6 py-3 border border-gray-500/50 text-gray-300 font-semibold rounded-lg hover:bg-gray-500/10 transition-all duration-300"
          >
            Explore Creator Success Stories
          </a>
        </div>
      </div>

      {/* Next Steps Timeline */}
      <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6">
        <Heading
          as="h3"
          level={3}
          className="text-white mb-6 text-xl"
        >
          What happens next?
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">1</span>
            </div>
            <Text
              variant="small"
              className="text-blue-300 font-medium mb-1"
            >
              Brief Review
            </Text>
            <Text
              variant="caption"
              className="text-gray-400"
            >
              Our team analyzes your requirements and matches you with suitable creators
            </Text>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-linear-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">2</span>
            </div>
            <Text
              variant="small"
              className="text-purple-300 font-medium mb-1"
            >
              Creator Shortlist
            </Text>
            <Text
              variant="caption"
              className="text-gray-400"
            >
              Receive a curated list of verified creators with detailed profiles and rates
            </Text>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-linear-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">3</span>
            </div>
            <Text
              variant="small"
              className="text-green-300 font-medium mb-1"
            >
              Campaign Launch
            </Text>
            <Text
              variant="caption"
              className="text-gray-400"
            >
              Start your collaboration with handpicked creators who align with your brand
            </Text>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mt-8 text-center">
        <Text
          variant="small"
          className="text-gray-400 mb-2"
        >
          Questions? We&apos;re here to help.
        </Text>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
          <a
            href="mailto:partnerships@stardustcreatornetwork.com"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            partnerships@stardustcreatornetwork.com
          </a>
          <span className="hidden sm:block text-gray-600">•</span>
          <a
            href="tel:+2341234567890"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            {country === 'Nigeria' ? '+234 (XXX) XXX-XXXX' : '+44 (XXX) XXX-XXXX'}
          </a>
        </div>
      </div>
    </div>
  );
}
