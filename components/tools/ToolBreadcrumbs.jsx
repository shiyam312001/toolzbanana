"use client";

import Link from "next/link";
import { CATEGORY_TO_HUB_KEY } from "../tools/tool-meta";

/**
 * @param {{ category: string; toolTitle: string }} props
 */
export function ToolBreadcrumbs({ category, toolTitle }) {
  const hubKey = CATEGORY_TO_HUB_KEY[category];
  const hubHref = hubKey ? `/tools/${hubKey}` : "/tools";
  const hubLabel = category || "Tools";

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 text-sm text-on-surface-variant font-body"
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="text-primary hover:underline font-medium">
            Home
          </Link>
        </li>
        <li aria-hidden className="text-on-surface-variant/50">
          /
        </li>
        <li>
          <Link href={hubHref} className="text-primary hover:underline font-medium">
            {hubLabel}
          </Link>
        </li>
        <li aria-hidden className="text-on-surface-variant/50">
          /
        </li>
        <li className="text-on-surface font-semibold" aria-current="page">
          {toolTitle}
        </li>
      </ol>
    </nav>
  );
}
