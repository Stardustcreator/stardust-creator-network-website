'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Link from 'next/link';

const slides = [
  {
    image: '/creators/sign%20up.webp',
    title: 'Find vetted creators who fit your brand.',
    description: 'Share your brief and get a shortlist of African creators matched to your goals.',
  },
  {
    image: '/creators/sign%20up%202.webp',
    title: 'Get booked and paid properly.',
    description: 'Price your work, share a pro rate card and land brand deals in your niche.',
  },
  {
    image: '/creators/sign%20up%203.webp',
    title: 'Where brands and creators meet.',
    description: 'Brands find vetted African creators. Creators get booked and paid properly.',
  },
];

export default function SignupPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCreatorSignup = () => {
    router.push('/signin');
  };

  return (
    <>
      {/* =====================================================
          SIGNUP PAGE (Figma: SCN (For Uche) › Sign up)
          Left: image carousel panel (656 of 1440, full height)
          Right: role picker card, centred
      ===================================================== */}
      <main className="signup-page">
        {/* =================================================
            LEFT: IMAGE CAROUSEL
        ================================================= */}
        <div className="signup-carousel">
          <div className="carousel-window">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {slides.map((slide, index) => (
                <div
                  className="carousel-slide"
                  key={index}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="carousel-image"
                  />

                  {/* Purple gradient overlay */}
                  <div className="carousel-overlay" />

                  {/* Text */}
                  <div className="carousel-content">
                    <div className="carousel-dots">
                      {slides.map((_, dotIndex) => (
                        <button
                          key={dotIndex}
                          type="button"
                          aria-label={`Go to slide ${dotIndex + 1}`}
                          className={`carousel-dot ${currentSlide === dotIndex ? 'active' : ''}`}
                          onClick={() => setCurrentSlide(dotIndex)}
                        />
                      ))}
                    </div>

                    <h1>{slide.title}</h1>

                    <p>{slide.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =================================================
            RIGHT: ROLE PICKER
        ================================================= */}
        <section className="signup-panel">
          <div className="signup-card">
            {/* Logo */}
            <div className="signup-logo">
              <Link
                href="/"
                aria-label="Stardust Creator Network home"
              >
                <img
                  src="/logos/scn%20logo%20black.png"
                  alt="Stardust Creator Network"
                />
              </Link>
            </div>

            {/* Heading */}
            <div className="signup-heading">
              <h2>Pick your role to get started</h2>

              <p>Choose your account type so we can take you to the right dashboard.</p>
            </div>

            {/* Role cards */}
            <div className="role-list">
              {/* BRAND (brand registration is not live yet, so this stays inactive) */}
              <div
                className="role-card brand-card"
                aria-disabled="true"
              >
                <div className="role-copy">
                  <h3>I&apos;m a Brand</h3>

                  <p>Find trusted creators, launch campaigns and track results in one place.</p>
                </div>

                <div className="role-link-row">
                  <span className="role-link">
                    Register as a brand
                    <ArrowIcon />
                  </span>

                  <span className="coming-soon">Coming soon</span>
                </div>
              </div>

              {/* CREATOR */}
              <button
                type="button"
                className="role-card creator-card"
                onClick={handleCreatorSignup}
              >
                <div className="role-copy">
                  <h3>I&apos;m a Creator</h3>

                  <p>
                    Get matched with brands, manage your collabs and get paid, all in one place.
                  </p>
                </div>

                <span className="role-link">
                  Register as a creator
                  <ArrowIcon />
                </span>
              </button>
            </div>

            {/* Login */}
            <p className="login-text">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => router.push('/signin')}
              >
                Login
              </button>
            </p>
          </div>
        </section>
      </main>

      {/* =====================================================
          PAGE-SPECIFIC STYLES
          Values from the Figma file: card 656 wide, radius 24,
          border 1.5 #E7E5E4, padding 28/28/40, role cards 137 high
          with 1px #E9E5F0 border and radius 8, 12px apart.
      ===================================================== */}
      <style jsx>{`
        /* ================================================
           PAGE: two columns, full screen
        ================================================ */

        .signup-page {
          width: 100%;
          min-height: 100vh;
          min-height: 100dvh;

          display: grid;
          grid-template-columns: minmax(0, 656fr) minmax(0, 784fr);

          background: #ffffff;
        }

        /* ================================================
           LEFT CAROUSEL (unchanged, sized to the panel)
        ================================================ */

        .signup-carousel {
          width: 100%;
          min-width: 0;
        }

        .carousel-window {
          width: 100%;
          height: 100%;

          position: relative;
          overflow: hidden;

          border-radius: 0;

          background: #240044;
        }

        .carousel-track {
          width: 100%;
          height: 100%;

          display: flex;

          transition: transform 700ms cubic-bezier(0.77, 0, 0.175, 1);

          will-change: transform;
        }

        .carousel-slide {
          position: relative;

          flex: 0 0 100%;
          width: 100%;
          height: 100%;

          overflow: hidden;
        }

        .carousel-image {
          position: absolute;

          inset: 0;

          width: 100%;
          height: 100%;

          /*
            Keeps each image inside the carousel
            instead of stretching it across the page.
          */
          object-fit: cover;
          object-position: center;

          display: block;
        }

        /* Purple gradient exactly belongs to the image */
        .carousel-overlay {
          position: absolute;

          inset: 0;

          background: linear-gradient(
            to top,
            rgba(48, 0, 92, 0.98) 0%,
            rgba(72, 0, 130, 0.82) 28%,
            rgba(84, 0, 145, 0.22) 63%,
            rgba(60, 0, 110, 0) 100%
          );

          pointer-events: none;
        }

        /* ================================================
           CAROUSEL TEXT
        ================================================ */

        .carousel-content {
          position: absolute;

          left: 7%;
          right: 7%;
          bottom: 7%;

          z-index: 2;

          color: #ffffff;
        }

        .carousel-content h1 {
          margin: 0 0 14px;

          max-width: 600px;

          font-size: clamp(32px, 3.2vw, 58px);
          line-height: 1.05;
          font-weight: 600;
          letter-spacing: -0.04em;

          color: #ffffff;
        }

        .carousel-content p {
          margin: 0;

          max-width: 610px;

          font-size: clamp(15px, 1.15vw, 20px);
          line-height: 1.55;
          font-weight: 400;

          color: rgba(255, 255, 255, 0.96);
        }

        /* ================================================
           CAROUSEL DOTS
        ================================================ */

        .carousel-dots {
          display: flex;
          align-items: center;

          gap: 7px;

          margin-bottom: 28px;
        }

        .carousel-dot {
          appearance: none;
          border: 0;

          width: 7px;
          height: 7px;

          padding: 0;
          margin: 0;

          border-radius: 50%;

          background: rgba(255, 255, 255, 0.55);

          cursor: pointer;

          transition:
            width 200ms ease,
            background 200ms ease;
        }

        .carousel-dot.active {
          width: 24px;

          border-radius: 999px;

          background: #ffffff;
        }

        .signup-carousel {
          height: 100vh;
          height: 100dvh;

          position: sticky;
          top: 0;
        }

        /* ================================================
           RIGHT PANEL
        ================================================ */

        .signup-panel {
          min-width: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 48px 64px;

          background: #ffffff;
        }

        .signup-card {
          width: 100%;
          max-width: 656px;

          display: flex;
          flex-direction: column;

          padding: 28px 28px 40px;

          background: rgba(255, 255, 255, 0.92);

          border: 1.5px solid #e7e5e4;
          border-radius: 24px;

          box-shadow:
            0 4px 6px -2px rgba(0, 0, 0, 0.03),
            0 12px 16px -4px rgba(0, 0, 0, 0.08);

          box-sizing: border-box;
        }

        /* Logo: 160 x 57 */

        .signup-logo {
          display: flex;
          justify-content: center;

          margin-bottom: 48px;
        }

        .signup-logo img {
          display: block;

          width: 160px;
          height: auto;

          object-fit: contain;
        }

        /* Heading */

        .signup-heading {
          display: flex;
          flex-direction: column;

          gap: 4px;

          margin-bottom: 24px;
        }

        .signup-heading h2 {
          margin: 0;

          font-family:
            var(--font-instrument-sans, 'Instrument Sans'), 'Instrument Sans', sans-serif;
          font-size: 20px;
          line-height: 24px;
          font-weight: 500;
          letter-spacing: -0.7px;

          color: #1a002e;
        }

        .signup-heading p {
          margin: 0;

          font-family: var(--font-lato-su, 'Lato'), 'Lato', sans-serif;
          font-size: 16px;
          line-height: 24px;
          font-weight: 400;

          color: #737373;
        }

        /* Role cards */

        .role-list {
          display: flex;
          flex-direction: column;

          gap: 12px;
        }

        .role-card {
          appearance: none;

          width: 100%;
          min-height: 137px;

          display: flex;
          flex-direction: column;
          align-items: flex-start;

          gap: 14px;

          margin: 0;
          padding: 24px 24px 16px;

          background: #ffffff;

          border: 1px solid #e9e5f0;
          border-radius: 8px;

          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.06);

          font-family: var(--font-lato-su, 'Lato'), 'Lato', sans-serif;
          text-align: left;

          box-sizing: border-box;

          transition:
            border-color 200ms ease,
            box-shadow 200ms ease,
            transform 200ms ease;
        }

        .creator-card {
          cursor: pointer;
        }

        .creator-card:hover {
          border-color: #a51cff;

          box-shadow: 0 8px 24px rgba(120, 0, 255, 0.08);

          transform: translateY(-1px);
        }

        .brand-card {
          cursor: default;
        }

        .role-copy {
          display: flex;
          flex-direction: column;

          gap: 8px;
        }

        .role-card h3 {
          margin: 0;

          font-size: 16px;
          line-height: 24px;
          font-weight: 600;
          letter-spacing: -0.2px;

          color: #1a002e;
        }

        .role-card p {
          margin: 0;

          font-size: 14px;
          line-height: 20px;
          font-weight: 400;

          color: #737373;
        }

        .role-link {
          display: inline-flex;
          align-items: center;

          gap: 4px;

          font-size: 14px;
          line-height: 20px;
          font-weight: 600;

          color: #a51cff;
        }

        .role-link-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;

          gap: 10px;
        }

        .coming-soon {
          display: inline-flex;
          align-items: center;

          padding: 4px 10px;

          border-radius: 999px;

          background: #f0ddff;

          font-size: 12px;
          line-height: 16px;
          font-weight: 600;

          color: #7200c9;

          white-space: nowrap;
        }

        .brand-card .role-link {
          opacity: 0.75;
        }

        .role-link :global(svg) {
          transition: transform 200ms ease;
        }

        .creator-card:hover .role-link :global(svg) {
          transform: translateX(3px);
        }

        /* Login */

        .login-text {
          margin: 24px 0 0;

          font-family: var(--font-lato-su, 'Lato'), 'Lato', sans-serif;
          font-size: 14px;
          line-height: 17px;
          font-weight: 400;
          text-align: center;

          color: #737373;
        }

        .login-text button {
          appearance: none;

          padding: 0;

          border: 0;
          background: transparent;

          font: inherit;
          font-weight: 700;

          color: #57058b;

          text-decoration: underline;

          cursor: pointer;
        }

        .login-text button:hover {
          color: #7805c4;
        }

        /* ================================================
           MOBILE / SMALL TABLET: stack carousel above card
        ================================================ */

        @media (max-width: 800px) {
          .signup-page {
            display: flex;
            flex-direction: column;
          }

          .signup-carousel {
            position: relative;

            height: auto;
          }

          .carousel-window {
            height: auto;
            aspect-ratio: 612 / 790;
          }

          .carousel-content h1 {
            font-size: 34px;
          }

          .carousel-content p {
            font-size: 15px;
          }

          .signup-panel {
            padding: 32px 16px 40px;
          }

          .signup-card {
            padding: 24px 20px 32px;

            border-radius: 20px;
          }

          .signup-logo {
            margin-bottom: 32px;
          }
        }

        @media (max-width: 480px) {
          .carousel-content h1 {
            font-size: 29px;
          }

          .carousel-content p {
            font-size: 14px;
          }

          .carousel-dots {
            margin-bottom: 20px;
          }
        }
      `}</style>
    </>
  );
}

/* Arrow from the Figma role card link: 16px box, 1.47px stroke */
function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.33 8H12.67M8.67 4L12.67 8L8.67 12"
        stroke="#A51CFF"
        strokeWidth="1.47"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
