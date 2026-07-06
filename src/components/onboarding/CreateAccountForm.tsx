'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heading, Text } from '@/components/typography';
import FormInput from '@/components/ui/FormInput';
import VerificationStep from './VerificationStep';
import SetPasswordStep from './SetPasswordStep';
import GoogleIcon from '@/components/icons/GoogleIcon';
import Button from '@/components/ui/Button';
import { initiateRegistration, initiateGoogleAuth, type DiscountPreview } from '@/lib/api/auth';
import { toast } from '@/lib/toast';
import PlanBanner from './PlanBanner';

type OnboardingSubstep = 'form' | 'otp' | 'password';
type BillingPeriod = 'annual' | 'monthly';
type PlanId = 'community' | 'starter' | 'builder';

interface CreateAccountFormProps {
  initialBilling: BillingPeriod;
  initialPlan: PlanId;
}

function toBackendPlanId(plan: PlanId, billing: BillingPeriod): string {
  if (plan === 'starter') return 'starter_free';
  return `${plan}_${billing}`;
}

function formatAmount(kobo: number, currency: string): string {
  return (kobo / 100).toLocaleString('en-NG', { style: 'currency', currency });
}

export default function CreateAccountForm({ initialBilling, initialPlan }: CreateAccountFormProps) {
  const router = useRouter();
  const billing = initialBilling;
  const planId = initialPlan;

  const [substep, setSubstep] = useState<OnboardingSubstep>('form');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [substep]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    discountCode: '',
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationToken, setRegistrationToken] = useState('');
  const [discountPreview, setDiscountPreview] = useState<DiscountPreview | undefined>();
  const [expanded, setExpanded] = useState(false);

  if (substep === 'otp') {
    return (
      <VerificationStep
        email={formData.email}
        onVerified={token => {
          setRegistrationToken(token);
          setSubstep('password');
        }}
        onEditEmail={() => setSubstep('form')}
      />
    );
  }

  if (substep === 'password') {
    return (
      <SetPasswordStep
        billing={billing}
        plan={planId}
        registrationToken={registrationToken}
        discountPreview={discountPreview}
        onComplete={reference => {
          const params = new URLSearchParams({
            reference,
            firstName: formData.firstName,
            email: formData.email,
          });

          router.push(`/onboarding/success?${params.toString()}`);
        }}
      />
    );
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }

  function validate() {
    const next: Partial<typeof formData> = {};
    if (!formData.firstName.trim()) next.firstName = 'First name is required.';
    if (!formData.lastName.trim()) next.lastName = 'Last name is required.';
    if (!formData.email.trim()) {
      next.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = 'Please enter a valid email address.';
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
    setApiError('');
    try {
      const backendPlanId = toBackendPlanId(planId, billing);
      const code =
        expanded && formData.discountCode.trim() ? formData.discountCode.trim() : undefined;

      const result = await initiateRegistration(
        formData.email,
        formData.firstName,
        formData.lastName,
        backendPlanId,
        code
      );

      if (result.discount) {
        setDiscountPreview(result.discount);
        toast.success(`Code ${result.discount.code} applied!`);
      }

      setSubstep('otp');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setApiError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Plan summary */}
      <div className="mb-8">
        <PlanBanner
          billing={billing}
          plan={planId}
        />
      </div>

      {/* Heading */}
      <div className="text-center mb-6">
        <Heading
          level={4}
          variant="default"
          className="text-neutral-900! mb-2"
        >
          Create Your SCN Account
        </Heading>
        <Text
          variant="body"
          className="text-neutral-500!"
        >
          Join Creators building, growing and earning all in one place.
        </Text>
      </div>

      {/* Google sign-up */}
      <Button
        type="button"
        variant="social"
        className="w-full mb-6"
        onClick={() => initiateGoogleAuth(billing, planId)}
      >
        <GoogleIcon />
        Sign up with Google
      </Button>

      {/* Divider */}
      <div className="relative flex items-center mb-6">
        <div className="flex-1 h-px bg-neutral-200" />
        <span className="px-4 text-xs md:text-sm text-neutral-400">or sign up with email</span>
        <div className="flex-1 h-px bg-neutral-200" />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Name row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <FormInput
            label="First Name"
            id="firstName"
            name="firstName"
            placeholder="Enter First Name"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            required
            autoComplete="given-name"
          />
          <FormInput
            label="Last Name"
            id="lastName"
            name="lastName"
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
            autoComplete="family-name"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <FormInput
            label="Email"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            autoComplete="email"
          />
        </div>

        {/* Discount code — shown for paid plans only */}
        {planId !== 'starter' && (
          <div className="space-y-3 mb-6 -mt-3">
            <p className="text-sm text-text-secondary">
              Got a discount code?{' '}
              <button
                type="button"
                onClick={() => setExpanded(v => !v)}
                disabled={isSubmitting}
                className="font-semibold text-text-action cursor-pointer underline-offset-2 hover:underline disabled:no-underline disabled:opacity-60"
              >
                {expanded ? 'Hide' : 'Click here'}
              </button>
            </p>

            {expanded && (
              <div className="flex items-center gap-3 w-full">
                <div className="flex-1">
                  <FormInput
                    label=""
                    id="discountCode"
                    name="discountCode"
                    type="text"
                    placeholder="e.g ABCD1234"
                    value={formData.discountCode}
                    onChange={handleChange}
                    error={errors.discountCode}
                    inputClassName="w-full"
                  />
                </div>
              </div>
            )}

            {/* Discount preview — shown after a valid code is confirmed */}
            {discountPreview && (
              <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm">
                <span className="font-semibold text-green-700">{discountPreview.code}</span>
                <span className="text-green-700">
                  {formatAmount(discountPreview.discountAmount, discountPreview.currency)} off — you
                  pay{' '}
                  <span className="font-semibold">
                    {discountPreview.finalAmount === 0
                      ? 'nothing'
                      : formatAmount(discountPreview.finalAmount, discountPreview.currency)}
                  </span>
                </span>
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Please wait…' : 'Continue'}
        </Button>

        {apiError && (
          <p
            className="mt-3 text-sm text-center text-surface-error"
            role="alert"
          >
            {apiError}
          </p>
        )}

        {/* Sign in link */}
        <p className="text-center text-sm text-text-secondary mt-5">
          Already have an account?{' '}
          <Link
            href="/signin"
            className="font-semibold hover:underline"
            style={{ color: 'var(--color-text-action)' }}
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
