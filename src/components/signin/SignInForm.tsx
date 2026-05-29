'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heading, Text } from '@/components/typography';
import FormInput from '@/components/ui/FormInput';
import GoogleIcon from '@/components/icons/GoogleIcon';
import Button from '@/components/ui/Button';
import { login, initiateGoogleAuth } from '@/lib/api/auth';
import { getSubscription } from '@/lib/api/subscriptions';
import { toast } from '@/lib/toast';

export default function SignInForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    try {
      await login(formData.email, formData.password);
      const subscription = await getSubscription();

      if (!subscription || !subscription.id) {
        toast.error('Please complete the onboarding process.');
        router.push('/onboarding/payment');
        return;
      }

      if (subscription.status !== 'active') {
        // toast.error('Your subscription is not active.');
        router.push('/onboarding/reactivate');
        return;
      }

      window.location.href = 'https://stardust-creators-network.circle.so';
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  }

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

        <p className="text-center text-sm text-text-secondary mt-5">
          Don&apos;t have an account?{' '}
          <Link
            href="/onboarding"
            className="font-semibold hover:underline text-text-action"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
