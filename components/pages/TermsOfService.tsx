"use client";

import Link from "next/link";
import { TermsOfUseBody } from "../legal/TermsOfUseBody";
import { SEO } from "../components/common/SEO";
import { Card } from "../components/ui/Card";
import { LEGAL_LAST_UPDATED } from "../../lib/legal-meta";

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Terms of Use"
        description="Toolzbanana Terms of Use — legal terms governing access to our Services."
      />

      <section className="bg-white border-b border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Use</h1>
          <p className="text-gray-600">Last updated: {LEGAL_LAST_UPDATED}</p>
          <p className="text-gray-600 mt-2 text-sm">
            Also referred to as Terms and Conditions. See also our{" "}
            <Link href="/privacy-policy" className="text-yellow-700 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="prose prose-lg max-w-none">
            <TermsOfUseBody />
          </Card>
        </div>
      </section>
    </div>
  );
}
