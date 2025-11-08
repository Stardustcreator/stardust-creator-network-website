import { useState } from 'react';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type {
  VerificationAgreement,
  Country,
  CreatorApplicationFormData,
} from '@/types/creator-application.types';

interface VerificationAgreementStepProps {
  data?: Partial<VerificationAgreement>;
  errors?: Partial<Record<keyof VerificationAgreement, string>>;
  updateFormData: <K extends keyof CreatorApplicationFormData>(
    section: K,
    data: Partial<CreatorApplicationFormData[K]>
  ) => void;
  country?: Country;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

export default function VerificationAgreementStep({
  data = {},
  errors = {},
  updateFormData,
  onSubmit,
  isSubmitting,
}: VerificationAgreementStepProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (field: keyof VerificationAgreement, value: boolean | File | null) => {
    updateFormData('verificationAgreement', { [field]: value });
  };

  const handleFileUpload = (file: File | null) => {
    handleInputChange('mediaKit', file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <Heading
          level={1}
          className="text-white text-2xl md:text-3xl mb-2"
        >
          Verification & Agreement
        </Heading>

        <Text
          variant="large"
          className="text-white opacity-80"
        >
          We maintain high standards for authenticity and brand safety.
        </Text>
      </div>

      {/* Form Fields */}
      <div className="space-y-8">
        {/* Media Kit Upload */}
        <div>
          <label className="block text-white text-sm font-medium mb-4">
            Upload your media kit or sample work
            <span className="text-white/60">(Optional)</span>
          </label>

          <div
            className={`
              relative border-2 border-dashed rounded-lg p-8 text-center transition-all
              ${
                dragActive
                  ? 'border-purple-400 bg-purple-500/10'
                  : 'border-white/30 bg-white/5 hover:border-white/50 hover:bg-white/10'
              }
            `}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {data.mediaKit ? (
              <div className="flex items-center justify-between bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-8 h-8 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <div className="text-left">
                    <div className="text-white font-medium">{data.mediaKit.name}</div>
                    <div className="text-white/60 text-sm">
                      {formatFileSize(data.mediaKit.size)}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleFileUpload(null)}
                  className="text-red-400 hover:text-red-300 p-1"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <>
                <svg
                  className="w-12 h-12 text-white/40 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <Text
                  variant="body"
                  className="text-white mb-2"
                >
                  Drop your file here, or <span className="text-purple-400">browse</span>
                </Text>
                <Text
                  variant="caption"
                  className="text-white opacity-60"
                >
                  PDF, Images, or Word documents up to 10MB
                </Text>
                <input
                  type="file"
                  onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                  accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </>
            )}
          </div>

          {errors.mediaKit && <p className="text-red-400 text-sm mt-2">{errors.mediaKit}</p>}
        </div>

        {/* Authenticity Confirmation */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.authenticityConfirmed || false}
              onChange={e => handleInputChange('authenticityConfirmed', e.target.checked)}
              className="sr-only"
            />
            <div
              className={`
              w-5 h-5 rounded border-2 flex items-center justify-center mt-1 flex-shrink-0
              ${
                data.authenticityConfirmed
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-500'
                  : 'border-white/30'
              }
            `}
            >
              {data.authenticityConfirmed && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <Text
                variant="body"
                className="text-white font-medium"
              >
                Confirm authenticity *
              </Text>
              <Text
                variant="caption"
                className="text-white opacity-70 mt-1"
              >
                I confirm that I own the social accounts listed and that my content complies with
                community guidelines.
              </Text>
            </div>
          </label>
          {errors.authenticityConfirmed && (
            <p className="text-red-400 text-sm mt-2">{errors.authenticityConfirmed}</p>
          )}
        </div>

        {/* Terms Agreement */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.termsAgreed || false}
              onChange={e => handleInputChange('termsAgreed', e.target.checked)}
              className="sr-only"
            />
            <div
              className={`
              w-5 h-5 rounded border-2 flex items-center justify-center mt-1 flex-shrink-0
              ${
                data.termsAgreed
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-500'
                  : 'border-white/30'
              }
            `}
            >
              {data.termsAgreed && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <Text
                variant="body"
                className="text-white font-medium"
              >
                Agree to terms *
              </Text>
              <Text
                variant="caption"
                className="text-white opacity-70 mt-1"
              >
                I have read and agree to SCN&apos;s{' '}
                <a
                  href="/legal/terms"
                  className="text-purple-400 hover:text-purple-300 underline"
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="/legal/privacy"
                  className="text-purple-400 hover:text-purple-300 underline"
                >
                  Privacy Policy
                </a>
                .
              </Text>
            </div>
          </label>
          {errors.termsAgreed && <p className="text-red-400 text-sm mt-2">{errors.termsAgreed}</p>}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-12 text-center">
        <button
          type="button"
          onClick={onSubmit}
          disabled={!data.authenticityConfirmed || !data.termsAgreed || isSubmitting}
          className={`
            px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 flex items-center gap-3 mx-auto
            ${
              data.authenticityConfirmed && data.termsAgreed && !isSubmitting
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25'
                : 'bg-white/10 text-white/50 cursor-not-allowed'
            }
          `}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting Application...
            </>
          ) : (
            <>
              Submit Application
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </>
          )}
        </button>

        <Text
          variant="caption"
          className="text-white opacity-60 mt-4"
        >
          By submitting, you&apos;re applying to join the Stardust Creator Network
        </Text>
      </div>

      {/* Security Notice */}
      <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <Text
              variant="body"
              className="text-white opacity-90 mb-1 font-medium"
            >
              Your Data is Secure
            </Text>
            <Text
              variant="caption"
              className="text-white opacity-70 leading-relaxed"
            >
              All information is encrypted and stored securely. We never share your personal data
              without explicit consent. Your application will be reviewed by our team within 3-5
              business days.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
