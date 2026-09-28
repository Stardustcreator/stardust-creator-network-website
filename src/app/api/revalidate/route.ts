import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// Maps a CMS `pages` table slug to the marketing route(s) that fetch it via
// `${API_URL}/cms/pages/<slug>` with `next: { revalidate: 60 }`. Hitting this
// after a CMS save invalidates that 60s ISR cache immediately instead of
// waiting for the next request after the window elapses.
const SLUG_TO_PATHS: Record<string, string[]> = {
  homepage: ['/'],
  'who-we-are': ['/who-we-are'],
  'creator-os': ['/creator-os'],
  'find-creators': ['/find-creators'],
  blog: ['/blog'],
  'case-studies': ['/case-studies'],
  'terms-conditions': ['/legal/terms'],
};

export async function POST(request: NextRequest) {
  const revalidateSecret = process.env.REVALIDATE_SECRET;
  const authHeader = request.headers.get('authorization');

  if (revalidateSecret && authHeader !== `Bearer ${revalidateSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug } = await request.json().catch(() => ({ slug: undefined }));
  const paths = SLUG_TO_PATHS[slug];

  if (!paths) {
    return NextResponse.json({ error: `Unknown or unrevalidated slug: ${slug}` }, { status: 400 });
  }

  paths.forEach(path => revalidatePath(path));

  return NextResponse.json({ revalidated: true, paths });
}
