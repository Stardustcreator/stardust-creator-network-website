'use client';

import { useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const STORAGE_KEY = 'scn_calc_used';

type GuardStatus = 'loading' | 'allowed' | 'blocked';

export function useFingerprintGuard(): GuardStatus {
  const [status, setStatus] = useState<GuardStatus>('loading');

  useEffect(() => {
    FingerprintJS.load()
      .then(fp => fp.get())
      .then(({ visitorId }) => {
        const stored = localStorage.getItem(STORAGE_KEY);
        setStatus(stored === visitorId ? 'blocked' : 'allowed');
      })
      .catch(() => setStatus('allowed'));
  }, []);

  return status;
}

export async function markCalculatorUsed(): Promise<void> {
  const fp = await FingerprintJS.load();
  const { visitorId } = await fp.get();
  localStorage.setItem(STORAGE_KEY, visitorId);
}
