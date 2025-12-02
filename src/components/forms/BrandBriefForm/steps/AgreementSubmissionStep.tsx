import { useCallback } from 'react';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type { AgreementSubmission, Country, BrandBriefFormData } from '@/types/brand-brief.types';

interface AgreementSubmissionStepProps {
  data?: Partial<AgreementSubmission>;
  errors?: Partial<Record<keyof AgreementSubmission, string>>;
  updateFormData: <K extends keyof BrandBriefFormData>(
    section: K,
    data: Partial<BrandBriefFormData[K]>
  ) => void;
  country: Country;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function AgreementSubmissionStep({
  data = {},
  errors = {},
  updateFormData,
  country: _country, // eslint-disable-line @typescript-eslint/no-unused-vars
  onSubmit,
  isSubmitting,
}: AgreementSubmissionStepProps) {
  const handleCheckboxChange = useCallback(
    (field: keyof AgreementSubmission, checked: boolean) => {
      updateFormData('agreementSubmission', { [field]: checked });
    },
    [updateFormData]
  );

  const canSubmit = data.authorizedConfirmed && data.termsAgreed;

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-3 py-1 mb-4">
          <span className="text-purple-300 text-sm font-medium">🧾 Section 7</span>
        </div>

        <Heading
          level={2}
          className="text-white text-2xl md:text-3xl mb-2"
        >
          Agreement & Submission
        </Heading>

        <Text
          variant="large"
          className="text-white opacity-80"
        >
          Just one last step!
        </Text>
      </div>

      {/* Agreement Checkboxes */}
      <div className="space-y-6 mb-8">
        {/* Authorization Confirmation */}
        <div>
          <label
            className={`
              flex items-start space-x-4 p-4 rounded-lg border cursor-pointer transition-all
              ${
                data.authorizedConfirmed
                  ? 'bg-purple-500/20 border-purple-400/50'
                  : 'bg-white/5 border-white/20 hover:bg-white/10'
              }
              ${errors.authorizedConfirmed ? 'border-red-500/50' : ''}
            `}
          >
            <input
              type="checkbox"
              checked={data.authorizedConfirmed || false}
              onChange={e => handleCheckboxChange('authorizedConfirmed', e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-purple-500 focus:ring-purple-400 mt-0.5"
            />
            <div className="flex-1">
              <Text
                variant="body"
                className="text-white font-medium"
              >
                I confirm I am authorized to represent this brand or agency.
              </Text>
            </div>
          </label>
          {errors.authorizedConfirmed && (
            <p className="text-red-400 text-sm mt-1 ml-9">{errors.authorizedConfirmed}</p>
          )}
        </div>

        {/* Terms Agreement */}
        <div>
          <label
            className={`
              flex items-start space-x-4 p-4 rounded-lg border cursor-pointer transition-all
              ${
                data.termsAgreed
                  ? 'bg-purple-500/20 border-purple-400/50'
                  : 'bg-white/5 border-white/20 hover:bg-white/10'
              }
              ${errors.termsAgreed ? 'border-red-500/50' : ''}
            `}
          >
            <input
              type="checkbox"
              checked={data.termsAgreed || false}
              onChange={e => handleCheckboxChange('termsAgreed', e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-purple-500 focus:ring-purple-400 mt-0.5"
            />
            <div className="flex-1">
              <Text
                variant="body"
                className="text-white font-medium"
              >
                I agree to SCN&apos;s{' '}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 underline"
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 underline"
                >
                  Privacy Policy
                </a>
                .
              </Text>
            </div>
          </label>
          {errors.termsAgreed && (
            <p className="text-red-400 text-sm mt-1 ml-9">{errors.termsAgreed}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          onClick={onSubmit}
          disabled={!canSubmit || isSubmitting}
          className={`
            group relative inline-flex items-center justify-center px-8 py-4 font-semibold rounded-xl 
            transition-all duration-300 transform shadow-lg
            ${
              canSubmit && !isSubmitting
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-105 hover:shadow-xl cursor-pointer'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              Submitting Brief...
            </>
          ) : (
            <span className="relative z-10">Submit Brief</span>
          )}

          {canSubmit && !isSubmitting && (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-pink-600/50 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
          )}
        </button>

        <Text
          variant="small"
          className="text-gray-400 mt-4"
        >
          Our partnerships team will review your brief within 72 hours
        </Text>
      </div>

      {/* Security Note */}
      <div className="mt-8 p-4 bg-gray-800/30 border border-gray-600/30 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-gray-600/30 rounded-full flex-shrink-0 mt-0.5">
            <div className="w-2 h-2 bg-gray-400 rounded-full mx-auto mt-1.5"></div>
          </div>
          <div>
            <Text
              variant="small"
              className="text-gray-300 font-medium mb-1"
            >
              Data Security
            </Text>
            <Text
              variant="small"
              className="text-gray-400"
            >
              Your information is encrypted and stored securely. We will never share your data with
              third parties without your explicit consent.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
