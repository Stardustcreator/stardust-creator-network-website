'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heading, Text } from '@/components/typography';
import FormInput from '@/components/ui/FormInput';
import GoogleIcon from '@/components/icons/GoogleIcon';
import Button from '@/components/ui/Button';
import { login, initiateGoogleAuth, resendVerification } from '@/lib/api/auth';
import { getSubscription } from '@/lib/api/subscriptions';
import { getScnDashboardUrl } from '@/lib/scn-dashboard';
import { toast } from '@/lib/toast';
import { getMyProfile } from '@/lib/api/user';

// Exact matches to backend messages for accounts that never finished
// registration. The recovery action resumes the matching onboarding step.
const ACCOUNT_SETUP_INCOMPLETE_MESSAGE = 'Please finish setting up your account before logging in';
const EMAIL_NOT_VERIFIED_MESSAGE = 'Please verify your email address before logging in';

type RegistrationRecovery = 'needs-password' | 'needs-verification' | null;

export default function SignInForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationRecovery, setRegistrationRecovery] = useState<RegistrationRecovery>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }

  function validate() {
    const next: Partial<typeof formData> = {};
    if (!formData.email.trim()) {
      next.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = 'Please enter a valid email address.';
    }
    if (!formData.password) {
      next.password = 'Password is required.';
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
    setRegistrationRecovery(null);
    try {
      await login(formData.email, formData.password);
      const result = await getMyProfile();

      // const subscription = await getSubscription();

      if (!result || !result.id) {
        // toast.error('Please complete the onboarding process.');
        // router.push('/onboarding');
        return;
      }

      // if (subscription.status !== 'active') {
      //   // toast.error('Your subscription is not active.');
      //   router.push('/onboarding/reactivate');
      //   return;
      // }

      window.location.href = getScnDashboardUrl();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      if (message === ACCOUNT_SETUP_INCOMPLETE_MESSAGE) {
        setRegistrationRecovery('needs-password');
      } else if (message === EMAIL_NOT_VERIFIED_MESSAGE) {
        setRegistrationRecovery('needs-verification');
      } else {
        setRegistrationRecovery(null);
        toast.error(message);
      }
      setIsSubmitting(false);
    }
  }

  async function handleFinishSetup() {
    const params = new URLSearchParams({ email: formData.email });
    if (registrationRecovery === 'needs-verification') {
      setIsSubmitting(true);
      try {
        await resendVerification(formData.email);
        toast.success('Verification code sent to your email');
        params.set('step', 'otp');
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Could not resend verification code.');
        setIsSubmitting(false);
        return;
      }
    }

    router.push(`/onboarding/create-account?${params.toString()}`);
  }

  function handleUseDifferentEmail() {
    setRegistrationRecovery(null);
    setFormData(prev => ({ ...prev, password: '' }));
  }

  const recoveryTitle =
    registrationRecovery === 'needs-password'
      ? 'Finish setting up your account'
      : 'Verify your email to continue';
  const recoveryMessage =
    registrationRecovery === 'needs-password'
      ? 'Your email is verified, but you still need to set a password before signing in.'
      : `We will send a fresh verification code to ${formData.email}.`;
  const recoveryAction =
    registrationRecovery === 'needs-password' ? 'Continue account setup' : 'Send code and continue';

  return (
    <div className="max-w-3xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-6">
        <Heading
          level={4}
          variant="default"
          className="text-text-primary! mb-2"
        >
          Sign in to continue
        </Heading>
        <Text
          variant="body"
          className="text-text-secondary!"
        >
          Pick up where you left off and complete your subscription.
        </Text>
      </div>

      {registrationRecovery ? (
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-6 text-center">
          <Heading
            level={6}
            variant="default"
            className="text-text-primary! mb-3"
          >
            {recoveryTitle}
          </Heading>
          <Text
            variant="body"
            className="text-text-secondary! mb-5"
          >
            {recoveryMessage}
          </Text>
          <Button
            type="button"
            disabled={isSubmitting}
            className="w-full"
            onClick={handleFinishSetup}
          >
            {isSubmitting ? 'Please wait…' : recoveryAction}
          </Button>
          <button
            type="button"
            onClick={handleUseDifferentEmail}
            className="mt-4 text-sm font-semibold hover:underline text-text-action"
          >
            Use a different email
          </button>
        </div>
      ) : (
        <>
          {/* Google */}
          <Button
            type="button"
            variant="social"
            className="w-full mb-6"
            onClick={() => initiateGoogleAuth()}
          >
            <GoogleIcon />
            Sign in with Google
          </Button>

          {/* Divider */}
          <div className="relative flex items-center mb-6">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="px-4 text-xs md:text-sm text-neutral-400">or sign in with email</span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="mb-5">
              <FormInput
                label="Email"
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
                autoComplete="email"
              />
            </div>

            <div className="mb-6">
              <FormInput
                label="Password"
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
                autoComplete="current-password"
                showToggle
                labelAction={
                  <Link
                    href="/forgot-password"
                    className="text-sm font-semibold hover:underline"
                    style={{ color: 'var(--color-text-action)' }}
                  >
                    Forgot Password?
                  </Link>
                }
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Please wait…' : 'Sign In'}
            </Button>

            {/* {apiError && (
              <p
                className="mt-3 text-sm text-center text-surface-error"
                role="alert"
              >
                {apiError}
              </p>
            )} */}
          </form>
        </>
      )}

      <p className="text-center text-sm text-text-secondary mt-5">
        Don&apos;t have an account?{' '}
        <Link
          href="/onboarding"
          className="font-semibold hover:underline text-text-action"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
