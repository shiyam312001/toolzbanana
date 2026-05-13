"use client";

import Link from "next/link";
import { Home, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/common/SEO';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <SEO title="404 - Page Not Found" description="The page you're looking for doesn't exist." />

      <div className="text-center">
        <div className="text-9xl mb-4">🍌</div>
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="primary">
              <Home className="w-5 h-5" />
              Go Home
            </Button>
          </Link>
          <Link href="/tools">
            <Button variant="secondary">
              <Search className="w-5 h-5" />
              Browse Tools
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
