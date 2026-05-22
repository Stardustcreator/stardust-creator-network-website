'use client';

import { useState, useRef, useEffect } from 'react';
import { Heading, Text } from '@/components/typography';
import Button from '@/components/ui/Button';
import { verifyResetOtp, forgotPassword } from '@/lib/api/auth';
import { toast } from '@/lib/toast';

interface OtpStepProps {
  email: string;
  onVerified: (resetToken: string) => void;
  onEditEmail: () => void;
}

export default function OtpStep({ email, onVerified, onEditEmail }: OtpStepProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(120);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const countdownDisplay = `${minutes}:${String(seconds).padStart(2, '0')}`;

  function handleChange(index: number, value: string) {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    setError('');
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6).split('');
    const next = [...otp];
    digits.forEach((d, i) => {
      next[i] = d;
    });
    setOtp(next);
    const nextFocus = Math.min(digits.length, 5);
    inputRefs.current[nextFocus]?.focus();
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      setError('Please enter the complete 6-digit code.');
      return;
    }
    setIsVerifying(true);
    setError('');
    try {
      const { resetToken } = await verifyResetOtp(email, code);
      toast.success('OTP verified successfully');
      onVerified(resetToken);
    } catch (err) {
      // setError(err instanceof Error ? err.message : 'Verification failed. Please try again.');
      toast.error(err instanceof Error ? err.message : 'Failed to verify OTP');
    } finally {
      setIsVerifying(false);
    }
  }

  async function handleResend() {
    setCountdown(120);
    setOtp(['', '', '', '', '', '']);
    setError('');
    inputRefs.current[0]?.focus();
    try {
      await forgotPassword(email);
      toast.success('New OTP sent successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to resend OTP');
      // resend failures are non-blocking — countdown already reset
    }
  }

  return (
    <div className="max-w-md mx-auto text-center px-2">
      <Heading
        level={3}
        variant="default"
        className="text-neutral-900! mb-3"
      >
        Enter the OTP
      </Heading>
      <Text
        variant="body"
        className="text-neutral-500! mb-8"
      >
        Enter the one-time password sent to{' '}
        <span className="font-medium text-neutral-800">{email}</span>{' '}
        <button
          type="button"
          onClick={onEditEmail}
          className="font-semibold hover:underline text-text-action"
        >
          Edit
        </button>
      </Text>

      <form onSubmit={handleVerify}>
        <div
          className="flex items-center justify-between gap-3 mb-6"
          onPaste={handlePaste}
        >
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={el => {
                inputRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              className="w-12 lg:w-14 h-12 lg:h-14 text-center text-xl font-semibold rounded-lg outline-none transition-colors duration-150 text-neutral-900"
              style={{
                border: `0.6px solid ${
                  error
                    ? 'var(--color-stroke-error)'
                    : digit
                      ? 'var(--color-stroke-action)'
                      : 'var(--color-stroke-primary)'
                }`,
              }}
              aria-label={`OTP digit ${i + 1}`}
            />
          ))}
        </div>

        {error && (
          <p
            className="text-sm text-surface-error mb-4"
            role="alert"
          >
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={isVerifying}
          className="w-full lg:w-1/3 mb-5"
        >
          {isVerifying ? 'Verifying…' : 'Verify code'}
        </Button>

        <p className="text-sm text-neutral-500">
          Didn&apos;t receive an email?{' '}
          {countdown > 0 ? (
            <span>
              Resend code in{' '}
              <span className="font-semibold text-neutral-700">{countdownDisplay}</span>
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="font-semibold hover:underline text-text-action"
            >
              Resend code
            </button>
          )}
        </p>
      </form>
    </div>
  );
}
