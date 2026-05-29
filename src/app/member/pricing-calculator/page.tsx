'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import CampaignTypeStep from '@/components/pricing-calculator/CampaignTypeStep';
import YourReachStep from '@/components/pricing-calculator/YourReachStep';
import DeliverablesStep from '@/components/pricing-calculator/DeliverablesStep';
import RightsAndQuoteStep from '@/components/pricing-calculator/RightsAndQuoteStep';
import ProgressIndicator from '@/components/pricing-calculator/ProgressIndicator';
import { getCommunitySession } from '@/lib/api/rate-card';
import { usePricingCalculator } from '@/lib/contexts';

export default function MemberPricingCalculatorPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const { setEmailAddress } = usePricingCalculator();

  useEffect(() => {
    getCommunitySession()
      .then(session => setEmailAddress(session.email))
      .catch(() => {});
  }, [setEmailAddress]);

  const handleStepClick = (step: number) => {
    if (step <= currentStep) setCurrentStep(step);
  };

  const goNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
    else router.push('/member/pricing-calculator/preview');
  };

  const goBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentStep]);

  return (
    <>
      <Header variant="light" />

      <main className="min-h-screen bg-white pt-28 md:pt-40 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Most creators guess their rates.
            </h1>
            <p className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
              Calculate your estimated creator rate based on your content, audience, usage rights,
              deliverables, and collaboration experience.
            </p>
          </div>

          <ProgressIndicator
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />

          <div className="bg-white rounded-lg border border-stroke-secondary shadow-sm p-5 md:p-7 lg:p-8">
            {currentStep === 1 && <CampaignTypeStep onContinue={goNext} />}
            {currentStep === 2 && (
              <YourReachStep
                onBack={goBack}
                onContinue={goNext}
              />
            )}
            {currentStep === 3 && (
              <DeliverablesStep
                onBack={goBack}
                onContinue={goNext}
              />
            )}
            {currentStep === 4 && (
              <RightsAndQuoteStep
                onBack={goBack}
                onSubmit={goNext}
                hideEmail
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
