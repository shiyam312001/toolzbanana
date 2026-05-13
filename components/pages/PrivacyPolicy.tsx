"use client";

import Link from "next/link";
import { SEO } from '../components/common/SEO';
import { Card } from '../components/ui/Card';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Privacy Policy"
        description="ToolzBanana Privacy Policy - Learn how we protect your data"
      />

      <section className="bg-white border-b border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="prose prose-lg max-w-none">

            <h2>1. No Account Required — No Personal Data Collected</h2>
            <p>
              ToolzBanana is designed with a <strong>zero-login, zero-account</strong> philosophy.
              You do not need to register, sign up, or provide any personal information — such as
              your name, email address, phone number, or billing details — to access or use any of
              our tools. There is no mandatory authentication layer of any kind.
            </p>
            <p>
              Because we do not operate user accounts, we have <strong>no profile data, no
              credentials, and no personally identifiable information (PII) to store, sell, or
              breach</strong>. This is a deliberate architectural choice: the simplest way to
              protect your data is to never collect it in the first place.
            </p>

            <h2>2. How Your Files and Input Data Are Handled</h2>
            <p>
              The majority of ToolzBanana utilities — including file converters, text processors,
              image tools, and calculators — execute <strong>entirely within your browser</strong>
              using client-side JavaScript. This means:
            </p>
            <ul>
              <li>Your files, text, and inputs are processed locally on your own device.</li>
              <li>No content is transmitted to ToolzBanana servers during these operations.</li>
              <li>Nothing you paste, type, or upload for these tools is stored, logged, or retained by us.</li>
              <li>Once you close or refresh the tab, all in-memory data is gone.</li>
            </ul>
            <p>
              When a specific tool must call a server-side API route — for example, to interface
              with a third-party service — the relevant tool page will clearly describe what data
              is sent, why it is needed, and how it is handled. Server-side calls are the exception,
              not the rule, and no such data is stored beyond the time required to return a result
              to your browser.
            </p>

            <h2>3. Local Storage — Stays on Your Device</h2>
            <p>
              To improve your experience, ToolzBanana uses your browser's <code>localStorage</code>
              to remember things like your recently used tools or UI preferences (for example, a
              preferred theme or unit setting). This storage mechanism is:
            </p>
            <ul>
              <li><strong>Entirely local</strong> — the data never leaves your device.</li>
              <li><strong>Never synced</strong> to our servers, because there is no account to sync to.</li>
              <li><strong>Fully under your control</strong> — you can clear it at any time via your
                browser's settings or developer tools (Application → Local Storage → Clear).</li>
            </ul>
            <p>
              We do not use server-side sessions, databases, or any mechanism that associates
              browsing behaviour with a persistent identity.
            </p>

            <h2>4. Cookies and Similar Technologies</h2>
            <p>
              ToolzBanana itself uses minimal first-party mechanisms strictly for essential
              functionality. We do not set tracking cookies for analytics or user profiling.
            </p>
            <p>
              However, third-party advertising partners — including Google AdSense — may set
              their own cookies or use advertising identifiers on pages where ads are displayed.
              These are governed by the respective third parties' own privacy policies, not ours.
              You can learn more about how Google uses data at Google's partner policy documentation,
              and use industry opt-out tools where available in your region (such as the NAI
              opt-out tool or the EU's Your Online Choices).
            </p>

            <h2>5. Advertising — Google AdSense</h2>
            <p>
              ToolzBanana is a free service supported in part by advertising revenue through
              <strong> Google AdSense</strong>, a third-party advertising programme operated by
              Google LLC. Here is what you should know about how advertising works on this site:
            </p>

            <h3>5a. Where Ads Appear</h3>
            <p>
              We follow Google AdSense's programme policies and only place ad units on pages
              that contain <strong>meaningful, substantive publisher content</strong>. This includes:
            </p>
            <ul>
              <li>The homepage, which features editorial sections, tool categories, and descriptive copy.</li>
              <li>Category and directory pages that include explanatory text about the tools they list.</li>
              <li>Individual tool pages that contain long-form explanations, usage guides, FAQs,
                or educational content beneath the interactive widget.</li>
            </ul>
            <p>
              We do <strong>not</strong> place ads on sparse or low-content screens such as bare
              navigation states, error pages, or broken tool URLs, in order to maintain a high-quality
              experience and comply with AdSense content guidelines.
            </p>

            <h3>5b. How Google Serves Ads</h3>
            <p>
              Google AdSense uses cookies, web beacons, and similar tracking technologies to serve
              ads that are relevant to your interests. Google's advertising system may use:
            </p>
            <ul>
              <li><strong>Interest-based advertising</strong> — ads tailored to browsing behaviour
                across websites that use Google services.</li>
              <li><strong>Contextual advertising</strong> — ads matched to the content of the page
                you are viewing.</li>
              <li><strong>Demographic inference</strong> — estimated age and gender brackets based
                on your Google account (if you are signed in) or browsing signals.</li>
              <li><strong>Remarketing</strong> — ads that may follow you to other websites after
                visiting ToolzBanana, if Google's remarketing features are active.</li>
            </ul>
            <p>
              ToolzBanana does not control which specific ads Google serves, and we do not receive
              any personal data about you from Google as part of the ad-serving process. We receive
              only aggregate, anonymised performance metrics (such as total impressions or click
              rates) for revenue reporting purposes.
            </p>

            <h3>5c. Your Choices Regarding Personalised Ads</h3>
            <p>
              You have several options to manage or opt out of personalised advertising:
            </p>
            <ul>
              <li>Visit <strong>Google's Ads Settings</strong> (adssettings.google.com) to review and
                adjust how Google personalises ads for your account or browser.</li>
              <li>Use the <strong>NAI (Network Advertising Initiative) opt-out tool</strong> at
                optout.networkadvertising.org to opt out of interest-based advertising from
                participating ad networks.</li>
              <li>If you are in the EU/EEA, use the <strong>Your Online Choices</strong> tool at
                youronlinechoices.eu.</li>
              <li>Install a browser extension such as the <strong>Google Analytics Opt-out Add-on</strong>
                or a content blocker if you prefer to block ads entirely.</li>
              <li>Enable <strong>Do Not Track (DNT)</strong> in your browser settings — note that
                while we respect this signal in our own first-party code, third-party ad networks
                may not honour it.</li>
            </ul>
            <p>
              Opting out of personalised ads does not mean you will see no ads — it means you may
              see ads that are less relevant to your interests (contextual or generic ads instead).
            </p>

            <h2>6. Data Security</h2>
            <p>
              Because the majority of tools run entirely in your browser, your files and data are
              typically never uploaded to our servers at all — which is the strongest possible
              security guarantee. When server communication is required, all connections use HTTPS
              (TLS encryption) in transit. We advise you to avoid processing highly confidential
              documents on any public or untrusted Wi-Fi network, and to close the browser tab when
              you are finished.
            </p>

            <h2>7. Children's Privacy</h2>
            <p>
              ToolzBanana is intended for a general professional and consumer audience. We do not
              knowingly collect personal information from children under the age at which parental
              consent is required in your jurisdiction (typically under 13 in the United States
              under COPPA, or under 16 in certain EU member states under the GDPR). Since we collect
              no personal data from any user, this protection applies by default. If you believe we
              have inadvertently received data from a minor, please contact us so we can address it
              promptly.
            </p>

            <h2>8. International Visitors</h2>
            <p>
              ToolzBanana operates on the public internet and may use infrastructure providers and
              content delivery networks in multiple regions to ensure reliable, low-latency service
              globally. By using ToolzBanana, you understand that any information voluntarily
              submitted through contact forms may be processed where our service providers operate,
              subject to this policy and applicable law. We do not transfer, sell, or share voluntary
              submissions with unrelated third parties.
            </p>

            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time to reflect changes in our practices,
              tools, or applicable law. Material changes will be reflected by updating the date at
              the top of this page. Where appropriate, we may also post a short notice on the
              homepage or blog. Continued use of ToolzBanana after a policy update constitutes
              acceptance of the revised terms.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy — including requests
              relating to any data you believe we hold — please use the{" "}
              <Link href="/contact-us" className="text-yellow-700 hover:underline">
                contact form
              </Link>{" "}
              or the email address shown there. Please include the word <strong>Privacy</strong>{" "}
              in the subject line so we can prioritise your request.
            </p>

          </Card>
        </div>
      </section>
    </div>
  );
}