import { useCallback } from 'react';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type {
  TimelineDeliverables,
  Country,
  BrandBriefFormData,
  Deliverable,
} from '@/types/brand-brief.types';
import { CAMPAIGN_DURATIONS, DELIVERABLES } from '@/types/brand-brief.types';

interface TimelineDeliverablesStepProps {
  data?: Partial<TimelineDeliverables>;
  errors?: Partial<Record<keyof TimelineDeliverables, string>>;
  updateFormData: <K extends keyof BrandBriefFormData>(
    section: K,
    data: Partial<BrandBriefFormData[K]>
  ) => void;
  country: Country;
}

export default function TimelineDeliverablesStep({
  data = {},
  errors = {},
  updateFormData,
  country: _country, // eslint-disable-line @typescript-eslint/no-unused-vars
}: TimelineDeliverablesStepProps) {
  const handleInputChange = useCallback(
    (field: keyof TimelineDeliverables, value: string) => {
      updateFormData('timelineDeliverables', { [field]: value });
    },
    [updateFormData]
  );

  const handleDeliverablesChange = useCallback(
    (value: string) => {
      const currentValues = (data.deliverables as string[]) || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];

      updateFormData('timelineDeliverables', {
        deliverables: newValues as Array<(typeof DELIVERABLES)[number]>,
      });
    },
    [data, updateFormData]
  );

  // Get today's date for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-3 py-1 mb-4">
          <span className="text-purple-300 text-sm font-medium">Section 5</span>
        </div>

        <Heading
          level={1}
          className="text-white text-2xl md:text-3xl mb-2"
        >
          Timeline & Deliverables
        </Heading>

        <Text
          variant="large"
          className="text-white opacity-80"
        >
          When would you like to launch?
        </Text>
      </div>

      {/* Form Fields */}
      <div className="space-y-8">
        {/* Campaign Start Date */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">Campaign Start Date *</label>
          <input
            type="date"
            value={data.campaignStartDate || ''}
            min={today}
            onChange={e => handleInputChange('campaignStartDate', e.target.value)}
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white 
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all
              ${
                errors.campaignStartDate
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-purple-400'
              }
            `}
          />
          {errors.campaignStartDate && (
            <p className="text-red-400 text-sm mt-1">{errors.campaignStartDate}</p>
          )}
        </div>

        {/* Campaign Duration */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">Campaign Duration *</label>
          <select
            value={data.campaignDuration || ''}
            onChange={e => handleInputChange('campaignDuration', e.target.value)}
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white 
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all appearance-none
              ${
                errors.campaignDuration
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-purple-400'
              }
            `}
          >
            <option
              value=""
              className="bg-gray-900"
            >
              Select campaign duration
            </option>
            {CAMPAIGN_DURATIONS.map(duration => (
              <option
                key={duration}
                value={duration}
                className="bg-gray-900"
              >
                {duration}
              </option>
            ))}
          </select>
          {errors.campaignDuration && (
            <p className="text-red-400 text-sm mt-1">{errors.campaignDuration}</p>
          )}
        </div>

        {/* Deliverables (Multi-select) */}
        <div>
          <label className="block text-white text-sm font-medium mb-3">
            Deliverables * <span className="text-gray-400 text-xs">(Select multiple)</span>
          </label>
          <div className="space-y-3">
            {DELIVERABLES.map(deliverable => (
              <label
                key={deliverable}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all
                  ${
                    (data.deliverables as Deliverable[])?.includes(deliverable)
                      ? 'bg-purple-500/20 border-purple-400/50'
                      : 'bg-white/5 border-white/20 hover:bg-white/10'
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={(data.deliverables as Deliverable[])?.includes(deliverable) || false}
                  onChange={() => handleDeliverablesChange(deliverable)}
                  className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-400"
                />
                <span className="text-white text-sm">{deliverable}</span>
              </label>
            ))}
          </div>
          {errors.deliverables && (
            <p className="text-red-400 text-sm mt-1">{errors.deliverables}</p>
          )}
        </div>
      </div>

      {/* Timeline Tip */}
      <div className="mt-8 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-green-500/20 rounded-full flex-shrink-0 mt-0.5">
            <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-1.5"></div>
          </div>
          <div>
            <Text
              variant="small"
              className="text-green-200 font-medium mb-1"
            >
              Planning Tip
            </Text>
            <Text
              variant="small"
              className="text-green-300/80"
            >
              Allow 2-3 weeks for creator matching, brief reviews, and content planning before your
              campaign start date for the best results.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
