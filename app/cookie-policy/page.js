import { CookiePolicy } from "../../components/pages/CookiePolicy";
import { SITE_URL } from "../../lib/site-config";

export const metadata = {
  title: "Cookie Policy",
  description:
    "How ToolzBanana uses cookies, local storage, Google AdSense, and Google Analytics.",
  alternates: { canonical: `${SITE_URL}/cookie-policy` },
  openGraph: {
    title: "Cookie Policy · ToolzBanana",
    description:
      "How ToolzBanana uses cookies, local storage, Google AdSense, and Google Analytics.",
    url: `${SITE_URL}/cookie-policy`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy · ToolzBanana",
    description:
      "How ToolzBanana uses cookies, local storage, Google AdSense, and Google Analytics.",
    images: [`${SITE_URL}/file.svg`],
  },
};

export default function CookiePolicyPage() {
  return <CookiePolicy />;
}
