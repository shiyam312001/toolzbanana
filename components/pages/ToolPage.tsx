import { useParams, Link, Navigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { AdBanner } from '../components/common/AdBanner';
import { tools } from '../data/tools';
import { useRecentTools } from '../hooks/useRecentTools';
import { useEffect } from 'react';
import { ToolClient } from '../tools-components/tool-client';

export function ToolPage() {
  const { toolId } = useParams();
  const { addRecentTool } = useRecentTools();

  const tool = tools.find((t) => t.id === toolId);

  useEffect(() => {
    if (tool) {
      addRecentTool(tool.id);
    }
  }, [tool, addRecentTool]);

  if (!tool) {
    return <Navigate to="/tools" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title={tool.name} description={tool.description} />

      <section className="bg-white border-b border-gray-200 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 text-yellow-600 hover:gap-3 transition-all mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Tools
          </Link>

          <div className="flex items-start gap-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                {tool.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {tool.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <ToolClient
            slug={tool.id}
            tool={{ title: tool.name, description: tool.description }}
          />
          <div className="mt-8">
            <AdBanner type="rectangle" />
          </div>
        </div>
      </section>
    </div>
  );
}
