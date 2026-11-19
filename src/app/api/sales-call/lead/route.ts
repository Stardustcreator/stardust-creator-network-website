import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { BUDGET_OPTIONS, TOPIC_OPTIONS, normaliseWebsite } from '@/lib/sales-call';
import { buildSalesLeadPayload, postSalesLead } from '@/lib/sales-lead';

/* =========================================================
   Talk to Sales lead capture.
   Called once the "Your details" step is done, before Calendly ever loads, so the
   lead is on file even if someone never finishes picking a time. Proxied through
   our own server (the backend's CORS policy doesn't allow calling it from the browser).
========================================================= */

const leadSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  company: z.string().trim().min(1).max(120),
  website: z.string().trim().min(3).max(200),
  email: z.string().trim().email().max(160),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine(value => value.replace(/\D/g, '').length >= 7, 'Enter a valid phone number'),
  budget: z.enum(BUDGET_OPTIONS).optional().or(z.literal('')),
  topic: z.enum(TOPIC_OPTIONS),
  goals: z.string().trim().max(1000).optional(),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request format.' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Please check your details and try again.' },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Best effort: this only tracks the lead, so it must never fail the visitor's flow.
  await postSalesLead(
    buildSalesLeadPayload({
      firstName: data.firstName,
      lastName: data.lastName,
      company: data.company,
      website: normaliseWebsite(data.website),
      email: data.email,
      phone: data.phone,
      budget: data.budget || undefined,
      topic: data.topic,
      goals: data.goals,
    })
  );

  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
