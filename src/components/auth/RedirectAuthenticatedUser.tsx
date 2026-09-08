'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { checkSubscriptionAccess } from '@/lib/api/subscriptions';
import { getScnDashboardUrl } from '@/lib/scn-dashboard';

interface RedirectAuthenticatedUserProps {
  children: ReactNode;
  inactiveRedirect?: string;
  noSubscriptionRedirect?: string;
}

export default function RedirectAuthenticatedUser({
  children,
  inactiveRedirect,
  noSubscriptionRedirect,
}: RedirectAuthenticatedUserProps) {
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function redirectIfAuthenticated() {
      try {
        const result = await checkSubscriptionAccess();

        if (result.ok) {
          window.location.replace(getScnDashboardUrl());
          return;
        }

        if (result.reason === 'inactive' && inactiveRedirect) {
          window.location.replace(inactiveRedirect);
          return;
        }

        if (result.reason === 'no-subscription' && noSubscriptionRedirect) {
          window.location.replace(noSubscriptionRedirect);
          return;
        }
      } catch {
        // If the auth probe fails, keep the current page usable.
      }

      if (isMounted) {
        setHasCheckedAuth(true);
      }
    }

    redirectIfAuthenticated();

    return () => {
      isMounted = false;
    };
  }, [inactiveRedirect, noSubscriptionRedirect]);

  if (!hasCheckedAuth) {
    return (
      <div className="min-h-[60vh] bg-white flex items-center justify-center">
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: 'var(--color-deep-purple)', borderTopColor: 'transparent' }}
        />
      </div>
    );
  }

  return children;
}
