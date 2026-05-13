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
  applicationName: "ToolzBanana",
  category: "Developer Tools",

  title: {
    default: "ToolzBanana – Free Online Developer & Media Tools",
    template: "%s | ToolzBanana",
  },

  description:
    "ToolzBanana offers free online developer tools, PDF tools, image utilities, JSON formatter, JWT decoder, SEO tools, and productivity utilities for creators and developers.",

  keywords: [
    "developer tools",
    "pdf tools",
    "image tools",
    "json formatter",
    "jwt decoder",
    "seo tools",
    "online utilities",
    "toolzbanana",
  ],

  authors: [
    {
      name: "ToolzBanana",
      url: SITE_URL,
    },
  ],

  creator: "ToolzBanana",
  publisher: "ToolzBanana",

  alternates: {
    canonical: SITE_URL,
  },

  verification: {
    google: "google5263b811992ed9ce",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "ToolzBanana",
    locale: "en_US",
    title: "ToolzBanana – Free Online Developer & Media Tools",
    description:
      "Free online tools for developers and creators including JSON formatter, JWT decoder, PDF tools, image tools, and SEO utilities.",

    images: [
      {
        url: "/file.svg",
        width: 1200,
        height: 630,
        alt: "ToolzBanana",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@toolzbanana",
    creator: "@toolzbanana",
    title: "ToolzBanana – Free Online Developer & Media Tools",
    description:
      "Free online tools for developers and creators including JSON formatter, JWT decoder, PDF tools, image tools, and SEO utilities.",
    images: ["/file.svg"],
  },

  other: {
    "google-adsense-account": "ca-pub-2466646777584490",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ToolzBanana",
    url: SITE_URL,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: "ToolzBanana",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/file.svg`,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/tools?search={search_term_string}&view=all`,
      "query-input": "required name=search_term_string",
    },
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ToolzBanana",
    url: SITE_URL,
    logo: `${SITE_URL}/file.svg`,
    sameAs: [SITE_URL],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2466646777584490"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MDP4MC0YV1"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MDP4MC0YV1');
          `}
        </Script>

        {/* Prevent dark flash */}
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

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
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

        <main id="content" className="min-h-screen">
          {children}
        </main>

        <Footer />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
      </body>
    </html>
  );
}