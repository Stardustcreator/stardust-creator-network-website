import { Organization, WebSite, WebPage, Service, Article } from 'schema-dts';

export const generateOrganizationSchema = (): Organization => ({
  '@type': 'Organization',
  name: 'Stardust Creators Network',
  alternateName: 'Stardust Creator Platform',
  url: 'https://www.stardustcreators.com',
  logo: 'https://www.stardustcreators.com/logos/stardust-logo.png',
  description:
    'A dynamic platform connecting innovative creators with global brands, fostering collaborative and impactful digital experiences.',
  foundingDate: '2023',
  founders: [
    {
      '@type': 'Person',
      name: 'Creator Network Founder',
      jobTitle: 'CEO',
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@stardustcreators.com',
    telephone: '+1 (888) CREATORS',
    contactType: 'Customer Service',
  },
  sameAs: [
    'https://twitter.com/stardustcreators',
    'https://linkedin.com/company/stardustcreators',
    'https://instagram.com/stardustcreators',
  ],
});

export const generateWebSiteSchema = (): WebSite => ({
  '@type': 'WebSite',
  name: 'Stardust Creators Network',
  url: 'https://www.stardustcreators.com',
  description:
    'Empowering digital creators through innovative collaboration and strategic networking',
  publisher: generateOrganizationSchema(),

  // 👇 schema-dts does NOT model `query-input`, so we safely escape here
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.stardustcreators.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  } as any,
});

export const generateWebPageSchema = (
  pageTitle: string,
  pageDescription: string,
  pageUrl: string
): WebPage => ({
  '@type': 'WebPage',
  name: pageTitle,
  description: pageDescription,
  url: pageUrl,
  mainEntity: generateOrganizationSchema(),
  isPartOf: generateWebSiteSchema(),
});

export const generateServiceSchema = (
  serviceName: string,
  serviceDescription: string
): Service => ({
  '@type': 'Service',
  name: serviceName,
  description: serviceDescription,
  provider: generateOrganizationSchema(),
  serviceType: 'Digital Creator Platform Service',
});

export interface BlogPostSchemaParams {
  title: string;
  description: string;
  authorName: string;
  authorBio?: string;
  publishDate: string;
  modifiedDate?: string;
  imageUrl?: string;
  category?: string[];
  tags?: string[];
  readingTime?: number;
  wordCount?: number;
}

export const generateArticleSchema = ({
  title,
  description,
  authorName,
  authorBio,
  publishDate,
  modifiedDate,
  imageUrl,
  category = [],
  tags = [],
  readingTime,
  wordCount,
}: BlogPostSchemaParams): Article => ({
  '@type': 'BlogPosting',
  headline: title,
  description,
  author: {
    '@type': 'Person',
    name: authorName,
    description: authorBio,
  },
  publisher: generateOrganizationSchema(),
  datePublished: publishDate,
  dateModified: modifiedDate || publishDate,
  mainEntityOfPage: {
    '@type': 'WebPage',
    url: `https://www.stardustcreators.com/blog/${title.toLowerCase().replace(/ /g, '-')}`,
  },
  image: imageUrl
    ? {
        '@type': 'ImageObject',
        url: imageUrl,
      }
    : undefined,
  keywords: tags.join(', '),
  articleSection: category.length > 0 ? category[0] : 'Creator Insights',
  timeRequired: readingTime ? `PT${readingTime}M` : undefined,
  wordCount,
  about: {
    '@type': 'Thing',
    name: 'Creator Economy',
    disambiguatingDescription: 'Digital content creation and monetization strategies',
  },
});
