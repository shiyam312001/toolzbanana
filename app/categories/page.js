import { Categories } from "../../components/pages/Categories";
import { SITE_URL } from "../../lib/site-config";

export const metadata = {
  title: "Categories",
  description: "Browse tool categories like PDF, image, and developer tools.",
  alternates: { canonical: `${SITE_URL}/categories` },
  openGraph: {
    title: "Categories · ToolzBanana",
    description: "Browse tool categories: developer utilities, image tools, and PDF workflows.",
    url: `${SITE_URL}/categories`,
    type: "website",
  },
  twitter: {
    title: "Categories · ToolzBanana",
    description: "Browse tool categories: developer utilities, image tools, and PDF workflows.",
  },
};

export default function CategoriesPage() {
  return <Categories />;
}