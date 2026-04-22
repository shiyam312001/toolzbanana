"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { ToolCard } from '../components/common/ToolCard';
import { AdBanner } from '../components/common/AdBanner';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { tools, categories } from '../data/tools';

export function AllTools() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams?.get("category");
  const searchQuery = searchParams?.get("search") || "";

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || 'all');

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setSelectedCategory(categoryFilter || "all");
  }, [categoryFilter]);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      const matchesSearch =
        localSearch === '' ||
        tool.name.toLowerCase().includes(localSearch.toLowerCase()) ||
        tool.description.toLowerCase().includes(localSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, localSearch]);

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
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === 'all'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Tools
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              Showing {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''}
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

      <div className="px-4 py-8">
        <AdBanner type="leaderboard" />
      </div>
    </div>
  );
}
