"use client";

import Link from "next/link";
import { SEO } from '../components/common/SEO';
import { Card } from '../components/ui/Card';

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Terms of Service"
        description="ToolzBanana Terms of Service - User agreement and terms"
      />

      <section className="bg-white border-b border-gray-200 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="prose prose-lg max-w-none">

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using ToolzBanana — including any tool, page, or feature available
              on this website — you acknowledge that you have read, understood, and agree to be
              bound by these Terms of Service and our{" "}
              <Link href="/privacy-policy" className="text-yellow-700 hover:underline">
                Privacy Policy
              </Link>
              . If you do not agree with any part of these terms, please discontinue use of the
              site immediately.
            </p>
            <p>
              These terms apply to all visitors and users, whether accessing the site as a casual
              browser, a developer integrating our tools into a workflow, or any other capacity.
            </p>

            <h2>2. No Account Required — No Personal Data Stored</h2>
            <p>
              ToolzBanana operates on a <strong>no-login, no-account</strong> basis. You are not
              required to register, create a profile, or provide any personal information to use
              any of our tools. We do not store user accounts, credentials, or personally
              identifiable information of any kind.
            </p>
            <p>
              Most tools process your files and inputs <strong>entirely within your browser</strong>
              using client-side code. This means your data never leaves your device during those
              operations. We do not log, retain, analyse, or share the content you input into our
              tools. Once you close or navigate away from a tool, any in-memory data is permanently
              discarded.
            </p>
            <p>
              The only persistent local storage we use is your browser's <code>localStorage</code>
              — for example, to remember recently used tools — and this data remains solely on
              your own device. We have no server-side copy of it.
            </p>

            <h2>3. Use License</h2>
            <p>
              ToolzBanana grants you a non-exclusive, non-transferable, revocable licence to access
              and use the tools and content on this site for lawful personal and commercial purposes,
              free of charge, subject to these terms.
            </p>
            <p>
              This licence does not permit you to:
            </p>
            <ul>
              <li>Reproduce, duplicate, copy, or resell any part of ToolzBanana in a way that
                misrepresents it as your own product or service.</li>
              <li>Use automated scripts, bots, or crawlers to scrape, mirror, or systematically
                download content or tool outputs at scale without prior written consent.</li>
              <li>Attempt to reverse-engineer, decompile, or extract source code from any
                proprietary components of the site.</li>
              <li>Use the site in any way that could damage, overburden, or impair its
                infrastructure or interfere with other users' access.</li>
            </ul>

            <h2>4. Acceptable Use</h2>
            <p>
              You agree to use ToolzBanana only for lawful purposes and in a manner consistent with
              all applicable local, national, and international laws and regulations. You must not:
            </p>
            <ul>
              <li>Upload, process, or transmit content that is illegal, harmful, threatening,
                defamatory, obscene, or otherwise objectionable.</li>
              <li>Use the tools to process data belonging to others without appropriate authorisation.</li>
              <li>Attempt to gain unauthorised access to any part of the site's infrastructure.</li>
              <li>Introduce malware, viruses, or any other malicious code.</li>
            </ul>
            <p>
              We reserve the right to block access for users or IP addresses that violate these
              conditions.
            </p>

            <h2>5. Disclaimer of Warranties</h2>
            <p>
              All tools and content on ToolzBanana are provided <strong>"as is"</strong> and
              <strong> "as available"</strong> without any warranty of any kind, express or implied.
              To the fullest extent permitted by applicable law, ToolzBanana expressly disclaims
              all warranties, including but not limited to:
            </p>
            <ul>
              <li>Implied warranties of merchantability and fitness for a particular purpose.</li>
              <li>Warranties that the tools will meet your specific requirements.</li>
              <li>Warranties that the service will be uninterrupted, timely, secure, or error-free.</li>
              <li>Warranties regarding the accuracy, reliability, or completeness of any output
                produced by the tools.</li>
            </ul>
            <p>
              You use ToolzBanana entirely at your own risk. Always verify critical outputs
              independently before relying on them for important decisions.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, ToolzBanana and its operators, affiliates,
              and service providers shall not be liable for any direct, indirect, incidental,
              special, consequential, or punitive damages arising from:
            </p>
            <ul>
              <li>Your use of, or inability to use, any tool or feature on the site.</li>
              <li>Errors, inaccuracies, or omissions in tool outputs.</li>
              <li>Unauthorised access to or alteration of your transmissions or data (noting that
                most data never reaches our servers).</li>
              <li>Any interruption or cessation of the service.</li>
            </ul>
            <p>
              This limitation applies regardless of whether the claim is based in contract, tort,
              negligence, strict liability, or any other legal theory, even if ToolzBanana has been
              advised of the possibility of such damages.
            </p>

            <h2>7. Accuracy of Materials</h2>
            <p>
              The materials, tool outputs, and informational content on ToolzBanana may include
              technical inaccuracies, typographical errors, or outdated information. ToolzBanana
              does not warrant that any content is accurate, complete, current, or error-free.
              We may update or remove content at any time without prior notice, and we make no
              commitment to keep any particular tool or page available indefinitely.
            </p>

            <h2>8. Third-Party Links and Services</h2>
            <p>
              ToolzBanana may contain links to third-party websites, APIs, or services for your
              convenience. These links do not constitute endorsement of the linked site or its
              content. We have no control over, and accept no responsibility for, the content,
              privacy practices, or terms of any third-party site you visit via a link from
              ToolzBanana.
            </p>
            <p>
              Additionally, advertising on this site is served by Google AdSense. Google's
              advertising technologies operate under Google's own terms of service and privacy
              policy. ToolzBanana does not control which ads are displayed and is not responsible
              for the content of those advertisements.
            </p>

            <h2>9. Intellectual Property</h2>
            <p>
              The ToolzBanana name, logo, site design, and original editorial content are the
              intellectual property of ToolzBanana and may not be used without prior written
              permission. Tool outputs generated from your own inputs belong to you; we claim
              no rights over content you produce using our tools.
            </p>

            <h2>10. Modifications to the Service and Terms</h2>
            <p>
              ToolzBanana reserves the right to modify, suspend, or discontinue any part of the
              service at any time without notice. We may also revise these Terms of Service at
              any time. Changes become effective when posted to this page, identified by an
              updated date at the top. Your continued use of ToolzBanana after any change
              constitutes your acceptance of the revised terms. We encourage you to review this
              page periodically.
            </p>

            <h2>11. Governing Law and Jurisdiction</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with
              applicable laws. Any disputes arising in connection with these terms shall be
              subject to the exclusive jurisdiction of the competent courts in the relevant
              jurisdiction. If any provision of these terms is found to be unenforceable, the
              remaining provisions shall continue in full force and effect.
            </p>

            <h2>12. Contact</h2>
            <p>
              If you have any questions about these Terms of Service, please reach out via the{" "}
              <Link href="/contact-us" className="text-yellow-700 hover:underline">
                contact form
              </Link>
              . Please include <strong>Terms</strong> in the subject line.
            </p>

          </Card>
        </div>
      </section>
    </div>
  );
}