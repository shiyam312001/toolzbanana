import "./globals.css";
import "../components/styles/theme.css";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import Script from "next/script";
import { Navbar } from "../components/site/navbar.tsx";
import { Footer } from "../components/components/layout/Footer";
import { SITE_URL } from "../lib/site-config";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument",
  display: "swap",
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-head",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ToolzBanana – Developer & Media Utility Hub",
    template: "%s · ToolzBanana",
  },
  description:
    "Free, fast utilities for developers and creators: JSON formatter, JWT decoder, PDF tools, image utilities, and more in a single interface.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "ToolzBanana",
    locale: "en_US",
    title: "ToolzBanana – Developer & Media Utility Hub",
    description:
      "Free, fast utilities for developers and creators: JSON formatter, JWT decoder, PDF tools, image utilities, and more in a single interface.",
    images: [
      {
        url: "/file.svg",
        alt: "ToolzBanana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolzBanana – Developer & Media Utility Hub",
    description:
      "Free, fast utilities for developers and creators: JSON formatter, JWT decoder, PDF tools, image utilities, and more.",
  },

  // ✅ AdSense Meta (BEST PRACTICE)
  other: {
    "google-adsense-account": "ca-pub-2466646777584490",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ToolzBanana",
    url: SITE_URL,
    logo: `${SITE_URL}/file.svg`,
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* ✅ AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2466646777584490"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Prevent dark mode flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  document.documentElement.classList.remove("dark");
                } catch (e) {}
              })();
            `,
          }}
        />

        {/* Material Icons */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@300;400;500;600;700&display=swap"
        />
      </head>

      <body
        className={`${instrumentSans.variable} ${bricolageGrotesque.variable} bg-background text-foreground antialiased`}
      >
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to main content
        </a>

        <Navbar />

        <div id="content" className="min-h-screen">
          {children}
        </div>

        <Footer />

        {/* ✅ Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}