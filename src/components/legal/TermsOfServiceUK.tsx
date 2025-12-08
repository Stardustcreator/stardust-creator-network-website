import { Heading, Text } from '@/components/typography';

export default function TermsOfServiceUK() {
  return (
    <article className="max-w-none">
      {/* Title and Effective Date */}
      <div className="mb-16 pb-8 border-b border-white/10">
        <Heading
          level={2}
          variant="default"
          className="text-white mb-4 text-center"
        >
          Terms of Service – Stardust Creator Network
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
          Welcome to Stardust Creator Network! These Terms of Service explain the rules for using
          our platform, your rights and responsibilities, and how we operate. By using our platform,
          you agree to these terms.
        </Text>
      </div>

      {/* Section 1: Platform Use */}
      <div className="mb-16">
        <Heading
          level={3}
          variant="gradient"
          className="mb-6 text-2xl font-semibold animate-[fadeInUp_0.6s_ease-out]"
        >
          1. Platform Use
        </Heading>
        <Text
          variant="body"
          color="white"
          className="text-white leading-relaxed text-base"
        >
          Stardust Creator Network is a platform for creators to collaborate, learn, and connect
          with brands. Users may access educational resources, submit content, and participate in
          brand campaigns. You agree to use the platform responsibly and only for lawful purposes.
        </Text>
      </div>

      {/* Section 2: Accounts & Submissions */}
      <div className="mb-16">
        <Heading
          level={3}
          variant="gradient"
          className="mb-6 text-2xl font-semibold animate-[fadeInUp_0.6s_ease-out]"
        >
          2. Accounts & Submissions
        </Heading>
        <Text
          variant="body"
          color="white"
          className="text-white leading-relaxed text-base"
        >
          Users currently do not create accounts but can submit forms to participate in campaigns or
          access resources. All submissions must be accurate and truthful. By submitting content or
          forms, you agree to the processing of your information as described in our Privacy Policy.
        </Text>
      </div>

      {/* Section 3: Content Ownership & Intellectual Property */}
      <div className="mb-16">
        <Heading
          level={3}
          variant="gradient"
          className="mb-6 text-2xl font-semibold animate-[fadeInUp_0.6s_ease-out]"
        >
          3. Content Ownership & Intellectual Property
        </Heading>
        <Text
          variant="body"
          color="white"
          className="text-white leading-relaxed text-base"
        >
          Stardust Creator Network owns the rights to content created in collaboration with the
          platform or for brand partnerships managed through us. Content created independently
          outside of our platform or campaigns remains the creator&apos;s property. Users may not
          submit content that infringes someone else&apos;s intellectual property rights.
        </Text>
      </div>

      {/* Section 4: Payments */}
      <div className="mb-16">
        <Heading
          level={3}
          variant="gradient"
          className="mb-6 text-2xl font-semibold animate-[fadeInUp_0.6s_ease-out]"
        >
          4. Payments
        </Heading>
        <Text
          variant="body"
          color="white"
          className="text-white leading-relaxed text-base"
        >
          Any payments related to brand partnerships or campaigns will follow the terms agreed
          between the creator and the brand through the platform. Payment schedules and methods will
          be communicated to users before the campaign. Fees or platform commissions, if applicable,
          will be disclosed in advance.
        </Text>
      </div>

      {/* Section 5: Prohibited Activities */}
      <div className="mb-16">
        <Heading
          level={3}
          variant="gradient"
          className="mb-6 text-2xl font-semibold animate-[fadeInUp_0.6s_ease-out]"
        >
          5. Prohibited Activities
        </Heading>
        <Text
          variant="body"
          color="white"
          className="text-white leading-relaxed text-base"
        >
          Users may not submit illegal, harmful, or offensive content, engage in spam, scams, or
          misleading activity, impersonate others, attempt to hack or disrupt the platform, or use
          the platform for unauthorized commercial purposes outside approved collaborations.
        </Text>
      </div>

      {/* Section 6: Liability */}
      <div className="mb-16">
        <Heading
          level={3}
          variant="gradient"
          className="mb-6 text-2xl font-semibold animate-[fadeInUp_0.6s_ease-out]"
        >
          6. Liability
        </Heading>
        <Text
          variant="body"
          color="white"
          className="text-white leading-relaxed text-base"
        >
          Stardust Creator Network is not responsible for losses, damages, or disputes arising from
          user activity or third-party services. Users participate at their own risk when
          interacting with brands or other creators. The platform makes reasonable efforts to ensure
          security, but no system is completely immune to risk.
        </Text>
      </div>

      {/* Section 7: Governing Law */}
      <div className="mb-16">
        <Heading
          level={3}
          variant="gradient"
          className="mb-6 text-2xl font-semibold animate-[fadeInUp_0.6s_ease-out]"
        >
          7. Governing Law
        </Heading>
        <Text
          variant="body"
          color="white"
          className="text-white leading-relaxed text-base"
        >
          Any dispute arising from the use of the platform or these Terms will be handled under the
          applicable law, including laws applicable in the UK where relevant.
        </Text>
      </div>

      {/* Section 8: Updates to Terms */}
      <div className="mb-16">
        <Heading
          level={3}
          variant="gradient"
          className="mb-6 text-2xl font-semibold animate-[fadeInUp_0.6s_ease-out]"
        >
          8. Updates to Terms
        </Heading>
        <Text
          variant="body"
          color="white"
          className="text-white leading-relaxed text-base"
        >
          We may update these Terms from time to time. Updated Terms will be published on the
          platform with the new &quot;Effective Date.&quot; Continued use of the platform after
          updates means you accept the changes.
        </Text>
      </div>

      {/* Section 9: Contact Us */}
      <div className="mb-16">
        <Heading
          level={3}
          variant="gradient"
          className="mb-6 text-2xl font-semibold animate-[fadeInUp_0.6s_ease-out]"
        >
          9. Contact Us
        </Heading>
        <Text
          variant="body"
          color="white"
          className="text-white leading-relaxed text-base"
        >
          For questions or concerns about these Terms, contact us at{' '}
          <a
            href="mailto:hello@stardustcreators.com"
            className="text-purple-400 hover:text-purple-300 underline transition-colors"
          >
            hello@stardustcreators.com
          </a>
          .
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
          Stardust Creator Network provides creators a safe and collaborative space to work with
          brands. We own content created in collaboration with us, while independent content remains
          the creator&apos;s property. Users submit forms to participate, and all activities should
          follow the platform&apos;s rules and guidelines. Disputes will be resolved under
          applicable law, including UK law where relevant.
        </Text>
      </div>
    </article>
  );
}
