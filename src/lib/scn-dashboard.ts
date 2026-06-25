export function getScnDashboardUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SCN_URL?.trim();

  if (!configuredUrl) {
    throw new Error('NEXT_PUBLIC_SCN_URL is not configured.');
  }

  return configuredUrl.replace(/\/+$/, '');
}
