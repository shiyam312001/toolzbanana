import { ToolCard } from './ToolCard';

export function ToolsGrid({ tools = [], title, description }) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {(title || description) && (
          <div className="mb-12">
            {title && (
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-gray-600">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.id} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
