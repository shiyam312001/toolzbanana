import { Code2, ImageIcon, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { TOOL_CATEGORIES } from "./tools-data";

const iconById = {
  developer: Code2,
  image: ImageIcon,
  pdf: FileText,
};

export function Sidebar() {
  return (
    <aside className="hidden h-screen border-r border-slate-200/80 bg-slate-50/80 px-4 py-4 lg:sticky lg:top-0 lg:flex lg:w-64 lg:flex-col lg:gap-4">
      <div className="flex items-center justify-between">
        <span className="badge-pill bg-slate-900/90 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-100 shadow">
          Tools
        </span>
        <button
          className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-500 shadow-sm hover:bg-slate-100"
          aria-label="Collapse sidebar"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="ads-slot h-20 text-[10px]">
        Google Ads – Sidebar
      </div>

      <nav className="mt-2 flex-1 space-y-6 overflow-y-auto pb-6 pr-1">
        {TOOL_CATEGORIES.map((category) => {
          const Icon = iconById[category.id] ?? Code2;
          return (
            <div key={category.id} className="space-y-2">
              <div className="flex items-center gap-2 px-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                <span className="h-[1px] flex-1 bg-slate-200" />
                <span>{category.label}</span>
                <span className="h-[1px] flex-1 bg-slate-200" />
              </div>
              <div className="space-y-1">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="sidebar-link"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm shadow-slate-300">
                      <Icon className="h-3.5 w-3.5 text-indigo-500" />
                    </span>
                    <span>{tool.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      <button className="mt-auto hidden items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-700 shadow-sm hover:border-indigo-200 hover:bg-indigo-50/80 lg:flex">
        <ChevronRight className="h-3 w-3" />
        <span>Collapse sidebar</span>
      </button>
    </aside>
  );
}


