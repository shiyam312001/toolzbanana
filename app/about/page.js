import { About } from "../../components/pages/About";

const SITE_URL = "https://toolzbanana.com";

export const metadata = {
  title: "About",
  description: "Learn more about ToolzBanana and our mission.",
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return <About />;
}
