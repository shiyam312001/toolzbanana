import Link from "next/link";
import { Code2, ImageIcon, FileText } from "lucide-react";
import { TOOL_CATEGORIES } from "../tools-data";

const iconById = {
  developer: Code2,
  image: ImageIcon,
  pdf: FileText,
};

export function Sidebar() {
  return (
    <aside className="hidden border-r border-black/5 bg-white/70 px-4 py-6 backdrop-blur lg:sticky lg:top-16 lg:flex lg:h-[calc(100vh-64px)] lg:w-[260px] lg:flex-col">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-slate-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
          Tools
        </span>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto pr-1">
        {TOOL_CATEGORIES.map((category) => {
          const Icon = iconById[category.id] ?? Code2;
          return (
            <div key={category.id} className="space-y-2">
              <div className="flex items-center gap-2 px-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                <span className="h-px flex-1 bg-slate-200" />
                <span>{category.label}</span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>
              <div className="space-y-1">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="flex items-center gap-3 rounded-full px-3 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
                      <Icon className="h-4 w-4 text-slate-700" />
                    </span>
                    <span className="truncate">{tool.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

