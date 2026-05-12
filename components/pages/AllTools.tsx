"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { ToolCard } from '../components/common/ToolCard';
import { CategoriesGrid } from '../components/common/CategoriesGrid';
import { AdBanner } from '../components/common/AdBanner';
import { Input } from '../components/ui/Input';
import { tools, categories } from '../data/tools';

const BROWSE_CATEGORIES = 'browse-categories';

function tabFromSearchParams(searchParams) {
  const category = searchParams?.get("category");
  const view = searchParams?.get("view");
  if (category) return category;
  if (view === "all") return "all";
  return BROWSE_CATEGORIES;
}

export function AllTools() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("search") || "";

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState(() =>
    tabFromSearchParams(searchParams),
  );

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (localSearch.trim()) {
      params.set("search", localSearch.trim());
    } else {
      params.delete("search");
    }
    const next = params.toString();
    const current = searchParams?.toString() ?? "";
    if (next !== current) {
      router.replace(next ? `/tools?${next}` : "/tools");
    }
  }, [localSearch, router, searchParams]);

  useEffect(() => {
    setSelectedCategory(tabFromSearchParams(searchParams));
  }, [searchParams]);

  const filteredCategories = useMemo(() => {
    if (!localSearch.trim()) return categories;
    const q = localSearch.toLowerCase();
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        (c.label && c.label.toLowerCase().includes(q)),
    );
  }, [localSearch]);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory =
        selectedCategory === "all" || tool.category === selectedCategory;
      const matchesSearch =
        localSearch === "" ||
        tool.name.toLowerCase().includes(localSearch.toLowerCase()) ||
        tool.description.toLowerCase().includes(localSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, localSearch]);

  function navigateToTab(tab) {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.delete("category");
    params.delete("view");
    if (tab === BROWSE_CATEGORIES) {
      /* keep search and other params except view/category */
    } else if (tab === "all") {
      params.set("view", "all");
    } else {
      params.set("category", tab);
    }
    const q = params.toString();
    router.replace(q ? `/tools?${q}` : "/tools");
  }

  const chipClass = (active) =>
    `px-4 py-2 rounded-full transition-all ${
      active ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="All Tools"
        description="Browse our complete collection of 60+ free online tools for PDF, images, text, development, calculations, and security."
      />

      <section className="bg-white border-b border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Tools
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Browse our complete collection of {tools.length} free online tools
          </p>

          <div className="max-w-2xl">
            <Input
              type="text"
              placeholder="Search tools..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              icon={Search}
            />
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => navigateToTab(BROWSE_CATEGORIES)}
              className={chipClass(selectedCategory === BROWSE_CATEGORIES)}
            >
              Categories
            </button>
            <button
              type="button"
              onClick={() => navigateToTab("all")}
              className={chipClass(selectedCategory === "all")}
            >
              All Tools
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => navigateToTab(cat.id)}
                className={`flex items-center gap-2 ${chipClass(selectedCategory === cat.id)}`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedCategory === BROWSE_CATEGORIES ? (
        <>
          <CategoriesGrid
            categories={filteredCategories}
            title={localSearch.trim() ? "Matching categories" : "Browse by category"}
            description={
              localSearch.trim()
                ? "Categories that match your search"
                : "Pick a category to see related tools"
            }
          />
          {filteredCategories.length === 0 && (
            <div className="max-w-7xl mx-auto px-4 py-12 text-center text-gray-600">
              No categories match your search.
            </div>
          )}
        </>
      ) : (
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Showing {filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} {...tool} />
              ))}
            </div>

            {filteredTools.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No tools found matching your criteria
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      <div className="px-4 py-8">
        <AdBanner />
      </div>
    </div>
  );
}
