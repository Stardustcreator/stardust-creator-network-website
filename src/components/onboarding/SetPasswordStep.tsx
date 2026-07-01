'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heading, Text } from '@/components/typography';
import PlanBanner from './PlanBanner';
import FormInput from '@/components/ui/FormInput';
import Button from '@/components/ui/Button';
import CheckIcon from '@/components/icons/CheckIcon';
import { completeRegistration, type DiscountPreview } from '@/lib/api/auth';
import { getScnDashboardUrl } from '@/lib/scn-dashboard';
import { toast } from '@/lib/toast';
import { validatePassword } from '@/lib/validations/password.validations';

interface SetPasswordStepProps {
  billing: 'annual' | 'monthly';
  plan: 'community' | 'starter' | 'builder';
  registrationToken: string;
  discountPreview?: DiscountPreview;
  onComplete: (reference: string) => void;
}

function SuccessBanner() {
  return (
    <div className="w-full flex items-center justify-center gap-2 rounded-lg px-5 py-3 mb-6 bg-green-50 border border-green-200">
      <CheckIcon className="w-4 h-4 text-green-600 shrink-0" />
      <span className="text-sm font-medium text-green-700">Email verified successfully</span>
    </div>
  );
}

export default function SetPasswordStep({
  billing,
  plan,
  registrationToken,
  discountPreview,
  onComplete,
}: SetPasswordStepProps) {
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Partial<typeof formData & { terms: string }>>({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationCompleted, setRegistrationCompleted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }

  function validate() {
    const next: Partial<typeof formData & { terms: string }> = {};
    const passwordError = validatePassword(formData.password);
    if (passwordError) next.password = passwordError;
    if (!formData.confirmPassword) {
      next.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      next.confirmPassword = 'Passwords do not match.';
    }
    if (!agreedToTerms) {
      next.terms = 'You must agree to the Terms of Service and Privacy Policy.';
    }
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setIsSubmitting(true);
    try {
      let checkoutUrl: string | undefined;
      let reference: string | undefined;

      if (!registrationCompleted) {
        const result = await completeRegistration(registrationToken, formData.password, true);
        setRegistrationCompleted(true);
        checkoutUrl = result.subscription.checkoutUrl;
        reference = result.subscription.reference;

        if (!result.subscription.requiresPayment) {
          window.location.href = getScnDashboardUrl();
          return;
        }
      }

      if (!checkoutUrl || !reference) throw new Error('Invalid payment session. Please try again.');

      const accessCode = checkoutUrl.split('/').pop();
      if (!accessCode) throw new Error('Invalid payment session. Please try again.');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { default: PaystackPop } = (await import('@paystack/inline-js')) as any;
      const popup = new PaystackPop();
      const trans = popup.resumeTransaction(accessCode);

      trans.onSuccess = () => onComplete(reference!);
      trans.onError = () => {
        toast.error('Payment failed. Please try again.');
        setIsSubmitting(false);
      };
      trans.onCancel = () => setIsSubmitting(false);

      // Don't reset isSubmitting here — Paystack callbacks handle it
      return;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
    setIsSubmitting(false);
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* <SuccessBanner /> */}

      <div className="mb-8">
        <PlanBanner
          billing={billing}
          plan={plan}
          hideChanger
        />
      </div>

      <div className="text-center mb-6">
        <Heading
          level={4}
          variant="default"
          className="text-neutral-900! mb-2"
        >
          Set your password
        </Heading>
        <Text
          variant="body"
          className="text-neutral-500!"
        >
          Almost done – create a password to secure your account.
        </Text>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="mb-5">
          <FormInput
            label="Password"
            id="password"
            name="password"
            type="password"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
            autoComplete="new-password"
            showToggle
            disabled={registrationCompleted}
          />
        </div>

        <div className="mb-6">
          <FormInput
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter your Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
            autoComplete="new-password"
            showToggle
            disabled={registrationCompleted}
          />
        </div>

        <div className="mb-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={e => {
                setAgreedToTerms(e.target.checked);
                if (errors.terms) setErrors(prev => ({ ...prev, terms: undefined }));
              }}
              disabled={registrationCompleted}
              className="mt-0.5 w-4 h-4 shrink-0 accent-brand-purple cursor-pointer disabled:cursor-not-allowed"
            />
            <span className="text-sm text-neutral-600 leading-snug">
              I agree to the{' '}
              <Link
                href="/legal/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:underline text-text-action"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:underline text-text-action"
              >
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.terms && (
            <p
              className="mt-1.5 text-sm text-surface-error"
              role="alert"
            >
              {errors.terms}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting
            ? 'Please wait…'
            : plan === 'starter' || discountPreview?.finalAmount === 0
              ? 'Complete Registration'
              : registrationCompleted
                ? 'Retry Payment'
                : 'Continue to Payment'}
        </Button>
      </form>
    </div>
  );
}
