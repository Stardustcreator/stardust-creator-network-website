/**
 * Event Tracking Utility
 *
 * Provides centralized event tracking for GA4, GTM, and other analytics platforms.
 * Includes debouncing to prevent duplicate events on page reload.
 */

type AnalyticsValue = string | number | boolean | null | undefined | Record<string, unknown>;

interface EventTrackingOptions {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: AnalyticsValue;
}

// Debounce map to prevent duplicate events
const eventDebounceMap = new Map<string, number>();
const DEBOUNCE_DELAY = 1000; // 1 second debounce

/**
 * Debounce helper to prevent duplicate events
 */
function isDebounced(eventName: string, eventId?: string): boolean {
  const key = eventId ? `${eventName}_${eventId}` : eventName;
  const now = Date.now();
  const lastFired = eventDebounceMap.get(key);

  if (lastFired && now - lastFired < DEBOUNCE_DELAY) {
    return true; // Event is debounced
  }

  eventDebounceMap.set(key, now);
  return false; // Event is not debounced
}

/**
 * Track event to Google Analytics 4 (gtag)
 */
function trackGA4Event(eventName: string, options: EventTrackingOptions = {}): void {
  if (typeof window === 'undefined' || !window.gtag) {
    console.warn('GA4 (gtag) is not available');
    return;
  }

  try {
    window.gtag('event', eventName, {
      ...options,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error tracking GA4 event:', error);
  }
}

/**
 * Track event to Google Tag Manager (dataLayer)
 */
function trackGTMEvent(eventName: string, options: EventTrackingOptions = {}): void {
  if (typeof window === 'undefined' || !window.dataLayer) {
    console.warn('GTM (dataLayer) is not available');
    return;
  }

  try {
    window.dataLayer.push({
      event: eventName,
      ...options,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error tracking GTM event:', error);
  }
}

/**
 * Main event tracking function
 * Tracks events to both GA4 and GTM with debouncing
 *
 * @param eventName - Name of the event (e.g., 'book_campaign_click')
 * @param options - Event parameters and metadata
 * @param eventId - Optional unique ID for debouncing (e.g., button location)
 */
export function trackEvent(
  eventName: string,
  options: EventTrackingOptions = {},
  eventId?: string
): void {
  // Check if event is debounced
  if (isDebounced(eventName, eventId)) {
    console.log(`Event ${eventName} is debounced`);
    return;
  }

  // Track to GA4
  trackGA4Event(eventName, options);

  // Track to GTM
  trackGTMEvent(eventName, options);

  // Log for debugging (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.log('Event tracked:', eventName, options);
  }
}

/**
 * Track button click events
 */
export function trackButtonClick(
  buttonName: string,
  location: string,
  additionalData?: Record<string, AnalyticsValue>
): void {
  trackEvent(
    'button_click',
    {
      event_category: 'Engagement',
      event_label: buttonName,
      button_location: location,
      ...additionalData,
    },
    `${buttonName}_${location}`
  );
}

/**
 * Track "Book a Campaign" button click
 */
export function trackBookCampaignClick(location: string): void {
  trackEvent(
    'book_campaign_click',
    {
      event_category: 'Conversion',
      event_label: location,
      button_location: location,
    },
    `book_campaign_${location}`
  );
}

/**
 * Track form submission
 */
export function trackFormSubmit(
  formName: string,
  formType: 'contact' | 'newsletter' | 'creator_signup' | 'brand_brief',
  additionalData?: Record<string, AnalyticsValue>
): void {
  const eventName =
    formType === 'newsletter' || formType === 'creator_signup' ? 'signup_submit' : 'form_submit';

  trackEvent(
    eventName,
    {
      event_category: 'Form',
      event_label: formName,
      form_type: formType,
      ...additionalData,
    },
    `${eventName}_${formName}`
  );
}

/**
 * Track outbound link click
 */
export function trackOutboundClick(
  url: string,
  linkText?: string,
  additionalData?: Record<string, AnalyticsValue>
): void {
  trackEvent(
    'outbound_click',
    {
      event_category: 'Outbound',
      event_label: url,
      link_url: url,
      link_text: linkText || '',
      ...additionalData,
    },
    `outbound_${url}`
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      parameters?: Record<string, AnalyticsValue>
    ) => void;
    dataLayer?: Array<Record<string, AnalyticsValue>>;
  }
}
