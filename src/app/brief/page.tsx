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
// Values are the backend's CampaignType enum (CreateBriefDto.campaignType) -
// labels match the pricing calculator's CampaignTypeStep wording so the two
// surfaces agree on what each option means.
const CAMPAIGN_TYPES = [
  { value: 'sponsored_content', label: 'Sponsored Content (Post on Your Page)' },
  { value: 'ugc_content_only', label: 'UGC Content Only' },
  { value: 'posting_only', label: 'Posting Only (Brand Provides Content)' },
];
const TARGET_AUDIENCES = [
  'Gen Z (18-24)',
  'Millennials (25-35)',
  'Gen X (36-51)',
  'Families',
  'Professionals',
  'Others',
];
// Must match the backend's TARGET_MARKET_OPTIONS exactly (@IsIn) - "United
// Kingdom" is deliberately absent there: that's the brand's own country
// (see the `country` field above), not a market it can target.
const TARGET_MARKETS = ['Nigeria', 'Pan-Africa', 'Global'];

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

// The backend only stores budgets in Naira today (CreateBriefDto.budgetRange
// is a required IsIn against these exact five buckets) - no other currency
// is supported yet, so this applies regardless of the brand's country.
const BUDGET_RANGES = ['₦100k - ₦500k', '₦500k - ₦1M', '₦1M - ₦2.5M', '₦2.5M - ₦5M', '₦5M+'];
const PAYMENT_MODELS = [
  'Flat campaign fee',
  'Percentage of campaign budget (e.g. 10-15%)',
  'Per-creator fee',
  'Hybrid (flat + %)',
  'Not sure yet',
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
// Only these match a label the backend's deliverables schema recognizes
// (CreateBriefDto.deliverables -> BriefDeliverableDto, validated against
// ALL_DELIVERABLE_LABELS). The rest are bundled/licensing concepts with no
// backend deliverable equivalent, so they're folded into the free-text
// campaign brief instead of sent as deliverables - see handleSubmit.
const BACKEND_DELIVERABLE_LABELS = new Set([
  'Blog / Written Content',
  'Event Appearances',
  'Product Reviews / Testimonials',
  'Other',
]);

// CreateBriefDto.deliverablesScope (Prisma DeliverablesScope enum) - required
// whenever more than one creator is needed, rejected otherwise.
const DELIVERABLES_SCOPE_OPTIONS = [
  { value: 'per_creator', label: 'Per creator - each creator delivers this' },
  { value: 'aggregate', label: 'Aggregate total - split across however many creators are sourced' },
];

// CreateBriefDto.postingWindowUnit (Prisma DurationUnit enum).
const DURATION_UNITS = [
  { value: 'days', label: 'Days' },
  { value: 'weeks', label: 'Weeks' },
  { value: 'months', label: 'Months' },
  { value: 'years', label: 'Years' },
];

const REFERRAL_SOURCES = ['Referral', 'Instagram', 'LinkedIn', 'Industry Event', 'Other'];
const COLLABORATION_TYPES = [
  'One-off Campaign',
  'Long-term Partnership',
  'Always-on Creator Roster',
];
const COMMUNITY_INTEREST_LEVELS = ['Yes', 'Maybe', 'Not now'];

const STEP_LABELS = [
  'Brand Info',
  'Campaign objectives',
  'Creator preference',
  'Budget & Payment',
  'Timeline & Deliverables',
  'Additional Information',
  'Agreement',
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

/** Strips anything but digits, so a numeric field can never hold letters/symbols. */
const toDigits = (value: string) => value.replace(/\D/g, '');

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
  const [campaignGoal, setCampaignGoal] = useState('');
  const [campaignType, setCampaignType] = useState('');
  const [targetAudiences, setTargetAudiences] = useState<string[]>([]);
  const [targetMarkets, setTargetMarkets] = useState<string[]>([]);

  const [numCreators, setNumCreators] = useState('');
  const [creatorGender, setCreatorGender] = useState('');
  // Only meaningful (and only sent) when creatorGender is 'Both' - the
  // backend rejects a "Both" brief that omits either count, and separately
  // rejects either count being present for any other gender selection.
  const [maleCreatorCount, setMaleCreatorCount] = useState('');
  const [femaleCreatorCount, setFemaleCreatorCount] = useState('');
  const [creatorAgeRange, setCreatorAgeRange] = useState('');
  const [contentCategories, setContentCategories] = useState<string[]>([]);
  const [platformFocus, setPlatformFocus] = useState<string[]>([]);
  const [preferredTiers, setPreferredTiers] = useState<Record<string, string[]>>({});
  const [brandCreatorFit, setBrandCreatorFit] = useState('');

  const [estimatedBudget, setEstimatedBudget] = useState('');
  const [paymentModel, setPaymentModel] = useState('');

  const [campaignStartDate, setCampaignStartDate] = useState('');
  const [campaignDuration, setCampaignDuration] = useState('');
  const [deliverables, setDeliverables] = useState<string[]>([]);
  // Only required (and only sent) when more than one creator is needed - the
  // backend rejects it outright for a single-creator brief.
  const [deliverablesScope, setDeliverablesScope] = useState('');
  // Only required (and only sent) for a Posting Only campaign requesting more
  // than one post - the backend rejects it for every other case.
  const [postingWindowValue, setPostingWindowValue] = useState('');
  const [postingWindowUnit, setPostingWindowUnit] = useState('');

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

  const isMultiCreator = parseInt(numCreators, 10) > 1;
  const isUgcOnly = campaignType === 'ugc_content_only';
  const isPostingOnly = campaignType === 'posting_only';
  // Every mapped deliverable is sent at quantity 1, so the count of them is
  // the total post count the backend's posting-window rule sums against.
  const backendDeliverableCount = deliverables.filter(d =>
    BACKEND_DELIVERABLE_LABELS.has(d)
  ).length;
  const needsPostingWindow = isPostingOnly && backendDeliverableCount > 1;

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
      if (!campaignGoal) errs.campaignGoal = 'Select a campaign goal';
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
      if (creatorGender === 'Both') {
        const parsedMale = parseInt(maleCreatorCount, 10);
        const parsedFemale = parseInt(femaleCreatorCount, 10);
        if (!maleCreatorCount.trim() || !Number.isInteger(parsedMale) || parsedMale < 0) {
          errs.maleCreatorCount = 'Enter how many should be male';
        }
        if (!femaleCreatorCount.trim() || !Number.isInteger(parsedFemale) || parsedFemale < 0) {
          errs.femaleCreatorCount = 'Enter how many should be female';
        }
        if (
          !errs.maleCreatorCount &&
          !errs.femaleCreatorCount &&
          !errs.numCreators &&
          parsedMale + parsedFemale > parsedCount
        ) {
          errs.femaleCreatorCount = `Male and female counts can't add up to more than ${numCreators}`;
        }
      }
      if (!creatorAgeRange) errs.creatorAgeRange = 'Select a preferred age range';
      if (contentCategories.length === 0) {
        errs.contentCategories = 'Select at least one content category';
      }
      if (platformFocus.length === 0) errs.platformFocus = 'Select at least one platform';
    }

    if (step === 4) {
      if (!estimatedBudget) errs.estimatedBudget = 'Select your budget range';
    }

    if (step === 5) {
      if (!campaignStartDate) errs.campaignStartDate = 'Select a campaign start date';
      if (deliverables.length === 0) errs.deliverables = 'Select at least one deliverable';
      if (isMultiCreator && !deliverablesScope) {
        errs.deliverablesScope = 'Select how requirements apply across creators';
      }
      if (needsPostingWindow) {
        const parsedWindow = parseInt(postingWindowValue, 10);
        if (!postingWindowValue.trim() || !Number.isInteger(parsedWindow) || parsedWindow < 1) {
          errs.postingWindowValue = 'Enter how long the posting period runs';
        }
        if (!postingWindowUnit) errs.postingWindowUnit = 'Select a unit';
      }
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

      // Deliverables the backend has no matching label for aren't dropped -
      // they're folded into the free-text campaign brief below, so the
      // brand's answer still reaches a human even though it can't validate
      // as a structured deliverable. None of the mapped labels are valid on
      // a UGC Content Only brief either (the backend only accepts its own
      // UGC production formats there), so all selections fold to notes there.
      const backendDeliverables = isUgcOnly
        ? []
        : deliverables.filter(d => BACKEND_DELIVERABLE_LABELS.has(d));
      const otherDeliverables = isUgcOnly
        ? deliverables
        : deliverables.filter(d => !BACKEND_DELIVERABLE_LABELS.has(d));

      let campaignBrief = synthesizeCampaignBrief(
        { campaignName, campaignGoals: campaignGoal ? [campaignGoal] : [] },
        { brandCreatorFit },
        { additionalNotes }
      );
      if (otherDeliverables.length > 0) {
        campaignBrief += `\nOther requested formats: ${otherDeliverables.join(', ')}`;
      }
      // No backend field exists for this (CreateBriefDto has no
      // howHeard/referral-source property) - folded into the free-text
      // brief instead of sent as its own field.
      if (referralSource) {
        campaignBrief += `\nHeard about SCN via: ${referralSource}`;
      }
      // Platform Focus and per-platform tier preferences don't apply to a
      // UGC Content Only brief either - the creator hands over files and
      // never posts, so the backend rejects both fields outright there.
      // Folded into notes instead of dropped.
      if (isUgcOnly && platformFocus.length > 0) {
        campaignBrief += `\nPlatforms of interest: ${platformFocus.join(', ')}`;
      }

      // The backend rejects unknown properties, so this must be the flat
      // payload it documents - not the grouped shape the wizard holds in
      // state. Send only fields it knows about.
      const result = await submitBrief({
        brandName,
        contactEmail: email,
        contactName: contactPerson || undefined,
        budget: resolveBudgetKobo(country, estimatedBudget),
        timeline: synthesizeTimeline({ campaignStartDate, campaignDuration }),
        campaignBrief,

        companyWebsite: website || undefined,
        country,
        industry: industry || undefined,
        typeOfBusiness: businessType || undefined,
        contactPhone: phone || undefined,
        marketingOptIn: consent,

        campaignName: campaignName || undefined,
        campaignGoal: campaignGoal || undefined,
        campaignType: campaignType || undefined,
        targetAudiences,
        targetMarkets,

        // Rejected outright on a UGC Content Only brief - the creator hands
        // over files and never posts, so platform/tier preference doesn't
        // apply there (folded into campaignBrief above instead).
        preferredTiers: isUgcOnly
          ? undefined
          : platformFocus
              .filter(platform => (preferredTiers[platform] ?? []).length > 0)
              .map(platform => ({ platform, tiers: preferredTiers[platform] })),
        contentCategories,
        platforms: isUgcOnly ? undefined : platformFocus,
        brandCreatorFit: brandCreatorFit || undefined,
        creatorCountNeeded: Number.isNaN(parsedNumCreators) ? undefined : parsedNumCreators,
        creatorGender: creatorGender || undefined,
        // Only sent for 'Both' - the backend rejects either count being
        // present for any other gender selection, and requires both when
        // it's 'Both'.
        maleCreatorCount: creatorGender === 'Both' ? parseInt(maleCreatorCount, 10) : undefined,
        femaleCreatorCount: creatorGender === 'Both' ? parseInt(femaleCreatorCount, 10) : undefined,
        creatorAgeRange: creatorAgeRange || undefined,

        budgetRange: estimatedBudget || undefined,
        paymentModel: paymentModel || undefined,

        campaignStartDate: campaignStartDate || undefined,
        campaignDuration: campaignDuration || undefined,
        deliverables:
          backendDeliverables.length > 0
            ? backendDeliverables.map(label => ({ label, quantity: 1 }))
            : undefined,
        // Required for >1 creator, rejected for exactly 1 - never send both.
        deliverablesScope: isMultiCreator ? deliverablesScope || undefined : undefined,
        // Required for a Posting Only brief requesting >1 post, rejected
        // otherwise.
        postingWindowValue: needsPostingWindow ? parseInt(postingWindowValue, 10) : undefined,
        postingWindowUnit: needsPostingWindow ? postingWindowUnit || undefined : undefined,

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

      // A dedicated route, not the pitch/sourcing-tail/payment flow and not
      // an inline step here. The guest token is persisted above so "View
      // your brief anytime" on that page works.
      router.push('/brief/success');
      return;
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
                        <RadioOption
                          key={goal}
                          name="campaignGoal"
                          label={goal}
                          selected={campaignGoal === goal}
                          onSelect={() => {
                            setCampaignGoal(goal);
                            clearError('campaignGoal');
                          }}
                        />
                      ))}
                    </div>
                    <FieldError message={errors.campaignGoal} />
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
                          key={type.value}
                          value={type.value}
                        >
                          {type.label}
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
                        setNumCreators(toDigits(e.target.value));
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
                            // The backend rejects these counts being present
                            // for anything other than 'Both' - clear them so
                            // switching away never leaves a stale value.
                            if (gender !== 'Both') {
                              setMaleCreatorCount('');
                              setFemaleCreatorCount('');
                              clearError('maleCreatorCount');
                              clearError('femaleCreatorCount');
                            }
                          }}
                        />
                      ))}
                    </div>
                    <FieldError message={errors.creatorGender} />

                    {creatorGender === 'Both' && (
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <div>
                          <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                            How many male?
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={maleCreatorCount}
                            onChange={e => {
                              setMaleCreatorCount(toDigits(e.target.value));
                              clearError('maleCreatorCount');
                            }}
                            placeholder="0"
                            className={fieldClass(!!errors.maleCreatorCount)}
                          />
                          <FieldError message={errors.maleCreatorCount} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                            How many female?
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={femaleCreatorCount}
                            onChange={e => {
                              setFemaleCreatorCount(toDigits(e.target.value));
                              clearError('femaleCreatorCount');
                            }}
                            placeholder="0"
                            className={fieldClass(!!errors.femaleCreatorCount)}
                          />
                          <FieldError message={errors.femaleCreatorCount} />
                        </div>
                      </div>
                    )}
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
                      {BUDGET_RANGES.map(range => (
                        <option
                          key={range}
                          value={range}
                        >
                          {range}
                        </option>
                      ))}
                    </select>
                    {country !== 'Nigeria' && (
                      <p className="mt-1.5 text-sm text-neutral-500">
                        We currently price budgets in Naira (₦) - please select the closest
                        equivalent to your budget.
                      </p>
                    )}
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

                  {isMultiCreator && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                        How do these requirements apply across creators?
                      </label>
                      <select
                        value={deliverablesScope}
                        onChange={e => {
                          setDeliverablesScope(e.target.value);
                          clearError('deliverablesScope');
                        }}
                        className={`${fieldClass(!!errors.deliverablesScope)} appearance-none bg-white`}
                      >
                        <option value="">Select an option</option>
                        {DELIVERABLES_SCOPE_OPTIONS.map(option => (
                          <option
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <FieldError message={errors.deliverablesScope} />
                    </div>
                  )}

                  {needsPostingWindow && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                        How long should the posting period run?
                      </label>
                      <p className="text-sm text-neutral-500 mb-2">
                        You&apos;ve requested more than one post - tell us how long the creator has
                        to spread them out.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={postingWindowValue}
                          onChange={e => {
                            setPostingWindowValue(toDigits(e.target.value));
                            clearError('postingWindowValue');
                          }}
                          placeholder="e.g. 2"
                          className={fieldClass(!!errors.postingWindowValue)}
                        />
                        <select
                          value={postingWindowUnit}
                          onChange={e => {
                            setPostingWindowUnit(e.target.value);
                            clearError('postingWindowUnit');
                          }}
                          className={`${fieldClass(!!errors.postingWindowUnit)} appearance-none bg-white`}
                        >
                          <option value="">Select unit</option>
                          {DURATION_UNITS.map(unit => (
                            <option
                              key={unit.value}
                              value={unit.value}
                            >
                              {unit.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <FieldError message={errors.postingWindowValue} />
                      <FieldError message={errors.postingWindowUnit} />
                    </div>
                  )}
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
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
