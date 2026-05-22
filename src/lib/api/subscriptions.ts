const BASE = process.env.NEXT_PUBLIC_API_URL;

export async function getCircleUrl(): Promise<string | null> {
  const res = await fetch(`${BASE}/subscriptions/me/circle-url`, {
    credentials: 'include',
  });
  const data = await res.json().catch(() => ({}));
  if ((data as { statusCode?: number }).statusCode === 404) return null;
  if (!res.ok) throw new Error(data.message ?? 'Failed to get dashboard URL.');
  return (data as { url: string }).url;
}
