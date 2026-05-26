'use client';

import Button from '../ui/Button';
import FormInput from '../ui/FormInput';
import ToggleSwitch from './ToggleSwitch';
import { getVisibleDeliverables } from './calculator.utils';
import { usePricingCalculator } from '@/lib/contexts';
import { INPUT_TEXT, type DeliverableKey } from './types';

interface DeliverablesStepProps {
  onBack: () => void;
  onContinue: () => void;
}

const industryStandards: Record<DeliverableKey, string> = {
  igReel: '1.2x',
  igStory: '0.4x',
  tiktokVideo: '1.2x',
  youtubeShorts: '1.2x',
  youtubeLong: '3.0x',
  twitterPost: '0.5x',
  ugcShortVideo: '1.2x',
  ugcLongVideo: '3.0x',
  ugcPhotos: '0.5x',
  brandIg: '0.6x',
  brandTiktok: '0.6x',
  brandTwitter: '0.5x',
};

function sanitizeDecimal(value: string) {
  return value.replace(/[^0-9.]/g, '');
}

function sanitizeInteger(value: string) {
  return value.replace(/[^0-9]/g, '');
}

export default function DeliverablesStep({ onBack, onContinue }: DeliverablesStepProps) {
  const { campaign, reach, deliverables, updateDeliverable: onChange } = usePricingCalculator();
  const items = getVisibleDeliverables(campaign, reach);

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">What content will you deliver?</h2>
        <p className="text-sm text-text-secondary">
          Add how many of each content type the brand is asking for. Only your active platforms show
          here.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="mb-6 p-4 rounded-lg border border-dashed border-amber-300 bg-amber-50 text-sm text-amber-800">
          Enable at least one platform in step 2 to see deliverable options here.
        </div>
      ) : (
        <div className="space-y-3 mb-6">
          {items.map(({ key, label }) => {
            const state = deliverables[key];
            const industryStandard = industryStandards[key];
            return (
              <div
                key={key}
                className="bg-surface-primary border border-stroke-tertiary rounded-lg p-4"
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
                        label="Multipliers"
                        id={`${key}Multipliers`}
                        name={`${key}Multipliers`}
                        value={state.multiplier}
                        onChange={e =>
                          onChange(key, { multiplier: sanitizeDecimal(e.target.value) })
                        }
                        placeholder="Enter multiplier (e.g. 1.4)"
                        inputMode="decimal"
                        inputClassName={INPUT_TEXT}
                        showFilledIndicator={false}
                      />
                      <p className="text-xs text-text-secondary mt-1">
                        This multiplier adjusts your base rate based on content type, usage, and
                        campaign scope.{' '}
                        <span className="text-info-700 font-medium">
                          (Industry standard: {industryStandard})
                        </span>
                      </p>
                    </div>

                    <div>
                      <FormInput
                        label="Quantity"
                        id={`${key}Quantity`}
                        name={`${key}Quantity`}
                        value={state.quantity}
                        onChange={e => onChange(key, { quantity: sanitizeInteger(e.target.value) })}
                        placeholder="Enter quantity"
                        inputMode="numeric"
                        inputClassName={INPUT_TEXT}
                        showFilledIndicator={false}
                      />
                      <p className="text-xs text-text-secondary mt-1">
                        Number of content you are expected to provide
                      </p>
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
          className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Back
        </button>
        <Button
          type="button"
          onClick={onContinue}
          variant="primary"
          className="py-2.5! text-sm! rounded-md"
        >
          Continue
        </Button>
      </div>
    </>
  );
}
