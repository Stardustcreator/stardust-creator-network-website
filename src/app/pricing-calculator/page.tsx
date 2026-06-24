'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

type CampaignType = 'creator' | 'ugc' | 'brand';

const steps = [
  { number: 1, label: 'Campaign type' },
  { number: 2, label: 'Your reach' },
  { number: 3, label: 'Deliverables' },
  { number: 4, label: 'Rights & quote' },
];

const campaignOptions = [
  {
    id: 'creator' as CampaignType,
    title: 'Creator Posts',
    description: 'You create and post on your channels.',
  },
  {
    id: 'ugc' as CampaignType,
    title: 'UGC-Only',
    description: 'You create the content, but the brand owns and posts it on their channels.',
  },
  {
    id: 'brand' as CampaignType,
    title: 'Brand-Provided',
    description: 'Brand provides the content. You post it on your channels.',
  },
];

export default function PricingCalculatorPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignType>('ugc');
  const [ugcRate, setUgcRate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Deliverables state
  const [ugcShortVideo, setUgcShortVideo] = useState(false);
  const [ugcLongVideo, setUgcLongVideo] = useState(false);
  const [ugcPhotos, setUgcPhotos] = useState(false);

  // Rights & Quote state
  const [exclusivityMonths, setExclusivityMonths] = useState('');
  const [exclusivityRate, setExclusivityRate] = useState('');
  const [usageDuration, setUsageDuration] = useState('');
  const [adsOnPaidSocial, setAdsOnPaidSocial] = useState(false);
  const [emailWebsite, setEmailWebsite] = useState(false);
  const [inStoreBillboards, setInStoreBillboards] = useState(false);
  const [discountRate, setDiscountRate] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  const handleCampaignSelect = (campaignId: CampaignType) => {
    setSelectedCampaign(campaignId);
  };

  const handleStepClick = (stepNumber: number) => {
    if (stepNumber <= currentStep) {
      setCurrentStep(stepNumber);
    }
  };

  const handleContinue = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGetFullQuote = async () => {
    if (!emailAddress) {
      alert('Please enter your email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email to Mailchimp
      const response = await fetch('/api/pricing-calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailAddress,
          ugcRate: ugcRate,
          campaignType: selectedCampaign,
        }),
      });

      if (!response.ok) {
        console.error('Failed to subscribe to Mailchimp');
        // Continue anyway - don't block the user
      }

      // Build URL with all form data
      const params = new URLSearchParams({
        ugcRate,
        ugcShortVideo: ugcShortVideo.toString(),
        ugcLongVideo: ugcLongVideo.toString(),
        ugcPhotos: ugcPhotos.toString(),
        exclusivityMonths,
        exclusivityRate,
        usageDuration,
        adsOnPaidSocial: adsOnPaidSocial.toString(),
        emailWebsite: emailWebsite.toString(),
        inStoreBillboards: inStoreBillboards.toString(),
        discountRate,
        emailAddress,
      });
      router.push(`/pricing-calculator/invoice?${params.toString()}`);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Continue anyway - don't block the user
      const params = new URLSearchParams({
        ugcRate,
        ugcShortVideo: ugcShortVideo.toString(),
        ugcLongVideo: ugcLongVideo.toString(),
        ugcPhotos: ugcPhotos.toString(),
        exclusivityMonths,
        exclusivityRate,
        usageDuration,
        adsOnPaidSocial: adsOnPaidSocial.toString(),
        emailWebsite: emailWebsite.toString(),
        inStoreBillboards: inStoreBillboards.toString(),
        discountRate,
        emailAddress,
      });
      router.push(`/pricing-calculator/invoice?${params.toString()}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header variant="light" />

      <main className="min-h-screen bg-[#f7f7f7] pt-40 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Know exactly what to charge brands
            </h1>
            <p className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
              Every brand deal you've taken was probably worth more. Find out your real number — in
              2 minutes.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-12">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="flex items-center"
              >
                <div
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => handleStepClick(step.number)}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      step.number === currentStep
                        ? 'bg-purple-600 text-white border-2 border-purple-600'
                        : step.number < currentStep
                          ? 'bg-purple-600 text-white border-2 border-purple-600'
                          : 'bg-white text-gray-400 border-2 border-gray-300'
                    }`}
                  >
                    {step.number < currentStep ? (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </div>
                  <p
                    className={`text-xs mt-2 transition-colors whitespace-nowrap ${
                      step.number === currentStep
                        ? 'text-purple-600 font-medium'
                        : step.number < currentStep
                          ? 'text-purple-600'
                          : 'text-gray-500'
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-2 mb-6 transition-colors ${
                      step.number < currentStep ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
            {/* STEP 1: Campaign Type */}
            {currentStep === 1 && (
              <>
                {/* Form Header */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    What kind of campaign is this?
                  </h2>
                  <p className="text-sm text-gray-500">Choose the campaign type.</p>
                </div>

                {/* Campaign Options */}
                <div className="space-y-3 mb-6">
                  {campaignOptions.map(option => (
                    <div
                      key={option.id}
                      onClick={() => handleCampaignSelect(option.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        selectedCampaign === option.id
                          ? 'bg-purple-50 border-purple-500'
                          : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-base font-medium text-gray-900 mb-1">
                            {option.title}
                          </h3>
                          <p className="text-sm text-gray-600">{option.description}</p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              selectedCampaign === option.id
                                ? 'border-purple-600 bg-purple-600'
                                : 'border-gray-300 bg-white'
                            }`}
                          >
                            {selectedCampaign === option.id && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continue Button */}
                <div>
                  <button
                    type="button"
                    onClick={handleContinue}
                    className="px-6 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {/* STEP 2: Your Reach */}
            {currentStep === 2 && (
              <>
                {/* Form Header */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">What's your reach?</h2>
                  <p className="text-base text-gray-600">
                    Toggle the platforms you use for this campaign and fill other details.
                  </p>
                </div>

                {/* Input Section */}
                <div className="mb-6">
                  <label
                    htmlFor="ugcRate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your flat UGC production rate (₦)
                  </label>
                  <input
                    type="text"
                    id="ugcRate"
                    value={ugcRate}
                    onChange={e => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      setUgcRate(value);
                    }}
                    placeholder="Enter your flat UGC rate"
                    className="w-full px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Your base rate for creating UGC content before usage, ads, or licensing fees are
                    added.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleContinue}
                    className="px-6 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {/* STEP 3: Deliverables */}
            {currentStep === 3 && (
              <>
                {/* Form Header */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    What content will you deliver?
                  </h2>
                  <p className="text-base text-gray-600">
                    Add how many of each content type the brand is asking for. Only your active
                    platforms show here.
                  </p>
                </div>

                {/* Deliverable Options */}
                <div className="space-y-3 mb-6">
                  {/* UGC Short-Form Video */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setUgcShortVideo(!ugcShortVideo)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                          ugcShortVideo ? 'bg-purple-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            ugcShortVideo ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                      <label
                        className="text-base font-medium text-gray-900 cursor-pointer"
                        onClick={() => setUgcShortVideo(!ugcShortVideo)}
                      >
                        UGC Short-Form Video
                      </label>
                    </div>
                  </div>

                  {/* UGC Long-Form Video */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setUgcLongVideo(!ugcLongVideo)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                          ugcLongVideo ? 'bg-purple-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            ugcLongVideo ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                      <label
                        className="text-base font-medium text-gray-900 cursor-pointer"
                        onClick={() => setUgcLongVideo(!ugcLongVideo)}
                      >
                        UGC Long-Form Video
                      </label>
                    </div>
                  </div>

                  {/* UGC Photos */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setUgcPhotos(!ugcPhotos)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                          ugcPhotos ? 'bg-purple-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            ugcPhotos ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                      <label
                        className="text-base font-medium text-gray-900 cursor-pointer"
                        onClick={() => setUgcPhotos(!ugcPhotos)}
                      >
                        UGC Photos
                      </label>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleContinue}
                    className="px-6 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {/* STEP 4: Rights & Quote */}
            {currentStep === 4 && (
              <>
                {/* Section 1: Exclusivity Lock-Out */}
                <div className="mb-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    Exclusivity Lock-Out
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Set the duration and the rate you agree to remain exclusive to this brand.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="exclusivityMonths"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Number of months
                      </label>
                      <input
                        type="text"
                        id="exclusivityMonths"
                        value={exclusivityMonths}
                        onChange={e => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          setExclusivityMonths(value);
                        }}
                        placeholder="Enter no of months"
                        className="w-full px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Set how long work with competing brands will be restricted.
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="exclusivityRate"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Your Exclusive rate (%)
                      </label>
                      <input
                        type="text"
                        id="exclusivityRate"
                        value={exclusivityRate}
                        onChange={e => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          setExclusivityRate(value);
                        }}
                        placeholder="Enter rate"
                        className="w-full px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Set the additional charge applied for exclusivity.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 2: Usage & Licensing Duration */}
                <div className="mb-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    Usage & Licensing Duration
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Configure the active period for content usage, promotions, and media rights.
                  </p>

                  <div>
                    <label
                      htmlFor="usageDuration"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Number of months
                    </label>
                    <select
                      id="usageDuration"
                      value={usageDuration}
                      onChange={e => setUsageDuration(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all cursor-pointer"
                    >
                      <option value="">Select number of months</option>
                      <option value="1">1 Month</option>
                      <option value="3">3 Months</option>
                      <option value="6">6 Months</option>
                      <option value="12">12 Months</option>
                      <option value="24">24 Months</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Helping text for user</p>
                  </div>
                </div>

                {/* Section 3: Custom Usage Rate */}
                <div className="mb-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">Custom Usage rate</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Set custom percentage rates for different advertising and digital usage
                    channels.
                  </p>

                  <div className="space-y-3">
                    {/* Ads on Paid Social */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setAdsOnPaidSocial(!adsOnPaidSocial)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                            adsOnPaidSocial ? 'bg-purple-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              adsOnPaidSocial ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                        <label
                          className="text-base font-medium text-gray-900 cursor-pointer"
                          onClick={() => setAdsOnPaidSocial(!adsOnPaidSocial)}
                        >
                          Ads on Paid Social
                        </label>
                      </div>
                    </div>

                    {/* Email / Website */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setEmailWebsite(!emailWebsite)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                            emailWebsite ? 'bg-purple-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              emailWebsite ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                        <label
                          className="text-base font-medium text-gray-900 cursor-pointer"
                          onClick={() => setEmailWebsite(!emailWebsite)}
                        >
                          Email / Website
                        </label>
                      </div>
                    </div>

                    {/* In-Store / Billboards */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setInStoreBillboards(!inStoreBillboards)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                            inStoreBillboards ? 'bg-purple-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              inStoreBillboards ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                        <label
                          className="text-base font-medium text-gray-900 cursor-pointer"
                          onClick={() => setInStoreBillboards(!inStoreBillboards)}
                        >
                          In-Store / Billboards
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 4: Discount */}
                <div className="mb-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">Discount</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Set a discount percentage that will be applied to this deal.
                  </p>

                  <div>
                    <label
                      htmlFor="discountRate"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Discount rate (%)
                    </label>
                    <input
                      type="text"
                      id="discountRate"
                      value={discountRate}
                      onChange={e => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        setDiscountRate(value);
                      }}
                      placeholder="Enter percentage discount"
                      className="w-full px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Section 5: Get Quote (Invoice) */}
                <div className="mb-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    Get Quote (Invoice)
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Provide your email address where the quote will be sent to.
                  </p>

                  <div>
                    <label
                      htmlFor="emailAddress"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Your email address
                    </label>
                    <input
                      type="email"
                      id="emailAddress"
                      value={emailAddress}
                      onChange={e => setEmailAddress(e.target.value)}
                      placeholder="Enter email address"
                      className="w-full px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleGetFullQuote}
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Processing...' : 'Get full quote'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
