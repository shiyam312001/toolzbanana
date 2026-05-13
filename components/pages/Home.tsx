"use client";

import Link from "next/link";
import { ArrowRight, Clock } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { HeroSection } from '../components/common/HeroSection';
import { FeaturesSection } from '../components/common/FeaturesSection';
import { CategoriesGrid } from '../components/common/CategoriesGrid';
import { HowItWorksSection } from '../components/common/HowItWorksSection';
import { AdBanner } from '../components/common/AdBanner';
import { ToolCard } from '../components/common/ToolCard';
import { categories, popularTools, tools } from '../data/tools';
import { useRecentTools } from '../hooks/useRecentTools';

export function Home() {
  const { recentTools } = useRecentTools();

  const recentToolsData = recentTools
    .map((rt) => tools.find((t) => t.id === rt.id))
    .filter(Boolean);

  return (
    <div className="min-h-screen">
      <SEO
        title="Home"
        description="60+ free online tools for PDF, Image, Text, Developer tools, Calculators, and Security. Compress, convert, calculate & simplify your daily tasks."
      />

      <HeroSection categories={categories} />

      <FeaturesSection />

      <section className="py-16 px-4 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Free tools with real explanations
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            ToolzBanana pairs interactive utilities with long-form guidance on every
            tool route. That editorial layer explains typical workflows, privacy
            expectations, and common mistakes—so pages stay useful even if you are
            only reading, not clicking run yet.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Developer utilities such as JSON formatting, JWT inspection, Base64
            helpers, and regex testing are designed for quick feedback loops while
            you debug APIs. Media utilities cover compression, conversion, resizing,
            and PDF merge/split flows you can often complete without installing
            another desktop suite.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            We also publish standalone{" "}
            <Link href="/blog" className="text-yellow-700 font-semibold hover:underline">
              articles and guides
            </Link>{" "}
            on browser-based processing, responsible use of tokens, and building
            reliable PDF and image pipelines.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-yellow-400 transition-colors"
            >
              Browse all tools
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 hover:border-yellow-400 transition-colors"
            >
              About ToolzBanana
            </Link>
          </div>
        </div>
      </section>

      <CategoriesGrid
        categories={categories}
        title="Explore by Category"
        description="Choose from our wide range of tool categories"
      />

      {recentToolsData.length > 0 && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Recently Used Tools
                </h2>
                <p className="text-gray-600">
                  Quick access to your recent tools
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentToolsData.map((tool) => (
                <ToolCard key={tool.id} {...tool} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                🔥 Popular Tools
              </h2>
              <p className="text-lg text-gray-600">
                Most used tools by our community
              </p>
            </div>
            <Link
              href="/tools"
              className="hidden md:inline-flex items-center gap-2 text-yellow-600 hover:gap-3 transition-all"
            >
              View all Tools
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.slice(0, 6).map((tool) => (
              <ToolCard key={tool.id} {...tool} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-yellow-600"
            >
              View All Tools
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <HowItWorksSection />

      <div className="px-4 py-8">
        <AdBanner />
      </div>
    </div>
  );
}
