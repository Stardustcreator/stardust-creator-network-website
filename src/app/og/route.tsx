import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { site } from '@/lib/seo';

export const runtime = 'edge';

const interRegular = fetch(
  new URL('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap')
).then(res => res.arrayBuffer());

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract parameters from URL
    const title = searchParams.get('title') || site.name;
    const subtitle = searchParams.get('subtitle') || site.defaultDescription;
    const type = searchParams.get('type') || 'default'; // 'blog', 'page', 'default'
    const author = searchParams.get('author');
    const date = searchParams.get('date');

    // Load the font
    const fontRegular = await interRegular;

    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Inter',
            position: 'relative',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), 
                          radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
            }}
          />

          {/* Content Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '90%',
              maxWidth: '1000px',
              textAlign: 'center',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Site Badge */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50px',
                padding: '12px 24px',
                marginBottom: '40px',
                display: 'flex',
                alignItems: 'center',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span
                style={{
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                }}
              >
                {site.name}
              </span>
            </div>

            {/* Main Title */}
            <h1
              style={{
                color: 'white',
                fontSize: title.length > 50 ? '48px' : '64px',
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: '24px',
                maxWidth: '90%',
                wordBreak: 'break-word',
              }}
            >
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '24px',
                  fontWeight: 400,
                  lineHeight: 1.4,
                  marginBottom: author || date ? '32px' : '0',
                  maxWidth: '80%',
                }}
              >
                {subtitle}
              </p>
            )}

            {/* Author and Date */}
            {(author || date) && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginTop: '32px',
                }}
              >
                {author && (
                  <span
                    style={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '18px',
                      fontWeight: 500,
                    }}
                  >
                    By {author}
                  </span>
                )}
                {author && date && (
                  <span
                    style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '18px',
                    }}
                  >
                    •
                  </span>
                )}
                {date && (
                  <span
                    style={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '18px',
                      fontWeight: 500,
                    }}
                  >
                    {date}
                  </span>
                )}
              </div>
            )}

            {/* Type Badge */}
            {type !== 'default' && (
              <div
                style={{
                  position: 'absolute',
                  top: '40px',
                  right: '40px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <span
                  style={{
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  {type}
                </span>
              </div>
            )}
          </div>

          {/* Bottom Brand */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            {/* Logo placeholder - you can add your actual logo here */}
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: 700,
                }}
              >
                S
              </span>
            </div>
            <span
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '16px',
                fontWeight: 500,
              }}
            >
              {site.name}
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontRegular,
            style: 'normal',
            weight: 400,
          },
        ],
      }
    );
  } catch (e) {
    console.error('Error generating OG image:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
