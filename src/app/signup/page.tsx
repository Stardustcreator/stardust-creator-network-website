'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

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
          EXISTING SITE HEADER
          DO NOT MODIFY
      ===================================================== */}
      <Header />

      {/* =====================================================
          SIGNUP PAGE
      ===================================================== */}
      <main className="signup-page">
        <section className="signup-container">
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
              RIGHT: ROLE SELECTION
          ================================================= */}
          <div className="signup-card">
            {/* Logo */}
            <div className="signup-logo">
              <img
                src="/logos/scn%20logo%20black.png"
                alt="Stardust Creator Network"
              />
            </div>

            {/* Heading */}
            <div className="signup-heading">
              <h2>Pick your role to get started</h2>

              <p>Choose your account type so we can take you to the right dashboard.</p>
            </div>

            {/* =================================================
                BRAND
            ================================================= */}
            <div className="role-card brand-card">
              <div className="role-card-content">
                <div className="role-card-top">
                  <h3>I'm a Brand</h3>

                  <span className="coming-soon">Coming soon</span>
                </div>

                <p>Find trusted creators, launch campaigns and track results in one place.</p>

                <button
                  type="button"
                  className="role-link disabled"
                  disabled
                >
                  Register as a brand
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* =================================================
                CREATOR
            ================================================= */}
            <button
              type="button"
              className="role-card creator-card"
              onClick={handleCreatorSignup}
            >
              <div className="role-card-content">
                <h3>I'm a Creator</h3>

                <p>Get matched with brands, manage your collabs and get paid, all in one place.</p>

                <span className="role-link">
                  Register as a creator
                  <span>→</span>
                </span>
              </div>
            </button>

            {/* Login */}
            <div className="login-text">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => router.push('/signin')}
              >
                Login
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================
          EXISTING SITE FOOTER
          DO NOT MODIFY
      ===================================================== */}
      <Footer />

      {/* =====================================================
          PAGE-SPECIFIC STYLES ONLY
      ===================================================== */}
      <style jsx>{`
        /* ================================================
           PAGE WRAPPER
        ================================================ */

        .signup-page {
          width: 100%;
          background: #ffffff;

          /*
            IMPORTANT:
            Space below the existing Header and above
            the existing Footer.
          */
          padding: 72px 0 96px;
        }

        /* ================================================
           MAIN CONTENT CONTAINER
        ================================================ */

        .signup-container {
          width: 80%;
          max-width: 1440px;
          margin: 0 auto;

          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(0, 1fr);

          align-items: center;
          gap: 48px;
        }

        /* ================================================
           LEFT CAROUSEL
        ================================================ */

        .signup-carousel {
          width: 100%;
          min-width: 0;
        }

        .carousel-window {
          width: 100%;
          aspect-ratio: 612 / 790;

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

        /* ================================================
           RIGHT CARD
        ================================================ */

        .signup-card {
          width: 100%;

          background: #ffffff;

          border: 1px solid #dedede;

          border-radius: 26px;

          padding: 58px 46px 46px;

          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);

          box-sizing: border-box;
        }

        /* ================================================
           LOGO
        ================================================ */

        .signup-logo {
          width: 100%;

          display: flex;
          justify-content: center;
          align-items: center;

          margin-bottom: 54px;
        }

        .signup-logo img {
          width: 205px;
          height: auto;

          display: block;

          object-fit: contain;
        }

        /* ================================================
           HEADING
        ================================================ */

        .signup-heading {
          margin-bottom: 30px;
        }

        .signup-heading h2 {
          margin: 0 0 8px;

          color: #120022;

          font-size: clamp(25px, 2vw, 34px);
          line-height: 1.2;

          font-weight: 500;
          letter-spacing: -0.03em;
        }

        .signup-heading p {
          margin: 0;

          color: #6b6b6b;

          font-size: 17px;
          line-height: 1.5;
        }

        /* ================================================
           ROLE CARDS
        ================================================ */

        .role-card {
          width: 100%;

          box-sizing: border-box;

          border: 1px solid #dfdce3;

          border-radius: 10px;

          background: #ffffff;

          text-align: left;

          margin: 0 0 16px;

          padding: 32px 34px;

          display: block;

          transition:
            border-color 200ms ease,
            box-shadow 200ms ease,
            transform 200ms ease;
        }

        .creator-card {
          appearance: none;

          font-family: inherit;

          cursor: pointer;
        }

        .creator-card:hover {
          border-color: #b528ff;

          box-shadow: 0 8px 24px rgba(120, 0, 255, 0.08);

          transform: translateY(-1px);
        }

        .brand-card {
          cursor: default;
        }

        .role-card-content {
          width: 100%;
        }

        .role-card-top {
          display: flex;

          align-items: center;
          justify-content: space-between;

          gap: 20px;
        }

        .role-card h3 {
          margin: 0 0 12px;

          color: #160027;

          font-size: 19px;
          line-height: 1.3;

          font-weight: 500;
        }

        .role-card-top h3 {
          margin-bottom: 0;
        }

        .role-card p {
          margin: 0 0 22px;

          color: #707070;

          font-size: 16px;
          line-height: 1.55;
        }

        /* ================================================
           COMING SOON
        ================================================ */

        .coming-soon {
          flex-shrink: 0;

          padding: 7px 14px;

          border-radius: 999px;

          background: #f0ddff;

          color: #7200c9;

          font-size: 12px;
          line-height: 1;

          font-weight: 600;

          white-space: nowrap;
        }

        /* ================================================
           REGISTER LINK
        ================================================ */

        .role-link {
          display: inline-flex;

          align-items: center;

          gap: 13px;

          color: #a900ff;

          font-size: 16px;
          line-height: 1.3;

          font-weight: 500;

          text-decoration: none;
        }

        .role-link span {
          font-size: 22px;
          line-height: 1;

          transition: transform 200ms ease;
        }

        .creator-card:hover .role-link span {
          transform: translateX(4px);
        }

        .role-link.disabled {
          border: 0;

          background: transparent;

          padding: 0;

          cursor: not-allowed;

          opacity: 0.75;
        }

        /* ================================================
           LOGIN
        ================================================ */

        .login-text {
          width: 100%;

          margin-top: 30px;

          text-align: center;

          color: #777777;

          font-size: 15px;
          line-height: 1.5;
        }

        .login-text button {
          appearance: none;

          border: 0;

          padding: 0;

          background: transparent;

          color: #7000ff;

          font: inherit;

          text-decoration: underline;

          text-underline-offset: 3px;

          cursor: pointer;
        }

        .login-text button:hover {
          color: #4f00b8;
        }

        /* ================================================
           TABLET
        ================================================ */

        @media (max-width: 1100px) {
          .signup-container {
            width: 88%;

            gap: 30px;
          }

          .signup-card {
            padding: 46px 34px 38px;
          }

          .signup-logo {
            margin-bottom: 42px;
          }

          .signup-logo img {
            width: 180px;
          }

          .role-card {
            padding: 28px;
          }
        }

        /* ================================================
           MOBILE
        ================================================ */

        @media (max-width: 800px) {
          .signup-page {
            padding: 40px 0 64px;
          }

          .signup-container {
            width: 92%;

            display: flex;
            flex-direction: column;

            gap: 32px;
          }

          .signup-carousel {
            width: 100%;
          }

          .carousel-window {
            aspect-ratio: 612 / 790;
          }

          .carousel-content {
            left: 7%;
            right: 7%;
            bottom: 7%;
          }

          .carousel-content h1 {
            font-size: 34px;
          }

          .carousel-content p {
            font-size: 15px;
          }

          .signup-card {
            width: 100%;

            padding: 40px 24px 32px;

            border-radius: 20px;
          }

          .signup-logo {
            margin-bottom: 38px;
          }

          .signup-logo img {
            width: 175px;
          }

          .signup-heading h2 {
            font-size: 27px;
          }

          .signup-heading p {
            font-size: 15px;
          }

          .role-card {
            padding: 26px 22px;
          }

          .role-card-top {
            align-items: flex-start;
            flex-direction: column;

            gap: 12px;
          }

          .role-card-top h3 {
            margin-bottom: 0;
          }
        }

        /* ================================================
           SMALL MOBILE
        ================================================ */

        @media (max-width: 480px) {
          .signup-container {
            width: 94%;
          }

          .carousel-content h1 {
            font-size: 29px;
          }

          .carousel-content p {
            font-size: 14px;
          }

          .carousel-dots {
            margin-bottom: 20px;
          }

          .signup-card {
            padding: 34px 20px 28px;
          }

          .role-card {
            padding: 24px 20px;
          }
        }
      `}</style>
    </>
  );
}
