import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type {
  EducationToolsInterest,
  Country,
  CreatorApplicationFormData,
  CreatorOSFeature,
} from '@/types/creator-application.types';
import { CREATOR_OS_FEATURES, COMMUNITY_INTEREST_LEVELS } from '@/types/creator-application.types';

interface EducationToolsInterestStepProps {
  data?: Partial<EducationToolsInterest>;
  errors?: Partial<Record<keyof EducationToolsInterest, string>>;
  updateFormData: <K extends keyof CreatorApplicationFormData>(
    section: K,
    data: Partial<CreatorApplicationFormData[K]>
  ) => void;
  country?: Country;
}

export default function EducationToolsInterestStep({
  data = {},
  errors = {},
  updateFormData,
}: EducationToolsInterestStepProps) {
  const handleInputChange = (field: keyof EducationToolsInterest, value: string | string[]) => {
    updateFormData('educationToolsInterest', { [field]: value });
  };

  const handleFeatureToggle = (feature: CreatorOSFeature) => {
    const currentFeatures = data.creatorOSFeatures || [];
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter(f => f !== feature)
      : [...currentFeatures, feature];

    handleInputChange('creatorOSFeatures', updatedFeatures);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <Heading
          level={1}
          className="text-white"
          className="text-2xl md:text-3xl mb-2"
        >
          Education & Tools Interest
        </Heading>

        <Text
          variant="large"
          className="text-white"
          className="opacity-80"
        >
          Help us understand what kind of creator tools you&apos;d love most.
        </Text>
      </div>

      {/* Form Fields */}
      <div className="space-y-8">
        {/* Creator OS Features */}
        <div>
          <label className="block text-white text-sm font-medium mb-4">
            If you could have an all-in-one creator back office, which of these features would you
            find most valuable? *<span className="text-white/60 block mt-1">(Select up to 5)</span>
          </label>

          <div className="space-y-3">
            {CREATOR_OS_FEATURES.map(feature => {
              const isSelected = data.creatorOSFeatures?.includes(feature) || false;
              const isDisabled = !isSelected && (data.creatorOSFeatures?.length || 0) >= 5;

              return (
                <button
                  key={feature}
                  type="button"
                  onClick={() => !isDisabled && handleFeatureToggle(feature)}
                  disabled={isDisabled}
                  className={`
                    w-full p-4 rounded-lg border text-sm font-medium transition-all text-left flex items-start gap-3
                    ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 text-white'
                        : isDisabled
                          ? 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
                          : 'bg-white/5 border-white/20 text-white hover:border-purple-500/50 hover:bg-purple-500/10'
                    }
                  `}
                >
                  {/* Checkbox indicator */}
                  <div
                    className={`
                    w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 flex-shrink-0
                    ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-500'
                        : 'border-white/30'
                    }
                  `}
                  >
                    {isSelected && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>

                  <div className="flex-1">{feature}</div>
                </button>
              );
            })}
          </div>

          {/* Selection counter */}
          <div className="text-center mt-4">
            <Text
              variant="caption"
              className="text-white"
              className="opacity-60"
            >
              {data.creatorOSFeatures?.length || 0} of 5 features selected
            </Text>
          </div>

          {errors.creatorOSFeatures && (
            <p className="text-red-400 text-sm mt-2">{errors.creatorOSFeatures}</p>
          )}
        </div>

        {/* Community Interest */}
        <div>
          <label className="block text-white text-sm font-medium mb-4">
            Would you join our paid SCN Creator Community to access education, templates, and brand
            opportunities? *
          </label>
          <div className="space-y-3">
            {COMMUNITY_INTEREST_LEVELS.map(level => {
              const isSelected = data.communityInterest === level;

              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => handleInputChange('communityInterest', level)}
                  className={`
                    w-full p-4 rounded-lg border text-left font-medium transition-all flex items-center gap-3
                    ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 text-white'
                        : 'bg-white/5 border-white/20 text-white hover:border-purple-500/50 hover:bg-purple-500/10'
                    }
                  `}
                >
                  {/* Radio button indicator */}
                  <div
                    className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                    ${isSelected ? 'border-purple-500' : 'border-white/30'}
                  `}
                  >
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                    )}
                  </div>

                  <div className="flex-1">{level}</div>
                </button>
              );
            })}
          </div>
          {errors.communityInterest && (
            <p className="text-red-400 text-sm mt-2">{errors.communityInterest}</p>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-8 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <Text
              variant="body"
              className="text-white"
              className="opacity-90 mb-1 font-medium"
            >
              Shaping the Future Together
            </Text>
            <Text
              variant="caption"
              className="text-white"
              className="opacity-70 leading-relaxed"
            >
              Your feedback helps us build tools that actually solve creators&apos; biggest
              challenges. We&apos;re committed to creating solutions that make your creative
              business more efficient and profitable.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
