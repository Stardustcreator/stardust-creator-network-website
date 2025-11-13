import { useCallback } from 'react';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type { ScreenerProfile, CreatorSurveyData } from '@/types/creator-survey.types';
import { PLATFORMS, AUDIENCE_SIZES, CREATOR_STATUSES } from '@/types/creator-survey.types';

interface ScreenerProfileStepProps {
  data?: Partial<ScreenerProfile>;
  errors?: Partial<Record<keyof ScreenerProfile, string>>;
  updateSurveyData: <K extends keyof CreatorSurveyData>(
    section: K,
    data: Partial<CreatorSurveyData[K]>
  ) => void;
}

export default function ScreenerProfileStep({
  data = {},
  errors = {},
  updateSurveyData,
}: ScreenerProfileStepProps) {
  const handleChange = useCallback(
    (field: keyof ScreenerProfile, value: string | string[]) => {
      updateSurveyData('screenerProfile', { [field]: value });
    },
    [updateSurveyData]
  );

  const handlePlatformToggle = useCallback(
    (platform: string) => {
      const currentPlatforms = data.platforms || [];
      const typedPlatform = platform as (typeof PLATFORMS)[number];
      const newPlatforms = currentPlatforms.includes(typedPlatform)
        ? currentPlatforms.filter(p => p !== typedPlatform)
        : [...currentPlatforms, typedPlatform];
      handleChange('platforms', newPlatforms);
    },
    [data.platforms, handleChange]
  );

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Heading
          level={2}
          className="!text-white text-xl mb-2"
        >
          Creator Profile
        </Heading>
        <Text
          variant="body"
          className="text-white opacity-80"
        >
          Help us understand your creator profile
        </Text>
      </div>

      {/* Platforms */}
      <div>
        <label className="block text-white text-sm font-medium mb-3">
          Which platforms do you actively publish on? *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {PLATFORMS.map(platform => (
            <label
              key={platform}
              className={`
                flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-all
                ${
                  data.platforms?.includes(platform)
                    ? 'bg-purple-500/20 border-purple-400/50'
                    : 'bg-white/5 border-white/20 hover:bg-white/10'
                }
              `}
            >
              <input
                type="checkbox"
                checked={data.platforms?.includes(platform) || false}
                onChange={() => handlePlatformToggle(platform)}
                className="w-4 h-4 text-purple-500 focus:ring-purple-400 rounded"
              />
              <span className="text-white text-sm">{platform}</span>
            </label>
          ))}
        </div>
        {errors.platforms && <p className="text-red-400 text-sm mt-1">{errors.platforms}</p>}
      </div>

      {/* Main Platform Audience Size */}
      <div>
        <label className="block text-white text-sm font-medium mb-3">
          Main platform audience size? *
        </label>
        <div className="space-y-3">
          {AUDIENCE_SIZES.map(size => (
            <label
              key={size}
              className={`
                flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all
                ${
                  data.mainPlatformAudienceSize === size
                    ? 'bg-purple-500/20 border-purple-400/50'
                    : 'bg-white/5 border-white/20 hover:bg-white/10'
                }
              `}
            >
              <input
                type="radio"
                name="mainPlatformAudienceSize"
                value={size}
                checked={data.mainPlatformAudienceSize === size}
                onChange={e => handleChange('mainPlatformAudienceSize', e.target.value)}
                className="w-4 h-4 mt-0.5 text-purple-500 focus:ring-purple-400"
              />
              <div className="flex-1">
                <span className="text-white text-sm font-medium">{size}</span>
              </div>
            </label>
          ))}
        </div>
        {errors.mainPlatformAudienceSize && (
          <p className="text-red-400 text-sm mt-1">{errors.mainPlatformAudienceSize}</p>
        )}
      </div>

      {/* Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white text-sm font-medium mb-2">City *</label>
          <input
            type="text"
            value={data.locationCity || ''}
            onChange={e => handleChange('locationCity', e.target.value)}
            placeholder="Enter your city"
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all
              ${
                errors.locationCity
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-purple-400'
              }
            `}
          />
          {errors.locationCity && (
            <p className="text-red-400 text-sm mt-1">{errors.locationCity}</p>
          )}
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">Country *</label>
          <input
            type="text"
            value={data.locationCountry || ''}
            onChange={e => handleChange('locationCountry', e.target.value)}
            placeholder="Enter your country"
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all
              ${
                errors.locationCountry
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-purple-400'
              }
            `}
          />
          {errors.locationCountry && (
            <p className="text-red-400 text-sm mt-1">{errors.locationCountry}</p>
          )}
        </div>
      </div>

      {/* Creator Status */}
      <div>
        <label className="block text-white text-sm font-medium mb-3">Creator status *</label>
        <div className="space-y-3">
          {CREATOR_STATUSES.map(status => (
            <label
              key={status}
              className={`
                flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all
                ${
                  data.creatorStatus === status
                    ? 'bg-purple-500/20 border-purple-400/50'
                    : 'bg-white/5 border-white/20 hover:bg-white/10'
                }
              `}
            >
              <input
                type="radio"
                name="creatorStatus"
                value={status}
                checked={data.creatorStatus === status}
                onChange={e => handleChange('creatorStatus', e.target.value)}
                className="w-4 h-4 mt-0.5 text-purple-500 focus:ring-purple-400"
              />
              <div className="flex-1">
                <span className="text-white text-sm font-medium">{status}</span>
              </div>
            </label>
          ))}
        </div>
        {errors.creatorStatus && (
          <p className="text-red-400 text-sm mt-1">{errors.creatorStatus}</p>
        )}
      </div>
    </div>
  );
}
