import { TermsOfService } from "../../components/pages/TermsOfService";

const SITE_URL = "https://toolzbanana.com";

export const metadata = {
  title: "Terms of Service",
  description: "Terms of Service for using ToolzBanana tools and services.",
  alternates: { canonical: `${SITE_URL}/terms-of-service` },
  openGraph: { url: `${SITE_URL}/terms-of-service` },
};

export default function TermsOfServicePage() {
  return <TermsOfService />;
}
