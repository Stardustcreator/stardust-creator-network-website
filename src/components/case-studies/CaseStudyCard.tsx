'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { CaseStudy } from '@/types/case-study.types';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  index?: number;
}

export default function CaseStudyCard({ caseStudy, index = 0 }: CaseStudyCardProps) {
  // Safety check
  if (!caseStudy || !caseStudy.id) {
    return null;
  }

  // Prepare metrics for display in grid format
  const metricsArray: { label: string; value: string }[] = [];
  if (caseStudy.metrics) {
    const m = caseStudy.metrics;

    // Map metrics to display format
    if (m.totalImpression) metricsArray.push({ label: 'Reach', value: m.totalImpression });
    if (m.reach) metricsArray.push({ label: 'Reach', value: m.reach });
    if (m.totalEngagement) metricsArray.push({ label: 'Engagement', value: m.totalEngagement });
    if (m.engagementRate) metricsArray.push({ label: 'Roi', value: m.engagementRate });
    if (m.views) metricsArray.push({ label: 'Views', value: m.views });
    if (m.likes) metricsArray.push({ label: 'Likes', value: m.likes });
    if (m.comments) metricsArray.push({ label: 'Comments', value: m.comments });
    if (m.saves) metricsArray.push({ label: 'Saves', value: m.saves });
    if (m.impressionShare) metricsArray.push({ label: 'Impression', value: m.impressionShare });
    if (m.costPerAcquisition) metricsArray.push({ label: 'CPA', value: m.costPerAcquisition });
    if (m.returnOnAdSpend) metricsArray.push({ label: 'ROAS', value: m.returnOnAdSpend });
    if (m.impressions) metricsArray.push({ label: 'Impressions', value: m.impressions });
    if (m.clicks) metricsArray.push({ label: 'Clicks', value: m.clicks });
    if (m.completionRate) metricsArray.push({ label: 'Completion', value: m.completionRate });
    if (m.impact) metricsArray.push({ label: 'Impact', value: m.impact });
  }

  // Add placeholder metrics for consistent layout
  const plan = caseStudy.industry || 'Custom Plan';
  const duration = '3 Months';

  return (
    <div
      className="border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
      style={{
        width: '416px',
        height: '621px',
        borderRadius: '12px',
        margin: '0 auto',
        backgroundColor: '#E2E8F0',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Card Content */}
      <div style={{ padding: '28px 28px 0 28px', flex: '1', overflow: 'auto' }}>
        <div>
          {/* Title */}
          <h3
            className="text-gray-900 font-semibold leading-tight mb-5 uppercase"
            style={{ fontSize: '18px', lineHeight: '1.3' }}
          >
            {caseStudy.title}
          </h3>

          {/* Logo */}
          {caseStudy.logo && (
            <div className="mb-5">
              <div
                className={`rounded border flex items-center justify-center ${
                  caseStudy.logo.includes('leaday')
                    ? 'bg-gray-900 border-gray-700'
                    : 'bg-gray-50 border-gray-200'
                }`}
                style={{ width: '90px', height: '90px', padding: '14px' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={caseStudy.logo}
                  alt={`${caseStudy.client || caseStudy.title} Logo`}
                  className="max-w-full max-h-full object-contain"
                  style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
                />
              </div>
            </div>
          )}

          {/* Description */}
          {caseStudy.excerpt && (
            <p
              className="text-gray-600 leading-relaxed mb-6"
              style={{ fontSize: '15px', lineHeight: '1.6' }}
            >
              {caseStudy.excerpt}
            </p>
          )}

          {/* Metrics Header */}
          <div className="mb-4">
            <p
              className="text-gray-700 font-semibold uppercase"
              style={{ fontSize: '13px', letterSpacing: '0.5px' }}
            >
              Monthly Interactions Results
            </p>
          </div>

          {/* Metrics Grid - 2 columns */}
          <div style={{ marginBottom: '16px' }}>
            <div
              className="grid grid-cols-2"
              style={{ gap: '0 20px', rowGap: '16px' }}
            >
              {/* Dynamic metrics from data */}
              {metricsArray.slice(0, 4).map((metric, idx) => (
                <div
                  key={idx}
                  className="text-left"
                >
                  <div
                    className="text-gray-500 mb-1"
                    style={{ fontSize: '15px' }}
                  >
                    {metric.label}
                  </div>
                  <div
                    className="text-gray-900 font-bold"
                    style={{ fontSize: '18px' }}
                  >
                    {metric.value}
                  </div>
                </div>
              ))}

              {/* Fallback metrics if none exist */}
              {metricsArray.length === 0 && (
                <>
                  <div className="text-left">
                    <div
                      className="text-gray-500 mb-1"
                      style={{ fontSize: '15px' }}
                    >
                      Total Impression
                    </div>
                    <div
                      className="text-gray-900 font-bold"
                      style={{ fontSize: '18px' }}
                    >
                      -
                    </div>
                  </div>
                  <div className="text-left">
                    <div
                      className="text-gray-500 mb-1"
                      style={{ fontSize: '15px' }}
                    >
                      Reach
                    </div>
                    <div
                      className="text-gray-900 font-bold"
                      style={{ fontSize: '18px' }}
                    >
                      -
                    </div>
                  </div>
                  <div className="text-left">
                    <div
                      className="text-gray-500 mb-1"
                      style={{ fontSize: '15px' }}
                    >
                      Total Engagement
                    </div>
                    <div
                      className="text-gray-900 font-bold"
                      style={{ fontSize: '18px' }}
                    >
                      -
                    </div>
                  </div>
                  <div className="text-left">
                    <div
                      className="text-gray-500 mb-1"
                      style={{ fontSize: '15px' }}
                    >
                      Engagement rate
                    </div>
                    <div
                      className="text-gray-900 font-bold"
                      style={{ fontSize: '18px' }}
                    >
                      -
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <span
              className="text-gray-600"
              style={{ fontSize: '13px' }}
            >
              Technology
            </span>
            <span
              className="text-gray-600"
              style={{ fontSize: '13px' }}
            >
              Relaunch
            </span>
            <span
              className="text-gray-600"
              style={{ fontSize: '13px' }}
            >
              Brand Awareness
            </span>
          </div>
        </div>
      </div>

      {/* View Case Study Button - Full Width */}
      <div
        style={{
          padding: '16px 28px 28px 28px',
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Link
          href={`/case-studies/${caseStudy.id}`}
          className="text-center text-white font-semibold rounded-lg transition-all duration-200 hover:opacity-90 flex items-center justify-center"
          style={{ backgroundColor: '#57058B', width: '360px', height: '46px', fontSize: '14px' }}
        >
          View Case Study
        </Link>
      </div>
    </div>
  );
}
