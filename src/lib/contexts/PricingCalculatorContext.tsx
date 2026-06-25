'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import {
  computeQuote,
  type QuoteBreakdown,
} from '@/components/pricing-calculator/calculator.utils';
import type {
  CampaignType,
  DeliverableKey,
  DeliverablesState,
  PlatformKey,
  ReachState,
  UsageRateKey,
  UsageRatesState,
} from '@/components/pricing-calculator/types';

const initialReach: ReachState = {
  instagram: { enabled: false, followers: '', engagementRate: '', ratePerThousand: '' },
  tiktok: { enabled: false, followers: '', engagementRate: '', ratePerThousand: '' },
  twitter: { enabled: false, followers: '', engagementRate: '', ratePerThousand: '' },
  youtube: { enabled: false, followers: '', engagementRate: '', ratePerThousand: '' },
};

const initialDeliverables: DeliverablesState = {
  igReel: { enabled: false, multiplier: '', quantity: '' },
  igStory: { enabled: false, multiplier: '', quantity: '' },
  tiktokVideo: { enabled: false, multiplier: '', quantity: '' },
  youtubeShorts: { enabled: false, multiplier: '', quantity: '' },
  youtubeLong: { enabled: false, multiplier: '', quantity: '' },
  twitterPost: { enabled: false, multiplier: '', quantity: '' },
  ugcShortVideo: { enabled: false, multiplier: '', quantity: '' },
  ugcLongVideo: { enabled: false, multiplier: '', quantity: '' },
  ugcPhotos: { enabled: false, multiplier: '', quantity: '' },
  brandIg: { enabled: false, multiplier: '', quantity: '' },
  brandTiktok: { enabled: false, multiplier: '', quantity: '' },
  brandTwitter: { enabled: false, multiplier: '', quantity: '' },
};

const initialUsageRates: UsageRatesState = {
  adsOnPaidSocial: { enabled: false, percentage: '' },
  emailWebsite: { enabled: false, percentage: '' },
  inStoreBillboards: { enabled: false, percentage: '' },
};

interface PricingCalculatorContextValue {
  campaign: CampaignType;
  setCampaign: (v: CampaignType) => void;
  reach: ReachState;
  updateReach: (key: PlatformKey, patch: Partial<ReachState[PlatformKey]>) => void;
  ugcRate: string;
  setUgcRate: (v: string) => void;
  deliverables: DeliverablesState;
  updateDeliverable: (
    key: DeliverableKey,
    patch: Partial<DeliverablesState[DeliverableKey]>
  ) => void;
  exclusivityMonths: string;
  setExclusivityMonths: (v: string) => void;
  exclusivityRate: string;
  setExclusivityRate: (v: string) => void;
  usageDuration: string;
  setUsageDuration: (v: string) => void;
  usageRates: UsageRatesState;
  updateUsageRate: (key: UsageRateKey, patch: Partial<UsageRatesState[UsageRateKey]>) => void;
  discountRate: string;
  setDiscountRate: (v: string) => void;
  emailAddress: string;
  setEmailAddress: (v: string) => void;
  quote: QuoteBreakdown;
}

const PricingCalculatorContext = createContext<PricingCalculatorContextValue | null>(null);

export function PricingCalculatorProvider({ children }: { children: ReactNode }) {
  const [campaign, setCampaign] = useState<CampaignType>('creator');
  const [reach, setReach] = useState<ReachState>(initialReach);
  const [ugcRate, setUgcRate] = useState('');
  const [deliverables, setDeliverables] = useState<DeliverablesState>(initialDeliverables);
  const [exclusivityMonths, setExclusivityMonths] = useState('');
  const [exclusivityRate, setExclusivityRate] = useState('');
  const [usageDuration, setUsageDuration] = useState('');
  const [usageRates, setUsageRates] = useState<UsageRatesState>(initialUsageRates);
  const [discountRate, setDiscountRate] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  const updateReach = (key: PlatformKey, patch: Partial<ReachState[PlatformKey]>) =>
    setReach(prev => ({ ...prev, [key]: { ...prev[key], ...patch } }));

  const updateDeliverable = (
    key: DeliverableKey,
    patch: Partial<DeliverablesState[DeliverableKey]>
  ) => setDeliverables(prev => ({ ...prev, [key]: { ...prev[key], ...patch } }));

  const updateUsageRate = (key: UsageRateKey, patch: Partial<UsageRatesState[UsageRateKey]>) =>
    setUsageRates(prev => ({ ...prev, [key]: { ...prev[key], ...patch } }));

  const quote = useMemo(
    () =>
      computeQuote({
        campaign,
        reach,
        ugcRate,
        deliverables,
        exclusivityMonths,
        exclusivityRate,
        usageDuration,
        usageRates,
        discountRate,
      }),
    [
      campaign,
      reach,
      ugcRate,
      deliverables,
      exclusivityMonths,
      exclusivityRate,
      usageDuration,
      usageRates,
      discountRate,
    ]
  );

  return (
    <PricingCalculatorContext.Provider
      value={{
        campaign,
        setCampaign,
        reach,
        updateReach,
        ugcRate,
        setUgcRate,
        deliverables,
        updateDeliverable,
        exclusivityMonths,
        setExclusivityMonths,
        exclusivityRate,
        setExclusivityRate,
        usageDuration,
        setUsageDuration,
        usageRates,
        updateUsageRate,
        discountRate,
        setDiscountRate,
        emailAddress,
        setEmailAddress,
        quote,
      }}
    >
      {children}
    </PricingCalculatorContext.Provider>
  );
}

export function usePricingCalculator(): PricingCalculatorContextValue {
  const ctx = useContext(PricingCalculatorContext);
  if (!ctx) throw new Error('usePricingCalculator must be used inside PricingCalculatorProvider');
  return ctx;
}
