import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const BUDGETS = [
  'Under ₦5M',
  '₦5M to ₦20M',
  '₦20M to ₦50M',
  '₦50M to ₦100M',
  'Above ₦100M',
] as const;

const schema = z.object({
  fullName: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().min(1).max(160),
  jobTitle: z.string().trim().min(1).max(120),
  website: z.string().trim().min(1).max(300),
  budget: z.enum(BUDGETS),
});

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

const GENERIC_ERROR = 'We could not process your request right now. Please try again later.';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please check your details and try again.' },
      { status: 400 }
    );
  }

  if (!API_URL) {
    console.error('NEXT_PUBLIC_API_URL is not configured.');
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 503 });
  }

  try {
    const res = await fetch(`${API_URL}/insight-report/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...parsed.data, source: 'both-sides-of-the-brief' }),
    });

    if (res.ok) return NextResponse.json({ ok: true });

    if (res.status === 429) {
      return NextResponse.json(
        { error: 'Too many attempts. Please wait a minute and try again.' },
        { status: 429 }
      );
    }

    // The backend's 400 message is a single sentence written for the visitor.
    if (res.status === 400) {
      const data = await res.json().catch(() => ({}));
      const message = typeof data.message === 'string' ? data.message : GENERIC_ERROR;
      return NextResponse.json({ error: message }, { status: 400 });
    }

    console.error(`Insight report request failed with status ${res.status}`);
  } catch (error) {
    console.error('Insight report request failed:', error);
  }

  return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 });
}
