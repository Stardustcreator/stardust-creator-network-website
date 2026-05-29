'use client';

import FormInput from '../../ui/FormInput';
import { usePricingCalculator } from '@/lib/contexts';
import { INPUT_TEXT } from '../types';
import { sanitizeInteger } from './shared';

export default function RightsAndUsageSection() {
  const {
    exclusivityMonths,
    setExclusivityMonths,
    exclusivityRate,
    setExclusivityRate,
    usageDuration,
    setUsageDuration,
    discountRate,
    setDiscountRate,
  } = usePricingCalculator();

  return (
    <div className="border border-stroke-secondary rounded-md py-5 px-4">
      <h3 className="text-base font-semibold text-text-secondary mb-4">Rights & Usage</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <FormInput
            label="Exclusivity (months)"
            id="prev-exclusivityMonths"
            name="prev-exclusivityMonths"
            value={exclusivityMonths}
            onChange={e => setExclusivityMonths(sanitizeInteger(e.target.value))}
            placeholder="—"
            inputMode="numeric"
            inputClassName={INPUT_TEXT}
            showFilledIndicator={false}
          />
        </div>
        <div>
          <FormInput
            label="Exclusivity rate (%)"
            id="prev-exclusivityRate"
            name="prev-exclusivityRate"
            value={exclusivityRate}
            onChange={e => setExclusivityRate(sanitizeInteger(e.target.value))}
            placeholder="—"
            inputMode="numeric"
            inputClassName={INPUT_TEXT}
            showFilledIndicator={false}
          />
        </div>
        <div>
          <label
            htmlFor="prev-usageDuration"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Usage duration
          </label>
          <select
            id="prev-usageDuration"
            value={usageDuration}
            onChange={e => setUsageDuration(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm text-text-primary border border-stroke-primary rounded-[6px] bg-transparent focus:outline-none focus:ring-2 focus:ring-surface-action focus:border-transparent transition-all cursor-pointer"
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
        </div>
        <div>
          <FormInput
            label="Discount (%)"
            id="prev-discountRate"
            name="prev-discountRate"
            value={discountRate}
            onChange={e => setDiscountRate(sanitizeInteger(e.target.value))}
            placeholder="—"
            inputMode="numeric"
            inputClassName={INPUT_TEXT}
            showFilledIndicator={false}
          />
        </div>
      </div>
    </div>
  );
}
