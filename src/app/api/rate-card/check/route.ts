import { getSupabaseAdmin } from '@/lib/supabase';

interface CheckBody {
  fingerprint: string;
}

export async function POST(request: Request): Promise<Response> {
  // In development, never block — allows unrestricted local testing
  if (process.env.NODE_ENV === 'development') {
    return Response.json({ blocked: false });
  }

  const body = (await request.json()) as Partial<CheckBody>;
  const fingerprint = body?.fingerprint;

  if (!fingerprint || typeof fingerprint !== 'string') {
    return Response.json({ blocked: false });
  }

  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from('rate_card_submissions')
    .select('id')
    .eq('fingerprint_id', fingerprint)
    .maybeSingle();

  return Response.json({ blocked: !!data });
}
