import type { CellHookData } from 'jspdf-autotable';
import type { QuoteBreakdown } from './calculator.utils';
import { formatNaira } from './calculator.utils';

// ₦ (U+20A6) is outside WinAnsiEncoding used by jsPDF's built-in helvetica,
// so we substitute the ISO 4217 code which renders correctly.
function fmtPdf(value: number): string {
  return formatNaira(value).replace('₦', 'NGN ');
}

interface GeneratePdfOptions {
  quote: QuoteBreakdown;
  email: string;
}

const BLACK: [number, number, number] = [15, 23, 42];
const GRAY_LABEL: [number, number, number] = [115, 115, 115];
const LINE: [number, number, number] = [226, 232, 240];
const HEAD_FILL: [number, number, number] = [245, 245, 244];

async function fetchImageDataUrl(url: string): Promise<string> {
  const blob = await fetch(url).then(r => r.blob());
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function getImageNaturalSize(dataUrl: string): Promise<{ w: number; h: number }> {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
    img.src = dataUrl;
  });
}

export async function downloadQuotePdf({ quote }: GeneratePdfOptions): Promise<void> {
  const [{ default: jsPDF, GState }, { autoTable }, logoData] = await Promise.all([
    import('jspdf'),
    import('jspdf-autotable'),
    fetchImageDataUrl('/logos/scn logo black.png'),
  ]);

  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 40;

  const { w: imgW, h: imgH } = await getImageNaturalSize(logoData);
  const wmWidth = pageWidth * 0.65;
  const wmHeight = (wmWidth / imgW) * imgH;
  const wmX = (pageWidth - wmWidth) / 2;
  const wmY = (pageHeight - wmHeight) / 2 + 60;

  doc.saveGraphicsState();
  doc.setGState(new GState({ opacity: 0.06 }));
  doc.addImage(logoData, 'PNG', wmX, wmY, wmWidth, wmHeight);
  doc.restoreGraphicsState();

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(BLACK[0], BLACK[1], BLACK[2]);
  doc.text('Campaign Proposal & Quote', marginX, 88);

  const tableBody =
    quote.items.length > 0
      ? quote.items.map(item => [item.name, String(item.qty), fmtPdf(item.total)])
      : [['No items selected.', '-', fmtPdf(0)]];

  autoTable(doc, {
    head: [['DELIVERABLE/ITEM', 'QTY', 'LINE TOTAL']],
    body: tableBody,
    startY: 125,
    margin: { left: marginX, right: marginX },
    theme: 'plain',
    styles: {
      fontSize: 11,
      cellPadding: { top: 16, right: 10, bottom: 16, left: 12 },
      textColor: BLACK,
      lineWidth: 0,
    },
    headStyles: {
      fillColor: HEAD_FILL,
      textColor: GRAY_LABEL,
      fontStyle: 'bold',
      fontSize: 10,
      cellPadding: { top: 14, right: 10, bottom: 14, left: 12 },
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 129 },
      2: { cellWidth: 155 },
    },
    didDrawCell: (data: CellHookData) => {
      if (data.section !== 'body' || data.column.index !== 0) return;
      const y = data.cell.y + data.cell.height;
      doc.setDrawColor(LINE[0], LINE[1], LINE[2]);
      doc.setLineWidth(0.5);
      doc.line(marginX, y, pageWidth - marginX, y);
    },
  });

  const lastAutoTable = (doc as unknown as { lastAutoTable?: { finalY?: number } }).lastAutoTable;
  let cursorY = (lastAutoTable?.finalY ?? 200) + 28;

  const totalsX = pageWidth - marginX - 284 + 12;
  const valueX = pageWidth - marginX - 12;

  const totalRows: { label: string; value: number; prefix: string }[] = [
    { label: 'Content Subtotal', value: quote.subtotal, prefix: '' },
    { label: 'Licensing & Add-ons', value: quote.licensing, prefix: '+ ' },
    { label: 'Discount', value: quote.discount, prefix: '- ' },
  ];

  totalRows.forEach(row => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(GRAY_LABEL[0], GRAY_LABEL[1], GRAY_LABEL[2]);
    doc.text(row.label, totalsX, cursorY);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(BLACK[0], BLACK[1], BLACK[2]);
    doc.text(`${row.prefix}${fmtPdf(row.value)}`, valueX, cursorY, { align: 'right' });

    doc.setDrawColor(LINE[0], LINE[1], LINE[2]);
    doc.setLineWidth(0.5);
    doc.line(totalsX, cursorY + 14, valueX, cursorY + 14);

    cursorY += 32;
  });

  cursorY += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(GRAY_LABEL[0], GRAY_LABEL[1], GRAY_LABEL[2]);
  doc.text('Final Investment', totalsX, cursorY + 6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(BLACK[0], BLACK[1], BLACK[2]);
  doc.text(fmtPdf(quote.finalTotal), valueX, cursorY + 6, { align: 'right' });

  const safeDate = new Date().toISOString().split('T')[0];
  doc.save(`stardust-quote-${safeDate}.pdf`);
}
