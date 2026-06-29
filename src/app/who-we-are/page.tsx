import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

export default function WhoWeArePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <section className="relative w-full h-screen min-h-[500px] sm:min-h-[600px] flex items-center justify-center overflow-hidden">
          <Image
            src="/who we are/Hero.webp"
            alt="Who We Are Hero"
            fill
            priority
            className="object-cover object-center"
            quality={90}
          />

          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(87, 5, 139, 0.15)' }}
          />

          <div className="relative z-10 px-4 py-12 sm:py-16 md:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="font-bricolage-grotesque text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 text-white leading-tight">
                We Built the Infrastructure Creators Deserved but Never Had
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 md:mb-10 leading-relaxed font-lato">
                Stardust Creator Network is the operating system for African creators - the tools,
                the community, and the education you need to turn your content into a real,
                sustainable business.
              </p>

              <Link href="/creators/join">
                <button
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:opacity-90 transition-all text-sm sm:text-base"
                  style={{ backgroundColor: '#57058B', color: 'white' }}
                >
                  Join the Network
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="hidden sm:inline"
                  >
                    <path
                      d="M4 10H16M16 10L11 5M16 10L11 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
              <div className="order-2 md:order-1">
                <div
                  className="relative w-full overflow-hidden rounded-lg shadow-lg"
                  style={{ aspectRatio: '635/542' }}
                >
                  <Image
                    src="/who we are/about us.webp"
                    alt="About Us"
                    fill
                    className="object-cover"
                    quality={90}
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              <div className="order-1 md:order-2">
                <h2 className="font-bricolage-grotesque text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-black">
                  About Us
                </h2>

                <div className="space-y-4 sm:space-y-6 text-gray-700">
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed font-lato">
                    There is no shortage of creators in Nigeria. But creating consistently and
                    actually building a sustainable income from your content are two very different
                    things, and most creators are stuck somewhere in between.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg leading-relaxed font-lato">
                    The gap is not always the content. Most of the time, it is the structure around
                    it - not knowing what to charge, not having a system for invoicing, not
                    understanding usage rights, not having a way to connect with brands that are
                    ready to pay, and not having a community of serious people around you who
                    understand the journey. That is what keeps talented creators underpaid,
                    overwhelmed, and building for everyone else but themselves.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg leading-relaxed font-lato">
                    SCN was built to close that specific gap; to give you the tools, the knowledge,
                    and the community to turn what you already create into a business that actually
                    pays you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem We Are Solving Section */}
        <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-start">
              <div className="order-1">
                <h2 className="font-bricolage-grotesque text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-black">
                  The problem we are solving
                </h2>

                <div className="space-y-3 sm:space-y-4 text-gray-700">
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed font-lato">
                    Many Nigerian creators are creating consistently without building consistently.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg leading-relaxed font-lato">
                    They are pricing by guesswork because nobody gave them a formula.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg leading-relaxed font-lato">
                    They are closing brand deals over DMs with no contract, no clear deliverables,
                    and no usage rights conversation.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg leading-relaxed font-lato">
                    They are delivering content and handing over rights they did not even know had a
                    price.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg leading-relaxed font-lato">
                    They are learning alone, making mistakes that a structured community could have
                    helped them avoid.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg leading-relaxed font-lato">
                    And they are showing up every single day without a system that compounds their
                    effort into real, predictable income.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg leading-relaxed font-lato">
                    SCN is built to solve exactly that: the pricing, the structure, the brand
                    access, the community, and the business infrastructure that turns a creator into
                    a creative business owner.
                  </p>
                </div>
              </div>

              <div className="order-2">
                <div
                  className="relative w-full overflow-hidden rounded-lg shadow-lg"
                  style={{ aspectRatio: '4/3' }}
                >
                  <Image
                    src="/who we are/problem.webp"
                    alt="The Problem We Are Solving"
                    fill
                    className="object-cover"
                    quality={90}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Are Building Section */}
        <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-stretch">
              <div className="order-1 h-full">
                <div className="relative w-full h-full overflow-hidden rounded-lg shadow-lg min-h-[300px] sm:min-h-[400px]">
                  <Image
                    src="/who we are/full-length-portrait-lovely-afro-american-woman.webp"
                    alt="What we are building"
                    fill
                    className="object-cover"
                    quality={90}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              <div className="order-2">
                <h2 className="font-bricolage-grotesque text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-black">
                  What we are building
                </h2>

                <div className="space-y-3 sm:space-y-4 text-gray-700">
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed font-lato">
                    We are building an operating system for the African creator economy, starting in
                    Nigeria.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg leading-relaxed font-lato">
                    A rate card calculator that helps you arrive at a defensible rate for every
                    campaign based on your deliverables, usage rights, niche, and platform.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg leading-relaxed font-lato">
                    A professional invoicing tool so you get paid properly and on time.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg leading-relaxed font-lato">
                    A storefront where brands can find you, see your work, and book your UGC
                    services without the unnecessary back and forth.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg leading-relaxed font-lato">
                    An audience builder that turns every profile visit into an email subscriber you
                    own regardless of what any algorithm decides.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg leading-relaxed font-lato">
                    A brand desk that connects vetted creators to campaigns from brands that are
                    actively looking and ready to pay.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg leading-relaxed font-lato">
                    And a community where serious creators come to learn from each other, access
                    live clinics and resources, and build with people who are moving in the same
                    direction.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg leading-relaxed font-lato">
                    This is not a bundle of separate tools. It is one connected platform where every
                    part of your creator business lives together, grows together, and works for you.
                  </p>

                  <div className="mt-6 sm:mt-8">
                    <button
                      className="px-5 sm:px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:opacity-90 transition-all text-sm sm:text-base"
                      style={{ backgroundColor: '#57058B', color: 'white' }}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section
          className="w-full py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 text-center"
          style={{ backgroundColor: '#FAFAF9' }}
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="font-bricolage-grotesque text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-black leading-tight">
              Start Building the Creator Business That Actually Sustains You
            </h2>

            <p className="text-sm sm:text-base md:text-lg leading-relaxed font-lato text-gray-700 mb-6 sm:mb-8 md:mb-10">
              Whether you are just starting out or already creating consistently without seeing the
              financial results you deserve, SCN gives you the tools, the community, and the
              knowledge to bridge that gap. You have put in the work. Now let's build the business
              around it.
            </p>

            <button
              className="px-5 sm:px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:opacity-90 transition-all text-sm sm:text-base"
              style={{ backgroundColor: '#57058B', color: 'white' }}
            >
              Sign Up Now
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
