import { Heading, Text } from '@/components/typography';

export default function PrivacyPolicyUK() {
  return (
    <article className="max-w-none">
      {/* Title and Effective Date */}
      <div className="mb-8 md:mb-12 pb-4 md:pb-6 border-b border-white/10">
        <Text
          variant="body"
          color="white"
          className="text-white text-xs sm:text-sm mb-2 md:mb-4"
        >
          Effective Date: December 5, 2025
        </Text>
      </div>

      {/* Introduction */}
      <div className="mb-10 md:mb-16">
        <Text
          variant="body"
          color="white"
          className="text-white/90 leading-relaxed text-base sm:text-lg"
        >
          At Stardust Creator Network, we respect your privacy and are committed to protecting your
          personal information. This Privacy Policy explains what information we collect, how we use
          it, and your choices regarding your data. Our practices align with applicable data
          protection laws, including regulations in the UK.
        </Text>
      </div>

      {/* Section 1: Information We Collect */}
      <div
        id="information-we-collect"
        className="mb-10 md:mb-16 scroll-mt-20 md:scroll-mt-24"
      >
        <Heading
          level={3}
          variant="gradient"
          className="mb-4 md:mb-6 text-xl sm:text-2xl font-semibold"
        >
          1. Information We Collect
        </Heading>
        <Text
          variant="body"
          color="white"
          className="text-white mb-4 md:mb-6 leading-relaxed text-sm sm:text-base"
        >
          We collect information to make our platform work well and provide you with a better
          experience:
        </Text>
        <div className="space-y-3 md:space-y-4 mb-0">
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base"
          >
            <strong className="text-white">Personal Information:</strong> Name, email, and account
            details.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base"
          >
            <strong className="text-white">Usage Information:</strong> How you interact with the
            platform, including pages visited, content you engage with, and features you use.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base"
          >
            <strong className="text-white">Cookies & Tracking:</strong> Small files that help the
            platform remember your preferences, improve your experience, and understand usage
            trends.
          </Text>
        </div>
      </div>

      {/* Section 2: How We Use Your Information */}
      <div
        id="how-we-use"
        className="mb-10 md:mb-16 scroll-mt-20 md:scroll-mt-24"
      >
        <Heading
          level={3}
          variant="gradient"
          className="mb-4 md:mb-6 text-xl sm:text-2xl font-semibold"
        >
          2. How We Use Your Information
        </Heading>
        <Text
          variant="body"
          color="white"
          className="text-white mb-4 md:mb-6 leading-relaxed text-sm sm:text-base"
        >
          We use your information to:
        </Text>
        <div className="space-y-4 mb-4">
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base"
          >
            Provide and maintain the platform.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base"
          >
            Personalize your experience and connect you with brands and other creators.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base"
          >
            Send updates, announcements, or relevant communications.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base"
          >
            Analyze trends and improve the platform.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base"
          >
            Ensure security and prevent misuse of the platform.
          </Text>
        </div>
        <Text
          variant="body"
          color="white"
          className="text-white leading-relaxed text-sm sm:text-base text-base"
        >
          Our data processing complies with UK data protection requirements, including using data
          lawfully, fairly, and transparently.
        </Text>
      </div>

      {/* Section 3: Cookies and Third-Party Services */}
      <div
        id="cookies-third-party"
        className="mb-10 md:mb-16 scroll-mt-20 md:scroll-mt-24"
      >
        <Heading
          level={3}
          variant="gradient"
          className="mb-4 md:mb-6 text-xl sm:text-2xl font-semibold"
        >
          3. Cookies and Third-Party Services
        </Heading>
        <Text
          variant="body"
          color="white"
          className="text-white mb-4 leading-relaxed text-sm sm:text-base"
        >
          We use cookies to improve your experience.
        </Text>
        <Text
          variant="body"
          color="white"
          className="text-white mb-4 md:mb-6 leading-relaxed text-sm sm:text-base"
        >
          Third-party services may process data on our behalf, such as:
        </Text>
        <div className="space-y-4 mb-4">
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base"
          >
            Analytics tools to understand platform usage.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base"
          >
            Payment processors to handle transactions securely.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base"
          >
            Email services for sending updates and notifications.
          </Text>
        </div>
        <Text
          variant="body"
          color="white"
          className="text-white leading-relaxed text-sm sm:text-base text-base"
        >
          These tools ensure that people accessing the platform from the UK and elsewhere have a
          smooth and secure experience.
        </Text>
      </div>

      {/* Section 4: Data Retention */}
      <div
        id="data-retention"
        className="mb-10 md:mb-16 scroll-mt-20 md:scroll-mt-24"
      >
        <Heading
          level={3}
          variant="gradient"
          className="mb-4 md:mb-6 text-xl sm:text-2xl font-semibold"
        >
          4. Data Retention
        </Heading>
        <div className="space-y-4 mb-4">
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base"
          >
            Account information is kept only as long as necessary to provide services.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base"
          >
            Some usage and analytics data may be stored for up to 12 months to help improve the
            platform.
          </Text>
        </div>
        <Text
          variant="body"
          color="white"
          className="text-white leading-relaxed text-sm sm:text-base text-base"
        >
          Data retention practices comply with legal obligations in the UK.
        </Text>
      </div>

      {/* Section 5: Your Rights */}
      <div
        id="your-rights"
        className="mb-10 md:mb-16 scroll-mt-20 md:scroll-mt-24"
      >
        <Heading
          level={3}
          variant="gradient"
          className="mb-4 md:mb-6 text-xl sm:text-2xl font-semibold"
        >
          5. Your Rights
        </Heading>
        <Text
          variant="body"
          color="white"
          className="text-white mb-4 md:mb-6 leading-relaxed text-sm sm:text-base"
        >
          You have rights regarding your personal data, including:
        </Text>
        <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base"
          >
            Accessing the information we hold about you.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base"
          >
            Correcting or updating any inaccurate information.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base"
          >
            Requesting deletion of personal information.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base"
          >
            Objecting to or restricting certain uses of your data, including marketing
            communications.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base"
          >
            Withdrawing consent where processing is based on consent.
          </Text>
        </div>
        <Text
          variant="body"
          color="white"
          className="text-white leading-relaxed text-sm sm:text-base text-base"
        >
          These rights are available to everyone, including people in the UK, and can be exercised
          by contacting us at{' '}
          <a
            href="mailto:hello@stardustcreators.com"
            className="text-purple-400 hover:text-purple-300 underline transition-colors"
          >
            hello@stardustcreators.com
          </a>
          .
        </Text>
      </div>

      {/* Section 6: Security */}
      <div
        id="security"
        className="mb-10 md:mb-16 scroll-mt-20 md:scroll-mt-24"
      >
        <Heading
          level={3}
          variant="gradient"
          className="mb-4 md:mb-6 text-xl sm:text-2xl font-semibold"
        >
          6. Security
        </Heading>
        <Text
          variant="body"
          color="white"
          className="text-white leading-relaxed text-sm sm:text-base text-base"
        >
          We implement technical and organizational measures to protect personal information,
          including encryption and secure servers. While we take all reasonable steps, no system is
          completely immune to risk.
        </Text>
      </div>

      {/* Section 7: Updates to This Policy */}
      <div
        id="updates"
        className="mb-10 md:mb-16 scroll-mt-20 md:scroll-mt-24"
      >
        <Heading
          level={3}
          variant="gradient"
          className="mb-4 md:mb-6 text-xl sm:text-2xl font-semibold"
        >
          7. Updates to This Policy
        </Heading>
        <Text
          variant="body"
          color="white"
          className="text-white leading-relaxed text-sm sm:text-base text-base"
        >
          We may update this Privacy Policy periodically. When updates are made, the &quot;Effective
          Date&quot; at the top will be revised. We encourage reviewing this policy regularly.
        </Text>
      </div>

      {/* Section 8: Contact Us */}
      <div
        id="contact-us"
        className="mb-10 md:mb-16 scroll-mt-20 md:scroll-mt-24"
      >
        <Heading
          level={3}
          variant="gradient"
          className="mb-4 md:mb-6 text-xl sm:text-2xl font-semibold"
        >
          8. Contact Us
        </Heading>
        <Text
          variant="body"
          color="white"
          className="text-white mb-4 leading-relaxed text-sm sm:text-base"
        >
          For questions or concerns about your privacy or this policy, contact us at:
        </Text>
        <Text
          variant="body"
          color="white"
          className="text-white leading-relaxed text-sm sm:text-base text-base"
        >
          Email:{' '}
          <a
            href="mailto:hello@stardustcreators.com"
            className="text-purple-400 hover:text-purple-300 underline transition-colors"
          >
            hello@stardustcreators.com
          </a>
        </Text>
      </div>

      {/* Summary Section */}
      <div className="mt-10 md:mt-16 pt-8 md:pt-12 border-t border-white/10 bg-gradient-to-r from-purple-900/10 to-pink-900/10 rounded-lg p-6 md:p-8">
        <Heading
          level={2}
          variant="default"
          className="text-white mb-3 md:mb-4 text-xl sm:text-2xl"
        >
          Summary
        </Heading>
        <Text
          variant="body"
          color="white"
          className="text-white/90 leading-relaxed text-sm sm:text-base"
        >
          We collect minimal information to make your experience on Stardust Creator Network better,
          secure your account, and help creators and brands collaborate effectively. People
          accessing the platform in the UK and elsewhere have rights under applicable privacy
          regulations, and we are committed to keeping all data safe.
        </Text>
      </div>
    </article>
  );
}
