import { ContactUs } from "../../components/pages/ContactUs";
import { SITE_URL } from "../../lib/site-config";

export const metadata = {
  title: "Contact Us",
  description:
    "Reach ToolzBanana for product feedback, partnership questions, or privacy inquiries. We aim to respond within one business day when possible.",
  alternates: { canonical: `${SITE_URL}/contact-us` },
  openGraph: {
    title: "Contact Us · ToolzBanana",
    description:
      "Reach ToolzBanana for feedback, support, and privacy questions.",
    url: `${SITE_URL}/contact-us`,
    type: "website",
  },
  twitter: {
    title: "Contact Us · ToolzBanana",
    description:
      "Reach ToolzBanana for feedback, support, and privacy questions.",
  },
};

export default function ContactUsPage() {
  return <ContactUs />;
}
