"use client";

import { getOmniShellForSlug } from "../tools/tool-meta";
import { ToolEditorialSection } from "../tools/ToolEditorialSection";
import { OmniCodeTool } from "./OmniCodeTool";
import { OmniImageTool } from "./OmniImageTool";
import { OmniPdfTool } from "./OmniPdfTool";

/** @param {{ slug: string; tool: { title: string; description: string }; engine: import("../use-tool-client-engine").ToolClientEngine }} props */
export function OmniToolDispatcher({ slug, tool, engine }) {
  const shell = getOmniShellForSlug(slug);
  const inner =
    shell === "code" ? (
      <OmniCodeTool slug={slug} tool={tool} engine={engine} />
    ) : shell === "image" ? (
      <OmniImageTool slug={slug} tool={tool} engine={engine} />
    ) : shell === "pdf" ? (
      <OmniPdfTool slug={slug} tool={tool} engine={engine} />
    ) : null;
  if (!inner) return null;
  return (
    <>
      {inner}
      <ToolEditorialSection slug={slug} variant="omni" />
    </>
  );
}
