import { DocumentTextIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
    defineField({
      name: 'aiMetadata',
      type: 'object',
      fields: [
        defineField({
          name: 'readingTime',
          type: 'number',
          title: 'Estimated Reading Time (minutes)',
        }),
        defineField({
          name: 'keywords',
          type: 'array',
          of: [{ type: 'string' }],
          title: 'SEO Keywords',
        }),
        defineField({
          name: 'category',
          type: 'string',
          title: 'Blog Category',
          options: {
            list: [
              { title: 'Creator Insights', value: 'creator-insights' },
              { title: 'Brand Collaboration', value: 'brand-collaboration' },
              { title: 'Monetization Strategies', value: 'monetization' },
              { title: 'Technology', value: 'technology' },
            ],
          },
        }),
      ],
    }),
    // AI and SEO Optimization Fields
    defineField({
      name: 'aiOptimization',
      title: 'AI & SEO Optimization',
      type: 'object',
      fields: [
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'Concise summary for search engines (max 160 characters)',
          validation: Rule => Rule.max(160),
        },
        {
          name: 'keywords',
          title: 'SEO Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Key terms to improve AI and search discoverability',
        },
        {
          name: 'entityType',
          title: 'Schema.org Entity Type',
          type: 'string',
          options: {
            list: [
              { title: 'Article', value: 'Article' },
              { title: 'BlogPosting', value: 'BlogPosting' },
              { title: 'NewsArticle', value: 'NewsArticle' },
              { title: 'TechArticle', value: 'TechArticle' },
            ],
          },
          description: 'Select the most appropriate schema.org type',
        },
      ],
      options: {
        collapsible: true,
        collapsed: false,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
