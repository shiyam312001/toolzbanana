import { Suspense } from "react";
import { AllTools } from "../../components/pages/AllTools";

const SITE_URL = "https://toolzbanana.com";

export const metadata = {
  title: "Developer Tools",
  description:
    "Explore developer utilities: JSON formatter, JWT decoder, Base64 tools, UUID generator, API tester, regex tester, SQL formatter, and more.",
  alternates: { canonical: `${SITE_URL}/tools` },
  openGraph: { url: `${SITE_URL}/tools` },
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