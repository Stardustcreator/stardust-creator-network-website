'use client';

import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import { useEffect } from 'react';

export default function PricingCalculatorPage() {
  useEffect(() => {
    // Initialize calculator on mount
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.innerHTML = `
        const formatter = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 });

        function getBase(folId, engId, cpmId) {
            const fol = parseFloat(document.getElementById(folId).value) || 0;
            const eng = parseFloat(document.getElementById(engId).value) || 0;
            const cpm = parseFloat(document.getElementById(cpmId).value) || 0;
            
            let engMult = 1;
            if (eng > 0) {
                if (eng < 2) engMult = 0.8;
                else if (eng > 5) engMult = 1.2;
            }
            return (fol / 1000) * cpm * engMult;
        }

        function calculate() {
            // 1. Calculate Base Rates
            const igBase = getBase('igFol', 'igEng', 'igCpm');
            const tkBase = getBase('tkFol', 'tkEng', 'tkCpm');
            const ytBase = getBase('ytFol', 'ytEng', 'ytCpm');
            const twBase = getBase('twFol', 'twEng', 'twCpm');
            const ugcBase = parseFloat(document.getElementById('ugcBaseRate').value) || 0;

            // 2. Calculate Deliverables
            const igTotal = (parseFloat(document.getElementById('igFeedQty').value) || 0) * (igBase * 1.0) +
                            (parseFloat(document.getElementById('igReelQty').value) || 0) * (igBase * 1.2) +
                            (parseFloat(document.getElementById('igStoryQty').value) || 0) * (igBase * 0.4) +
                            (parseFloat(document.getElementById('igBrandQty').value) || 0) * (igBase * 0.6);

            const tkTotal = (parseFloat(document.getElementById('tkVideoQty').value) || 0) * (tkBase * 1.2) +
                            (parseFloat(document.getElementById('tkBrandQty').value) || 0) * (tkBase * 0.6);

            const ytTotal = (parseFloat(document.getElementById('ytShortQty').value) || 0) * (ytBase * 1.2) +
                            (parseFloat(document.getElementById('ytLongQty').value) || 0) * (ytBase * 3.0) +
                            (parseFloat(document.getElementById('ytBrandQty').value) || 0) * (ytBase * 0.6);

            const twTotal = (parseFloat(document.getElementById('twTweetQty').value) || 0) * (twBase * 0.5) +
                            (parseFloat(document.getElementById('twBrandQty').value) || 0) * (twBase * 0.6);

            const ugcTotal = (parseFloat(document.getElementById('ugcQty').value) || 0) * ugcBase;

            const subtotal = igTotal + tkTotal + ytTotal + twTotal + ugcTotal;

            // 3. Licensing Math
            const durationMult = parseFloat(document.getElementById('usageDuration').value);
            const isFullIp = document.getElementById('licIp').checked;
            
            let licensingFee = 0;

            if (isFullIp) {
                // Full IP Overrides everything
                licensingFee = subtotal * 1.5;
            } else {
                // Calculate individual toggles based on duration
                const wantAds = document.getElementById('licAds').checked;
                const wantEmail = document.getElementById('licEmail').checked;
                const wantOoh = document.getElementById('licOoh').checked;

                if (wantAds) licensingFee += (subtotal * 0.20 * durationMult);
                if (wantEmail) licensingFee += (subtotal * 0.10 * durationMult);
                if (wantOoh) licensingFee += (subtotal * 0.50 * durationMult);
            }

            // 4. Discounts & Final Math
            const totalBeforeDiscount = subtotal + licensingFee;
            const discountPercent = parseFloat(document.getElementById('discount').value) || 0;
            const discountAmount = totalBeforeDiscount * (discountPercent / 100);
            const finalTotal = totalBeforeDiscount - discountAmount;

            // 5. Update UI
            document.getElementById('subtotalDisplay').innerText = formatter.format(subtotal);
            document.getElementById('usageFeeDisplay').innerText = \`+ \${formatter.format(licensingFee)}\`;
            document.getElementById('discountDisplay').innerText = \`- \${formatter.format(discountAmount)}\`;
            document.getElementById('finalTotalDisplay').innerText = formatter.format(finalTotal);
        }

        window.calculate = calculate;
      `;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <Header />
      <main className="relative min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black py-20 md:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute -inset-y-12 -left-1/4 w-3/4 bg-gradient-to-br from-purple-600/10 via-purple-400/5 to-transparent blur-3xl" />
        <div className="absolute -inset-y-12 -right-1/4 w-3/4 bg-gradient-to-bl from-pink-600/10 via-pink-400/5 to-transparent blur-3xl" />

        <div className="container relative mx-auto px-4 sm:px-6 max-w-5xl">
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4 md:mb-6">
              Creator Pricing Calculator
            </h1>
            <p className="text-xl sm:text-2xl text-white font-medium mb-4">
              Stop guessing your rates. Use a structured system to calculate what your work is
              actually worth.
            </p>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
              This tool helps you estimate your pricing based on your audience, deliverables, and
              usage rights so you can confidently price brand deals and partnerships.
            </p>
          </div>

          {/* Calculator Container */}
          <div
            className="calculator-container relative"
            style={{
              background:
                'linear-gradient(135deg, rgba(23, 23, 23, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)',
              padding: '30px',
              borderRadius: '12px',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              boxShadow: '0 10px 25px rgba(139, 92, 246, 0.1), 0 0 60px rgba(236, 72, 153, 0.05)',
              maxWidth: '900px',
              width: '100%',
              margin: '0 auto',
              backdropFilter: 'blur(20px)',
            }}
          >
            <style jsx>{`
              .calculator-container h2 {
                margin-top: 0;
                border-bottom: 2px solid rgba(139, 92, 246, 0.3);
                padding-bottom: 12px;
                font-size: 20px;
                color: #ffffff;
                font-weight: 600;
                background: linear-gradient(to right, #c084fc, #ec4899);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
              }
              .section {
                margin-bottom: 30px;
              }

              .engine-grid {
                display: grid;
                grid-template-columns: 120px 1fr 1fr 1fr;
                gap: 15px;
                align-items: center;
                margin-bottom: 12px;
              }

              @media (max-width: 768px) {
                .engine-grid {
                  grid-template-columns: 1fr;
                  gap: 10px;
                }
                .engine-header {
                  display: none;
                }
              }

              .engine-header {
                font-weight: 600;
                font-size: 12px;
                color: #ffffff;
                text-transform: uppercase;
                opacity: 0.9;
                margin-top: 20px;
                padding-top: 5px;
              }
              .input-box {
                width: 100%;
                padding: 10px 12px;
                border: 1px solid rgba(139, 92, 246, 0.3);
                border-radius: 8px;
                box-sizing: border-box;
                font-size: 15px;
                background-color: rgba(23, 23, 23, 0.6);
                color: #ffffff;
                transition: all 0.2s;
              }
              .input-box:focus {
                outline: none;
                border-color: rgba(168, 85, 247, 0.6);
                background-color: rgba(23, 23, 23, 0.9);
                box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
              }
              .input-box::placeholder {
                color: #d1d5db;
              }
              .platform-label {
                font-weight: bold;
                font-size: 16px;
                text-shadow: 0 0 20px currentColor;
                color: #ffffff;
              }

              .ugc-setup-box {
                background: linear-gradient(
                  135deg,
                  rgba(139, 92, 246, 0.1) 0%,
                  rgba(236, 72, 153, 0.05) 100%
                );
                border-left: 4px solid #a855f7;
                border-radius: 8px;
                padding: 20px;
                margin-top: 20px;
                display: flex;
                flex-direction: column;
                gap: 15px;
                border: 1px solid rgba(139, 92, 246, 0.2);
              }

              @media (min-width: 768px) {
                .ugc-setup-box {
                  flex-direction: row;
                  justify-content: space-between;
                  align-items: center;
                }
              }

              .deliv-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 20px;
              }

              @media (min-width: 768px) {
                .deliv-grid {
                  grid-template-columns: 1fr 1fr;
                }
              }

              .deliv-card {
                border: 1px solid rgba(139, 92, 246, 0.2);
                border-radius: 12px;
                padding: 20px;
                background: linear-gradient(
                  135deg,
                  rgba(23, 23, 23, 0.6) 0%,
                  rgba(10, 10, 10, 0.8) 100%
                );
                transition: all 0.3s;
              }
              .deliv-card:hover {
                border-color: rgba(168, 85, 247, 0.4);
                box-shadow: 0 4px 20px rgba(139, 92, 246, 0.15);
              }
              .deliv-card h3 {
                margin: 0 0 15px 0;
                font-size: 17px;
                font-weight: 600;
                border-bottom: 1px solid rgba(139, 92, 246, 0.2);
                padding-bottom: 10px;
                color: #ffffff;
              }
              .deliv-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 12px;
                gap: 10px;
              }
              .deliv-row label {
                font-size: 14px;
                font-weight: 500;
                color: #ffffff;
              }
              .deliv-row input[type='number'] {
                width: 70px;
                padding: 8px;
                border: 1px solid rgba(139, 92, 246, 0.3);
                border-radius: 6px;
                text-align: center;
                flex-shrink: 0;
                background-color: rgba(23, 23, 23, 0.6);
                color: #ffffff;
                font-weight: 600;
              }
              .deliv-row input[type='number']:focus {
                outline: none;
                border-color: rgba(168, 85, 247, 0.6);
                box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.1);
              }

              .license-box {
                background: linear-gradient(
                  135deg,
                  rgba(59, 130, 246, 0.08) 0%,
                  rgba(139, 92, 246, 0.08) 100%
                );
                border: 1px solid rgba(96, 165, 250, 0.2);
                border-radius: 12px;
                padding: 20px;
              }
              .license-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
                gap: 15px;
              }
              .license-row label {
                font-weight: 500;
                font-size: 15px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 10px;
                color: #ffffff;
              }
              .license-row select {
                padding: 8px 12px;
                border-radius: 8px;
                border: 1px solid rgba(139, 92, 246, 0.3);
                font-size: 14px;
                background-color: rgba(23, 23, 23, 0.6);
                color: #ffffff;
                font-weight: 500;
              }
              .license-row select:focus {
                outline: none;
                border-color: rgba(168, 85, 247, 0.6);
              }
              input[type='checkbox'] {
                width: 18px;
                height: 18px;
                cursor: pointer;
                flex-shrink: 0;
                accent-color: #a855f7;
              }

              .summary-box {
                background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
                color: #ffffff;
                padding: 25px;
                border-radius: 12px;
                margin-top: 20px;
                border: 1px solid rgba(139, 92, 246, 0.3);
                box-shadow: 0 0 30px rgba(139, 92, 246, 0.2);
              }
              .summary-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 12px;
                font-size: 16px;
                gap: 15px;
              }
              .final-quote {
                font-size: 28px;
                font-weight: bold;
                background: linear-gradient(to right, #4ade80, #22d3ee);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                border-top: 1px dashed rgba(139, 92, 246, 0.4);
                padding-top: 20px;
                margin-top: 15px;
              }

              @media (max-width: 640px) {
                .summary-row {
                  font-size: 14px;
                }
                .final-quote {
                  font-size: 20px;
                }
              }
            `}</style>

            <h2>1. The Engine (Base Values & UGC Rate)</h2>
            <div className="section">
              <div className="engine-grid engine-header">
                <div>Platform</div>
                <div>Followers</div>
                <div>Eng Rate (%)</div>
                <div>Rate per 1k (₦)</div>
              </div>

              <div className="engine-grid">
                <div
                  className="platform-label"
                  style={{ color: '#ff4da6' }}
                >
                  Instagram
                </div>
                <input
                  type="number"
                  className="input-box"
                  id="igFol"
                  placeholder="0"
                  onInput={() => (window as any).calculate()}
                />
                <input
                  type="number"
                  className="input-box"
                  id="igEng"
                  placeholder="0"
                  onInput={() => (window as any).calculate()}
                />
                <input
                  type="number"
                  className="input-box"
                  id="igCpm"
                  placeholder="e.g. 5000"
                  onInput={() => (window as any).calculate()}
                />
              </div>

              <div className="engine-grid">
                <div
                  className="platform-label"
                  style={{ color: '#ffffff' }}
                >
                  TikTok
                </div>
                <input
                  type="number"
                  className="input-box"
                  id="tkFol"
                  placeholder="0"
                  onInput={() => (window as any).calculate()}
                />
                <input
                  type="number"
                  className="input-box"
                  id="tkEng"
                  placeholder="0"
                  onInput={() => (window as any).calculate()}
                />
                <input
                  type="number"
                  className="input-box"
                  id="tkCpm"
                  placeholder="e.g. 4000"
                  onInput={() => (window as any).calculate()}
                />
              </div>

              <div className="engine-grid">
                <div
                  className="platform-label"
                  style={{ color: '#ff4444' }}
                >
                  YouTube
                </div>
                <input
                  type="number"
                  className="input-box"
                  id="ytFol"
                  placeholder="0"
                  onInput={() => (window as any).calculate()}
                />
                <input
                  type="number"
                  className="input-box"
                  id="ytEng"
                  placeholder="0"
                  onInput={() => (window as any).calculate()}
                />
                <input
                  type="number"
                  className="input-box"
                  id="ytCpm"
                  placeholder="e.g. 8000"
                  onInput={() => (window as any).calculate()}
                />
              </div>

              <div className="engine-grid">
                <div
                  className="platform-label"
                  style={{ color: '#5dccff' }}
                >
                  Twitter (X)
                </div>
                <input
                  type="number"
                  className="input-box"
                  id="twFol"
                  placeholder="0"
                  onInput={() => (window as any).calculate()}
                />
                <input
                  type="number"
                  className="input-box"
                  id="twEng"
                  placeholder="0"
                  onInput={() => (window as any).calculate()}
                />
                <input
                  type="number"
                  className="input-box"
                  id="twCpm"
                  placeholder="e.g. 3000"
                  onInput={() => (window as any).calculate()}
                />
              </div>

              <div className="ugc-setup-box">
                <div>
                  <strong style={{ color: '#ffffff', fontSize: '16px' }}>
                    My Flat UGC Production Fee (₦)
                  </strong>
                  <br />
                  <small style={{ color: '#e5e7eb', fontSize: '13px' }}>
                    Fixed rate per video (not tied to followers)
                  </small>
                </div>
                <input
                  type="number"
                  className="input-box"
                  id="ugcBaseRate"
                  placeholder="e.g. 50000"
                  style={{ width: '100%', maxWidth: '200px' }}
                  onInput={() => (window as any).calculate()}
                />
              </div>
            </div>

            <h2>2. Deliverables (Quantity)</h2>
            <div className="section deliv-grid">
              <div className="deliv-card">
                <h3 style={{ color: '#ff4da6' }}>Instagram</h3>
                <div className="deliv-row">
                  <label>Feed Post (1.0x)</label>
                  <input
                    type="number"
                    id="igFeedQty"
                    min="0"
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                </div>
                <div className="deliv-row">
                  <label>Reel (1.2x)</label>
                  <input
                    type="number"
                    id="igReelQty"
                    min="0"
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                </div>
                <div className="deliv-row">
                  <label>Story (0.4x)</label>
                  <input
                    type="number"
                    id="igStoryQty"
                    min="0"
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                </div>
                <div className="deliv-row">
                  <label>Brand-Provided (0.6x)</label>
                  <input
                    type="number"
                    id="igBrandQty"
                    min="0"
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                </div>
              </div>

              <div className="deliv-card">
                <h3 style={{ color: '#ffffff' }}>TikTok</h3>
                <div className="deliv-row">
                  <label>TikTok Video (1.2x)</label>
                  <input
                    type="number"
                    id="tkVideoQty"
                    min="0"
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                </div>
                <div className="deliv-row">
                  <label>Brand-Provided (0.6x)</label>
                  <input
                    type="number"
                    id="tkBrandQty"
                    min="0"
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                </div>
              </div>

              <div className="deliv-card">
                <h3 style={{ color: '#ff4444' }}>YouTube</h3>
                <div className="deliv-row">
                  <label>YT Short (1.2x)</label>
                  <input
                    type="number"
                    id="ytShortQty"
                    min="0"
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                </div>
                <div className="deliv-row">
                  <label>Long-Form Dedicated (3.0x)</label>
                  <input
                    type="number"
                    id="ytLongQty"
                    min="0"
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                </div>
                <div className="deliv-row">
                  <label>Brand-Provided (0.6x)</label>
                  <input
                    type="number"
                    id="ytBrandQty"
                    min="0"
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                </div>
              </div>

              <div className="deliv-card">
                <h3 style={{ color: '#5dccff' }}>Twitter & UGC</h3>
                <div className="deliv-row">
                  <label>Tweet / Thread (0.5x)</label>
                  <input
                    type="number"
                    id="twTweetQty"
                    min="0"
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                </div>
                <div className="deliv-row">
                  <label>TW Brand-Provided (0.6x)</label>
                  <input
                    type="number"
                    id="twBrandQty"
                    min="0"
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                </div>
                <div
                  className="deliv-row"
                  style={{ marginTop: '15px', borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}
                >
                  <label style={{ color: '#c084fc', fontWeight: 'bold' }}>
                    UGC Video (Raw File)
                  </label>
                  <input
                    type="number"
                    id="ugcQty"
                    min="0"
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                </div>
              </div>
            </div>

            <h2>3. Licensing & Deal Closing</h2>
            <div className="section license-box">
              <div
                className="license-row"
                style={{ borderBottom: '1px solid rgba(96, 165, 250, 0.3)', paddingBottom: '15px' }}
              >
                <label style={{ fontWeight: 'bold', color: '#ffffff', fontSize: '15px' }}>
                  Usage Duration (Months):
                </label>
                <select
                  id="usageDuration"
                  onChange={() => (window as any).calculate()}
                >
                  <option value="0">None</option>
                  <option value="1">3 Months (1.0x)</option>
                  <option value="1.5">6 Months (1.5x)</option>
                  <option value="2">12 Months (2.0x)</option>
                </select>
              </div>

              <div
                className="license-row"
                style={{ marginTop: '15px' }}
              >
                <label>
                  <input
                    type="checkbox"
                    id="licAds"
                    onChange={() => (window as any).calculate()}
                  />{' '}
                  Ads on Paid Social (+20%)
                </label>
              </div>
              <div className="license-row">
                <label>
                  <input
                    type="checkbox"
                    id="licEmail"
                    onChange={() => (window as any).calculate()}
                  />{' '}
                  Email / Website (+10%)
                </label>
              </div>
              <div className="license-row">
                <label>
                  <input
                    type="checkbox"
                    id="licOoh"
                    onChange={() => (window as any).calculate()}
                  />{' '}
                  In-Store / Billboards (+50%)
                </label>
              </div>
              <div
                className="license-row"
                style={{
                  marginTop: '15px',
                  borderTop: '1px dashed rgba(96, 165, 250, 0.3)',
                  paddingTop: '15px',
                }}
              >
                <label style={{ color: '#fca5a5', fontWeight: 'bold' }}>
                  <input
                    type="checkbox"
                    id="licIp"
                    onChange={() => (window as any).calculate()}
                  />{' '}
                  Full IP Buyout (Overrides all, +150%)
                </label>
              </div>

              <div
                className="license-row"
                style={{
                  marginTop: '20px',
                  borderTop: '1px solid rgba(96, 165, 250, 0.3)',
                  paddingTop: '20px',
                }}
              >
                <label style={{ fontWeight: 'bold', color: '#ffffff' }}>Client Discount (%)</label>
                <input
                  type="number"
                  className="input-box"
                  id="discount"
                  placeholder="e.g. 10"
                  min="0"
                  max="100"
                  style={{ width: '120px', textAlign: 'center' }}
                  onInput={() => (window as any).calculate()}
                />
              </div>
            </div>

            <div className="summary-box">
              <div className="summary-row">
                <span style={{ color: '#ffffff' }}>Subtotal (All Deliverables):</span>
                <span
                  id="subtotalDisplay"
                  style={{ fontWeight: '600', color: '#ffffff' }}
                >
                  ₦0
                </span>
              </div>
              <div className="summary-row">
                <span style={{ color: '#ffffff' }}>Licensing & Usage Fees:</span>
                <span
                  id="usageFeeDisplay"
                  style={{ fontWeight: '600', color: '#93c5fd' }}
                >
                  + ₦0
                </span>
              </div>
              <div className="summary-row">
                <span style={{ color: '#ffffff' }}>Discount Applied:</span>
                <span
                  id="discountDisplay"
                  style={{ fontWeight: '600', color: '#fca5a5' }}
                >
                  - ₦0
                </span>
              </div>
              <div className="summary-row final-quote">
                <span style={{ letterSpacing: '0.5px' }}>FINAL CUSTOM QUOTE:</span>
                <span id="finalTotalDisplay">₦0</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
