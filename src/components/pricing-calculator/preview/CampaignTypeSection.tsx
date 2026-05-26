'use client';

import { usePricingCalculator } from '@/lib/contexts';
import type { CampaignType } from '../types';

const CAMPAIGN_OPTIONS: { value: CampaignType; label: string }[] = [
  { value: 'creator', label: 'Sponsored content (post on your page)' },
  { value: 'ugc', label: 'UGC (User-Generated Content)' },
  { value: 'brand', label: 'Brand-Provided Content' },
];

export default function CampaignTypeSection() {
  const { campaign, setCampaign } = usePricingCalculator();

  return (
    <div className="border border-stroke-secondary rounded-md py-5 px-4">
      <h3 className="text-base font-semibold text-text-secondary mb-4">Campaign Type</h3>
      <div>
        <label
          htmlFor="preview-campaign"
          className="block text-sm font-medium text-text-primary mb-2"
        >
          Campaign type
        </label>
        <select
          id="preview-campaign"
          value={campaign}
          onChange={e => setCampaign(e.target.value as CampaignType)}
          className="w-full px-3.5 py-2.5 text-sm text-text-secondary border border-stroke-primary rounded-[6px] bg-white focus:outline-none focus:ring-2 focus:ring-surface-action focus:border-transparent transition-all cursor-pointer"
        >
          {CAMPAIGN_OPTIONS.map(opt => (
            <option
              key={opt.value}
              value={opt.value}
            >
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
