'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type {
  Country,
  BrandBriefFormStep,
  BrandBriefFormData,
  BrandBriefFormState,
  BudgetPaymentPreference,
} from '@/types/brand-brief.types';
import { createCompleteBrandBriefFormSchema } from '@/lib/validations/brand-brief.validations';
import { trackFormSubmit } from '@/lib/analytics/eventTracking.utils';

// Step components
import WelcomeStep from './steps/WelcomeStep';
import BrandCompanyInformationStep from './steps/BrandCompanyInformationStep';
import CampaignObjectivesStep from './steps/CampaignObjectivesStep';
import CreatorPreferencesStep from './steps/CreatorPreferencesStep';
import BudgetPaymentPreferenceStep from './steps/BudgetPaymentPreferenceStep';
import TimelineDeliverablesStep from './steps/TimelineDeliverablesStep';
import AdditionalInformationStep from './steps/AdditionalInformationStep';
import AgreementSubmissionStep from './steps/AgreementSubmissionStep';

// Shared components (reuse from creator form)
import FormProgress from '../CreatorApplicationForm/FormProgress';
import FormNavigation from '../CreatorApplicationForm/FormNavigation';
import DraftResumeModal from '../DraftResumeModal';

interface BrandBriefFormProps {
  country: Country;
}

const FORM_STEPS: BrandBriefFormStep[] = [
  'welcome',
  'brand-company-information',
  'campaign-objectives',
  'creator-preferences',
  'budget-payment-preference',
  'timeline-deliverables',
  'additional-information',
  'agreement-submission',
];

export default function BrandBriefForm({ country }: BrandBriefFormProps) {
  const router = useRouter();
  const [formState, setFormState] = useState<BrandBriefFormState>({
    currentStep: 'welcome',
    data: {},
    errors: {},
    isSubmitting: false,
    isValid: false,
    completedSteps: new Set(),
  });
  const [earlyCaptured, setEarlyCaptured] = useState(false);
  const [draftModalOpen, setDraftModalOpen] = useState(false);
  const [draftData, setDraftData] = useState<{
    id: string;
    country: string;
    lastUpdated: string;
    data: BrandBriefFormData;
  } | null>(null);
  const [draftChecked, setDraftChecked] = useState(false);

  const currentStepIndex = FORM_STEPS.indexOf(formState.currentStep);
  const totalSteps = FORM_STEPS.length - 1; // Exclude welcome from count

  // Check for existing draft when email is provided
  const checkForDraft = useCallback(
    async (email: string) => {
      if (draftChecked) return; // Only check once

      try {
        const response = await fetch(`/api/brand-brief/draft?email=${encodeURIComponent(email)}`);
        const result = await response.json();

        if (result.success && result.hasDraft) {
          setDraftData(result.draft);
          setDraftModalOpen(true);
        }
        setDraftChecked(true);
      } catch (error) {
        console.error('Error checking for draft:', error);
        setDraftChecked(true);
      }
    },
    [draftChecked]
  );

  // Auto-save draft after completing each section
  const saveDraft = useCallback(async () => {
    if (!formState.data.brandCompanyInformation?.email) {
      return; // Need email to save draft
    }

    try {
      await fetch('/api/brand-brief/draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formState.data.brandCompanyInformation.email,
          country,
          formData: formState.data,
        }),
      });
      console.log('Draft saved successfully');
    } catch (error) {
      console.warn('Failed to save draft:', error);
    }
  }, [formState.data, country]);

  // Handle draft resume
  const handleResumeDraft = useCallback(() => {
    if (draftData) {
      setFormState(prev => ({
        ...prev,
        data: draftData.data,
        currentStep: 'brand-company-information', // Start from where they have data
      }));
      setDraftModalOpen(false);
    }
  }, [draftData]);

  // Handle start fresh
  const handleStartFresh = useCallback(() => {
    setDraftModalOpen(false);
    setDraftData(null);
  }, []);

  // Early capture contact information to Mailchimp
  const performEarlyCapture = useCallback(async () => {
    if (earlyCaptured || !formState.data.brandCompanyInformation) {
      return; // Already captured or no data
    }

    const brandInfo = formState.data.brandCompanyInformation;

    // Only capture if user has consented
    if (!brandInfo.marketingConsent) {
      return;
    }

    // Check for existing draft when we have email
    if (!draftChecked) {
      await checkForDraft(brandInfo.email);
    }

    try {
      const response = await fetch('/api/early-capture/brand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: brandInfo.email,
          contactPerson: brandInfo.contactPerson,
          phoneNumber: brandInfo.phoneNumber,
          brandName: brandInfo.brandName,
          marketingConsent: brandInfo.marketingConsent,
        }),
      });

      if (response.ok) {
        console.log('Early capture successful');
        setEarlyCaptured(true);
      } else {
        console.warn('Early capture failed, but continuing with form');
      }
    } catch (error) {
      // Don't block form progression if early capture fails
      console.warn('Early capture error:', error);
    }
  }, [earlyCaptured, formState.data.brandCompanyInformation, draftChecked, checkForDraft]);

  // Navigate to next step
  const goToNextStep = useCallback(async () => {
    // Perform early capture when moving from brand-company-information step
    if (formState.currentStep === 'brand-company-information') {
      await performEarlyCapture();
    }

    // Save draft after completing any section (except welcome)
    if (formState.currentStep !== 'welcome' && formState.data.brandCompanyInformation?.email) {
      await saveDraft();
    }

    const nextIndex = currentStepIndex + 1;
    if (nextIndex < FORM_STEPS.length) {
      setFormState(prev => ({
        ...prev,
        currentStep: FORM_STEPS[nextIndex],
        completedSteps: new Set([...prev.completedSteps, prev.currentStep]),
      }));
    }
  }, [
    currentStepIndex,
    formState.currentStep,
    formState.data.brandCompanyInformation?.email,
    performEarlyCapture,
    saveDraft,
  ]);

  // Navigate to previous step
  const goToPreviousStep = useCallback(() => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setFormState(prev => ({
        ...prev,
        currentStep: FORM_STEPS[prevIndex],
      }));
    }
  }, [currentStepIndex]);

  // Update form data
  const updateFormData = useCallback(
    <K extends keyof BrandBriefFormData>(section: K, data: Partial<BrandBriefFormData[K]>) => {
      setFormState(prev => ({
        ...prev,
        data: {
          ...prev.data,
          [section]: {
            ...(prev.data[section] || {}), // Provide empty object as fallback
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
    const { currentStep, data } = formState;

    try {
      const schema = createCompleteBrandBriefFormSchema(country);

      switch (currentStep) {
        case 'brand-company-information':
          schema.shape.brandCompanyInformation.parse(data.brandCompanyInformation || {});
          break;
        case 'campaign-objectives':
          schema.shape.campaignObjectives.parse(data.campaignObjectives || {});
          break;
        case 'creator-preferences':
          schema.shape.creatorPreferences.parse(data.creatorPreferences || {});
          break;
        case 'budget-payment-preference':
          // Check if any data has been entered before validating
          const budgetData =
            (data.budgetPaymentPreference as Partial<BudgetPaymentPreference>) || {};

          // Only validate if user has started filling the form
          if (
            budgetData.estimatedBudget !== undefined ||
            budgetData.paymentModel ||
            budgetData.ongoingCollaboration
          ) {
            schema.shape.budgetPaymentPreference.parse(budgetData);
          } else {
            // If no data entered yet, fail validation with helpful message
            setFormState(prev => ({
              ...prev,
              errors: {
                ...prev.errors,
                budgetPaymentPreference: {
                  estimatedBudget: 'Please select your estimated campaign budget',
                },
              },
            }));
            return false;
          }
          break;
        case 'timeline-deliverables':
          schema.shape.timelineDeliverables.parse(data.timelineDeliverables || {});
          break;
        case 'additional-information':
          schema.shape.additionalInformation.parse(data.additionalInformation || {});
          break;
        case 'agreement-submission':
          schema.shape.agreementSubmission.parse(data.agreementSubmission || {});
          break;
      }

      return true;
    } catch (error) {
      if (error && typeof error === 'object' && 'issues' in error) {
        // Handle Zod validation errors
        const zodError = error as { issues: Array<{ path: string[]; message: string }> };
        const fieldErrors: Record<string, string> = {};
        zodError.issues.forEach(issue => {
          const path = issue.path.join('.');
          fieldErrors[path] = issue.message;
        });

        // Map step names to camelCase for error keys
        const errorKey = currentStep.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

        setFormState(prev => ({
          ...prev,
          errors: {
            ...prev.errors,
            [errorKey]: fieldErrors,
          },
        }));
      }
      return false;
    }
  }, [formState, country]);

  // Submit form
  const submitForm = useCallback(async () => {
    setFormState(prev => ({ ...prev, isSubmitting: true }));

    try {
      // Debug: Log the form data being submitted
      const submitData = {
        ...formState.data,
        location: country,
        submittedAt: new Date().toISOString(),
      };

      console.log('Submitting brand brief data:', JSON.stringify(submitData, null, 2));

      // Validate that all required sections exist before submitting
      const requiredSections: (keyof BrandBriefFormData)[] = [
        'brandCompanyInformation',
        'campaignObjectives',
        'creatorPreferences',
        'budgetPaymentPreference',
        'timelineDeliverables',
        'additionalInformation',
        'agreementSubmission',
      ];
      const missingSections = requiredSections.filter(section => !submitData[section]);

      if (missingSections.length > 0) {
        console.error('Missing form sections:', missingSections);
        throw new Error(
          `Please complete all form sections. Missing: ${missingSections.join(', ')}`
        );
      }

      // Log each section to see what's populated
      requiredSections.forEach(section => {
        console.log(`${section}:`, submitData[section]);
      });

      let response;
      try {
        response = await fetch('/api/brand-brief', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submitData),
        });
      } catch (fetchError) {
        console.error('Fetch request failed:', fetchError);
        throw new Error(
          `Network error: ${fetchError instanceof Error ? fetchError.message : 'Unknown error'}`
        );
      }

      console.log('Response received:', {
        ok: response.ok,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      });

      if (!response.ok) {
        let errorData;
        try {
          const errorText = await response.text();
          errorData = JSON.parse(errorText);
        } catch (parseError) {
          console.error('Failed to parse error response:', parseError);
          errorData = { error: 'Unable to read error response' };
        }

        console.error('API response error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorData,
        });

        // Handle specific error cases with user-friendly messages
        if (response.status === 409 && errorData.code === 'DUPLICATE_EMAIL') {
          // Set the error on the email field specifically
          setFormState(prev => ({
            ...prev,
            currentStep: 'brand-company-information', // Navigate back to brand info step
            errors: {
              ...prev.errors,
              brandCompanyInformation: {
                ...prev.errors.brandCompanyInformation,
                email:
                  'A brief with this email address has already been submitted. Please use a different email address or contact us if you believe this is an error.',
              },
            },
            isSubmitting: false,
          }));
          return; // Don't throw error, just set field error and return
        }

        // Handle validation errors
        if (response.status === 400 && errorData.details) {
          const fieldErrors = errorData.details
            .map(
              (detail: { path?: string[]; message: string }) =>
                `${detail.path?.join('.')} - ${detail.message}`
            )
            .join('\n');
          throw new Error(`Please check the following:\n${fieldErrors}`);
        }

        // Generic error message with specific details if available
        const userMessage = errorData.error || `Server error (${response.status})`;
        throw new Error(`Failed to submit brand brief: ${userMessage}`);
      }

      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        console.error('Failed to parse JSON response:', jsonError);
        throw new Error('Invalid response format from server');
      }

      if (result.success) {
        // Track form submission event
        trackFormSubmit('brand_brief_form', 'brand_brief', {
          country,
          form_id: result.id || 'unknown',
        });

        // Redirect to country-specific confirmation page for better tracking
        const confirmationUrl =
          country === 'Nigeria'
            ? '/brands/brief/nigeria/confirmation'
            : country === 'United Kingdom'
              ? '/brands/brief/uk/confirmation'
              : '/brands/brief/nigeria/confirmation'; // Default fallback

        router.push(confirmationUrl);
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Brand brief submission error:', error);
      setFormState(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          general: 'Failed to submit brand brief. Please try again.',
        },
        isSubmitting: false,
      }));
    }
  }, [formState.data, country, router]);

  // Handle step navigation with validation
  const handleNextStep = useCallback(() => {
    if (validateCurrentStep()) {
      goToNextStep();
    }
  }, [validateCurrentStep, goToNextStep]);

  // Render current step component
  const renderCurrentStep = () => {
    const commonProps = {
      formData: formState.data,
      errors: formState.errors,
      updateFormData,
      country,
    };

    switch (formState.currentStep) {
      case 'welcome':
        return (
          <WelcomeStep
            onNext={goToNextStep}
            country={country}
          />
        );

      case 'brand-company-information':
        return (
          <BrandCompanyInformationStep
            {...commonProps}
            data={formState.data.brandCompanyInformation}
            errors={formState.errors.brandCompanyInformation}
          />
        );

      case 'campaign-objectives':
        return (
          <CampaignObjectivesStep
            {...commonProps}
            data={formState.data.campaignObjectives}
            errors={formState.errors.campaignObjectives}
          />
        );

      case 'creator-preferences':
        return (
          <CreatorPreferencesStep
            {...commonProps}
            data={formState.data.creatorPreferences}
            errors={formState.errors.creatorPreferences}
          />
        );

      case 'budget-payment-preference':
        return (
          <BudgetPaymentPreferenceStep
            {...commonProps}
            data={formState.data.budgetPaymentPreference}
            errors={formState.errors.budgetPaymentPreference}
          />
        );

      case 'timeline-deliverables':
        return (
          <TimelineDeliverablesStep
            {...commonProps}
            data={formState.data.timelineDeliverables}
            errors={formState.errors.timelineDeliverables}
          />
        );

      case 'additional-information':
        return (
          <AdditionalInformationStep
            {...commonProps}
            data={formState.data.additionalInformation}
            errors={formState.errors.additionalInformation}
          />
        );

      case 'agreement-submission':
        return (
          <AgreementSubmissionStep
            {...commonProps}
            data={formState.data.agreementSubmission}
            errors={formState.errors.agreementSubmission}
            onSubmit={submitForm}
            isSubmitting={formState.isSubmitting}
          />
        );

      default:
        return null;
    }
  };

  const shouldShowProgress = !['welcome'].includes(formState.currentStep);
  const shouldShowNavigation = !['welcome'].includes(formState.currentStep);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Progress indicator */}
        {shouldShowProgress && (
          <FormProgress
            currentStep={currentStepIndex - 1} // Adjust for welcome step
            totalSteps={totalSteps}
          />
        )}

        {/* Form content */}
        <div className="max-w-4xl mx-auto">{renderCurrentStep()}</div>

        {/* Navigation */}
        {shouldShowNavigation && formState.currentStep !== 'agreement-submission' && (
          <FormNavigation
            canGoBack={currentStepIndex > 1}
            canGoNext={true}
            onBack={goToPreviousStep}
            onNext={handleNextStep}
            isLoading={formState.isSubmitting}
          />
        )}

        {/* General error display */}
        {formState.errors.general && (
          <div className="max-w-4xl mx-auto mt-6">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
              <p className="text-red-400">{formState.errors.general}</p>
            </div>
          </div>
        )}

        {/* Draft Resume Modal */}
        {draftData && (
          <DraftResumeModal
            isOpen={draftModalOpen}
            lastUpdated={draftData.lastUpdated}
            onResume={handleResumeDraft}
            onStartFresh={handleStartFresh}
          />
        )}
      </div>
    </div>
  );
}
