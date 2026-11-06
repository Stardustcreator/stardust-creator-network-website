/**
 * Google Calendar service for the Talk to Sales booking page.
 *
 * Uses the same Google service account as the Sheets sync
 * (GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_PRIVATE_KEY) plus:
 *
 *   SALES_CALENDAR_ID           Calendar to check and book into, e.g. sales@yourdomain.
 *                               Share it with the service account ("Make changes to events").
 *   SALES_CALENDAR_IMPERSONATE  Optional. A Google Workspace user the service account acts as
 *                               (needs domain-wide delegation for the Calendar scope).
 *                               Required for Google to email invites and add a Meet link,
 *                               because plain service accounts cannot invite guests.
 */

import { google } from 'googleapis';
import { SALES_TIME_ZONE, SLOT_MINUTES } from '@/lib/sales-call';

const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const CALENDAR_ID = process.env.SALES_CALENDAR_ID;
const IMPERSONATE = process.env.SALES_CALENDAR_IMPERSONATE;

export function isSalesCalendarConfigured(): boolean {
  return Boolean(SERVICE_ACCOUNT_EMAIL && PRIVATE_KEY && CALENDAR_ID);
}

/** True when Google can send invites and create a Meet link. */
export function canSendInvites(): boolean {
  return isSalesCalendarConfigured() && Boolean(IMPERSONATE);
}

function getCalendarClient() {
  if (!isSalesCalendarConfigured()) {
    throw new Error('Sales calendar is not configured.');
  }

  const auth = new google.auth.JWT({
    email: SERVICE_ACCOUNT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/calendar'],
    subject: IMPERSONATE || undefined,
  });

  return google.calendar({ version: 'v3', auth });
}

export interface BusyRange {
  start: number;
  end: number;
}

/** Busy periods on the sales calendar between two moments. */
export async function getBusyRanges(timeMin: Date, timeMax: Date): Promise<BusyRange[]> {
  const calendar = getCalendarClient();

  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      timeZone: SALES_TIME_ZONE,
      items: [{ id: CALENDAR_ID }],
    },
  });

  const busy = response.data.calendars?.[CALENDAR_ID as string]?.busy ?? [];

  return busy
    .filter(range => range.start && range.end)
    .map(range => ({
      start: new Date(range.start as string).getTime(),
      end: new Date(range.end as string).getTime(),
    }));
}

/** True when a slot does not overlap any busy period. */
export function isSlotFree(slotStart: Date, busy: BusyRange[]): boolean {
  const start = slotStart.getTime();
  const end = start + SLOT_MINUTES * 60 * 1000;
  return !busy.some(range => range.start < end && range.end > start);
}

export interface SalesCallBooking {
  firstName: string;
  lastName: string;
  company: string;
  website: string;
  email: string;
  phone: string;
  budget?: string;
  topic: string;
  goals?: string;
  slot: Date;
}

export interface CreatedEvent {
  eventId?: string | null;
  meetLink?: string | null;
  inviteSent: boolean;
}

/** Creates the call on the sales calendar. */
export async function createSalesCallEvent(booking: SalesCallBooking): Promise<CreatedEvent> {
  const calendar = getCalendarClient();
  const withInvite = canSendInvites();
  const end = new Date(booking.slot.getTime() + SLOT_MINUTES * 60 * 1000);
  const fullName = `${booking.firstName} ${booking.lastName}`.trim();

  const description = [
    'Booked from the Talk to Sales page.',
    '',
    `Name: ${fullName}`,
    `Company: ${booking.company}`,
    `Work email: ${booking.email}`,
    `Phone: ${booking.phone}`,
    `Website: ${booking.website}`,
    `Campaign budget: ${booking.budget || 'Not given'}`,
    `Topic: ${booking.topic}`,
    '',
    `Hoping to achieve: ${booking.goals || 'Not given'}`,
  ].join('\n');

  const response = await calendar.events.insert({
    calendarId: CALENDAR_ID,
    sendUpdates: withInvite ? 'all' : 'none',
    conferenceDataVersion: withInvite ? 1 : 0,
    requestBody: {
      summary: `SCN sales call: ${booking.company} (${fullName})`,
      description,
      start: { dateTime: booking.slot.toISOString(), timeZone: SALES_TIME_ZONE },
      end: { dateTime: end.toISOString(), timeZone: SALES_TIME_ZONE },
      ...(withInvite
        ? {
            attendees: [{ email: booking.email, displayName: fullName }],
            conferenceData: {
              createRequest: {
                requestId: `scn-${booking.slot.getTime()}-${Math.random().toString(36).slice(2, 10)}`,
                conferenceSolutionKey: { type: 'hangoutsMeet' },
              },
            },
          }
        : {}),
    },
  });

  return {
    eventId: response.data.id,
    meetLink: response.data.hangoutLink,
    inviteSent: withInvite,
  };
}
