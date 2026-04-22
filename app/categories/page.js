import { Categories } from "../../components/pages/Categories";

const SITE_URL = "https://toolzbanana.com";

export const metadata = {
  title: "Categories",
  description: "Browse tool categories like PDF, image, and developer tools.",
  alternates: { canonical: `${SITE_URL}/categories` },
  openGraph: { url: `${SITE_URL}/categories` },
};

export default function CategoriesPage() {
  return <Categories />;
}