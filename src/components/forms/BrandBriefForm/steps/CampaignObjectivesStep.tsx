import { useCallback } from 'react';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type {
  CampaignObjectives,
  Country,
  BrandBriefFormData,
  CampaignGoal,
  TargetAudience,
  TargetMarket,
} from '@/types/brand-brief.types';
import {
  CAMPAIGN_GOALS,
  CAMPAIGN_TYPES,
  TARGET_AUDIENCES,
  TARGET_MARKETS,
} from '@/types/brand-brief.types';

interface CampaignObjectivesStepProps {
  data?: Partial<CampaignObjectives>;
  errors?: Partial<Record<keyof CampaignObjectives, string>>;
  updateFormData: <K extends keyof BrandBriefFormData>(
    section: K,
    data: Partial<BrandBriefFormData[K]>
  ) => void;
  country: Country;
}

export default function CampaignObjectivesStep({
  data = {},
  errors = {},
  updateFormData,
  country: _country, // eslint-disable-line @typescript-eslint/no-unused-vars
}: CampaignObjectivesStepProps) {
  const handleInputChange = useCallback(
    (field: keyof CampaignObjectives, value: string) => {
      updateFormData('campaignObjectives', { [field]: value });
    },
    [updateFormData]
  );

  const handleMultiSelectChange = useCallback(
    (field: 'campaignGoals' | 'targetAudiences' | 'targetMarkets', value: string) => {
      const currentValues = (data[field] as string[]) || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];

      updateFormData('campaignObjectives', { [field]: newValues });
    },
    [data, updateFormData]
  );

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-3 py-1 mb-4">
          <span className="text-purple-300 text-sm font-medium">Section 2</span>
        </div>

        <Heading
          level={1}
          className="text-white text-2xl md:text-3xl mb-2"
        >
          Campaign Objectives
        </Heading>

        <Text
          variant="large"
          className="text-white opacity-80"
        >
          What do you want to achieve?
        </Text>
      </div>

      {/* Form Fields */}
      <div className="space-y-8">
        {/* Campaign Name */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">Campaign Name *</label>
          <input
            type="text"
            value={data.campaignName || ''}
            onChange={e => handleInputChange('campaignName', e.target.value)}
            placeholder="Enter your campaign name"
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all
              ${
                errors.campaignName
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-purple-400'
              }
            `}
          />
          {errors.campaignName && (
            <p className="text-red-400 text-sm mt-1">{errors.campaignName}</p>
          )}
        </div>

        {/* Campaign Goal (Multi-select) */}
        <div>
          <label className="block text-white text-sm font-medium mb-3">
            Campaign Goal * <span className="text-gray-400 text-xs">(Select multiple)</span>
          </label>
          <div className="grid grid-cols-1 gap-3">
            {CAMPAIGN_GOALS.map(goal => (
              <label
                key={goal}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all
                  ${
                    (data.campaignGoals as CampaignGoal[])?.includes(goal)
                      ? 'bg-purple-500/20 border-purple-400/50'
                      : 'bg-white/5 border-white/20 hover:bg-white/10'
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={(data.campaignGoals as CampaignGoal[])?.includes(goal) || false}
                  onChange={() => handleMultiSelectChange('campaignGoals', goal)}
                  className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-400"
                />
                <span className="text-white text-sm">{goal}</span>
              </label>
            ))}
          </div>
          {errors.campaignGoals && (
            <p className="text-red-400 text-sm mt-1">{errors.campaignGoals}</p>
          )}
        </div>

        {/* Campaign Type */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">Campaign Type *</label>
          <select
            value={data.campaignType || ''}
            onChange={e => handleInputChange('campaignType', e.target.value)}
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white 
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all appearance-none
              ${
                errors.campaignType
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-purple-400'
              }
            `}
          >
            <option
              value=""
              className="bg-gray-900"
            >
              Select campaign type
            </option>
            {CAMPAIGN_TYPES.map(type => (
              <option
                key={type}
                value={type}
                className="bg-gray-900"
              >
                {type}
              </option>
            ))}
          </select>
          {errors.campaignType && (
            <p className="text-red-400 text-sm mt-1">{errors.campaignType}</p>
          )}
        </div>

        {/* Target Audience (Multi-select) */}
        <div>
          <label className="block text-white text-sm font-medium mb-3">
            Target Audience * <span className="text-gray-400 text-xs">(Select multiple)</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {TARGET_AUDIENCES.map(audience => (
              <label
                key={audience}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all
                  ${
                    (data.targetAudiences as TargetAudience[])?.includes(audience)
                      ? 'bg-purple-500/20 border-purple-400/50'
                      : 'bg-white/5 border-white/20 hover:bg-white/10'
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={(data.targetAudiences as TargetAudience[])?.includes(audience) || false}
                  onChange={() => handleMultiSelectChange('targetAudiences', audience)}
                  className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-400"
                />
                <span className="text-white text-sm">{audience}</span>
              </label>
            ))}
          </div>
          {errors.targetAudiences && (
            <p className="text-red-400 text-sm mt-1">{errors.targetAudiences}</p>
          )}
        </div>

        {/* Target Market (Multi-select) */}
        <div>
          <label className="block text-white text-sm font-medium mb-3">
            Target Market * <span className="text-gray-400 text-xs">(Select multiple)</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {TARGET_MARKETS.map(market => (
              <label
                key={market}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all
                  ${
                    (data.targetMarkets as TargetMarket[])?.includes(market)
                      ? 'bg-purple-500/20 border-purple-400/50'
                      : 'bg-white/5 border-white/20 hover:bg-white/10'
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={(data.targetMarkets as TargetMarket[])?.includes(market) || false}
                  onChange={() => handleMultiSelectChange('targetMarkets', market)}
                  className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-400"
                />
                <span className="text-white text-sm">{market}</span>
              </label>
            ))}
          </div>
          {errors.targetMarkets && (
            <p className="text-red-400 text-sm mt-1">{errors.targetMarkets}</p>
          )}
        </div>
      </div>
    </div>
  );
}
