import { Home as HomePage } from "../components/pages/Home";
import { SITE_URL } from "../lib/site-config";

export const metadata = {
  title: "ToolzBanana – Free developer, PDF & image tools (no login)",
  description:
    "ToolzBanana offers free browser-based utilities for developers and creators: JSON and JWT helpers, Base64 tools, regex and SQL formatters, image compression and conversion, and PDF merge, split, and export—with editorial guides on every page.",
  keywords: [
    "free online developer tools",
    "JSON formatter online",
    "JWT decoder browser",
    "PDF merge free",
    "image compressor online",
    "ToolzBanana",
    "browser-based utilities",
  ],
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    title: "ToolzBanana – Free developer, PDF & image tools (no login)",
    description:
      "Free browser-based utilities for developers and creators, with in-depth guides on every tool page.",
    url: `${SITE_URL}/`,
  },
  twitter: {
    title: "ToolzBanana – Free developer, PDF & image tools (no login)",
    description:
      "Free browser-based utilities for developers and creators, with in-depth guides on every tool page.",
  },
};

export default function Home() {
  return <HomePage />;
}
