'use client';

import Button from '../ui/Button';
import FormInput from '../ui/FormInput';
import ToggleSwitch from './ToggleSwitch';
import { usePricingCalculator } from '@/lib/contexts';
import { INPUT_TEXT, type UsageRateKey } from './types';

interface RightsAndQuoteStepProps {
  onBack: () => void;
  onSubmit: () => void;
}

const usageRateOptions: { key: UsageRateKey; label: string }[] = [
  { key: 'adsOnPaidSocial', label: 'Ads on Paid Social' },
  { key: 'emailWebsite', label: 'Email | Website' },
  { key: 'inStoreBillboards', label: 'In-Store | Billboards' },
];

function sanitizeInteger(value: string) {
  return value.replace(/[^0-9]/g, '');
}

export default function RightsAndQuoteStep({ onBack, onSubmit }: RightsAndQuoteStepProps) {
  const {
    exclusivityMonths,
    setExclusivityMonths: onExclusivityMonthsChange,
    exclusivityRate,
    setExclusivityRate: onExclusivityRateChange,
    usageDuration,
    setUsageDuration: onUsageDurationChange,
    usageRates,
    updateUsageRate: onUsageRatesChange,
    discountRate,
    setDiscountRate: onDiscountRateChange,
    emailAddress,
    setEmailAddress: onEmailAddressChange,
  } = usePricingCalculator();
  return (
    <>
      <div className="">
        <h3 className="text-base font-semibold text-gray-900 mb-1">Exclusivity Lock-Out</h3>
        <p className="text-sm text-text-secondary mb-4">
          Set the duration and the rate you agree to remain exclusive to this brand.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FormInput
              label="Number of months"
              id={`exclusivityMonths`}
              name={`exclusivityMonths`}
              value={exclusivityMonths}
              onChange={e => onExclusivityMonthsChange(sanitizeInteger(e.target.value))}
              placeholder="Enter no of months"
              inputMode="numeric"
              inputClassName={INPUT_TEXT}
              showFilledIndicator={false}
            />
            <p className="text-xs text-text-secondary mt-1">
              Set how long work with competing brands will be restricted.
            </p>
          </div>

          <div>
            <FormInput
              label="Your Exclusive rate (%)"
              id={`exclusivityRate`}
              name={`exclusivityRate`}
              value={exclusivityRate}
              onChange={e => onExclusivityRateChange(sanitizeInteger(e.target.value))}
              placeholder="Enter rate percentage"
              inputMode="numeric"
              inputClassName={INPUT_TEXT}
              showFilledIndicator={false}
            />
            <p className="text-xs text-text-secondary mt-1">
              Set the additional charge applied for exclusivity.
            </p>
          </div>
        </div>
      </div>
      <div className="h-px w-full bg-surface-secondary my-6" />

      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900 mb-1">Usage & Licensing Duration</h3>
        <p className="text-sm text-text-secondary mb-4">
          Configure the active period for content usage, promotions, and media rights.
        </p>

        <div>
          <label
            htmlFor="usageDuration"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Number of months
          </label>
          <select
            id="usageDuration"
            value={usageDuration}
            onChange={e => onUsageDurationChange(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm text-gray-900 border border-gray-300 rounded-[6px] focus-visible:outline-none! bg-surface-primary focus:outline-none focus:ring-2 focus:ring-surface-action focus:border-transparent transition-all cursor-pointer"
          >
            <option
              value=""
              disabled
            >
              Select number of months
            </option>
            <option value="3">3 Months (Industry standard: 1.2x)</option>
            <option value="6">6 Months (Industry standard: 1.2x)</option>
            <option value="12">12 Months (Industry standard: 1.2x)</option>
          </select>
          <p className="text-xs text-text-secondary mt-1">How long the brand can use your.</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900 mb-1">Custom Usage rate</h3>
        <p className="text-sm text-text-secondary mb-4">
          Set custom percentage rates for different advertising and digital usage channels.
        </p>

        <div className="space-y-3">
          {usageRateOptions.map(({ key, label }) => {
            const state = usageRates[key];
            return (
              <div
                key={key}
                className="bg-surface-primary border border-stroke-tertiary rounded-lg p-4"
              >
                <div className="flex items-center gap-3">
                  <ToggleSwitch
                    checked={state.enabled}
                    onChange={next => onUsageRatesChange(key, { enabled: next })}
                    label={label}
                  />
                  <button
                    type="button"
                    onClick={() => onUsageRatesChange(key, { enabled: !state.enabled })}
                    className="text-base font-medium text-gray-900 cursor-pointer bg-transparent border-0 p-0 w-full text-left"
                  >
                    {label}
                  </button>
                </div>

                {state.enabled && (
                  <div className="mt-4">
                    <FormInput
                      label="Custom Percentage"
                      id={`${key}CustomPercentage`}
                      name={`${key}CustomPercentage`}
                      value={state.percentage}
                      onChange={e =>
                        onUsageRatesChange(key, { percentage: sanitizeInteger(e.target.value) })
                      }
                      placeholder="Enter custom percentage"
                      inputMode="numeric"
                      inputClassName={INPUT_TEXT}
                      showFilledIndicator={false}
                    />
                    <p className="text-xs text-text-secondary mt-1">
                      Define your percentage share for ads or digital content usage.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900 mb-1">Discount</h3>
        <p className="text-sm text-text-secondary mb-4">
          Set a discount percentage that will be applied to this deal.
        </p>

        <div>
          <FormInput
            label="Discount rate (%)"
            id="discountRate"
            name="discountRate"
            value={discountRate}
            onChange={e => onDiscountRateChange(sanitizeInteger(e.target.value))}
            placeholder="Enter percentage discount"
            inputMode="numeric"
            inputClassName={INPUT_TEXT}
            showFilledIndicator={false}
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900 mb-1">Get Quote (Invoice)</h3>
        <p className="text-sm text-text-secondary mb-4">
          Provide your email address where the quote will be sent to.
        </p>

        <div>
          <FormInput
            label="Your email address"
            id="emailAddress"
            name="emailAddress"
            value={emailAddress}
            onChange={e => onEmailAddressChange(e.target.value)}
            placeholder="Enter email address"
            inputMode="email"
            inputClassName={INPUT_TEXT}
            showFilledIndicator={false}
          />
        </div>
      </div>

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
          onClick={onSubmit}
          variant="primary"
          className="py-2.5! text-sm! rounded-md"
          disabled={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress.trim())}
        >
          Preview quote
        </Button>
      </div>
    </>
  );
}
