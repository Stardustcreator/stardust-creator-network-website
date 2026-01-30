/**
 * TypeScript interfaces for case study data structure
 */

export interface CaseStudyMetrics {
  totalImpression?: string;
  reach?: string;
  totalEngagement?: string;
  engagementRate?: string;
  views?: string;
  likes?: string;
  comments?: string;
  saves?: string;
  impact?: string;
  // Campaign metrics (for performance-focused campaigns)
  impressionShare?: string;
  costPerAcquisition?: string;
  returnOnAdSpend?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  images: string[]; // 4 images
  logo: string;
  excerpt?: string; // Brief description
  client?: string;
  industry?: string;
  metrics?: CaseStudyMetrics;
  content?: string; // Full content (for detail view)
  tags?: string[];
}
