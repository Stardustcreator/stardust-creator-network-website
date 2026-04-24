'use client';

import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import { useEffect } from 'react';

// Version: 6.1 - Updated for Vercel deployment

export default function PricingCalculatorPage() {
  // V5.2 Calculator Effect
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

  // V6.1 Advanced Calculator Effect (Isolated)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.innerHTML = `
        const formatterV6 = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 });

        let currentInvoiceItems = [];

        function toggleCampaignV6() {
            const type = document.getElementById('campaignTypeV6').value;
            document.getElementById('group_creatorV6').classList.remove('active');
            document.getElementById('group_ugcV6').classList.remove('active');
            document.getElementById('group_brandV6').classList.remove('active');

            if (type === 'creator') document.getElementById('group_creatorV6').classList.add('active');
            if (type === 'ugc') document.getElementById('group_ugcV6').classList.add('active');
            if (type === 'brand') document.getElementById('group_brandV6').classList.add('active');

            document.getElementById('platformEngineBoxV6').style.display = (type === 'ugc') ? 'none' : 'block';
            document.getElementById('ugcEngineBoxV6').style.display = (type === 'ugc') ? 'flex' : 'none';
            
            document.getElementById('invoiceSectionV6').style.display = 'none';
        }

        function getBaseV6(folId, engId, cpmId) {
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

        function getValV6(id) { return parseFloat(document.getElementById(id).value) || 0; }

        function calculateV6() {
            currentInvoiceItems = []; 
            
            const igBase = getBaseV6('igFolV6', 'igEngV6', 'igCpmV6');
            const tkBase = getBaseV6('tkFolV6', 'tkEngV6', 'tkCpmV6');
            const ytBase = getBaseV6('ytFolV6', 'ytEngV6', 'ytCpmV6');
            const twBase = getBaseV6('twFolV6', 'twEngV6', 'twCpmV6');
            const ugcBase = getValV6('ugcBaseRateV6');

            document.getElementById('igBaseDisplayV6').innerText = formatterV6.format(igBase);
            document.getElementById('tkBaseDisplayV6').innerText = formatterV6.format(tkBase);
            document.getElementById('ytBaseDisplayV6').innerText = formatterV6.format(ytBase);
            document.getElementById('twBaseDisplayV6').innerText = formatterV6.format(twBase);

            const type = document.getElementById('campaignTypeV6').value;
            let subtotal = 0;

            function processItem(name, qtyId, multId, base) {
                let qty = getValV6(qtyId);
                let mult = getValV6(multId);
                if (qty > 0 && mult > 0) {
                    let total = qty * mult * base;
                    subtotal += total;
                    currentInvoiceItems.push({ name: name, qty: qty, total: total });
                }
            }

            if (type === 'creator') {
                processItem('IG Reel', 'q_igReelV6', 'm_igReelV6', igBase);
                processItem('IG Story', 'q_igStoryV6', 'm_igStoryV6', igBase);
                processItem('TikTok Video', 'q_tkVidV6', 'm_tkVidV6', tkBase);
                processItem('YT Short', 'q_ytShortV6', 'm_ytShortV6', ytBase);
                processItem('YT Long-Form Video', 'q_ytLongV6', 'm_ytLongV6', ytBase);
                processItem('Twitter (X) Post', 'q_twPostV6', 'm_twPostV6', twBase);
            } else if (type === 'ugc') {
                processItem('UGC Short-Form Video', 'q_ugcVV6', 'm_ugcVV6', ugcBase);
                processItem('UGC Long-Form Video', 'q_ugcLongV6', 'm_ugcLongV6', ugcBase);
                processItem('UGC Photos', 'q_ugcPV6', 'm_ugcPV6', ugcBase);
            } else if (type === 'brand') {
                processItem('IG Brand-Provided Post', 'q_bpIgV6', 'm_bpIgV6', igBase);
                processItem('TikTok Brand-Provided', 'q_bpTkV6', 'm_bpTkV6', tkBase);
                processItem('Twitter Brand-Provided', 'q_bpTwV6', 'm_bpTwV6', twBase);
            }

            let addonsFee = 0;
            let exclMonths = getValV6('q_exclV6');
            if (exclMonths > 0 && getValV6('pct_exclV6') > 0) {
                let exclTotal = subtotal * (getValV6('pct_exclV6') / 100) * exclMonths;
                addonsFee += exclTotal;
                currentInvoiceItems.push({ name: \`Exclusivity Lock-Out (\${exclMonths} Months)\`, qty: 1, total: exclTotal });
            }

            const durationMult = parseFloat(document.getElementById('usageDurationV6').value);
            const durationText = document.getElementById('usageDurationV6').options[document.getElementById('usageDurationV6').selectedIndex].text.split(' ')[0];
            const isIp = document.getElementById('chk_ipV6').checked;
            let rightsFee = 0;

            if (isIp && getValV6('pct_ipV6') > 0) {
                let ipTotal = subtotal * (getValV6('pct_ipV6') / 100);
                rightsFee = ipTotal;
                currentInvoiceItems.push({ name: \`Full IP Buyout (In Perpetuity)\`, qty: 1, total: ipTotal });
            } else {
                if (document.getElementById('chk_adsV6').checked && getValV6('pct_adsV6') > 0) {
                    let adsTotal = subtotal * (getValV6('pct_adsV6') / 100) * durationMult;
                    rightsFee += adsTotal;
                    currentInvoiceItems.push({ name: \`Ads on Paid Social (\${durationText} Months)\`, qty: 1, total: adsTotal });
                }
                if (document.getElementById('chk_emailV6').checked && getValV6('pct_emailV6') > 0) {
                    let emailTotal = subtotal * (getValV6('pct_emailV6') / 100) * durationMult;
                    rightsFee += emailTotal;
                    currentInvoiceItems.push({ name: \`Email / Website Usage (\${durationText} Months)\`, qty: 1, total: emailTotal });
                }
                if (document.getElementById('chk_oohV6').checked && getValV6('pct_oohV6') > 0) {
                    let oohTotal = subtotal * (getValV6('pct_oohV6') / 100) * durationMult;
                    rightsFee += oohTotal;
                    currentInvoiceItems.push({ name: \`In-Store / Billboards (\${durationText} Months)\`, qty: 1, total: oohTotal });
                }
            }

            const totalLicensing = addonsFee + rightsFee;
            const totalBeforeDiscount = subtotal + totalLicensing;
            const discountAmount = totalBeforeDiscount * (getValV6('discountV6') / 100);
            const finalTotal = totalBeforeDiscount - discountAmount;

            window.invoiceDataV6 = { subtotal, totalLicensing, discountAmount, finalTotal };

            document.getElementById('subtotalDisplayV6').innerText = formatterV6.format(subtotal);
            document.getElementById('usageFeeDisplayV6').innerText = \`+ \${formatterV6.format(totalLicensing)}\`;
            document.getElementById('discountDisplayV6').innerText = \`- \${formatterV6.format(discountAmount)}\`;
            document.getElementById('finalTotalDisplayV6').innerText = formatterV6.format(finalTotal);
        }

        function generateInvoiceV6() {
            calculateV6();

            const invoiceSec = document.getElementById('invoiceSectionV6');
            const tbody = document.getElementById('invoiceBodyV6');
            
            const today = new Date();
            document.getElementById('invoiceDateV6').innerText = \`Date: \${today.toLocaleDateString('en-GB')}\`;

            tbody.innerHTML = '';
            if (currentInvoiceItems.length === 0) {
                tbody.innerHTML = '<tr><td colspan="3" style="text-align:center; color: #ef4444;">No items selected. Please add quantities and multipliers above.</td></tr>';
            } else {
                currentInvoiceItems.forEach(item => {
                    let tr = document.createElement('tr');
                    tr.innerHTML = \`
                        <td><strong>\${item.name}</strong></td>
                        <td>\${item.qty}</td>
                        <td class="money-col">\${formatterV6.format(item.total)}</td>
                    \`;
                    tbody.appendChild(tr);
                });
            }

            document.getElementById('invSubtotalV6').innerText = formatterV6.format(window.invoiceDataV6.subtotal);
            document.getElementById('invAddonsV6').innerText = formatterV6.format(window.invoiceDataV6.totalLicensing);
            document.getElementById('invDiscountV6').innerText = \`- \${formatterV6.format(window.invoiceDataV6.discountAmount)}\`;
            document.getElementById('invFinalV6').innerText = formatterV6.format(window.invoiceDataV6.finalTotal);

            invoiceSec.style.display = 'block';
            invoiceSec.scrollIntoView({ behavior: 'smooth' });
        }

        window.calculateV6 = calculateV6;
        window.toggleCampaignV6 = toggleCampaignV6;
        window.generateInvoiceV6 = generateInvoiceV6;
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

        {/* V6.1 Advanced Calculator Section - Completely Isolated */}
        <div
          className="calculator-container-v6 relative mt-12"
          style={{
            background: '#ffffff',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
            maxWidth: '950px',
            width: '100%',
            margin: '3rem auto 0',
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

            .calculator-container-v6 h2 {
              margin-top: 0;
              border-bottom: 2px solid var(--border);
              padding-bottom: 10px;
              font-size: 20px;
              color: #334155;
            }
            .v6-section {
              margin-bottom: 30px;
            }

            .v6-master-toggle-box {
              background: var(--highlight);
              padding: 20px;
              border-radius: 8px;
              border: 1px solid #fde68a;
              margin-bottom: 30px;
              text-align: center;
            }
            .v6-master-toggle-box select {
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

            .v6-engine-grid {
              display: grid;
              grid-template-columns: 120px 1fr 1fr 1fr 120px;
              gap: 15px;
              align-items: center;
              margin-bottom: 12px;
            }
            .v6-engine-header {
              font-weight: 600;
              font-size: 12px;
              color: #64748b;
              text-transform: uppercase;
            }
            .v6-input-box {
              width: 100%;
              padding: 10px;
              border: 1px solid var(--border);
              border-radius: 6px;
              box-sizing: border-box;
              font-size: 15px;
              background-color: #f1f5f9;
              color: #0f172a;
            }
            .v6-input-box:focus {
              outline: none;
              border-color: var(--primary);
              background-color: #fff;
              color: #0f172a;
            }
            .v6-platform-label {
              font-weight: bold;
              font-size: 15px;
              color: #0f172a;
            }

            .v6-base-display {
              font-weight: bold;
              color: #10b981;
              font-size: 15px;
              text-align: right;
              background: #ecfdf5;
              padding: 10px;
              border-radius: 6px;
              border: 1px solid #a7f3d0;
            }

            .v6-ugc-setup-box {
              background: #f3f4f6;
              border-left: 4px solid var(--ugc);
              padding: 15px;
              border-radius: 6px;
              display: none;
              justify-content: space-between;
              align-items: center;
            }

            .v6-deliv-group {
              display: none;
            }
            .v6-deliv-group.active {
              display: block;
            }

            .v6-deliv-header {
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
            .v6-deliv-row {
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
            .v6-deliv-row label {
              font-size: 15px;
              font-weight: 500;
            }
            .v6-deliv-row .v6-std-text {
              font-size: 12px;
              color: #94a3b8;
              display: block;
            }
            .v6-deliv-row input {
              padding: 8px;
              border: 1px solid var(--border);
              border-radius: 6px;
              text-align: center;
              font-size: 15px;
              color: #0f172a;
            }

            .v6-license-box {
              background: #eff6ff;
              border: 1px solid #bfdbfe;
              border-radius: 8px;
              padding: 20px;
            }
            .v6-lic-grid-header {
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
            .v6-license-row {
              display: grid;
              grid-template-columns: 2fr 1fr 1fr;
              gap: 15px;
              align-items: center;
              margin-bottom: 12px;
            }
            .v6-license-row label {
              font-weight: 500;
              font-size: 15px;
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 10px;
            }
            .v6-license-row input[type='number'] {
              padding: 8px;
              border: 1px solid var(--border);
              border-radius: 6px;
              text-align: center;
              font-size: 14px;
              color: #0f172a;
            }
            .v6-license-row select {
              padding: 8px;
              border-radius: 6px;
              border: 1px solid var(--border);
              color: #0f172a;
            }
            input[type='checkbox'].v6-checkbox {
              width: 18px;
              height: 18px;
              cursor: pointer;
            }

            .v6-summary-box {
              background: #0f172a;
              color: #ffffff;
              padding: 25px;
              border-radius: 12px;
              margin-top: 20px;
            }
            .v6-summary-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 12px;
              font-size: 16px;
            }
            .v6-final-quote {
              font-size: 28px;
              font-weight: bold;
              color: #4ade80;
              border-top: 1px dashed #475569;
              padding-top: 20px;
              margin-top: 15px;
            }

            .v6-btn-generate {
              width: 100%;
              background: linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #a855f7 100%);
              color: white;
              padding: 18px 24px;
              font-size: 18px;
              font-weight: bold;
              border: none;
              border-radius: 8px;
              margin-top: 30px;
              cursor: pointer;
              transition: all 0.3s ease;
              box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);
              display: block !important;
              visibility: visible !important;
            }
            .v6-btn-generate:hover {
              background: linear-gradient(135deg, #9333ea 0%, #db2777 50%, #9333ea 100%);
              transform: translateY(-2px);
              box-shadow: 0 6px 20px rgba(168, 85, 247, 0.4);
            }
            .v6-btn-generate:active {
              transform: translateY(0);
            }

            .v6-invoice-container {
              display: none;
              background: #ffffff;
              border: 2px solid #e2e8f0;
              border-radius: 8px;
              padding: 40px;
              margin-top: 40px;
              color: #0f172a;
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
              animation: slideIn 0.3s ease-out;
            }
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .v6-invoice-header {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              border-bottom: 2px solid #e2e8f0;
              padding-bottom: 20px;
              margin-bottom: 20px;
            }
            .v6-invoice-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            .v6-invoice-table th,
            .v6-invoice-table td {
              padding: 12px;
              border-bottom: 1px solid #e2e8f0;
              text-align: left;
            }
            .v6-invoice-table th {
              background-color: #f8fafc;
              font-size: 14px;
              color: #64748b;
              text-transform: uppercase;
            }
            .v6-invoice-table td {
              font-size: 15px;
            }
            .v6-money-col {
              text-align: right;
            }

            .v6-invoice-totals {
              width: 50%;
              margin-left: auto;
              border-top: 2px solid #0f172a;
              padding-top: 15px;
            }
            .v6-invoice-totals-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
              font-size: 15px;
            }
            .v6-invoice-grand-total {
              font-size: 22px;
              font-weight: bold;
              color: #0ea5e9;
              border-top: 1px solid #e2e8f0;
              padding-top: 10px;
              margin-top: 10px;
            }

            .v6-btn-print {
              background: linear-gradient(135deg, #10b981 0%, #059669 100%);
              color: white;
              padding: 12px 24px;
              border: none;
              border-radius: 6px;
              font-weight: bold;
              cursor: pointer;
              margin-top: 25px;
              transition: all 0.3s ease;
              font-size: 16px;
              display: inline-block;
              box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
            }
            .v6-btn-print:hover {
              background: linear-gradient(135deg, #059669 0%, #047857 100%);
              transform: translateY(-2px);
              box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
            }

            @media (max-width: 768px) {
              .v6-engine-grid {
                grid-template-columns: 1fr;
              }
              .v6-engine-header {
                display: none;
              }
              .v6-deliv-header {
                display: none;
              }
              .v6-deliv-row {
                grid-template-columns: 1fr;
                gap: 8px;
              }
              .v6-lic-grid-header {
                display: none;
              }
              .v6-license-row {
                grid-template-columns: 1fr;
                gap: 8px;
              }
            }

            @media print {
              body * {
                visibility: hidden;
              }
              #invoiceSectionV6,
              #invoiceSectionV6 * {
                visibility: visible;
              }
              #invoiceSectionV6 {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                border: none;
                padding: 0;
              }
              .v6-no-print {
                display: none !important;
              }
              body {
                background: white;
              }
            }
          `}</style>

          <h2 style={{ marginTop: '20px' }}>Advanced Quote Generator (V6.1)</h2>

          <div className="v6-master-toggle-box">
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
              id="campaignTypeV6"
              onChange={() => {
                (window as any).toggleCampaignV6();
                (window as any).calculateV6();
              }}
            >
              <option value="creator">Creator Posts (I create and post on my page)</option>
              <option value="ugc">UGC Only (I create raw files, brand posts them)</option>
              <option value="brand">Brand-Provided (Brand gives me content, I post it)</option>
            </select>
          </div>

          <h2>2. Your Base Rates</h2>
          <div className="v6-section">
            <div id="platformEngineBoxV6">
              <div className="v6-engine-grid v6-engine-header">
                <div>Platform</div>
                <div>Followers</div>
                <div>Eng Rate (%)</div>
                <div>Rate per 1k (₦)</div>
                <div style={{ textAlign: 'right' }}>Calculated Base</div>
              </div>

              <div className="v6-engine-grid">
                <div
                  className="v6-platform-label"
                  style={{ color: 'var(--ig)' }}
                >
                  Instagram
                </div>
                <input
                  type="number"
                  className="v6-input-box"
                  id="igFolV6"
                  placeholder="0"
                  onInput={() => (window as any).calculateV6()}
                />
                <input
                  type="number"
                  className="v6-input-box"
                  id="igEngV6"
                  placeholder="0"
                  onInput={() => (window as any).calculateV6()}
                />
                <input
                  type="number"
                  className="v6-input-box"
                  id="igCpmV6"
                  placeholder="0"
                  onInput={() => (window as any).calculateV6()}
                />
                <div
                  className="v6-base-display"
                  id="igBaseDisplayV6"
                >
                  ₦0
                </div>
              </div>

              <div className="v6-engine-grid">
                <div
                  className="v6-platform-label"
                  style={{ color: 'var(--tt)' }}
                >
                  TikTok
                </div>
                <input
                  type="number"
                  className="v6-input-box"
                  id="tkFolV6"
                  placeholder="0"
                  onInput={() => (window as any).calculateV6()}
                />
                <input
                  type="number"
                  className="v6-input-box"
                  id="tkEngV6"
                  placeholder="0"
                  onInput={() => (window as any).calculateV6()}
                />
                <input
                  type="number"
                  className="v6-input-box"
                  id="tkCpmV6"
                  placeholder="0"
                  onInput={() => (window as any).calculateV6()}
                />
                <div
                  className="v6-base-display"
                  id="tkBaseDisplayV6"
                >
                  ₦0
                </div>
              </div>

              <div className="v6-engine-grid">
                <div
                  className="v6-platform-label"
                  style={{ color: 'var(--yt)' }}
                >
                  YouTube
                </div>
                <input
                  type="number"
                  className="v6-input-box"
                  id="ytFolV6"
                  placeholder="0"
                  onInput={() => (window as any).calculateV6()}
                />
                <input
                  type="number"
                  className="v6-input-box"
                  id="ytEngV6"
                  placeholder="0"
                  onInput={() => (window as any).calculateV6()}
                />
                <input
                  type="number"
                  className="v6-input-box"
                  id="ytCpmV6"
                  placeholder="0"
                  onInput={() => (window as any).calculateV6()}
                />
                <div
                  className="v6-base-display"
                  id="ytBaseDisplayV6"
                >
                  ₦0
                </div>
              </div>

              <div className="v6-engine-grid">
                <div
                  className="v6-platform-label"
                  style={{ color: 'var(--tw)' }}
                >
                  Twitter (X)
                </div>
                <input
                  type="number"
                  className="v6-input-box"
                  id="twFolV6"
                  placeholder="0"
                  onInput={() => (window as any).calculateV6()}
                />
                <input
                  type="number"
                  className="v6-input-box"
                  id="twEngV6"
                  placeholder="0"
                  onInput={() => (window as any).calculateV6()}
                />
                <input
                  type="number"
                  className="v6-input-box"
                  id="twCpmV6"
                  placeholder="0"
                  onInput={() => (window as any).calculateV6()}
                />
                <div
                  className="v6-base-display"
                  id="twBaseDisplayV6"
                >
                  ₦0
                </div>
              </div>
            </div>

            <div
              className="v6-ugc-setup-box"
              id="ugcEngineBoxV6"
            >
              <div>
                <strong style={{ color: 'var(--ugc)' }}>My Flat UGC Production Fee (₦)</strong>
                <br />
                <small style={{ color: '#6b7280' }}>Fixed creation rate.</small>
              </div>
              <input
                type="number"
                className="v6-input-box"
                id="ugcBaseRateV6"
                placeholder="0"
                style={{ width: '200px' }}
                onInput={() => (window as any).calculateV6()}
              />
            </div>
          </div>

          <h2>3. Content Requirements (Quantities & Multipliers)</h2>
          <div className="v6-section">
            <div
              id="group_creatorV6"
              className="v6-deliv-group active"
            >
              <div className="v6-deliv-header">
                <div>Content Type</div>
                <div>My Multiplier</div>
                <div>Quantity</div>
              </div>
              <div className="v6-deliv-row">
                <label style={{ color: 'var(--ig)' }}>
                  IG Reel <span className="v6-std-text">Industry Standard: 1.2x</span>
                </label>
                <input
                  type="number"
                  id="m_igReelV6"
                  placeholder="0"
                  step="0.1"
                  onInput={() => (window as any).calculateV6()}
                />
                <input
                  type="number"
                  id="q_igReelV6"
                  placeholder="0"
                  onInput={() => (window as any).calculateV6()}
                />
              </div>
              <div className="v6-deliv-row">
                <label style={{ color: 'var(--ig)' }}>
                  IG Story <span className="v6-std-text">Industry Standard: 0.4x</span>
                </label>
                <input
                  type="number"
                  id="m_igStoryV6"
                  placeholder="0"
                  step="0.1"
                  onInput={() => (window as any).calculateV6()}
                />
                <input
                  type="number"
                  id="q_igStoryV6"
                  placeholder="0"
                  onInput={() => (window as any).calculateV6()}
                />
              </div>
              <div className="v6-deliv-row">
                <label style={{ color: 'var(--tt)' }}>
                  TikTok Video <span className="v6-std-text">Industry Standard: 1.2x</span>
                </label>
                <input
                  type="number"
                  id="m_tkVidV6"
                  placeholder="0"
                  step="0.1"
                  onInput={() => (window as any).calculateV6()}
                />
                <input
                  type="number"
                  id="q_tkVidV6"
                  placeholder="0"
                  onInput={() => (window as any).calculateV6()}
                />
              </div>
              <div className="v6-deliv-row">
                <label style={{ color: 'var(--yt)' }}>
                  YT Short <span className="v6-std-text">Industry Standard: 1.2x</span>
                </label>
                <input
                  type="number"
                  id="m_ytShortV6"
                  placeholder="0"
                  step="0.1"
                  onInput={() => (window as any).calculateV6()}
                />
                <input
                  type="number"
                  id="q_ytShortV6"
                  placeholder="0"
                  onInput={() => (window as any).calculateV6()}
                />
              </div>
              <div className="v6-deliv-row">
                <label style={{ color: 'var(--yt)' }}>
                  YT Long-Form Video <span className="v6-std-text">Industry Standard: 3.0x</span>
                </label>
                <input
                  type="number"
                  id="m_ytLongV6"
                  placeholder="0"
                  step="0.1"
                  onInput={() => (window as any).calculateV6()}
                />
                <input
                  type="number"
                  id="q_ytLongV6"
                  placeholder="0"
                  onInput={() => (window as any).calculateV6()}
                />
              </div>
              <div className="v6-deliv-row">
                <label style={{ color: 'var(--tw)' }}>
                  Twitter (X) Post <span className="v6-std-text">Industry Standard: 0.5x</span>
                </label>
                <input
                  type="number"
                  id="m_twPostV6"
                  placeholder="0"
                  step="0.1"
                  onInput={() => (window as any).calculateV6()}
                />
                <input
                  type="number"
                  id="q_twPostV6"
                  placeholder="0"
                  onInput={() => (window as any).calculateV6()}
                />
              </div>
            </div>

            <div
              id="group_ugcV6"
              className="v6-deliv-group"
            >
              <div className="v6-deliv-header">
                <div>Content Type</div>
                <div>My Multiplier</div>
                <div>Quantity</div>
              </div>
              <div className="v6-deliv-row">
                <label style={{ color: 'var(--ugc)' }}>
                  UGC Short-Form Video{' '}
                  <span className="v6-std-text">Industry Standard: 1.0x (of UGC Base)</span>
                </label>
                <input
                  type="number"
                  id="m_ugcVV6"
                  placeholder="0"
                  step="0.1"
                  onInput={() => (window as any).calculateV6()}
                />
                <input
                  type="number"
                  id="q_ugcVV6"
                  placeholder="0"
                  onInput={() => (window as any).calculateV6()}
                />
              </div>
              <div className="v6-deliv-row">
                <label style={{ color: 'var(--ugc)' }}>
                  UGC Long-Form Video{' '}
                  <span className="v6-std-text">Industry Standard: 3.0x (of UGC Base)</span>
                </label>
                <input
                  type="number"
                  id="m_ugcLongV6"
                  placeholder="0"
                  step="0.1"
                  onInput={() => (window as any).calculateV6()}
                />
                <input
                  type="number"
                  id="q_ugcLongV6"
                  placeholder="0"
                  onInput={() => (window as any).calculateV6()}
                />
              </div>
              <div className="v6-deliv-row">
                <label style={{ color: 'var(--ugc)' }}>
                  UGC Photos{' '}
                  <span className="v6-std-text">Industry Standard: 0.5x (of UGC Base)</span>
                </label>
                <input
                  type="number"
                  id="m_ugcPV6"
                  placeholder="0"
                  step="0.1"
                  onInput={() => (window as any).calculateV6()}
                />
                <input
                  type="number"
                  id="q_ugcPV6"
                  placeholder="0"
                  onInput={() => (window as any).calculateV6()}
                />
              </div>
            </div>

            <div
              id="group_brandV6"
              className="v6-deliv-group"
            >
              <div className="v6-deliv-header">
                <div>Content Type</div>
                <div>My Multiplier</div>
                <div>Quantity</div>
              </div>
              <div className="v6-deliv-row">
                <label style={{ color: 'var(--ig)' }}>
                  IG Brand-Provided Post{' '}
                  <span className="v6-std-text">Industry Standard: 0.6x</span>
                </label>
                <input
                  type="number"
                  id="m_bpIgV6"
                  placeholder="0"
                  step="0.1"
                  onInput={() => (window as any).calculateV6()}
                />
                <input
                  type="number"
                  id="q_bpIgV6"
                  placeholder="0"
                  onInput={() => (window as any).calculateV6()}
                />
              </div>
              <div className="v6-deliv-row">
                <label style={{ color: 'var(--tt)' }}>
                  TikTok Brand-Provided <span className="v6-std-text">Industry Standard: 0.6x</span>
                </label>
                <input
                  type="number"
                  id="m_bpTkV6"
                  placeholder="0"
                  step="0.1"
                  onInput={() => (window as any).calculateV6()}
                />
                <input
                  type="number"
                  id="q_bpTkV6"
                  placeholder="0"
                  onInput={() => (window as any).calculateV6()}
                />
              </div>
              <div className="v6-deliv-row">
                <label style={{ color: 'var(--tw)' }}>
                  Twitter Brand-Provided{' '}
                  <span className="v6-std-text">Industry Standard: 0.5x</span>
                </label>
                <input
                  type="number"
                  id="m_bpTwV6"
                  placeholder="0"
                  step="0.1"
                  onInput={() => (window as any).calculateV6()}
                />
                <input
                  type="number"
                  id="q_bpTwV6"
                  placeholder="0"
                  onInput={() => (window as any).calculateV6()}
                />
              </div>
            </div>
          </div>

          <h2>4. Usage Rights, Exclusivity & Extras</h2>
          <div className="v6-section v6-license-box">
            <div className="v6-lic-grid-header">
              <div>Item / Right</div>
              <div>My Custom %</div>
              <div>Qty / Toggle</div>
            </div>

            <div
              className="v6-license-row"
              style={{ borderBottom: '1px solid #bfdbfe', paddingBottom: '15px' }}
            >
              <label>
                Exclusivity Lock-Out{' '}
                <span
                  className="v6-std-text"
                  style={{ fontWeight: 'normal', marginLeft: '5px' }}
                >
                  (Industry Standard: 30%)
                </span>
              </label>
              <input
                type="number"
                id="pct_exclV6"
                placeholder="0"
                onInput={() => (window as any).calculateV6()}
              />
              <input
                type="number"
                id="q_exclV6"
                placeholder="Months"
                onInput={() => (window as any).calculateV6()}
              />
            </div>

            <div
              className="v6-license-row"
              style={{ marginTop: '15px' }}
            >
              <label style={{ color: '#1e3a8a' }}>Usage Duration (For Ads/Digital):</label>
              <div></div>
              <select
                id="usageDurationV6"
                onChange={() => (window as any).calculateV6()}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid var(--border)',
                  color: '#0f172a',
                }}
              >
                <option value="0">None</option>
                <option value="1">3 Months (1.0x)</option>
                <option value="1.5">6 Months (1.5x)</option>
                <option value="2">12 Months (2.0x)</option>
              </select>
            </div>

            <div className="v6-license-row">
              <label>
                <input
                  type="checkbox"
                  id="chk_adsV6"
                  className="v6-checkbox"
                  onChange={() => (window as any).calculateV6()}
                />{' '}
                Ads on Paid Social{' '}
                <span
                  className="v6-std-text"
                  style={{ fontWeight: 'normal', marginLeft: '5px' }}
                >
                  (Industry Standard: 20%)
                </span>
              </label>
              <input
                type="number"
                id="pct_adsV6"
                placeholder="0"
                onInput={() => (window as any).calculateV6()}
              />
              <div></div>
            </div>
            <div className="v6-license-row">
              <label>
                <input
                  type="checkbox"
                  id="chk_emailV6"
                  className="v6-checkbox"
                  onChange={() => (window as any).calculateV6()}
                />{' '}
                Email / Website{' '}
                <span
                  className="v6-std-text"
                  style={{ fontWeight: 'normal', marginLeft: '5px' }}
                >
                  (Industry Standard: 10%)
                </span>
              </label>
              <input
                type="number"
                id="pct_emailV6"
                placeholder="0"
                onInput={() => (window as any).calculateV6()}
              />
              <div></div>
            </div>
            <div className="v6-license-row">
              <label>
                <input
                  type="checkbox"
                  id="chk_oohV6"
                  className="v6-checkbox"
                  onChange={() => (window as any).calculateV6()}
                />{' '}
                In-Store / Billboards{' '}
                <span
                  className="v6-std-text"
                  style={{ fontWeight: 'normal', marginLeft: '5px' }}
                >
                  (Industry Standard: 50%)
                </span>
              </label>
              <input
                type="number"
                id="pct_oohV6"
                placeholder="0"
                onInput={() => (window as any).calculateV6()}
              />
              <div></div>
            </div>

            <div
              className="v6-license-row"
              style={{ marginTop: '15px', borderTop: '1px dashed #bfdbfe', paddingTop: '15px' }}
            >
              <label style={{ color: '#ef4444' }}>
                <input
                  type="checkbox"
                  id="chk_ipV6"
                  className="v6-checkbox"
                  onChange={() => (window as any).calculateV6()}
                />{' '}
                Full IP Buyout{' '}
                <span
                  className="v6-std-text"
                  style={{ fontWeight: 'normal', marginLeft: '5px', color: '#f87171' }}
                >
                  (Overrides duration, Standard: 150%)
                </span>
              </label>
              <input
                type="number"
                id="pct_ipV6"
                placeholder="0"
                onInput={() => (window as any).calculateV6()}
              />
              <div></div>
            </div>

            <div
              className="v6-license-row"
              style={{ marginTop: '20px', borderTop: '1px solid #bfdbfe', paddingTop: '20px' }}
            >
              <label style={{ fontWeight: 'bold' }}>Client Deal Discount (%)</label>
              <input
                type="number"
                id="discountV6"
                placeholder="0"
                min="0"
                max="100"
                onInput={() => (window as any).calculateV6()}
              />
              <div></div>
            </div>
          </div>

          <div className="v6-summary-box">
            <div className="v6-summary-row">
              <span>Subtotal (Content Only):</span>
              <span id="subtotalDisplayV6">₦0</span>
            </div>
            <div className="v6-summary-row">
              <span>Rights & Exclusivity:</span>
              <span id="usageFeeDisplayV6">+ ₦0</span>
            </div>
            <div
              className="v6-summary-row"
              style={{ color: '#f87171' }}
            >
              <span>Discount Applied:</span>
              <span id="discountDisplayV6">- ₦0</span>
            </div>
            <div className="v6-summary-row v6-final-quote">
              <span>FINAL CUSTOM QUOTE:</span>
              <span id="finalTotalDisplayV6">₦0</span>
            </div>
          </div>

          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '15px' }}>
              Ready to create your proposal? Click below to generate an invoice with your custom
              quote.
            </p>
            <button
              className="v6-btn-generate v6-no-print"
              onClick={() => (window as any).generateInvoiceV6()}
            >
              📝 Generate Client Quote (PDF)
            </button>
          </div>

          <div
            id="invoiceSectionV6"
            className="v6-invoice-container"
          >
            <div className="v6-invoice-header">
              <div>
                <h1 style={{ margin: '0', color: '#0f172a' }}>Campaign Proposal & Quote</h1>
                <p
                  style={{ margin: '5px 0 0 0', color: '#64748b' }}
                  id="invoiceDateV6"
                ></p>
              </div>
            </div>

            <table className="v6-invoice-table">
              <thead>
                <tr>
                  <th>Deliverable / Item</th>
                  <th>Qty</th>
                  <th className="v6-money-col">Line Total</th>
                </tr>
              </thead>
              <tbody id="invoiceBodyV6"></tbody>
            </table>

            <div className="v6-invoice-totals">
              <div className="v6-invoice-totals-row">
                <span>Content Subtotal:</span>
                <span id="invSubtotalV6">₦0</span>
              </div>
              <div className="v6-invoice-totals-row">
                <span>Licensing & Add-ons:</span>
                <span id="invAddonsV6">₦0</span>
              </div>
              <div
                className="v6-invoice-totals-row"
                style={{ color: '#ef4444' }}
              >
                <span>Discount:</span>
                <span id="invDiscountV6">- ₦0</span>
              </div>
              <div className="v6-invoice-totals-row v6-invoice-grand-total">
                <span>Final Investment:</span>
                <span id="invFinalV6">₦0</span>
              </div>
            </div>

            <div
              style={{
                marginTop: '30px',
                padding: '20px',
                backgroundColor: '#f0f9ff',
                borderRadius: '8px',
                border: '1px solid #bfdbfe',
              }}
            >
              <p style={{ margin: '0 0 15px 0', color: '#1e3a8a', fontWeight: '500' }}>
                💾 <strong>Save Your Quote</strong>
              </p>
              <button
                className="v6-btn-print v6-no-print"
                onClick={() => window.print()}
              >
                📥 Download as PDF
              </button>
              <p style={{ margin: '15px 0 0 0', color: '#64748b', fontSize: '13px' }}>
                Your browser's print dialog will open. Select "Save as PDF" from the printer
                dropdown to save the quote.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
