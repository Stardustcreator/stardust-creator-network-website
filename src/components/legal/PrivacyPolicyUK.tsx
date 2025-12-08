import { Heading, Text } from '@/components/typography';

export default function PrivacyPolicyUK() {
  return (
    <article className="max-w-none">
      {/* Title and Effective Date */}
      <div className="mb-16 pb-8 border-b border-white/10">
        <Heading
          level={2}
          variant="default"
          className="text-white mb-4 text-center"
        >
          Privacy Policy – Stardust Creator Network
        </Heading>
        <Text
          variant="body"
          color="white"
          className="text-white text-sm text-center opacity-80"
        >
          Effective Date: December 5, 2025
        </Text>
      </div>

      {/* Introduction */}
      <div className="mb-16">
        <Text
          variant="body"
          color="white"
          className="text-white/90 leading-relaxed text-lg"
        >
          At Stardust Creator Network, we respect your privacy and are committed to protecting your
          personal information. This Privacy Policy explains what information we collect, how we use
          it, and your choices regarding your data. Our practices align with applicable data
          protection laws, including regulations in the UK.
        </Text>
      </div>

      {/* Section 1: Information We Collect */}
      <div className="mb-16">
        <Heading
          level={3}
          variant="gradient"
          className="mb-6 text-2xl font-semibold animate-[fadeInUp_0.6s_ease-out]"
        >
          1. Information We Collect
        </Heading>
        <Text
          variant="body"
          color="white"
          className="text-white mb-6 leading-relaxed text-base"
        >
          We collect information to make our platform work well and provide you with a better
          experience:
        </Text>
        <div className="space-y-4 mb-0">
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed"
          >
            <strong className="text-white">Personal Information:</strong> Name, email, and account
            details.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed"
          >
            <strong className="text-white">Usage Information:</strong> How you interact with the
            platform, including pages visited, content you engage with, and features you use.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed"
          >
            <strong className="text-white">Cookies & Tracking:</strong> Small files that help the
            platform remember your preferences, improve your experience, and understand usage
            trends.
          </Text>
        </div>
      </div>

      {/* Section 2: How We Use Your Information */}
      <div className="mb-16">
        <Heading
          level={3}
          variant="gradient"
          className="mb-6 text-2xl font-semibold animate-[fadeInUp_0.6s_ease-out]"
        >
          2. How We Use Your Information
        </Heading>
        <Text
          variant="body"
          color="white"
          className="text-white mb-6 leading-relaxed text-base"
        >
          We use your information to:
        </Text>
        <div className="space-y-4 mb-4">
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed"
          >
            Provide and maintain the platform.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed"
          >
            Personalize your experience and connect you with brands and other creators.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed"
          >
            Send updates, announcements, or relevant communications.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed"
          >
            Analyze trends and improve the platform.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed"
          >
            Ensure security and prevent misuse of the platform.
          </Text>
        </div>
        <Text
          variant="body"
          color="white"
          className="text-white leading-relaxed text-base"
        >
          Our data processing complies with UK data protection requirements, including using data
          lawfully, fairly, and transparently.
        </Text>
      </div>

      {/* Section 3: Cookies and Third-Party Services */}
      <div className="mb-16">
        <Heading
          level={3}
          variant="gradient"
          className="mb-6 text-2xl font-semibold animate-[fadeInUp_0.6s_ease-out]"
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
          className="text-white mb-6 leading-relaxed text-base"
        >
          Third-party services may process data on our behalf, such as:
        </Text>
        <div className="space-y-4 mb-4">
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed"
          >
            Analytics tools to understand platform usage.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed"
          >
            Payment processors to handle transactions securely.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed"
          >
            Email services for sending updates and notifications.
          </Text>
        </div>
        <Text
          variant="body"
          color="white"
          className="text-white leading-relaxed text-base"
        >
          These tools ensure that people accessing the platform from the UK and elsewhere have a
          smooth and secure experience.
        </Text>
      </div>

      {/* Section 4: Data Retention */}
      <div className="mb-16">
        <Heading
          level={3}
          variant="gradient"
          className="mb-6 text-2xl font-semibold animate-[fadeInUp_0.6s_ease-out]"
        >
          4. Data Retention
        </Heading>
        <div className="space-y-4 mb-4">
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed"
          >
            Account information is kept only as long as necessary to provide services.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed"
          >
            Some usage and analytics data may be stored for up to 12 months to help improve the
            platform.
          </Text>
        </div>
        <Text
          variant="body"
          color="white"
          className="text-white leading-relaxed text-base"
        >
          Data retention practices comply with legal obligations in the UK.
        </Text>
      </div>

      {/* Section 5: Your Rights */}
      <div className="mb-16">
        <Heading
          level={3}
          variant="gradient"
          className="mb-6 text-2xl font-semibold animate-[fadeInUp_0.6s_ease-out]"
        >
          5. Your Rights
        </Heading>
        <Text
          variant="body"
          color="white"
          className="text-white mb-6 leading-relaxed text-base"
        >
          You have rights regarding your personal data, including:
        </Text>
        <div className="space-y-4 mb-6">
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed"
          >
            Accessing the information we hold about you.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed"
          >
            Correcting or updating any inaccurate information.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed"
          >
            Requesting deletion of personal information.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed"
          >
            Objecting to or restricting certain uses of your data, including marketing
            communications.
          </Text>
          <Text
            variant="body"
            color="white"
            className="text-white leading-relaxed"
          >
            Withdrawing consent where processing is based on consent.
          </Text>
        </div>
        <Text
          variant="body"
          color="white"
          className="text-white leading-relaxed text-base"
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
      <div className="mb-16">
        <Heading
          level={3}
          variant="gradient"
          className="mb-6 text-2xl font-semibold animate-[fadeInUp_0.6s_ease-out]"
        >
          6. Security
        </Heading>
        <Text
          variant="body"
          color="white"
          className="text-white leading-relaxed text-base"
        >
          We implement technical and organizational measures to protect personal information,
          including encryption and secure servers. While we take all reasonable steps, no system is
          completely immune to risk.
        </Text>
      </div>

      {/* Section 7: Updates to This Policy */}
      <div className="mb-16">
        <Heading
          level={3}
          variant="gradient"
          className="mb-6 text-2xl font-semibold animate-[fadeInUp_0.6s_ease-out]"
        >
          7. Updates to This Policy
        </Heading>
        <Text
          variant="body"
          color="white"
          className="text-white leading-relaxed text-base"
        >
          We may update this Privacy Policy periodically. When updates are made, the &quot;Effective
          Date&quot; at the top will be revised. We encourage reviewing this policy regularly.
        </Text>
      </div>

      {/* Section 8: Contact Us */}
      <div className="mb-16">
        <Heading
          level={3}
          variant="gradient"
          className="mb-6 text-2xl font-semibold animate-[fadeInUp_0.6s_ease-out]"
        >
          8. Contact Us
        </Heading>
        <Text
          variant="body"
          color="white"
          className="text-white mb-4 leading-relaxed text-base"
        >
          For questions or concerns about your privacy or this policy, contact us at:
        </Text>
        <Text
          variant="body"
          color="white"
          className="text-white leading-relaxed text-base"
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
      <div className="mt-16 pt-12 border-t border-white/10 bg-gradient-to-r from-purple-900/10 to-pink-900/10 rounded-lg p-8">
        <Heading
          level={2}
          variant="default"
          className="text-white mb-4"
        >
          Summary
        </Heading>
        <Text
          variant="body"
          color="white"
          className="text-white/90 leading-relaxed"
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
