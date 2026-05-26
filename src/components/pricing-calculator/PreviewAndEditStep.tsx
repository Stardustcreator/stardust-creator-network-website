'use client';

import Button from '../ui/Button';
import FormInput from '../ui/FormInput';
import {
  computePlatformBase,
  formatNaira,
  getVisibleDeliverables,
  type QuoteBreakdown,
} from './calculator.utils';
import {
  INPUT_TEXT,
  type CampaignType,
  type DeliverableKey,
  type DeliverablesState,
  type PlatformKey,
  type ReachState,
  type UsageRateKey,
  type UsageRatesState,
} from './types';

const PLATFORM_LABELS: Record<PlatformKey, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  twitter: 'Twitter (X)',
  youtube: 'YouTube',
};

const CAMPAIGN_OPTIONS: { value: CampaignType; label: string }[] = [
  { value: 'creator', label: 'Sponsored content (post on your page)' },
  { value: 'ugc', label: 'UGC (User-Generated Content)' },
  { value: 'brand', label: 'Brand-Provided Content' },
];

const USAGE_CHANNELS: { key: UsageRateKey; label: string }[] = [
  { key: 'adsOnPaidSocial', label: 'Ads on Paid Social' },
  { key: 'emailWebsite', label: 'Email / Website' },
  { key: 'inStoreBillboards', label: 'In-store /Billboards' },
];

const PLATFORMS: PlatformKey[] = ['instagram', 'tiktok', 'twitter', 'youtube'];

interface PreviewAndEditStepProps {
  campaign: CampaignType;
  onCampaignChange: (v: CampaignType) => void;
  reach: ReachState;
  onReachChange: (key: PlatformKey, patch: Partial<ReachState[PlatformKey]>) => void;
  ugcRate: string;
  onUgcRateChange: (v: string) => void;
  deliverables: DeliverablesState;
  onDeliverableChange: (
    key: DeliverableKey,
    patch: Partial<DeliverablesState[DeliverableKey]>
  ) => void;
  exclusivityMonths: string;
  onExclusivityMonthsChange: (v: string) => void;
  exclusivityRate: string;
  onExclusivityRateChange: (v: string) => void;
  usageDuration: string;
  onUsageDurationChange: (v: string) => void;
  usageRates: UsageRatesState;
  onUsageRatesChange: (key: UsageRateKey, patch: Partial<UsageRatesState[UsageRateKey]>) => void;
  discountRate: string;
  onDiscountRateChange: (v: string) => void;
  quote: QuoteBreakdown;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitError?: string | null;
}

function sanitizeInteger(value: string) {
  return value.replace(/[^0-9]/g, '');
}

function CellInput({
  value,
  onChange,
  placeholder = '—',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      value={value}
      onChange={e => onChange(sanitizeInteger(e.target.value))}
      placeholder={placeholder}
      inputMode="numeric"
      className="w-full text-sm text-gray-700 bg-transparent outline-none placeholder:text-text-secondary"
    />
  );
}

export default function PreviewAndEditStep({
  campaign,
  onCampaignChange,
  reach,
  onReachChange,
  ugcRate,
  onUgcRateChange,
  deliverables,
  onDeliverableChange,
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
  quote,
  onSubmit,
  isSubmitting,
  submitError,
}: PreviewAndEditStepProps) {
  const enabledPlatforms = PLATFORMS.filter(p => reach[p].enabled);
  const visibleDeliverables = getVisibleDeliverables(campaign, reach);
  const enabledDeliverables = visibleDeliverables.filter(d => deliverables[d.key].enabled);

  return (
    <div className="-m-5 md:-m-7 lg:-m-8 flex flex-col lg:flex-row">
      {/* ── Left: all editable sections ── */}
      <div className="flex-1 min-w-0 p-5 md:p-7 lg:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Preview & Edit</h2>
          <p className="text-sm text-text-secondary">
            Review your quote. Use Edit in any section to update details.
          </p>
        </div>

        {/* Campaign Type */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Campaign Type</h3>
          <div>
            <label
              htmlFor="preview-campaign"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Campaign type
            </label>
            <select
              id="preview-campaign"
              value={campaign}
              onChange={e => onCampaignChange(e.target.value as CampaignType)}
              className="w-full px-3.5 py-2.5 text-sm text-gray-900 border border-gray-300 rounded-[6px] bg-surface-primary focus:outline-none focus:ring-2 focus:ring-surface-action focus:border-transparent transition-all cursor-pointer"
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

        <div className="h-px w-full bg-surface-secondary mb-6" />

        {/* Your Reach */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Your Reach</h3>

          {campaign === 'ugc' ? (
            <FormInput
              label="Your UGC base rate (₦)"
              id="ugcRate"
              name="ugcRate"
              value={ugcRate}
              onChange={e => onUgcRateChange(sanitizeInteger(e.target.value))}
              placeholder="Enter your base rate"
              inputMode="numeric"
              inputClassName={INPUT_TEXT}
              showFilledIndicator={false}
            />
          ) : enabledPlatforms.length > 0 ? (
            <div className="border border-stroke-tertiary rounded-lg overflow-hidden">
              <div className="grid grid-cols-[110px_1fr_1fr_1fr_1fr] bg-surface-secondary px-4 py-2.5 gap-3">
                <span />
                {['Followers', 'Engagement rate (%)', 'Rate per 1k', 'Calculated base'].map(h => (
                  <span
                    key={h}
                    className="text-xs font-medium text-text-secondary"
                  >
                    {h}
                  </span>
                ))}
              </div>
              {enabledPlatforms.map((platform, i) => (
                <div
                  key={platform}
                  className={`grid grid-cols-[110px_1fr_1fr_1fr_1fr] px-4 py-3 gap-3 items-center ${
                    i < enabledPlatforms.length - 1 ? 'border-b border-stroke-tertiary' : ''
                  }`}
                >
                  <span className="text-sm font-medium text-gray-900">
                    {PLATFORM_LABELS[platform]}
                  </span>
                  <CellInput
                    value={reach[platform].followers}
                    onChange={v => onReachChange(platform, { followers: v })}
                  />
                  <CellInput
                    value={reach[platform].engagementRate}
                    onChange={v => onReachChange(platform, { engagementRate: v })}
                  />
                  <CellInput
                    value={reach[platform].ratePerThousand}
                    onChange={v => onReachChange(platform, { ratePerThousand: v })}
                  />
                  <span className="text-sm text-text-secondary">
                    {formatNaira(computePlatformBase(reach[platform]))}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-secondary">No platforms configured.</p>
          )}
        </div>

        <div className="h-px w-full bg-surface-secondary mb-6" />

        {/* Deliverables */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Deliverables</h3>
          {enabledDeliverables.length > 0 ? (
            <div className="border border-stroke-tertiary rounded-lg overflow-hidden">
              <div className="grid grid-cols-[1fr_1fr_1fr] bg-surface-secondary px-4 py-2.5 gap-3">
                <span />
                {['Multiplier', 'Quantity'].map(h => (
                  <span
                    key={h}
                    className="text-xs font-medium text-text-secondary"
                  >
                    {h}
                  </span>
                ))}
              </div>
              {enabledDeliverables.map((d, i) => (
                <div
                  key={d.key}
                  className={`grid grid-cols-[1fr_1fr_1fr] px-4 py-3 gap-3 items-center ${
                    i < enabledDeliverables.length - 1 ? 'border-b border-stroke-tertiary' : ''
                  }`}
                >
                  <span className="text-sm font-medium text-gray-900">{d.label}</span>
                  <CellInput
                    value={deliverables[d.key].multiplier}
                    onChange={v => onDeliverableChange(d.key, { multiplier: v })}
                  />
                  <CellInput
                    value={deliverables[d.key].quantity}
                    onChange={v => onDeliverableChange(d.key, { quantity: v })}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-secondary">No deliverables selected.</p>
          )}
        </div>

        <div className="h-px w-full bg-surface-secondary mb-6" />

        {/* Rights & Usage */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Rights & Usage</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <FormInput
                label="Exclusivity (months)"
                id="prev-exclusivityMonths"
                name="prev-exclusivityMonths"
                value={exclusivityMonths}
                onChange={e => onExclusivityMonthsChange(sanitizeInteger(e.target.value))}
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
                onChange={e => onExclusivityRateChange(sanitizeInteger(e.target.value))}
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
                onChange={e => onUsageDurationChange(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm text-gray-900 border border-gray-300 rounded-[6px] bg-surface-primary focus:outline-none focus:ring-2 focus:ring-surface-action focus:border-transparent transition-all cursor-pointer"
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
                label="Discount(%)"
                id="prev-discountRate"
                name="prev-discountRate"
                value={discountRate}
                onChange={e => onDiscountRateChange(sanitizeInteger(e.target.value))}
                placeholder="—"
                inputMode="numeric"
                inputClassName={INPUT_TEXT}
                showFilledIndicator={false}
              />
            </div>
          </div>

          <p className="text-sm font-medium text-gray-700 mb-3">Custom Usage Channels</p>
          <div className="border border-stroke-tertiary rounded-lg overflow-hidden">
            {USAGE_CHANNELS.map(({ key, label }, i) => (
              <div
                key={key}
                className={`flex items-center justify-between px-4 py-3 ${
                  i < USAGE_CHANNELS.length - 1 ? 'border-b border-stroke-tertiary' : ''
                }`}
              >
                <span className="text-sm text-gray-900">{label}</span>
                <input
                  value={usageRates[key].percentage}
                  onChange={e => {
                    const val = sanitizeInteger(e.target.value);
                    onUsageRatesChange(key, {
                      percentage: val,
                      enabled: val.length > 0,
                    });
                  }}
                  placeholder="Enter custom percentage"
                  inputMode="numeric"
                  className="w-44 text-sm text-right text-gray-700 bg-transparent outline-none placeholder:text-text-secondary"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: sticky summary ── */}
      <div className="shrink-0 lg:w-72 xl:w-80 border-t lg:border-t-0 lg:border-l border-stroke-secondary">
        <div className="lg:sticky lg:top-8 p-5 md:p-7 lg:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-5">Summary</h3>

          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Subtotal (Content only)</span>
              <span className="text-sm font-medium text-gray-900">
                {formatNaira(quote.subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Rights & Exclusivity</span>
              <span className="text-sm font-medium text-gray-900">
                {formatNaira(quote.licensing)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Discount Applied</span>
              <span
                className={`text-sm font-medium ${quote.discount > 0 ? 'text-red-600' : 'text-gray-900'}`}
              >
                {quote.discount > 0 ? `-${formatNaira(quote.discount)}` : formatNaira(0)}
              </span>
            </div>
          </div>

          <div className="h-px w-full bg-surface-secondary mb-4" />

          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-semibold text-gray-900">Final Custom Quote</span>
            <span className="text-base font-bold text-gray-900">
              {formatNaira(quote.finalTotal)}
            </span>
          </div>

          {submitError && (
            <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-3 py-2.5 text-xs text-red-700">
              {submitError}
            </div>
          )}

          <Button
            type="button"
            onClick={onSubmit}
            variant="primary"
            className="w-full py-2.5! text-sm! rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Generating PDF…' : 'Download rate card'}
          </Button>
        </div>
      </div>
    </div>
  );
}
