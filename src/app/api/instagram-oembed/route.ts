import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const postUrl = searchParams.get('url');

  if (!postUrl) {
    return NextResponse.json({ error: 'Instagram post URL is required' }, { status: 400 });
  }

  try {
    // Normalize URL
    const normalizedUrl = postUrl.split('?')[0];

    // Instagram's oEmbed API requires authentication, so we'll fetch the post page directly
    // and extract Open Graph metadata
    const postPageResponse = await fetch(normalizedUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        Referer: 'https://www.instagram.com/',
      },
    });

    if (!postPageResponse.ok) {
      console.error(
        `Instagram fetch failed: ${postPageResponse.status} ${postPageResponse.statusText}`
      );
      throw new Error(`Failed to fetch Instagram post page: ${postPageResponse.status}`);
    }

    const html = await postPageResponse.text();

    // Log for debugging (remove in production)
    console.log('Instagram HTML length:', html.length);

    // Helper function to decode HTML entities
    const decodeHtmlEntities = (str: string): string => {
      return str
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ');
    };

    // Extract Open Graph metadata - try multiple patterns
    const ogImagePatterns = [
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
      /<meta[^>]+name=["']og:image["'][^>]+content=["']([^"']+)["']/i,
      /"og:image":\s*"([^"]+)"/i,
    ];

    let thumbnailUrl: string | null = null;
    for (const pattern of ogImagePatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        thumbnailUrl = decodeHtmlEntities(match[1]);
        break;
      }
    }

    // Also try to find video thumbnail
    if (!thumbnailUrl) {
      const videoPatterns = [
        /<meta[^>]+property=["']og:video["'][^>]+content=["']([^"']+)["']/i,
        /<meta[^>]+property=["']og:video:secure_url["'][^>]+content=["']([^"']+)["']/i,
        /"og:video":\s*"([^"]+)"/i,
      ];

      for (const pattern of videoPatterns) {
        const match = html.match(pattern);
        if (match && match[1]) {
          // For videos, try to get the thumbnail from the video URL or use a video poster
          thumbnailUrl = match[1];
          break;
        }
      }
    }

    // Try to extract from JSON-LD structured data
    if (!thumbnailUrl) {
      const jsonLdMatch = html.match(
        /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i
      );
      if (jsonLdMatch) {
        try {
          const jsonData = JSON.parse(jsonLdMatch[1]);
          if (jsonData.image) {
            thumbnailUrl =
              typeof jsonData.image === 'string'
                ? jsonData.image
                : jsonData.image.url || jsonData.image[0];
          }
        } catch (e) {
          // Ignore JSON parse errors
        }
      }
    }

    // Extract other metadata
    const ogTitleMatch =
      html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/i);
    const ogDescriptionMatch =
      html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:description["']/i);
    const ogUrlMatch =
      html.match(/<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:url["']/i);

    // Try to extract author/username from the page
    const authorPatterns = [
      /<meta[^>]+property=["']og:site_name["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+name=["']author["'][^>]+content=["']([^"']+)["']/i,
      /"username":\s*"([^"]+)"/i,
      /@([a-zA-Z0-9._]+)/i,
    ];

    let authorName = 'Instagram';
    for (const pattern of authorPatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        authorName = match[1];
        break;
      }
    }

    const title = ogTitleMatch
      ? decodeHtmlEntities(ogTitleMatch[1] || ogTitleMatch[2] || 'Instagram Post')
      : 'Instagram Post';
    const description = ogDescriptionMatch
      ? decodeHtmlEntities(ogDescriptionMatch[1] || ogDescriptionMatch[2] || '')
      : '';
    const url = ogUrlMatch
      ? decodeHtmlEntities(ogUrlMatch[1] || ogUrlMatch[2] || normalizedUrl)
      : normalizedUrl;

    // Log extracted data for debugging
    console.log('Extracted thumbnail:', thumbnailUrl ? 'Found' : 'Not found');
    console.log('Extracted title:', title);
    console.log('Extracted description:', description);

    return NextResponse.json({
      html: '', // Don't include HTML blockquote, we'll render our own preview
      author_name: authorName,
      author_url: url,
      url: url,
      thumbnail_url: thumbnailUrl,
      title: title,
      description: description,
    });
  } catch (error) {
    console.error('Error fetching Instagram post:', error);
    return NextResponse.json({ error: 'Failed to fetch Instagram post' }, { status: 500 });
  }
}
