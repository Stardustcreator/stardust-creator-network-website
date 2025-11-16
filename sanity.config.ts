/**
 * This configuration is used for the standalone Sanity Studio
 * Deploy with: npx sanity deploy
 * Access at: https://stardustcreatornetwork.sanity.studio (after deployment)
 */

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { schema } from './src/sanity/schemaTypes';
import { structure } from './src/sanity/structure';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'zif8hf3j';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export default defineConfig({
  name: 'scn',
  title: 'SCN',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
