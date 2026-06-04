import Link from "next/link";
import {
  LEGAL_ADDRESS_LINES,
  LEGAL_COMPANY,
  LEGAL_EMAIL,
  LEGAL_LAST_UPDATED,
  LEGAL_PHONE,
} from "../../lib/legal-meta";
import { SITE_URL } from "../../lib/site-config";

export function PrivacyPolicyBody() {
  return (
    <>
      <p>
        This Privacy Policy describes how {LEGAL_COMPANY} (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or
        &quot;our&quot;) collects, uses, and shares information when you access or use our website at{" "}
        <a href={SITE_URL} className="text-yellow-700 hover:underline">
          {SITE_URL}
        </a>{" "}
        and related products and services (collectively, the &quot;Services&quot;). This policy should be read together
        with our{" "}
        <Link href="/terms-of-service" className="text-yellow-700 hover:underline">
          Terms of Use
        </Link>{" "}
        and{" "}
        <Link href="/cookie-policy" className="text-yellow-700 hover:underline">
          Cookie Policy
        </Link>
        .
      </p>

      <h2>1. Who we are</h2>
      <p>
        {LEGAL_COMPANY} is registered in India at {LEGAL_ADDRESS_LINES[0]}, {LEGAL_ADDRESS_LINES[1]}. We operate an
        online platform offering smart tools, AI utilities, and productivity solutions.
      </p>
      <p>
        Contact:{" "}
        <a href={`mailto:${LEGAL_EMAIL}`} className="text-yellow-700 hover:underline">
          {LEGAL_EMAIL}
        </a>
        , phone {LEGAL_PHONE}, or mail to {LEGAL_ADDRESS_LINES.join(", ")}.
      </p>

      <h2>2. Information we collect</h2>
      <h3>Information you provide voluntarily</h3>
      <p>
        If you contact us through a form, email, or other channel, we may collect your name, email address, subject line,
        message content, and any other details you choose to provide. We use this information only to respond to your
        inquiry and improve our Services.
      </p>
      <h3>Tool and file data</h3>
      <p>
        Many tools run entirely in your browser; for those tools, files and inputs you provide are processed locally on
        your device and are not transmitted to our servers. When a tool requires server-side processing (for example,
        image tools that call our API routes or third-party processing services), the relevant tool page describes what
        data is sent and why. We do not retain uploaded files beyond the time needed to return a result unless otherwise
        stated on that tool page.
      </p>
      <h3>Automatically collected information</h3>
      <p>
        When you visit the Services, we and our service providers may automatically collect certain technical information,
        such as IP address, browser type, device type, operating system, referring URLs, pages viewed, and approximate
        location derived from IP. We may use analytics services (such as Google Analytics) to understand aggregate
        traffic and usage patterns.
      </p>
      <h3>Cookies and similar technologies</h3>
      <p>
        We and third parties (including advertising partners) may use cookies, pixels, local storage, and similar
        technologies. See our{" "}
        <Link href="/cookie-policy" className="text-yellow-700 hover:underline">
          Cookie Policy
        </Link>{" "}
        for details, including how to manage preferences for personalized advertising.
      </p>

      <h2>3. How we use your information</h2>
      <p>We may use the information we collect to:</p>
      <ul>
        <li>Provide, operate, maintain, and improve the Services;</li>
        <li>Process tool requests that require server-side or third-party processing;</li>
        <li>Respond to support requests and communicate with you;</li>
        <li>Monitor security, prevent fraud, and enforce our Terms of Use;</li>
        <li>Analyze usage trends and measure advertising performance;</li>
        <li>Comply with legal obligations and protect our rights.</li>
      </ul>

      <h2>4. Legal basis and international transfers</h2>
      <p>
        The Services are hosted and operated from <strong>India</strong>. If you access the Services from another region
        where laws governing personal data differ from those in India, you understand that your information may be
        transferred to, stored in, and processed in India. By using the Services, you consent to such transfer and
        processing, as described in our Terms of Use.
      </p>

      <h2>5. How we share information</h2>
      <p>We may share information in the following circumstances:</p>
      <ul>
        <li>
          <strong>Service providers:</strong> With vendors who help us host the site, process tool requests, provide
          analytics, or deliver advertising (for example, hosting providers, API processors, Google AdSense, and Google
          Analytics), subject to contractual obligations where applicable.
        </li>
        <li>
          <strong>Legal requirements:</strong> When required by law, regulation, legal process, or governmental request, or
          to protect the rights, property, or safety of {LEGAL_COMPANY}, our users, or others.
        </li>
        <li>
          <strong>Business transfers:</strong> In connection with a merger, acquisition, financing, or sale of assets, subject
          to appropriate confidentiality protections.
        </li>
      </ul>
      <p>We do not sell your personal information for money.</p>

      <h2>6. Advertising</h2>
      <p>
        We may display advertisements through third-party programmes such as <strong>Google AdSense</strong>. Google and
        other ad partners may use cookies and similar technologies to serve and measure ads, including interest-based
        advertising based on your prior visits to this website or other websites. We do not control which specific ads
        are shown.
      </p>
      <p>
        Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to your
        website or other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads to
        your users based on their visit to your sites and/or other sites on the Internet.
      </p>
      <p>
        You can manage personalized ads through{" "}
        <a
          href="https://www.google.com/settings/ads"
          className="text-yellow-700 hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          Google Ads Settings
        </a>
        , read how Google uses data in its{" "}
        <a
          href="https://policies.google.com/privacy"
          className="text-yellow-700 hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          Privacy Policy
        </a>
        , or opt out of personalized advertising via the{" "}
        <a
          href="https://optout.aboutads.info/"
          className="text-yellow-700 hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          Digital Advertising Alliance opt-out page
        </a>
        . See our Cookie Policy for more information.
      </p>

      <h2>7. Data retention</h2>
      <p>
        We retain information only as long as necessary for the purposes described in this policy, unless a longer
        retention period is required by law. Voluntary contact submissions are kept for a reasonable period to handle your
        request and maintain records. Server-side tool data is retained only for the period needed to complete processing
        and troubleshooting, unless otherwise stated on the tool page.
      </p>

      <h2>8. Security</h2>
      <p>
        We use reasonable administrative, technical, and organizational measures to protect information. Connections to
        our servers use HTTPS where applicable. No method of transmission or storage is completely secure; you use the
        Services at your own risk and should avoid submitting highly sensitive data on untrusted networks.
      </p>

      <h2>9. Your choices and rights</h2>
      <p>Depending on your location, you may have rights to:</p>
      <ul>
        <li>Request access to or correction of personal information we hold about you;</li>
        <li>Request deletion of certain information, subject to legal exceptions;</li>
        <li>Object to or restrict certain processing;</li>
        <li>Withdraw consent where processing is based on consent;</li>
        <li>Lodge a complaint with a supervisory authority.</li>
      </ul>
      <p>
        To exercise these rights, contact us at{" "}
        <a href={`mailto:${LEGAL_EMAIL}`} className="text-yellow-700 hover:underline">
          {LEGAL_EMAIL}
        </a>{" "}
        with &quot;Privacy&quot; in the subject line. We may need to verify your request before responding.
      </p>
      <p>
        You can clear browser <code>localStorage</code> used for preferences or recent tools via your browser settings at
        any time.
      </p>

      <h2>10. Children&apos;s privacy</h2>
      <p>
        The Services are not directed to children under 18 without parental consent. We do not knowingly collect personal
        information from children in violation of applicable law. If you believe we have received information from a
        minor without appropriate consent, contact us and we will take appropriate steps.
      </p>

      <h2>11. Third-party links</h2>
      <p>
        The Services may contain links to third-party websites or services. We are not responsible for the privacy
        practices of those third parties. We encourage you to review their privacy policies before providing information
        to them.
      </p>

      <h2>12. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top of this page
        indicates when changes were posted. Material changes may also be communicated by email or notice on the Services
        where appropriate. Continued use after an update constitutes acceptance of the revised policy.
      </p>

      <h2>13. Contact us</h2>
      <p>
        For privacy questions, requests, or complaints, contact:
      </p>
      <p>
        <strong>{LEGAL_COMPANY}</strong>
        <br />
        {LEGAL_ADDRESS_LINES[0]}
        <br />
        {LEGAL_ADDRESS_LINES[1]}
        <br />
        {LEGAL_ADDRESS_LINES[2]}
        <br />
        Phone: {LEGAL_PHONE}
        <br />
        <a href={`mailto:${LEGAL_EMAIL}`} className="text-yellow-700 hover:underline">
          {LEGAL_EMAIL}
        </a>
      </p>
      <p>
        You may also use our{" "}
        <Link href="/contact-us" className="text-yellow-700 hover:underline">
          contact form
        </Link>
        .
      </p>
      <p className="text-sm text-gray-500">Last updated: {LEGAL_LAST_UPDATED}</p>
    </>
  );
}
