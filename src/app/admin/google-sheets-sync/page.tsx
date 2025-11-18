/**
 * Admin Dashboard: Google Sheets Sync Status
 *
 * Displays:
 * - Summary statistics of sync failures
 * - List of recent failed syncs
 * - Manual retry button
 *
 * This page helps admins monitor and manage Google Sheets sync failures.
 * Access should be restricted to authorized admins only.
 */

'use client';

import { useState, useEffect } from 'react';

interface SyncStats {
  pending: number;
  retrying: number;
  succeeded: number;
  failed_permanently: number;
  total: number;
}

interface SyncFailure {
  id: string;
  record_type: string;
  record_id: string;
  record_email: string;
  record_country: string;
  retry_count: number;
  error_message: string;
  status: string;
  created_at: string;
  next_retry_at: string | null;
}

interface SyncData {
  stats: SyncStats;
  recentFailures: SyncFailure[];
}

export default function GoogleSheetsSyncAdminPage() {
  const [syncData, setSyncData] = useState<SyncData | null>(null);
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryResult, setRetryResult] = useState<string | null>(null);

  // Fetch sync status
  const fetchSyncStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/google-sheets/retry-failed-syncs');

      if (!response.ok) {
        throw new Error('Failed to fetch sync status');
      }

      const data = await response.json();
      setSyncData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load sync status');
    } finally {
      setLoading(false);
    }
  };

  // Manual retry trigger
  const triggerRetry = async () => {
    try {
      setRetrying(true);
      setRetryResult(null);
      setError(null);

      const response = await fetch('/api/google-sheets/retry-failed-syncs', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to trigger retry');
      }

      const result = await response.json();
      setRetryResult(
        `Processed: ${result.processed} | Succeeded: ${result.succeeded} | Failed: ${result.failed} | Permanently Failed: ${result.permanentlyFailed || 0}`
      );

      // Refresh data after retry
      await fetchSyncStatus();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to trigger retry');
    } finally {
      setRetrying(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchSyncStatus();
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Calculate time until next retry
  const getTimeUntilRetry = (nextRetryAt: string | null) => {
    if (!nextRetryAt) return 'N/A';

    const now = new Date().getTime();
    const retryTime = new Date(nextRetryAt).getTime();
    const diffMinutes = Math.round((retryTime - now) / 1000 / 60);

    if (diffMinutes < 0) return 'Ready now';
    if (diffMinutes === 0) return 'Less than 1 minute';
    if (diffMinutes < 60) return `${diffMinutes} minutes`;
    if (diffMinutes < 1440) return `${Math.round(diffMinutes / 60)} hours`;
    return `${Math.round(diffMinutes / 1440)} days`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Google Sheets Sync Status</h1>
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
          <h1 className="text-3xl font-bold text-gray-900">Google Sheets Sync Status</h1>
          <div className="flex gap-4">
            <button
              onClick={fetchSyncStatus}
              disabled={loading}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Refresh
            </button>
            <button
              onClick={triggerRetry}
              disabled={retrying || !syncData?.stats.pending}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {retrying ? 'Retrying...' : 'Retry Failed Syncs'}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">Error: {error}</p>
          </div>
        )}

        {retryResult && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">Retry Results: {retryResult}</p>
          </div>
        )}

        {syncData && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Pending</h3>
                <p className="text-3xl font-bold text-yellow-600">{syncData.stats.pending}</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Retrying</h3>
                <p className="text-3xl font-bold text-blue-600">{syncData.stats.retrying}</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Succeeded</h3>
                <p className="text-3xl font-bold text-green-600">{syncData.stats.succeeded}</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Failed</h3>
                <p className="text-3xl font-bold text-red-600">
                  {syncData.stats.failed_permanently}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Total</h3>
                <p className="text-3xl font-bold text-gray-900">{syncData.stats.total}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Failed Syncs</h2>
              </div>

              {syncData.recentFailures.length === 0 ? (
                <div className="p-6 text-center text-gray-600">
                  No failed syncs found. All systems operational.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Country
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Retries
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Next Retry
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Error
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {syncData.recentFailures.map(failure => (
                        <tr
                          key={failure.id}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {failure.record_type.replace('_', ' ')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {failure.record_email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {failure.record_country}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {failure.retry_count} / 5
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                failure.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : failure.status === 'failed_permanently'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {failure.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {getTimeUntilRetry(failure.next_retry_at)}
                          </td>
                          <td
                            className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate"
                            title={failure.error_message}
                          >
                            {failure.error_message}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {formatDate(failure.created_at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">How It Works</h3>
              <ul className="text-blue-800 space-y-2">
                <li>Failed Google Sheets syncs are automatically tracked in the database</li>
                <li>Syncs are retried with exponential backoff: 5m, 15m, 1h, 4h, 24h</li>
                <li>After 5 failed attempts, syncs are marked as permanently failed</li>
                <li>
                  Set up a cron job to call the retry endpoint automatically every 5-10 minutes
                </li>
                <li>You can manually trigger retries using the button above</li>
              </ul>
            </div>

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">Setup Cron Job</h3>
              <p className="text-yellow-800 mb-3">
                For automatic retries, set up a cron job on your platform (e.g., Vercel Cron, GitHub
                Actions) to call:
              </p>
              <code className="block bg-yellow-100 p-3 rounded text-sm text-yellow-900 overflow-x-auto">
                POST https://your-domain.com/api/google-sheets/retry-failed-syncs
                <br />
                Authorization: Bearer YOUR_CRON_SECRET
              </code>
              <p className="text-yellow-800 mt-3 text-sm">
                Set the CRON_SECRET environment variable to secure this endpoint.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
