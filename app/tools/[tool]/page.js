import {
  TOOL_META,
  getHubCategoryFromSegment,
  isToolHubSegment,
  resolveToolPageSlug,
} from "../../../components/tools/tool-meta";
import { getToolEditorialSummary } from "../../../components/tools/tool-editorial";
import ToolPageClient from "./ToolPageClient";
import { SITE_URL } from "../../../lib/site-config";

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
      const url = `${SITE_URL}/tools/${normalized}`;
      return {
        title: meta.title,
        description: meta.description,
        alternates: {
          canonical: url,
        },
        openGraph: {
          title: `${meta.title} · ToolzBanana`,
          description: meta.description,
          url,
          type: "website",
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
        canonical: `${SITE_URL}/tools`,
      },
      openGraph: {
        title: "Tool not available · ToolzBanana",
        description: "This tool is not available on ToolzBanana.",
        url: `${SITE_URL}/tools`,
      },
      twitter: {
        title: "Tool not available · ToolzBanana",
        description: "This tool is not available on ToolzBanana.",
      },
    };
  }

  const summary = getToolEditorialSummary(safeSlug);
  const description = summary
    ? `${knownTool.description} ${summary}`.replace(/\s+/g, " ").trim().slice(0, 320)
    : knownTool.description;
  const canonical = `${SITE_URL}/tools/${safeSlug}`;

  return {
    title: knownTool.title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${knownTool.title} · ToolzBanana`,
      description,
      url: canonical,
      type: "website",
    },
    twitter: {
      title: `${knownTool.title} · ToolzBanana`,
      description,
    },
  };
}

export default async function ToolPage({ params }) {
  const p = await params;
  const raw = typeof p?.tool === "string" ? p.tool : "";
  return <ToolPageClient rawSegment={raw} />;
}
