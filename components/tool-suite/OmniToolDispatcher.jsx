"use client";

import { getOmniShellForSlug } from "../tools/tool-meta";
import { OmniCodeTool } from "./OmniCodeTool";
import { OmniImageTool } from "./OmniImageTool";
import { OmniPdfTool } from "./OmniPdfTool";

/** @param {{ slug: string; tool: { title: string; description: string }; engine: import("../use-tool-client-engine").ToolClientEngine }} props */
export function OmniToolDispatcher({ slug, tool, engine }) {
  const shell = getOmniShellForSlug(slug);
  if (shell === "code") return <OmniCodeTool slug={slug} tool={tool} engine={engine} />;
  if (shell === "image") return <OmniImageTool slug={slug} tool={tool} engine={engine} />;
  if (shell === "pdf") return <OmniPdfTool slug={slug} tool={tool} engine={engine} />;
  return null;
}
