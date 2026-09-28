import Link from 'next/link';

interface CreatorOsFinalCtaProps {
  title?: string;
}

const DEFAULT_TITLE = 'Ready to build something that lasts?';

export default function CreatorOsFinalCta({ title = DEFAULT_TITLE }: CreatorOsFinalCtaProps) {
  return (
    <section
      className="w-full py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 text-center"
      style={{ backgroundColor: '#FAFAF9' }}
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="font-bricolage-grotesque text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-black leading-tight">
          {title}
        </h2>

        <p className="text-sm sm:text-base md:text-lg leading-relaxed font-lato text-gray-700 mb-6 sm:mb-8 md:mb-10">
          Whether you're just starting out or already building an audience, SCN gives you the
          community, the education, and the opportunities to run your content like a real business.
        </p>

        <Link href="/signin">
          <button
            className="px-5 sm:px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:opacity-90 transition-all text-sm sm:text-base"
            style={{ backgroundColor: '#57058B', color: 'white' }}
          >
            Sign Up Now
          </button>
        </Link>
      </div>
    </section>
  );
}
