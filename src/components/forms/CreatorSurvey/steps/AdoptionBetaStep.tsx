import { useCallback } from 'react';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type { AdoptionBeta, CreatorSurveyData } from '@/types/creator-survey.types';

interface AdoptionBetaStepProps {
  data?: Partial<AdoptionBeta>;
  errors?: Partial<Record<keyof AdoptionBeta, string>>;
  updateSurveyData: <K extends keyof CreatorSurveyData>(
    section: K,
    data: Partial<CreatorSurveyData[K]>
  ) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function AdoptionBetaStep({
  data = {},
  errors = {},
  updateSurveyData,
  onSubmit,
  isSubmitting,
}: AdoptionBetaStepProps) {
  const handleChange = useCallback(
    (field: keyof AdoptionBeta, value: string | boolean) => {
      updateSurveyData('adoptionBeta', { [field]: value });
    },
    [updateSurveyData]
  );

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Heading
          level={2}
          className="!text-white text-xl mb-2"
        >
          Beta Participation
        </Heading>
        <Text
          variant="body"
          className="text-white opacity-80"
        >
          Help us stay in touch for beta access
        </Text>
      </div>

      {/* Beta Participation */}
      <div>
        <label className="block text-white text-sm font-medium mb-4">
          Would you join Beta for:
        </label>
        <div className="space-y-4">
          <label
            className={`
              flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all
              ${
                data.joinCommunityBeta
                  ? 'bg-purple-500/20 border-purple-400/50'
                  : 'bg-white/5 border-white/20 hover:bg-white/10'
              }
            `}
          >
            <input
              type="checkbox"
              checked={data.joinCommunityBeta || false}
              onChange={e => handleChange('joinCommunityBeta', e.target.checked)}
              className="w-4 h-4 mt-0.5 text-purple-500 focus:ring-purple-400 rounded"
            />
            <div className="flex-1">
              <span className="text-white text-sm font-medium">
                Paid Stardust Creator Community
              </span>
            </div>
          </label>

          <label
            className={`
              flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all
              ${
                data.joinOsBeta
                  ? 'bg-purple-500/20 border-purple-400/50'
                  : 'bg-white/5 border-white/20 hover:bg-white/10'
              }
            `}
          >
            <input
              type="checkbox"
              checked={data.joinOsBeta || false}
              onChange={e => handleChange('joinOsBeta', e.target.checked)}
              className="w-4 h-4 mt-0.5 text-purple-500 focus:ring-purple-400 rounded"
            />
            <div className="flex-1">
              <span className="text-white text-sm font-medium">Stardust Creator OS</span>
            </div>
          </label>
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white text-sm font-medium mb-2">Email *</label>
          <input
            type="email"
            value={data.contactEmail || ''}
            onChange={e => handleChange('contactEmail', e.target.value)}
            placeholder="your.email@example.com"
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all
              ${
                errors.contactEmail
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-purple-400'
              }
            `}
          />
          {errors.contactEmail && (
            <p className="text-red-400 text-sm mt-1">{errors.contactEmail}</p>
          )}
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">Phone Number *</label>
          <input
            type="tel"
            value={data.contactPhone || ''}
            onChange={e => handleChange('contactPhone', e.target.value)}
            placeholder="+234 812 036 4960"
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all
              ${
                errors.contactPhone
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-purple-400'
              }
            `}
          />
          {errors.contactPhone && (
            <p className="text-red-400 text-sm mt-1">{errors.contactPhone}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className={`
            px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg
            hover:from-purple-700 hover:to-pink-700 transition-all
            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Survey'}
        </button>
      </div>
    </div>
  );
}
