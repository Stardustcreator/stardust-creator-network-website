import { type Country } from '@/lib/contexts/CountryContext';

interface GeolocationResponse {
  country_code: string;
  country_name: string;
  error?: string;
}

const GEOLOCATION_CACHE_KEY = 'stardust-geolocation-cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface CachedGeolocation {
  country: Country;
  timestamp: number;
}

/**
 * Maps country codes to currency codes for payment
 */
export function mapCountryCodeToCurrency(countryCode: string): 'NGN' | 'USD' | 'GBP' | 'CAD' {
  const code = countryCode.toLowerCase();

  // Nigeria
  if (code === 'ng') {
    return 'NGN';
  }

  // UK and its territories
  if (['gb', 'uk'].includes(code)) {
    return 'GBP';
  }

  // USA
  if (code === 'us') {
    return 'USD';
  }

  // Canada
  if (code === 'ca') {
    return 'CAD';
  }

  // Default to USD for unsupported countries
  return 'USD';
}

/**
 * Maps country codes to our supported countries
 */
function mapCountryCodeToSupported(countryCode: string): Country {
  const code = countryCode.toLowerCase();

  // UK and its territories
  if (['gb', 'uk'].includes(code)) {
    return 'uk';
  }

  // Nigeria
  if (code === 'ng') {
    return 'nigeria';
  }

  // Default to Nigeria for unsupported countries
  // You can modify this logic based on your business requirements
  return 'nigeria';
}

/**
 * Get cached geolocation if available and not expired
 */
function getCachedGeolocation(): Country | null {
  if (typeof window === 'undefined') return null;

  try {
    const cached = localStorage.getItem(GEOLOCATION_CACHE_KEY);
    if (!cached) return null;

    const parsedCache: CachedGeolocation = JSON.parse(cached);
    const isExpired = Date.now() - parsedCache.timestamp > CACHE_DURATION;

    if (isExpired) {
      localStorage.removeItem(GEOLOCATION_CACHE_KEY);
      return null;
    }

    return parsedCache.country;
  } catch (error) {
    console.error('Failed to parse geolocation cache:', error);
    localStorage.removeItem(GEOLOCATION_CACHE_KEY);
    return null;
  }
}

/**
 * Cache the detected country
 */
function setCachedGeolocation(country: Country): void {
  if (typeof window === 'undefined') return;

  try {
    const cacheData: CachedGeolocation = {
      country,
      timestamp: Date.now(),
    };
    localStorage.setItem(GEOLOCATION_CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Failed to cache geolocation:', error);
  }
}

/**
 * Detect user's country using IP-based geolocation
 * Uses ipapi.co which provides free tier without API key
 */
export async function detectUserCountry(): Promise<Country> {
  // First check cache
  const cached = getCachedGeolocation();
  if (cached) {
    return cached;
  }

  try {
    // Using ipapi.co free tier (1000 requests/month without API key)
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: GeolocationResponse = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    const detectedCountry = mapCountryCodeToSupported(data.country_code);

    // Cache the result
    setCachedGeolocation(detectedCountry);

    return detectedCountry;
  } catch (error) {
    console.warn('Failed to detect user country:', error);

    // Fallback to Nigeria (or you could use a different fallback strategy)
    const fallback: Country = 'nigeria';
    setCachedGeolocation(fallback);

    return fallback;
  }
}

/**
 * Detect user's currency based on country
 */
export async function detectUserCurrency(): Promise<'NGN' | 'USD' | 'GBP' | 'CAD'> {
  try {
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return 'USD'; // Fallback to USD
    }

    const data: GeolocationResponse = await response.json();

    if (data.error) {
      return 'USD';
    }

    return mapCountryCodeToCurrency(data.country_code);
  } catch (error) {
    console.warn('Failed to detect user currency:', error);
    return 'USD'; // Fallback to USD
  }
}

/**
 * Clear geolocation cache (useful for testing or privacy)
 */
export function clearGeolocationCache(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(GEOLOCATION_CACHE_KEY);
}
