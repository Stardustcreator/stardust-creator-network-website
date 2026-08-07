/**
 * Format a kobo amount as Naira, e.g. `9_000_000` → `₦90,000`. Server-computed
 * amounts come back in kobo everywhere (payments, brief budgets), so this is
 * the single place that converts them for display.
 */
export function formatNaira(kobo: number | undefined): string {
  const naira = Math.round((kobo ?? 0) / 100);
  return `₦${new Intl.NumberFormat('en-NG').format(naira)}`;
}
