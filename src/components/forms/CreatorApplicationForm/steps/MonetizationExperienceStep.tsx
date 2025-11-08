import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type {
  MonetizationExperience,
  Country,
  CreatorApplicationFormData,
  MonetizationMethod,
  OpportunityInterest,
  FeeRange,
} from '@/types/creator-application.types';
import {
  NIGERIA_FEE_RANGES,
  UK_FEE_RANGES,
  MONETIZATION_METHODS,
  OPPORTUNITY_INTERESTS,
} from '@/types/creator-application.types';

interface MonetizationExperienceStepProps {
  data?: Partial<MonetizationExperience>;
  errors?: Partial<Record<keyof MonetizationExperience, string>>;
  updateFormData: <K extends keyof CreatorApplicationFormData>(
    section: K,
    data: Partial<CreatorApplicationFormData[K]>
  ) => void;
  country: Country;
}

export default function MonetizationExperienceStep({
  data = {},
  errors = {},
  updateFormData,
  country,
}: MonetizationExperienceStepProps) {
  const getFeeRanges = () => {
    switch (country) {
      case 'Nigeria':
        return NIGERIA_FEE_RANGES;
      case 'United Kingdom':
        return UK_FEE_RANGES;
      default:
        return NIGERIA_FEE_RANGES;
    }
  };

  const handleInputChange = (
    field: keyof MonetizationExperience,
    value: string | boolean | string[]
  ) => {
    updateFormData('monetizationExperience', { [field]: value });
  };

  const handleMonetizationMethodToggle = (method: MonetizationMethod) => {
    const currentMethods = data.monetizationMethods || [];
    const updatedMethods = currentMethods.includes(method)
      ? currentMethods.filter(m => m !== method)
      : [...currentMethods, method];

    handleInputChange('monetizationMethods', updatedMethods);
  };

  const handleOpportunityInterestToggle = (interest: OpportunityInterest) => {
    const currentInterests = data.opportunityInterests || [];
    const updatedInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest];

    handleInputChange('opportunityInterests', updatedInterests);
  };

  const feeRanges = getFeeRanges();

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <Heading
          level={1}
          className="text-white text-2xl md:text-3xl mb-2"
        >
          Monetization & Brand Experience
        </Heading>

        <Text
          variant="large"
          className="text-white opacity-80"
        >
          We&apos;d love to understand how you collaborate and earn.
        </Text>
      </div>

      {/* Form Fields */}
      <div className="space-y-8">
        {/* Brand Experience */}
        <div>
          <label className="block text-white text-sm font-medium mb-4">
            Have you worked with brands before? *
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleInputChange('workedWithBrands', true)}
              className={`
                flex-1 p-4 rounded-lg border text-center font-medium transition-all
                ${
                  data.workedWithBrands === true
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 text-white'
                    : 'bg-white/5 border-white/20 text-white hover:border-purple-500/50 hover:bg-purple-500/10'
                }
                ${errors.workedWithBrands ? 'border-red-500/50' : ''}
              `}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => handleInputChange('workedWithBrands', false)}
              className={`
                flex-1 p-4 rounded-lg border text-center font-medium transition-all
                ${
                  data.workedWithBrands === false
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 text-white'
                    : 'bg-white/5 border-white/20 text-white hover:border-purple-500/50 hover:bg-purple-500/10'
                }
                ${errors.workedWithBrands ? 'border-red-500/50' : ''}
              `}
            >
              No
            </button>
          </div>
          {errors.workedWithBrands && (
            <p className="text-red-400 text-sm mt-2">{errors.workedWithBrands}</p>
          )}
        </div>

        {/* Brand Example - Only show if worked with brands */}
        {data.workedWithBrands && (
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Name one brand you&apos;ve worked with *
            </label>
            <input
              type="text"
              value={data.brandExample || ''}
              onChange={e => handleInputChange('brandExample', e.target.value)}
              placeholder="e.g., Nike, Coca-Cola, Local Business..."
              className={`
                w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all
                ${
                  errors.brandExample
                    ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                    : 'border-white/20 focus:border-purple-400'
                }
              `}
            />
            {errors.brandExample && (
              <p className="text-red-400 text-sm mt-1">{errors.brandExample}</p>
            )}
          </div>
        )}

        {/* Fee Range */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Typical campaign fee or rate range *
          </label>
          <select
            value={data.feeRange || ''}
            onChange={e => handleInputChange('feeRange', e.target.value as FeeRange)}
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white 
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all
              ${
                errors.feeRange
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-purple-400'
              }
            `}
          >
            <option
              value=""
              className="bg-gray-900"
            >
              Select your typical fee range
            </option>
            {feeRanges.map(range => (
              <option
                key={range}
                value={range}
                className="bg-gray-900"
              >
                {range}
              </option>
            ))}
          </select>
          {errors.feeRange && <p className="text-red-400 text-sm mt-1">{errors.feeRange}</p>}
        </div>

        {/* Current Monetization Methods */}
        <div>
          <label className="block text-white text-sm font-medium mb-4">
            How do you currently monetize your content? *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {MONETIZATION_METHODS.map(method => {
              const isSelected = data.monetizationMethods?.includes(method) || false;

              return (
                <button
                  key={method}
                  type="button"
                  onClick={() => handleMonetizationMethodToggle(method)}
                  className={`
                    p-3 rounded-lg border text-sm font-medium transition-all text-left
                    ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 text-white'
                        : 'bg-white/5 border-white/20 text-white hover:border-purple-500/50 hover:bg-purple-500/10'
                    }
                  `}
                >
                  {method}
                </button>
              );
            })}
          </div>
          {errors.monetizationMethods && (
            <p className="text-red-400 text-sm mt-2">{errors.monetizationMethods}</p>
          )}
        </div>

        {/* Opportunity Interests */}
        <div>
          <label className="block text-white text-sm font-medium mb-4">
            What kind of opportunities are you most interested in? *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {OPPORTUNITY_INTERESTS.map(interest => {
              const isSelected = data.opportunityInterests?.includes(interest) || false;

              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleOpportunityInterestToggle(interest)}
                  className={`
                    p-3 rounded-lg border text-sm font-medium transition-all text-left
                    ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 text-white'
                        : 'bg-white/5 border-white/20 text-white hover:border-purple-500/50 hover:bg-purple-500/10'
                    }
                  `}
                >
                  {interest}
                </button>
              );
            })}
          </div>
          {errors.opportunityInterests && (
            <p className="text-red-400 text-sm mt-2">{errors.opportunityInterests}</p>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <Text
              variant="body"
              className="text-white opacity-90 mb-1 font-medium"
            >
              Honest Information Helps
            </Text>
            <Text
              variant="caption"
              className="text-white opacity-70 leading-relaxed"
            >
              Being transparent about your experience and rates helps us match you with the right
              opportunities. Don&apos;t worry if you&apos;re just starting out - we work with
              creators at all levels.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
