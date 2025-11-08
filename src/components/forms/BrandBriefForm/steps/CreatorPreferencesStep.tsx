import { useCallback } from 'react';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type {
  CreatorPreferences,
  Country,
  BrandBriefFormData,
  ContentCategory,
  Platform,
} from '@/types/brand-brief.types';
import { CREATOR_TIERS, CONTENT_CATEGORIES, PLATFORMS } from '@/types/brand-brief.types';

interface CreatorPreferencesStepProps {
  data?: Partial<CreatorPreferences>;
  errors?: Partial<Record<keyof CreatorPreferences, string>>;
  updateFormData: <K extends keyof BrandBriefFormData>(
    section: K,
    data: Partial<BrandBriefFormData[K]>
  ) => void;
  country: Country;
}

export default function CreatorPreferencesStep({
  data = {},
  errors = {},
  updateFormData,
  country: _country, // eslint-disable-line @typescript-eslint/no-unused-vars
}: CreatorPreferencesStepProps) {
  const handleInputChange = useCallback(
    (field: keyof CreatorPreferences, value: string) => {
      updateFormData('creatorPreferences', { [field]: value });
    },
    [updateFormData]
  );

  const handleMultiSelectChange = useCallback(
    (field: 'contentCategories' | 'platformFocus', value: string) => {
      const currentValues = (data[field] as string[]) || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];

      updateFormData('creatorPreferences', { [field]: newValues });
    },
    [data, updateFormData]
  );

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-3 py-1 mb-4">
          <span className="text-purple-300 text-sm font-medium">Section 3</span>
        </div>

        <Heading
          level={1}
          className="text-white text-2xl md:text-3xl mb-2"
        >
          Creator Preferences
        </Heading>

        <Text
          variant="large"
          className="text-white opacity-80"
        >
          Describe your ideal creator partners.
        </Text>
      </div>

      {/* Form Fields */}
      <div className="space-y-8">
        {/* Preferred Creator Tier */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Preferred Creator Tier *
          </label>
          <select
            value={data.preferredCreatorTier || ''}
            onChange={e => handleInputChange('preferredCreatorTier', e.target.value)}
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white 
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all appearance-none
              ${
                errors.preferredCreatorTier
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-purple-400'
              }
            `}
          >
            <option
              value=""
              className="bg-gray-900"
            >
              Select preferred creator tier
            </option>
            {CREATOR_TIERS.map(tier => (
              <option
                key={tier}
                value={tier}
                className="bg-gray-900"
              >
                {tier}
              </option>
            ))}
          </select>
          {errors.preferredCreatorTier && (
            <p className="text-red-400 text-sm mt-1">{errors.preferredCreatorTier}</p>
          )}
        </div>

        {/* Content Categories (Multi-select) */}
        <div>
          <label className="block text-white text-sm font-medium mb-3">
            Content Categories * <span className="text-gray-400 text-xs">(Select multiple)</span>
          </label>
          <div className="grid grid-cols-1 gap-3">
            {CONTENT_CATEGORIES.map(category => (
              <label
                key={category}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all
                  ${
                    (data.contentCategories as ContentCategory[])?.includes(category)
                      ? 'bg-purple-500/20 border-purple-400/50'
                      : 'bg-white/5 border-white/20 hover:bg-white/10'
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={
                    (data.contentCategories as ContentCategory[])?.includes(category) || false
                  }
                  onChange={() => handleMultiSelectChange('contentCategories', category)}
                  className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-400"
                />
                <span className="text-white text-sm">{category}</span>
              </label>
            ))}
          </div>
          {errors.contentCategories && (
            <p className="text-red-400 text-sm mt-1">{errors.contentCategories}</p>
          )}
        </div>

        {/* Platform Focus (Multi-select) */}
        <div>
          <label className="block text-white text-sm font-medium mb-3">
            Platform Focus * <span className="text-gray-400 text-xs">(Select multiple)</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {PLATFORMS.map(platform => (
              <label
                key={platform}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all
                  ${
                    (data.platformFocus as Platform[])?.includes(platform)
                      ? 'bg-purple-500/20 border-purple-400/50'
                      : 'bg-white/5 border-white/20 hover:bg-white/10'
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={(data.platformFocus as Platform[])?.includes(platform) || false}
                  onChange={() => handleMultiSelectChange('platformFocus', platform)}
                  className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-400"
                />
                <span className="text-white text-sm">{platform}</span>
              </label>
            ))}
          </div>
          {errors.platformFocus && (
            <p className="text-red-400 text-sm mt-1">{errors.platformFocus}</p>
          )}
        </div>

        {/* Brand–Creator Fit (Optional) */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Brand–Creator Fit <span className="text-gray-400">(Optional)</span>
          </label>
          <div className="mb-2">
            <Text
              variant="small"
              className="text-gray-400"
            >
              Describe the type of creator personality, tone, or aesthetic that best fits your
              brand.
            </Text>
          </div>
          <textarea
            value={data.brandCreatorFit || ''}
            onChange={e => handleInputChange('brandCreatorFit', e.target.value)}
            placeholder="e.g., 'We're looking for creators who embody authenticity and genuine passion for sustainable living...'"
            rows={4}
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all resize-none
              ${
                errors.brandCreatorFit
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-purple-400'
              }
            `}
          />
          {errors.brandCreatorFit && (
            <p className="text-red-400 text-sm mt-1">{errors.brandCreatorFit}</p>
          )}
          <div className="text-right mt-1">
            <span className="text-gray-500 text-xs">{(data.brandCreatorFit || '').length}/500</span>
          </div>
        </div>
      </div>
    </div>
  );
}
