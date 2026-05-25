"use client";

import { PrivacyPolicyBody } from "../legal/PrivacyPolicyBody";
import { SEO } from "../components/common/SEO";
import { Card } from "../components/ui/Card";
import { LEGAL_LAST_UPDATED } from "../../lib/legal-meta";

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Privacy Policy"
        description="Toolzbanana Privacy Policy — how we collect, use, and protect information."
      />

      <section className="bg-white border-b border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: {LEGAL_LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="prose prose-lg max-w-none">
            <PrivacyPolicyBody />
          </Card>
        </div>
      </section>
    </div>
  );
}
