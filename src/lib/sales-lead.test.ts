import { describe, expect, it } from 'vitest';
import { buildSalesLeadPayload, normalisePhoneForLead } from './sales-lead';

const PHONE_RULE = /^\+?[\d\s()-]{6,40}$/;

describe('normalisePhoneForLead', () => {
  it.each([
    ['+234 803 123 4567', '+234 803 123 4567'],
    ['0803.123.4567', '08031234567'],
    ['(0803) 123-4567', '(0803) 123-4567'],
    ['+234-803/123 4567 ext', '+234-803123 4567'],
    ['234+803 123 4567', '234803 123 4567'],
  ])('%s -> backend-valid', (input, expected) => {
    const out = normalisePhoneForLead(input);
    expect(out).toBe(expected);
    expect(PHONE_RULE.test(out)).toBe(true);
  });
});

describe('buildSalesLeadPayload', () => {
  const base = {
    firstName: 'A'.repeat(150),
    lastName: 'Obi',
    company: 'Acme',
    website: 'https://acme.com',
    email: 'ada@acme.com',
    phone: '08031234567',
    topic: 'Topic',
    slot: new Date('2026-11-18T10:00:00Z'),
  };

  it('trims values beyond backend limits', () => {
    expect(buildSalesLeadPayload(base).firstName).toHaveLength(100);
  });

  it('uses only contract keys', () => {
    expect(Object.keys(buildSalesLeadPayload(base)).sort()).toEqual(
      [
        'company',
        'discussionTopic',
        'firstName',
        'lastName',
        'mobilePhone',
        'pageSource',
        'scheduledAt',
        'website',
        'workEmail',
      ].sort()
    );
  });
});
