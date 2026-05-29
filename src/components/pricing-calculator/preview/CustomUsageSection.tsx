'use client';

import { usePricingCalculator } from '@/lib/contexts';
import type { UsageRateKey } from '../types';
import { sanitizeInteger } from './shared';
import { useIsDesktop } from './useIsDesktop';

const USAGE_CHANNELS: { key: UsageRateKey; label: string }[] = [
  { key: 'adsOnPaidSocial', label: 'Ads on Paid Social' },
  { key: 'emailWebsite', label: 'Email / Website' },
  { key: 'inStoreBillboards', label: 'In-store / Billboards' },
];

export default function CustomUsageSection() {
  const { usageRates, updateUsageRate } = usePricingCalculator();
  const isDesktop = useIsDesktop();
  const placeholder = isDesktop ? 'Enter custom percentage' : 'Enter custom %';

  return (
    <div className="border border-stroke-secondary rounded-md py-5 px-4">
      <h3 className="text-base font-semibold text-text-secondary mb-4">Custom Usage Channels</h3>
      <div className="space-y-3.5">
        {USAGE_CHANNELS.map(({ key, label }) => (
          <div
            key={key}
            className="flex items-center justify-between px-4 py-2 border border-stroke-secondary rounded-md"
          >
            <span className="text-sm text-gray-900">{label}</span>
            <input
              value={usageRates[key].percentage}
              onChange={e => {
                const val = sanitizeInteger(e.target.value);
                updateUsageRate(key, { percentage: val, enabled: val.length > 0 });
              }}
              placeholder={placeholder}
              inputMode="numeric"
              className="w-1/2 lg:w-1/3 text-sm border border-stroke-primary rounded-[6px] py-2.5 px-3.5 focus-visible:outline-none! focus:outline-none focus:ring-2 focus:ring-surface-action text-text-primary bg-transparent outline-none placeholder:text-text-secondary"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
