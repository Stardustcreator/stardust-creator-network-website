'use client';

import { FormEvent, useState, useRef, useEffect } from 'react';
import { Heading, Text } from '@/components/typography';
import { SectionHeader } from '@/components/shared';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { COUNTRIES } from '@/lib/countries';

export default function WaitlistFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px',
    triggerOnce: true,
  });

  // Filter countries based on search query
  const filteredCountries = COUNTRIES.filter(country =>
    country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setSearchQuery('');
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to Mailchimp via API
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to join waitlist');
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        country: '',
        phone: '',
      });

      // Show success message
      alert(
        result.message ||
          "You're on the list! We'll notify you as soon as the SCN Paid Community launches."
      );
    } catch (error) {
      console.error('Waitlist signup error:', error);
      alert(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // For phone field, only allow numbers, spaces, +, -, and ()
    if (name === 'phone') {
      const sanitizedValue = value.replace(/[^0-9+\-\s()]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: sanitizedValue,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCountrySelect = (country: string) => {
    setFormData(prev => ({
      ...prev,
      country,
    }));
    setIsDropdownOpen(false);
    setSearchQuery('');
  };

  const benefits = [
    'Early access to the platform',
    'One month free access to the Builder Plan',
    'Priority access to brand opportunities',
    'Creator playbooks and templates',
    'Access to live creator clinics',
  ];

  return (
    <section
      id="waitlist-form"
      ref={elementRef}
      className="relative py-20 md:py-32 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Heading */}
        <div className="text-center mb-10 md:mb-12">
          <SectionHeader
            words={[
              { text: 'Join ', className: 'text-gray-900' },
              { text: 'The ', className: 'text-gray-900' },
              {
                text: 'Waitlist',
                className:
                  'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent',
              },
            ]}
            headingClassName="text-3xl sm:text-4xl md:text-5xl font-bold"
            className="mb-0"
            centered={true}
            staggerDelay={150}
            level={2}
          />
        </div>

        {/* What You Get Section */}
        <div className="max-w-3xl mx-auto mb-12">
          <Heading
            level={3}
            variant="default"
            className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8"
          >
            What You Get
          </Heading>

          <div className="bg-white/80 backdrop-blur-md border border-purple-200 rounded-2xl p-6 sm:p-8 shadow-lg shadow-purple-200/50">
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-3 text-gray-700 transition-all duration-500 ${
                    isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <span className="text-purple-400 text-xl flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-base md:text-lg leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Waitlist Form */}
        <div className="max-w-lg mx-auto px-2 sm:px-0">
          <div
            className={`relative bg-white backdrop-blur-xl border border-purple-300 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-purple-500/10 transition-all duration-700 ${
              isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-300 to-pink-300 rounded-2xl sm:rounded-3xl blur-xl opacity-20"></div>

            <form
              onSubmit={handleSubmit}
              className="relative space-y-5 sm:space-y-6"
            >
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Name <span className="text-pink-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 sm:py-3.5 text-white text-sm sm:text-base placeholder-white/50 transition-all hover:bg-white/15 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Email <span className="text-pink-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 sm:py-3.5 text-gray-900 text-sm sm:text-base placeholder-gray-400 transition-all hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Country Field - Custom Searchable Dropdown */}
              <div
                ref={dropdownRef}
                className="relative"
              >
                <label
                  htmlFor="country"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Country <span className="text-pink-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={isDropdownOpen ? searchQuery : formData.country}
                    onChange={e => setSearchQuery(e.target.value)}
                    onFocus={() => setIsDropdownOpen(true)}
                    required
                    autoComplete="off"
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 sm:py-3.5 text-gray-900 text-sm sm:text-base placeholder-gray-400 transition-all hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Search for your country"
                  />

                  {/* Dropdown */}
                  {isDropdownOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-white backdrop-blur-md border border-gray-300 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map(country => (
                          <button
                            key={country}
                            type="button"
                            onClick={() => handleCountrySelect(country)}
                            className="w-full text-left px-4 py-3 text-gray-900 text-sm sm:text-base hover:bg-purple-50 transition-colors border-b border-gray-100 last:border-b-0"
                          >
                            {country}
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-gray-400 text-sm sm:text-base">
                          No countries found
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Phone Number <span className="text-pink-400">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 sm:py-3.5 text-gray-900 text-sm sm:text-base placeholder-gray-400 transition-all hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="+234 xxx xxx xxxx"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3.5 sm:py-4 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Reserving Your Spot...
                  </span>
                ) : (
                  'Reserve My Spot'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
