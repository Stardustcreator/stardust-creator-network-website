import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/sales-call', async importOriginal => {
  const actual = await importOriginal<typeof import('@/lib/sales-call')>();
  return { ...actual, isAllowedSlot: () => true };
});

const calendar = vi.hoisted(() => ({
  createSalesCallEvent: vi.fn(),
  getBusyRanges: vi.fn(),
  isSalesCalendarConfigured: vi.fn(),
  isSlotFree: vi.fn(),
}));
vi.mock('@/lib/services/google-calendar.service', () => calendar);

import { POST } from './route';

const SLOT = '2026-11-18T10:00:00.000Z';

const booking = {
  firstName: 'Ada',
  lastName: 'Obi',
  company: 'Acme',
  website: 'acme.com',
  email: 'ada@acme.com',
  phone: '+234.803.123.4567',
  budget: '3M - 5M',
  topic: 'Influencer campaigns',
  goals: 'Reach new customers',
  slot: SLOT,
  companyFax: '',
};

const request = (body: unknown) =>
  new NextRequest('http://localhost/api/sales-call/book', {
    method: 'POST',
    body: JSON.stringify(body),
  });

describe('POST /api/sales-call/book lead forwarding', () => {
  const fetchMock = vi.fn();

  beforeEach(async () => {
    const { TOPIC_OPTIONS } = await import('@/lib/sales-call');
    booking.topic = TOPIC_OPTIONS[0];
    process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com/';
    calendar.isSalesCalendarConfigured.mockReturnValue(true);
    calendar.getBusyRanges.mockResolvedValue([]);
    calendar.isSlotFree.mockReturnValue(true);
    calendar.createSalesCallEvent.mockResolvedValue({ inviteSent: true, meetLink: 'https://meet' });
    fetchMock.mockResolvedValue({ ok: true, status: 201 });
    vi.stubGlobal('fetch', fetchMock);
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    vi.resetAllMocks();
  });

  it('posts the mapped lead to /sales-leads with only contract keys', async () => {
    const res = await POST(request(booking));
    expect(res.status).toBe(200);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.example.com/sales-leads');
    expect(init.method).toBe('POST');
    expect(init.signal).toBeDefined();
    expect(JSON.parse(init.body)).toEqual({
      firstName: 'Ada',
      lastName: 'Obi',
      company: 'Acme',
      workEmail: 'ada@acme.com',
      mobilePhone: '+2348031234567',
      discussionTopic: booking.topic,
      goal: 'Reach new customers',
      pageSource: '/talk-to-sales',
      website: 'https://acme.com',
      budget: '3M - 5M',
      scheduledAt: SLOT,
    });
  });

  it('omits optional keys when empty and never sends the honeypot', async () => {
    await POST(request({ ...booking, goals: '', budget: '' }));
    const sent = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sent).not.toHaveProperty('goal');
    expect(sent).not.toHaveProperty('budget');
    expect(sent).not.toHaveProperty('companyFax');
  });

  it('still returns success when the backend responds with an error', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 500 });
    const res = await POST(request(booking));
    expect(res.status).toBe(200);
    expect((await res.json()).success).toBe(true);
  });

  it('still returns success when the backend post throws or times out', async () => {
    fetchMock.mockRejectedValue(new DOMException('timed out', 'TimeoutError'));
    const res = await POST(request(booking));
    expect(res.status).toBe(200);
    expect((await res.json()).success).toBe(true);
  });

  it('still returns success when the API URL is not configured', async () => {
    delete process.env.NEXT_PUBLIC_API_URL;
    const res = await POST(request(booking));
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('does not post a lead when the booking itself fails', async () => {
    calendar.createSalesCallEvent.mockRejectedValue(new Error('calendar down'));
    const res = await POST(request(booking));
    expect(res.status).toBe(502);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
