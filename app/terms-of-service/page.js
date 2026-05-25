import { TermsOfService } from "../../components/pages/TermsOfService";
import { SITE_URL } from "../../lib/site-config";

export const metadata = {
  title: "Terms of Use",
  description:
    "Terms of Use (Terms and Conditions) for Toolzbanana — legal agreement governing access to our Services.",
  alternates: { canonical: `${SITE_URL}/terms-of-service` },
  openGraph: {
    title: "Terms of Use · Toolzbanana",
    description:
      "Terms of Use (Terms and Conditions) for Toolzbanana — legal agreement governing access to our Services.",
    url: `${SITE_URL}/terms-of-service`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Use · Toolzbanana",
    description:
      "Terms of Use (Terms and Conditions) for Toolzbanana — legal agreement governing access to our Services.",
    images: [`${SITE_URL}/file.svg`],
  },
};

export default function TermsOfServicePage() {
  return <TermsOfService />;
}
