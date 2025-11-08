import { useState } from 'react';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type {
  CreatorIdentity,
  Country,
  CreatorApplicationFormData,
  Platform,
  ContentCategory,
  CreatorType,
  AudienceSize,
  SocialLinks,
} from '@/types/creator-application.types';
import {
  PLATFORMS,
  CONTENT_CATEGORIES,
  CREATOR_TYPES,
  AUDIENCE_SIZES,
} from '@/types/creator-application.types';

interface CreatorIdentityStepProps {
  data?: Partial<CreatorIdentity>;
  errors?: Partial<Record<keyof CreatorIdentity, string>>;
  updateFormData: <K extends keyof CreatorApplicationFormData>(
    section: K,
    data: Partial<CreatorApplicationFormData[K]>
  ) => void;
  country?: Country;
}

export default function CreatorIdentityStep({
  data = {},
  errors = {},
  updateFormData,
}: CreatorIdentityStepProps) {
  const [newSocialLink, setNewSocialLink] = useState<SocialLinks>({
    platform: 'Instagram',
    url: '',
  });

  const handleInputChange = (
    field: keyof CreatorIdentity,
    value: string | string[] | SocialLinks[]
  ) => {
    updateFormData('creatorIdentity', { [field]: value });
  };

  const handlePlatformToggle = (platform: Platform) => {
    const currentPlatforms = data.primaryPlatforms || [];
    const updatedPlatforms = currentPlatforms.includes(platform)
      ? currentPlatforms.filter(p => p !== platform)
      : [...currentPlatforms, platform];

    handleInputChange('primaryPlatforms', updatedPlatforms);
  };

  const handleContentCategoryToggle = (category: ContentCategory) => {
    const currentCategories = data.contentCategories || [];
    const updatedCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];

    handleInputChange('contentCategories', updatedCategories);
  };

  const addSocialLink = () => {
    if (newSocialLink.url.trim()) {
      const currentLinks = data.socialLinks || [];
      const updatedLinks = [...currentLinks, { ...newSocialLink }];
      handleInputChange('socialLinks', updatedLinks);
      setNewSocialLink({ platform: 'Instagram', url: '' });
    }
  };

  const removeSocialLink = (index: number) => {
    const currentLinks = data.socialLinks || [];
    const updatedLinks = currentLinks.filter((_, i) => i !== index);
    handleInputChange('socialLinks', updatedLinks);
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
          Creator Identity
        </Heading>

        <Text
          variant="large"
          className="text-white"
          className="opacity-80"
        >
          Tell us about your creative world.
        </Text>
      </div>

      {/* Form Fields */}
      <div className="space-y-8">
        {/* Creator Handle */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">Creator Handle *</label>
          <input
            type="text"
            value={data.creatorHandle || ''}
            onChange={e => handleInputChange('creatorHandle', e.target.value)}
            placeholder="@yourcreatorhandle"
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all
              ${
                errors.creatorHandle
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-purple-400'
              }
            `}
          />
          {errors.creatorHandle && (
            <p className="text-red-400 text-sm mt-1">{errors.creatorHandle}</p>
          )}
        </div>

        {/* Primary Platforms */}
        <div>
          <label className="block text-white text-sm font-medium mb-4">
            Primary Platform(s) * <span className="text-white/60">(Select up to 5)</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {PLATFORMS.map(platform => {
              const isSelected = data.primaryPlatforms?.includes(platform) || false;
              const isDisabled = !isSelected && (data.primaryPlatforms?.length || 0) >= 5;

              return (
                <button
                  key={platform}
                  type="button"
                  onClick={() => !isDisabled && handlePlatformToggle(platform)}
                  disabled={isDisabled}
                  className={`
                    p-3 rounded-lg border text-sm font-medium transition-all text-left
                    ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 text-white'
                        : isDisabled
                          ? 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
                          : 'bg-white/5 border-white/20 text-white hover:border-purple-500/50 hover:bg-purple-500/10'
                    }
                  `}
                >
                  {platform}
                </button>
              );
            })}
          </div>
          {errors.primaryPlatforms && (
            <p className="text-red-400 text-sm mt-2">{errors.primaryPlatforms}</p>
          )}
        </div>

        {/* Social Links */}
        <div>
          <label className="block text-white text-sm font-medium mb-4">
            Links to Your Social Pages *
          </label>

          {/* Existing social links */}
          {data.socialLinks && data.socialLinks.length > 0 && (
            <div className="space-y-3 mb-4">
              {data.socialLinks.map((link, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white/5 border border-white/20 rounded-lg p-3"
                >
                  <div className="text-white/70 text-sm min-w-20">{link.platform}:</div>
                  <div className="flex-1 text-white text-sm truncate">{link.url}</div>
                  <button
                    type="button"
                    onClick={() => removeSocialLink(index)}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add new social link */}
          <div className="flex gap-3">
            <select
              value={newSocialLink.platform}
              onChange={e =>
                setNewSocialLink(prev => ({ ...prev, platform: e.target.value as Platform }))
              }
              className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-400"
            >
              {PLATFORMS.map(platform => (
                <option
                  key={platform}
                  value={platform}
                  className="bg-gray-900"
                >
                  {platform}
                </option>
              ))}
            </select>
            <input
              type="url"
              value={newSocialLink.url}
              onChange={e => setNewSocialLink(prev => ({ ...prev, url: e.target.value }))}
              placeholder="https://..."
              className="flex-1 bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-purple-400"
            />
            <button
              type="button"
              onClick={addSocialLink}
              disabled={!newSocialLink.url.trim()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
            >
              Add
            </button>
          </div>
          {errors.socialLinks && <p className="text-red-400 text-sm mt-2">{errors.socialLinks}</p>}
        </div>

        {/* Audience Size */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">Audience Size *</label>
          <select
            value={data.audienceSize || ''}
            onChange={e => handleInputChange('audienceSize', e.target.value as AudienceSize)}
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white 
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all
              ${
                errors.audienceSize
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-purple-400'
              }
            `}
          >
            <option
              value=""
              className="bg-gray-900"
            >
              Select your audience size
            </option>
            {AUDIENCE_SIZES.map(size => (
              <option
                key={size}
                value={size}
                className="bg-gray-900"
              >
                {size}
              </option>
            ))}
          </select>
          {errors.audienceSize && (
            <p className="text-red-400 text-sm mt-1">{errors.audienceSize}</p>
          )}
        </div>

        {/* Content Categories */}
        <div>
          <label className="block text-white text-sm font-medium mb-4">
            Content Category * <span className="text-white/60">(Select up to 5)</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {CONTENT_CATEGORIES.map(category => {
              const isSelected = data.contentCategories?.includes(category) || false;
              const isDisabled = !isSelected && (data.contentCategories?.length || 0) >= 5;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => !isDisabled && handleContentCategoryToggle(category)}
                  disabled={isDisabled}
                  className={`
                    p-3 rounded-lg border text-sm font-medium transition-all text-left
                    ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 text-white'
                        : isDisabled
                          ? 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
                          : 'bg-white/5 border-white/20 text-white hover:border-purple-500/50 hover:bg-purple-500/10'
                    }
                  `}
                >
                  {category}
                </button>
              );
            })}
          </div>
          {errors.contentCategories && (
            <p className="text-red-400 text-sm mt-2">{errors.contentCategories}</p>
          )}
        </div>

        {/* Creator Type */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">Creator Type *</label>
          <select
            value={data.creatorType || ''}
            onChange={e => handleInputChange('creatorType', e.target.value as CreatorType)}
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white 
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all
              ${
                errors.creatorType
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-purple-400'
              }
            `}
          >
            <option
              value=""
              className="bg-gray-900"
            >
              Select your creator type
            </option>
            {CREATOR_TYPES.map(type => (
              <option
                key={type}
                value={type}
                className="bg-gray-900"
              >
                {type}
              </option>
            ))}
          </select>
          {errors.creatorType && <p className="text-red-400 text-sm mt-1">{errors.creatorType}</p>}
        </div>
      </div>
    </div>
  );
}
