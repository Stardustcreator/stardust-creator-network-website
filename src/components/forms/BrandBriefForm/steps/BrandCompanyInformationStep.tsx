import { useEffect, useCallback } from 'react';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type {
  BrandCompanyInformation,
  Country,
  BrandBriefFormData,
} from '@/types/brand-brief.types';
import { COUNTRIES, INDUSTRIES, BUSINESS_TYPES } from '@/types/brand-brief.types';

interface BrandCompanyInformationStepProps {
  data?: Partial<BrandCompanyInformation>;
  errors?: Partial<Record<keyof BrandCompanyInformation, string>>;
  updateFormData: <K extends keyof BrandBriefFormData>(
    section: K,
    data: Partial<BrandBriefFormData[K]>
  ) => void;
  country: Country;
}

export default function BrandCompanyInformationStep({
  data = {},
  errors = {},
  updateFormData,
  country,
}: BrandCompanyInformationStepProps) {
  const handleInputChange = useCallback(
    (field: keyof BrandCompanyInformation, value: string | boolean) => {
      updateFormData('brandCompanyInformation', { [field]: value });
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
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-3 py-1 mb-4">
          <span className="text-purple-300 text-sm font-medium">Section 1</span>
        </div>

        <Heading
          level={2}
          className="text-white text-2xl md:text-3xl mb-2"
        >
          Brand / Company Information
        </Heading>

        <Text
          variant="large"
          className="text-white opacity-80"
        >
          Help us understand your brand and audience.
        </Text>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Brand / Company Name */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Brand / Company Name *
          </label>
          <input
            type="text"
            value={data.brandName || ''}
            onChange={e => handleInputChange('brandName', e.target.value)}
            placeholder="Enter your brand or company name"
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all
              ${
                errors.brandName
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-purple-400'
              }
            `}
          />
          {errors.brandName && <p className="text-red-400 text-sm mt-1">{errors.brandName}</p>}
        </div>

        {/* Company Website */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">Company Website *</label>
          <input
            type="url"
            value={data.companyWebsite || ''}
            onChange={e => handleInputChange('companyWebsite', e.target.value)}
            placeholder="https://yourcompany.com"
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all
              ${
                errors.companyWebsite
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-purple-400'
              }
            `}
          />
          {errors.companyWebsite && (
            <p className="text-red-400 text-sm mt-1">{errors.companyWebsite}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">Country *</label>
          <select
            value={data.country || country}
            onChange={e => handleInputChange('country', e.target.value)}
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all appearance-none
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

        {/* Industry */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">Industry *</label>
          <select
            value={data.industry || ''}
            onChange={e => handleInputChange('industry', e.target.value)}
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all appearance-none
              ${
                errors.industry
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-purple-400'
              }
            `}
          >
            <option
              value=""
              className="bg-gray-900"
            >
              Select your industry
            </option>
            {INDUSTRIES.map(industry => (
              <option
                key={industry}
                value={industry}
                className="bg-gray-900"
              >
                {industry}
              </option>
            ))}
          </select>
          {errors.industry && <p className="text-red-400 text-sm mt-1">{errors.industry}</p>}
        </div>

        {/* Type of Business */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">Type of Business *</label>
          <select
            value={data.businessType || ''}
            onChange={e => handleInputChange('businessType', e.target.value)}
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all appearance-none
              ${
                errors.businessType
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-purple-400'
              }
            `}
          >
            <option
              value=""
              className="bg-gray-900"
            >
              Select business type
            </option>
            {BUSINESS_TYPES.map(type => (
              <option
                key={type}
                value={type}
                className="bg-gray-900"
              >
                {type}
              </option>
            ))}
          </select>
          {errors.businessType && (
            <p className="text-red-400 text-sm mt-1">{errors.businessType}</p>
          )}
        </div>

        {/* Contact Person */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">Contact Person *</label>
          <input
            type="text"
            value={data.contactPerson || ''}
            onChange={e => handleInputChange('contactPerson', e.target.value)}
            placeholder="Enter contact person name"
            className={`
              w-full bg-white/5 backdrop-blur-md border rounded-lg px-4 py-3 text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all
              ${
                errors.contactPerson
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-purple-400'
              }
            `}
          />
          {errors.contactPerson && (
            <p className="text-red-400 text-sm mt-1">{errors.contactPerson}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">Email *</label>
          <p className="text-white text-xs opacity-70 mb-2">
            Use your work email (no Gmail, Outlook, Yahoo, or similar).
          </p>
          <input
            type="email"
            value={data.email || ''}
            onChange={e => handleInputChange('email', e.target.value)}
            placeholder="contact@yourcompany.com"
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

        {/* Phone */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">Phone *</label>
          <input
            type="tel"
            value={data.phoneNumber || ''}
            onChange={e => handleInputChange('phoneNumber', e.target.value)}
            placeholder="+234 XXX XXX XXXX"
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
              We use this information to match you with the best creators and opportunities. Your
              data is protected and will never be shared without your consent.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
