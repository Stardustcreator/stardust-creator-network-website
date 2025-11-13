'use client';

import { useState, useCallback } from 'react';
import type {
  CreatorSurveyData,
  CreatorSurveyStep,
  CreatorSurveyState,
} from '@/types/creator-survey.types';
import { creatorSurveyStepSchemas } from '@/lib/validations/creator-survey.validations';
import { z } from 'zod';

// Step components
import ScreenerProfileStep from './steps/ScreenerProfileStep';
import Phase1EducationStep from './steps/Phase1EducationStep';
import MonetizationMixStep from './steps/MonetizationMixStep';
import PainSeverityStep from './steps/PainSeverityStep';
import Phase2InfrastructureStep from './steps/Phase2InfrastructureStep';
import WillingnessToPayStep from './steps/WillingnessToPayStep';
import AdoptionBetaStep from './steps/AdoptionBetaStep';
import SurveyThankYouStep from './steps/SurveyThankYouStep';

interface CreatorSurveyProps {
  onComplete?: () => void;
}

const SURVEY_STEPS: CreatorSurveyStep[] = [
  'screener-profile',
  'phase1-education',
  'monetization-mix',
  'pain-severity',
  'phase2-infrastructure',
  'willingness-to-pay',
  'adoption-beta',
  'thank-you',
];

export default function CreatorSurvey({ onComplete }: CreatorSurveyProps) {
  const [surveyState, setSurveyState] = useState<CreatorSurveyState>({
    currentStep: 'screener-profile',
    data: {},
    errors: {},
    isSubmitting: false,
  });

  const currentStepIndex = SURVEY_STEPS.indexOf(surveyState.currentStep);
  const totalSteps = SURVEY_STEPS.length - 1; // Exclude thank-you from count

  // Navigate to next step
  const goToNextStep = useCallback(() => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < SURVEY_STEPS.length) {
      setSurveyState(prev => ({
        ...prev,
        currentStep: SURVEY_STEPS[nextIndex],
      }));
    }
  }, [currentStepIndex]);

  // Navigate to previous step
  const goToPreviousStep = useCallback(() => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setSurveyState(prev => ({
        ...prev,
        currentStep: SURVEY_STEPS[prevIndex],
      }));
    }
  }, [currentStepIndex]);

  // Update survey data
  const updateSurveyData = useCallback(
    <K extends keyof CreatorSurveyData>(section: K, data: Partial<CreatorSurveyData[K]>) => {
      setSurveyState(prev => ({
        ...prev,
        data: {
          ...prev.data,
          [section]: {
            ...(prev.data[section] || {}),
            ...data,
          },
        },
        errors: {
          ...prev.errors,
          [section]: {}, // Clear errors for this section
        },
      }));
    },
    []
  );

  // Validate current step
  const validateCurrentStep = useCallback(() => {
    // No validation for thank-you step
    if (surveyState.currentStep === 'thank-you') {
      return true;
    }

    const stepSchema = creatorSurveyStepSchemas[surveyState.currentStep];
    if (!stepSchema) return true;

    const sectionKey = getSectionKey(surveyState.currentStep);
    const sectionData = surveyState.data[sectionKey as keyof CreatorSurveyData];

    if (!sectionData) {
      setSurveyState(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          [sectionKey]: { _form: 'Please complete all required fields' },
        },
      }));
      return false;
    }

    try {
      stepSchema.parse(sectionData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach(err => {
          const path = err.path.join('.');
          fieldErrors[path] = err.message;
        });

        setSurveyState(prev => ({
          ...prev,
          errors: {
            ...prev.errors,
            [sectionKey]: fieldErrors,
          },
        }));
      }
      return false;
    }
  }, [surveyState.currentStep, surveyState.data]);

  // Submit survey
  const submitSurvey = useCallback(async () => {
    if (!validateCurrentStep()) return;

    setSurveyState(prev => ({ ...prev, isSubmitting: true }));

    try {
      const response = await fetch('/api/creator-survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(surveyState.data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        // Extract error message from API response
        const errorMessage =
          responseData.error ||
          responseData.message ||
          `Failed to submit survey (Status: ${response.status})`;

        throw new Error(errorMessage);
      }

      // Success - move to thank you page
      goToNextStep();
      onComplete?.();
    } catch (error) {
      console.error('Survey submission error:', error);

      // Show error message to user
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.';

      // Set error state for display
      setSurveyState(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          submission: { _form: errorMessage },
        },
      }));

      // Optional: Show alert for immediate feedback
      alert(
        `Survey Submission Error:\n\n${errorMessage}\n\nPlease try again or contact support if the problem persists.`
      );
    } finally {
      setSurveyState(prev => ({ ...prev, isSubmitting: false }));
    }
  }, [surveyState.data, validateCurrentStep, goToNextStep, onComplete]);

  // Map step to section key
  function getSectionKey(step: CreatorSurveyStep): keyof CreatorSurveyData | '' {
    if (step === 'thank-you') return '';
    const mapping: Record<Exclude<CreatorSurveyStep, 'thank-you'>, keyof CreatorSurveyData> = {
      'screener-profile': 'screenerProfile',
      'phase1-education': 'phase1EducationCommunity',
      'monetization-mix': 'currentMonetizationMix',
      'pain-severity': 'painSeverityFrequency',
      'phase2-infrastructure': 'phase2InfrastructureOS',
      'willingness-to-pay': 'willingnessToPay',
      'adoption-beta': 'adoptionBeta',
    };
    return mapping[step];
  }

  // Render current step component
  const renderCurrentStep = () => {
    const sectionKey = getSectionKey(surveyState.currentStep);
    const commonProps = sectionKey
      ? {
          data: surveyState.data[sectionKey as keyof CreatorSurveyData] as unknown as Record<
            string,
            unknown
          >,
          errors: surveyState.errors[sectionKey as keyof CreatorSurveyData] || {},
          updateSurveyData,
        }
      : { updateSurveyData };

    switch (surveyState.currentStep) {
      case 'screener-profile':
        return (
          <ScreenerProfileStep
            {...commonProps}
            data={surveyState.data.screenerProfile}
            errors={surveyState.errors.screenerProfile || {}}
          />
        );

      case 'phase1-education':
        return (
          <Phase1EducationStep
            {...commonProps}
            data={surveyState.data.phase1EducationCommunity}
            errors={surveyState.errors.phase1EducationCommunity || {}}
          />
        );

      case 'monetization-mix':
        return (
          <MonetizationMixStep
            {...commonProps}
            data={surveyState.data.currentMonetizationMix}
            errors={surveyState.errors.currentMonetizationMix || {}}
          />
        );

      case 'pain-severity':
        return (
          <PainSeverityStep
            {...commonProps}
            data={surveyState.data.painSeverityFrequency}
            errors={surveyState.errors.painSeverityFrequency || {}}
          />
        );

      case 'phase2-infrastructure':
        return (
          <Phase2InfrastructureStep
            {...commonProps}
            data={surveyState.data.phase2InfrastructureOS}
            errors={surveyState.errors.phase2InfrastructureOS || {}}
          />
        );

      case 'willingness-to-pay':
        return (
          <WillingnessToPayStep
            {...commonProps}
            data={surveyState.data.willingnessToPay}
            errors={surveyState.errors.willingnessToPay || {}}
          />
        );

      case 'adoption-beta':
        return (
          <AdoptionBetaStep
            {...commonProps}
            data={surveyState.data.adoptionBeta}
            errors={surveyState.errors.adoptionBeta || {}}
            onSubmit={submitSurvey}
            isSubmitting={surveyState.isSubmitting}
          />
        );

      case 'thank-you':
        return <SurveyThankYouStep />;

      default:
        return null;
    }
  };

  const progressPercentage = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Progress Bar */}
      {surveyState.currentStep !== 'thank-you' && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-white/70 text-sm">
              Step {currentStepIndex + 1} of {totalSteps}
            </div>
            <div className="text-white/70 text-sm">{progressPercentage}% Complete</div>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6 md:p-8">
        {renderCurrentStep()}
      </div>

      {/* Navigation Buttons */}
      {surveyState.currentStep !== 'thank-you' && surveyState.currentStep !== 'adoption-beta' && (
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={goToPreviousStep}
            disabled={currentStepIndex === 0}
            className={`
              px-6 py-3 rounded-lg font-semibold transition-all
              ${
                currentStepIndex === 0
                  ? 'bg-white/5 text-white/30 cursor-not-allowed'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }
            `}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => {
              if (validateCurrentStep()) {
                goToNextStep();
              }
            }}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
