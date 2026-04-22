import { PrivacyPolicy } from "../../components/pages/PrivacyPolicy";

export const metadata = {
  title: "Privacy Policy",
  description:
    "ToolzBanana Privacy Policy explaining information collection, uploads, cookies, advertising, and contact details.",
  alternates: {
    canonical: "https://toolzbanana.com/privacy-policy",
  },
  openGraph: {
    url: "https://toolzbanana.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
