'use client';

import { useEffect, useSyncExternalStore, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** When false, backdrop click / Escape won't close (e.g. mid-submit). */
  dismissible?: boolean;
  /** Accessible label for the dialog (falls back to `aria-labelledby` callers set). */
  ariaLabel?: string;
  /** Width class for the panel. Defaults to a small dialog. */
  className?: string;
  /**
   * Render as a bottom sheet on mobile — slides up from the bottom with a drag
   * handle and scrolls within the viewport — while staying a centered dialog on
   * desktop (the `CheckoutSheet` shape). Defaults to `false`: a centered modal at
   * every breakpoint.
   */
  mobileSheet?: boolean;
}

/**
 * Generic portal-based modal. Renders a centered panel over a dimmed backdrop,
 * locks background scroll, and closes on Escape / backdrop click when
 * `dismissible`. Pass `mobileSheet` to turn it into a bottom sheet on mobile
 * (centered on desktop). Children control their own padding. The mounted guard
 * (via `useSyncExternalStore`) avoids an SSR hydration mismatch — the same
 * pattern used by `UpgradePlanModal`. Compose richer dialogs (e.g.
 * `ConfirmDialog`) on top of this rather than re-implementing the portal
 * plumbing.
 */
export default function Modal({
  open,
  onClose,
  children,
  dismissible = true,
  ariaLabel,
  className,
  mobileSheet = false,
}: ModalProps) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && dismissible) onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, dismissible, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-60 flex justify-center ${
        mobileSheet ? 'items-end sm:items-center' : 'items-center'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={() => dismissible && onClose()}
        className="absolute inset-0 bg-black/45"
      />
      <div
        className={`relative w-full bg-surface-white shadow-2xl ${
          mobileSheet
            ? 'max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl'
            : 'rounded-2xl mx-3'
        } ${className ?? 'max-w-md'}`}
      >
        {/* Mobile drag handle — only when the sheet treatment is enabled. */}
        {mobileSheet && (
          <div className="flex justify-center pt-3 sm:hidden">
            <span className="h-1.5 w-14 rounded-full bg-[#E2E8F0]" />
          </div>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}
