import { PrivacyPolicy } from "../../components/pages/PrivacyPolicy";
import { SITE_URL } from "../../lib/site-config";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Toolzbanana Privacy Policy explaining information collection, uploads, cookies, advertising, and contact details.",
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
  openGraph: {
    title: "Privacy Policy · Toolzbanana",
    description:
      "How Toolzbanana handles data, cookies, local processing, and third-party advertising.",
    url: `${SITE_URL}/privacy-policy`,
    type: "website",
  },
  twitter: {
    title: "Privacy Policy · Toolzbanana",
    description:
      "How Toolzbanana handles data, cookies, local processing, and third-party advertising.",
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
