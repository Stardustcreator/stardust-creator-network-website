'use client';

import { useState } from 'react';
import FormInput from '../../ui/FormInput';
import { getVisibleDeliverables } from '../calculator.utils';
import { usePricingCalculator } from '@/lib/contexts';
import { INPUT_TEXT, type DeliverableKey } from '../types';
import { sanitizeInteger, sanitizeDecimal, ChevronIcon, CellInput } from './shared';

const DELIVERABLE_STANDARDS: Record<DeliverableKey, string> = {
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

export default function DeliverablesSection() {
  const { campaign, reach, deliverables, updateDeliverable } = usePricingCalculator();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const toggleItem = (key: string) => setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));

  const visibleDeliverables = getVisibleDeliverables(campaign, reach);
  const enabledDeliverables = visibleDeliverables.filter(d => deliverables[d.key].enabled);

  return (
    <div className="border border-stroke-secondary rounded-md py-5 px-4">
      <h3 className="text-base font-semibold text-text-secondary mb-4">Deliverables</h3>

      {/* Mobile: per-deliverable accordion rows */}
      <div className="lg:hidden">
        {enabledDeliverables.length === 0 ? (
          <p className="text-sm text-text-secondary">No deliverables selected.</p>
        ) : (
          <div className="space-y-3">
            {enabledDeliverables.map(({ key, label }) => {
              const state = deliverables[key];
              const isOpen = !!openItems[key];
              return (
                <div
                  key={key}
                  className={`border border-stroke-tertiary rounded-md px-4 ${isOpen ? 'bg-surface-primary' : ''}`}
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
                      <div>
                        <FormInput
                          label="Multiplier"
                          id={`mob-${key}-multiplier`}
                          name={`mob-${key}-multiplier`}
                          value={state.multiplier}
                          onChange={e =>
                            updateDeliverable(key, { multiplier: sanitizeDecimal(e.target.value) })
                          }
                          placeholder="e.g. 1.2"
                          inputMode="decimal"
                          inputClassName={INPUT_TEXT}
                          showFilledIndicator={false}
                        />
                        <p className="text-xs text-text-secondary mt-1">
                          Industry standard:{' '}
                          <span className="text-info-700 font-medium">
                            {DELIVERABLE_STANDARDS[key]}
                          </span>
                        </p>
                      </div>
                      <FormInput
                        label="Quantity"
                        id={`mob-${key}-quantity`}
                        name={`mob-${key}-quantity`}
                        value={state.quantity}
                        onChange={e =>
                          updateDeliverable(key, { quantity: sanitizeInteger(e.target.value) })
                        }
                        placeholder="Number of pieces"
                        inputMode="numeric"
                        inputClassName={INPUT_TEXT}
                        showFilledIndicator={false}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Desktop: grid */}
      <div className="hidden lg:block">
        {enabledDeliverables.length > 0 ? (
          <div className="overflow-hidden">
            <div className="grid grid-cols-[1fr_1fr_1fr] gap-3">
              <span />
              {['Multiplier', 'Quantity'].map(h => (
                <span
                  key={h}
                  className="text-sm font-medium text-text-primary"
                >
                  {h}
                </span>
              ))}
            </div>
            {enabledDeliverables.map(d => (
              <div
                key={d.key}
                className="grid grid-cols-[1fr_1fr_1fr] pr-0.5 py-3 gap-3 items-center"
              >
                <span className="text-base font-medium text-text-secondary">{d.label}</span>
                <CellInput
                  value={deliverables[d.key].multiplier}
                  onChange={v => updateDeliverable(d.key, { multiplier: v })}
                  allowDecimal
                />
                <CellInput
                  value={deliverables[d.key].quantity}
                  onChange={v => updateDeliverable(d.key, { quantity: v })}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-secondary">No deliverables selected.</p>
        )}
      </div>
    </div>
  );
}
