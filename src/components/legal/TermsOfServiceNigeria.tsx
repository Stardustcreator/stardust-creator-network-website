import { Heading, Text } from '@/components/typography';

// Same ordering as TermsOfServiceSidebar's sidebarItems - section N of the
// numbered list in fullContent gets sectionIds[N - 1] as its anchor id, so
// the sidebar's scroll-spy/click-to-scroll keeps working against
// CMS-edited text as long as the numbered sections stay in this order.
const sectionIds = [
  'platform-use',
  'user-accounts',
  'content-ownership',
  'brand-creator-collaborations',
  'prohibited-activities',
  'intellectual-property',
  'limitation-liability',
  'termination',
  'changes-terms',
];

// Reasonable reconstruction of the copy that used to be hardcoded directly
// in this component's JSX, reshaped into the same plain-text shape the CMS
// returns (blank-line-separated blocks, "N. Heading" on its own line for
// numbered sections) so the fallback renders identically to real CMS
// content when the backend is unreachable.
const DEFAULT_FULL_CONTENT = `Effective Date: December 5, 2025

Welcome to Stardust Creator Network! These Terms of Service explain the rules for using our platform, your rights and responsibilities, and how we operate. By using our platform, you agree to these terms.

1. Platform Use
Stardust Creator Network is a platform for creators to collaborate, learn, and connect with brands. Users may access educational resources, submit content, and participate in brand campaigns. You agree to use the platform responsibly and only for lawful purposes.

2. User Accounts
Users currently do not create accounts but can submit forms to participate in campaigns or access resources. All submissions must be accurate and truthful. By submitting content or forms, you agree to the processing of your information as described in our Privacy Policy.

3. Content Ownership
Content created independently by creators outside of our platform or campaigns remains the creator's property. Content created in collaboration with the platform or for brand partnerships managed through us may be subject to different ownership terms as agreed in the collaboration agreement.

4. Brand & Creator Collaborations
Brand partnerships and creator collaborations are facilitated through our platform. Any payments, deliverables, and terms will be agreed upon between the creator and the brand through the platform. Payment schedules and methods will be communicated to users before the campaign begins. Fees or platform commissions, if applicable, will be disclosed in advance.

5. Prohibited Activities
Users may not submit illegal, harmful, or offensive content, engage in spam, scams, or misleading activity, impersonate others, attempt to hack or disrupt the platform, or use the platform for unauthorized commercial purposes outside approved collaborations.

6. Intellectual Property
All content, trademarks, logos, and intellectual property on the platform are owned by Stardust Creator Network or our licensors. Users may not use, copy, or distribute any platform content without permission. Users retain ownership of their original content but grant us a license to use it on the platform.

7. Limitation of Liability
Stardust Creator Network is not responsible for losses, damages, or disputes arising from user activity or third-party services. Users participate at their own risk when interacting with brands or other creators. The platform makes reasonable efforts to ensure security, but no system is completely immune to risk.

8. Termination
We reserve the right to suspend or terminate access to the platform for users who violate these Terms or engage in prohibited activities. Users may also discontinue use of the platform at any time. Upon termination, users' rights to use the platform will immediately cease.

9. Changes to Terms
We may update these Terms from time to time. Updated Terms will be published on the platform with the new "Effective Date." Continued use of the platform after updates means you accept the changes. We will notify users of significant changes when possible.

Summary
Stardust Creator Network provides creators a safe and collaborative space to work with brands. We own content created in collaboration with us, while independent content remains the creator's property. Users submit forms to participate, and all activities should follow the platform's rules and guidelines. Disputes will be resolved under applicable law.`;

interface TermsOfServiceNigeriaProps {
  fullContent?: string;
}

interface ParsedBlock {
  id?: string;
  heading?: string;
  body: string;
}

// fullContent from the CMS is one plain-text block, blank-line-separated,
// with numbered sections written as "N. Heading" on their own line followed
// by the section body on the next line(s) - see the terms-conditions page's
// actual /cms/pages/terms-conditions response. No HTML/markdown in it, so
// this renders it as plain paragraphs rather than reaching for
// dangerouslySetInnerHTML, upgrading numbered lines to headings with an
// anchor id (matched by order) so the sidebar table of contents keeps
// working against CMS-edited text.
function parseFullContent(fullContent: string): ParsedBlock[] {
  const blocks = fullContent
    .split(/\n{2,}/)
    .map(block => block.trim())
    .filter(Boolean);

  let sectionIndex = 0;

  return blocks.map(block => {
    const newlineIndex = block.indexOf('\n');
    const firstLine = newlineIndex === -1 ? block : block.slice(0, newlineIndex);
    const rest = newlineIndex === -1 ? '' : block.slice(newlineIndex + 1).trim();
    const numberedMatch = /^\d+\.\s+(.+)/.exec(firstLine);

    if (numberedMatch && rest) {
      const id = sectionIds[sectionIndex];
      sectionIndex += 1;
      return { id, heading: firstLine, body: rest };
    }

    return { body: block };
  });
}

export default function TermsOfServiceNigeria({
  fullContent = DEFAULT_FULL_CONTENT,
}: TermsOfServiceNigeriaProps) {
  const blocks = parseFullContent(fullContent);

  return (
    <article className="max-w-none">
      {blocks.map((block, index) =>
        block.heading ? (
          <div
            key={block.id ?? index}
            id={block.id}
            className="mb-10 md:mb-16 scroll-mt-20 md:scroll-mt-24"
          >
            <Heading
              level={3}
              variant="gradient"
              className="mb-4 md:mb-6 text-xl sm:text-2xl font-semibold"
            >
              {block.heading}
            </Heading>
            <Text
              variant="body"
              color="white"
              className="text-white leading-relaxed text-sm sm:text-base whitespace-pre-line"
            >
              {block.body}
            </Text>
          </div>
        ) : (
          <div
            key={index}
            className="mb-8 md:mb-12"
          >
            <Text
              variant="body"
              color="white"
              className="text-white/90 leading-relaxed text-base sm:text-lg whitespace-pre-line"
            >
              {block.body}
            </Text>
          </div>
        )
      )}
    </article>
  );
}
