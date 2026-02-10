import { NextComponentType } from 'next';
import { useState, useEffect } from 'react';

// Prioritize critical above-the-fold content loading
export function optimizeLCP() {
  // Preload critical resources with enhanced performance strategies
  const preloadLinks = [
    { href: '/hero.webp', as: 'image', type: 'image/webp', fetchpriority: 'high' },
    { href: '/hero.avif', as: 'image', type: 'image/avif', fetchpriority: 'high' },
    { href: '/fonts/Lato-Regular.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' }
  ];

  preloadLinks.forEach(link => {
    // Only create link if not already preloaded
    if (!document.querySelector(`link[href="${link.href}"][rel="preload"]`)) {
      const preloadLink = document.createElement('link');
      preloadLink.href = link.href;
      preloadLink.rel = 'preload';
      preloadLink.as = link.as;
      if (link.type) preloadLink.type = link.type;
      if (link.crossOrigin) preloadLink.crossOrigin = link.crossOrigin;
      if (link.fetchpriority) (preloadLink as any).fetchpriority = link.fetchpriority;
      
      // Optional: Set a modest timeout to prevent blocking
      setTimeout(() => {
        document.head.appendChild(preloadLink);
      }, 10);
    }
  });

  // Aggressive resource hints for potential LCP images
  const resourceHints = [
    { href: 'https://cdn.stardustcreators.com', rel: 'preconnect' },
    { href: 'https://www.googletagmanager.com', rel: 'dns-prefetch' }
  ];

  resourceHints.forEach(hint => {
    const link = document.createElement('link');
    link.href = hint.href;
    link.rel = hint.rel;
    document.head.appendChild(link);
  });
}

// Lazy load non-critical content
export function LazyLoadContent<P = {}>(
  importFn: () => Promise<{ default: NextComponentType<P> }>,
  fallback: React.ReactNode = null
) {
  const [Component, setComponent] = useState<NextComponentType<P> | null>(null);

  useEffect(() => {
    importFn().then(module => {
      setComponent(() => module.default);
    });
  }, [importFn]);

  return Component ? <Component /> : fallback;
}

// Measure and optimize LCP
export function useLCPMetrics() {
  const [lcp, setLCP] = useState<number | null>(null);

  useEffect(() => {
    if ('performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            setLCP(entry.startTime);
            
            // Log LCP metrics
            console.log('LCP:', entry.startTime, 'ms');
            
            // Aggressive optimization if LCP is slow
            if (entry.startTime > 2500) {
              optimizeLCP();
            }
          }
        }
      });

      observer.observe({ type: 'largest-contentful-paint', buffered: true });

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return lcp;
}

// Inline critical CSS for fastest possible rendering
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