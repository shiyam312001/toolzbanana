"use client";

import Link from "next/link";
import { ToolClient } from "../../../components/tool-client";
import { ToolHub } from "../../../components/tool-suite/ToolHub";
import { ToolLayout } from "../../../components/tool-suite/ToolLayout";
import {
  CATEGORY_TO_HUB_KEY,
  TOOL_META,
  TOOL_PAGE_CATEGORIES,
  getHubCategoryFromSegment,
  getOmniShellForSlug,
  isToolHubSegment,
} from "../../../components/tools/tool-meta";
import "./Tools.css";

function Sidebar({ activeSlug }) {
  const entries = Object.entries(TOOL_META);

  return (
    <aside className="bt-sidebar">
      <div className="bt-sidebar-search">
        <div className="bt-search-box">
          <span className="bt-nav-logo-mark text-xs font-bold text-white">
            TQ
          </span>
          <span className="bt-nav-crumb text-[11px]">ToolzBanana · Tools</span>
        </div>
      </div>

      <nav className="bt-sidebar-nav" aria-label="Tool navigation">
        {TOOL_PAGE_CATEGORIES.map((category) => {
          const tools = entries.filter(
            ([, meta]) => meta.category === category,
          );
          if (!tools.length) return null;

          return (
            <div key={category} className="bt-nav-group">
              <div className="bt-nav-group-label">{category}</div>
              {tools.map(([slug, meta]) => (
                <Link
                  key={slug}
                  href={`/tools/${slug}`}
                  className={`bt-nav-link ${
                    slug === activeSlug ? "active" : ""
                  }`}
                  aria-current={slug === activeSlug ? "page" : undefined}
                  aria-label={`Open ${meta.title}`}
                >
                  <span className="bt-nav-icon" aria-hidden>
                    {meta.icon}
                  </span>
                  <span className="bt-nav-link-name">{meta.title}</span>
                </Link>
              ))}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

/** Layout chrome for full-page Omni tools + hub index pages */
function getShellVariant(hubSegment, toolSlug) {
  if (hubSegment === "image" || toolSlug === "image-compressor") return "image";
  if (hubSegment === "pdf" || toolSlug === "merge-pdf") return "pdf";
  return "code";
}

function getSidebarHeader(shellVariant) {
  return shellVariant === "pdf" ? "pdf" : "code";
}

export default function ToolPageClient({ rawSegment }) {
  const raw = typeof rawSegment === "string" ? rawSegment : "";
  const normalized = raw.length ? raw : "json-formatter";

  const hubCategory = isToolHubSegment(normalized)
    ? getHubCategoryFromSegment(normalized)
    : null;

  const slug = hubCategory ? null : normalized;
  const tool = slug && slug in TOOL_META ? TOOL_META[slug] : null;
  const omniShell = slug ? getOmniShellForSlug(slug) : null;

  const activeHubKey = hubCategory
    ? normalized
    : tool
      ? CATEGORY_TO_HUB_KEY[tool.category] ?? null
      : null;

  if (hubCategory) {
    const shell = getShellVariant(normalized, null);
    return (
      <ToolLayout
        variant={shell}
        activeToolSlug={null}
        activeHubKey={activeHubKey}
        sidebarHeader={getSidebarHeader(shell)}
      >
        <ToolHub category={hubCategory} />
      </ToolLayout>
    );
  }

  if (tool && omniShell) {
    const variant =
      omniShell === "image" ? "image" : omniShell === "pdf" ? "pdf" : "code";
    return (
      <ToolLayout
        variant={variant}
        activeToolSlug={slug}
        activeHubKey={activeHubKey}
        sidebarHeader={getSidebarHeader(variant)}
      >
        <ToolClient layout="omni" slug={slug} tool={tool} />
      </ToolLayout>
    );
  }

  if (!tool) {
    return (
      <div className="bt-page">
        <Sidebar activeSlug={slug || null} />
        <main className="bt-content">
          <div className="bt-tool-header">
            <h1 className="bt-tool-title">Tool not available</h1>
            <p className="bt-tool-desc">
              Tool <strong>{String(rawSegment ?? "")}</strong> is not available.
            </p>
          </div>
          <div className="bt-tool-body">
            <div className="bt-info">
              <p>Please choose a tool from the navigation to continue.</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bt-page">
      <Sidebar activeSlug={slug} />
      <main className="bt-content" aria-describedby="tool-description">
        <div className="bt-tool-header">
          <div className="bt-tool-eyebrow">
            <span className="bt-tool-eyebrow-dot" />
            {tool.category}
          </div>
          <h1 className="bt-tool-title">{tool.title}</h1>
          <p id="tool-description" className="bt-tool-desc">
            {tool.description}
          </p>
        </div>
        <div className="bt-tool-body">
          <ToolClient slug={slug} tool={tool} />
        </div>
      </main>
    </div>
  );
}
