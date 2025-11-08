import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get client IP address
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const clientIp = forwardedFor?.split(',')[0] || realIp || 'unknown';

    // In development, we'll return a mock response
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({
        success: true,
        country: 'NG', // Default to Nigeria for testing
        countryName: 'Nigeria',
        ip: clientIp,
        source: 'development-mock',
      });
    }

    // In production, you would integrate with a geolocation service like:
    // - Vercel's edge config
    // - MaxMind GeoLite2
    // - IP2Location
    // - ipapi.co
    // - ipgeolocation.io

    // For now, we'll try to detect from headers or use a simple IP lookup
    const cfCountry = request.headers.get('cf-ipcountry'); // Cloudflare
    const vercelCountry = request.headers.get('x-vercel-ip-country'); // Vercel

    const country = cfCountry || vercelCountry || 'unknown';
    let countryName = country;

    // Map country codes to full names
    const countryMap: Record<string, string> = {
      NG: 'Nigeria',
      GB: 'United Kingdom',
      US: 'United States',
      CA: 'Canada',
      AU: 'Australia',
      // Add more as needed
    };

    if (country && country !== 'unknown') {
      countryName = countryMap[country] || country;
    }

    return NextResponse.json({
      success: true,
      country,
      countryName,
      ip: clientIp,
      source: cfCountry ? 'cloudflare' : vercelCountry ? 'vercel' : 'unknown',
    });
  } catch (error) {
    console.error('Geolocation detection error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to detect location',
        country: 'unknown',
        countryName: 'Unknown',
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
