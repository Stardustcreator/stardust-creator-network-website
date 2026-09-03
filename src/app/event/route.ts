import { NextResponse } from 'next/server';

// Used if the backend setting can't be reached, so the link never breaks.
const FALLBACK_URL = 'https://zoom.us/meeting/register/NJgEaV2pSTqFu6daQ3uS7g';

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

function isHttpUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

async function resolveEventUrl(): Promise<string> {
  if (!API_URL) return FALLBACK_URL;

  try {
    const res = await fetch(`${API_URL}/site-settings/event-registration-url`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return FALLBACK_URL;

    const data = await res.json();
    return isHttpUrl(data?.url) ? data.url : FALLBACK_URL;
  } catch {
    return FALLBACK_URL;
  }
}

export async function GET() {
  const destination = await resolveEventUrl();
  return NextResponse.redirect(destination, { status: 307 });
}
