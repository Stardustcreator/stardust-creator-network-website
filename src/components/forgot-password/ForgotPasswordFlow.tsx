'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EmailStep from './EmailStep';
import OtpStep from './OtpStep';
import ResetStep from './ResetStep';

type ForgotStep = 'email' | 'otp' | 'reset';

export default function ForgotPasswordFlow() {
  const router = useRouter();
  const [step, setStep] = useState<ForgotStep>('email');
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [step]);

  if (step === 'otp') {
    return (
      <OtpStep
        email={email}
        onVerified={token => {
          setResetToken(token);
          setStep('reset');
        }}
        onEditEmail={() => setStep('email')}
      />
    );
  }

  if (step === 'reset') {
    return (
      <ResetStep
        resetToken={resetToken}
        onComplete={() => router.push('/signin')}
      />
    );
  }

  return (
    <EmailStep
      onSent={sent => {
        setEmail(sent);
        setStep('otp');
      }}
    />
  );
}
