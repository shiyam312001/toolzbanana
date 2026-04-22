import Link from "next/link";

export function ToolCard({ id, name, description, icon: Icon, category, trending, usageCount, isAd }) {
  return (
    <Link
      href={`/tools/${id}`}
      className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-yellow-400 hover:shadow-lg transition-all duration-200 relative overflow-hidden"
    >
      {isAd && (
        <span className="absolute top-2 right-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
          Ad
        </span>
      )}

      {trending && (
        <span className="absolute top-2 right-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded flex items-center gap-1">
          🔥 Trending
        </span>
      )}

      <div className="flex items-start gap-4">
        <div className="p-3 bg-yellow-50 rounded-lg group-hover:bg-yellow-100 transition-colors">
          <Icon className="w-6 h-6 text-yellow-600" />
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-yellow-600 transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 capitalize">
              {category}
            </span>
            {usageCount && (
              <span className="text-xs text-gray-500">
                {usageCount} uses
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <span className="inline-flex items-center text-sm font-medium text-yellow-600 group-hover:gap-2 transition-all">
          Use Tool
          <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
        </span>
      </div>
    </Link>
  );
}
