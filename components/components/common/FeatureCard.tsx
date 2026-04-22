export function FeatureCard({ icon: Icon, title, description, color = '#FFC107' }) {
  return (
    <div className="text-center space-y-3 p-6 rounded-2xl hover:bg-gray-50 transition-colors">
      <div
        className="inline-flex items-center justify-center w-12 h-12 rounded-xl"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <h3 className="font-semibold text-gray-900">
        {title}
      </h3>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
}
