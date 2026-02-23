'use client';

import { useEffect } from 'react';

export default function DeferredAnalytics() {
  useEffect(() => {
    let fired = false;

    const inject = () => {
      if (fired) return;
      fired = true;

      // Inject Google Tag Manager
      try {
        const gtmScript = document.createElement('script');
        gtmScript.async = true;
        gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-WKTV2K2D';
        document.head.appendChild(gtmScript);
      } catch (e) {
        // ignore
      }

      // Inject Meta Pixel
      try {
        const fbScript = document.createElement('script');
        fbScript.async = true;
        fbScript.innerHTML =
          "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '831463455966535');fbq('track', 'PageView');";
        document.head.appendChild(fbScript);
      } catch (e) {
        // ignore
      }
    };

    const onFirstInteraction = () => {
      inject();
      removeListeners();
    };

    const removeListeners = () => {
      (globalThis as any).removeEventListener('scroll', onFirstInteraction);
      (globalThis as any).removeEventListener('pointerdown', onFirstInteraction);
      (globalThis as any).removeEventListener('keydown', onFirstInteraction);
      (globalThis as any).removeEventListener('visibilitychange', onVisibilityChange);
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Load after visibility regain
        onFirstInteraction();
      }
    };

    // Ensure `window` exists (type-checker and SSR) before using it
    if (typeof window === 'undefined') return;

    // Use requestIdleCallback if available to inject after idle time
    if ('requestIdleCallback' in globalThis) {
      (globalThis as any).requestIdleCallback(
        () => {
          inject();
        },
        { timeout: 2000 }
      );
    } else {
      // Fallback: wait for first interaction
      (globalThis as any).addEventListener('scroll', onFirstInteraction, { passive: true });
      (globalThis as any).addEventListener('pointerdown', onFirstInteraction, { passive: true });
      (globalThis as any).addEventListener('keydown', onFirstInteraction, { passive: true });
      (globalThis as any).addEventListener('visibilitychange', onVisibilityChange, {
        passive: true,
      });
      // Also set a timeout fallback
      const t = setTimeout(() => inject(), 3000);
      return () => clearTimeout(t);
    }

    return () => removeListeners();
  }, []);

  return (
    <>
      {/* Noscript fallbacks for analytics */}
      <noscript>
        <iframe
          title="gtm"
          src="https://www.googletagmanager.com/ns.html?id=GTM-WKTV2K2D"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}
