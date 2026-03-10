module.exports = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: [
      'performance', 
      'accessibility', 
      'best-practices', 
      'seo'
    ],
    skipAudits: [
      'uses-long-cache-ttl',
      'uses-http2'
    ],
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 2
    },
    audits: [
      'first-contentful-paint',
      'largest-contentful-paint',
      'cumulative-layout-shift',
      'total-blocking-time'
    ]
  }
};