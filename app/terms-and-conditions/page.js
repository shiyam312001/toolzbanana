import { TermsOfService } from "../../components/pages/TermsOfService";
import { SITE_URL } from "../../lib/site-config";

export const metadata = {
  title: "Terms and Conditions",
  description:
    "ToolzBanana Terms and Conditions covering service use, uploads, third-party services, and limitations of liability.",
  alternates: {
    canonical: `${SITE_URL}/terms-and-conditions`,
  },
  openGraph: {
    title: "Terms and Conditions · ToolzBanana",
    description:
      "ToolzBanana Terms and Conditions covering service use, uploads, third-party services, and limitations of liability.",
    url: `${SITE_URL}/terms-and-conditions`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms and Conditions · ToolzBanana",
    description:
      "ToolzBanana Terms and Conditions covering service use, uploads, third-party services, and limitations of liability.",
    images: [`${SITE_URL}/file.svg`],
  },
};

export default function TermsAndConditionsPage() {
  return <TermsOfService />;
}
