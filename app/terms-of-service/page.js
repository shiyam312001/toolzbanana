import { TermsOfService } from "../../components/pages/TermsOfService";
import { SITE_URL } from "../../lib/site-config";

export const metadata = {
  title: "Terms of Service",
  description: "Terms of Service for using ToolzBanana tools and services.",
  alternates: { canonical: `${SITE_URL}/terms-of-service` },
  openGraph: {
    title: "Terms of Service · ToolzBanana",
    description: "Terms of Service for using ToolzBanana tools and services.",
    url: `${SITE_URL}/terms-of-service`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service · ToolzBanana",
    description: "Terms of Service for using ToolzBanana tools and services.",
    images: [`${SITE_URL}/file.svg`],
  },
};

export default function TermsOfServicePage() {
  return <TermsOfService />;
}
