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

        function toggleCampaign() {
            const type = document.getElementById('campaignType').value;
            
            // Hide/Show Content Groups
            document.getElementById('group_creator').classList.remove('active');
            document.getElementById('group_ugc').classList.remove('active');
            document.getElementById('group_brand').classList.remove('active');

            if (type === 'creator') document.getElementById('group_creator').classList.add('active');
            if (type === 'ugc') document.getElementById('group_ugc').classList.add('active');
            if (type === 'brand') document.getElementById('group_brand').classList.add('active');

            // Toggle visibility of the Engine sections
            document.getElementById('platformEngineBox').style.display = (type === 'ugc') ? 'none' : 'block';
            document.getElementById('ugcEngineBox').style.display = (type === 'ugc') ? 'flex' : 'none';
        }

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

        function getVal(id) { return parseFloat(document.getElementById(id).value) || 0; }

        function calculate() {
            // 1. Calculate Bases & Update Display UI
            const igBase = getBase('igFol', 'igEng', 'igCpm');
            const tkBase = getBase('tkFol', 'tkEng', 'tkCpm');
            const ytBase = getBase('ytFol', 'ytEng', 'ytCpm');
            const twBase = getBase('twFol', 'twEng', 'twCpm');
            const ugcBase = getVal('ugcBaseRate');

            document.getElementById('igBaseDisplay').innerText = formatter.format(igBase);
            document.getElementById('tkBaseDisplay').innerText = formatter.format(tkBase);
            document.getElementById('ytBaseDisplay').innerText = formatter.format(ytBase);
            document.getElementById('twBaseDisplay').innerText = formatter.format(twBase);

            const type = document.getElementById('campaignType').value;
            let subtotal = 0;

            // 2. Calculate Active Content Requirements
            if (type === 'creator') {
                subtotal += getVal('q_igReel') * getVal('m_igReel') * igBase;
                subtotal += getVal('q_igStory') * getVal('m_igStory') * igBase;
                subtotal += getVal('q_tkVid') * getVal('m_tkVid') * tkBase;
                subtotal += getVal('q_ytShort') * getVal('m_ytShort') * ytBase;
                subtotal += getVal('q_ytLong') * getVal('m_ytLong') * ytBase;
                subtotal += getVal('q_twPost') * getVal('m_twPost') * twBase;
            } 
            else if (type === 'ugc') {
                subtotal += getVal('q_ugcV') * getVal('m_ugcV') * ugcBase;
                subtotal += getVal('q_ugcLong') * getVal('m_ugcLong') * ugcBase;
                subtotal += getVal('q_ugcP') * getVal('m_ugcP') * ugcBase;
            } 
            else if (type === 'brand') {
                subtotal += getVal('q_bpIg') * getVal('m_bpIg') * igBase;
                subtotal += getVal('q_bpTk') * getVal('m_bpTk') * tkBase;
                subtotal += getVal('q_bpTw') * getVal('m_bpTw') * twBase;
            }

            // 3. Exclusivity
            let addonsFee = 0;
            addonsFee += subtotal * (getVal('pct_excl') / 100) * getVal('q_excl'); 

            // 4. Usage Rights
            const durationMult = parseFloat(document.getElementById('usageDuration').value);
            const isIp = document.getElementById('chk_ip').checked;
            let rightsFee = 0;

            if (isIp) {
                rightsFee = subtotal * (getVal('pct_ip') / 100);
            } else {
                if (document.getElementById('chk_ads').checked) rightsFee += subtotal * (getVal('pct_ads') / 100) * durationMult;
                if (document.getElementById('chk_email').checked) rightsFee += subtotal * (getVal('pct_email') / 100) * durationMult;
                if (document.getElementById('chk_ooh').checked) rightsFee += subtotal * (getVal('pct_ooh') / 100) * durationMult;
            }

            const totalLicensing = addonsFee + rightsFee;

            // 5. Discount & Final Math
            const totalBeforeDiscount = subtotal + totalLicensing;
            const discountAmount = totalBeforeDiscount * (getVal('discount') / 100);
            const finalTotal = totalBeforeDiscount - discountAmount;

            // 6. Update Final UI
            document.getElementById('subtotalDisplay').innerText = formatter.format(subtotal);
            document.getElementById('usageFeeDisplay').innerText = \`+ \${formatter.format(totalLicensing)}\`;
            document.getElementById('discountDisplay').innerText = \`- \${formatter.format(discountAmount)}\`;
            document.getElementById('finalTotalDisplay').innerText = formatter.format(finalTotal);
        }

        window.calculate = calculate;
        window.toggleCampaign = toggleCampaign;
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
              Creator Pricing & Proposal Generator
            </h1>
            <p className="text-xl sm:text-2xl text-white font-medium mb-4">
              Move beyond guesswork. Build structured, defensible pricing for brand deals and
              partnerships.
            </p>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
              This tool helps you calculate your value, structure deliverables, and price usage
              rights, licensing, and exclusivity like a professional creator.
            </p>
          </div>

          {/* Calculator Container */}
          <div
            className="calculator-container relative"
            style={{
              background: '#ffffff',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
              maxWidth: '950px',
              width: '100%',
              margin: '0 auto',
              color: '#0f172a',
            }}
          >
            <style jsx>{`
              :root {
                --primary: #2563eb;
                --bg: #f8fafc;
                --card-bg: #ffffff;
                --text: #0f172a;
                --border: #cbd5e1;
                --ig: #e1306c;
                --tt: #000000;
                --yt: #ff0000;
                --tw: #1da1f2;
                --ugc: #8b5cf6;
                --highlight: #fef3c7;
              }

              .calculator-container h2 {
                margin-top: 0;
                border-bottom: 2px solid var(--border);
                padding-bottom: 10px;
                font-size: 20px;
                color: #334155;
              }
              .section {
                margin-bottom: 30px;
              }

              /* Master Toggle */
              .master-toggle-box {
                background: var(--highlight);
                padding: 20px;
                border-radius: 8px;
                border: 1px solid #fde68a;
                margin-bottom: 30px;
                text-align: center;
              }
              .master-toggle-box select {
                padding: 12px;
                font-size: 16px;
                font-weight: bold;
                border-radius: 8px;
                border: 2px solid #d97706;
                cursor: pointer;
                width: 80%;
                max-width: 450px;
                background: #fff;
                color: #0f172a;
              }

              /* Engine Grid */
              .engine-grid {
                display: grid;
                grid-template-columns: 120px 1fr 1fr 1fr 120px;
                gap: 15px;
                align-items: center;
                margin-bottom: 12px;
              }
              .engine-header {
                font-weight: 600;
                font-size: 12px;
                color: #64748b;
                text-transform: uppercase;
              }
              .input-box {
                width: 100%;
                padding: 10px;
                border: 1px solid var(--border);
                border-radius: 6px;
                box-sizing: border-box;
                font-size: 15px;
                background-color: #f1f5f9;
                color: #0f172a;
              }
              .input-box:focus {
                outline: none;
                border-color: var(--primary);
                background-color: #fff;
                color: #0f172a;
              }
              .platform-label {
                font-weight: bold;
                font-size: 15px;
                color: #0f172a;
              }

              /* Base Display Column */
              .base-display {
                font-weight: bold;
                color: #10b981;
                font-size: 15px;
                text-align: right;
                background: #ecfdf5;
                padding: 10px;
                border-radius: 6px;
                border: 1px solid #a7f3d0;
              }

              /* UGC Setup */
              .ugc-setup-box {
                background: #f3f4f6;
                border-left: 4px solid var(--ugc);
                padding: 15px;
                border-radius: 6px;
                display: none;
                justify-content: space-between;
                align-items: center;
              }

              /* Deliverables List */
              .deliv-group {
                display: none;
              }
              .deliv-group.active {
                display: block;
              }

              .deliv-header {
                display: grid;
                grid-template-columns: 2fr 1fr 1fr;
                gap: 15px;
                font-weight: bold;
                font-size: 13px;
                color: #64748b;
                text-transform: uppercase;
                margin-bottom: 10px;
                border-bottom: 1px solid var(--border);
                padding-bottom: 5px;
              }
              .deliv-row {
                display: grid;
                grid-template-columns: 2fr 1fr 1fr;
                gap: 15px;
                align-items: center;
                margin-bottom: 12px;
                background: #f8fafc;
                padding: 10px;
                border-radius: 6px;
                border: 1px solid #e2e8f0;
              }
              .deliv-row label {
                font-size: 15px;
                font-weight: 500;
              }
              .deliv-row .std-text {
                font-size: 12px;
                color: #94a3b8;
                display: block;
              }
              .deliv-row input {
                padding: 8px;
                border: 1px solid var(--border);
                border-radius: 6px;
                text-align: center;
                font-size: 15px;
                color: #0f172a;
              }

              /* Licensing Section */
              .license-box {
                background: #eff6ff;
                border: 1px solid #bfdbfe;
                border-radius: 8px;
                padding: 20px;
              }
              .lic-grid-header {
                display: grid;
                grid-template-columns: 2fr 1fr 1fr;
                gap: 15px;
                font-weight: bold;
                font-size: 13px;
                color: #1e3a8a;
                margin-bottom: 15px;
                border-bottom: 1px solid #bfdbfe;
                padding-bottom: 5px;
              }
              .license-row {
                display: grid;
                grid-template-columns: 2fr 1fr 1fr;
                gap: 15px;
                align-items: center;
                margin-bottom: 12px;
              }
              .license-row label {
                font-weight: 500;
                font-size: 15px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 10px;
              }
              .license-row input[type='number'] {
                padding: 8px;
                border: 1px solid var(--border);
                border-radius: 6px;
                text-align: center;
                font-size: 14px;
                color: #0f172a;
              }
              .license-row select {
                padding: 8px;
                border-radius: 6px;
                border: 1px solid var(--border);
                color: #0f172a;
              }
              input[type='checkbox'] {
                width: 18px;
                height: 18px;
                cursor: pointer;
              }

              /* Summary Box */
              .summary-box {
                background: #0f172a;
                color: #ffffff;
                padding: 25px;
                border-radius: 12px;
                margin-top: 20px;
              }
              .summary-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 12px;
                font-size: 16px;
              }
              .final-quote {
                font-size: 28px;
                font-weight: bold;
                color: #4ade80;
                border-top: 1px dashed #475569;
                padding-top: 20px;
                margin-top: 15px;
              }

              @media (max-width: 768px) {
                .engine-grid {
                  grid-template-columns: 1fr;
                }
                .deliv-header {
                  display: none;
                }
                .deliv-row {
                  grid-template-columns: 1fr;
                  gap: 8px;
                }
                .lic-grid-header {
                  display: none;
                }
                .license-row {
                  grid-template-columns: 1fr;
                  gap: 8px;
                }
              }
            `}</style>

            <div className="master-toggle-box">
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  color: '#92400e',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                }}
              >
                1. SELECT CAMPAIGN TYPE:
              </label>
              <select
                id="campaignType"
                onChange={() => {
                  (window as any).toggleCampaign();
                  (window as any).calculate();
                }}
              >
                <option value="creator">Creator Posts (I create and post on my page)</option>
                <option value="ugc">UGC Only (I create raw files, brand posts them)</option>
                <option value="brand">Brand-Provided (Brand gives me content, I post it)</option>
              </select>
            </div>

            <h2>2. Your Base Rates</h2>
            <div className="section">
              <div id="platformEngineBox">
                <div className="engine-grid engine-header">
                  <div>Platform</div>
                  <div>Followers</div>
                  <div>Eng Rate (%)</div>
                  <div>Rate per 1k (₦)</div>
                  <div style={{ textAlign: 'right' }}>Calculated Base</div>
                </div>

                <div className="engine-grid">
                  <div
                    className="platform-label"
                    style={{ color: 'var(--ig)' }}
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
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                  <div
                    className="base-display"
                    id="igBaseDisplay"
                  >
                    ₦0
                  </div>
                </div>

                <div className="engine-grid">
                  <div
                    className="platform-label"
                    style={{ color: 'var(--tt)' }}
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
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                  <div
                    className="base-display"
                    id="tkBaseDisplay"
                  >
                    ₦0
                  </div>
                </div>

                <div className="engine-grid">
                  <div
                    className="platform-label"
                    style={{ color: 'var(--yt)' }}
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
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                  <div
                    className="base-display"
                    id="ytBaseDisplay"
                  >
                    ₦0
                  </div>
                </div>

                <div className="engine-grid">
                  <div
                    className="platform-label"
                    style={{ color: 'var(--tw)' }}
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
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                  <div
                    className="base-display"
                    id="twBaseDisplay"
                  >
                    ₦0
                  </div>
                </div>
              </div>

              <div
                className="ugc-setup-box"
                id="ugcEngineBox"
              >
                <div>
                  <strong style={{ color: 'var(--ugc)' }}>My Flat UGC Production Fee (₦)</strong>
                  <br />
                  <small style={{ color: '#6b7280' }}>Fixed creation rate.</small>
                </div>
                <input
                  type="number"
                  className="input-box"
                  id="ugcBaseRate"
                  placeholder="0"
                  style={{ width: '200px' }}
                  onInput={() => (window as any).calculate()}
                />
              </div>
            </div>

            <h2>3. Content Requirements (Quantities & Multipliers)</h2>
            <div className="section">
              <div
                id="group_creator"
                className="deliv-group active"
              >
                <div className="deliv-header">
                  <div>Content Type</div>
                  <div>My Multiplier</div>
                  <div>Quantity</div>
                </div>

                <div className="deliv-row">
                  <label style={{ color: 'var(--ig)' }}>
                    IG Reel <span className="std-text">Industry Standard: 1.2x</span>
                  </label>
                  <input
                    type="number"
                    id="m_igReel"
                    placeholder="0"
                    step="0.1"
                    onInput={() => (window as any).calculate()}
                  />
                  <input
                    type="number"
                    id="q_igReel"
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                </div>
                <div className="deliv-row">
                  <label style={{ color: 'var(--ig)' }}>
                    IG Story <span className="std-text">Industry Standard: 0.4x</span>
                  </label>
                  <input
                    type="number"
                    id="m_igStory"
                    placeholder="0"
                    step="0.1"
                    onInput={() => (window as any).calculate()}
                  />
                  <input
                    type="number"
                    id="q_igStory"
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                </div>
                <div className="deliv-row">
                  <label style={{ color: 'var(--tt)' }}>
                    TikTok Video <span className="std-text">Industry Standard: 1.2x</span>
                  </label>
                  <input
                    type="number"
                    id="m_tkVid"
                    placeholder="0"
                    step="0.1"
                    onInput={() => (window as any).calculate()}
                  />
                  <input
                    type="number"
                    id="q_tkVid"
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                </div>
                <div className="deliv-row">
                  <label style={{ color: 'var(--yt)' }}>
                    YT Short <span className="std-text">Industry Standard: 1.2x</span>
                  </label>
                  <input
                    type="number"
                    id="m_ytShort"
                    placeholder="0"
                    step="0.1"
                    onInput={() => (window as any).calculate()}
                  />
                  <input
                    type="number"
                    id="q_ytShort"
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                </div>
                <div className="deliv-row">
                  <label style={{ color: 'var(--yt)' }}>
                    YT Long-Form Video <span className="std-text">Industry Standard: 3.0x</span>
                  </label>
                  <input
                    type="number"
                    id="m_ytLong"
                    placeholder="0"
                    step="0.1"
                    onInput={() => (window as any).calculate()}
                  />
                  <input
                    type="number"
                    id="q_ytLong"
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                </div>
                <div className="deliv-row">
                  <label style={{ color: 'var(--tw)' }}>
                    Twitter (X) Post <span className="std-text">Industry Standard: 0.5x</span>
                  </label>
                  <input
                    type="number"
                    id="m_twPost"
                    placeholder="0"
                    step="0.1"
                    onInput={() => (window as any).calculate()}
                  />
                  <input
                    type="number"
                    id="q_twPost"
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                </div>
              </div>

              <div
                id="group_ugc"
                className="deliv-group"
              >
                <div className="deliv-header">
                  <div>Content Type</div>
                  <div>My Multiplier</div>
                  <div>Quantity</div>
                </div>

                <div className="deliv-row">
                  <label style={{ color: 'var(--ugc)' }}>
                    UGC Short-Form Video{' '}
                    <span className="std-text">Industry Standard: 1.0x (of UGC Base)</span>
                  </label>
                  <input
                    type="number"
                    id="m_ugcV"
                    placeholder="0"
                    step="0.1"
                    onInput={() => (window as any).calculate()}
                  />
                  <input
                    type="number"
                    id="q_ugcV"
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                </div>
                <div className="deliv-row">
                  <label style={{ color: 'var(--ugc)' }}>
                    UGC Long-Form Video{' '}
                    <span className="std-text">Industry Standard: 3.0x (of UGC Base)</span>
                  </label>
                  <input
                    type="number"
                    id="m_ugcLong"
                    placeholder="0"
                    step="0.1"
                    onInput={() => (window as any).calculate()}
                  />
                  <input
                    type="number"
                    id="q_ugcLong"
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                </div>
                <div className="deliv-row">
                  <label style={{ color: 'var(--ugc)' }}>
                    UGC Photos{' '}
                    <span className="std-text">Industry Standard: 0.5x (of UGC Base)</span>
                  </label>
                  <input
                    type="number"
                    id="m_ugcP"
                    placeholder="0"
                    step="0.1"
                    onInput={() => (window as any).calculate()}
                  />
                  <input
                    type="number"
                    id="q_ugcP"
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                </div>
              </div>

              <div
                id="group_brand"
                className="deliv-group"
              >
                <div className="deliv-header">
                  <div>Content Type</div>
                  <div>My Multiplier</div>
                  <div>Quantity</div>
                </div>

                <div className="deliv-row">
                  <label style={{ color: 'var(--ig)' }}>
                    IG Brand-Provided Post <span className="std-text">Industry Standard: 0.6x</span>
                  </label>
                  <input
                    type="number"
                    id="m_bpIg"
                    placeholder="0"
                    step="0.1"
                    onInput={() => (window as any).calculate()}
                  />
                  <input
                    type="number"
                    id="q_bpIg"
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                </div>
                <div className="deliv-row">
                  <label style={{ color: 'var(--tt)' }}>
                    TikTok Brand-Provided <span className="std-text">Industry Standard: 0.6x</span>
                  </label>
                  <input
                    type="number"
                    id="m_bpTk"
                    placeholder="0"
                    step="0.1"
                    onInput={() => (window as any).calculate()}
                  />
                  <input
                    type="number"
                    id="q_bpTk"
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                </div>
                <div className="deliv-row">
                  <label style={{ color: 'var(--tw)' }}>
                    Twitter Brand-Provided <span className="std-text">Industry Standard: 0.5x</span>
                  </label>
                  <input
                    type="number"
                    id="m_bpTw"
                    placeholder="0"
                    step="0.1"
                    onInput={() => (window as any).calculate()}
                  />
                  <input
                    type="number"
                    id="q_bpTw"
                    placeholder="0"
                    onInput={() => (window as any).calculate()}
                  />
                </div>
              </div>
            </div>

            <h2>4. Usage Rights, Exclusivity & Extras</h2>
            <div className="section license-box">
              <div className="lic-grid-header">
                <div>Item / Right</div>
                <div>My Custom %</div>
                <div>Qty / Toggle</div>
              </div>

              <div
                className="license-row"
                style={{ borderBottom: '1px solid #bfdbfe', paddingBottom: '15px' }}
              >
                <label>
                  Exclusivity Lock-Out{' '}
                  <span
                    className="std-text"
                    style={{ fontWeight: 'normal', marginLeft: '5px' }}
                  >
                    (Industry Standard: 30%)
                  </span>
                </label>
                <input
                  type="number"
                  id="pct_excl"
                  placeholder="0"
                  onInput={() => (window as any).calculate()}
                />
                <input
                  type="number"
                  id="q_excl"
                  placeholder="Months"
                  onInput={() => (window as any).calculate()}
                />
              </div>

              <div
                className="license-row"
                style={{ marginTop: '15px' }}
              >
                <label style={{ color: '#1e3a8a' }}>Usage Duration (For Ads/Digital):</label>
                <div></div>
                <select
                  id="usageDuration"
                  onChange={() => (window as any).calculate()}
                  style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }}
                >
                  <option value="0">None</option>
                  <option value="1">3 Months (1.0x)</option>
                  <option value="1.5">6 Months (1.5x)</option>
                  <option value="2">12 Months (2.0x)</option>
                </select>
              </div>

              <div className="license-row">
                <label>
                  <input
                    type="checkbox"
                    id="chk_ads"
                    onChange={() => (window as any).calculate()}
                  />{' '}
                  Ads on Paid Social{' '}
                  <span
                    className="std-text"
                    style={{ fontWeight: 'normal', marginLeft: '5px' }}
                  >
                    (Industry Standard: 20%)
                  </span>
                </label>
                <input
                  type="number"
                  id="pct_ads"
                  placeholder="0"
                  onInput={() => (window as any).calculate()}
                />
                <div></div>
              </div>
              <div className="license-row">
                <label>
                  <input
                    type="checkbox"
                    id="chk_email"
                    onChange={() => (window as any).calculate()}
                  />{' '}
                  Email / Website{' '}
                  <span
                    className="std-text"
                    style={{ fontWeight: 'normal', marginLeft: '5px' }}
                  >
                    (Industry Standard: 10%)
                  </span>
                </label>
                <input
                  type="number"
                  id="pct_email"
                  placeholder="0"
                  onInput={() => (window as any).calculate()}
                />
                <div></div>
              </div>
              <div className="license-row">
                <label>
                  <input
                    type="checkbox"
                    id="chk_ooh"
                    onChange={() => (window as any).calculate()}
                  />{' '}
                  In-Store / Billboards{' '}
                  <span
                    className="std-text"
                    style={{ fontWeight: 'normal', marginLeft: '5px' }}
                  >
                    (Industry Standard: 50%)
                  </span>
                </label>
                <input
                  type="number"
                  id="pct_ooh"
                  placeholder="0"
                  onInput={() => (window as any).calculate()}
                />
                <div></div>
              </div>

              <div
                className="license-row"
                style={{
                  marginTop: '15px',
                  borderTop: '1px dashed #bfdbfe',
                  paddingTop: '15px',
                }}
              >
                <label style={{ color: '#ef4444' }}>
                  <input
                    type="checkbox"
                    id="chk_ip"
                    onChange={() => (window as any).calculate()}
                  />{' '}
                  Full IP Buyout{' '}
                  <span
                    className="std-text"
                    style={{ fontWeight: 'normal', marginLeft: '5px', color: '#f87171' }}
                  >
                    (Overrides duration, Industry Standard: 150%)
                  </span>
                </label>
                <input
                  type="number"
                  id="pct_ip"
                  placeholder="0"
                  onInput={() => (window as any).calculate()}
                />
                <div></div>
              </div>

              <div
                className="license-row"
                style={{
                  marginTop: '20px',
                  borderTop: '1px solid #bfdbfe',
                  paddingTop: '20px',
                }}
              >
                <label style={{ fontWeight: 'bold' }}>Client Deal Discount (%)</label>
                <input
                  type="number"
                  id="discount"
                  placeholder="0"
                  min="0"
                  max="100"
                  onInput={() => (window as any).calculate()}
                />
                <div></div>
              </div>
            </div>

            <div className="summary-box">
              <div className="summary-row">
                <span>Subtotal (Content Only):</span>
                <span id="subtotalDisplay">₦0</span>
              </div>
              <div className="summary-row">
                <span>Rights & Exclusivity:</span>
                <span id="usageFeeDisplay">+ ₦0</span>
              </div>
              <div
                className="summary-row"
                style={{ color: '#f87171' }}
              >
                <span>Discount Applied:</span>
                <span id="discountDisplay">- ₦0</span>
              </div>
              <div className="summary-row final-quote">
                <span>FINAL CUSTOM QUOTE:</span>
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
