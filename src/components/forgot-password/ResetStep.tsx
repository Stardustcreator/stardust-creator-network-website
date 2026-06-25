'use client';

import { useState } from 'react';
import { Heading, Text } from '@/components/typography';
import FormInput from '@/components/ui/FormInput';
import Button from '@/components/ui/Button';
import { resetPassword } from '@/lib/api/auth';
import { toast } from '@/lib/toast';
import { validatePassword } from '@/lib/validations/password.validations';

interface ResetStepProps {
  resetToken: string;
  onComplete: () => void;
}

export default function ResetStep({ resetToken, onComplete }: ResetStepProps) {
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
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
    const passwordError = validatePassword(formData.password);
    if (passwordError) next.password = passwordError;
    if (!formData.confirmPassword) {
      next.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      next.confirmPassword = 'Passwords do not match.';
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
      await resetPassword(resetToken, formData.password);
      toast.success('Password reset successfully');
      onComplete();
    } catch (err) {
      // setApiError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      toast.error(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <Heading
          level={3}
          variant="default"
          className="text-neutral-900! mb-2"
        >
          Reset your password
        </Heading>
        <Text
          variant="body"
          className="text-neutral-500!"
        >
          Create a new password for your account.
        </Text>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="mb-5">
          <FormInput
            label="New Password"
            id="new-password"
            name="password"
            type="password"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
            autoComplete="new-password"
            showToggle
          />
        </div>

        <div className="mb-6">
          <FormInput
            label="Confirm Password"
            id="confirm-password"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter your Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
            autoComplete="new-password"
            showToggle
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Please wait…' : 'Reset Password'}
        </Button>

        {apiError && (
          <p
            className="mt-3 text-sm text-center text-surface-error"
            role="alert"
          >
            {apiError}
          </p>
        )}
      </form>
    </div>
  );
}
