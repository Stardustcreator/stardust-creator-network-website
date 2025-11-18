'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type {
  Country,
  FormStep,
  CreatorApplicationFormData,
  FormState,
  MonetizationExperience,
} from '@/types/creator-application.types';
import { createCompleteFormSchema } from '@/lib/validations/creator-application.validations';

// Step components
import WelcomeStep from './steps/WelcomeStep';
import PersonalInformationStep from './steps/PersonalInformationStep';
import CreatorIdentityStep from './steps/CreatorIdentityStep';
import MonetizationExperienceStep from './steps/MonetizationExperienceStep';
import EducationToolsInterestStep from './steps/EducationToolsInterestStep';
import VerificationAgreementStep from './steps/VerificationAgreementStep';

// Shared components
import FormProgress from './FormProgress';
import FormNavigation from './FormNavigation';
import DraftResumeModal from '../DraftResumeModal';

interface CreatorApplicationFormProps {
  country: Country;
}

const FORM_STEPS: FormStep[] = [
  'welcome',
  'personal-information',
  'creator-identity',
  'monetization-experience',
  'education-tools-interest',
  'verification-agreement',
];

export default function CreatorApplicationForm({ country }: CreatorApplicationFormProps) {
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>({
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
    data: CreatorApplicationFormData;
  } | null>(null);
  const [draftChecked, setDraftChecked] = useState(false);

  const currentStepIndex = FORM_STEPS.indexOf(formState.currentStep);
  const totalSteps = FORM_STEPS.length - 1; // Exclude welcome from count

  // Check for existing draft when email is provided
  const checkForDraft = useCallback(
    async (email: string) => {
      if (draftChecked) return; // Only check once

      try {
        const response = await fetch(
          `/api/creator-application/draft?email=${encodeURIComponent(email)}`
        );
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
    if (!formState.data.personalInformation?.email) {
      return; // Need email to save draft
    }

    try {
      await fetch('/api/creator-application/draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formState.data.personalInformation.email,
          country,
          formData: formState.data,
        }),
      });
      console.log('Draft saved successfully');
    } catch (error) {
      console.warn('Failed to save draft:', error);
    }
  }, [formState.data, country]);

  // Early capture contact information to Mailchimp
  const performEarlyCapture = useCallback(async () => {
    if (earlyCaptured || !formState.data.personalInformation) {
      return; // Already captured or no data
    }

    const personalInfo = formState.data.personalInformation;

    // Only capture if user has consented
    if (!personalInfo.marketingConsent) {
      return;
    }

    // Check for existing draft when we have email
    if (!draftChecked) {
      await checkForDraft(personalInfo.email);
    }

    try {
      const response = await fetch('/api/early-capture/creator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: personalInfo.email,
          fullName: personalInfo.fullName,
          phoneNumber: personalInfo.phoneNumber,
          marketingConsent: personalInfo.marketingConsent,
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
  }, [earlyCaptured, formState.data.personalInformation, draftChecked, checkForDraft]);

  // Handle draft resume
  const handleResumeDraft = useCallback(() => {
    if (draftData) {
      setFormState(prev => ({
        ...prev,
        data: draftData.data,
        currentStep: 'personal-information', // Start from where they have data
      }));
      setDraftModalOpen(false);
    }
  }, [draftData]);

  // Handle start fresh
  const handleStartFresh = useCallback(() => {
    setDraftModalOpen(false);
    setDraftData(null);
  }, []);

  // Navigate to next step
  const goToNextStep = useCallback(async () => {
    // Perform early capture when moving from personal-information step
    if (formState.currentStep === 'personal-information') {
      await performEarlyCapture();
    }

    // Save draft after completing any section (except welcome)
    if (formState.currentStep !== 'welcome' && formState.data.personalInformation?.email) {
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
    formState.data.personalInformation?.email,
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
    <K extends keyof CreatorApplicationFormData>(
      section: K,
      data: Partial<CreatorApplicationFormData[K]>
    ) => {
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
      const schema = createCompleteFormSchema(country);

      switch (currentStep) {
        case 'personal-information':
          // Always validate - required fields should fail if missing
          schema.shape.personalInformation.parse(data.personalInformation || {});
          break;
        case 'creator-identity':
          schema.shape.creatorIdentity.parse(data.creatorIdentity || {});
          break;
        case 'monetization-experience':
          // Check if any data has been entered before validating
          const monetizationData =
            (data.monetizationExperience as Partial<MonetizationExperience>) || {};

          // Only validate if user has started filling the form
          if (
            monetizationData.workedWithBrands !== undefined ||
            monetizationData.feeRange ||
            (monetizationData.monetizationMethods &&
              monetizationData.monetizationMethods.length > 0) ||
            (monetizationData.opportunityInterests &&
              monetizationData.opportunityInterests.length > 0)
          ) {
            schema.shape.monetizationExperience.parse(monetizationData);
          } else {
            // If no data entered yet, fail validation with helpful message
            setFormState(prev => ({
              ...prev,
              errors: {
                ...prev.errors,
                monetizationExperience: {
                  workedWithBrands: 'Please indicate if you have worked with brands before',
                },
              },
            }));
            return false;
          }
          break;
        case 'education-tools-interest':
          schema.shape.educationToolsInterest.parse(data.educationToolsInterest || {});
          break;
        case 'verification-agreement':
          schema.shape.verificationAgreement.parse(data.verificationAgreement || {});
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

      console.log('Submitting form data:', JSON.stringify(submitData, null, 2));

      // Validate that all required sections exist before submitting
      const requiredSections: (keyof CreatorApplicationFormData)[] = [
        'personalInformation',
        'creatorIdentity',
        'monetizationExperience',
        'educationToolsInterest',
        'verificationAgreement',
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

      // Check if there's a file to upload
      const mediaKitFile = submitData.verificationAgreement?.mediaKit;
      const hasFile = mediaKitFile instanceof File;

      let response;
      try {
        if (hasFile) {
          // Use FormData when there's a file
          const formData = new FormData();

          // Add the file
          formData.append('mediaKit', mediaKitFile);

          // Add all other form data as JSON string
          const { mediaKit: _mediaKit, ...formDataWithoutFile } =
            submitData.verificationAgreement || {};
          const formDataToSend = {
            ...submitData,
            verificationAgreement: {
              ...formDataWithoutFile,
            },
          };
          formData.append('formData', JSON.stringify(formDataToSend));

          response = await fetch('/api/creator-application', {
            method: 'POST',
            body: formData,
          });
        } else {
          // Use JSON when there's no file
          response = await fetch('/api/creator-application', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(submitData),
          });
        }
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

          // Check if response is HTML (Next.js error page) instead of JSON
          if (errorText.trim().startsWith('<!DOCTYPE') || errorText.trim().startsWith('<html')) {
            console.error('Server returned HTML error page instead of JSON:', {
              status: response.status,
              statusText: response.statusText,
              preview: errorText.substring(0, 200),
            });
            errorData = {
              error: `Server error (${response.status}). Please try again later.`,
              isHtmlResponse: true,
            };
          } else {
            // Try to parse as JSON
            errorData = JSON.parse(errorText);
          }
        } catch (parseError) {
          console.error('Failed to parse error response:', parseError);
          errorData = {
            error: `Server error (${response.status}). Please try again later.`,
            parseError: true,
          };
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
            currentStep: 'personal-information', // Navigate back to personal info step
            errors: {
              ...prev.errors,
              personalInformation: {
                ...prev.errors.personalInformation,
                email:
                  'An application with this email address has already been submitted. Please use a different email address or contact us if you believe this is an error.',
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
        throw new Error(`Failed to submit application: ${userMessage}`);
      }

      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        console.error('Failed to parse JSON response:', jsonError);
        throw new Error('Invalid response format from server');
      }

      if (result.success) {
        // Redirect to country-specific confirmation page for better tracking
        const confirmationUrl =
          country === 'Nigeria'
            ? '/join/creator/nigeria/confirmation'
            : country === 'United Kingdom'
              ? '/join/creator/uk/confirmation'
              : '/join/creator/nigeria/confirmation'; // Default fallback

        router.push(confirmationUrl);
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormState(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          general: 'Failed to submit application. Please try again.',
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

      case 'personal-information':
        return (
          <PersonalInformationStep
            {...commonProps}
            data={formState.data.personalInformation}
            errors={formState.errors.personalInformation}
          />
        );

      case 'creator-identity':
        return (
          <CreatorIdentityStep
            {...commonProps}
            data={formState.data.creatorIdentity}
            errors={formState.errors.creatorIdentity}
          />
        );

      case 'monetization-experience':
        return (
          <MonetizationExperienceStep
            {...commonProps}
            data={formState.data.monetizationExperience}
            errors={formState.errors.monetizationExperience}
          />
        );

      case 'education-tools-interest':
        return (
          <EducationToolsInterestStep
            {...commonProps}
            data={formState.data.educationToolsInterest}
            errors={formState.errors.educationToolsInterest}
          />
        );

      case 'verification-agreement':
        return (
          <VerificationAgreementStep
            {...commonProps}
            data={formState.data.verificationAgreement}
            errors={formState.errors.verificationAgreement}
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
        {shouldShowNavigation && formState.currentStep !== 'verification-agreement' && (
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
