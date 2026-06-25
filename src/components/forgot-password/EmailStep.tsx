'use client';

import { useState } from 'react';
import { Heading, Text } from '@/components/typography';
import FormInput from '@/components/ui/FormInput';
import Button from '@/components/ui/Button';
import { forgotPassword } from '@/lib/api/auth';
import { toast } from '@/lib/toast';

interface EmailStepProps {
  onSent: (email: string) => void;
}

export default function EmailStep({ onSent }: EmailStepProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email is required.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setIsSubmitting(true);
    try {
      await forgotPassword(email);
      toast.success('Code sent successfully');
      onSent(email);
    } catch (err) {
      // setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      toast.error(err instanceof Error ? err.message : 'Failed to send code');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <Heading
          level={4}
          variant="default"
          className="text-neutral-900! mb-2"
        >
          Forgot password
        </Heading>
        <Text
          variant="body"
          className="text-neutral-500!"
        >
          Enter your email and we&apos;ll send you a reset code.
        </Text>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="mb-5">
          <FormInput
            label="Email"
            id="fp-email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            error={error}
            required
            autoComplete="email"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Please wait…' : 'Send code'}
        </Button>
      </form>
    </div>
  );
}
