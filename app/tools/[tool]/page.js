import {
  TOOL_META,
  getHubCategoryFromSegment,
  isToolHubSegment,
  resolveToolPageSlug,
} from "../../../components/tools/tool-meta";
import ToolPageClient from "./ToolPageClient";

const SITE_URL = "https://toolzbanana.com";

const HUB_METADATA = {
  "Code & Data": {
    title: "Code & data tools",
    description: "Browse JSON, JWT, Base64, API, regex, SQL, and more developer utilities.",
  },
  Image: {
    title: "Image tools",
    description: "Compress, convert, remove backgrounds, and resize images in your browser.",
  },
  PDF: {
    title: "PDF tools",
    description: "Merge, split, and convert PDF documents locally when possible.",
  },
};

export async function generateMetadata({ params }) {
  const p = await params;
  const rawSlug = typeof p?.tool === "string" ? p.tool : "";
  const normalized = rawSlug || "json-formatter";

  if (isToolHubSegment(normalized)) {
    const cat = getHubCategoryFromSegment(normalized);
    const meta = cat ? HUB_METADATA[cat] : null;
    if (meta) {
      return {
        title: meta.title,
        description: meta.description,
        alternates: {
          canonical: `${SITE_URL}/tools/${normalized}`,
        },
        openGraph: {
          url: `${SITE_URL}/tools/${normalized}`,
        },
        twitter: {
          title: `${meta.title} · ToolzBanana`,
          description: meta.description,
        },
      };
    }
  }

  const slug = resolveToolPageSlug(normalized);
  const knownTool = slug && slug in TOOL_META ? TOOL_META[slug] : null;
  const safeSlug = knownTool ? slug : "json-formatter";

  if (!knownTool) {
    return {
      title: "Tool not available",
      description: "This tool is not available on ToolzBanana.",
      robots: { index: false, follow: false },
      alternates: {
        canonical: `${SITE_URL}/tools/${String(rawSlug ?? "")}`,
      },
      openGraph: {
        url: `${SITE_URL}/tools/${String(rawSlug ?? "")}`,
      },
      twitter: {
        title: "Tool not available · ToolzBanana",
        description: "This tool is not available on ToolzBanana.",
      },
    };
  }

  return {
    title: knownTool.title,
    description: knownTool.description,
    alternates: {
      canonical: `${SITE_URL}/tools/${safeSlug}`,
    },
    openGraph: {
      url: `${SITE_URL}/tools/${safeSlug}`,
    },
    twitter: {
      title: `${knownTool.title} · ToolzBanana`,
      description: knownTool.description,
    },
  };
}

export default async function ToolPage({ params }) {
  const p = await params;
  const raw = typeof p?.tool === "string" ? p.tool : "";
  return <ToolPageClient rawSegment={raw} />;
}
