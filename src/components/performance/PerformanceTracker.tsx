'use client';

import { useEffect } from 'react';

interface PerformanceMetrics {
  firstContentfulPaint: number;
  timeToInteractive: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  totalBlockingTime: number;
}

export const PerformanceTracker = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || !('performance' in window)) return;

    const metrics: PerformanceMetrics = {
      firstContentfulPaint: 0,
      timeToInteractive: 0,
      largestContentfulPaint: 0,
      cumulativeLayoutShift: 0,
      totalBlockingTime: 0,
    };

    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        switch (entry.name) {
          case 'first-contentful-paint':
            metrics.firstContentfulPaint = entry.startTime;
            break;

          case 'largest-contentful-paint':
            metrics.largestContentfulPaint = entry.startTime;
            break;

          case 'cumulative-layout-shift': {
            // CLS entries expose `value`, but TypeScript doesn't know that
            if ('value' in entry) {
              metrics.cumulativeLayoutShift = (entry as any).value;
            }
            break;
          }

          case 'total-blocking-time': {
            // Same situation as CLS
            if ('value' in entry) {
              metrics.totalBlockingTime = (entry as any).value;
            }
            break;
          }
        }
      }

      if (process.env.NODE_ENV === 'production') {
        (window as any).gtag?.('event', 'performance_metrics', metrics);
      } else {
        console.log('Performance Metrics:', metrics);
      }
    });

    observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'] });

    // Time to Interactive (approximation)
    metrics.timeToInteractive = performance.now();

    return () => observer.disconnect();
  }, []);

  return null;
};

export default PerformanceTracker;
