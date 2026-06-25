import type {
  CampaignType,
  DeliverableKey,
  DeliverablesState,
  PlatformKey,
  PlatformReachState,
  ReachState,
  UsageRatesState,
} from './types';

export interface InvoiceItem {
  name: string;
  qty: number;
  total: number;
}

export interface QuoteBreakdown {
  items: InvoiceItem[];
  subtotal: number;
  licensing: number;
  discount: number;
  finalTotal: number;
}

export interface QuoteInput {
  campaign: CampaignType;
  reach: ReachState;
  ugcRate: string;
  deliverables: DeliverablesState;
  exclusivityMonths: string;
  exclusivityRate: string;
  usageDuration: string;
  usageRates: UsageRatesState;
  discountRate: string;
}

const toNumber = (value: string) => {
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : 0;
};

export function computePlatformBase(state: PlatformReachState): number {
  const followers = toNumber(state.followers);
  const engagement = toNumber(state.engagementRate);
  const rate = toNumber(state.ratePerThousand);

  let engagementMultiplier = 1;
  if (engagement > 0) {
    if (engagement < 2) engagementMultiplier = 0.8;
    else if (engagement > 5) engagementMultiplier = 1.2;
  }

  return (followers / 1000) * rate * engagementMultiplier;
}

interface DeliverableMeta {
  key: DeliverableKey;
  label: string;
  platform?: PlatformKey;
}

const creatorDeliverables: DeliverableMeta[] = [
  { key: 'igReel', label: 'IG Reel', platform: 'instagram' },
  { key: 'igStory', label: 'IG Story', platform: 'instagram' },
  { key: 'tiktokVideo', label: 'TikTok Video', platform: 'tiktok' },
  { key: 'youtubeShorts', label: 'Youtube Shorts', platform: 'youtube' },
  { key: 'youtubeLong', label: 'Youtube Long-Form Video', platform: 'youtube' },
  { key: 'twitterPost', label: 'Twitter (X) Post', platform: 'twitter' },
];

const ugcDeliverables: DeliverableMeta[] = [
  { key: 'ugcShortVideo', label: 'UGC Short-Form Video' },
  { key: 'ugcLongVideo', label: 'UGC Long-Form Video' },
  { key: 'ugcPhotos', label: 'UGC Photos' },
];

const brandDeliverables: DeliverableMeta[] = [
  { key: 'brandIg', label: 'IG Brand-Provided Post', platform: 'instagram' },
  { key: 'brandTiktok', label: 'TikTok Brand-Provided', platform: 'tiktok' },
  { key: 'brandTwitter', label: 'Twitter Brand-Provided', platform: 'twitter' },
];

export function getDeliverableMetas(campaign: CampaignType): DeliverableMeta[] {
  if (campaign === 'ugc') return ugcDeliverables;
  if (campaign === 'brand') return brandDeliverables;
  return creatorDeliverables;
}

export function getVisibleDeliverables(
  campaign: CampaignType,
  reach: ReachState
): DeliverableMeta[] {
  const all = getDeliverableMetas(campaign);
  if (campaign === 'ugc') return all;
  return all.filter(meta => !meta.platform || reach[meta.platform].enabled);
}

function usageDurationMultiplier(value: string): number {
  switch (value) {
    case '3':
      return 1;
    case '6':
      return 1.5;
    case '12':
      return 2;
    default:
      return 0;
  }
}

function usageDurationLabel(value: string): string {
  switch (value) {
    case '3':
      return '3 Months';
    case '6':
      return '6 Months';
    case '12':
      return '12 Months';
    default:
      return '';
  }
}

export function computeQuote(input: QuoteInput): QuoteBreakdown {
  const {
    campaign,
    reach,
    ugcRate,
    deliverables,
    exclusivityMonths,
    exclusivityRate,
    usageDuration,
    usageRates,
    discountRate,
  } = input;

  const items: InvoiceItem[] = [];
  const platformBases: Record<PlatformKey, number> = {
    instagram: computePlatformBase(reach.instagram),
    tiktok: computePlatformBase(reach.tiktok),
    twitter: computePlatformBase(reach.twitter),
    youtube: computePlatformBase(reach.youtube),
  };
  const ugcBase = toNumber(ugcRate);

  let subtotal = 0;
  const visible = getVisibleDeliverables(campaign, reach);

  visible.forEach(meta => {
    const state = deliverables[meta.key];
    if (!state.enabled) return;
    const qty = toNumber(state.quantity);
    const mult = toNumber(state.multiplier);
    if (qty <= 0 || mult <= 0) return;

    const base = campaign === 'ugc' ? ugcBase : meta.platform ? platformBases[meta.platform] : 0;
    const total = qty * mult * base;
    if (total <= 0) return;

    subtotal += total;
    items.push({ name: meta.label, qty, total });
  });

  let licensing = 0;

  const exclMonths = toNumber(exclusivityMonths);
  const exclPct = toNumber(exclusivityRate);
  if (exclMonths > 0 && exclPct > 0) {
    const exclTotal = subtotal * (exclPct / 100) * exclMonths;
    licensing += exclTotal;
    items.push({
      name: `Exclusivity Lock-out (${exclMonths} ${exclMonths === 1 ? 'Month' : 'Months'})`,
      qty: 1,
      total: exclTotal,
    });
  }

  const durationMult = usageDurationMultiplier(usageDuration);
  const durationLabel = usageDurationLabel(usageDuration);

  const usageEntries: { key: keyof UsageRatesState; label: string }[] = [
    { key: 'adsOnPaidSocial', label: 'Ads on Paid Social' },
    { key: 'emailWebsite', label: 'Email / Website Usage' },
    { key: 'inStoreBillboards', label: 'In-Store / Billboards' },
  ];

  usageEntries.forEach(({ key, label }) => {
    const usage = usageRates[key];
    if (!usage.enabled) return;
    const pct = toNumber(usage.percentage);
    if (pct <= 0 || durationMult <= 0) return;
    const lineTotal = subtotal * (pct / 100) * durationMult;
    if (lineTotal <= 0) return;
    licensing += lineTotal;
    items.push({
      name: durationLabel ? `${label} (${durationLabel})` : label,
      qty: 1,
      total: lineTotal,
    });
  });

  const totalBeforeDiscount = subtotal + licensing;
  const discount = totalBeforeDiscount * (toNumber(discountRate) / 100);
  const finalTotal = totalBeforeDiscount - discount;

  return { items, subtotal, licensing, discount, finalTotal };
}

const ngFormatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  minimumFractionDigits: 0,
});

export function formatNaira(value: number): string {
  return ngFormatter.format(Math.round(value));
}
