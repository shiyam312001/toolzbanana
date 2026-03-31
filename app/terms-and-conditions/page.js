export const metadata = {
  title: "Terms and Conditions",
  description:
    "ToolzBanana Terms and Conditions covering service use, uploads, third-party services, and limitations of liability.",
  alternates: {
    canonical: "https://toolzbanana.com/terms-and-conditions",
  },
  openGraph: {
    url: "https://toolzbanana.com/terms-and-conditions",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Terms and Conditions
        </h1>
        <p className="text-sm text-slate-500">Last Updated: [Insert Date]</p>
      </header>

      <div className="prose prose-slate mt-8 max-w-none">
        <p>
          Welcome to{" "}
          <strong>ToolzBanana – Developer &amp; Media Utility Hub</strong>
          . By accessing or using our website and tools, you agree to the
          following terms.
        </p>

        <h2>1. Use of Services</h2>
        <p>
          ToolzBanana provides online developer utilities and media tools including
          image tools, PDF tools, and developer tools.
        </p>
        <p>You agree to use the services:</p>
        <ul>
          <li>For lawful purposes only</li>
          <li>Without attempting to damage or disrupt the website</li>
          <li>Without uploading malicious or illegal content</li>
        </ul>

        <h2>2. Temporary File Storage</h2>
        <p>Some tools require file uploads for processing.</p>
        <p>
          ToolzBanana stores uploaded files temporarily only for processing
          purposes.
        </p>
        <p>
          All uploaded files are{" "}
          <strong>automatically deleted within 24 hours</strong> from our system.
        </p>
        <p>Users are responsible for the files they upload.</p>

        <h2>3. Tool Accuracy</h2>
        <p>
          While we strive to provide reliable and accurate tools, ToolzBanana does
          not guarantee that all outputs will be error-free.
        </p>
        <p>Users should verify results before relying on them.</p>

        <h2>4. Intellectual Property</h2>
        <p>
          All website content, branding, design, and tools are the property of{" "}
          <strong>ToolzBanana – Developer &amp; Media Utility Hub</strong>, unless
          otherwise stated.
        </p>
        <p>Unauthorized copying or redistribution is prohibited.</p>

        <h2>5. Third-Party Services</h2>
        <p>
          Our website may include advertisements or third-party integrations such
          as analytics or advertising services.
        </p>
        <p>We are not responsible for third-party services or websites.</p>

        <h2>6. Limitation of Liability</h2>
        <p>
          ToolzBanana shall not be held responsible for any damages, data loss, or
          issues resulting from the use of our tools or services.
        </p>

        <h2>7. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms and Conditions at any time.
          Updates will be posted on this page.
        </p>

        <h2>8. Contact</h2>
        <p>
          For questions about these Terms and Conditions, please contact us:
        </p>
        <p>
          Email:{" "}
          <a href="mailto:contact@toolzbanana.com">contact@toolzbanana.com</a>
        </p>
      </div>
    </main>
  );
}
