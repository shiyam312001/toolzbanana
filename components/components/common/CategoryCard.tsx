import Link from "next/link";

export function CategoryCard({ name, description, icon: Icon, toolCount, categoryId, id, color }) {
  const slug = categoryId ?? id;
  return (
    <Link
      href={`/tools?category=${slug}`}
      className="group bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-6 hover:border-yellow-400 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex flex-col items-center text-center">
        <div className="p-4 bg-yellow-50 rounded-2xl mb-4 group-hover:scale-110 group-hover:bg-yellow-100 transition-all duration-300">
          <Icon className="w-8 h-8" style={{ color: color || '#FFC107' }} />
        </div>

        <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
          {name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {description}
        </p>

        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {toolCount} tools
        </span>
      </div>
    </Link>
  );
}
