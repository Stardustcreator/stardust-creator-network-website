import { useEffect, useCallback } from 'react';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type {
  PersonalInformation,
  Country,
  CreatorApplicationFormData,
} from '@/types/creator-application.types';
import { COUNTRIES, AGE_RANGES } from '@/types/creator-application.types';

interface PersonalInformationStepProps {
  data?: Partial<PersonalInformation>;
  errors?: Partial<Record<keyof PersonalInformation, string>>;
  updateFormData: <K extends keyof CreatorApplicationFormData>(
    section: K,
    data: Partial<CreatorApplicationFormData[K]>
  ) => void;
  country: Country;
}

export default function PersonalInformationStep({
  data = {},
  errors = {},
  updateFormData,
  country,
}: PersonalInformationStepProps) {
  const handleInputChange = useCallback(
    (field: keyof PersonalInformation, value: string | boolean) => {
      updateFormData('personalInformation', { [field]: value });
    },
    [updateFormData]
  );

  // Initialize the country field if it's not already set
  useEffect(() => {
    if (!data.country) {
      handleInputChange('country', country);
    }
  }, [data.country, country, handleInputChange]);

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <Heading
          level={2}
          className="text-white text-2xl md:text-3xl mb-2"
        >
          Personal Information
        </Heading>

        <Text
          variant="large"
          className="text-white opacity-80"
        >
          Let&apos;s start with the basics.
        </Text>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">Full Name *</label>
          <input
            type="text"
            value={data.fullName || ''}
            onChange={e => handleInputChange('fullName', e.target.value)}
            placeholder="Enter your full name"
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all
              ${
                errors.fullName
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-purple-400'
              }
            `}
          />
          {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">Email Address *</label>
          <input
            type="email"
            value={data.email || ''}
            onChange={e => handleInputChange('email', e.target.value)}
            placeholder="your.email@example.com"
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all
              ${
                errors.email
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-purple-400'
              }
            `}
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">Phone Number *</label>
          <input
            type="tel"
            value={data.phoneNumber || ''}
            onChange={e => handleInputChange('phoneNumber', e.target.value)}
            placeholder="+234 xxx xxx xxxx"
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all
              ${
                errors.phoneNumber
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-purple-400'
              }
            `}
          />
          {errors.phoneNumber && <p className="text-red-400 text-sm mt-1">{errors.phoneNumber}</p>}
        </div>

        {/* Two-column layout for Country and City */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Country */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">Country *</label>
            <select
              value={data.country || country}
              onChange={e => handleInputChange('country', e.target.value)}
              className={`
                w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white 
                focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all
                ${
                  errors.country
                    ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                    : 'border-white/20 focus:border-purple-400'
                }
              `}
            >
              {COUNTRIES.map(countryOption => (
                <option
                  key={countryOption}
                  value={countryOption}
                  className="bg-gray-900"
                >
                  {countryOption}
                </option>
              ))}
            </select>
            {errors.country && <p className="text-red-400 text-sm mt-1">{errors.country}</p>}
          </div>

          {/* City */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">City *</label>
            <input
              type="text"
              value={data.city || ''}
              onChange={e => handleInputChange('city', e.target.value)}
              placeholder="Enter your city"
              className={`
                w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all
                ${
                  errors.city
                    ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                    : 'border-white/20 focus:border-purple-400'
                }
              `}
            />
            {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
          </div>
        </div>

        {/* Age Range */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">Age Range *</label>
          <select
            value={data.ageRange || ''}
            onChange={e => handleInputChange('ageRange', e.target.value)}
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white 
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all
              ${
                errors.ageRange
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-purple-400'
              }
            `}
          >
            <option
              value=""
              className="bg-gray-900"
            >
              Select your age range
            </option>
            {AGE_RANGES.map(range => (
              <option
                key={range}
                value={range}
                className="bg-gray-900"
              >
                {range}
              </option>
            ))}
          </select>
          {errors.ageRange && <p className="text-red-400 text-sm mt-1">{errors.ageRange}</p>}
        </div>

        {/* Marketing Consent */}
        <div className="mt-6">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={data.marketingConsent || false}
              onChange={e => handleInputChange('marketingConsent', e.target.checked)}
              className={`
                mt-1 w-5 h-5 rounded border-2 bg-white/5 cursor-pointer
                checked:bg-purple-500 checked:border-purple-500
                focus:outline-none focus:ring-2 focus:ring-purple-400/50
                transition-all
                ${
                  errors.marketingConsent
                    ? 'border-red-500/50'
                    : 'border-white/20 group-hover:border-purple-400/50'
                }
              `}
            />
            <span className="flex-1">
              <Text
                variant="body"
                className="text-white opacity-90 leading-relaxed"
              >
                I agree to receive updates, opportunities, and resources from Stardust Creator
                Network via email. You can unsubscribe at any time. *
              </Text>
            </span>
          </label>
          {errors.marketingConsent && (
            <p className="text-red-400 text-sm mt-2 ml-8">{errors.marketingConsent}</p>
          )}
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0"
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
            <Text
              variant="body"
              className="text-white opacity-90 mb-1 font-medium"
            >
              Your Privacy Matters
            </Text>
            <Text
              variant="caption"
              className="text-white opacity-70 leading-relaxed"
            >
              We use this information to personalize your experience and connect you with relevant
              opportunities. Your data is protected and will never be shared without your consent.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
