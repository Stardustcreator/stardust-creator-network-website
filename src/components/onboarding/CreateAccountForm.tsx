'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heading, Text } from '@/components/typography';
import FormInput from '@/components/ui/FormInput';
import VerificationStep from './VerificationStep';
import SetPasswordStep from './SetPasswordStep';
import PaymentStep from './PaymentStep';
import GoogleIcon from '@/components/icons/GoogleIcon';
import Button from '@/components/ui/Button';
import { initiateRegistration, initiateGoogleAuth } from '@/lib/api/auth';
import { toast } from '@/lib/toast';
import PlanBanner from './PlanBanner';

type OnboardingSubstep = 'form' | 'otp' | 'password' | 'payment';
type BillingPeriod = 'annual' | 'monthly';
type PlanId = 'community' | 'starter' | 'builder';

interface CreateAccountFormProps {
  initialBilling: BillingPeriod;
  initialPlan: PlanId;
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
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationToken, setRegistrationToken] = useState('');
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [paymentReference, setPaymentReference] = useState('');

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
        onComplete={reference => {
          // setCheckoutUrl(url);
          // setPaymentReference(reference);
          // setSubstep('payment');
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

  if (substep === 'payment') {
    return (
      <PaymentStep
        checkoutUrl={checkoutUrl}
        onSuccess={() => {
          const params = new URLSearchParams({
            reference: paymentReference,
            firstName: formData.firstName,
            email: formData.email,
          });

          router.push(`/onboarding/success?${params.toString()}`);
        }}
        onCancel={() => setSubstep('password')}
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
    console.log('Create account submit initiated with data:', {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
    });
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setIsSubmitting(true);
    setApiError('');
    console.warn('Create account submit started:', {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
    });
    try {
      await initiateRegistration(formData.email, formData.firstName, formData.lastName);
      toast.success('Registration successful');
      setSubstep('otp');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      console.error('Create account submit failed:', {
        message,
        error:
          err instanceof Error
            ? {
                name: err.name,
                message: err.message,
                stack: err.stack,
                cause: (err as Error & { cause?: unknown }).cause,
              }
            : err,
      });
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
          Join 50+ Nigerian creators diversifying their income with structure and community.
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
