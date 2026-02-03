import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Heading } from '@/components/typography';
import { caseStudies } from '@/lib/data/case-studies.data';
import YouTubeEmbed from '@/components/shared/YouTubeEmbed';
import TwitterEmbed from '@/components/shared/TwitterEmbed';
import InstagramEmbed from '@/components/shared/InstagramEmbed';

interface CaseStudyDetailProps {
  slug: string;
}

function CaseStudyDetail({ slug }: CaseStudyDetailProps) {
  const caseStudy = caseStudies.find(cs => cs.id === slug);

  if (!caseStudy) {
    notFound();
  }

  // Check if this is the always-on case study (no images required)
  const isAlwaysOnCaseStudy = caseStudy.id === 'honeywell-always-on-influencer-marketing';
  const isLeadwayCaseStudy = caseStudy.id === 'leadway-travel-insurance-campaign';
  const isNoLoseGuardCaseStudy = caseStudy.id === 'leadway-no-lose-guard-campaign';
  const isAxaAutoflexCaseStudy = caseStudy.id === 'axa-mansard-autoflex-campaign';
  const isCleamaxCaseStudy = caseStudy.id === 'cleamax-campaign';
  const isSoFreshCaseStudy = caseStudy.id === 'so-fresh-salad-campaign';

  // Ensure we have required data (only check images for case studies that require them)
  if (
    !isAlwaysOnCaseStudy &&
    !isLeadwayCaseStudy &&
    !isNoLoseGuardCaseStudy &&
    !isAxaAutoflexCaseStudy &&
    !isCleamaxCaseStudy &&
    !isSoFreshCaseStudy &&
    (!caseStudy.images || caseStudy.images.length === 0)
  ) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-white text-2xl mb-4">Case Study Data Error</h1>
        <p className="text-white/80">Images are missing for this case study.</p>
      </div>
    );
  }

  return (
    <>
      {/* Header Section */}
      <section className="bg-gradient-to-br from-purple-900/20 via-black to-black border-b border-white/10 pt-32 md:pt-40 lg:pt-48 pb-8 md:pb-12 lg:pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="max-w-4xl">
            <Heading
              level={1}
              variant="gradient"
              className="mb-3 md:mb-4 text-3xl sm:text-4xl md:text-5xl leading-tight"
            >
              {caseStudy.title}
            </Heading>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 md:py-12 bg-black">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
            {/* Campaign Overview - Standard layout */}
            {isNoLoseGuardCaseStudy ? (
              <>
                {/* The Problem Section */}
                <section className="mt-8 space-y-4">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-white font-semibold">
                    The Problem
                  </h2>
                  <p className="text-white/80 leading-relaxed text-base md:text-lg">
                    In a world where people act as though they have everything figured out, people
                    believe they can manage uncertainties when they arise. However, in reality, they
                    rarely have concrete plans in place and often rely on their friends and family
                    to get through challenging times. Leadway recognized this problem and chose to
                    solve it.
                  </p>
                </section>

                {/* Our Solution Section */}
                <section className="pt-8 md:pt-12 mt-8 md:mt-12 space-y-6">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-white font-semibold">
                    Our Solution
                  </h2>
                  <p className="text-white/80 leading-relaxed text-base md:text-lg">
                    We developed a 360 marketing campaign with the creative idea &apos;No
                    Looseguard&apos; letting the audience know that life can come at them at anytime
                    and should prepare ahead instead of waiting for these unfortunate events to
                    strike causing them financial losses.
                  </p>

                  {/* YouTube Videos */}
                  <div className="space-y-6 mt-8">
                    <YouTubeEmbed
                      videoId="https://www.youtube.com/watch?v=fr9yh0vtZ2Q"
                      title="No Looseguard Campaign Video 1"
                      className="w-full"
                    />
                    <YouTubeEmbed
                      videoId="https://youtu.be/0pO31atWgYw?si=t1f7w_SldG45O0GC"
                      title="No Looseguard Campaign Video 2"
                      className="w-full"
                    />
                  </div>
                </section>

                {/* The Results Section */}
                <section className="pt-8 md:pt-12 mt-8 md:mt-12 space-y-4 border-t border-white/10">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-white font-semibold">
                    The Results
                  </h2>
                  <p className="text-white/80 leading-relaxed text-base md:text-lg">
                    The &apos;No Looseguard&apos; campaign has successfully ignited a vital
                    conversation about preparedness in the face of life&apos;s uncertainties. With
                    millions of impressions and widespread online discussion, the campaign is
                    clearly resonating with audiences and effectively raising awareness about the
                    importance of planning ahead with Leadway.
                  </p>

                  {/* Campaign Metrics */}
                  {caseStudy.metrics && (
                    <div className="mt-8 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6 md:p-8 space-y-4 shadow-lg shadow-purple-500/10">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {caseStudy.metrics.impressionShare && (
                          <div className="text-center md:text-left">
                            <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                              {caseStudy.metrics.impressionShare}
                            </div>
                            <div className="text-white/70 text-sm md:text-base">
                              Impression Share
                            </div>
                          </div>
                        )}
                        {caseStudy.metrics.costPerAcquisition && (
                          <div className="text-center md:text-left">
                            <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                              {caseStudy.metrics.costPerAcquisition}
                            </div>
                            <div className="text-white/70 text-sm md:text-base">
                              Cost Per Acquisition
                            </div>
                          </div>
                        )}
                        {caseStudy.metrics.returnOnAdSpend && (
                          <div className="text-center md:text-left">
                            <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                              {caseStudy.metrics.returnOnAdSpend}
                            </div>
                            <div className="text-white/70 text-sm md:text-base">ROAS</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </section>
              </>
            ) : isAxaAutoflexCaseStudy ? (
              <>
                {/* Campaign Overview Section */}
                <section className="mt-8 space-y-4">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-white font-semibold">
                    Campaign Overview
                  </h2>
                  <p className="text-white/80 leading-relaxed text-base md:text-lg mb-6">
                    AXA Mansard is a one-stop, non-banking financial services platform for health,
                    life, motor, travel, health insurance and investment.
                  </p>
                  <p className="text-white/80 leading-relaxed text-base md:text-lg mb-6">
                    The client reached out to us to help promote a variation of its comprehensive
                    motor insurance aimed at providing flexibility to vehicle owners who are price
                    sensitive but still need to have comprehensive insurance.
                  </p>

                  {/* The Goal */}
                  <div className="mt-6">
                    <h3 className="text-xl md:text-2xl text-white font-semibold mb-4">
                      The Goal was to:
                    </h3>
                    <ul className="space-y-3 text-white/80 leading-relaxed text-base md:text-lg">
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-3 mt-1">•</span>
                        <span>Increase Website Traffic</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-3 mt-1">•</span>
                        <span>Generate Leads</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-3 mt-1">•</span>
                        <span>Increase Social Media Engagement</span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Our Strategy Section */}
                <section className="pt-8 md:pt-12 mt-8 md:mt-12 space-y-6">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-white font-semibold">
                    Our Strategy
                  </h2>
                  <p className="text-white/80 leading-relaxed text-base md:text-lg">
                    We developed{' '}
                    <span className="text-purple-400 font-semibold">#ChooseWhatMatters</span> as the
                    theme for our awareness and lead generation campaign for AutoFlex. The reason
                    behind the theme was to portray AutoFlex for what it was, which is a flexible
                    auto insurance plan that allows vehicle owners to select only the insurance
                    coverages and benefits that are important to them along with the mandatory
                    third-party coverage.
                  </p>
                  <p className="text-white/80 leading-relaxed text-base md:text-lg">
                    We knew we were also targeting a young demographic who are digital natives and
                    price sensitive, so our strategy was to reach, engage and convert them through:
                  </p>
                  <ul className="space-y-3 text-white/80 leading-relaxed text-base md:text-lg mt-4">
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-3 mt-1">•</span>
                      <span>
                        <strong className="text-white">Gamification:</strong> Owambe Driver
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-3 mt-1">•</span>
                      <span>
                        <strong className="text-white">Authentic Engaging Content:</strong> Autoflex
                        Video Skit
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-3 mt-1">•</span>
                      <span>
                        <strong className="text-white">Banner and Motion Graphic Ads</strong>
                      </span>
                    </li>
                  </ul>
                </section>

                {/* Influencer Marketing Section */}
                <section className="pt-8 md:pt-12 mt-8 md:mt-12 space-y-6 border-t border-white/10">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-white font-semibold">
                    Influencer Marketing
                  </h2>
                  <p className="text-white/80 leading-relaxed text-base md:text-lg">
                    To help increase awareness and better educate the audience, a video skit was
                    developed to pass the message in an authentic, fun and relatable way to increase
                    chances of generating leads.
                  </p>
                  <p className="text-white/80 leading-relaxed text-base md:text-lg">
                    <strong className="text-white">Timini Egbuson</strong> was the influencer
                    engaged to star in the video. The video discussed the essence of the product and
                    showed a quick demo of how users can purchase an AutoFlex plan.
                  </p>
                  <p className="text-white/80 leading-relaxed text-base md:text-lg">
                    This video was deployed across Facebook and Instagram to generate leads. On
                    Twitter, the video was used to direct traffic to the website.
                  </p>

                  {/* Twitter Video Embed */}
                  <div className="mt-8">
                    <TwitterEmbed
                      tweetUrl="https://x.com/AXAMansard/status/1358775318430027777?s=20"
                      className="w-full"
                    />
                  </div>
                </section>

                {/* Campaign Metrics Section */}
                {caseStudy.metrics && (
                  <section className="pt-8 md:pt-12 mt-8 md:mt-12 space-y-4 border-t border-white/10">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-white font-semibold">
                      Campaign Results
                    </h2>
                    <div className="bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6 md:p-8 space-y-4 shadow-lg shadow-purple-500/10">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {caseStudy.metrics.impressionShare && (
                          <div className="text-center md:text-left">
                            <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                              {caseStudy.metrics.impressionShare}
                            </div>
                            <div className="text-white/70 text-sm md:text-base">
                              Impression Share
                            </div>
                          </div>
                        )}
                        {caseStudy.metrics.costPerAcquisition && (
                          <div className="text-center md:text-left">
                            <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                              {caseStudy.metrics.costPerAcquisition}
                            </div>
                            <div className="text-white/70 text-sm md:text-base">
                              Cost Per Acquisition
                            </div>
                          </div>
                        )}
                        {caseStudy.metrics.returnOnAdSpend && (
                          <div className="text-center md:text-left">
                            <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                              {caseStudy.metrics.returnOnAdSpend}
                            </div>
                            <div className="text-white/70 text-sm md:text-base">ROAS</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                )}
              </>
            ) : isCleamaxCaseStudy ? (
              <>
                {/* Campaign Overview Section */}
                <section className="mt-8 space-y-4">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-white font-semibold">
                    Campaign Overview
                  </h2>
                  <p className="text-white/80 leading-relaxed text-base md:text-lg">
                    Cleamax Industries Limited is a manufacturer of great quality, high performing
                    cleaning products, including the Cleanmax moisturizing anti-bacterial handwash,
                    dishwash liquid, scouring powder and anti-bacterial no-rinse cleaner.
                  </p>
                  <p className="text-white/80 leading-relaxed text-base md:text-lg">
                    The brief was for Intense to grow product awareness, customer base, and drive
                    sales.
                  </p>
                </section>

                {/* Our Approach Section */}
                <section className="pt-8 md:pt-12 mt-8 md:mt-12 space-y-6 border-t border-white/10">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-white font-semibold">
                    Our Approach
                  </h2>
                  <p className="text-white/80 leading-relaxed text-base md:text-lg">
                    To achieve the set objectives, we employed a number of tactics which included a
                    TVC, digital Ads and Influencer marketing all in a bid to drive awareness and
                    conversions.
                  </p>

                  {/* Instagram Embed */}
                  <div className="mt-8">
                    <InstagramEmbed
                      postUrl="https://www.instagram.com/p/B39vNXXFViR/"
                      className="w-full"
                    />
                  </div>
                </section>

                {/* Campaign Metrics Section */}
                {caseStudy.metrics && (
                  <section className="pt-8 md:pt-12 mt-8 md:mt-12 space-y-4 border-t border-white/10">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-white font-semibold">
                      Campaign Results
                    </h2>
                    <div className="bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6 md:p-8 space-y-4 shadow-lg shadow-purple-500/10">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {caseStudy.metrics.impressionShare && (
                          <div className="text-center md:text-left">
                            <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                              {caseStudy.metrics.impressionShare}
                            </div>
                            <div className="text-white/70 text-sm md:text-base">
                              Impression Share
                            </div>
                          </div>
                        )}
                        {caseStudy.metrics.costPerAcquisition && (
                          <div className="text-center md:text-left">
                            <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                              {caseStudy.metrics.costPerAcquisition}
                            </div>
                            <div className="text-white/70 text-sm md:text-base">
                              Cost Per Acquisition
                            </div>
                          </div>
                        )}
                        {caseStudy.metrics.returnOnAdSpend && (
                          <div className="text-center md:text-left">
                            <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                              {caseStudy.metrics.returnOnAdSpend}
                            </div>
                            <div className="text-white/70 text-sm md:text-base">ROAS</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                )}
              </>
            ) : isLeadwayCaseStudy ? (
              <section className="mt-8 space-y-4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-white font-semibold">
                  Campaign Overview
                </h2>
                <p className="text-white/80 leading-relaxed text-base md:text-lg">
                  Young Nigerians traveling abroad lacked travel insurance awareness, viewing it as
                  unnecessary expense. Leadway needed to educate this demographic while positioning
                  themselves as the accessible, trusted choice for protection.
                </p>
              </section>
            ) : isSoFreshCaseStudy ? (
              <>
                <section className="mt-8 space-y-4">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-white font-semibold">
                    Campaign Overview
                  </h2>
                  <p className="text-white/80 leading-relaxed text-base md:text-lg">
                    The Salad Launch Campaign was designed to scale awareness and drive measurable
                    actions for So Fresh&apos;s salad offerings. While previous efforts leaned
                    heavily toward traffic and awareness, this campaign introduced a stronger
                    conversion-focused strategy to validate demand and optimize performance across
                    platforms.
                  </p>
                  <p className="text-white/80 leading-relaxed text-base md:text-lg">
                    The campaign ran alongside influencer collaborations and third-party media
                    placements to reinforce credibility and reach health-conscious audiences.
                  </p>
                </section>

                <section className="pt-8 md:pt-12 mt-8 md:mt-12 space-y-6">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-white font-semibold">
                    Strategy & Execution
                  </h2>
                  <p className="text-white/80 leading-relaxed text-base md:text-lg">
                    The campaign combined paid media, creator marketing, and content distribution
                    into a unified growth strategy. Key execution pillars included:
                  </p>

                  {/* Instagram Reel Embed - First Video */}
                  <div className="mt-8 mb-8 max-w-2xl mx-auto">
                    <a
                      href="https://www.instagram.com/reels/Cpx174zJjy1/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group relative overflow-hidden rounded-xl"
                    >
                      <Image
                        src="/case-studies/so fresh image.webp"
                        alt="So Fresh Campaign Instagram Reel"
                        width={800}
                        height={350}
                        className="w-full h-auto object-cover"
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 group-hover:bg-white transition-all duration-300 flex items-center justify-center shadow-lg">
                          <svg
                            className="w-8 h-8 sm:w-10 sm:h-10 text-black ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      {/* Instagram Badge */}
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Instagram Reel
                      </div>
                    </a>
                  </div>

                  {/* Instagram Post Embed - Second Video */}
                  <div className="mt-8 mb-8 max-w-2xl mx-auto">
                    <a
                      href="https://www.instagram.com/p/CouyMaaL2OJ/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group relative overflow-hidden rounded-xl"
                    >
                      <Image
                        src="/case-studies/so fresh image 2.webp"
                        alt="So Fresh Campaign Instagram Post"
                        width={800}
                        height={280}
                        className="w-full h-auto object-cover"
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 group-hover:bg-white transition-all duration-300 flex items-center justify-center shadow-lg">
                          <svg
                            className="w-8 h-8 sm:w-10 sm:h-10 text-black ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      {/* Instagram Badge */}
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Instagram Post
                      </div>
                    </a>
                  </div>

                  {/* Instagram Post Embed - Third Video */}
                  <div className="mt-8 mb-8 max-w-2xl mx-auto">
                    <a
                      href="https://www.instagram.com/p/CqH7FxVIBCq/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group relative overflow-hidden rounded-xl"
                    >
                      <Image
                        src="/case-studies/SO FRESH 3.webp"
                        alt="So Fresh Campaign Instagram Post"
                        width={800}
                        height={280}
                        className="w-full h-auto object-cover"
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 group-hover:bg-white transition-all duration-300 flex items-center justify-center shadow-lg">
                          <svg
                            className="w-8 h-8 sm:w-10 sm:h-10 text-black ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      {/* Instagram Badge */}
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Instagram Post
                      </div>
                    </a>
                  </div>

                  <ul className="list-disc list-inside space-y-3 text-white/80">
                    <li className="leading-relaxed text-base md:text-lg">
                      A shift from awareness-heavy campaigns to conversion-optimized paid media
                    </li>
                    <li className="leading-relaxed text-base md:text-lg">
                      Platform-specific creative adaptation for Facebook, Instagram, Google Display,
                      and YouTube
                    </li>
                    <li className="leading-relaxed text-base md:text-lg">
                      Strategic influencer selection within health, nutrition, and lifestyle niches
                    </li>
                    <li className="leading-relaxed text-base md:text-lg">
                      Third-party editorial placements to strengthen brand trust
                    </li>
                    <li className="leading-relaxed text-base md:text-lg">
                      Continuous performance tracking to identify best-performing creatives and
                      channels
                    </li>
                  </ul>
                  <p className="text-white/80 leading-relaxed text-base md:text-lg">
                    This integrated approach ensured both scale and efficiency while gathering
                    actionable insights for future campaigns.
                  </p>
                </section>

                {/* Services Provided Section */}
                <section className="pt-8 md:pt-12 mt-8 md:mt-12 space-y-6 border-t border-white/10">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-white font-semibold">
                    Services Provided
                  </h2>
                  <ul className="list-disc list-inside space-y-3 text-white/80">
                    <li className="leading-relaxed text-base md:text-lg">
                      Influencer sourcing and engagement
                    </li>
                    <li className="leading-relaxed text-base md:text-lg">
                      Content strategy management
                    </li>
                    <li className="leading-relaxed text-base md:text-lg">Creative direction</li>
                    <li className="leading-relaxed text-base md:text-lg">
                      Timeline and campaign management
                    </li>
                    <li className="leading-relaxed text-base md:text-lg">
                      Legal and usage rights management
                    </li>
                    <li className="leading-relaxed text-base md:text-lg">Payment management</li>
                    <li className="leading-relaxed text-base md:text-lg">
                      Campaign tracking and performance reporting
                    </li>
                  </ul>
                </section>

                {/* Campaign Metrics */}
                <section className="pt-8 md:pt-12 mt-8 md:mt-12 space-y-4 border-t border-white/10">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-white font-semibold">
                    Campaign Results
                  </h2>
                  <div className="bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6 md:p-8 space-y-4 shadow-lg shadow-purple-500/10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center md:text-left">
                        <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                          4.96M
                        </div>
                        <div className="text-white/70 text-sm md:text-base">Impressions</div>
                      </div>
                      <div className="text-center md:text-left">
                        <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                          50.7K
                        </div>
                        <div className="text-white/70 text-sm md:text-base">Clicks</div>
                      </div>
                      <div className="text-center md:text-left">
                        <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                          146.59%
                        </div>
                        <div className="text-white/70 text-sm md:text-base">Completion Rate</div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Campaign Impact Section */}
                <section className="pt-8 md:pt-12 mt-8 md:mt-12 space-y-6 border-t border-white/10">
                  <p className="text-white/80 leading-relaxed text-base md:text-lg">
                    These creatives delivered the strongest engagement and click-through performance
                    across platforms.
                  </p>

                  <div>
                    <h3 className="text-2xl md:text-3xl text-white font-semibold mb-4">Impact</h3>
                    <ul className="list-disc list-inside space-y-3 text-white/80">
                      <li className="leading-relaxed text-base md:text-lg">
                        Strong overperformance on impressions and clicks across paid media
                      </li>
                      <li className="leading-relaxed text-base md:text-lg">
                        Clear validation of a conversion-led campaign strategy
                      </li>
                      <li className="leading-relaxed text-base md:text-lg">
                        Creator-led content reinforced trust and authenticity
                      </li>
                      <li className="leading-relaxed text-base md:text-lg">
                        High engagement achieved without excessive media spend
                      </li>
                      <li className="leading-relaxed text-base md:text-lg">
                        Actionable insights generated to improve future campaigns
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl md:text-3xl text-white font-semibold mb-4">
                      Key Learnings
                    </h3>
                    <ul className="list-disc list-inside space-y-3 text-white/80">
                      <li className="leading-relaxed text-base md:text-lg">
                        Conversion-focused campaigns deliver clearer business value
                      </li>
                      <li className="leading-relaxed text-base md:text-lg">
                        Audience relevance is more important than creator reach
                      </li>
                      <li className="leading-relaxed text-base md:text-lg">
                        Always-on tracking is critical for accurate performance measurement
                      </li>
                      <li className="leading-relaxed text-base md:text-lg">
                        Blending creator marketing with paid media improves efficiency
                      </li>
                      <li className="leading-relaxed text-base md:text-lg">
                        Data-driven optimization significantly improves ROI
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl md:text-3xl text-white font-semibold mb-4">
                      Final Takeaway
                    </h3>
                    <p className="text-white/80 leading-relaxed text-base md:text-lg mb-4">
                      The So Fresh Salad Campaign demonstrates how a well-structured creator
                      marketing strategy combined with performance media can drive strong engagement
                      and measurable results. By prioritizing relevance, authenticity, and
                      analytics, the campaign successfully delivered awareness at scale while
                      validating consumer demand.
                    </p>
                    <p className="text-white/80 leading-relaxed text-base md:text-lg">
                      This campaign reinforces a core insight:
                    </p>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold text-lg md:text-xl leading-relaxed mt-2">
                      Effective creator marketing is not about visibility alone &ndash; it&apos;s
                      about performance, trust, and results.
                    </p>
                  </div>
                </section>
              </>
            ) : (
              <section className="mt-8 space-y-4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-white font-semibold">
                  About
                </h2>
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl text-white font-semibold mb-4">
                    Campaign Overview
                  </h3>
                  {isAlwaysOnCaseStudy ? (
                    <p className="text-white/80 leading-relaxed text-base md:text-lg">
                      To showcase the versatility of Honeywell&apos;s product portfolio and drive
                      meaningful organic engagement across the brand&apos;s social media platforms,
                      we developed a comprehensive influencer marketing strategy. The campaign was
                      designed to establish sustainable growth and achieve top-of-mind awareness
                      while maintaining brand authenticity and cost-effectiveness.
                    </p>
                  ) : (
                    <p className="text-white/80 leading-relaxed text-base md:text-lg">
                      Honeywell redesigned their product packaging but customers thought the new
                      packs were counterfeit, leading to widespread confusion and sales decline.
                      With Nigeria in the heat of a counterfeit product crisis, the brand needed
                      immediate damage control and consumer education to restore trust.
                    </p>
                  )}
                </div>
              </section>
            )}

            {/* Strategy & Execution - Grid Layout for Leadway, Standard for others */}
            {!isNoLoseGuardCaseStudy &&
              !isAxaAutoflexCaseStudy &&
              !isCleamaxCaseStudy &&
              !isSoFreshCaseStudy && (
                <>
                  {isLeadwayCaseStudy ? (
                    <section className="pt-8 md:pt-12 mt-8 md:mt-12">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                        {/* Content - Left Side */}
                        <div className="space-y-3 order-2 lg:order-1 lg:pt-8 md:pt-6">
                          <h2 className="text-2xl md:text-3xl text-white font-semibold mb-3 md:mb-4">
                            Strategy & Execution
                          </h2>
                          <p className="text-white/80 leading-relaxed text-base md:text-lg">
                            Layi Wasabi&apos;s comedy-education blend made complex topics digestible
                            for millennials/Gen Z. His consistent 2.7%+ engagement rates were ideal
                            for explaining insurance benefits. We deployed his signature comedic
                            storytelling across Instagram and TikTok to maximize reach and
                            platform-specific engagement.
                          </p>
                        </div>

                        {/* Image - Right Side */}
                        {caseStudy.images && caseStudy.images.length > 0 && (
                          <div className="order-1 lg:order-2">
                            <div className="relative w-full h-[300px] md:h-[350px] lg:h-[400px] rounded-xl overflow-hidden bg-gray-900 border-2 border-white/20 shadow-2xl">
                              <Image
                                src={
                                  caseStudy.images[0].includes(' ')
                                    ? caseStudy.images[0]
                                        .split('/')
                                        .map(part => (part ? encodeURIComponent(part) : ''))
                                        .join('/')
                                    : caseStudy.images[0]
                                }
                                alt={caseStudy.title}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                                quality={85}
                                priority
                              />
                              {/* Subtle gradient overlay for depth */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            </div>
                          </div>
                        )}
                      </div>
                    </section>
                  ) : (
                    <section className="space-y-4">
                      <h3 className="text-xl md:text-2xl text-white font-semibold mb-4">
                        Strategy & Execution
                      </h3>
                      {isAlwaysOnCaseStudy ? (
                        <div className="space-y-4 text-white/80 leading-relaxed text-base md:text-lg">
                          <p>
                            We implemented a strategic monthly influencer engagement program across
                            Honeywell&apos;s diverse product range. This always-on approach enabled
                            food content creators to develop compelling recipes and content that
                            naturally highlighted each product&apos;s unique selling propositions.
                          </p>
                          <p>
                            The long-term monthly engagement model was specifically designed to
                            foster deeper relationships with our influencer network, positioning
                            them as authentic brand ambassadors and creating ongoing value beyond
                            individual campaign activations.
                          </p>
                        </div>
                      ) : (
                        <>
                          <p className="text-white/80 leading-relaxed text-base md:text-lg">
                            The team created and executed a full blown marketing campaign to
                            announce the relaunch, it featured a full content strategy, launch
                            event, digital, experiential and influencer marketing. selected food and
                            lifestyle creators received a box from Honeywell branded
                            &quot;You&apos;ve Been Served&quot;.
                          </p>

                          {/* First YouTube Video */}
                          <div className="mt-8">
                            <YouTubeEmbed
                              videoId="aB1bZp1JdMA"
                              title="Honeywell Relaunch Campaign Video"
                              className="w-full"
                            />
                          </div>

                          {/* Second YouTube Video */}
                          <div className="mt-8">
                            <YouTubeEmbed
                              videoId="https://www.youtube.com/watch?v=bZOF1be3uIE"
                              title="Honeywell Relaunch Campaign Video 2"
                              className="w-full"
                            />
                          </div>

                          {/* Third YouTube Video */}
                          <div className="mt-8">
                            <YouTubeEmbed
                              videoId="ZgzUX7vgk28"
                              title="Honeywell Relaunch Campaign Video 3"
                              className="w-full"
                            />
                          </div>
                        </>
                      )}
                    </section>
                  )}
                </>
              )}

            {/* Leadway Campaign Details */}
            {isLeadwayCaseStudy && (
              <section className="space-y-6 pt-8 md:pt-12 mt-8 md:mt-12 border-t border-white/10">
                {/* Campaign Overview */}
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl text-white font-semibold">
                    Campaign Overview
                  </h3>
                  <p className="text-white/80 leading-relaxed text-base md:text-lg">
                    Leadway recognized that summer is peak travel season when young people take
                    vacations and &quot;baecations.&quot; They needed to capture this seasonal
                    opportunity by reaching affluent professionals who travel frequently but viewed
                    insurance as bureaucratic rather than essential.
                  </p>
                </div>

                {/* Strategy & Execution Details */}
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl text-white font-semibold">
                    Strategy & Execution
                  </h3>
                  <p className="text-white/80 leading-relaxed text-base md:text-lg">
                    Jay on air&apos;s lifestyle content and professional demeanor resonated with
                    Nigeria&apos;s affluent millennials. With 11% engagement rate and 70%
                    professional audience aged 25-40, he was perfect for positioning Travel
                    Insurance as a smart business decision. Jay used real travel scenarios to
                    demonstrate practical benefits.
                  </p>
                </div>

                {/* Instagram Video Embed with Play Button */}
                <div className="mt-8">
                  <Link
                    href="https://www.instagram.com/p/C_QwYLrIdCy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative w-full rounded-xl overflow-hidden bg-gray-900 border-2 border-white/20 shadow-2xl group cursor-pointer"
                  >
                    {/* Video Cover Image */}
                    <div className="relative w-full h-[400px] md:h-[500px]">
                      <Image
                        src="/case-studies/Influencer 3.webp"
                        alt="Leadway Travel Insurance Campaign Video"
                        fill
                        sizes="(max-width: 768px) 100vw, 90vw"
                        className="object-cover"
                        quality={85}
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:from-black/70 group-hover:via-black/40 transition-all duration-300" />

                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 transform group-hover:scale-110">
                          <svg
                            className="w-10 h-10 md:w-12 md:h-12 text-white ml-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Instagram Embed (hidden by default, can be shown on interaction) */}
                  <div
                    className="mt-8 hidden"
                    id="instagram-embed-container"
                  >
                    <InstagramEmbed
                      postUrl="https://www.instagram.com/p/C_QwYLrIdCy/"
                      className="w-full"
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Services Provided - Skip for No Lose Guard and AXA Autoflex campaigns */}
            {!isNoLoseGuardCaseStudy &&
              !isAxaAutoflexCaseStudy &&
              !isCleamaxCaseStudy &&
              !isSoFreshCaseStudy && (
                <section className="space-y-4">
                  <h3 className="text-xl md:text-2xl text-white font-semibold mb-4">
                    Services Provided
                  </h3>
                  <ul className="space-y-2 text-white/80">
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>Influencers sourcing and engagement</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>Content strategy management</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>Creative direction</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>Timeline management</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>Legal and usage rights management</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>Payment management</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>Campaign tracking and reporting</span>
                    </li>
                  </ul>
                </section>
              )}

            {/* Campaign Influencers - Show for both campaigns */}
            {isAlwaysOnCaseStudy && caseStudy.images && caseStudy.images.length > 0 && (
              <section className="space-y-6 pt-4 border-t border-white/10">
                <h3 className="text-xl md:text-2xl text-white font-semibold mb-6">
                  Campaign Influencers
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
                  {caseStudy.images.map((imagePath, imgIndex) => {
                    // Extract name from image path
                    const getImageName = (path: string) => {
                      const filename = path.replace('/case-studies/', '').replace('.webp', '');
                      // Return the filename as-is for influencer names
                      return filename;
                    };

                    const imageName = getImageName(imagePath);

                    return (
                      <div
                        key={imgIndex}
                        className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-white/5 border border-blue-500/50 group cursor-pointer"
                      >
                        <Image
                          src={
                            imagePath.includes(' ') ||
                            imagePath.includes("'") ||
                            imagePath.includes('\u2019')
                              ? imagePath
                                  .split('/')
                                  .map(part => (part ? encodeURIComponent(part) : ''))
                                  .join('/')
                              : imagePath
                          }
                          alt={imageName}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33.33vw, 20vw"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                          quality={75}
                        />
                        {/* Gradient overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                        {/* Name at bottom center */}
                        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 text-center">
                          <p className="text-white text-xs sm:text-sm md:text-base font-semibold drop-shadow-lg">
                            {imageName}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Campaign Influencers - Only show for relaunch campaign */}
            {!isAlwaysOnCaseStudy &&
              !isLeadwayCaseStudy &&
              !isNoLoseGuardCaseStudy &&
              !isAxaAutoflexCaseStudy &&
              !isCleamaxCaseStudy &&
              !isSoFreshCaseStudy && (
                <section className="space-y-6 pt-4 border-t border-white/10">
                  <h3 className="text-xl md:text-2xl text-white font-semibold mb-4 sm:mb-6">
                    Campaign Influencers
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                    {/* First Row */}
                    {/* Omoye Cooks */}
                    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-white/5 border border-blue-500/50 group cursor-pointer">
                      <Image
                        src="/case-studies/omoye%20Cooks.webp"
                        alt="Omoye Cooks"
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        quality={75}
                      />
                      {/* Gradient overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                      {/* Name at bottom center */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 text-center">
                        <p className="text-white text-xs sm:text-sm md:text-base font-semibold drop-shadow-lg">
                          Omoye Cooks
                        </p>
                      </div>
                    </div>

                    {/* D360 Cuisine */}
                    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-white/5 border border-blue-500/50 group cursor-pointer">
                      <Image
                        src="/case-studies/d360%20Cuisine.webp"
                        alt="D360 Cuisine"
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        quality={75}
                      />
                      {/* Gradient overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                      {/* Name at bottom center */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 text-center">
                        <p className="text-white text-xs sm:text-sm md:text-base font-semibold drop-shadow-lg">
                          D360 Cuisine
                        </p>
                      </div>
                    </div>

                    {/* Chef Lizz */}
                    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-white/5 border border-blue-500/50 group cursor-pointer">
                      <Image
                        src="/case-studies/Chef%20Lizz.webp"
                        alt="Chef Lizz"
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        quality={75}
                      />
                      {/* Gradient overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                      {/* Name at bottom center */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 text-center">
                        <p className="text-white text-xs sm:text-sm md:text-base font-semibold drop-shadow-lg">
                          Chef Lizz
                        </p>
                      </div>
                    </div>

                    {/* T-Spices */}
                    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-white/5 border border-blue-500/50 group cursor-pointer">
                      <Image
                        src="/case-studies/T-Spices.webp"
                        alt="T-Spices"
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        quality={75}
                      />
                      {/* Gradient overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                      {/* Name at bottom center */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 text-center">
                        <p className="text-white text-xs sm:text-sm md:text-base font-semibold drop-shadow-lg">
                          T-Spices
                        </p>
                      </div>
                    </div>

                    {/* Second Row */}
                    {/* Joy Etor */}
                    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-white/5 border border-blue-500/50 group cursor-pointer">
                      <Image
                        src="/case-studies/Joy%20Etor.webp"
                        alt="Joy Etor"
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        quality={75}
                      />
                      {/* Gradient overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                      {/* Name at bottom center */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 text-center">
                        <p className="text-white text-xs sm:text-sm md:text-base font-semibold drop-shadow-lg">
                          Joy Etor
                        </p>
                      </div>
                    </div>

                    {/* Riaz Kitchen */}
                    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-white/5 border border-blue-500/50 group cursor-pointer">
                      <Image
                        src="/case-studies/Riaz%20Kitchen.webp"
                        alt="Riaz Kitchen"
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        quality={75}
                      />
                      {/* Gradient overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                      {/* Name at bottom center */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 text-center">
                        <p className="text-white text-xs sm:text-sm md:text-base font-semibold drop-shadow-lg">
                          Riaz Kitchen
                        </p>
                      </div>
                    </div>

                    {/* SB-Treats */}
                    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-white/5 border border-blue-500/50 group cursor-pointer">
                      <Image
                        src="/case-studies/SB-Treats.webp"
                        alt="SB-Treats"
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        quality={75}
                      />
                      {/* Gradient overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                      {/* Name at bottom center */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 text-center">
                        <p className="text-white text-xs sm:text-sm md:text-base font-semibold drop-shadow-lg">
                          SB-Treats
                        </p>
                      </div>
                    </div>

                    {/* Tife Paraeo */}
                    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-white/5 border border-blue-500/50 group cursor-pointer">
                      <Image
                        src="/case-studies/Tife%20Paraeo.webp"
                        alt="Tife Paraeo"
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        quality={75}
                      />
                      {/* Gradient overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                      {/* Name at bottom center */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 text-center">
                        <p className="text-white text-xs sm:text-sm md:text-base font-semibold drop-shadow-lg">
                          Tife Paraeo
                        </p>
                      </div>
                    </div>

                    {/* Third Row */}
                    {/* Asy Munchies */}
                    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-white/5 border border-blue-500/50 group cursor-pointer">
                      <Image
                        src="/case-studies/Asy%20Munchies.webp"
                        alt="Asy Munchies"
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        quality={75}
                      />
                      {/* Gradient overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                      {/* Name at bottom center */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 text-center">
                        <p className="text-white text-xs sm:text-sm md:text-base font-semibold drop-shadow-lg">
                          Asy Munchies
                        </p>
                      </div>
                    </div>

                    {/* Cara's Kitchen */}
                    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-white/5 border border-blue-500/50 group cursor-pointer">
                      <Image
                        src="/case-studies/Cara%27s%20Kitchen.webp"
                        alt="Cara's Kitchen"
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        quality={75}
                      />
                      {/* Gradient overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                      {/* Name at bottom center */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 text-center">
                        <p className="text-white text-xs sm:text-sm md:text-base font-semibold drop-shadow-lg">
                          Cara&apos;s Kitchen
                        </p>
                      </div>
                    </div>

                    {/* Matse */}
                    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-white/5 border border-blue-500/50 group cursor-pointer">
                      <Image
                        src="/case-studies/Matse.webp"
                        alt="Matse"
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        quality={75}
                      />
                      {/* Gradient overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                      {/* Name at bottom center */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 text-center">
                        <p className="text-white text-xs sm:text-sm md:text-base font-semibold drop-shadow-lg">
                          Matse
                        </p>
                      </div>
                    </div>

                    {/* Your Food Girl */}
                    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-white/5 border border-blue-500/50 group cursor-pointer">
                      <Image
                        src="/case-studies/Your%20Food%20Girl.webp"
                        alt="Your Food Girl"
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        quality={75}
                      />
                      {/* Gradient overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                      {/* Name at bottom center */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 text-center">
                        <p className="text-white text-xs sm:text-sm md:text-base font-semibold drop-shadow-lg">
                          Your Food Girl
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              )}

            {/* Platforms & Location - Only show for non-Leadway case studies */}
            {!isLeadwayCaseStudy &&
              !isNoLoseGuardCaseStudy &&
              !isAxaAutoflexCaseStudy &&
              !isCleamaxCaseStudy &&
              !isSoFreshCaseStudy && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {/* Platforms */}
                  <section className="space-y-4">
                    <h3 className="text-xl md:text-2xl text-white font-semibold mb-4">Platforms</h3>
                    <div className="flex items-center gap-4">
                      {/* Instagram Icon */}
                      <a
                        href="#"
                        className="text-white/80 hover:text-purple-400 transition-colors"
                        aria-label="Instagram"
                      >
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                      {/* TikTok Icon */}
                      <a
                        href="#"
                        className="text-white/80 hover:text-purple-400 transition-colors"
                        aria-label="TikTok"
                      >
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                        </svg>
                      </a>
                      {/* YouTube Icon */}
                      <a
                        href="#"
                        className="text-white/80 hover:text-purple-400 transition-colors"
                        aria-label="YouTube"
                      >
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      </a>
                    </div>
                  </section>

                  {/* Location */}
                  <section className="space-y-4">
                    <h3 className="text-xl md:text-2xl text-white font-semibold mb-4">Location</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">🇳🇬</span>
                      <p className="text-white/80 text-base md:text-lg">Nigeria</p>
                    </div>
                  </section>
                </div>
              )}

            {/* Results - For Leadway case study */}
            {isLeadwayCaseStudy && (
              <section className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="text-xl md:text-2xl text-white font-semibold mb-4">Results</h3>
                <div className="bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6 md:p-8 space-y-4 shadow-lg shadow-purple-500/10">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {caseStudy.metrics?.views && (
                      <div className="text-center md:text-left">
                        <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                          {caseStudy.metrics.views}
                        </div>
                        <div className="text-white/70 text-sm md:text-base">Views</div>
                      </div>
                    )}
                    {caseStudy.metrics?.likes && (
                      <div className="text-center md:text-left">
                        <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                          {caseStudy.metrics.likes}
                        </div>
                        <div className="text-white/70 text-sm md:text-base">Likes</div>
                      </div>
                    )}
                    {caseStudy.metrics?.comments && (
                      <div className="text-center md:text-left">
                        <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                          {caseStudy.metrics.comments}
                        </div>
                        <div className="text-white/70 text-sm md:text-base">Comments</div>
                      </div>
                    )}
                    {caseStudy.metrics?.saves && (
                      <div className="text-center md:text-left">
                        <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                          {caseStudy.metrics.saves}
                        </div>
                        <div className="text-white/70 text-sm md:text-base">Saves</div>
                      </div>
                    )}
                  </div>
                  {caseStudy.metrics?.impact && (
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <div className="text-center">
                        <div className="text-lg md:text-xl font-semibold text-white mb-2">
                          Impact
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                          {caseStudy.metrics.impact}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Impact - Skip for No Lose Guard and AXA Autoflex campaigns (have Results section instead) */}
            {!isNoLoseGuardCaseStudy &&
              !isAxaAutoflexCaseStudy &&
              !isCleamaxCaseStudy &&
              !isSoFreshCaseStudy && (
                <section className="space-y-4 pt-4 border-t border-white/10">
                  <h3 className="text-xl md:text-2xl text-white font-semibold mb-4">Impact</h3>
                  <div className="space-y-3">
                    {isAlwaysOnCaseStudy ? (
                      <p className="text-white/80 leading-relaxed font-semibold text-base md:text-lg">
                        Over 6M organic views Monthly
                      </p>
                    ) : isLeadwayCaseStudy ? (
                      <p className="text-white/80 leading-relaxed font-semibold text-base md:text-lg">
                        450+ policy inquiries within 48 hours
                      </p>
                    ) : (
                      <>
                        <p className="text-white/80 leading-relaxed font-semibold text-base md:text-lg">
                          Over 1M organic views without paid boost, sparking nationwide
                          conversations.
                        </p>
                        <p className="text-white/80 leading-relaxed text-base md:text-lg">
                          Exceptional value for mass education
                        </p>
                      </>
                    )}
                  </div>
                </section>
              )}

            {/* Honeywell Relaunch Sustenance X Folagade Banks - Only for relaunch campaign */}
            {caseStudy.id === 'honeywell-relaunch-campaign' && (
              <section className="space-y-6 pt-8 md:pt-12 border-t border-white/10">
                <h3 className="text-xl md:text-2xl text-white font-semibold mb-6">
                  Honeywell Relaunch Sustenance X Folagade Banks
                </h3>

                {/* Content Section - FULL WIDTH */}
                <div className="w-full space-y-6">
                  {/* Campaign Overview */}
                  <div className="space-y-4">
                    <h4 className="text-lg md:text-xl text-white font-semibold">
                      Campaign Overview
                    </h4>
                    <p className="text-white/80 leading-relaxed text-base md:text-lg">
                      Honeywell redesigned their product packaging but customers thought the new
                      packs were counterfeit, leading to widespread confusion and sales decline.
                      With Nigeria in the heat of a counterfeit product crisis, the brand needed
                      immediate damage control and consumer education to restore trust.
                    </p>
                  </div>

                  {/* Strategy & Execution */}
                  <div className="space-y-4">
                    <h4 className="text-lg md:text-xl text-white font-semibold">
                      Strategy & Execution
                    </h4>
                    <p className="text-white/80 leading-relaxed text-base md:text-lg">
                      Folagade Banks&apos; &quot;Mama Deola&quot; character commanded 1.8M
                      impressions with 18.52% engagement and a 63.61% female audience - perfect for
                      reaching Nigerian households. His authentic, humorous approach directly
                      addressed the packaging concerns while demonstrating product quality.
                    </p>
                  </div>

                  {/* Instagram Video */}
                  <div className="space-y-4">
                    <Link
                      href="https://www.instagram.com/reels/DGfknE6oYLw/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative w-full rounded-xl overflow-hidden bg-gray-900 border-2 border-white/20 shadow-2xl group cursor-pointer"
                    >
                      {/* Video Cover Image */}
                      <div className="relative w-full h-[400px] md:h-[500px]">
                        <Image
                          src="/case-studies/Influencer 17.webp"
                          alt="Honeywell Relaunch Campaign Video"
                          fill
                          sizes="(max-width: 768px) 100vw, 90vw"
                          className="object-cover object-top"
                          quality={85}
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:from-black/70 group-hover:via-black/40 transition-all duration-300" />

                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 transform group-hover:scale-110">
                            <svg
                              className="w-10 h-10 md:w-12 md:h-12 text-white ml-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>

                    {/* Instagram Embed (hidden by default, can be shown on interaction) */}
                    <div
                      className="mt-8 hidden"
                      id="instagram-embed-container-honeywell"
                    >
                      <InstagramEmbed postUrl="https://www.instagram.com/reels/DGfknE6oYLw/" />
                    </div>
                  </div>

                  {/* Results - Highlighted Section */}
                  <div className="space-y-4">
                    <h4 className="text-lg md:text-xl text-white font-semibold">Results</h4>
                    <div className="bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6 md:p-8 space-y-4 shadow-lg shadow-purple-500/10">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center md:text-left">
                          <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                            1M+
                          </div>
                          <div className="text-white/70 text-sm md:text-base">Views</div>
                        </div>
                        <div className="text-center md:text-left">
                          <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                            113K
                          </div>
                          <div className="text-white/70 text-sm md:text-base">Likes</div>
                        </div>
                        <div className="text-center md:text-left">
                          <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                            7K
                          </div>
                          <div className="text-white/70 text-sm md:text-base">Comments</div>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-purple-400/20">
                        <div className="text-lg md:text-xl font-semibold text-white mb-2">
                          78% reduction in counterfeit inquiries
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="space-y-4">
                    <h4 className="text-lg md:text-xl text-white font-semibold">Impact</h4>
                    <p className="text-white/80 leading-relaxed text-base md:text-lg">
                      Over 1M organic views without paid boost, sparking nationwide conversations.
                      Exceptional value for mass education.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Honeywell Relaunch Sustenance X Omoba - Only for relaunch campaign */}
            {caseStudy.id === 'honeywell-relaunch-campaign' && (
              <section className="space-y-6 pt-8 md:pt-12 border-t border-white/10">
                <h3 className="text-xl md:text-2xl text-white font-semibold mb-6">
                  Honeywell Relaunch Sustenance X Omoba
                </h3>

                {/* Image Section - Under heading */}
                <div className="mb-6 sm:mb-8">
                  <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden bg-gray-900 border border-white/10">
                    <Image
                      src="/case-studies/Influencer 26.webp"
                      alt="Omoba"
                      fill
                      sizes="100vw"
                      className="object-cover"
                      quality={100}
                      priority
                    />
                    {/* Light overlay for text readability if needed */}
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                </div>

                {/* Content Section - FULL WIDTH */}
                <div className="w-full space-y-6">
                  {/* Campaign Overview */}
                  <div className="space-y-4">
                    <h4 className="text-lg md:text-xl text-white font-semibold">
                      Campaign Overview
                    </h4>
                    <p className="text-white/80 leading-relaxed text-base md:text-lg">
                      Honeywell redesigned their product packaging but customers thought the new
                      packs were counterfeit, leading to widespread confusion and sales decline.
                      With Nigeria in the heat of a counterfeit product crisis, the brand needed
                      immediate damage control and consumer education to restore trust.
                    </p>
                  </div>

                  {/* Strategy & Execution */}
                  <div className="space-y-4">
                    <h4 className="text-lg md:text-xl text-white font-semibold">
                      Strategy & Execution
                    </h4>
                    <p className="text-white/80 leading-relaxed text-base md:text-lg">
                      Omoba&apos;s authentic storytelling and her highly engaging audience was
                      perfect for reaching Nigerian households. Her authentic, humorous skit
                      approach directly addressed the product redesign while resounding product
                      quality.
                    </p>
                  </div>

                  {/* Results - Highlighted Section */}
                  <div className="space-y-4">
                    <h4 className="text-lg md:text-xl text-white font-semibold">Results</h4>
                    <div className="bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6 md:p-8 space-y-4 shadow-lg shadow-purple-500/10">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center md:text-left">
                          <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                            850K+
                          </div>
                          <div className="text-white/70 text-sm md:text-base">Views</div>
                        </div>
                        <div className="text-center md:text-left">
                          <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                            30K
                          </div>
                          <div className="text-white/70 text-sm md:text-base">Likes</div>
                        </div>
                        <div className="text-center md:text-left">
                          <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                            1K
                          </div>
                          <div className="text-white/70 text-sm md:text-base">Comments</div>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-purple-400/20">
                        <div className="text-lg md:text-xl font-semibold text-white mb-2">
                          78% reduction in counterfeit inquiries
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="space-y-4">
                    <h4 className="text-lg md:text-xl text-white font-semibold">Impact</h4>
                    <p className="text-white/80 leading-relaxed text-base md:text-lg">
                      Over 1M organic views without paid boost, sparking nationwide conversations.
                      Exceptional value for mass education.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* CTA Section - Brand Brief Conversion */}
            {
              <section className="pt-8 md:pt-12 mt-8 md:mt-12 border-t border-white/10">
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 text-center">
                  <Heading
                    level={2}
                    className="text-white text-2xl md:text-3xl mb-4"
                  >
                    Ready to Create Similar Results?
                  </Heading>
                  <p className="text-white/80 mb-6 max-w-2xl mx-auto text-base md:text-lg">
                    Let&apos;s discuss your campaign goals and connect you with the right creators
                    to bring your vision to life.
                  </p>
                  <Link
                    href="/brands/brief"
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
                  >
                    Start Your Campaign
                  </Link>
                </div>
              </section>
            }

            {/* Related Content Section */}
            {
              <section className="pt-8 md:pt-12 mt-8 md:mt-12 border-t border-white/10">
                <Heading
                  level={3}
                  variant="default"
                  className="!text-white text-xl md:text-2xl mb-6"
                >
                  Explore More
                </Heading>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/case-studies"
                    className="flex-1 px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-xl hover:bg-white/10 hover:border-white/20 transition-all text-center"
                  >
                    View All Case Studies
                  </Link>
                  <Link
                    href="/blog"
                    className="flex-1 px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-xl hover:bg-white/10 hover:border-white/20 transition-all text-center"
                  >
                    Read Our Blog
                  </Link>
                </div>
              </section>
            }
          </div>
        </div>
      </section>
    </>
  );
}

CaseStudyDetail.displayName = 'CaseStudyDetail';

export default CaseStudyDetail;
