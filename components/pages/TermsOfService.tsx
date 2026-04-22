"use client";

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
              By accessing and using ToolzBanana, you accept and agree to be bound by the terms and
              provision of this agreement.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to use ToolzBanana tools for personal and commercial purposes.
              All tools are provided free of charge.
            </p>

            <h2>3. Disclaimer</h2>
            <p>
              The tools are provided "as is". ToolzBanana makes no warranties, expressed or implied,
              and hereby disclaims all other warranties including implied warranties of merchantability.
            </p>

            <h2>4. Limitations</h2>
            <p>
              In no event shall ToolzBanana or its suppliers be liable for any damages arising out of
              the use or inability to use the tools on ToolzBanana.
            </p>

            <h2>5. Accuracy of Materials</h2>
            <p>
              The materials appearing on ToolzBanana could include technical, typographical, or
              photographic errors. ToolzBanana does not warrant that any of the materials are accurate,
              complete, or current.
            </p>

            <h2>6. Modifications</h2>
            <p>
              ToolzBanana may revise these terms of service at any time without notice. By using this
              website you are agreeing to be bound by the current version of these terms of service.
            </p>

            <h2>7. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with applicable
              laws and you irrevocably submit to the exclusive jurisdiction of the courts.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
