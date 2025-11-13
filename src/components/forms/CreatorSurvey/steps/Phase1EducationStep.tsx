import { useCallback } from 'react';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type { Phase1EducationCommunity, CreatorSurveyData } from '@/types/creator-survey.types';
import { EDUCATION_TOPICS } from '@/types/creator-survey.types';

interface Phase1EducationStepProps {
  data?: Partial<Phase1EducationCommunity>;
  errors?: Partial<Record<keyof Phase1EducationCommunity, string>>;
  updateSurveyData: <K extends keyof CreatorSurveyData>(
    section: K,
    data: Partial<CreatorSurveyData[K]>
  ) => void;
}

const HELPFULNESS_OPTIONS = [
  { value: 1, label: 'Not at all' },
  { value: 2, label: 'Slightly' },
  { value: 3, label: 'Moderately' },
  { value: 4, label: 'Very' },
  { value: 5, label: 'Extremely' },
];

const LIKELIHOOD_OPTIONS = [
  { value: 1, label: 'Very unlikely' },
  { value: 2, label: 'Unlikely' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Likely' },
  { value: 5, label: 'Very likely' },
];

export default function Phase1EducationStep({
  data = {},
  errors = {},
  updateSurveyData,
}: Phase1EducationStepProps) {
  const handleChange = useCallback(
    (field: keyof Phase1EducationCommunity, value: number | string | string[]) => {
      updateSurveyData('phase1EducationCommunity', { [field]: value });
    },
    [updateSurveyData]
  );

  const handleTopicToggle = useCallback(
    (topic: string) => {
      const currentTopics = data.prioritizedTopics || [];
      const typedTopic = topic as (typeof EDUCATION_TOPICS)[number];
      if (currentTopics.includes(typedTopic)) {
        handleChange(
          'prioritizedTopics',
          currentTopics.filter(t => t !== typedTopic)
        );
      } else if (currentTopics.length < 3) {
        handleChange('prioritizedTopics', [...currentTopics, typedTopic]);
      }
    },
    [data.prioritizedTopics, handleChange]
  );

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Heading
          level={2}
          className="!text-white text-xl mb-2"
        >
          Education & Community
        </Heading>
        <Text
          variant="body"
          className="text-white opacity-80"
        >
          Help us understand what would be most valuable for you
        </Text>
      </div>

      {/* Helpfulness Ratings */}
      <div>
        <Text
          variant="body"
          className="text-white mb-4"
        >
          How helpful would each be for you in the next 3 months? (1=Not at all → 5=Extremely)
        </Text>
        <div className="space-y-6">
          {[
            {
              key: 'creatorClinicsHelpfulness' as const,
              label: 'Creator-led Creator Clinics (pricing, packaging, sales)',
            },
            {
              key: 'peerCirclesHelpfulness' as const,
              label: 'Peer circles (accountability, rate sharing, networking)',
            },
            {
              key: 'virtualWorkshopsHelpfulness' as const,
              label: 'Virtual/Live workshops (YouTube/TikTok monetization)',
            },
            {
              key: 'templatesHelpfulness' as const,
              label: 'Templates (briefs, media kits, invoices, rights)',
            },
            {
              key: 'officeHoursHelpfulness' as const,
              label: 'Office hours with experts (legal/finance)',
            },
            { key: 'onlineCoursesHelpfulness' as const, label: 'Online Courses' },
          ].map(({ key, label }) => (
            <div
              key={key}
              className="bg-white/5 border border-white/20 rounded-lg p-4"
            >
              <label className="block text-white text-sm font-medium mb-3">{label}</label>
              <div className="flex gap-2 flex-wrap">
                {HELPFULNESS_OPTIONS.map(option => (
                  <label
                    key={option.value}
                    className={`
                      flex-1 min-w-[80px] p-2 rounded border text-center cursor-pointer transition-all
                      ${
                        data[key] === option.value
                          ? 'bg-purple-500/20 border-purple-400/50 text-white'
                          : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name={key}
                      value={option.value}
                      checked={data[key] === option.value}
                      onChange={() => handleChange(key, option.value)}
                      className="sr-only"
                    />
                    <div className="text-xs font-medium">{option.value}</div>
                    <div className="text-xs text-white/60 mt-1">{option.label}</div>
                  </label>
                ))}
              </div>
              {errors[key] && <p className="text-red-400 text-sm mt-1">{errors[key]}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Prioritized Topics */}
      <div>
        <label className="block text-white text-sm font-medium mb-3">
          What topics would you prioritize? (Pick top 3) *
        </label>
        <div className="space-y-3">
          {EDUCATION_TOPICS.map(topic => {
            const isSelected = data.prioritizedTopics?.includes(topic) || false;
            const isDisabled = !isSelected && (data.prioritizedTopics?.length || 0) >= 3;
            return (
              <label
                key={topic}
                className={`
                  flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all
                  ${
                    isSelected
                      ? 'bg-purple-500/20 border-purple-400/50'
                      : isDisabled
                        ? 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
                        : 'bg-white/5 border-white/20 hover:bg-white/10'
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleTopicToggle(topic)}
                  disabled={isDisabled}
                  className="w-4 h-4 mt-0.5 text-purple-500 focus:ring-purple-400 rounded"
                />
                <div className="flex-1">
                  <span
                    className={`text-sm ${isSelected ? 'text-white font-medium' : isDisabled ? 'text-white/30' : 'text-white'}`}
                  >
                    {topic}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
        {errors.prioritizedTopics && (
          <p className="text-red-400 text-sm mt-1">{errors.prioritizedTopics}</p>
        )}
        {data.prioritizedTopics && data.prioritizedTopics.length > 0 && (
          <p className="text-gray-400 text-sm mt-2">
            Selected: {data.prioritizedTopics.length} of 3
          </p>
        )}
      </div>

      {/* Paid Community Likelihood */}
      <div>
        <label className="block text-white text-sm font-medium mb-3">
          How likely are you to join a paid creator community if it accelerates your monetization by
          10 times? *
        </label>
        <div className="flex gap-2 flex-wrap">
          {LIKELIHOOD_OPTIONS.map(option => (
            <label
              key={option.value}
              className={`
                flex-1 min-w-[100px] p-3 rounded border text-center cursor-pointer transition-all
                ${
                  data.paidCommunityLikelihood === option.value
                    ? 'bg-purple-500/20 border-purple-400/50 text-white'
                    : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                }
              `}
            >
              <input
                type="radio"
                name="paidCommunityLikelihood"
                value={option.value}
                checked={data.paidCommunityLikelihood === option.value}
                onChange={() => handleChange('paidCommunityLikelihood', option.value)}
                className="sr-only"
              />
              <div className="text-sm font-medium">{option.value}</div>
              <div className="text-xs text-white/60 mt-1">{option.label}</div>
            </label>
          ))}
        </div>
        {errors.paidCommunityLikelihood && (
          <p className="text-red-400 text-sm mt-1">{errors.paidCommunityLikelihood}</p>
        )}
      </div>

      {/* Paid Community Expectations */}
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          What would you expect from a paid community to feel worth it? *
        </label>
        <textarea
          value={data.paidCommunityExpectations || ''}
          onChange={e => handleChange('paidCommunityExpectations', e.target.value)}
          placeholder="Share your expectations for a paid creator community..."
          rows={4}
          className={`
            w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all resize-none
            ${
              errors.paidCommunityExpectations
                ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                : 'border-white/20 focus:border-purple-400'
            }
          `}
        />
        {errors.paidCommunityExpectations && (
          <p className="text-red-400 text-sm mt-1">{errors.paidCommunityExpectations}</p>
        )}
        <div className="text-right mt-1">
          <span className="text-gray-500 text-xs">
            {(data.paidCommunityExpectations || '').length}/1000
          </span>
        </div>
      </div>
    </div>
  );
}
