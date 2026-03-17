'use client';

import { FormEvent, useState, useRef, useEffect } from 'react';
import { Heading, Text } from '@/components/typography';
import { SectionHeader } from '@/components/shared';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { COUNTRIES } from '@/lib/countries';

export default function WaitlistSection() {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  return (
    <section
      id="waitlist"
      ref={elementRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-black via-neutral-950 to-black overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-y-12 -left-1/4 w-3/4 bg-gradient-to-br from-purple-600/10 via-purple-400/5 to-transparent blur-3xl" />
        <div className="absolute -inset-y-12 -right-1/4 w-3/4 bg-gradient-to-bl from-pink-600/10 via-pink-400/5 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Label */}
        <div className="text-center mb-6">
          <Text
            variant="small"
            className="text-purple-400 uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-xs sm:text-sm"
          >
            EARLY ACCESS
          </Text>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-6">
          <SectionHeader
            words={[
              { text: 'Join ', className: 'text-white' },
              { text: 'the ', className: 'text-white' },
              {
                text: 'SCN ',
                className:
                  'bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent',
              },
              {
                text: 'Waitlist',
                className:
                  'bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent',
              },
            ]}
            headingClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
            className="mb-0"
            centered={true}
            staggerDelay={150}
            level={2}
          />
        </div>

        {/* Intro Text */}
        <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <Text
            variant="large"
            className="text-white/90 text-base sm:text-lg md:text-xl mb-6 px-2"
          >
            Be the first to know when the SCN Paid Community launches.
          </Text>

          {/* Benefits List */}
          <div className="bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 sm:p-8 mb-6 shadow-lg shadow-purple-500/10">
            <Text
              variant="body"
              className="text-white text-base sm:text-lg mb-5 font-semibold"
            >
              Creators on the waitlist will get early access to:
            </Text>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {[
                { icon: '📹', text: 'Live clinics' },
                { icon: '📚', text: 'Creator playbooks' },
                { icon: '📄', text: 'Monetization templates' },
                { icon: '👥', text: 'Community discussions' },
                { icon: '💡', text: 'Founder insights' },
              ].map((benefit, index) => (
                <li
                  key={benefit.text}
                  className={`flex items-center gap-3 text-white transition-all duration-500 ${
                    isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <span className="text-2xl flex-shrink-0">{benefit.icon}</span>
                  <span className="text-sm sm:text-base font-medium">{benefit.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <Text
            variant="body"
            className="text-purple-300 text-sm sm:text-base font-medium"
          >
            Early members will also receive priority access when the community opens.
          </Text>
        </div>

        {/* Waitlist Form */}
        <div className="max-w-lg mx-auto px-2 sm:px-0">
          <div
            className={`relative bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl transition-all duration-700 ${
              isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Glow effect - reduced opacity */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl blur-xl opacity-10"></div>

            <form
              onSubmit={handleSubmit}
              className="relative space-y-5 sm:space-y-6"
            >
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-white/90 text-sm font-medium mb-2"
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
                  className="block text-white/90 text-sm font-medium mb-2"
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
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 sm:py-3.5 text-white text-sm sm:text-base placeholder-white/50 transition-all hover:bg-white/15 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              {/* Country Field - Custom Searchable Dropdown */}
              <div>
                <label
                  htmlFor="country"
                  className="block text-white/90 text-sm font-medium mb-2"
                >
                  Country <span className="text-pink-400">*</span>
                </label>
                <div
                  className="relative"
                  ref={dropdownRef}
                >
                  {/* Selected Country Display / Trigger Button */}
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 sm:py-3.5 text-white text-sm sm:text-base text-left transition-all hover:bg-white/15 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {formData.country || <span className="text-white/50">Select your country</span>}
                  </button>

                  {/* Dropdown Arrow */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className={`w-5 h-5 text-white/60 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-neutral-900 border border-white/30 rounded-xl shadow-2xl overflow-hidden">
                      {/* Search Input */}
                      <div className="p-3 border-b border-white/20">
                        <div className="relative">
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search country..."
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            autoFocus
                          />
                          <svg
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Countries List */}
                      <div className="max-h-60 overflow-y-auto">
                        {filteredCountries.length > 0 ? (
                          filteredCountries.map(country => (
                            <button
                              key={country}
                              type="button"
                              onClick={() => handleCountrySelect(country)}
                              className="w-full text-left px-4 py-3 text-white text-sm hover:bg-purple-500/20 transition-colors"
                            >
                              {country}
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-white/50 text-sm">No countries found</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Hidden input for form validation */}
                  <input
                    type="hidden"
                    name="country"
                    value={formData.country}
                    required
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-white/90 text-sm font-medium mb-2"
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
                  inputMode="numeric"
                  pattern="[0-9+\-\s()]*"
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 sm:py-3.5 text-white text-sm sm:text-base placeholder-white/50 transition-all hover:bg-white/15 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="+234 XXX XXX XXXX"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-base sm:text-lg py-4 sm:py-5 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/40 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-neutral-900 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? 'JOINING...' : 'JOIN THE WAITLIST'}
                  {!isSubmitting && (
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  )}
                </span>
              </button>

              {/* Privacy Note */}
              <Text
                variant="small"
                className="text-white/50 text-center text-xs leading-relaxed"
              >
                By joining the waitlist, you agree to receive updates about the SCN Paid Community
                launch. We respect your privacy and you can unsubscribe at any time.
              </Text>
            </form>
          </div>
        </div>

        {/* Additional Trust Info */}
        <div className="text-center mt-10 sm:mt-12 px-4">
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <Text
                variant="small"
                className="text-white/60 text-sm sm:text-base"
              >
                Early access notifications
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <Text
                variant="small"
                className="text-white/60 text-sm sm:text-base"
              >
                Privacy protected
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0"
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
              <Text
                variant="small"
                className="text-white/60 text-sm sm:text-base"
              >
                No spam, ever
              </Text>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
