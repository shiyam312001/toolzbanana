import { Home as HomePage } from "../components/pages/Home";

const SITE_URL = "https://toolzbanana.com";

export const metadata = {
  title: "ToolzBanana – Free Online Tools for PDF, Image, SEO & Developers (No Login)",
  description:
    "Use ToolzBanana for free online PDF, image, SEO and developer tools. No login required. Fast, secure and easy tools for everyone in India.",
  keywords: [
    "free online tools without login",
    "developer tools free online",
    "all in one online tools website",
    "free productivity tools website",
    "toolzbanana tools",
    "free pdf tools without login",
    "image compressor online free",
    "free seo keyword generator tool",
    "free online tools india",
    "chennai online tools website",
    "best free pdf tools without login in india",
    "all in one developer tools website free",
  ],
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    title: "ToolzBanana – Free Online Tools for PDF, Image, SEO & Developers (No Login)",
    description:
      "Use ToolzBanana for free online PDF, image, SEO and developer tools. No login required. Fast, secure and easy tools for everyone in India.",
    url: `${SITE_URL}/`,
  },
  twitter: {
    title: "ToolzBanana – Free Online Tools for PDF, Image, SEO & Developers (No Login)",
    description:
      "Use ToolzBanana for free online PDF, image, SEO and developer tools. No login required. Fast, secure and easy tools for everyone in India.",
  },
};

export default function Home() {
  return <HomePage />;
}
