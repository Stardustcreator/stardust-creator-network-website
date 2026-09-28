'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

// Not wired to the CMS `features` key: this section renders six bespoke,
// hand-built card mockups (a rate calculator, an invoice, a services
// flowchart, an audience builder mailer, a rate card, and a brand-deal
// board), each with its own colors, icons, and inner UI. The CMS's
// `features` field is raw admin-authored JSON of unknown/unspecified shape
// (see the legacy CMS editor's `JsonField`), and the only concrete example
// of that shape is a generic `{ title, description }` pair - nowhere near
// rich enough to drive these six distinct visual mockups. Wiring it up
// would either drop the mockups entirely or silently break the moment an
// editor didn't provide exactly six items in this exact shape, so this
// section is intentionally left hardcoded.
export default function CreatorOsInfrastructure() {
  const sectionTitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
      },
    }),
  };

  return (
    <section
      className="w-full py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#FAFAF9' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionTitleVariants}
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4"
            style={{
              fontFamily: 'var(--font-bricolage-grotesque)',
            }}
          >
            The Infrastructure Your Creator Business Has Been Missing
          </h2>
          <p className="text-gray-600 text-base md:text-lg font-lato">
            Every tool on the SCN dashboard is built to help you run your creator business like the
            professional you already are.
          </p>
        </motion.div>

        {/* Cards Grid - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 w-full">
          {/* Rate Calculator - Purple */}
          <motion.div
            className="w-full"
            style={{
              backgroundColor: '#A51CFF',
              borderRadius: '12px',
              padding: 'clamp(20px, 5vw, 32px)',
              minHeight: '450px',
              display: 'flex',
              flexDirection: 'column',
            }}
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div style={{ marginBottom: '16px' }}>
              <h3 className="text-white text-xl md:text-2xl font-bold mb-3 font-bricolage-grotesque">
                Rate Calculator
              </h3>
              <p className="text-white/90 text-sm md:text-base font-lato leading-relaxed">
                Stop guessing what to charge. In 560 Fill × 28 Hug ouls and get a rate you can
                actually defend - built around your deliverables and the scope of the campaign.
              </p>
            </div>
            <div
              style={{
                backgroundColor: '#FAFAF9',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '16px',
                flex: 1,
                overflow: 'auto',
              }}
            >
              <div className="text-xs md:text-sm text-gray-600 font-semibold mb-4">Summary</div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center text-xs md:text-sm mb-1">
                    <span className="text-gray-700">Content creation fee</span>
                    <span className="text-gray-600">₦680,000</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    2+ Instagram Reel (60s), 1+ TikTok Video (30-60s)
                  </div>
                  <div className="text-xs text-purple-600 font-semibold mt-1">Why this fee? ↓</div>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center text-xs md:text-sm">
                    <span className="text-gray-700">Distribution / reach fee</span>
                    <span className="text-gray-600">₦680,000</span>
                  </div>
                </div>
                <div className="text-xs text-gray-600 mt-2">55% of total</div>
                <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                  <span className="text-gray-700 font-semibold text-sm">Total rate</span>
                  <span className="text-purple-600 font-bold text-sm">₦807,921,476</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Invoice - Purple */}
          <motion.div
            className="w-full"
            style={{
              backgroundColor: '#A51CFF',
              borderRadius: '12px',
              padding: 'clamp(20px, 5vw, 32px)',
              minHeight: '450px',
              display: 'flex',
              flexDirection: 'column',
            }}
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div style={{ marginBottom: '16px' }}>
              <h3 className="text-white text-xl md:text-2xl font-bold mb-3 font-bricolage-grotesque">
                Invoice
              </h3>
              <p className="text-white/90 text-sm md:text-base font-lato leading-relaxed">
                Send professional invoices and get paid directly to your account. This makes it
                easier to keep track of your earnings as a creator business owner.
              </p>
            </div>
            <div
              style={{
                backgroundColor: '#FAFAF9',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '16px',
                flex: 1,
                overflow: 'auto',
              }}
            >
              <div className="text-xs md:text-sm text-gray-600 font-semibold mb-2">Invoice</div>
              <div className="text-xs md:text-sm text-gray-600 mb-4">INV-003</div>
              <div className="grid grid-cols-2 gap-4 mb-4 text-xs md:text-sm">
                <div>
                  <div className="text-gray-500 text-xs mb-1">From</div>
                  <div className="text-gray-700 font-semibold">John Peters</div>
                  <div className="text-gray-600 text-xs">john@email.com</div>
                  <div className="text-gray-600 text-xs">+234810247793</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs mb-1">To</div>
                  <div className="text-gray-700 font-semibold">Adebimpe Joshua</div>
                  <div className="text-gray-600 text-xs">joshua7484@gmail.com</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs md:text-sm mb-4">
                <div>
                  <div className="text-gray-500 text-xs mb-1">Invoice date</div>
                  <div className="text-gray-700">June 3, 2026</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs mb-1">Due date</div>
                  <div className="text-gray-700">June 7, 2026</div>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="text-gray-600 font-semibold text-xs mb-2">CONTENT DELIVERABLES</div>
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-gray-700">Content creation fee</span>
                  <span className="text-purple-600 font-semibold">₦680,000</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Services - Yellow FLOWCHART */}
          <motion.div
            className="w-full"
            style={{
              backgroundColor: '#FECB00',
              borderRadius: '12px',
              padding: 'clamp(20px, 5vw, 32px)',
              minHeight: '450px',
              display: 'flex',
              flexDirection: 'column',
            }}
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div style={{ marginBottom: '16px' }}>
              <h3 className="text-gray-900 text-xl md:text-2xl font-bold mb-3 font-bricolage-grotesque">
                Services
              </h3>
              <p className="text-gray-800 text-sm md:text-base font-lato leading-relaxed">
                List your UGC packages and set your rates so that brands can browse and book without
                too many back and forth.
              </p>
            </div>
            <div
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                borderRadius: '8px',
                padding: '24px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1)',
                position: 'relative',
              }}
            >
              {/* UGC Packages Button */}
              <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold text-sm mb-6">
                UGC Packages
              </button>

              {/* Vertical Divider Line with Arrow */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}
              >
                <div style={{ width: '1px', height: '50px', backgroundColor: '#A1A1A1' }}></div>
                <span style={{ fontSize: '24px', color: '#A1A1A1', lineHeight: '1' }}>↓</span>
              </div>

              {/* Row 1 */}
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'center',
                  marginBottom: '8px',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
                  flexWrap: 'wrap',
                }}
              >
                <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap">
                  Instagram reels
                </button>
                <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap">
                  TikTok videos
                </button>
                <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap">
                  Photo carousel
                </button>
              </div>

              {/* Row 2 */}
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'center',
                  marginBottom: '8px',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
                  flexWrap: 'wrap',
                }}
              >
                <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap">
                  Testimonial videos
                </button>
                <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap">
                  Voiceover video
                </button>
                <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap">
                  Product unboxing
                </button>
              </div>

              {/* Row 3 */}
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'center',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
                  flexWrap: 'wrap',
                }}
              >
                <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap">
                  Newsletter mention
                </button>
                <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap">
                  and many more...
                </button>
              </div>
            </div>
          </motion.div>

          {/* Audience Builder - Yellow */}
          <motion.div
            className="w-full"
            style={{
              backgroundColor: '#FECB00',
              borderRadius: '12px',
              padding: 'clamp(20px, 5vw, 32px)',
              minHeight: '450px',
              display: 'flex',
              flexDirection: 'column',
            }}
            custom={3}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Title & Description on Yellow Background */}
            <div style={{ marginBottom: '12px' }}>
              <h3 className="text-gray-900 text-xl md:text-2xl font-bold mb-2 font-bricolage-grotesque">
                Audience Builder
              </h3>
              <p className="text-gray-800 text-xs md:text-sm font-lato leading-relaxed">
                Turn every profile visit into a subscriber. Build an email list you own so your
                audience stays with you no matter what any algorithm decides.
              </p>
            </div>

            {/* White Content Box with Icons at Top */}
            <div
              style={{
                backgroundColor: '#FAFAF9',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '20px',
                flex: 1,
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* 4 Overlapping Circles - LAST ONE HAS +54 */}
              <div
                style={{
                  position: 'relative',
                  width: '220px',
                  height: '70px',
                  marginBottom: '20px',
                }}
              >
                {/* Circle 1 - User Icon */}
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#FFFEE7',
                    borderRadius: '50%',
                    border: '2px solid #CCCCCC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    left: '0px',
                    zIndex: 4,
                  }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="8"
                      r="3"
                      fill="#A1A1A1"
                    />
                    <path
                      d="M12 14C9.33 14 4 15.34 4 18v2h16v-2c0-2.66-4.33-4-8-4z"
                      fill="#A1A1A1"
                    />
                  </svg>
                </div>

                {/* Circle 2 - User Icon */}
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#F0FDF4',
                    borderRadius: '50%',
                    border: '2px solid #CCCCCC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    left: '52px',
                    zIndex: 3,
                  }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="8"
                      r="3"
                      fill="#A1A1A1"
                    />
                    <path
                      d="M12 14C9.33 14 4 15.34 4 18v2h16v-2c0-2.66-4.33-4-8-4z"
                      fill="#A1A1A1"
                    />
                  </svg>
                </div>

                {/* Circle 3 - User Icon */}
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#FFF7EC',
                    borderRadius: '50%',
                    border: '2px solid #CCCCCC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    left: '104px',
                    zIndex: 2,
                  }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="8"
                      r="3"
                      fill="#A1A1A1"
                    />
                    <path
                      d="M12 14C9.33 14 4 15.34 4 18v2h16v-2c0-2.66-4.33-4-8-4z"
                      fill="#A1A1A1"
                    />
                  </svg>
                </div>

                {/* Circle 4 - +54 NUMBER */}
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#FBF3FF',
                    borderRadius: '50%',
                    border: '2px solid #CCCCCC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    left: '156px',
                    zIndex: 1,
                  }}
                >
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#A1A1A1' }}>
                    +54
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex justify-between items-center mb-4">
                <label className="text-gray-700 text-xs md:text-sm font-semibold">
                  Send Broadcast
                </label>
                <button className="text-purple-600 text-xs md:text-sm font-semibold">Send →</button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-gray-700 text-xs font-semibold block mb-1">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    placeholder="Sponsored content (post on your page)"
                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded"
                  />
                </div>
                <div>
                  <label className="text-gray-700 text-xs font-semibold block mb-1">Body</label>
                  <div className="border border-gray-200 rounded">
                    <div className="text-gray-400 text-xs border-b border-gray-200 p-1.5 flex gap-2">
                      <span>Normal</span>
                      <span>B</span>
                      <span>I</span>
                      <span>U</span>
                      <span>🔗</span>
                      <span>≡</span>
                    </div>
                    <textarea
                      placeholder="Provide the body of your email"
                      className="w-full text-xs text-gray-700 p-1.5"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Rate Card Builder - Orange */}
          <motion.div
            className="w-full"
            style={{
              backgroundColor: '#FF5400',
              borderRadius: '12px',
              padding: 'clamp(20px, 5vw, 32px)',
              minHeight: '450px',
              display: 'flex',
              flexDirection: 'column',
            }}
            custom={4}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div style={{ marginBottom: '16px' }}>
              <h3 className="text-white text-xl md:text-2xl font-bold mb-3 font-bricolage-grotesque">
                Rate Card Builder
              </h3>
              <p className="text-white/90 text-sm md:text-base font-lato leading-relaxed">
                Drive you know what is charge. We tool Earn real number into a clean, professional
                rate card you can send straight to any brand.
              </p>
            </div>
            <div
              style={{
                backgroundColor: '#FAFAF9',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '16px',
                flex: 1,
                overflow: 'auto',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/who we are/Avatar.webp"
                  alt="Jane Creator"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <div className="text-gray-700 text-sm font-semibold">Jane Creator</div>
                  <div className="text-purple-600 text-xs font-semibold">Beauty & Lifestyle</div>
                </div>
              </div>
              <div className="flex gap-4 text-xs mb-4 flex-wrap">
                <div className="flex items-center gap-1">
                  {/* Instagram Icon SVG */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="4.5"
                      stroke="#A51CFF"
                      strokeWidth="2"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="5"
                      stroke="#A51CFF"
                      strokeWidth="2"
                    />
                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="1"
                      fill="#A51CFF"
                    />
                  </svg>
                  <span className="text-purple-600 font-semibold">@jhanecreator</span>
                </div>
                <div className="flex items-center gap-1">
                  {/* TikTok Icon SVG */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.68v13.7a2.4 2.4 0 1 1-4.77-2.6A2.403 2.403 0 0 1 9.1 13.66V9.58a6.186 6.186 0 0 0-6.1 5.1A6.12 6.12 0 0 0 9 20.1a6.109 6.109 0 0 0 5.4-9.5"
                      fill="#A51CFF"
                    />
                  </svg>
                  <span className="text-purple-600 font-semibold">@jhanecreators</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="text-gray-700 text-xs font-semibold mb-3">SERVICES & RATES</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <div>
                      <span className="text-gray-700 font-semibold">Instagram Reel</span>
                      <div className="text-gray-600 text-xs">
                        Sponsored • 1 location • 7-day turnaround
                      </div>
                    </div>
                    <span className="text-gray-600 font-semibold">80,000</span>
                  </div>
                  <div className="flex justify-between text-xs pt-2 border-t border-gray-200">
                    <div>
                      <span className="text-gray-700 font-semibold">UGC Package</span>
                      <div className="text-gray-600 text-xs">UGC • 3 assets</div>
                    </div>
                    <span className="text-gray-600 font-semibold">80,000</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Brand Deal Access - Orange */}
          <motion.div
            className="w-full"
            style={{
              backgroundColor: '#FF5400',
              borderRadius: '12px',
              padding: 'clamp(20px, 5vw, 32px)',
              minHeight: '450px',
              display: 'flex',
              flexDirection: 'column',
            }}
            custom={5}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div style={{ marginBottom: '16px' }}>
              <h3 className="text-white text-xl md:text-2xl font-bold mb-3 font-bricolage-grotesque">
                Brand deal access
              </h3>
              <p className="text-white/90 text-sm md:text-base font-lato leading-relaxed">
                Send professional invoices and get paid directly to your account. This makes it
                easier to keep track of your earnings as a creator business owner.
              </p>
            </div>
            <div
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.15)',
                borderRadius: '8px',
                padding: '24px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1)',
                position: 'relative',
              }}
            >
              {/* Brand Buttons Row 1 */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
                }}
              >
                <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap">
                  Coca-cola
                </button>
                <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap">
                  Honeywell
                </button>
                <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap">
                  Golden penny
                </button>
              </div>

              {/* Brand Buttons Row 2 */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
                }}
              >
                <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap">
                  Nestlé
                </button>
                <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap">
                  Dangote
                </button>
                <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap">
                  Konga
                </button>
              </div>

              {/* Brand Buttons Row 3 */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
                }}
              >
                <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap">
                  Chicken Republic
                </button>
                <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap">
                  Paystack
                </button>
              </div>

              {/* Vertical Divider Line with Arrow */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: '1px',
                    height: '50px',
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  }}
                ></div>
                <span
                  style={{
                    fontSize: '24px',
                    color: 'rgba(255, 255, 255, 0.4)',
                    lineHeight: '1',
                  }}
                >
                  ↓
                </span>
              </div>

              {/* YOU Section - AVATAR INSIDE BUTTON */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '50px',
                  padding: '6px 12px',
                  height: 'fit-content',
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src="/who we are/Avatar.webp"
                    alt="User"
                    width={28}
                    height={28}
                    style={{
                      borderRadius: '50%',
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </div>
                <span className="text-gray-900 text-xs font-semibold whitespace-nowrap">YOU</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
