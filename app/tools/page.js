import { Suspense } from "react";
import { AllTools } from "../../components/pages/AllTools";
import { SITE_URL } from "../../lib/site-config";

function hasFilterParams(searchParams) {
  if (!searchParams) return false;
  const search = searchParams.search;
  const category = searchParams.category;
  const view = searchParams.view;
  return Boolean(
    (typeof search === "string" && search.trim()) ||
      (typeof category === "string" && category.trim()) ||
      (typeof view === "string" && view.trim() && view !== "all"),
  );
}

export async function generateMetadata({ searchParams }) {
  const sp = await searchParams;
  const filtered = hasFilterParams(sp);

  const base = {
    title: "All Tools",
    description:
      "Browse 20+ free browser-based tools for developers and creators: JSON, JWT, Base64, regex, SQL, image compression, PDF merge, and more.",
    alternates: { canonical: `${SITE_URL}/tools` },
    openGraph: {
      title: "All Tools · ToolzBanana",
      description:
        "Browse free browser-based developer, image, and PDF utilities with in-depth guides on every page.",
      url: `${SITE_URL}/tools`,
      type: "website",
    },
    twitter: {
      title: "All Tools · ToolzBanana",
      description:
        "Browse free browser-based developer, image, and PDF utilities with in-depth guides on every page.",
    },
  };

  if (filtered) {
    return {
      ...base,
      robots: { index: false, follow: true },
    };
  }

  return base;
}

export default function ToolsDashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <AllTools />
    </Suspense>
  );
}
