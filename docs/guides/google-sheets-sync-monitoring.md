# Google Sheets Sync Monitoring & Retry System

## Overview

This system ensures that all leads submitted to Supabase are reliably synced to Google Sheets, even if the initial sync fails. Failed syncs are tracked, retried automatically, and visible to admins for monitoring.

## The Problem We Solved

Previously, when a lead was submitted:

1. It was saved to Supabase (always succeeded)
2. It was synced to Google Sheets (sometimes failed silently)

**Why syncs failed:**

- Google API rate limits
- Network timeouts
- Authentication issues
- Temporary Google service outages
- Malformed data that Google rejected

**The issue:** These failures were logged to console but never tracked or retried, meaning some leads in Supabase never made it to Google Sheets.

## The Solution

We now have a comprehensive monitoring and retry system:

### 1. Failure Tracking Table

A new Supabase table `google_sheets_sync_failures` tracks every failed sync with:

- Which record failed (type, ID, email, country)
- Why it failed (error message and details)
- How many times it's been retried
- When to retry next (exponential backoff)
- Current status (pending, retrying, succeeded, failed_permanently)

### 2. Enhanced Google Sheets Service

The sync functions now:

- Track failures in the database when sync fails
- Log detailed diagnostics (spreadsheet ID, sheet name, error type, timestamp)
- Accept a retry flag to prevent infinite tracking loops
- Pass record IDs for proper failure tracking

### 3. Automatic Retry System

The retry endpoint `/api/google-sheets/retry-failed-syncs`:

- Fetches pending failed syncs that are ready for retry
- Retries up to 50 syncs per call
- Uses exponential backoff: 5m → 15m → 1h → 4h → 24h
- Marks syncs as succeeded or permanently failed after 5 attempts
- Updates retry count and next retry time

### 4. Admin Dashboard

A visual dashboard at `/admin/google-sheets-sync` shows:

- Summary statistics (pending, retrying, succeeded, failed)
- List of recent failed syncs with details
- Manual retry button for immediate action
- Setup instructions for automated cron jobs

## Architecture

```
┌─────────────────┐
│  User submits   │
│     form        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Save to        │◄─── Always succeeds
│  Supabase       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Sync to        │
│  Google Sheets  │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
 Success   Failure
    │         │
    ▼         ▼
   Done   ┌──────────────────┐
          │ Track in         │
          │ sync_failures    │
          │ table            │
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────┐
          │ Cron job calls   │
          │ retry endpoint   │
          │ every 5-10 min   │
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────┐
          │ Retry with       │
          │ exponential      │
          │ backoff          │
          └────────┬─────────┘
                   │
              ┌────┴────┐
              │         │
          Success   Failed again
              │         │
              ▼         ▼
      Mark succeeded  Increment retry
                      Schedule next
```

## Files Created/Modified

### New Files

1. **Migration**: Database table for tracking failures
   - Created via Supabase migration
   - Table: `google_sheets_sync_failures`

2. **API Route**: `/src/app/api/google-sheets/retry-failed-syncs/route.ts`
   - GET: View sync statistics and recent failures
   - POST: Process and retry failed syncs
   - Protected by CRON_SECRET

3. **Admin Dashboard**: `/src/app/admin/google-sheets-sync/page.tsx`
   - Visual monitoring interface
   - Manual retry trigger
   - Real-time statistics

4. **Documentation**: `/docs/google-sheets-sync-monitoring.md`
   - This file

### Modified Files

1. **Google Sheets Service**: `/src/lib/services/google-sheets.service.ts`
   - Added `trackSyncFailure()` helper
   - Enhanced error logging with diagnostics
   - Added `isRetry` parameter to prevent tracking loops
   - Pass record IDs for failure tracking

2. **Brand Brief API**: `/src/app/api/brand-brief/route.ts`
   - Pass record ID to Google Sheets sync function
   - Updated comments to reference failure tracking

## Database Schema

```sql
CREATE TABLE google_sheets_sync_failures (
  id UUID PRIMARY KEY,

  -- What failed
  record_type TEXT NOT NULL,  -- 'creator_application', 'brand_brief', 'creator_survey'
  record_id UUID NOT NULL,
  record_email TEXT NOT NULL,
  record_country TEXT NOT NULL,

  -- Why it failed
  error_message TEXT NOT NULL,
  error_details JSONB,

  -- Retry tracking
  retry_count INTEGER DEFAULT 0,
  last_retry_at TIMESTAMPTZ,
  next_retry_at TIMESTAMPTZ,

  -- Status
  status TEXT DEFAULT 'pending',  -- 'pending', 'retrying', 'succeeded', 'failed_permanently'
  succeeded_at TIMESTAMPTZ,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Retry Strategy

### Exponential Backoff

| Retry # | Delay    | Total Time Since Failure |
| ------- | -------- | ------------------------ |
| 1       | 5 min    | 5 minutes                |
| 2       | 15 min   | 20 minutes               |
| 3       | 1 hour   | 1 hour 20 minutes        |
| 4       | 4 hours  | 5 hours 20 minutes       |
| 5       | 24 hours | 29 hours 20 minutes      |

After 5 failed attempts, the sync is marked as `failed_permanently` and requires manual investigation.

## Setup Instructions

### 1. Environment Variables

Ensure these are set in your `.env.local`:

```bash
# Google Sheets API credentials
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
GOOGLE_SHEETS_SHEET_NAME="Nigeria Applications"
GOOGLE_SHEETS_BRAND_SHEET_NAME="brands registration ng"
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Cron job security
CRON_SECRET=your_random_secret_here
```

### 2. Set Up Automated Cron Job

Choose one of these options:

#### Option A: Vercel Cron Jobs (Recommended for Vercel)

Create `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/google-sheets/retry-failed-syncs",
      "schedule": "*/10 * * * *"
    }
  ]
}
```

Update the API route to check for Vercel's authorization header:

```typescript
const authHeader = request.headers.get('authorization');
const cronSecret = process.env.CRON_SECRET;
const vercelCronSecret = request.headers.get('x-vercel-cron-secret');

if (vercelCronSecret !== process.env.CRON_SECRET && authHeader !== `Bearer ${cronSecret}`) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

#### Option B: GitHub Actions

Create `.github/workflows/retry-sheets-sync.yml`:

```yaml
name: Retry Failed Google Sheets Syncs

on:
  schedule:
    - cron: '*/10 * * * *' # Every 10 minutes
  workflow_dispatch: # Allow manual trigger

jobs:
  retry:
    runs-on: ubuntu-latest
    steps:
      - name: Call Retry Endpoint
        run: |
          curl -X POST https://your-domain.com/api/google-sheets/retry-failed-syncs \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}"
```

#### Option C: External Cron Service

Use services like:

- **cron-job.org** (free)
- **EasyCron** (free tier available)
- **Zapier** (scheduled webhooks)

Configure:

- URL: `https://your-domain.com/api/google-sheets/retry-failed-syncs`
- Method: POST
- Header: `Authorization: Bearer YOUR_CRON_SECRET`
- Schedule: Every 10 minutes

### 3. Manual Retry

You can also trigger retries manually:

```bash
# Via curl
curl -X POST https://your-domain.com/api/google-sheets/retry-failed-syncs \
  -H "Authorization: Bearer YOUR_CRON_SECRET"

# Via admin dashboard
Visit: https://your-domain.com/admin/google-sheets-sync
Click: "Retry Failed Syncs" button
```

## Monitoring

### Admin Dashboard

Access at: `/admin/google-sheets-sync`

**Features:**

- Real-time statistics cards
- List of recent failed syncs
- Manual retry button
- Auto-refresh capability
- Color-coded status indicators

**Recommended frequency:** Check daily or weekly

### Query Examples

#### Find all pending syncs

```sql
SELECT * FROM google_sheets_sync_failures
WHERE status = 'pending'
ORDER BY next_retry_at ASC;
```

#### Find permanently failed syncs

```sql
SELECT * FROM google_sheets_sync_failures
WHERE status = 'failed_permanently'
ORDER BY created_at DESC;
```

#### Success rate over last 24 hours

```sql
SELECT
  COUNT(*) FILTER (WHERE status = 'succeeded') as succeeded,
  COUNT(*) FILTER (WHERE status = 'failed_permanently') as failed,
  ROUND(
    COUNT(*) FILTER (WHERE status = 'succeeded')::numeric /
    NULLIF(COUNT(*), 0) * 100,
    2
  ) as success_rate_percentage
FROM google_sheets_sync_failures
WHERE created_at > NOW() - INTERVAL '24 hours';
```

#### Average retry count before success

```sql
SELECT AVG(retry_count) as avg_retries_to_success
FROM google_sheets_sync_failures
WHERE status = 'succeeded'
AND succeeded_at > NOW() - INTERVAL '7 days';
```

## Troubleshooting

### Issue: All syncs are failing

**Possible causes:**

1. Invalid Google credentials
2. Spreadsheet ID incorrect
3. Sheet name mismatch
4. Service account doesn't have access to spreadsheet

**Solutions:**

1. Verify environment variables
2. Check spreadsheet exists and is accessible
3. Ensure service account email is added as editor to spreadsheet
4. Check API logs for specific error messages

### Issue: Syncs stuck in "retrying" status

**Possible causes:**

- Cron job not running
- Cron secret mismatch
- API endpoint unreachable

**Solutions:**

1. Manually trigger retry from admin dashboard
2. Check cron job configuration
3. Verify CRON_SECRET environment variable
4. Check API logs for authentication errors

### Issue: Permanently failed syncs

**Investigation steps:**

1. View error message in admin dashboard
2. Check if original record still exists in Supabase
3. Verify data format matches Google Sheets expectations
4. Test Google Sheets API connection manually

**Manual fix:**

1. Fix underlying issue (credentials, format, etc.)
2. Delete the failed sync record
3. Fetch original record from Supabase
4. Manually call sync function with fixed data

### Issue: High failure rate

**Possible causes:**

- Google API rate limits
- Network issues
- Data validation problems

**Solutions:**

1. Increase retry delays
2. Implement request throttling
3. Add data validation before sync
4. Consider batching syncs instead of real-time

## Performance Considerations

### Current Limits

- Process up to 50 failed syncs per cron run
- Maximum 5 retry attempts per sync
- Exponential backoff up to 24 hours

### Scaling

If you have a high volume of submissions and failures:

1. **Increase cron frequency**: Run every 5 minutes instead of 10
2. **Increase batch size**: Process more than 50 syncs per run
3. **Add parallelization**: Process syncs concurrently (use Promise.all)
4. **Implement queue system**: Use a proper job queue (e.g., BullMQ, Inngest)

### Database Cleanup

Archive old succeeded/failed records periodically:

```sql
-- Archive records older than 30 days
DELETE FROM google_sheets_sync_failures
WHERE status IN ('succeeded', 'failed_permanently')
AND updated_at < NOW() - INTERVAL '30 days';
```

Or keep for analytics:

```sql
-- Move to archive table
INSERT INTO google_sheets_sync_failures_archive
SELECT * FROM google_sheets_sync_failures
WHERE status IN ('succeeded', 'failed_permanently')
AND updated_at < NOW() - INTERVAL '30 days';

-- Then delete from main table
DELETE FROM google_sheets_sync_failures
WHERE status IN ('succeeded', 'failed_permanently')
AND updated_at < NOW() - INTERVAL '30 days';
```

## Testing

### Test Failure Tracking

1. Temporarily break Google Sheets credentials
2. Submit a test form
3. Check that failure is tracked in database
4. Verify error message is descriptive

### Test Retry System

1. Fix credentials
2. Manually trigger retry from admin dashboard
3. Verify sync succeeds
4. Check that status updates to 'succeeded'

### Test Cron Job

1. Deploy with cron configuration
2. Create a test failure
3. Wait for cron schedule
4. Verify retry happened automatically
5. Check logs for successful processing

## Security

### API Endpoint Protection

The retry endpoint is protected by:

- `CRON_SECRET` environment variable
- Bearer token authentication
- Only accessible via POST (GET is stats only)

### Admin Dashboard

**Important**: The admin dashboard at `/admin/google-sheets-sync` has no built-in authentication. You should:

1. Add authentication middleware
2. Restrict access to admin users only
3. Consider using your existing admin auth system

Example middleware:

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check if user is authenticated and is admin
    const session = getSession(request);
    if (!session || !session.user.isAdmin) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}
```

## Future Enhancements

### Possible Improvements

1. **Email alerts**: Notify admins when syncs fail permanently
2. **Slack/Discord webhooks**: Real-time notifications
3. **Analytics dashboard**: Charts and graphs of sync health
4. **Bulk manual retry**: Retry multiple specific records at once
5. **Data reconciliation**: Compare Supabase vs Google Sheets and find missing records
6. **Smart retry**: Adjust backoff based on error type (rate limit vs auth vs network)
7. **Webhook fallback**: If Google Sheets continues to fail, send to alternative destination

### Contributing

When adding new form types that sync to Google Sheets:

1. Add record type to `trackSyncFailure()` union type
2. Implement sync function in Google Sheets service
3. Update retry endpoint to handle new record type
4. Add to admin dashboard statistics

## Support

### Common Questions

**Q: Will users see an error if Google Sheets sync fails?**  
A: No, users always get a success message if Supabase succeeds. Google Sheets sync is non-blocking.

**Q: How do I know if syncs are failing?**  
A: Check the admin dashboard or query the `google_sheets_sync_failures` table.

**Q: Can I manually add a missing record to Google Sheets?**  
A: Yes, you can query Supabase for the record and manually add it, or trigger a retry.

**Q: What happens if a cron job fails to run?**  
A: The next cron run will pick up all pending syncs that are ready for retry.

**Q: How much does this cost?**  
A: Google Sheets API is free for moderate usage. Supabase storage is minimal. Cron jobs depend on your hosting platform.

### Getting Help

1. Check error messages in admin dashboard
2. Review API logs in your hosting platform
3. Query the failures table directly for detailed error info
4. Check Google Sheets API status page
5. Verify service account permissions

---

**Implementation Status**: Complete  
**Last Updated**: 2025-11-18  
**Maintained By**: Development Team
