import { NextResponse } from 'next/server';
import { candidateSlots } from '@/lib/sales-call';
import {
  getBusyRanges,
  isSalesCalendarConfigured,
  isSlotFree,
} from '@/lib/services/google-calendar.service';

// Open Talk to Sales slots for the booking window, as ISO strings.
// When the calendar isn't configured yet (e.g. local dev) every slot
// the rules allow is returned, flagged with configured: false.
export const dynamic = 'force-dynamic';

export async function GET() {
  const slots = candidateSlots();

  if (slots.length === 0) {
    return NextResponse.json({ configured: isSalesCalendarConfigured(), slots: [] });
  }

  if (!isSalesCalendarConfigured()) {
    return NextResponse.json({
      configured: false,
      slots: slots.map(slot => slot.toISOString()),
    });
  }

  try {
    const busy = await getBusyRanges(
      slots[0],
      new Date(slots[slots.length - 1].getTime() + 60 * 60 * 1000)
    );

    return NextResponse.json(
      {
        configured: true,
        slots: slots.filter(slot => isSlotFree(slot, busy)).map(slot => slot.toISOString()),
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('Sales availability error:', error);
    return NextResponse.json(
      { configured: true, slots: [], error: 'Could not load open times. Please try again.' },
      { status: 502 }
    );
  }
}
