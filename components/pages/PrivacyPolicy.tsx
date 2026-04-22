"use client";

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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="prose prose-lg max-w-none">
            <h2>1. Information We Collect</h2>
            <p>
              At ToolzBanana, we respect your privacy. Our tools process files locally in your browser
              whenever possible, meaning your data never leaves your device.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use localStorage to save your recently used tools for convenience. This data stays
              on your device and is never transmitted to our servers.
            </p>

            <h2>3. Cookies</h2>
            <p>
              We use minimal cookies for essential functionality like dark mode preferences. We do not
              use tracking cookies.
            </p>

            <h2>4. Third-Party Services</h2>
            <p>
              We use Google AdSense to display advertisements. Google may use cookies to serve ads
              based on your prior visits to our website or other websites.
            </p>

            <h2>5. Data Security</h2>
            <p>
              Since most of our tools work entirely in your browser, your files are never uploaded to
              our servers. This ensures maximum privacy and security for your data.
            </p>

            <h2>6. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes
              by posting the new policy on this page.
            </p>

            <h2>7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us through our
              contact page.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
