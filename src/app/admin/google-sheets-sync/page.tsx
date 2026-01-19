/**
 * Admin Dashboard: Sync Status
 *
 * Displays:
 * - Google Sheets sync status for creators and brands
 * - Mailchimp sync status for creators and brands
 * - Manual sync trigger buttons
 *
 * Syncs run automatically every 4 hours via Vercel Cron.
 * This page helps admins monitor sync status and trigger manual syncs if needed.
 */

'use client';

import { useState, useEffect } from 'react';

interface GoogleSheetsSyncStats {
  creators: {
    synced: number;
    unsynced: number;
    total: number;
  };
  brands: {
    synced: number;
    unsynced: number;
    total: number;
  };
}

interface MailchimpSyncStats {
  creators: {
    nigeria: { synced: number; unsynced: number; total: number };
    uk: { synced: number; unsynced: number; total: number };
  };
  brands: {
    nigeria: { synced: number; unsynced: number; total: number };
    uk: { synced: number; unsynced: number; total: number };
  };
}

interface SyncResult {
  success: boolean;
  message?: string;
  total?: {
    processed: number;
    succeeded: number;
    failed: number;
  };
  errors?: Array<{ id: string; error: string }>;
}

export default function SyncStatusAdminPage() {
  const [googleSheetsStats, setGoogleSheetsStats] = useState<GoogleSheetsSyncStats | null>(null);
  const [mailchimpStats, setMailchimpStats] = useState<MailchimpSyncStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState<'google-sheets' | 'mailchimp' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);

  // Fetch sync statuses
  const fetchSyncStatus = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch both statuses in parallel
      const [googleSheetsResponse, mailchimpResponse] = await Promise.all([
        fetch('/api/cron/sync-google-sheets'),
        fetch('/api/cron/sync-mailchimp'),
      ]);

      if (googleSheetsResponse.ok) {
        const data = await googleSheetsResponse.json();
        setGoogleSheetsStats(data.stats);
      }

      if (mailchimpResponse.ok) {
        const data = await mailchimpResponse.json();
        setMailchimpStats(data.stats);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load sync status');
    } finally {
      setLoading(false);
    }
  };

  // Trigger manual Google Sheets sync
  const triggerGoogleSheetsSync = async () => {
    try {
      setSyncing('google-sheets');
      setSyncResult(null);
      setError(null);

      const response = await fetch('/api/cron/sync-google-sheets', {
        method: 'POST',
      });

      const result = await response.json();
      setSyncResult(result);

      // Refresh status after sync
      await fetchSyncStatus();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to trigger Google Sheets sync');
    } finally {
      setSyncing(null);
    }
  };

  // Trigger manual Mailchimp sync
  const triggerMailchimpSync = async () => {
    try {
      setSyncing('mailchimp');
      setSyncResult(null);
      setError(null);

      const response = await fetch('/api/cron/sync-mailchimp', {
        method: 'POST',
      });

      const result = await response.json();
      setSyncResult(result);

      // Refresh status after sync
      await fetchSyncStatus();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to trigger Mailchimp sync');
    } finally {
      setSyncing(null);
    }
  };

  // Initial load
  useEffect(() => {
    fetchSyncStatus();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Sync Status Dashboard</h1>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sync Status Dashboard</h1>
          <button
            onClick={fetchSyncStatus}
            disabled={loading}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">Error: {error}</p>
          </div>
        )}

        {syncResult && (
          <div
            className={`mb-6 border rounded-lg p-4 ${syncResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
          >
            <p className={syncResult.success ? 'text-green-800' : 'text-red-800'}>
              {syncResult.message}
              {syncResult.total && (
                <span className="ml-2">
                  | Processed: {syncResult.total.processed} | Succeeded:{' '}
                  {syncResult.total.succeeded} | Failed: {syncResult.total.failed}
                </span>
              )}
            </p>
            {syncResult.errors && syncResult.errors.length > 0 && (
              <div className="mt-2 text-sm text-red-700">
                Errors:
                <ul className="list-disc list-inside">
                  {syncResult.errors.slice(0, 5).map((err, i) => (
                    <li key={i}>
                      {err.id}: {err.error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Google Sheets Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Google Sheets Sync</h2>
            <button
              onClick={triggerGoogleSheetsSync}
              disabled={syncing !== null}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {syncing === 'google-sheets' ? 'Syncing...' : 'Run Sync Now'}
            </button>
          </div>

          {googleSheetsStats && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Creators */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Creator Applications (Nigeria)
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Synced</p>
                      <p className="text-2xl font-bold text-green-600">
                        {googleSheetsStats.creators.synced}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Pending</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {googleSheetsStats.creators.unsynced}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {googleSheetsStats.creators.total}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Brands */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Brand Briefs (Nigeria)</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Synced</p>
                      <p className="text-2xl font-bold text-green-600">
                        {googleSheetsStats.brands.synced}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Pending</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {googleSheetsStats.brands.unsynced}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {googleSheetsStats.brands.total}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mailchimp Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Mailchimp Sync</h2>
            <button
              onClick={triggerMailchimpSync}
              disabled={syncing !== null}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {syncing === 'mailchimp' ? 'Syncing...' : 'Run Sync Now'}
            </button>
          </div>

          {mailchimpStats && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Creators */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Creator Applications</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Nigeria</p>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-gray-600">Synced</p>
                          <p className="font-bold text-green-600">
                            {mailchimpStats.creators.nigeria.synced}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Pending</p>
                          <p className="font-bold text-yellow-600">
                            {mailchimpStats.creators.nigeria.unsynced}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Total</p>
                          <p className="font-bold text-gray-900">
                            {mailchimpStats.creators.nigeria.total}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">UK</p>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-gray-600">Synced</p>
                          <p className="font-bold text-green-600">
                            {mailchimpStats.creators.uk.synced}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Pending</p>
                          <p className="font-bold text-yellow-600">
                            {mailchimpStats.creators.uk.unsynced}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Total</p>
                          <p className="font-bold text-gray-900">
                            {mailchimpStats.creators.uk.total}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Brands */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Brand Briefs</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Nigeria</p>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-gray-600">Synced</p>
                          <p className="font-bold text-green-600">
                            {mailchimpStats.brands.nigeria.synced}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Pending</p>
                          <p className="font-bold text-yellow-600">
                            {mailchimpStats.brands.nigeria.unsynced}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Total</p>
                          <p className="font-bold text-gray-900">
                            {mailchimpStats.brands.nigeria.total}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">UK</p>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-gray-600">Synced</p>
                          <p className="font-bold text-green-600">
                            {mailchimpStats.brands.uk.synced}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Pending</p>
                          <p className="font-bold text-yellow-600">
                            {mailchimpStats.brands.uk.unsynced}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Total</p>
                          <p className="font-bold text-gray-900">
                            {mailchimpStats.brands.uk.total}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">How It Works</h3>
          <ul className="text-blue-800 space-y-2">
            <li>
              <strong>Automatic Syncs:</strong> Run every 4 hours via Vercel Cron
            </li>
            <li>
              <strong>Google Sheets:</strong> Syncs at minute 0 (12:00, 4:00, 8:00, etc.)
            </li>
            <li>
              <strong>Mailchimp:</strong> Syncs at minute 15 (12:15, 4:15, 8:15, etc.)
            </li>
            <li>
              <strong>Manual Sync:</strong> Use the buttons above to trigger an immediate sync
            </li>
            <li>
              <strong>Pending Records:</strong> Records submitted but not yet synced will be
              processed in the next cron run
            </li>
          </ul>
        </div>

        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Cron Schedule</h3>
          <div className="text-gray-700 space-y-2">
            <p>
              <code className="bg-gray-200 px-2 py-1 rounded text-sm">0 */4 * * *</code> - Google
              Sheets sync (every 4 hours at minute 0)
            </p>
            <p>
              <code className="bg-gray-200 px-2 py-1 rounded text-sm">15 */4 * * *</code> -
              Mailchimp sync (every 4 hours at minute 15)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
