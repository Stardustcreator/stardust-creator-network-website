/**
 * Early Capture API for Brand Brief Forms
 * Captures contact information to Mailchimp as soon as the first section is completed
 * This prevents losing leads when users abandon the form after step 1
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { addBrandToMailchimp } from '@/lib/services/mailchimp.service';

// Validation schema for early capture (minimal required fields)
const earlyBrandCaptureSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  contactPerson: z.string().min(2, 'Contact person name must be at least 2 characters'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  brandName: z.string().min(2, 'Brand/Company name must be at least 2 characters'),
  marketingConsent: z.boolean().refine(val => val === true, {
    message: 'You must agree to receive updates to continue',
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the incoming data
    const validatedData = earlyBrandCaptureSchema.parse(body);

    // Only proceed if user has consented to marketing
    if (!validatedData.marketingConsent) {
      return NextResponse.json(
        {
          success: false,
          error: 'Marketing consent is required',
        },
        { status: 400 }
      );
    }

    // Add to Mailchimp with partial-brand-inquiry tag
    await addBrandToMailchimp(
      {
        email: validatedData.email,
        contactPerson: validatedData.contactPerson,
        phoneNumber: validatedData.phoneNumber,
        brandName: validatedData.brandName,
      },
      {
        isPartialSubmission: true,
      }
    );

    console.log('Early capture successful for brand:', {
      email: validatedData.email,
      brandName: validatedData.brandName,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Contact information captured successfully',
    });
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.issues,
        },
        { status: 400 }
      );
    }

    // Handle other errors
    console.error('Early capture failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to capture contact information',
      },
      { status: 500 }
    );
  }
}
