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
    url: `${SITE_URL}/terms-and-conditions`,
  },
};

export default function TermsAndConditionsPage() {
  return <TermsOfService />;
}
