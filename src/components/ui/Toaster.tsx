'use client';

import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      offset={115}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'flex items-center justify-center w-full px-5 py-3 lg:py-4 rounded-lg border text-sm font-medium',
          success: 'bg-surface-success border-stroke-success/70 text-[#009966]',
          error: 'bg-red-50 border-red-300 text-red-700',
          icon: 'hidden',
        },
      }}
    />
  );
}
