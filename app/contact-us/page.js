import { ContactUs } from "../../components/pages/ContactUs";

const SITE_URL = "https://toolzbanana.com";

export const metadata = {
  title: "Contact Us",
  description: "Contact ToolzBanana for support, feedback, and suggestions.",
  alternates: { canonical: `${SITE_URL}/contact-us` },
  openGraph: { url: `${SITE_URL}/contact-us` },
};

export default function ContactUsPage() {
  return <ContactUs />;
}
