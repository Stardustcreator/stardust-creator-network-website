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
import { useFingerprintGuard } from '@/lib/hooks/useFingerprintGuard';
import { checkRateCardEmail } from '@/lib/api/rate-card';
import { usePricingCalculator } from '@/lib/contexts';
import { toast } from '@/lib/toast';

export default function PricingCalculatorPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [usedError, setUsedError] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const fpStatus = useFingerprintGuard();
  const { emailAddress } = usePricingCalculator();

  const handleStepClick = (step: number) => {
    if (step <= currentStep) setCurrentStep(step);
  };

  const goNext = async () => {
    if (currentStep === 1 && fpStatus === 'blocked') {
      setUsedError(true);
      toast.error('Join the SCN Community for unlimited rate card generations');
      return;
    }
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      return;
    }
    setIsCheckingEmail(true);
    try {
      await checkRateCardEmail(emailAddress);
      router.push('/pricing-calculator/preview');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsCheckingEmail(false);
    }
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
            {currentStep === 1 && (
              <CampaignTypeStep
                onContinue={goNext}
                error={usedError}
              />
            )}
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
                isSubmitting={isCheckingEmail}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
