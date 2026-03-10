import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

import { dataset, projectId } from '../env';

const builder = imageUrlBuilder({
  projectId,
  dataset,
});

/**
 * Strict image URL helper
 * - accepts only valid Sanity image sources
 * - no optional args
 * - no null returns
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
