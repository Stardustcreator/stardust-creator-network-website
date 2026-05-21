'use client';

import Button from '../ui/Button';
import FormInput from '../ui/FormInput';
import ToggleSwitch from './ToggleSwitch';
import { formatNaira, type QuoteBreakdown } from './calculator.utils';
import { INPUT_TEXT, type UsageRateKey, type UsageRatesState } from './types';

interface RightsAndQuoteStepProps {
  exclusivityMonths: string;
  onExclusivityMonthsChange: (value: string) => void;
  exclusivityRate: string;
  onExclusivityRateChange: (value: string) => void;
  usageDuration: string;
  onUsageDurationChange: (value: string) => void;
  usageRates: UsageRatesState;
  onUsageRatesChange: (key: UsageRateKey, patch: Partial<UsageRatesState[UsageRateKey]>) => void;
  discountRate: string;
  onDiscountRateChange: (value: string) => void;
  emailAddress: string;
  onEmailAddressChange: (value: string) => void;
  quote: QuoteBreakdown;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

const usageRateOptions: { key: UsageRateKey; label: string }[] = [
  { key: 'adsOnPaidSocial', label: 'Ads on Paid Social' },
  { key: 'emailWebsite', label: 'Email | Website' },
  { key: 'inStoreBillboards', label: 'In-Store | Billboards' },
];

function sanitizeInteger(value: string) {
  return value.replace(/[^0-9]/g, '');
}

export default function RightsAndQuoteStep({
  exclusivityMonths,
  onExclusivityMonthsChange,
  exclusivityRate,
  onExclusivityRateChange,
  usageDuration,
  onUsageDurationChange,
  usageRates,
  onUsageRatesChange,
  discountRate,
  onDiscountRateChange,
  emailAddress,
  onEmailAddressChange,
  quote,
  onBack,
  onSubmit,
  isSubmitting = false,
}: RightsAndQuoteStepProps) {
  return (
    <>
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900 mb-1">Exclusivity Lock-Out</h3>
        <p className="text-sm text-gray-600 mb-4">
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
            <p className="text-xs text-gray-500 mt-1">
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
            <p className="text-xs text-gray-500 mt-1">
              Set the additional charge applied for exclusivity.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900 mb-1">Usage & Licensing Duration</h3>
        <p className="text-sm text-gray-600 mb-4">
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
            className="w-full px-4 py-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all cursor-pointer"
          >
            <option value="">Select number of months</option>
            <option value="3">3 Months</option>
            <option value="6">6 Months</option>
            <option value="12">12 Months</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            How long the brand can use your content across selected channels.
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900 mb-1">Custom Usage rate</h3>
        <p className="text-sm text-gray-600 mb-4">
          Set custom percentage rates for different advertising and digital usage channels.
        </p>

        <div className="space-y-3">
          {usageRateOptions.map(({ key, label }) => {
            const state = usageRates[key];
            return (
              <div
                key={key}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4"
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
                    className="text-base font-medium text-gray-900 cursor-pointer bg-transparent border-0 p-0"
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
                    <p className="text-xs text-gray-500 mt-1">
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
        <p className="text-sm text-gray-600 mb-4">
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
        <p className="text-sm text-gray-600 mb-4">
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

      <div className="mb-6 rounded-lg bg-gray-900 text-white p-5 hidden">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-300">Subtotal (Content)</span>
          <span>{formatNaira(quote.subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-300">Rights & Licensing</span>
          <span>+ {formatNaira(quote.licensing)}</span>
        </div>
        <div className="flex justify-between text-sm mb-3 text-red-300">
          <span>Discount</span>
          <span>- {formatNaira(quote.discount)}</span>
        </div>
        <div className="flex justify-between border-t border-dashed border-gray-600 pt-3">
          <span className="text-base font-semibold">Final quote</span>
          <span className="text-xl font-bold text-emerald-400">
            {formatNaira(quote.finalTotal)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <Button
          type="button"
          onClick={onSubmit}
          variant="primary"
          className="py-2.5! text-sm!"
          disabled={isSubmitting || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress.trim())}
        >
          {isSubmitting ? 'Generating PDF…' : 'Get full quote'}
        </Button>
      </div>
    </>
  );
}
