export function AdBanner({ type = 'leaderboard', className = '' }) {
  const dimensions = {
    leaderboard: { width: '728px', height: '90px', label: '728x90' },
    rectangle: { width: '300px', height: '250px', label: '300x250' },
    'wide-skyscraper': { width: '300px', height: '600px', label: '300x600' },
    'large-leaderboard': { width: '970px', height: '250px', label: '970x250' },
    billboard: { width: '970px', height: '250px', label: '970x250' }
  };

  const dim = dimensions[type];

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <span className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Advertisement</span>
      <div
        className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl flex items-center justify-center relative overflow-hidden shadow-sm"
        style={{
          width: '100%',
          maxWidth: dim.width,
          height: dim.height,
          minHeight: dim.height
        }}
      >
        <div className="text-center p-4">
          <div className="text-4xl mb-2">📢</div>
          <p className="text-sm font-medium text-gray-600">Ad Space</p>
          <p className="text-xs text-gray-400 mt-1">{dim.label}</p>
          <p className="text-xs text-gray-400">Google AdSense</p>
        </div>

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 opacity-50"></div>
      </div>
    </div>
  );
}
