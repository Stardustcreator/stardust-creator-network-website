'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Heading, Text } from '@/components/typography';
import Button from '@/components/ui/Button';
import ResetStep from '@/components/forgot-password/ResetStep';
import {
  declineCreatorInvite,
  exchangeCreatorInvite,
  type CreatorInviteExchange,
} from '@/lib/api/auth';
import { toast } from '@/lib/toast';

type View =
  | { name: 'loading' }
  | { name: 'ready'; invite: CreatorInviteExchange }
  | { name: 'invalid' }
  | { name: 'error'; message: string }
  | { name: 'declined' };

function Message({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <Heading
        level={3}
        variant="default"
        className="text-neutral-900! mb-2"
      >
        {title}
      </Heading>
      <Text
        variant="body"
        className="text-neutral-500! mb-6"
      >
        {body}
      </Text>
      {children}
    </div>
  );
}

export default function SetPasswordFlow() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params?.get('token') ?? null;
  const isCreatorInvite = params?.get('context') === 'creator-invite';

  const [view, setView] = useState<View>({ name: 'loading' });
  const [confirmingDecline, setConfirmingDecline] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);

  useEffect(() => {
    if (!token || !isCreatorInvite) {
      setView({ name: 'invalid' });
      return;
    }

    let cancelled = false;
    exchangeCreatorInvite(token)
      .then(invite => {
        if (!cancelled) setView({ name: 'ready', invite });
      })
      .catch(err => {
        if (cancelled) return;
        if ((err as { code?: string }).code === 'CREATOR_INVITE_LINK_INVALID') {
          setView({ name: 'invalid' });
        } else {
          setView({
            name: 'error',
            message: err instanceof Error ? err.message : 'Something went wrong.',
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [token, isCreatorInvite]);

  async function handleDecline() {
    if (!token) return;
    setIsDeclining(true);
    try {
      await declineCreatorInvite(token);
      setView({ name: 'declined' });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not decline the invitation');
      setIsDeclining(false);
    }
  }

  if (view.name === 'loading') {
    return (
      <Message
        title="Checking your invitation"
        body="One moment please."
      />
    );
  }

  if (view.name === 'invalid') {
    return (
      <Message
        title="This link no longer works"
        body="It may have expired, been replaced by a newer invitation, already been used, or been declined. Contact the Stardust Creator Network team to ask for a new invitation."
      >
        <Link
          href="/signin"
          className="text-sm text-neutral-500 hover:text-neutral-800 underline"
        >
          Go to Sign In
        </Link>
      </Message>
    );
  }

  if (view.name === 'error') {
    return (
      <Message
        title="We could not check your invitation"
        body={view.message}
      >
        <Button onClick={() => window.location.reload()}>Try again</Button>
      </Message>
    );
  }

  if (view.name === 'declined') {
    return (
      <Message
        title="Invitation declined"
        body="We have recorded your decision. If you change your mind, contact the Stardust Creator Network team."
      />
    );
  }

  const { invite } = view;

  return (
    <>
      <ResetStep
        resetToken={invite.resetToken}
        onComplete={() => router.push('/signin')}
        title={invite.firstName ? `Welcome, ${invite.firstName}` : 'Welcome to SCN'}
        description="Set a password to join Stardust Creator Network. You can then sign in and review your profile."
        submitLabel="Set Password"
      />

      <div className="max-w-2xl mx-auto mt-6 text-center">
        {confirmingDecline ? (
          <div>
            <Text
              variant="body"
              className="text-neutral-500! mb-3"
            >
              Decline this invitation? This link will stop working.
            </Text>
            <div className="flex justify-center gap-3">
              <Button
                onClick={handleDecline}
                disabled={isDeclining}
              >
                {isDeclining ? 'Please wait…' : 'Yes, decline'}
              </Button>
              <Button
                onClick={() => setConfirmingDecline(false)}
                disabled={isDeclining}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmingDecline(true)}
            className="text-sm text-neutral-500 hover:text-neutral-800 underline"
          >
            I am not interested
          </button>
        )}
      </div>
    </>
  );
}
