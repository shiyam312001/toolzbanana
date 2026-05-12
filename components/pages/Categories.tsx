"use client";

import { SEO } from '../components/common/SEO';
import { CategoriesGrid } from '../components/common/CategoriesGrid';
import { AdBanner } from '../components/common/AdBanner';
import { categories } from '../data/tools';

export function Categories() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Categories"
        description="Browse our tool categories: PDF, Image, Text, Developer, Calculator, and Security tools."
      />

      <section className="bg-white border-b border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tool Categories
          </h1>
          <p className="text-lg text-gray-600">
            Explore our tools organized by category
          </p>
        </div>
      </section>

      <CategoriesGrid categories={categories} />

      <div className="px-4 py-8">
        <AdBanner />
      </div>
    </div>
  );
}
