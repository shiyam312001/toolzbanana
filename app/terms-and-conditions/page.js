import { TermsOfService } from "../../components/pages/TermsOfService";

export const metadata = {
  title: "Terms and Conditions",
  description:
    "ToolzBanana Terms and Conditions covering service use, uploads, third-party services, and limitations of liability.",
  alternates: {
    canonical: "https://toolzbanana.com/terms-and-conditions",
  },
  openGraph: {
    url: "https://toolzbanana.com/terms-and-conditions",
  },
};

export default function TermsAndConditionsPage() {
  return <TermsOfService />;
}
