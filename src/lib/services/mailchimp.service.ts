/**
 * Mailchimp Service
 * Handles syncing creator application and brand brief data to Mailchimp audience lists
 */

interface MailchimpMember {
  email_address: string;
  status: 'subscribed' | 'pending' | 'unsubscribed';
  merge_fields: {
    FNAME: string;
    LNAME: string;
    PHONE: string;
    BRAND?: string;
  };
  tags: string[];
}

interface MailchimpConfig {
  apiKey: string;
  serverPrefix: string;
  audienceId: string;
}

/**
 * Get Mailchimp configuration from environment variables
 */
function getMailchimpConfig(): MailchimpConfig {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !serverPrefix || !audienceId) {
    throw new Error(
      'Mailchimp configuration missing. Please set MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX, and MAILCHIMP_AUDIENCE_ID environment variables.'
    );
  }

  return { apiKey, serverPrefix, audienceId };
}

/**
 * Split a full name into first and last name
 * Handles cases where there's only one name, or multiple names
 */
function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const nameParts = fullName.trim().split(/\s+/);

  if (nameParts.length === 1) {
    // Only one name provided
    return {
      firstName: nameParts[0],
      lastName: '',
    };
  }

  // Multiple names: first is firstName, rest is lastName
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return { firstName, lastName };
}

/**
 * Add or update a member in Mailchimp audience with the "join-as-creator" tag
 */
export async function addCreatorToMailchimp(data: {
  email: string;
  fullName: string;
  phoneNumber: string;
}): Promise<void> {
  try {
    const config = getMailchimpConfig();
    const { firstName, lastName } = splitFullName(data.fullName);

    // Prepare member data
    const memberData: MailchimpMember = {
      email_address: data.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
        PHONE: data.phoneNumber,
      },
      tags: ['join-as-creator'],
    };

    // Create subscriber hash for the email (required by Mailchimp API)
    const crypto = await import('crypto');
    const subscriberHash = crypto.createHash('md5').update(data.email.toLowerCase()).digest('hex');

    // Mailchimp API endpoint for adding/updating a member
    const url = `https://${config.serverPrefix}.api.mailchimp.com/3.0/lists/${config.audienceId}/members/${subscriberHash}`;

    // Make request to Mailchimp API
    const response = await fetch(url, {
      method: 'PUT', // PUT will create or update the member
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`anystring:${config.apiKey}`).toString('base64')}`,
      },
      body: JSON.stringify(memberData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Mailchimp API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      throw new Error(`Mailchimp API request failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Successfully added creator to Mailchimp:', {
      email: data.email,
      id: result.id,
      status: result.status,
    });
  } catch (error) {
    // Log error but don't throw - we don't want Mailchimp sync failures to block form submission
    console.error('Failed to add creator to Mailchimp:', {
      email: data.email,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw error; // Re-throw so calling code can decide whether to block or continue
  }
}

/**
 * Add or update a brand contact in Mailchimp audience with the "Brands-Find-Creators" tag
 */
export async function addBrandToMailchimp(data: {
  email: string;
  contactPerson: string;
  phoneNumber?: string;
  brandName: string;
}): Promise<void> {
  try {
    const config = getMailchimpConfig();
    const { firstName, lastName } = splitFullName(data.contactPerson);

    // Prepare member data
    const memberData: MailchimpMember = {
      email_address: data.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
        PHONE: data.phoneNumber || '',
        BRAND: data.brandName,
      },
      tags: ['Brands-Find-Creators'],
    };

    // Create subscriber hash for the email (required by Mailchimp API)
    const crypto = await import('crypto');
    const subscriberHash = crypto.createHash('md5').update(data.email.toLowerCase()).digest('hex');

    // Mailchimp API endpoint for adding/updating a member
    const url = `https://${config.serverPrefix}.api.mailchimp.com/3.0/lists/${config.audienceId}/members/${subscriberHash}`;

    // Make request to Mailchimp API
    const response = await fetch(url, {
      method: 'PUT', // PUT will create or update the member
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`anystring:${config.apiKey}`).toString('base64')}`,
      },
      body: JSON.stringify(memberData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Mailchimp API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      throw new Error(`Mailchimp API request failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Successfully added brand to Mailchimp:', {
      email: data.email,
      brandName: data.brandName,
      id: result.id,
      status: result.status,
    });
  } catch (error) {
    // Log error but don't throw - we don't want Mailchimp sync failures to block form submission
    console.error('Failed to add brand to Mailchimp:', {
      email: data.email,
      brandName: data.brandName,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw error; // Re-throw so calling code can decide whether to block or continue
  }
}

/**
 * Helper function to validate Mailchimp configuration
 * Useful for debugging and health checks
 */
export function validateMailchimpConfig(): {
  isValid: boolean;
  missingVars: string[];
} {
  const requiredVars = ['MAILCHIMP_API_KEY', 'MAILCHIMP_SERVER_PREFIX', 'MAILCHIMP_AUDIENCE_ID'];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  return {
    isValid: missingVars.length === 0,
    missingVars,
  };
}
