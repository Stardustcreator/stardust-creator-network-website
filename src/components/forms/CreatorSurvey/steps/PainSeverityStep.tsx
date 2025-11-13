import { useCallback } from 'react';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type {
  PainSeverityFrequency,
  CreatorSurveyData,
  PainIssue,
  Frequency,
} from '@/types/creator-survey.types';
import { PAIN_ISSUES, FREQUENCY_OPTIONS } from '@/types/creator-survey.types';

interface PainSeverityStepProps {
  data?: Partial<PainSeverityFrequency>;
  errors?: Partial<Record<string, string>>;
  updateSurveyData: <K extends keyof CreatorSurveyData>(
    section: K,
    data: Partial<CreatorSurveyData[K]>
  ) => void;
}

const SEVERITY_OPTIONS = [
  { value: 1, label: 'Not painful' },
  { value: 2, label: 'Slightly painful' },
  { value: 3, label: 'Moderately painful' },
  { value: 4, label: 'Very painful' },
  { value: 5, label: 'Extremely painful' },
];

export default function PainSeverityStep({ data = {}, updateSurveyData }: PainSeverityStepProps) {
  const handleChange = useCallback(
    (issue: PainIssue, field: 'frequency' | 'severity', value: Frequency | number) => {
      const currentIssues = (data.issues || {}) as Partial<
        Record<PainIssue, { frequency: Frequency; severity: number }>
      >;
      const currentIssue = currentIssues[issue] || { frequency: 'Never' as Frequency, severity: 1 };

      updateSurveyData('painSeverityFrequency', {
        issues: {
          ...currentIssues,
          [issue]: {
            ...currentIssue,
            [field]: value,
          },
        } as Record<PainIssue, { frequency: Frequency; severity: number }>,
      });
    },
    [data.issues, updateSurveyData]
  );

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Heading
          level={2}
          className="!text-white text-xl mb-2"
        >
          Pain Points & Frequency
        </Heading>
        <Text
          variant="body"
          className="text-white opacity-80"
        >
          Rate how often you face each issue and how painful it is
        </Text>
      </div>

      <div className="space-y-6">
        {PAIN_ISSUES.map(issue => {
          const issueData = data.issues?.[issue];

          return (
            <div
              key={issue}
              className="bg-white/5 border border-white/20 rounded-lg p-6"
            >
              <h3 className="text-white font-medium mb-4">{issue}</h3>

              {/* Frequency */}
              <div className="mb-4">
                <label className="block text-white/80 text-sm font-medium mb-2">
                  How often do you face this issue?
                </label>
                <div className="flex gap-2 flex-wrap">
                  {FREQUENCY_OPTIONS.map(freq => (
                    <label
                      key={freq}
                      className={`
                        flex-1 min-w-[100px] p-2 rounded border text-center cursor-pointer transition-all
                        ${
                          issueData?.frequency === freq
                            ? 'bg-purple-500/20 border-purple-400/50 text-white'
                            : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name={`frequency-${issue}`}
                        value={freq}
                        checked={issueData?.frequency === freq}
                        onChange={() => handleChange(issue, 'frequency', freq)}
                        className="sr-only"
                      />
                      <span className="text-xs font-medium">{freq}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Severity */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  How painful is this issue? (1-5)
                </label>
                <div className="flex gap-2 flex-wrap">
                  {SEVERITY_OPTIONS.map(option => (
                    <label
                      key={option.value}
                      className={`
                        flex-1 min-w-[100px] p-2 rounded border text-center cursor-pointer transition-all
                        ${
                          issueData?.severity === option.value
                            ? 'bg-purple-500/20 border-purple-400/50 text-white'
                            : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name={`severity-${issue}`}
                        value={option.value}
                        checked={issueData?.severity === option.value}
                        onChange={() => handleChange(issue, 'severity', option.value)}
                        className="sr-only"
                      />
                      <div className="text-sm font-medium">{option.value}</div>
                      <div className="text-xs text-white/60 mt-1">{option.label}</div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
