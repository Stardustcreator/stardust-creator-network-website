import { useCallback } from 'react';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type {
  Phase2InfrastructureOS,
  CreatorSurveyData,
  OSFeature,
} from '@/types/creator-survey.types';
import { OS_FEATURES } from '@/types/creator-survey.types';

interface Phase2InfrastructureStepProps {
  data?: Partial<Phase2InfrastructureOS>;
  errors?: Partial<Record<keyof Phase2InfrastructureOS, string>>;
  updateSurveyData: <K extends keyof CreatorSurveyData>(
    section: K,
    data: Partial<CreatorSurveyData[K]>
  ) => void;
}

const VALUE_OPTIONS = [
  { value: 1, label: 'Not valuable' },
  { value: 2, label: 'Slightly valuable' },
  { value: 3, label: 'Moderately valuable' },
  { value: 4, label: 'Very valuable' },
  { value: 5, label: 'Extremely valuable' },
];

export default function Phase2InfrastructureStep({
  data = {},
  errors = {},
  updateSurveyData,
}: Phase2InfrastructureStepProps) {
  const handleChange = useCallback(
    (field: keyof Phase2InfrastructureOS, value: string | Record<string, number>) => {
      updateSurveyData('phase2InfrastructureOS', { [field]: value });
    },
    [updateSurveyData]
  );

  const handleFeatureValueChange = useCallback(
    (feature: OSFeature, value: number) => {
      const currentValues = data.featureValues || {};
      handleChange('featureValues', {
        ...currentValues,
        [feature]: value,
      });
    },
    [data.featureValues, handleChange]
  );

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Heading
          level={2}
          className="!text-white text-xl mb-2"
        >
          Creator Operating System Features
        </Heading>
        <Text
          variant="body"
          className="text-white opacity-80"
        >
          Rate how valuable these features would be to your business
        </Text>
      </div>

      {/* Feature Values */}
      <div>
        <Text
          variant="body"
          className="text-white mb-4"
        >
          How valuable are these to your business? (1=Not → 5=Extremely)
        </Text>
        <div className="space-y-4">
          {OS_FEATURES.map(feature => {
            const featureValue = data.featureValues?.[feature] || 0;

            return (
              <div
                key={feature}
                className="bg-white/5 border border-white/20 rounded-lg p-4"
              >
                <label className="block text-white text-sm font-medium mb-3">{feature}</label>
                <div className="flex gap-2 flex-wrap">
                  {VALUE_OPTIONS.map(option => (
                    <label
                      key={option.value}
                      className={`
                        flex-1 min-w-[100px] p-2 rounded border text-center cursor-pointer transition-all
                        ${
                          featureValue === option.value
                            ? 'bg-purple-500/20 border-purple-400/50 text-white'
                            : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name={`feature-${feature}`}
                        value={option.value}
                        checked={featureValue === option.value}
                        onChange={() => handleFeatureValueChange(feature, option.value)}
                        className="sr-only"
                      />
                      <div className="text-xs font-medium">{option.value}</div>
                      <div className="text-xs text-white/60 mt-1">{option.label}</div>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        {errors.featureValues && (
          <p className="text-red-400 text-sm mt-1">{errors.featureValues}</p>
        )}
      </div>

      {/* Priority Feature */}
      <div>
        <label className="block text-white text-sm font-medium mb-3">
          If one feature went live first, which should it be? *
        </label>
        <div className="space-y-3">
          {OS_FEATURES.map(feature => (
            <label
              key={feature}
              className={`
                flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all
                ${
                  data.priorityFeature === feature
                    ? 'bg-purple-500/20 border-purple-400/50'
                    : 'bg-white/5 border-white/20 hover:bg-white/10'
                }
              `}
            >
              <input
                type="radio"
                name="priorityFeature"
                value={feature}
                checked={data.priorityFeature === feature}
                onChange={e => handleChange('priorityFeature', e.target.value)}
                className="w-4 h-4 mt-0.5 text-purple-500 focus:ring-purple-400"
              />
              <div className="flex-1">
                <span className="text-white text-sm">{feature}</span>
              </div>
            </label>
          ))}
        </div>
        {errors.priorityFeature && (
          <p className="text-red-400 text-sm mt-1">{errors.priorityFeature}</p>
        )}
      </div>

      {/* Adoption Blockers */}
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          What would stop you from adopting Stardust Creator OS? *
        </label>
        <textarea
          value={data.adoptionBlockers || ''}
          onChange={e => handleChange('adoptionBlockers', e.target.value)}
          placeholder="Share any concerns or blockers that would prevent you from adopting the Creator OS..."
          rows={4}
          className={`
            w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all resize-none
            ${
              errors.adoptionBlockers
                ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                : 'border-white/20 focus:border-purple-400'
            }
          `}
        />
        {errors.adoptionBlockers && (
          <p className="text-red-400 text-sm mt-1">{errors.adoptionBlockers}</p>
        )}
        <div className="text-right mt-1">
          <span className="text-gray-500 text-xs">{(data.adoptionBlockers || '').length}/1000</span>
        </div>
      </div>
    </div>
  );
}
