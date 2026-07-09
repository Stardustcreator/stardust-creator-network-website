'use client';
import { useRouter } from 'next/navigation';

export default function FinalCTASection() {
  const router = useRouter();

  const handleSignUp = () => {
    router.push('/onboarding');
  };

  return (
    <section
      className="w-full py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 text-center"
      style={{ backgroundColor: '#FAFAF9' }}
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-black leading-tight"
          style={{
            fontFamily: 'var(--font-bricolage-grotesque)',
            letterSpacing: '-0.02em',
          }}
        >
          Start Building the Creator Business You Deserve.
        </h2>

        <p
          className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-600 mb-6 sm:mb-8 md:mb-10"
          style={{
            fontFamily: 'var(--font-lato)',
          }}
        >
          Whether you are just starting out or already building an audience, SCN gives you the
          community, the education, the tools, and the opportunities to accelerate your creator
          journey and build something that lasts.
        </p>

        <button
          className="px-5 sm:px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:opacity-90 transition-all text-sm sm:text-base"
          style={{ backgroundColor: '#57058B', color: 'white' }}
          onClick={() => {
            handleSignUp();
            // document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Sign Up Now
        </button>
      </div>
    </section>
  );
}
