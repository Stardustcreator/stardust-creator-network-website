import React, { useState, useEffect } from 'react';

// Prioritize critical above-the-fold content loading
export function optimizeLCP() {
  const preloadLinks = [
    { href: '/hero.webp', as: 'image', type: 'image/webp', fetchpriority: 'high' },
    { href: '/hero.avif', as: 'image', type: 'image/avif', fetchpriority: 'high' },
    {
      href: '/fonts/Lato-Regular.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
  ];

  preloadLinks.forEach(link => {
    if (!document.querySelector(`link[href="${link.href}"][rel="preload"]`)) {
      const preloadLink = document.createElement('link');
      preloadLink.href = link.href;
      preloadLink.rel = 'preload';
      preloadLink.as = link.as;
      if (link.type) preloadLink.type = link.type;
      if (link.crossOrigin) preloadLink.crossOrigin = link.crossOrigin;
      if (link.fetchpriority) (preloadLink as any).fetchpriority = link.fetchpriority;

      setTimeout(() => {
        document.head.appendChild(preloadLink);
      }, 10);
    }
  });

  const resourceHints = [
    { href: 'https://cdn.stardustcreators.com', rel: 'preconnect' },
    { href: 'https://www.googletagmanager.com', rel: 'dns-prefetch' },
  ];

  resourceHints.forEach(hint => {
    const link = document.createElement('link');
    link.href = hint.href;
    link.rel = hint.rel;
    document.head.appendChild(link);
  });
}

// ✅ FINAL: no generics, no JSX, no type conflicts
export function LazyLoadContent(
  importFn: () => Promise<{ default: React.ComponentType<any> }>,
  fallback: React.ReactNode = null
) {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    let mounted = true;

    importFn().then(module => {
      if (mounted) {
        setComponent(() => module.default);
      }
    });

    return () => {
      mounted = false;
    };
  }, [importFn]);

  if (!Component) {
    return fallback as any;
  }

  return React.createElement(Component);
}

// Measure and optimize LCP
export function useLCPMetrics() {
  const [lcp, setLCP] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('performance' in window)) return;

    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          setLCP(entry.startTime);

          if (entry.startTime > 2500) {
            optimizeLCP();
          }
        }
      }
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });

    return () => observer.disconnect();
  }, []);

  return lcp;
}

// Inline critical CSS
export function getCriticalCSS(): string {
  return `
    :root { 
      --lcp-transition: all 0.3s ease-in-out; 
    }
    .hero-section {
      opacity: 0;
      transform: translateY(20px);
      transition: var(--lcp-transition);
    }
    .hero-section.loaded {
      opacity: 1;
      transform: translateY(0);
    }
  `;
}
