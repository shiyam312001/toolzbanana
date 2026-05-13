import { About } from "../../components/pages/About";
import { SITE_URL } from "../../lib/site-config";

export const metadata = {
  title: "About",
  description:
    "Learn how ToolzBanana builds free browser-based utilities, our editorial standards, and how we approach privacy and advertising.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About · ToolzBanana",
    description:
      "Mission, editorial standards, and how ToolzBanana approaches privacy alongside free tools.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
  twitter: {
    title: "About · ToolzBanana",
    description:
      "Mission, editorial standards, and how we approach privacy alongside free tools.",
  },
};

export default function AboutPage() {
  return <About />;
}
