export type CampaignType = 'creator' | 'ugc' | 'brand';

export type PlatformKey = 'instagram' | 'tiktok' | 'twitter' | 'youtube';

export interface PlatformReachState {
  enabled: boolean;
  followers: string;
  engagementRate: string;
  ratePerThousand: string;
}

export type ReachState = Record<PlatformKey, PlatformReachState>;

export type DeliverableKey =
  | 'igReel'
  | 'igStory'
  | 'tiktokVideo'
  | 'youtubeShorts'
  | 'youtubeLong'
  | 'twitterPost'
  | 'ugcShortVideo'
  | 'ugcLongVideo'
  | 'ugcPhotos'
  | 'brandIg'
  | 'brandTiktok'
  | 'brandTwitter';

export interface DeliverableState {
  enabled: boolean;
  multiplier: string;
  quantity: string;
}

export type DeliverablesState = Record<DeliverableKey, DeliverableState>;

export type UsageRateKey = 'adsOnPaidSocial' | 'emailWebsite' | 'inStoreBillboards';

export interface UsageRateOption {
  enabled: boolean;
  percentage: string;
}

export type UsageRatesState = Record<UsageRateKey, UsageRateOption>;

export const INPUT_TEXT = 'text-sm bg-white';
