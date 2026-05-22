'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import CampaignTypeStep from '@/components/pricing-calculator/CampaignTypeStep';
import YourReachStep from '@/components/pricing-calculator/YourReachStep';
import DeliverablesStep from '@/components/pricing-calculator/DeliverablesStep';
import RightsAndQuoteStep from '@/components/pricing-calculator/RightsAndQuoteStep';
import ProgressIndicator from '@/components/pricing-calculator/ProgressIndicator';
import { computeQuote } from '@/components/pricing-calculator/calculator.utils';
import { downloadQuotePdf } from '@/components/pricing-calculator/pdf.utils';
import { submitRateCardQuote, RateCardApiError } from '@/lib/api/rate-card';
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

export default function PricingCalculatorPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  const handleStepClick = (stepNumber: number) => {
    if (stepNumber <= currentStep) {
      setCurrentStep(stepNumber);
    }
  };

  const goNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const goBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const updateReach = (key: PlatformKey, patch: Partial<ReachState[PlatformKey]>) => {
    setReach(prev => ({ ...prev, [key]: { ...prev[key], ...patch } }));
  };

  const updateDeliverable = (
    key: DeliverableKey,
    patch: Partial<DeliverablesState[DeliverableKey]>
  ) => {
    setDeliverables(prev => ({ ...prev, [key]: { ...prev[key], ...patch } }));
  };

  const updateUsageRate = (key: UsageRateKey, patch: Partial<UsageRatesState[UsageRateKey]>) => {
    setUsageRates(prev => ({ ...prev, [key]: { ...prev[key], ...patch } }));
  };

  const handleSubmit = async () => {
    if (isSubmitting || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress.trim())) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitRateCardQuote({
        email: emailAddress.trim(),
        items: quote.items,
        subtotal: quote.subtotal,
        licensing: quote.licensing,
        discount: quote.discount,
        total: quote.finalTotal,
      });
      await downloadQuotePdf({ quote, email: emailAddress });
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(
          'pricing-calculator:last-quote',
          JSON.stringify({ email: emailAddress, finalTotal: quote.finalTotal })
        );
      }
      router.push(`/pricing-calculator/success?email=${encodeURIComponent(emailAddress.trim())}`);
    } catch (error) {
      if (error instanceof RateCardApiError) {
        setSubmitError(error.message);
      } else {
        setSubmitError('Something went wrong. Please try again.');
      }
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentStep]);

  const heroTitle = 'Most creators guess their rates.';
  const heroSubtitle =
    'Calculate your estimated creator rate based on your content, audience, usage rights, deliverables, and collaboration experience.';

  return (
    <>
      <Header variant="light" />

      <main className="min-h-screen bg-white pt-28 md:pt-40 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{heroTitle}</h1>
            <p className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
              {heroSubtitle}
            </p>
          </div>

          <ProgressIndicator
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />

          <div className="bg-white rounded-lg border border-stroke-secondary shadow-sm p-5 md:p-7 lg:p-8">
            {currentStep === 1 && (
              <CampaignTypeStep
                value={campaign}
                onChange={setCampaign}
                onContinue={goNext}
              />
            )}

            {currentStep === 2 && (
              <YourReachStep
                campaign={campaign}
                reach={reach}
                onChange={updateReach}
                ugcRate={ugcRate}
                onUgcRateChange={setUgcRate}
                onBack={goBack}
                onContinue={goNext}
              />
            )}

            {currentStep === 3 && (
              <DeliverablesStep
                campaign={campaign}
                reach={reach}
                deliverables={deliverables}
                onChange={updateDeliverable}
                onBack={goBack}
                onContinue={goNext}
              />
            )}

            {currentStep === 4 && (
              <RightsAndQuoteStep
                exclusivityMonths={exclusivityMonths}
                onExclusivityMonthsChange={setExclusivityMonths}
                exclusivityRate={exclusivityRate}
                onExclusivityRateChange={setExclusivityRate}
                usageDuration={usageDuration}
                onUsageDurationChange={setUsageDuration}
                usageRates={usageRates}
                onUsageRatesChange={updateUsageRate}
                discountRate={discountRate}
                onDiscountRateChange={setDiscountRate}
                emailAddress={emailAddress}
                onEmailAddressChange={setEmailAddress}
                quote={quote}
                onBack={goBack}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                submitError={submitError}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
