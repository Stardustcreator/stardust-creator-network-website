'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import { persistGuestBriefToken } from '@/lib/guest-brief-token';
import { submitBrief } from '@/lib/api/briefs';
import {
  extractUTMParams,
  resolveBudgetKobo,
  synthesizeCampaignBrief,
  synthesizeTimeline,
} from '@/lib/brief-payload';

const COUNTRIES = ['Nigeria', 'United Kingdom', 'Other'];
const INDUSTRIES = [
  'Fashion & Beauty',
  'Food & Beverage',
  'FMCG / Consumer Goods',
  'Tech / Fintech',
  'Media & Entertainment',
  'Lifestyle / Travel',
  'Health & Wellness',
  'Education',
  'Other',
];
const BUSINESS_TYPES = ['Brand', 'Marketing / PR Agency', 'Startup', 'Nonprofit'];

const CAMPAIGN_GOALS = [
  'Brand Awareness',
  'Product Launch',
  'Engagement & UGC Creation',
  'Sales / Conversion',
  'Community Growth',
  'Event promotion',
  'Others',
];
const CAMPAIGN_TYPES = [
  'Influencer Marketing',
  'UGC Content Creation',
  'Co-Branded Partnership',
  'Event or Experience',
  'Sponsorship / Product Seeding',
  'Other',
];
const TARGET_AUDIENCES = [
  'Gen Z (18-24)',
  'Millennials (25-35)',
  'Gen X (36-51)',
  'Families',
  'Professionals',
  'Others',
];
const TARGET_MARKETS = ['Nigeria', 'United Kingdom', 'Pan-Africa', 'Global'];

const CREATOR_GENDERS = ['Male', 'Female', 'Both'];
const CREATOR_AGE_RANGES = ['18 - 24', '25 - 34', '35 - 45', '46 - 60', '60 above'];
const CONTENT_CATEGORIES = [
  'Fashion / Beauty',
  'Lifestyle / Travel',
  'Food / Culture',
  'Tech / Business',
  'Fitness / Wellness',
  'Education / Thought Leadership',
  'Art / Photography',
  'Entertainment / Comedy',
  'Other',
];
const PLATFORM_FOCUS_OPTIONS = [
  'Instagram',
  'Tiktok',
  'Youtube',
  'X/Twitter',
  'Linkedin',
  'Facebook',
];

const CREATOR_TIER_NAMES = ['Nano', 'Micro', 'Mid-Tier', 'Macro', 'Mega'];

const TIER_RANGES_BY_PLATFORM: Record<string, Record<string, string>> = {
  Instagram: {
    Nano: '1K - 10K',
    Micro: '10K - 50K',
    'Mid-Tier': '50K - 250K',
    Macro: '250K - 1M',
    Mega: '1M+',
  },
  Tiktok: {
    Nano: '1K - 10K',
    Micro: '10K - 100K',
    'Mid-Tier': '100K - 500K',
    Macro: '500K - 1M',
    Mega: '1M+',
  },
  Youtube: {
    Nano: '1K - 10K',
    Micro: '10K - 50K',
    'Mid-Tier': '50K - 250K',
    Macro: '250K - 1M',
    Mega: '1M+',
  },
  'X/Twitter': {
    Nano: '1K - 5K',
    Micro: '5K - 25K',
    'Mid-Tier': '25K - 100K',
    Macro: '100K - 500K',
    Mega: '500K+',
  },
  Linkedin: {
    Nano: '500 - 2K',
    Micro: '2K - 10K',
    'Mid-Tier': '10K - 50K',
    Macro: '50K - 100K',
    Mega: '100K+',
  },
  Facebook: {
    Nano: '1K - 10K',
    Micro: '10K - 50K',
    'Mid-Tier': '50K - 250K',
    Macro: '250K - 1M',
    Mega: '1M+',
  },
};

const NIGERIA_BUDGET_RANGES = ['₦500k - ₦2M', '₦2.5M - ₦5M', '₦5M - ₦10M', '₦10M+'];
const UK_BUDGET_RANGES = ['£5k - £10k', '£10k - £50k', '£50k - £100k', '£100k+'];
const PAYMENT_MODELS = [
  'Flat campaign fee',
  'Percentage of campaign budget (e.g. 10-15%)',
  'Per-creator fee',
  'Hybrid (flat + %)',
  'Not sure yet',
];
const ONGOING_COLLABORATION_OPTIONS = [
  'Yes, if ROI is clear',
  'Maybe',
  'No, prefer one-off campaigns',
];

const CAMPAIGN_DURATIONS = ['1-4 weeks', '1-3 months', '3-6 months', 'Ongoing'];
const DELIVERABLES = [
  'Social Media Content (Reels, TikToks, Shorts)',
  'UGC Assets (Photos, Videos)',
  'Blog / Written Content',
  'Event Appearances',
  'Product Reviews / Testimonials',
  'Licensing Rights & Paid Usage',
  'Other',
];

const REFERRAL_SOURCES = ['Referral', 'Instagram', 'LinkedIn', 'Industry Event', 'Other'];
const COLLABORATION_TYPES = [
  'One-off Campaign',
  'Long-term Partnership',
  'Always-on Creator Roster',
];
const COMMUNITY_INTEREST_LEVELS = ['Yes', 'Maybe', 'Not now'];

const WHAT_HAPPENS_NEXT = [
  {
    title: 'Brief Review',
    description: 'Our team analyzes your requirements and matches you on suitable creators.',
  },
  {
    title: 'Creator Shortlist',
    description: 'Receive a curated list of verified creators with detailed profiles and rates.',
  },
  {
    title: 'Campaign Launch',
    description: 'Start your collaboration with handpicked creators who align with your brand.',
  },
];

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/stardustcreatornetwork/',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@stardustcreatornetwork',
    path: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@StardustCreatorNetwork',
    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/stardust-creator-network',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
];

const STEP_LABELS = [
  'Brand Info',
  'Campaign objectives',
  'Creator preference',
  'Budget & Payment',
  'Timeline & Deliverables',
  'Additional Information',
  'Agreement',
  'Success',
];

const inputClass =
  'w-full rounded-lg px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 ' +
  'border border-[#E7E5E4] focus:outline-none focus:ring-2 focus:ring-[#57058B]/20 focus:border-[#57058B] transition-colors';

function CheckboxIcon({ checked }: { checked: boolean }) {
  if (checked) {
    return (
      <span
        className="shrink-0 flex items-center justify-center rounded-full"
        style={{
          width: 28,
          height: 28,
          background: 'linear-gradient(90deg, #A51CFF 0%, #57058B 100%)',
          border: '1.75px solid #8500D1',
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M4 10.5L8 14.5L16 5.5"
            stroke="white"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  return (
    <span
      className="shrink-0 rounded-md bg-white"
      style={{ width: 20, height: 20, border: '1.75px solid #E7E5E4' }}
    />
  );
}

function CheckboxOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className="flex items-center gap-3 p-3.5 rounded-lg cursor-pointer"
      style={{ backgroundColor: '#FAFAF9' }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <CheckboxIcon checked={checked} />
      <span className="text-sm text-neutral-800">{label}</span>
    </label>
  );
}

function RadioIcon({ selected }: { selected: boolean }) {
  if (selected) {
    return (
      <span
        className="shrink-0 flex items-center justify-center rounded-full"
        style={{
          width: 28,
          height: 28,
          background: 'linear-gradient(90deg, #A51CFF 0%, #57058B 100%)',
          border: '1.75px solid #8500D1',
        }}
      >
        <span
          className="rounded-full bg-white"
          style={{ width: 8, height: 8 }}
        />
      </span>
    );
  }
  return (
    <span
      className="shrink-0 rounded-full bg-white"
      style={{ width: 20, height: 20, border: '1.75px solid #E7E5E4' }}
    />
  );
}

function RadioOption({
  label,
  selected,
  onSelect,
  name,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
  name: string;
}) {
  return (
    <label
      className="flex items-center gap-3 p-3.5 rounded-lg cursor-pointer"
      style={{ backgroundColor: '#FAFAF9' }}
    >
      <input
        type="radio"
        name={name}
        checked={selected}
        onChange={onSelect}
        className="hidden"
      />
      <RadioIcon selected={selected} />
      <span className="text-sm text-neutral-800">{label}</span>
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-sm text-red-600">{message}</p>;
}

/** Swaps the shared input border for a red one when the field has a validation error. */
function fieldClass(hasError: boolean) {
  return hasError ? inputClass.replace('border-[#E7E5E4]', 'border-red-400') : inputClass;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function TierCard({
  tierName,
  range,
  selected,
  onSelect,
}: {
  tierName: string;
  range: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex-1 rounded-lg p-3 text-center transition-colors"
      style={
        selected
          ? { backgroundColor: '#FBF3FF', border: '1.75px solid #57058B' }
          : { backgroundColor: '#FAFAF9', border: '1.75px solid transparent' }
      }
    >
      <div
        className="text-sm font-semibold"
        style={{ color: selected ? '#57058B' : '#262626' }}
      >
        {tierName}
      </div>
      <div className="text-xs text-neutral-500 mt-0.5">{range}</div>
    </button>
  );
}

export default function BriefPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = STEP_LABELS.length;
  const percentComplete = Math.round((currentStep / totalSteps) * 100);

  const [brandName, setBrandName] = useState('');
  const [website, setWebsite] = useState('');
  const [country, setCountry] = useState('Nigeria');
  const [industry, setIndustry] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);

  const [campaignName, setCampaignName] = useState('');
  const [campaignGoals, setCampaignGoals] = useState<string[]>([]);
  const [campaignType, setCampaignType] = useState('');
  const [targetAudiences, setTargetAudiences] = useState<string[]>([]);
  const [targetMarkets, setTargetMarkets] = useState<string[]>([]);

  const [numCreators, setNumCreators] = useState('');
  const [creatorGender, setCreatorGender] = useState('');
  const [creatorAgeRange, setCreatorAgeRange] = useState('');
  const [contentCategories, setContentCategories] = useState<string[]>([]);
  const [platformFocus, setPlatformFocus] = useState<string[]>([]);
  const [preferredTiers, setPreferredTiers] = useState<Record<string, string[]>>({});
  const [brandCreatorFit, setBrandCreatorFit] = useState('');

  const [estimatedBudget, setEstimatedBudget] = useState('');
  const [paymentModel, setPaymentModel] = useState('');
  const [ongoingCollaboration, setOngoingCollaboration] = useState('');

  const [campaignStartDate, setCampaignStartDate] = useState('');
  const [campaignDuration, setCampaignDuration] = useState('');
  const [deliverables, setDeliverables] = useState<string[]>([]);

  const [referralSource, setReferralSource] = useState('');
  const [collaborationType, setCollaborationType] = useState('');
  const [communityInterest, setCommunityInterest] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const [authorizedConfirmed, setAuthorizedConfirmed] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const phonePlaceholder = country === 'United Kingdom' ? '+44 XXXX XXXXXX' : '+234 XXX XXX XXXX';
  const today = new Date().toISOString().split('T')[0];

  const clearError = (field: string) => {
    setErrors(prev => {
      if (!(field in prev)) return prev;
      const { [field]: _removed, ...rest } = prev;
      return rest;
    });
  };

  const toggleValue = (list: string[], value: string, setList: (v: string[]) => void) => {
    setList(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
  };

  /**
   * Required fields per step, mirroring the Brand OS wizard's own required-field spec
   * (src/components/campaigns/brief-builder/steps.ts) so the two brief-intake surfaces
   * agree on what "required" means - the backend itself is deliberately lenient here
   * (an incomplete brief is saved and flagged, not rejected), so there's no DTO-level
   * source of truth to check against beyond brandName/contactEmail/the two agreements.
   */
  const validateStep = (step: number): Record<string, string> => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!brandName.trim()) errs.brandName = 'Enter your brand/company name';
      if (!website.trim()) errs.website = "Enter your company's website";
      if (!industry) errs.industry = 'Select your industry';
      if (!businessType) errs.businessType = 'Select your business type';
      if (!contactPerson.trim()) errs.contactPerson = 'Enter a contact person';
      if (!email.trim()) errs.email = 'Enter your email';
      else if (!EMAIL_PATTERN.test(email.trim())) errs.email = 'Enter a valid email address';
    }

    if (step === 2) {
      if (!campaignName.trim()) errs.campaignName = 'Enter your campaign name';
      if (campaignGoals.length === 0) errs.campaignGoals = 'Select at least one campaign goal';
      if (!campaignType) errs.campaignType = 'Select a campaign type';
      if (targetAudiences.length === 0) {
        errs.targetAudiences = 'Select at least one target audience';
      }
      if (targetMarkets.length === 0) errs.targetMarkets = 'Select at least one target market';
    }

    if (step === 3) {
      const parsedCount = parseInt(numCreators, 10);
      if (!numCreators.trim()) errs.numCreators = 'Enter the number of creators you need';
      else if (!Number.isInteger(parsedCount) || parsedCount < 1) {
        errs.numCreators = 'Enter a valid number of creators';
      }
      if (!creatorGender) errs.creatorGender = 'Select the creator(s) gender';
      if (!creatorAgeRange) errs.creatorAgeRange = 'Select a preferred age range';
      if (contentCategories.length === 0) {
        errs.contentCategories = 'Select at least one content category';
      }
      if (platformFocus.length === 0) errs.platformFocus = 'Select at least one platform';
    }

    if (step === 4) {
      if (!estimatedBudget) errs.estimatedBudget = 'Select your budget range';
      if (!ongoingCollaboration) {
        errs.ongoingCollaboration = 'Select an ongoing collaboration option';
      }
    }

    if (step === 5) {
      if (!campaignStartDate) errs.campaignStartDate = 'Select a campaign start date';
      if (deliverables.length === 0) errs.deliverables = 'Select at least one deliverable';
    }

    return errs;
  };

  /** Only validates on a forward move - Back always works, even from a half-filled step. */
  const goToStep = (target: number) => {
    if (target > currentStep) {
      const stepErrors = validateStep(currentStep);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return;
      }
    }
    setErrors({});
    setCurrentStep(target);
  };

  const togglePreferredTier = (platform: string, tierName: string) => {
    setPreferredTiers(prev => {
      const current = prev[platform] ?? [];
      const next = current.includes(tierName)
        ? current.filter(t => t !== tierName)
        : [...current, tierName];

      if (next.length === 0) {
        const { [platform]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [platform]: next };
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    const parsedNumCreators = parseInt(numCreators, 10);

    try {
      const utm = extractUTMParams(typeof window === 'undefined' ? null : window.location.href);

      // The backend rejects unknown properties, so this must be the flat
      // payload it documents - not the grouped shape the wizard holds in
      // state. Send only fields it knows about.
      const result = await submitBrief({
        brandName,
        contactEmail: email,
        contactName: contactPerson || undefined,
        budget: resolveBudgetKobo(country, estimatedBudget),
        timeline: synthesizeTimeline({ campaignStartDate, campaignDuration }),
        campaignBrief: synthesizeCampaignBrief(
          { campaignName, campaignGoals },
          { brandCreatorFit },
          { additionalNotes }
        ),

        companyWebsite: website || undefined,
        country,
        industry: industry || undefined,
        typeOfBusiness: businessType || undefined,
        contactPhone: phone || undefined,
        marketingOptIn: consent,

        campaignName: campaignName || undefined,
        campaignGoals,
        campaignType: campaignType || undefined,
        targetAudiences,
        targetMarkets,

        preferredTiers: platformFocus
          .filter(platform => (preferredTiers[platform] ?? []).length > 0)
          .map(platform => ({ platform, tiers: preferredTiers[platform] })),
        contentCategories,
        platforms: platformFocus,
        brandCreatorFit: brandCreatorFit || undefined,
        creatorCountNeeded: Number.isNaN(parsedNumCreators) ? undefined : parsedNumCreators,
        creatorGender: creatorGender || undefined,
        creatorAgeRange: creatorAgeRange || undefined,

        budgetRange: estimatedBudget || undefined,
        paymentModel: paymentModel || undefined,
        ongoingCollaboration: ongoingCollaboration || undefined,

        campaignStartDate: campaignStartDate || undefined,
        campaignDuration: campaignDuration || undefined,
        deliverables,

        howHeard: referralSource || undefined,
        collaborationType: collaborationType || undefined,
        communityInterest: communityInterest || undefined,
        additionalNotes: additionalNotes || undefined,

        authorizationConfirmed: authorizedConfirmed,
        termsAgreed,

        locationDetected: country,
        utmSource: utm.utm_source,
        utmMedium: utm.utm_medium,
        utmCampaign: utm.utm_campaign,
        referrerUrl: typeof document === 'undefined' ? undefined : document.referrer || undefined,
      });

      if (result.briefId && result.guestToken) {
        persistGuestBriefToken(result.briefId, result.guestToken);
      }

      // The backend decides where a submitted brief goes next - single-
      // creator to the pitch route, multi-creator to the sourcing tail
      // (terms, mobilization payment, sourcing desk). `nextRoute` is the
      // single routing authority; the guest token is how each destination
      // reads the brief back, so both are needed to navigate.
      if (result.nextRoute && result.guestToken) {
        router.push(`/${result.nextRoute}?token=${encodeURIComponent(result.guestToken)}`);
        return;
      }

      // No routing signal (older backend) - stay on the inline success step.
      setCurrentStep(8);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to submit brief. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main
        className="min-h-screen pt-32 pb-20 px-4 sm:px-6"
        style={{ backgroundColor: '#FBF3FF' }}
      >
        <div className="max-w-3xl mx-auto">
          {currentStep < 8 && (
            <>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-neutral-500">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="text-sm text-neutral-500">{percentComplete}% complete</span>
              </div>

              <div className="w-full h-1.5 rounded-full bg-neutral-200 overflow-hidden mb-8">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${percentComplete}%`, backgroundColor: '#FF5400' }}
                />
              </div>

              <div
                className="grid mb-8"
                style={{ gridTemplateColumns: `repeat(${STEP_LABELS.length}, 1fr)` }}
              >
                {STEP_LABELS.map((label, index) => {
                  const stepNumber = index + 1;
                  const isCurrent = stepNumber === currentStep;
                  const isDone = stepNumber < currentStep;

                  return (
                    <div
                      key={label}
                      className="relative flex flex-col items-center px-1"
                    >
                      {index !== 0 && (
                        <div
                          className="absolute h-px"
                          style={{
                            top: '16px',
                            left: '-50%',
                            width: '100%',
                            backgroundColor: '#E5E5E5',
                          }}
                        />
                      )}
                      <div
                        className="relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold"
                        style={
                          isDone
                            ? {
                                borderColor: '#57058B',
                                backgroundColor: '#57058B',
                                color: '#FFFFFF',
                              }
                            : isCurrent
                              ? {
                                  borderColor: '#57058B',
                                  color: '#57058B',
                                  backgroundColor: '#FFFFFF',
                                }
                              : {
                                  borderColor: '#E5E5E5',
                                  color: '#A1A1A1',
                                  backgroundColor: '#FFFFFF',
                                }
                        }
                      >
                        {isDone ? '✓' : stepNumber}
                      </div>
                      <span
                        className={`mt-2 text-xs text-center leading-tight ${isCurrent ? 'font-semibold' : ''}`}
                        style={{ color: isCurrent || isDone ? '#57058B' : '#A1A1A1' }}
                      >
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-10 md:p-12">
            {currentStep === 1 && (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">
                    Brand / Company Information
                  </h1>
                  <p className="text-neutral-500">Help us understand your brand and audience.</p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                      Brand / Company name
                    </label>
                    <input
                      type="text"
                      value={brandName}
                      onChange={e => {
                        setBrandName(e.target.value);
                        clearError('brandName');
                      }}
                      placeholder="Enter your brand name/company"
                      className={fieldClass(!!errors.brandName)}
                    />
                    <FieldError message={errors.brandName} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                      Company&apos;s website
                    </label>
                    <input
                      type="text"
                      value={website}
                      onChange={e => {
                        setWebsite(e.target.value);
                        clearError('website');
                      }}
                      placeholder="https://your company.com"
                      className={fieldClass(!!errors.website)}
                    />
                    <FieldError message={errors.website} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                      Country
                    </label>
                    <select
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                      className={`${inputClass} appearance-none bg-white`}
                    >
                      {COUNTRIES.map(option => (
                        <option
                          key={option}
                          value={option}
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                      Industry
                    </label>
                    <select
                      value={industry}
                      onChange={e => {
                        setIndustry(e.target.value);
                        clearError('industry');
                      }}
                      className={`${fieldClass(!!errors.industry)} appearance-none bg-white`}
                    >
                      <option value="">Select your Industry</option>
                      {INDUSTRIES.map(option => (
                        <option
                          key={option}
                          value={option}
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                    <FieldError message={errors.industry} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                      Type of business
                    </label>
                    <select
                      value={businessType}
                      onChange={e => {
                        setBusinessType(e.target.value);
                        clearError('businessType');
                      }}
                      className={`${fieldClass(!!errors.businessType)} appearance-none bg-white`}
                    >
                      <option value="">Select business type</option>
                      {BUSINESS_TYPES.map(option => (
                        <option
                          key={option}
                          value={option}
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                    <FieldError message={errors.businessType} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      value={contactPerson}
                      onChange={e => {
                        setContactPerson(e.target.value);
                        clearError('contactPerson');
                      }}
                      placeholder="Enter contact person name"
                      className={fieldClass(!!errors.contactPerson)}
                    />
                    <FieldError message={errors.contactPerson} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => {
                        setEmail(e.target.value);
                        clearError('email');
                      }}
                      placeholder="you@example.com"
                      className={fieldClass(!!errors.email)}
                    />
                    <FieldError message={errors.email} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder={phonePlaceholder}
                      className={inputClass}
                    />
                  </div>

                  <div className="pt-1">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={e => setConsent(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-neutral-300 accent-[#57058B] cursor-pointer"
                      />
                      <span className="text-sm text-neutral-700 leading-relaxed">
                        I agree to receive updates, opportunities, and resources from Stardust
                        Creator Network via email. You can unsubscribe at any time.
                      </span>
                    </label>
                  </div>
                </div>

                <div
                  className="mt-6 rounded-lg p-4 flex items-start gap-3"
                  style={{ backgroundColor: '#EFF6FF' }}
                >
                  <svg
                    className="w-5 h-5 mt-0.5 shrink-0"
                    style={{ color: '#3B82F6' }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900 mb-1">
                      Your Privacy Matters
                    </p>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      We use this information to match you with the best creators and opportunities.
                      Your data is protected and will never be shared without your consent.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => goToStep(2)}
                  className="mt-8 px-8 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-all"
                  style={{ backgroundColor: '#57058B' }}
                >
                  Continue
                </button>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">
                    Campaign Objectives
                  </h1>
                  <p className="text-neutral-500">What do you want to achieve?</p>
                </div>

                <p className="text-sm font-semibold text-neutral-900 mb-6">
                  Help us understand your brand and audience.
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                      Campaign name
                    </label>
                    <input
                      type="text"
                      value={campaignName}
                      onChange={e => {
                        setCampaignName(e.target.value);
                        clearError('campaignName');
                      }}
                      placeholder="Enter your campaign name"
                      className={fieldClass(!!errors.campaignName)}
                    />
                    <FieldError message={errors.campaignName} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-2">
                      Campaign goal
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {CAMPAIGN_GOALS.map(goal => (
                        <CheckboxOption
                          key={goal}
                          label={goal}
                          checked={campaignGoals.includes(goal)}
                          onChange={() => {
                            toggleValue(campaignGoals, goal, setCampaignGoals);
                            clearError('campaignGoals');
                          }}
                        />
                      ))}
                    </div>
                    <FieldError message={errors.campaignGoals} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                      Campaign type
                    </label>
                    <select
                      value={campaignType}
                      onChange={e => {
                        setCampaignType(e.target.value);
                        clearError('campaignType');
                      }}
                      className={`${fieldClass(!!errors.campaignType)} appearance-none bg-white`}
                    >
                      <option value="">Select campaign type</option>
                      {CAMPAIGN_TYPES.map(type => (
                        <option
                          key={type}
                          value={type}
                        >
                          {type}
                        </option>
                      ))}
                    </select>
                    <FieldError message={errors.campaignType} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-2">
                      Target Audience
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {TARGET_AUDIENCES.map(audience => (
                        <CheckboxOption
                          key={audience}
                          label={audience}
                          checked={targetAudiences.includes(audience)}
                          onChange={() => {
                            toggleValue(targetAudiences, audience, setTargetAudiences);
                            clearError('targetAudiences');
                          }}
                        />
                      ))}
                    </div>
                    <FieldError message={errors.targetAudiences} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-2">
                      Target Market
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {TARGET_MARKETS.map(market => (
                        <CheckboxOption
                          key={market}
                          label={market}
                          checked={targetMarkets.includes(market)}
                          onChange={() => {
                            toggleValue(targetMarkets, market, setTargetMarkets);
                            clearError('targetMarkets');
                          }}
                        />
                      ))}
                    </div>
                    <FieldError message={errors.targetMarkets} />
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-8">
                  <button
                    type="button"
                    onClick={() => goToStep(1)}
                    className="px-6 py-3 rounded-lg font-semibold text-neutral-700 border border-[#E7E5E4] hover:bg-neutral-50 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => goToStep(3)}
                    className="px-8 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-all"
                    style={{ backgroundColor: '#57058B' }}
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">
                    Creator preference
                  </h1>
                  <p className="text-neutral-500">Describe your ideal creator..</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                      How many Creator(s) do you need?
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={numCreators}
                      onChange={e => {
                        setNumCreators(e.target.value);
                        clearError('numCreators');
                      }}
                      placeholder="Enter number of Creator(s)"
                      className={fieldClass(!!errors.numCreators)}
                    />
                    <FieldError message={errors.numCreators} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-2">
                      Creator(s) Gender
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {CREATOR_GENDERS.map(gender => (
                        <RadioOption
                          key={gender}
                          name="creatorGender"
                          label={gender}
                          selected={creatorGender === gender}
                          onSelect={() => {
                            setCreatorGender(gender);
                            clearError('creatorGender');
                          }}
                        />
                      ))}
                    </div>
                    <FieldError message={errors.creatorGender} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-2">
                      Preferred Creator Age Range
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {CREATOR_AGE_RANGES.map(range => (
                        <RadioOption
                          key={range}
                          name="creatorAgeRange"
                          label={range}
                          selected={creatorAgeRange === range}
                          onSelect={() => {
                            setCreatorAgeRange(range);
                            clearError('creatorAgeRange');
                          }}
                        />
                      ))}
                    </div>
                    <FieldError message={errors.creatorAgeRange} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-2">
                      Content Categories
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {CONTENT_CATEGORIES.map(category => (
                        <CheckboxOption
                          key={category}
                          label={category}
                          checked={contentCategories.includes(category)}
                          onChange={() => {
                            toggleValue(contentCategories, category, setContentCategories);
                            clearError('contentCategories');
                          }}
                        />
                      ))}
                    </div>
                    <FieldError message={errors.contentCategories} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-2">
                      Platform Focus
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PLATFORM_FOCUS_OPTIONS.map(platform => (
                        <CheckboxOption
                          key={platform}
                          label={platform}
                          checked={platformFocus.includes(platform)}
                          onChange={() => {
                            toggleValue(platformFocus, platform, setPlatformFocus);
                            clearError('platformFocus');
                          }}
                        />
                      ))}
                    </div>
                    <FieldError message={errors.platformFocus} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-2">
                      Preferred Creator Tier
                    </label>
                    <p className="text-sm text-neutral-500 mb-2">
                      Select one or more tiers for each platform you chose above.
                    </p>
                    {platformFocus.filter(platform => TIER_RANGES_BY_PLATFORM[platform]).length ===
                    0 ? (
                      <div
                        className="rounded-xl p-4 text-sm text-neutral-500"
                        style={{ border: '1px solid #E7E5E4', backgroundColor: '#FAFAF9' }}
                      >
                        Select a platform under Platform Focus above to choose creator tiers.
                      </div>
                    ) : (
                      <div
                        className="rounded-xl overflow-hidden"
                        style={{ border: '1px solid #E7E5E4' }}
                      >
                        {platformFocus
                          .filter(platform => TIER_RANGES_BY_PLATFORM[platform])
                          .map((platformName, index) => {
                            const ranges = TIER_RANGES_BY_PLATFORM[platformName];
                            const selectedTiers = preferredTiers[platformName] ?? [];

                            return (
                              <div
                                key={platformName}
                                className="p-4"
                                style={index !== 0 ? { borderTop: '1px solid #E7E5E4' } : undefined}
                              >
                                <p className="text-sm text-neutral-500 mb-3">{platformName}</p>
                                <div className="flex flex-wrap gap-3">
                                  {CREATOR_TIER_NAMES.map(tierName => (
                                    <TierCard
                                      key={tierName}
                                      tierName={tierName}
                                      range={ranges[tierName]}
                                      selected={selectedTiers.includes(tierName)}
                                      onSelect={() => togglePreferredTier(platformName, tierName)}
                                    />
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                      Brand-Creator Fit{' '}
                      <span className="text-neutral-400 font-normal">(Optional)</span>
                    </label>
                    <p className="text-sm text-neutral-500 mb-2">
                      Describe the type of creator personality, tone, or aesthetic that best fits
                      your brand.
                    </p>
                    <textarea
                      value={brandCreatorFit}
                      onChange={e => setBrandCreatorFit(e.target.value)}
                      placeholder="e.g., we're looking for creators who embody authenticity and genuine passion for sustainable living..."
                      rows={4}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-8">
                  <button
                    type="button"
                    onClick={() => goToStep(2)}
                    className="px-6 py-3 rounded-lg font-semibold text-neutral-700 border border-[#E7E5E4] hover:bg-neutral-50 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => goToStep(4)}
                    className="px-8 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-all"
                    style={{ backgroundColor: '#57058B' }}
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {currentStep === 4 && (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">
                    Budget and payment preference
                  </h1>
                  <p className="text-neutral-500">Let&apos;s align on scale and structure.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                      Estimated Campaign Budget
                    </label>
                    <select
                      value={estimatedBudget}
                      onChange={e => {
                        setEstimatedBudget(e.target.value);
                        clearError('estimatedBudget');
                      }}
                      className={`${fieldClass(!!errors.estimatedBudget)} appearance-none bg-white`}
                    >
                      <option value="">Select your budget range</option>
                      {(country === 'United Kingdom'
                        ? UK_BUDGET_RANGES
                        : NIGERIA_BUDGET_RANGES
                      ).map(range => (
                        <option
                          key={range}
                          value={range}
                        >
                          {range}
                        </option>
                      ))}
                    </select>
                    <FieldError message={errors.estimatedBudget} />
                  </div>

                  <div className="hidden">
                    <label className="block text-sm font-medium text-neutral-800 mb-2">
                      Preferred payment model
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      {PAYMENT_MODELS.map(model => (
                        <RadioOption
                          key={model}
                          name="paymentModel"
                          label={model}
                          selected={paymentModel === model}
                          onSelect={() => setPaymentModel(model)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                      Ongoing Collaboration Option <span className="text-red-500">*</span>
                    </label>
                    <p className="text-sm text-neutral-500 mb-2">
                      Would you consider a monthly retainer for continuous creator partnerships?
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                      {ONGOING_COLLABORATION_OPTIONS.map(option => (
                        <RadioOption
                          key={option}
                          name="ongoingCollaboration"
                          label={option}
                          selected={ongoingCollaboration === option}
                          onSelect={() => {
                            setOngoingCollaboration(option);
                            clearError('ongoingCollaboration');
                          }}
                        />
                      ))}
                    </div>
                    <FieldError message={errors.ongoingCollaboration} />
                  </div>
                </div>

                <div
                  className="mt-6 rounded-lg p-4 flex items-start gap-3"
                  style={{ backgroundColor: '#EFF6FF' }}
                >
                  <svg
                    className="w-5 h-5 mt-0.5 shrink-0"
                    style={{ color: '#3B82F6' }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900 mb-1">
                      Budget Transparency
                    </p>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      Your budget information helps us match you with creators whose rates align
                      with your investment level, ensuring better campaign outcomes for everyone.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-8">
                  <button
                    type="button"
                    onClick={() => goToStep(3)}
                    className="px-6 py-3 rounded-lg font-semibold text-neutral-700 border border-[#E7E5E4] hover:bg-neutral-50 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => goToStep(5)}
                    className="px-8 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-all"
                    style={{ backgroundColor: '#57058B' }}
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {currentStep === 5 && (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">
                    Timeline &amp; Deliverables
                  </h1>
                  <p className="text-neutral-500">When would you like to launch.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                      Campaign Start Date
                    </label>
                    <input
                      type="date"
                      min={today}
                      value={campaignStartDate}
                      onChange={e => {
                        setCampaignStartDate(e.target.value);
                        clearError('campaignStartDate');
                      }}
                      className={fieldClass(!!errors.campaignStartDate)}
                    />
                    <FieldError message={errors.campaignStartDate} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                      Campaign Duration
                    </label>
                    <select
                      value={campaignDuration}
                      onChange={e => setCampaignDuration(e.target.value)}
                      className={`${inputClass} appearance-none bg-white`}
                    >
                      <option value="">Select campaign duration</option>
                      {CAMPAIGN_DURATIONS.map(duration => (
                        <option
                          key={duration}
                          value={duration}
                        >
                          {duration}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-2">
                      Deliverables
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      {DELIVERABLES.map(deliverable => (
                        <CheckboxOption
                          key={deliverable}
                          label={deliverable}
                          checked={deliverables.includes(deliverable)}
                          onChange={() => {
                            toggleValue(deliverables, deliverable, setDeliverables);
                            clearError('deliverables');
                          }}
                        />
                      ))}
                    </div>
                    <FieldError message={errors.deliverables} />
                  </div>
                </div>

                <div
                  className="mt-6 rounded-lg p-4 flex items-start gap-3"
                  style={{ backgroundColor: '#EFF6FF' }}
                >
                  <svg
                    className="w-5 h-5 mt-0.5 shrink-0"
                    style={{ color: '#3B82F6' }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900 mb-1">Planning Tip</p>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      Allow 2-3 weeks for creator matching, brief reviews, and content planning
                      before your campaign start date for the best results.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-8">
                  <button
                    type="button"
                    onClick={() => goToStep(4)}
                    className="px-6 py-3 rounded-lg font-semibold text-neutral-700 border border-[#E7E5E4] hover:bg-neutral-50 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => goToStep(6)}
                    className="px-8 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-all"
                    style={{ backgroundColor: '#57058B' }}
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {currentStep === 6 && (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">
                    Additional Information
                  </h1>
                  <p className="text-neutral-500">A few final details before we match you.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                      How did you hear about SCN?
                    </label>
                    <select
                      value={referralSource}
                      onChange={e => setReferralSource(e.target.value)}
                      className={`${inputClass} appearance-none bg-white`}
                    >
                      <option value="">Select how you heard about us</option>
                      {REFERRAL_SOURCES.map(source => (
                        <option
                          key={source}
                          value={source}
                        >
                          {source}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-2">
                      Collaboration Type
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      {COLLABORATION_TYPES.map(type => (
                        <RadioOption
                          key={type}
                          name="collaborationType"
                          label={type}
                          selected={collaborationType === type}
                          onSelect={() => setCollaborationType(type)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="hidden">
                    <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                      Marketing Leaders Community
                    </label>
                    <p className="text-sm text-neutral-500 mb-2">
                      Interested in joining a community for marketing leaders to drive Brand Growth
                      (insights, workshops, case studies, peer-to-peer networking)?
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                      {COMMUNITY_INTEREST_LEVELS.map(level => (
                        <RadioOption
                          key={level}
                          name="communityInterest"
                          label={level}
                          selected={communityInterest === level}
                          onSelect={() => setCommunityInterest(level)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                      Additional Notes{' '}
                      <span className="text-neutral-400 font-normal">(Optional)</span>
                    </label>
                    <p className="text-sm text-neutral-500 mb-2">
                      Anything else we should know about your campaign or goals?
                    </p>
                    <textarea
                      value={additionalNotes}
                      onChange={e => setAdditionalNotes(e.target.value)}
                      placeholder="Share any specific requirements, constraints, or additional contexts that will help us find the perfect creators for your campaign..."
                      rows={4}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>

                <div
                  className="mt-6 rounded-lg p-4 fle items-start gap-3 hidden"
                  style={{ backgroundColor: '#EFF6FF' }}
                >
                  <svg
                    className="w-5 h-5 mt-0.5 shrink-0"
                    style={{ color: '#3B82F6' }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="hidden">
                    <p className="text-sm font-semibold text-neutral-900 mb-1">
                      Marketing Leaders Community
                    </p>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      Join an exclusive network of marketing leaders focused on driving business
                      growth through creator partnerships, data insights, and proven strategies.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-8">
                  <button
                    type="button"
                    onClick={() => goToStep(5)}
                    className="px-6 py-3 rounded-lg font-semibold text-neutral-700 border border-[#E7E5E4] hover:bg-neutral-50 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => goToStep(7)}
                    className="px-8 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-all"
                    style={{ backgroundColor: '#57058B' }}
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {currentStep === 7 && (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">
                    Agreement &amp; Submission
                  </h1>
                  <p className="text-neutral-500">Just one step left.</p>
                </div>

                <div className="space-y-3">
                  <label
                    className="flex items-center gap-3 p-4 rounded-lg cursor-pointer"
                    style={{ backgroundColor: '#FAFAF9' }}
                  >
                    <input
                      type="checkbox"
                      checked={authorizedConfirmed}
                      onChange={e => setAuthorizedConfirmed(e.target.checked)}
                      className="w-4 h-4 rounded border-neutral-300 accent-[#57058B]"
                    />
                    <span className="text-sm text-neutral-800">
                      I confirm I am authorized to represent this brand or agency.
                    </span>
                  </label>

                  <label
                    className="flex items-center gap-3 p-4 rounded-lg cursor-pointer"
                    style={{ backgroundColor: '#FAFAF9' }}
                  >
                    <input
                      type="checkbox"
                      checked={termsAgreed}
                      onChange={e => setTermsAgreed(e.target.checked)}
                      className="w-4 h-4 rounded border-neutral-300 accent-[#57058B]"
                    />
                    <span className="text-sm text-neutral-800">
                      I agree to SCN&apos;s{' '}
                      <Link
                        href="https://www.stardustcreatornetwork.com/legal/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                        style={{ color: '#57058B' }}
                        onClick={e => e.stopPropagation()}
                      >
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link
                        href="https://www.stardustcreatornetwork.com/legal/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                        style={{ color: '#57058B' }}
                        onClick={e => e.stopPropagation()}
                      >
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                </div>

                <p className="text-sm text-neutral-500 mt-6">
                  Our partnerships team will review your brief within 72 hours
                </p>

                {submitError && (
                  <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
                    {submitError}
                  </div>
                )}

                <button
                  type="button"
                  disabled={!authorizedConfirmed || !termsAgreed || isSubmitting}
                  onClick={handleSubmit}
                  className={`w-full mt-6 py-3.5 rounded-lg font-semibold transition-all ${
                    authorizedConfirmed && termsAgreed && !isSubmitting
                      ? 'text-white hover:opacity-90'
                      : 'text-neutral-400 bg-neutral-100 cursor-not-allowed'
                  }`}
                  style={
                    authorizedConfirmed && termsAgreed && !isSubmitting
                      ? { backgroundColor: '#57058B' }
                      : undefined
                  }
                >
                  {isSubmitting ? 'Submitting...' : 'Submit brief'}
                </button>

                <div
                  className="mt-6 rounded-lg p-4 flex items-start gap-3"
                  style={{ backgroundColor: '#EFF6FF' }}
                >
                  <svg
                    className="w-5 h-5 mt-0.5 shrink-0"
                    style={{ color: '#3B82F6' }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900 mb-1">Data Security</p>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      Your information is encrypted and stored securely. We will never share your
                      data with third parties without your explicit consent.
                    </p>
                  </div>
                </div>
              </>
            )}

            {currentStep === 8 && (
              <div>
                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: '#EAF9EF' }}
                  >
                    <svg
                      className="w-8 h-8"
                      style={{ color: '#22C55E' }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-black mb-3">
                    You&apos;re all set!
                  </h1>
                  <p className="text-neutral-500 max-w-lg mx-auto">
                    Our partnerships team will review your brief and contact you within 72 hours
                    with curated creator shortlist and tailored proposal.
                  </p>
                  <Link
                    href="/brief-status"
                    className="inline-block mt-4 font-semibold"
                    style={{ color: '#57058B' }}
                  >
                    View your brief anytime, no sign-in needed →
                  </Link>
                </div>

                <div
                  className="mt-8 rounded-xl p-6 sm:p-8 hidden"
                  style={{ border: '1px solid #E7E5E4' }}
                >
                  <p className="text-center text-neutral-700 max-w-2xl mx-auto mb-6">
                    Want to stay ahead of the curve? Join our Marketing Leaders community focused on
                    driving business growth using insights, case studies, reports, and tools.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button
                      type="button"
                      className="rounded-lg py-6 px-4 text-center font-semibold text-white border-2 border-transparent hover:border-[#57058B] transition-colors"
                      style={{ backgroundColor: '#FF5400' }}
                    >
                      Join Growth Authority Waitlist
                    </button>
                    <button
                      type="button"
                      className="rounded-lg py-6 px-4 text-center font-medium text-neutral-800 border-2 border-transparent hover:border-[#57058B] transition-colors"
                      style={{ backgroundColor: '#F1F5F9' }}
                    >
                      Book a brand Strategy Call
                    </button>
                    <Link
                      href="/case-studies"
                      className="rounded-lg py-6 px-4 text-center font-medium text-neutral-800 border-2 border-transparent hover:border-[#57058B] transition-colors flex items-center justify-center"
                      style={{ backgroundColor: '#F1F5F9' }}
                    >
                      Explore Creator Success Stories
                    </Link>
                  </div>
                </div>

                <div
                  className="mt-8 rounded-xl p-6 sm:p-8"
                  style={{ backgroundColor: '#FAFAF9' }}
                >
                  <h2 className="text-xl font-bold text-black text-center mb-6">
                    What happens next?
                  </h2>
                  <div className="space-y-3">
                    {WHAT_HAPPENS_NEXT.map((item, index) => (
                      <div
                        key={item.title}
                        className="bg-white rounded-lg p-4"
                        style={{ border: '1px solid #E7E5E4' }}
                      >
                        <p className="text-sm font-semibold text-neutral-900">
                          {index + 1}. {item.title}
                        </p>
                        <p className="text-sm text-neutral-500 mt-1">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="mt-6 rounded-xl p-6 sm:p-8"
                  style={{ border: '1px solid #E7E5E4' }}
                >
                  <p className="font-semibold text-neutral-900 mb-1">Follow us on Social media</p>
                  <p className="text-sm text-neutral-500 mb-4">
                    Stay updated with Creator&apos;s marketing insights, success stories, and
                    campaign inspiration.
                  </p>
                  <div className="flex gap-3">
                    {SOCIAL_LINKS.map(social => (
                      <Link
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-400 hover:text-[#57058B] transition-colors"
                        style={{ backgroundColor: '#F5F5F4' }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d={social.path} />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>

                <p className="text-center text-neutral-500 mt-6">
                  Questions? We&apos;re here to help.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
