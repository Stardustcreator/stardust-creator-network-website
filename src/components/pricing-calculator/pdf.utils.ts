import type { QuoteBreakdown } from './calculator.utils';

interface DownloadQuotePdfOptions {
  quote: QuoteBreakdown;
  email: string;
}

export async function downloadQuotePdf({ quote }: DownloadQuotePdfOptions): Promise<void> {
  const res = await fetch('/api/rate-card/pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: quote.items,
      subtotal: quote.subtotal,
      licensing: quote.licensing,
      discount: quote.discount,
      total: quote.finalTotal,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to generate PDF');
  }

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const safeDate = new Date().toISOString().split('T')[0];
  a.download = `stardust-quote-${safeDate}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
