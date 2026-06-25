import path from 'path';

// pdfkit uses CommonJS exports - require is the reliable import style
// eslint-disable-next-line @typescript-eslint/no-require-imports
const PDFDocument = require('pdfkit');

interface QuoteItem {
  name: string;
  qty: number;
  total: number;
}

interface PdfPayload {
  items: QuoteItem[];
  subtotal: number;
  licensing: number;
  discount: number;
  total: number;
}

// Palette
const DARK = '#111827';
const GREY = '#6B7280';
const HEADER_BG = '#F3F4F6';
const BORDER = '#E5E7EB';

// Page layout
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const M = 50;
const CW = PAGE_W - M * 2;

// Column x-positions
const C_ITEM_X = M;
const C_ITEM_W = 265;
const C_QTY_X = M + 265;
const C_QTY_W = 65;
const C_TOT_X = M + 330;
const C_TOT_W = CW - 330;

function naira(n: number): string {
  return `NGN ${new Intl.NumberFormat('en-NG', { minimumFractionDigits: 0 }).format(n)}`;
}

function generatePdf(payload: PdfPayload): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: M });
    const chunks: Buffer[] = [];

    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    // Title
    doc
      .font('Helvetica-Bold')
      .fontSize(22)
      .fillColor(DARK)
      .fillOpacity(1)
      .text('Campaign Proposal & Quote', M, 60);

    // Table header
    const TABLE_Y = 110;
    const HDR_H = 32;

    doc.rect(M, TABLE_Y, CW, HDR_H).fill(HEADER_BG);

    const HDR_Y = TABLE_Y + 11;
    doc.font('Helvetica-Bold').fontSize(8).fillColor(GREY).fillOpacity(1);
    doc.text('DELIVERABLE/ITEM', C_ITEM_X + 8, HDR_Y, { width: C_ITEM_W, lineBreak: false });
    doc.text('QTY', C_QTY_X, HDR_Y, { width: C_QTY_W, align: 'center', lineBreak: false });
    doc.text('LINE TOTAL', C_TOT_X, HDR_Y, { width: C_TOT_W, align: 'right', lineBreak: false });

    // Item rows
    let curY = TABLE_Y + HDR_H;
    const ITEM_H = 40;

    for (const item of payload.items) {
      const textY = curY + 13;
      doc.font('Helvetica').fontSize(10).fillColor(DARK).fillOpacity(1);
      doc.text(item.name, C_ITEM_X + 8, textY, { width: C_ITEM_W, lineBreak: false });
      doc.text(String(item.qty), C_QTY_X, textY, {
        width: C_QTY_W,
        align: 'center',
        lineBreak: false,
      });
      doc.text(naira(item.total), C_TOT_X, textY, {
        width: C_TOT_W,
        align: 'right',
        lineBreak: false,
      });
      curY += ITEM_H;
    }

    // Separator after items
    doc
      .moveTo(M, curY)
      .lineTo(PAGE_W - M, curY)
      .strokeColor(BORDER)
      .lineWidth(1)
      .stroke();

    curY += 24;

    // Summary block
    const SUM_LABEL_X = M + 200;
    const SUM_LABEL_W = C_TOT_X - SUM_LABEL_X - 8;
    const SUM_H = 30;

    const summaryRows = [
      { label: 'Content Subtotal', value: naira(payload.subtotal) },
      { label: 'Licensing & Add-ons', value: `+ ${naira(payload.licensing)}` },
      { label: 'Discount', value: `- ${naira(payload.discount)}` },
    ];

    for (const row of summaryRows) {
      const rowY = curY + 8;
      doc.font('Helvetica').fontSize(10).fillColor(GREY).fillOpacity(1);
      doc.text(row.label, SUM_LABEL_X, rowY, {
        width: SUM_LABEL_W,
        align: 'right',
        lineBreak: false,
      });
      doc.fillColor(DARK);
      doc.text(row.value, C_TOT_X, rowY, { width: C_TOT_W, align: 'right', lineBreak: false });
      curY += SUM_H;
    }

    // Thin line before Final Investment
    doc
      .moveTo(SUM_LABEL_X, curY)
      .lineTo(PAGE_W - M, curY)
      .strokeColor(BORDER)
      .lineWidth(0.5)
      .stroke();

    curY += 14;

    // Final Investment row
    doc.font('Helvetica-Bold').fontSize(11).fillColor(DARK).fillOpacity(1);
    doc.text('Final Investment', SUM_LABEL_X, curY, {
      width: SUM_LABEL_W,
      align: 'right',
      lineBreak: false,
    });
    doc.fontSize(14);
    doc.text(naira(payload.total), C_TOT_X, curY - 2, {
      width: C_TOT_W,
      align: 'right',
      lineBreak: false,
    });

    // Watermark logo
    const logoPath = path.join(process.cwd(), 'public/logos/scn logo black.png');
    const WM_WIDTH = 320;
    const WM_X = (PAGE_W - WM_WIDTH) / 2;
    const WM_Y = PAGE_H - 240;

    doc.save();
    doc.opacity(0.07);
    doc.image(logoPath, WM_X, WM_Y, { width: WM_WIDTH });
    doc.restore();

    doc.end();
  });
}

export async function POST(request: Request): Promise<Response> {
  const body = (await request.json()) as Partial<PdfPayload>;

  if (!body || typeof body.total !== 'number') {
    return Response.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const payload: PdfPayload = {
    items: Array.isArray(body.items) ? body.items : [],
    subtotal: body.subtotal ?? 0,
    licensing: body.licensing ?? 0,
    discount: body.discount ?? 0,
    total: body.total,
  };

  const pdfBuffer = await generatePdf(payload);
  const safeDate = new Date().toISOString().split('T')[0];

  return new Response(new Uint8Array(pdfBuffer), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="stardust-quote-${safeDate}.pdf"`,
      'Content-Length': String(pdfBuffer.length),
    },
  });
}
