import { NextRequest, NextResponse } from 'next/server';
import { resumeBrief } from '@/lib/api/briefs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const token = typeof body?.token === 'string' ? body.token : undefined;

    if (!token) {
      return NextResponse.json({ success: false, error: 'Missing token.' }, { status: 400 });
    }

    const result = await resumeBrief(token);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Brief resume error:', error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : 'Internal server error. Please try again later.',
      },
      { status: 400 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
