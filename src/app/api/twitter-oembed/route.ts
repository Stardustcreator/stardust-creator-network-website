import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tweetUrl = searchParams.get('url');

  if (!tweetUrl) {
    return NextResponse.json({ error: 'Tweet URL is required' }, { status: 400 });
  }

  try {
    // Normalize URL (remove query params for oEmbed)
    const normalizedUrl = tweetUrl.split('?')[0].replace('x.com', 'twitter.com');
    const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(normalizedUrl)}&theme=dark&dnt=true&omit_script=true`;

    const response = await fetch(oembedUrl);

    if (!response.ok) {
      throw new Error(`Twitter API returned ${response.status}`);
    }

    const data = await response.json();

    // Extract tweet ID from URL
    const tweetIdMatch = normalizedUrl.match(/status\/(\d+)/);
    let thumbnailUrl: string | null = null;

    if (tweetIdMatch) {
      const tweetId = tweetIdMatch[1];

      // Method 1: Try to get thumbnail from Twitter's embed.js endpoint
      // This sometimes includes media URLs
      try {
        const embedJsUrl = `https://platform.twitter.com/widgets.js`;
        // We can't easily parse this, so try method 2
      } catch (e) {
        // Continue
      }

      // Method 2: Try fetching the tweet's JSON data (Twitter's internal API)
      // This is a bit of a hack but sometimes works
      try {
        const jsonUrl = `https://twitter.com/i/api/graphql/.../TweetDetail?variables=${encodeURIComponent(JSON.stringify({ tweetId, with_rux_injections: false }))}`;
        // This requires authentication, so skip
      } catch (e) {
        // Continue
      }

      // Method 3: Try using a screenshot/thumbnail service
      // Use opengraph.xyz or similar service to get tweet preview
      try {
        const ogUrl = `https://opengraph.xyz/api/1.1/site/${encodeURIComponent(normalizedUrl)}`;
        const ogResponse = await fetch(ogUrl);
        if (ogResponse.ok) {
          const ogData = await ogResponse.json();
          if (ogData.image) {
            thumbnailUrl = ogData.image;
          }
        }
      } catch (e) {
        // Continue to next method
      }

      // Method 4: Try fetching tweet page and parsing HTML
      try {
        const tweetPageUrl = `https://twitter.com/i/web/status/${tweetId}`;
        const pageResponse = await fetch(tweetPageUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
        });

        if (pageResponse.ok) {
          const pageHtml = await pageResponse.text();

          // Look for video thumbnail patterns
          const patterns = [
            /https?:\/\/[^\s"<>]*video\.twimg\.com[^\s"<>]*\.(jpg|jpeg|png|webp)/i,
            /https?:\/\/[^\s"<>]*pbs\.twimg\.com[^\s"<>]*ext_tw_video[^\s"<>]*\.(jpg|jpeg|png|webp)/i,
            /https?:\/\/[^\s"<>]*pbs\.twimg\.com[^\s"<>]*media[^\s"<>]*\.(jpg|jpeg|png|webp)/i,
            /https?:\/\/[^\s"<>]*\.twimg\.com[^\s"<>]*\.(jpg|jpeg|png|webp)/i,
          ];

          for (const pattern of patterns) {
            const match = pageHtml.match(pattern);
            if (match) {
              thumbnailUrl = match[0];
              break;
            }
          }
        }
      } catch (e) {
        // Continue
      }
    }

    // Final fallback: Extract from oEmbed HTML
    if (!thumbnailUrl && data.html) {
      const patterns = [
        /https?:\/\/[^\s"<>]*video\.twimg\.com[^\s"<>]*\.(jpg|jpeg|png|webp)/i,
        /https?:\/\/[^\s"<>]*pbs\.twimg\.com[^\s"<>]*\.(jpg|jpeg|png|webp)/i,
        /https?:\/\/[^\s"<>]*\.twimg\.com[^\s"<>]*\.(jpg|jpeg|png|webp)/i,
      ];

      for (const pattern of patterns) {
        const match = data.html.match(pattern);
        if (match) {
          thumbnailUrl = match[0];
          break;
        }
      }
    }

    return NextResponse.json({
      ...data,
      thumbnailUrl,
    });
  } catch (error) {
    console.error('Error fetching Twitter oEmbed:', error);
    return NextResponse.json({ error: 'Failed to fetch tweet' }, { status: 500 });
  }
}
