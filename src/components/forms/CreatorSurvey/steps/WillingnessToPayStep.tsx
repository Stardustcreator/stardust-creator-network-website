import { useCallback, useMemo } from 'react';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type { WillingnessToPay, CreatorSurveyData } from '@/types/creator-survey.types';
import { CURRENCIES } from '@/types/creator-survey.types';

interface WillingnessToPayStepProps {
  data?: Partial<WillingnessToPay>;
  errors?: Partial<Record<keyof WillingnessToPay, string>>;
  updateSurveyData: <K extends keyof CreatorSurveyData>(
    section: K,
    data: Partial<CreatorSurveyData[K]>
  ) => void;
}

const LIKELIHOOD_OPTIONS = [
  { value: 1, label: 'Very unlikely' },
  { value: 2, label: 'Unlikely' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Likely' },
  { value: 5, label: 'Very likely' },
];

export default function WillingnessToPayStep({
  data = {},
  errors = {},
  updateSurveyData,
}: WillingnessToPayStepProps) {
  const handleChange = useCallback(
    (field: keyof WillingnessToPay, value: string | number) => {
      updateSurveyData('willingnessToPay', { [field]: value });
    },
    [updateSurveyData]
  );

  const currencySymbol = useMemo(() => {
    const currency = CURRENCIES.find(c => c.code === data.currency);
    return currency?.symbol || '₦';
  }, [data.currency]);

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Heading
          level={2}
          className="!text-white text-xl mb-2"
        >
          Willingness to Pay
        </Heading>
        <Text
          variant="body"
          className="text-white opacity-80"
        >
          Help us understand pricing expectations
        </Text>
      </div>

      {/* Currency Selection */}
      <div>
        <label className="block text-white text-sm font-medium mb-2">Select your currency *</label>
        <select
          value={data.currency || ''}
          onChange={e => handleChange('currency', e.target.value)}
          className={`
            w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white
            focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all appearance-none
            ${
              errors.currency
                ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                : 'border-white/20 focus:border-purple-400'
            }
          `}
        >
          <option
            value=""
            className="bg-gray-900"
          >
            Select currency
          </option>
          {CURRENCIES.map(currency => (
            <option
              key={currency.code}
              value={currency.code}
              className="bg-gray-900"
            >
              {currency.symbol} - {currency.name} ({currency.code})
            </option>
          ))}
        </select>
        {errors.currency && <p className="text-red-400 text-sm mt-1">{errors.currency}</p>}
      </div>

      {/* PRO Community Pricing */}
      <div className="bg-white/5 border border-white/20 rounded-lg p-6">
        <Heading
          level={3}
          className="!text-white text-lg mb-4"
        >
          PRO Community Pricing
        </Heading>
        <Text
          variant="small"
          className="text-white/70 mb-4"
        >
          At what monthly price for a PRO community would it feel:
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'communityTooCheap' as const, label: 'Too cheap (quality concerns)?' },
            { key: 'communityBargain' as const, label: 'A bargain (great value)?' },
            { key: 'communityExpensive' as const, label: 'Getting expensive (still consider)?' },
            { key: 'communityTooExpensive' as const, label: "Too expensive (wouldn't pay)?" },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-white text-sm font-medium mb-2">{label}</label>
              <div className="flex items-center gap-2">
                <span className="text-white/70 text-sm font-medium min-w-[24px]">
                  {currencySymbol}
                </span>
                <input
                  type="text"
                  value={data[key] || ''}
                  onChange={e => handleChange(key, e.target.value)}
                  placeholder="0"
                  className={`
                    flex-1 bg-white/5 backdrop-blur-md border rounded-lg px-4 py-2 text-white placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all
                    ${
                      errors[key]
                        ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                        : 'border-white/20 focus:border-purple-400'
                    }
                  `}
                />
              </div>
              {errors[key] && <p className="text-red-400 text-sm mt-1">{errors[key]}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Creator OS Pricing */}
      <div className="bg-white/5 border border-white/20 rounded-lg p-6">
        <Heading
          level={3}
          className="!text-white text-lg mb-4"
        >
          Creator Operating System Pricing
        </Heading>
        <Text
          variant="small"
          className="text-white/70 mb-4"
        >
          At what monthly price for a Creator Operating System software would it feel:
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'osTooCheap' as const, label: 'Too cheap (quality concerns)?' },
            { key: 'osBargain' as const, label: 'A bargain (great value)?' },
            { key: 'osExpensive' as const, label: 'Getting expensive (still consider)?' },
            { key: 'osTooExpensive' as const, label: "Too expensive (wouldn't pay)?" },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-white text-sm font-medium mb-2">{label}</label>
              <div className="flex items-center gap-2">
                <span className="text-white/70 text-sm font-medium min-w-[24px]">
                  {currencySymbol}
                </span>
                <input
                  type="text"
                  value={data[key] || ''}
                  onChange={e => handleChange(key, e.target.value)}
                  placeholder="0"
                  className={`
                    flex-1 bg-white/5 backdrop-blur-md border rounded-lg px-4 py-2 text-white placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all
                    ${
                      errors[key]
                        ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                        : 'border-white/20 focus:border-purple-400'
                    }
                  `}
                />
              </div>
              {errors[key] && <p className="text-red-400 text-sm mt-1">{errors[key]}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Revenue-Based Pricing */}
      <div>
        <label className="block text-white text-sm font-medium mb-3">
          If the Creator OS helped you earn more money per month, how likely are you to pay between{' '}
          {currencySymbol}10,000 and {currencySymbol}30,000/month? *
        </label>
        <div className="flex gap-2 flex-wrap">
          {LIKELIHOOD_OPTIONS.map(option => (
            <label
              key={option.value}
              className={`
                flex-1 min-w-[100px] p-3 rounded border text-center cursor-pointer transition-all
                ${
                  data.revenueBasedPricingLikelihood === option.value
                    ? 'bg-purple-500/20 border-purple-400/50 text-white'
                    : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                }
              `}
            >
              <input
                type="radio"
                name="revenueBasedPricingLikelihood"
                value={option.value}
                checked={data.revenueBasedPricingLikelihood === option.value}
                onChange={() => handleChange('revenueBasedPricingLikelihood', option.value)}
                className="sr-only"
              />
              <div className="text-sm font-medium">{option.value}</div>
              <div className="text-xs text-white/60 mt-1">{option.label}</div>
            </label>
          ))}
        </div>
        {errors.revenueBasedPricingLikelihood && (
          <p className="text-red-400 text-sm mt-1">{errors.revenueBasedPricingLikelihood}</p>
        )}
      </div>
    </div>
  );
}
