import { Home as HomePage } from "../components/pages/Home";

const SITE_URL = "https://toolzbanana.com";

export const metadata = {
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    url: `${SITE_URL}/`,
  },
  twitter: {
    title: "ToolzBanana – Developer & Media Utility Hub",
    description:
      "Free, fast utilities for developers and creators: JSON formatter, JWT decoder, PDF tools, image utilities, and more.",
  },
};

export default function Home() {
  return <HomePage />;
}
