import { Heading, Text } from '@/components/typography';

export default function PrivacyPolicyNigeria() {
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
          it, and your choices regarding your data.
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
        <div className="space-y-3 md:space-y-3 md:space-y-4 mb-0">
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base text-sm sm:text-base"
          >
            <strong className="text-white font-semibold">Personal Information:</strong> Name, email,
            and account details.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base text-sm sm:text-base"
          >
            <strong className="text-white font-semibold">Usage Information:</strong> How you
            interact with the platform, including pages visited, content you engage with, and
            features you use.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base text-sm sm:text-base"
          >
            <strong className="text-white font-semibold">Cookies & Tracking:</strong> Small files
            that help the platform remember your preferences, improve your experience, and
            understand usage trends.
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
        <div className="space-y-3 md:space-y-3 md:space-y-4 mb-0">
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base text-sm sm:text-base"
          >
            Provide and maintain the platform.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base text-sm sm:text-base"
          >
            Personalize your experience and connect you with brands and other creators.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base text-sm sm:text-base"
          >
            Send updates, announcements, or relevant communications.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base text-sm sm:text-base"
          >
            Analyze trends and improve the platform.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base text-sm sm:text-base"
          >
            Ensure security and prevent misuse of the platform.
          </Text>
        </div>
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
          className="text-white mb-4 leading-relaxed text-base"
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
        <div className="space-y-3 md:space-y-4 mb-0">
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
            Payment processors to handle transactions safely.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base"
          >
            Email services for sending updates and notifications.
          </Text>
        </div>
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
        <div className="space-y-3 md:space-y-4 mb-0">
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base"
          >
            Your account info stays with us until you delete your account.
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
          You have control over your personal data. You can:
        </Text>
        <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base"
          >
            Access the information we hold about you.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base"
          >
            Correct or update any incorrect information.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base"
          >
            Request deletion of your personal information.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed text-sm sm:text-base"
          >
            Opt-out of certain uses of your data, such as marketing communications.
          </Text>
        </div>
        <Text
          variant="body"
          color="white"
          className="text-white leading-relaxed text-sm sm:text-base text-base"
        >
          To exercise any of these rights, contact us at{' '}
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
          We use security measures like encryption and secure servers to protect your information.
          While we take every reasonable step to secure your data, no system is completely immune to
          risk.
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
          We may update this Privacy Policy from time to time. When we do, the &quot;Effective
          Date&quot; at the top will be updated. We encourage you to review this policy
          periodically.
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
          className="text-white mb-4 leading-relaxed text-base"
        >
          If you have questions or concerns about your privacy or this policy, contact us at:
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
          secure your account, and help creators and brands collaborate effectively. You have
          control over your data, and we are committed to keeping it safe.
        </Text>
      </div>
    </article>
  );
}
