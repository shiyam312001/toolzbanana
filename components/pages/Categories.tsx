"use client";

import { SEO } from '../components/common/SEO';
import { AdBanner, AdPlacement } from '../components/common/AdBanner';
import { CategoriesGrid } from '../components/common/CategoriesGrid';
import { categories } from '../data/tools';

export function Categories() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Categories"
        description="Browse ToolzBanana categories: developer utilities, image tools, and PDF workflows—each with in-depth guides."
      />

      <section className="bg-white border-b border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tool Categories
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Explore our tools organized by category
          </p>
          <p className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            ToolzBanana groups {categories.length} core categories—developer data,
            image processing, and PDF document workflows—so you can move from one
            related task to the next without hunting through unrelated utilities.
            Every category links to dedicated tool pages with long-form guidance
            beneath the interactive workspace.
          </p>
        </div>
      </section>

      <CategoriesGrid categories={categories} />

      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-gray-700 leading-relaxed space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Why categories matter</h2>
          <p>
            Grouping utilities by intent—developer data, images, and PDFs—helps you
            discover adjacent tools you might not have searched for directly. For
            example, someone compressing images for a website often also needs
            format conversion or exact resizing before upload.
          </p>
          <p>
            When you open a category card you will see a short description of the
            workflows we support. From there, the tools directory lets you filter
            further or jump straight into a dedicated page with long-form guidance
            and the interactive UI.
          </p>
        </div>
      </section>

      <AdPlacement>
        <AdBanner lazy />
      </AdPlacement>
    </div>
  );
}
