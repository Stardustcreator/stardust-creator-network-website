'use client';

import Button from '../ui/Button';
import FormInput from '../ui/FormInput';
import ToggleSwitch from './ToggleSwitch';
import { computePlatformBase, formatNaira } from './calculator.utils';
import type { CampaignType, PlatformKey, ReachState } from './types';

interface YourReachStepProps {
  campaign: CampaignType;
  reach: ReachState;
  onChange: (key: PlatformKey, patch: Partial<ReachState[PlatformKey]>) => void;
  ugcRate: string;
  onUgcRateChange: (value: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

const platforms: { key: PlatformKey; label: string }[] = [
  { key: 'instagram', label: 'Instagram' },
  { key: 'tiktok', label: 'Tiktok' },
  { key: 'twitter', label: 'X (Twitter)' },
  { key: 'youtube', label: 'Youtube' },
];

const INPUT_TEXT = 'text-sm bg-white';

function sanitizeNumeric(value: string) {
  return value.replace(/[^0-9.]/g, '');
}

export default function YourReachStep({
  campaign,
  reach,
  onChange,
  ugcRate,
  onUgcRateChange,
  onBack,
  onContinue,
}: YourReachStepProps) {
  const isUgc = campaign === 'ugc';

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">What&apos;s your reach?</h2>
        <p className="text-sm text-gray-600">
          {isUgc
            ? 'UGC campaigns use a flat production fee instead of platform reach.'
            : 'Toggle the platforms you use for this campaign and fill other details.'}
        </p>
      </div>

      {isUgc ? (
        <div className="mb-6">
          <FormInput
            label="Your flat UGC production rate (₦)"
            id="ugcRate"
            name="ugcRate"
            value={ugcRate}
            onChange={e => onUgcRateChange(sanitizeNumeric(e.target.value))}
            placeholder="Enter your flat UGC rate"
            inputMode="numeric"
            inputClassName={INPUT_TEXT}
            showFilledIndicator={false}
          />
          <p className="text-xs text-gray-500 mt-2">
            Your base rate for creating UGC content before usage, ads, or licensing fees are added.
          </p>
        </div>
      ) : (
        <div className="space-y-3 mb-6">
          {platforms.map(({ key, label }) => {
            const state = reach[key];
            const base = computePlatformBase(state);
            return (
              <div
                key={key}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center gap-3">
                  <ToggleSwitch
                    checked={state.enabled}
                    onChange={next => onChange(key, { enabled: next })}
                    label={label}
                  />
                  <button
                    type="button"
                    onClick={() => onChange(key, { enabled: !state.enabled })}
                    className="text-sm lg:text-base font-medium text-gray-900 cursor-pointer bg-transparent border-0 p-0 w-full text-left"
                  >
                    {label}
                  </button>
                </div>

                {state.enabled && (
                  <div className="mt-5 space-y-5">
                    <div>
                      <FormInput
                        label="Followers"
                        id={`${key}Followers`}
                        name={`${key}Followers`}
                        value={state.followers}
                        onChange={e =>
                          onChange(key, { followers: sanitizeNumeric(e.target.value) })
                        }
                        placeholder="Number of followers"
                        inputMode="numeric"
                        inputClassName={INPUT_TEXT}
                        showFilledIndicator={false}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Provide your total follower count on {label}
                      </p>
                    </div>

                    <div>
                      <FormInput
                        label="Engagement rate (%)"
                        id={`${key}Engagement`}
                        name={`${key}Engagement`}
                        value={state.engagementRate}
                        onChange={e =>
                          onChange(key, { engagementRate: sanitizeNumeric(e.target.value) })
                        }
                        placeholder="Engagement rate in %"
                        inputMode="decimal"
                        inputClassName={INPUT_TEXT}
                        showFilledIndicator={false}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        You can find it in your analytics or compute it using your recent engagement
                        data.
                      </p>
                    </div>

                    <div>
                      <FormInput
                        label="Rate per 1k (₦)"
                        id={`${key}RatePerThousand`}
                        name={`${key}RatePerThousand`}
                        value={state.ratePerThousand}
                        onChange={e =>
                          onChange(key, { ratePerThousand: sanitizeNumeric(e.target.value) })
                        }
                        placeholder="Enter your rate per 1k"
                        inputMode="numeric"
                        inputClassName={INPUT_TEXT}
                        showFilledIndicator={false}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        This is your cost per 1,000 audience reach or views.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1.5">
                        Calculated base
                      </label>
                      <div className="w-full px-3.5 py-2.5 text-sm font-medium text-text-secondary border border-stroke-primary rounded-md bg-transparent">
                        {formatNaira(base)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Back
        </button>
        <Button
          type="button"
          onClick={onContinue}
          variant="primary"
          className="py-2.5! text-sm!"
        >
          Continue
        </Button>
      </div>
    </>
  );
}
