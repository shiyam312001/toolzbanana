"use client";

import Link from "next/link";
import { SEO } from "../components/common/SEO";
import { Card } from "../components/ui/Card";

export function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Cookie Policy"
        description="How ToolzBanana uses cookies and similar technologies, including Google AdSense."
      />

      <section className="bg-white border-b border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-gray-600">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="prose prose-lg max-w-none">

            <h2>1. What this policy covers</h2>
            <p>
              This Cookie Policy explains how ToolzBanana uses cookies and similar browser technologies
              when you visit our website. ToolzBanana is a completely free, no-account, no-login
              toolset — we do not collect, store, or process any personal information from you
              directly. The only cookies present on this site come from third-party services (Google
              AdSense and Google Analytics) described below. This policy should be read alongside our{" "}
              <Link href="/privacy-policy" className="text-yellow-700 hover:underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms-of-service" className="text-yellow-700 hover:underline">
                Terms of Use
              </Link>
              .
            </p>

            <h2>2. We do not set any first-party cookies</h2>
            <p>
              Because ToolzBanana has no user accounts, no login system, and no personalisation
              features that require tracking, <strong>we do not set any first-party cookies
              ourselves</strong>. We may use browser <code>localStorage</code> solely to remember
              lightweight UI preferences (such as your last-used tool) — this data never leaves your
              device and is never sent to our servers.
            </p>

            <h2>3. Third-party cookies — Google AdSense</h2>
            <p>
              We display ads via <strong>Google AdSense</strong> to keep ToolzBanana free for
              everyone. Google sets its own cookies to serve, personalise, and measure those ads.
              We have no access to the data those cookies contain. Common AdSense cookies include:
            </p>

            <div className="overflow-x-auto my-4">
              <table className="min-w-full text-sm border border-gray-200 rounded">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold">Cookie</th>
                    <th className="px-4 py-2 text-left font-semibold">Set by</th>
                    <th className="px-4 py-2 text-left font-semibold">Purpose</th>
                    <th className="px-4 py-2 text-left font-semibold">Lifespan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 font-mono">__gads</td>
                    <td className="px-4 py-2">google.com</td>
                    <td className="px-4 py-2">Registers ad impressions and prevents the same ad repeating too often.</td>
                    <td className="px-4 py-2">13 months</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 font-mono">__gpi</td>
                    <td className="px-4 py-2">google.com</td>
                    <td className="px-4 py-2">Works with <code>__gads</code> to measure ad performance and limit repetition.</td>
                    <td className="px-4 py-2">13 months</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono">__eoi</td>
                    <td className="px-4 py-2">google.com</td>
                    <td className="px-4 py-2">Identifies an end-user for interest-based ads when third-party cookies are restricted.</td>
                    <td className="px-4 py-2">13 months</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 font-mono">IDE</td>
                    <td className="px-4 py-2">doubleclick.net</td>
                    <td className="px-4 py-2">Records and reports actions after seeing or clicking an ad to measure effectiveness.</td>
                    <td className="px-4 py-2">13 months</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono">DSID</td>
                    <td className="px-4 py-2">doubleclick.net</td>
                    <td className="px-4 py-2">Identifies a signed-in Google user across non-Google sites for ad personalisation.</td>
                    <td className="px-4 py-2">2 weeks</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 font-mono">test_cookie</td>
                    <td className="px-4 py-2">doubleclick.net</td>
                    <td className="px-4 py-2">Short-lived check to confirm the browser supports cookies before serving ads.</td>
                    <td className="px-4 py-2">15 minutes</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono">NID</td>
                    <td className="px-4 py-2">google.com</td>
                    <td className="px-4 py-2">Stores preferences such as language to customise ads shown on Google services.</td>
                    <td className="px-4 py-2">6 months</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Cookie names and lifespans may change at Google's discretion. For the most current list
              visit{" "}
              <a
                href="https://policies.google.com/technologies/cookies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-700 hover:underline"
              >
                Google's cookie policy
              </a>
              .
            </p>

            <h2>4. Third-party cookies — Google Analytics</h2>
            <p>
              We use <strong>Google Analytics</strong> to understand aggregate, anonymous traffic
              patterns — for example which tools are most popular or how visitors navigate the site.
              Analytics data is never linked to any individual and is not combined with AdSense data
              on our end. Google may set <code>_ga</code>, <code>_gid</code>, and related cookies
              for this purpose; they typically expire within 2 years and 24 hours respectively.
            </p>

            <h2>5. Your tools — no data collected by us</h2>
            <p>
              All tools on ToolzBanana run either entirely in your browser or via a secure HTTPS
              call to our processing API (for example the Background Remover). In both cases:
            </p>
            <ul>
              <li>We do not store your uploaded files after processing is complete.</li>
              <li>We do not link your tool usage to any identity or profile.</li>
              <li>We do not use advertising cookies to inspect or identify the contents of your uploads.</li>
              <li>No account, email, or login is ever required.</li>
            </ul>

            <h2>6. Managing cookies and opting out</h2>
            <p>You can control ad cookies in several ways:</p>
            <ul>
              <li>
                Adjust Google ad personalisation at{" "}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-700 hover:underline"
                >
                  adssettings.google.com
                </a>
                .
              </li>
              <li>
                Use industry opt-out tools: NAI opt-out (optout.networkadvertising.org) for US
                users, or Your Online Choices for EU users.
              </li>
              <li>
                Block or delete third-party cookies in your browser settings — this won't break
                any ToolzBanana tool.
              </li>
            </ul>
            <p>
              Opting out of personalised ads means you may still see ads, but they will be
              contextual rather than interest-based.
            </p>

            <h2>7. Contact</h2>
            <p>
              Questions about this policy? Use our{" "}
              <Link href="/contact-us" className="text-yellow-700 hover:underline">
                contact form
              </Link>{" "}
              and include <strong>Cookie Policy</strong> in the subject line.
            </p>

          </Card>
        </div>
      </section>
    </div>
  );
}