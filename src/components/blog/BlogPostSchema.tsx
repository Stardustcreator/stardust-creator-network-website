import React from 'react';
import StructuredDataInjector from '../shared/StructuredDataInjector';
import { generateArticleSchema, BlogPostSchemaParams } from '@/lib/schemaGenerators';

interface BlogPostSchemaProps extends BlogPostSchemaParams {
  enableJsonLd?: boolean;
}

const BlogPostSchema: React.FC<BlogPostSchemaProps> = ({
  enableJsonLd = true,
  ...schemaParams
}) => {
  if (!enableJsonLd) return null;

  const blogPostSchema = generateArticleSchema(schemaParams);

  return <StructuredDataInjector schemas={[blogPostSchema]} />;
};

export default BlogPostSchema;
