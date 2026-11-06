import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  BUDGET_OPTIONS,
  SLOT_MINUTES,
  TOPIC_OPTIONS,
  isAllowedSlot,
  normaliseWebsite,
} from '@/lib/sales-call';
import {
  createSalesCallEvent,
  getBusyRanges,
  isSalesCalendarConfigured,
  isSlotFree,
} from '@/lib/services/google-calendar.service';

const bookingSchema = z.object({
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
  slot: z.string().min(1),
  // Honeypot: real people never fill this hidden field.
  companyFax: z.string().max(0).optional(),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request format.' }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Please check your details and try again.' },
      { status: 400 }
    );
  }

  const data = parsed.data;

  if (!isAllowedSlot(data.slot)) {
    return NextResponse.json(
      { success: false, error: 'That time is no longer available. Please pick another.' },
      { status: 409 }
    );
  }

  if (!isSalesCalendarConfigured()) {
    console.error('Talk to Sales booking received but SALES_CALENDAR_ID is not configured.');
    return NextResponse.json(
      {
        success: false,
        error: 'Online booking is not available right now. Please try again later.',
      },
      { status: 503 }
    );
  }

  const slot = new Date(data.slot);

  try {
    // Re-check just before booking so two people can't take the same slot.
    const busy = await getBusyRanges(slot, new Date(slot.getTime() + SLOT_MINUTES * 60 * 1000));
    if (!isSlotFree(slot, busy)) {
      return NextResponse.json(
        { success: false, error: 'Someone just booked that time. Please pick another.' },
        { status: 409 }
      );
    }

    const event = await createSalesCallEvent({
      firstName: data.firstName,
      lastName: data.lastName,
      company: data.company,
      website: normaliseWebsite(data.website),
      email: data.email,
      phone: data.phone,
      budget: data.budget || undefined,
      topic: data.topic,
      goals: data.goals,
      slot,
    });

    return NextResponse.json({
      success: true,
      data: {
        slot: slot.toISOString(),
        inviteSent: event.inviteSent,
        meetLink: event.meetLink ?? null,
      },
    });
  } catch (error) {
    console.error('Talk to Sales booking error:', error);
    return NextResponse.json(
      { success: false, error: 'We could not book that call. Please try again.' },
      { status: 502 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
