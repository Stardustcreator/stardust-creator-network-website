'use client';

import { useState } from 'react';
import FormInput from '../../ui/FormInput';
import { computePlatformBase, formatNaira } from '../calculator.utils';
import { usePricingCalculator } from '@/lib/contexts';
import { INPUT_TEXT, type PlatformKey } from '../types';
import { sanitizeInteger, sanitizeDecimal, ChevronIcon, CellInput } from './shared';

const PLATFORMS: { key: PlatformKey; label: string }[] = [
  { key: 'instagram', label: 'Instagram' },
  { key: 'tiktok', label: 'TikTok' },
  { key: 'twitter', label: 'Twitter (X)' },
  { key: 'youtube', label: 'YouTube' },
];

export default function ReachSection() {
  const { campaign, reach, updateReach, ugcRate, setUgcRate } = usePricingCalculator();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const toggleItem = (key: string) => setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));

  const enabledPlatforms = PLATFORMS.filter(p => reach[p.key].enabled);

  return (
    <div className="border border-stroke-secondary rounded-md py-5 px-4">
      <h3 className="text-base font-semibold text-text-secondary mb-4">Your Reach</h3>

      {/* Mobile: per-platform accordion rows */}
      <div className="lg:hidden">
        {campaign === 'ugc' ? (
          <FormInput
            label="Your UGC base rate (₦)"
            id="ugcRate-mob"
            name="ugcRate-mob"
            value={ugcRate}
            onChange={e => setUgcRate(sanitizeInteger(e.target.value))}
            placeholder="Enter your base rate"
            inputMode="numeric"
            inputClassName={INPUT_TEXT}
            showFilledIndicator={false}
          />
        ) : enabledPlatforms.length > 0 ? (
          <div className="space-y-3">
            {enabledPlatforms.map(({ key, label }) => {
              const state = reach[key];
              const isOpen = !!openItems[key];
              return (
                <div
                  key={key}
                  className={`border border-stroke-tertiary px-4 rounded-md ${isOpen ? 'bg-surface-primary' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(key)}
                    className="w-full flex items-center justify-between py-3.5 text-sm font-medium text-text-primary"
                  >
                    {label}
                    <ChevronIcon open={isOpen} />
                  </button>
                  {isOpen && (
                    <div className="pb-4 space-y-4 pt-2">
                      <FormInput
                        label="Followers"
                        id={`mob-${key}-followers`}
                        name={`mob-${key}-followers`}
                        value={state.followers}
                        onChange={e =>
                          updateReach(key, { followers: sanitizeInteger(e.target.value) })
                        }
                        placeholder="Number of followers"
                        inputMode="numeric"
                        inputClassName={INPUT_TEXT}
                        showFilledIndicator={false}
                      />
                      <FormInput
                        label="Engagement rate (%)"
                        id={`mob-${key}-engagement`}
                        name={`mob-${key}-engagement`}
                        value={state.engagementRate}
                        onChange={e =>
                          updateReach(key, { engagementRate: sanitizeDecimal(e.target.value) })
                        }
                        placeholder="Engagement rate in %"
                        inputMode="decimal"
                        inputClassName={INPUT_TEXT}
                        showFilledIndicator={false}
                      />
                      <FormInput
                        label="Rate per 1k (₦)"
                        id={`mob-${key}-rate`}
                        name={`mob-${key}-rate`}
                        value={state.ratePerThousand}
                        onChange={e =>
                          updateReach(key, { ratePerThousand: sanitizeInteger(e.target.value) })
                        }
                        placeholder="Enter your rate per 1k"
                        inputMode="numeric"
                        inputClassName={INPUT_TEXT}
                        showFilledIndicator={false}
                      />
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-1.5">
                          Calculated base
                        </label>
                        <div className="w-full px-3.5 py-2.5 text-sm font-medium text-text-secondary border border-stroke-primary rounded-md bg-transparent">
                          {formatNaira(computePlatformBase(state))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-text-secondary">No platforms configured.</p>
        )}
      </div>

      {/* Desktop: table */}
      <div className="hidden lg:block">
        {campaign === 'ugc' ? (
          <FormInput
            label="Your UGC base rate (₦)"
            id="ugcRate"
            name="ugcRate"
            value={ugcRate}
            onChange={e => setUgcRate(sanitizeInteger(e.target.value))}
            placeholder="Enter your base rate"
            inputMode="numeric"
            inputClassName={INPUT_TEXT}
            showFilledIndicator={false}
          />
        ) : enabledPlatforms.length > 0 ? (
          <div>
            <div className="grid grid-cols-[110px_1fr_1fr_1fr_1fr] gap-4">
              <span />
              {['Followers', 'Engagement rate (%)', 'Rate per 1k', 'Calculated base'].map(h => (
                <span
                  key={h}
                  className="text-sm font-medium text-text-primary whitespace-nowrap"
                >
                  {h}
                </span>
              ))}
            </div>
            {enabledPlatforms.map(({ key, label }) => (
              <div
                key={key}
                className="grid grid-cols-[110px_1fr_1fr_1fr_1fr] py-3 gap-4 items-center"
              >
                <span className="text-base font-medium text-text-secondary">{label}</span>
                <CellInput
                  value={reach[key].followers}
                  onChange={v => updateReach(key, { followers: v })}
                />
                <CellInput
                  value={reach[key].engagementRate}
                  onChange={v => updateReach(key, { engagementRate: v })}
                  allowDecimal
                />
                <CellInput
                  value={reach[key].ratePerThousand}
                  onChange={v => updateReach(key, { ratePerThousand: v })}
                />
                <span className="text-sm text-text-primary bg-surface-disabled px-3.5 py-2.5 rounded-[6px] border border-stroke-primary">
                  {formatNaira(computePlatformBase(reach[key]))}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-secondary">No platforms configured.</p>
        )}
      </div>
    </div>
  );
}
