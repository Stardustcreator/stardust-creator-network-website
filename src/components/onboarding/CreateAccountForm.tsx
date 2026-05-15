'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Heading, Text } from '@/components/typography';
import PlanBanner from './PlanBanner';
import FormInput from './FormInput';

function GoogleIcon() {
  return (
    <svg
      className="w-5 h-5 shrink-0"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default function CreateAccountForm() {
  const searchParams = useSearchParams();
  const billing = (searchParams?.get('billing') ?? 'monthly') as 'annual' | 'monthly';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
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
    // Payment step integration goes here
    setIsSubmitting(false);
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Plan summary */}
      <div className="mb-8">
        <PlanBanner billing={billing} />
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
      <button
        type="button"
        className="w-full flex items-center cursor-pointer justify-center gap-3 bg-white border border-neutral-300 rounded-lg py-3 px-4 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors duration-150 mb-6"
      >
        <GoogleIcon />
        Sign up with Google
      </button>

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
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-6 rounded-lg text-white font-semibold transition-opacity duration-150 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed bg-surface-action"
        >
          {isSubmitting ? 'Please wait…' : 'Continue to Payment'}
        </button>

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
