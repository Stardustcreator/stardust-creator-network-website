'use client';

import { useEffect, useState } from 'react';

interface UseFingerprintResult {
  visitorId: string | null;
  isLoading: boolean;
}

export function useFingerprint(): UseFingerprintResult {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    import('@fingerprintjs/fingerprintjs')
      .then(FingerprintJS => FingerprintJS.load())
      .then(fp => fp.get())
      .then(result => {
        if (!cancelled) {
          setVisitorId(result.visitorId);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          // On error, set null — callers should treat null as "unverified, allow through"
          setVisitorId(null);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { visitorId, isLoading };
}
