import { Suspense } from "react";
import { AllTools } from "../../components/pages/AllTools";
import { SITE_URL } from "../../lib/site-config";

export const metadata = {
  title: "Developer Tools",
  description:
    "Explore developer utilities: JSON formatter, JWT decoder, Base64 tools, UUID generator, API tester, regex tester, SQL formatter, and more.",
  alternates: { canonical: `${SITE_URL}/tools` },
  openGraph: {
    title: "Developer Tools · ToolzBanana",
    description:
      "Explore developer utilities: JSON formatter, JWT decoder, Base64 tools, UUID generator, API tester, regex tester, SQL formatter, and more.",
    url: `${SITE_URL}/tools`,
    type: "website",
  },
  twitter: {
    title: "Developer Tools · ToolzBanana",
    description:
      "Explore developer utilities: JSON formatter, JWT decoder, Base64 tools, UUID generator, API tester, regex tester, SQL formatter, and more.",
  },
};

export default function ToolsDashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <AllTools />
    </Suspense>
  );
}