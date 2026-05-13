"use client";

import { SEO } from '../components/common/SEO';
import { Card } from '../components/ui/Card';
import { Zap, Shield, Heart, Users } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="About Us"
        description="Learn more about ToolzBanana - your free online tools platform"
      />

      <section className="bg-white border-b border-gray-200 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About ToolzBanana
          </h1>
          <p className="text-xl text-gray-600">
            Making online tools accessible to everyone, completely free
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              ToolzBanana is a curated collection of free browser-based utilities for
              developers, designers, and operations teams who need dependable results
              without installing yet another desktop application. We focus on JSON,
              JWT, encoding, PDF, and image workflows that come up every week in real
              tickets—not novelty generators with empty pages.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Our mission is to pair fast tools with honest documentation. That is
              why every tool route ships with a long editorial article that explains
              how to use the feature safely, what stays local in your browser, and
              which mistakes we see most often in support mail. Thin landing pages
              are not part of the plan: readers should leave with context, not just a
              download button.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed mb-12">
              ToolzBanana is supported in part by display advertising on pages that
              include substantial publisher-written content, in line with programme
              policies. We avoid placing ads on sparse or purely navigational screens
              so the experience stays focused when you are trying to recover from a
              broken link or find the right utility quickly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card hover>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <Zap className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Fast & Efficient
                  </h3>
                  <p className="text-gray-600">
                    All tools are optimized for speed and performance
                  </p>
                </div>
              </div>
            </Card>

            <Card hover>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <Shield className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Privacy First
                  </h3>
                  <p className="text-gray-600">
                    Your files are processed locally and never stored
                  </p>
                </div>
              </div>
            </Card>

            <Card hover>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <Heart className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Always Free
                  </h3>
                  <p className="text-gray-600">
                    No subscriptions, no hidden costs, free forever
                  </p>
                </div>
              </div>
            </Card>

            <Card hover>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <Users className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Community Driven
                  </h3>
                  <p className="text-gray-600">
                    Built based on user feedback and needs
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
