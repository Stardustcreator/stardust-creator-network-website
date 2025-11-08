import { useCallback } from 'react';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type {
  BudgetPaymentPreference,
  Country,
  BrandBriefFormData,
} from '@/types/brand-brief.types';
import {
  NIGERIA_BUDGET_RANGES,
  UK_BUDGET_RANGES,
  PAYMENT_MODELS,
  ONGOING_COLLABORATION_OPTIONS,
} from '@/types/brand-brief.types';

interface BudgetPaymentPreferenceStepProps {
  data?: Partial<BudgetPaymentPreference>;
  errors?: Partial<Record<keyof BudgetPaymentPreference, string>>;
  updateFormData: <K extends keyof BrandBriefFormData>(
    section: K,
    data: Partial<BrandBriefFormData[K]>
  ) => void;
  country: Country;
}

export default function BudgetPaymentPreferenceStep({
  data = {},
  errors = {},
  updateFormData,
  country,
}: BudgetPaymentPreferenceStepProps) {
  const handleInputChange = useCallback(
    (field: keyof BudgetPaymentPreference, value: string) => {
      updateFormData('budgetPaymentPreference', { [field]: value });
    },
    [updateFormData]
  );

  // Get budget ranges based on country
  const getBudgetRanges = () => {
    switch (country) {
      case 'Nigeria':
        return NIGERIA_BUDGET_RANGES;
      case 'United Kingdom':
        return UK_BUDGET_RANGES;
      default:
        return NIGERIA_BUDGET_RANGES; // Default to Nigeria ranges
    }
  };

  const budgetRanges = getBudgetRanges();

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-3 py-1 mb-4">
          <span className="text-purple-300 text-sm font-medium">Section 4</span>
        </div>

        <Heading
          level={1}
          className="text-white text-2xl md:text-3xl mb-2"
        >
          Budget & Payment Preference
        </Heading>

        <Text
          variant="large"
          className="text-white opacity-80"
        >
          Let&apos;s align on scale and structure.
        </Text>
      </div>

      {/* Form Fields */}
      <div className="space-y-8">
        {/* Estimated Campaign Budget */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Estimated Campaign Budget *
          </label>
          <select
            value={data.estimatedBudget || ''}
            onChange={e => handleInputChange('estimatedBudget', e.target.value)}
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white 
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all appearance-none
              ${
                errors.estimatedBudget
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-purple-400'
              }
            `}
          >
            <option
              value=""
              className="bg-gray-900"
            >
              Select your budget range
            </option>
            {budgetRanges.map(range => (
              <option
                key={range}
                value={range}
                className="bg-gray-900"
              >
                {range}
              </option>
            ))}
          </select>
          {errors.estimatedBudget && (
            <p className="text-red-400 text-sm mt-1">{errors.estimatedBudget}</p>
          )}
        </div>

        {/* Preferred Payment Model */}
        <div>
          <label className="block text-white text-sm font-medium mb-3">
            Preferred Payment Model *
          </label>
          <div className="space-y-3">
            {PAYMENT_MODELS.map(model => (
              <label
                key={model}
                className={`
                  flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all
                  ${
                    data.paymentModel === model
                      ? 'bg-purple-500/20 border-purple-400/50'
                      : 'bg-white/5 border-white/20 hover:bg-white/10'
                  }
                `}
              >
                <input
                  type="radio"
                  name="paymentModel"
                  value={model}
                  checked={data.paymentModel === model}
                  onChange={e => handleInputChange('paymentModel', e.target.value)}
                  className="w-4 h-4 mt-0.5 text-purple-500 focus:ring-purple-400"
                />
                <div className="flex-1">
                  <span className="text-white text-sm font-medium">{model}</span>
                </div>
              </label>
            ))}
          </div>
          {errors.paymentModel && (
            <p className="text-red-400 text-sm mt-1">{errors.paymentModel}</p>
          )}
        </div>

        {/* Ongoing Collaboration Option */}
        <div>
          <label className="block text-white text-sm font-medium mb-3">
            Ongoing Collaboration Option *
          </label>
          <div className="mb-3">
            <Text
              variant="small"
              className="text-gray-400"
            >
              Would you consider a monthly retainer for continuous creator partnerships?
            </Text>
          </div>
          <div className="space-y-3">
            {ONGOING_COLLABORATION_OPTIONS.map(option => (
              <label
                key={option}
                className={`
                  flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all
                  ${
                    data.ongoingCollaboration === option
                      ? 'bg-purple-500/20 border-purple-400/50'
                      : 'bg-white/5 border-white/20 hover:bg-white/10'
                  }
                `}
              >
                <input
                  type="radio"
                  name="ongoingCollaboration"
                  value={option}
                  checked={data.ongoingCollaboration === option}
                  onChange={e => handleInputChange('ongoingCollaboration', e.target.value)}
                  className="w-4 h-4 mt-0.5 text-purple-500 focus:ring-purple-400"
                />
                <div className="flex-1">
                  <span className="text-white text-sm font-medium">{option}</span>
                </div>
              </label>
            ))}
          </div>
          {errors.ongoingCollaboration && (
            <p className="text-red-400 text-sm mt-1">{errors.ongoingCollaboration}</p>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-blue-500/20 rounded-full flex-shrink-0 mt-0.5">
            <div className="w-2 h-2 bg-blue-400 rounded-full mx-auto mt-1.5"></div>
          </div>
          <div>
            <Text
              variant="small"
              className="text-blue-200 font-medium mb-1"
            >
              Budget Transparency
            </Text>
            <Text
              variant="small"
              className="text-blue-300/80"
            >
              Your budget information helps us match you with creators whose rates align with your
              investment level, ensuring better campaign outcomes for everyone.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
