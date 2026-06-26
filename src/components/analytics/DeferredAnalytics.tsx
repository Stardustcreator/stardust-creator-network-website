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
          "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '1397544962431456');fbq('track', 'PageView');";
        document.head.appendChild(fbScript);
      } catch (e) {
        // ignore
      }

      // Inject TikTok Pixel
      try {
        const ttScript = document.createElement('script');
        ttScript.async = true;
        ttScript.innerHTML = `
!function (w, d, t) {
  w.TiktokAnalyticsObject = t;
  var ttq = w[t] = w[t] || [];

  ttq.methods = [
    "page","track","identify","instances","debug","on","off","once",
    "ready","alias","group","enableCookie","disableCookie",
    "holdConsent","revokeConsent","grantConsent"
  ];

  ttq.setAndDefer = function(obj, method) {
    obj[method] = function() {
      obj.push([method].concat(Array.prototype.slice.call(arguments, 0)));
    };
  };

  for (var i = 0; i < ttq.methods.length; i++) {
    ttq.setAndDefer(ttq, ttq.methods[i]);
  }

  ttq.instance = function(id) {
    var inst = ttq._i[id] || [];
    for (var i = 0; i < ttq.methods.length; i++) {
      ttq.setAndDefer(inst, ttq.methods[i]);
    }
    return inst;
  };

  ttq.load = function(id, config) {
    var url = "https://analytics.tiktok.com/i18n/pixel/events.js";

    ttq._i = ttq._i || {};
    ttq._i[id] = [];
    ttq._i[id]._u = url;

    ttq._t = ttq._t || {};
    ttq._t[id] = +new Date();

    ttq._o = ttq._o || {};
    ttq._o[id] = config || {};

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = url + "?sdkid=" + id + "&lib=" + t;

    var firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(script, firstScript);
  };

  ttq.load("D8V87NJC77UB3EFMQ5TG");
  ttq.page();
}(window, document, "ttq");
        `;
        document.head.appendChild(ttScript);
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

    // Delay analytics to improve performance - wait 3 seconds minimum
    const delayedInject = () => {
      setTimeout(() => {
        if ('requestIdleCallback' in globalThis) {
          (globalThis as any).requestIdleCallback(inject, { timeout: 5000 });
        } else {
          inject();
        }
      }, 3000);
    };

    // Use requestIdleCallback if available to inject after idle time
    // Delay by 4 seconds to improve initial performance scores
    if ('requestIdleCallback' in globalThis) {
      const timer = setTimeout(() => {
        (globalThis as any).requestIdleCallback(
          () => {
            inject();
          },
          { timeout: 5000 }
        );
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      // Fallback: wait for first interaction
      (globalThis as any).addEventListener('scroll', onFirstInteraction, { passive: true });
      (globalThis as any).addEventListener('pointerdown', onFirstInteraction, { passive: true });
      (globalThis as any).addEventListener('keydown', onFirstInteraction, { passive: true });
      (globalThis as any).addEventListener('visibilitychange', onVisibilityChange, {
        passive: true,
      });
      // Also set a timeout fallback (longer delay for better performance)
      const t = setTimeout(() => inject(), 5000);
      return () => clearTimeout(t);
    }

    return () => removeListeners();
  }, []);

  return null;
}
