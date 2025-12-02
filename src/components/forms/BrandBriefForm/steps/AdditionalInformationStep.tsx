import { useCallback } from 'react';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type { AdditionalInformation, Country, BrandBriefFormData } from '@/types/brand-brief.types';
import {
  REFERRAL_SOURCES,
  COLLABORATION_TYPES,
  COMMUNITY_INTEREST_LEVELS,
} from '@/types/brand-brief.types';

interface AdditionalInformationStepProps {
  data?: Partial<AdditionalInformation>;
  errors?: Partial<Record<keyof AdditionalInformation, string>>;
  updateFormData: <K extends keyof BrandBriefFormData>(
    section: K,
    data: Partial<BrandBriefFormData[K]>
  ) => void;
  country: Country;
}

export default function AdditionalInformationStep({
  data = {},
  errors = {},
  updateFormData,
  country: _country, // eslint-disable-line @typescript-eslint/no-unused-vars
}: AdditionalInformationStepProps) {
  const handleInputChange = useCallback(
    (field: keyof AdditionalInformation, value: string) => {
      updateFormData('additionalInformation', { [field]: value });
    },
    [updateFormData]
  );

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-3 py-1 mb-4">
          <span className="text-purple-300 text-sm font-medium">Section 6</span>
        </div>

        <Heading
          level={2}
          className="text-white text-2xl md:text-3xl mb-2"
        >
          Additional Information
        </Heading>

        <Text
          variant="large"
          className="text-white opacity-80"
        >
          A few final details before we match you.
        </Text>
      </div>

      {/* Form Fields */}
      <div className="space-y-8">
        {/* How did you hear about SCN? */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            How did you hear about SCN? *
          </label>
          <select
            value={data.referralSource || ''}
            onChange={e => handleInputChange('referralSource', e.target.value)}
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all appearance-none
              ${
                errors.referralSource
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-purple-400'
              }
            `}
          >
            <option
              value=""
              className="bg-gray-900"
            >
              Select how you heard about us
            </option>
            {REFERRAL_SOURCES.map(source => (
              <option
                key={source}
                value={source}
                className="bg-gray-900"
              >
                {source}
              </option>
            ))}
          </select>
          {errors.referralSource && (
            <p className="text-red-400 text-sm mt-1">{errors.referralSource}</p>
          )}
        </div>

        {/* Collaboration Type */}
        <div>
          <label className="block text-white text-sm font-medium mb-3">Collaboration Type *</label>
          <div className="space-y-3">
            {COLLABORATION_TYPES.map(type => (
              <label
                key={type}
                className={`
                  flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all
                  ${
                    data.collaborationType === type
                      ? 'bg-purple-500/20 border-purple-400/50'
                      : 'bg-white/5 border-white/20 hover:bg-white/10'
                  }
                `}
              >
                <input
                  type="radio"
                  name="collaborationType"
                  value={type}
                  checked={data.collaborationType === type}
                  onChange={e => handleInputChange('collaborationType', e.target.value)}
                  className="w-4 h-4 mt-0.5 text-purple-500 focus:ring-purple-400"
                />
                <div className="flex-1">
                  <span className="text-white text-sm font-medium">{type}</span>
                </div>
              </label>
            ))}
          </div>
          {errors.collaborationType && (
            <p className="text-red-400 text-sm mt-1">{errors.collaborationType}</p>
          )}
        </div>

        {/* Community Interest */}
        <div>
          <label className="block text-white text-sm font-medium mb-3">
            Marketing Leaders Community *
          </label>
          <div className="mb-3">
            <Text
              variant="small"
              className="text-gray-400"
            >
              Interested in joining a community for marketing leaders to drive Brand Growth
              (insights, workshops, case studies, peer-to-peer networking)?
            </Text>
          </div>
          <div className="space-y-3">
            {COMMUNITY_INTEREST_LEVELS.map(level => (
              <label
                key={level}
                className={`
                  flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all
                  ${
                    data.communityInterest === level
                      ? 'bg-purple-500/20 border-purple-400/50'
                      : 'bg-white/5 border-white/20 hover:bg-white/10'
                  }
                `}
              >
                <input
                  type="radio"
                  name="communityInterest"
                  value={level}
                  checked={data.communityInterest === level}
                  onChange={e => handleInputChange('communityInterest', e.target.value)}
                  className="w-4 h-4 mt-0.5 text-purple-500 focus:ring-purple-400"
                />
                <div className="flex-1">
                  <span className="text-white text-sm font-medium">{level}</span>
                </div>
              </label>
            ))}
          </div>
          {errors.communityInterest && (
            <p className="text-red-400 text-sm mt-1">{errors.communityInterest}</p>
          )}
        </div>

        {/* Additional Notes (Optional) */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Additional Notes <span className="text-gray-400">(Optional)</span>
          </label>
          <div className="mb-2">
            <Text
              variant="small"
              className="text-gray-400"
            >
              Anything else we should know about your campaign or goals?
            </Text>
          </div>
          <textarea
            value={data.additionalNotes || ''}
            onChange={e => handleInputChange('additionalNotes', e.target.value)}
            placeholder="Share any specific requirements, constraints, or additional context that would help us find the perfect creators for your campaign..."
            rows={4}
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all resize-none
              ${
                errors.additionalNotes
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-purple-400'
              }
            `}
          />
          {errors.additionalNotes && (
            <p className="text-red-400 text-sm mt-1">{errors.additionalNotes}</p>
          )}
          <div className="text-right mt-1">
            <span className="text-gray-500 text-xs">
              {(data.additionalNotes || '').length}/1000
            </span>
          </div>
        </div>
      </div>

      {/* Community Preview */}
      <div className="mt-8 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex-shrink-0 flex items-center justify-center">
            <span className="text-white text-xs font-bold">+</span>
          </div>
          <div>
            <Text
              variant="small"
              className="text-purple-200 font-medium mb-1"
            >
              Marketing Leaders Community
            </Text>
            <Text
              variant="small"
              className="text-purple-300/80"
            >
              Join an exclusive network of marketing leaders focused on driving business growth
              through creator partnerships, data insights, and proven strategies.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
