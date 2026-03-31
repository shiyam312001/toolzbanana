import "./globals.css";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { Navbar } from "../components/site/navbar";

const SITE_URL = "https://toolzbanana.com";

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
  },
  twitter: {
    card: "summary",
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
        {/* Material Symbols for all omni tool icons */}
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
