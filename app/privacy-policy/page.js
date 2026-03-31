export const metadata = {
  title: "Privacy Policy",
  description:
    "ToolzBanana Privacy Policy explaining information collection, uploads, cookies, advertising, and contact details.",
  alternates: {
    canonical: "https://toolzbanana.com/privacy-policy",
  },
  openGraph: {
    url: "https://toolzbanana.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500">Last Updated: [Insert Date]</p>
      </header>

      <div className="prose prose-slate mt-8 max-w-none">
        <p>
          Welcome to{" "}
          <strong>ToolzBanana – Developer &amp; Media Utility Hub</strong>
          . Your privacy is important to us. This Privacy Policy explains how we
          handle information when you use our website and online tools.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          ToolzBanana does not require users to create an account to use most tools.
          We collect minimal information necessary to operate the platform.
        </p>
        <p>This may include:</p>
        <ul>
          <li>Browser and device information</li>
          <li>Anonymous usage analytics</li>
          <li>Temporary files uploaded for tool processing</li>
        </ul>
        <p>
          We do <strong>not collect personal information</strong> unless you
          voluntarily provide it (such as contacting us via email).
        </p>

        <h2>2. File Uploads and Processing</h2>
        <p>
          Some tools on ToolzBanana allow users to upload files such as images, PDFs,
          or other data for processing.
        </p>
        <p>Important notes:</p>
        <ul>
          <li>Files are processed automatically by the system</li>
          <li>Files are stored temporarily only for processing</li>
          <li>
            <strong>All uploaded files are automatically deleted within 24 hours</strong>
          </li>
          <li>
            We do <strong>not permanently store user files</strong>
          </li>
        </ul>
        <p>
          We recommend users avoid uploading sensitive or confidential documents.
        </p>

        <h2>3. Cookies</h2>
        <p>ToolzBanana may use cookies to:</p>
        <ul>
          <li>Improve website performance</li>
          <li>Understand user interactions</li>
          <li>Provide a better browsing experience</li>
        </ul>
        <p>Users can disable cookies through browser settings.</p>

        <h2>4. Advertising</h2>
        <p>
          ToolzBanana may display advertisements through advertising partners such as{" "}
          <strong>Google AdSense</strong>.
        </p>
        <p>
          These services may use cookies or similar technologies to deliver
          relevant ads based on user behavior.
        </p>

        <h2>5. Third-Party Services</h2>
        <p>We may use third-party services for:</p>
        <ul>
          <li>Website analytics</li>
          <li>Advertising</li>
          <li>Performance monitoring</li>
        </ul>
        <p>These services may collect anonymous usage information.</p>

        <h2>6. Data Security</h2>
        <p>
          We implement reasonable technical measures to protect user data and
          ensure secure processing of uploaded files.
        </p>
        <p>However, no system can guarantee complete security.</p>

        <h2>7. Children&apos;s Privacy</h2>
        <p>
          ToolzBanana is not intended for children under the age of 13. We do not
          knowingly collect personal information from children.
        </p>

        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically. Changes will be posted
          on this page with an updated revision date.
        </p>

        <h2>9. Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please contact us:</p>
        <p>
          Email:{" "}
          <a href="mailto:contact@toolzbanana.com">contact@toolzbanana.com</a>
        </p>
      </div>
    </main>
  );
}
