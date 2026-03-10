/**
 * Currency utilities for international pricing
 */

export interface Currency {
  code: string;
  symbol: string;
  flag: string;
  name: string;
  rate: number; // Exchange rate relative to NGN (base currency)
}

export const CURRENCIES: Record<string, Currency> = {
  NGN: {
    code: 'NGN',
    symbol: '₦',
    flag: '🇳🇬',
    name: 'Nigerian Naira',
    rate: 1, // Base currency
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    flag: '🇬🇧',
    name: 'British Pound',
    rate: 0.00053, // 1 NGN = ~0.00053 GBP
  },
  USD: {
    code: 'USD',
    symbol: '$',
    flag: '🇺🇸',
    name: 'US Dollar',
    rate: 0.00067, // 1 NGN = ~0.00067 USD
  },
  CAD: {
    code: 'CAD',
    symbol: 'C$',
    flag: '🇨🇦',
    name: 'Canadian Dollar',
    rate: 0.00092, // 1 NGN = ~0.00092 CAD
  },
};

export const BASE_PRICE_NGN = 5000;

/**
 * Convert price from NGN to target currency
 */
export function convertPrice(amountInNGN: number, targetCurrency: string): number {
  const currency = CURRENCIES[targetCurrency];
  if (!currency) {
    throw new Error(`Unknown currency: ${targetCurrency}`);
  }

  const converted = amountInNGN * currency.rate;

  // Round to appropriate decimal places based on currency
  if (targetCurrency === 'NGN') {
    return Math.round(converted);
  } else {
    return Math.round(converted * 100) / 100; // 2 decimal places
  }
}

/**
 * Format price with currency symbol
 */
export function formatPrice(amount: number, currencyCode: string): string {
  const currency = CURRENCIES[currencyCode];
  if (!currency) {
    return `${amount}`;
  }

  if (currencyCode === 'NGN') {
    // Format Nigerian Naira with comma separator
    return `${currency.symbol}${amount.toLocaleString('en-NG')}`;
  } else {
    // Format other currencies with 2 decimal places
    return `${currency.symbol}${amount.toFixed(2)}`;
  }
}

/**
 * Get display label for currency dropdown
 */
export function getCurrencyLabel(currencyCode: string): string {
  const currency = CURRENCIES[currencyCode];
  if (!currency) {
    return currencyCode;
  }
  return `${currency.flag} ${currency.code} – ${currency.name}`;
}
