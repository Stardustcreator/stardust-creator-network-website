import { useCallback } from 'react';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type { CurrentMonetizationMix, CreatorSurveyData } from '@/types/creator-survey.types';
import { MONETIZATION_BLOCKERS } from '@/types/creator-survey.types';

interface MonetizationMixStepProps {
  data?: Partial<CurrentMonetizationMix>;
  errors?: Partial<Record<keyof CurrentMonetizationMix, string>>;
  updateSurveyData: <K extends keyof CreatorSurveyData>(
    section: K,
    data: Partial<CreatorSurveyData[K]>
  ) => void;
}

const MONETIZATION_SOURCES = [
  { key: 'brandDealsPercent' as const, label: 'Brand deals' },
  { key: 'adsRevenuePercent' as const, label: 'Ads revenue' },
  { key: 'affiliatePercent' as const, label: 'Affiliate' },
  {
    key: 'digitalProductsPercent' as const,
    label: 'Digital products (courses, presets, templates)',
  },
  { key: 'servicesPercent' as const, label: 'Services (coaching, consulting, editing)' },
  { key: 'membershipsPercent' as const, label: 'Memberships (Patreon, Discord, paid newsletter)' },
  { key: 'licensingUgcPercent' as const, label: 'Licensing/UGC' },
  { key: 'merchPercent' as const, label: 'Merch' },
  { key: 'otherPercent' as const, label: 'Other' },
];

export default function MonetizationMixStep({
  data = {},
  errors = {},
  updateSurveyData,
}: MonetizationMixStepProps) {
  const handleChange = useCallback(
    (field: keyof CurrentMonetizationMix, value: number | string[]) => {
      updateSurveyData('currentMonetizationMix', { [field]: value });
    },
    [updateSurveyData]
  );

  const handlePercentChange = useCallback(
    (field: keyof CurrentMonetizationMix, value: string) => {
      const numValue = value === '' ? 0 : Math.max(0, Math.min(100, parseFloat(value) || 0));
      handleChange(field, numValue);
    },
    [handleChange]
  );

  const handleBlockerToggle = useCallback(
    (blocker: string) => {
      const currentBlockers = data.biggestBlockers || [];
      const typedBlocker = blocker as (typeof MONETIZATION_BLOCKERS)[number];
      const newBlockers = currentBlockers.includes(typedBlocker)
        ? currentBlockers.filter(b => b !== typedBlocker)
        : [...currentBlockers, typedBlocker];
      handleChange('biggestBlockers', newBlockers);
    },
    [data.biggestBlockers, handleChange]
  );

  const totalPercent = MONETIZATION_SOURCES.reduce((sum, source) => {
    return sum + (data[source.key] || 0);
  }, 0);

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Heading
          level={2}
          className="!text-white text-xl mb-2"
        >
          Current Monetization Mix
        </Heading>
        <Text
          variant="body"
          className="text-white opacity-80"
        >
          Help us understand your revenue sources
        </Text>
      </div>

      {/* Revenue Sources */}
      <div>
        <label className="block text-white text-sm font-medium mb-4">
          What % of your creator income comes from each? (Allocate to 100%) *
        </label>
        <div className="space-y-4">
          {MONETIZATION_SOURCES.map(source => (
            <div
              key={source.key}
              className="bg-white/5 border border-white/20 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm">{source.label}</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={data[source.key] || 0}
                    onChange={e => handlePercentChange(source.key, e.target.value)}
                    className="w-20 bg-white/10 border border-white/20 rounded px-3 py-1 text-white text-sm text-right focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                  />
                  <span className="text-white/70 text-sm">%</span>
                </div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(100, data[source.key] || 0)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-white/5 border border-white/20 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">Total:</span>
            <span
              className={`text-lg font-bold ${Math.abs(totalPercent - 100) < 0.01 ? 'text-green-400' : 'text-red-400'}`}
            >
              {totalPercent.toFixed(1)}%
            </span>
          </div>
          {Math.abs(totalPercent - 100) >= 0.01 && (
            <div className="space-y-1">
              <p className="text-red-400 text-sm font-medium">
                Percentages must add up to exactly 100%
              </p>
              <p className="text-gray-400 text-xs">
                Current total: {totalPercent.toFixed(1)}% | Remaining:{' '}
                {(100 - totalPercent).toFixed(1)}%
              </p>
            </div>
          )}
          {Math.abs(totalPercent - 100) < 0.01 && (
            <p className="text-green-400 text-sm">Perfect! Your percentages add up to 100%</p>
          )}
        </div>
        {errors.brandDealsPercent && (
          <p className="text-red-400 text-sm mt-1">{errors.brandDealsPercent}</p>
        )}
      </div>

      {/* Biggest Blockers */}
      <div>
        <label className="block text-white text-sm font-medium mb-3">
          Biggest blockers to growing non-brand revenue? (Select all that apply) *
        </label>
        <div className="space-y-3">
          {MONETIZATION_BLOCKERS.map(blocker => (
            <label
              key={blocker}
              className={`
                flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all
                ${
                  data.biggestBlockers?.includes(blocker)
                    ? 'bg-purple-500/20 border-purple-400/50'
                    : 'bg-white/5 border-white/20 hover:bg-white/10'
                }
              `}
            >
              <input
                type="checkbox"
                checked={data.biggestBlockers?.includes(blocker) || false}
                onChange={() => handleBlockerToggle(blocker)}
                className="w-4 h-4 mt-0.5 text-purple-500 focus:ring-purple-400 rounded"
              />
              <div className="flex-1">
                <span className="text-white text-sm">{blocker}</span>
              </div>
            </label>
          ))}
        </div>
        {errors.biggestBlockers && (
          <p className="text-red-400 text-sm mt-1">{errors.biggestBlockers}</p>
        )}
      </div>
    </div>
  );
}
