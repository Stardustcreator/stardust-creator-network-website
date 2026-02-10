'use client';

import React, { useEffect } from 'react';

interface PerformanceMetrics {
  firstContentfulPaint: number;
  timeToInteractive: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  totalBlockingTime: number;
}

export const PerformanceTracker: React.FC = () => {
  const trackPerformance = () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const metrics: PerformanceMetrics = {
        firstContentfulPaint: 0,
        timeToInteractive: 0,
        largestContentfulPaint: 0,
        cumulativeLayoutShift: 0,
        totalBlockingTime: 0,
      };

      // Use Performance API and Web Vitals to capture metrics
      const performanceObserver = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          switch (entry.name) {
            case 'first-contentful-paint':
              metrics.firstContentfulPaint = entry.startTime;
              break;
            case 'largest-contentful-paint':
              metrics.largestContentfulPaint = entry.startTime;
              break;
            case 'cumulative-layout-shift':
              metrics.cumulativeLayoutShift = entry.value;
              break;
            case 'total-blocking-time':
              metrics.totalBlockingTime = entry.value;
              break;
          }
        }

        // Log or send metrics to analytics service
        if (process.env.NODE_ENV === 'production') {
          // Example: Send to Google Analytics or custom analytics
          window.gtag?.('event', 'performance_metrics', metrics);
        } else {
          console.log('Performance Metrics:', metrics);
        }
      });

      performanceObserver.observe({
        type: 'performance',
        buffered: true,
      });

      // Time to Interactive tracking
      if ('timeOrigin' in performance) {
        metrics.timeToInteractive = performance.now();
      }
    }
  };

  useEffect(() => {
    trackPerformance();
  }, []);

  return null; // Invisible tracking component
};

export default PerformanceTracker;
