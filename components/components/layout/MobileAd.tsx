import { useState } from 'react';
import { X } from 'lucide-react';

export function MobileAd() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
      <div className="relative p-2">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-1 right-1 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Close ad"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
          <div className="text-center">
            <div className="text-2xl mb-1">📱</div>
            <p className="text-xs font-medium text-gray-600">Mobile Ad Space</p>
            <p className="text-xs text-gray-400">320x50</p>
          </div>
        </div>
      </div>
    </div>
  );
}
