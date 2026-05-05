'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdType = 'leaderboard' | 'rectangle' | 'wide-skyscraper' | 'large-leaderboard' | 'billboard';

const ADSENSE_CLIENT = 'ca-pub-2466646777584490';
const DEFAULT_SLOT_BY_TYPE: Record<AdType, string | undefined> = {
  leaderboard: process.env.NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD,
  rectangle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE,
  'wide-skyscraper': process.env.NEXT_PUBLIC_ADSENSE_SLOT_WIDE_SKYSCRAPER,
  'large-leaderboard': process.env.NEXT_PUBLIC_ADSENSE_SLOT_LARGE_LEADERBOARD,
  billboard: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BILLBOARD,
};

export function AdBanner({ type = 'leaderboard', className = '' }: { type?: AdType; className?: string }) {
  const dimensions = {
    leaderboard: { width: '728px', height: '90px', label: '728x90' },
    rectangle: { width: '300px', height: '250px', label: '300x250' },
    'wide-skyscraper': { width: '300px', height: '600px', label: '300x600' },
    'large-leaderboard': { width: '970px', height: '250px', label: '970x250' },
    billboard: { width: '970px', height: '250px', label: '970x250' }
  };

  const dim = dimensions[type];
  const adSlot = DEFAULT_SLOT_BY_TYPE[type];

  useEffect(() => {
    if (!adSlot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Avoid crashing if ads are blocked or script is unavailable.
    }
  }, [adSlot, type]);

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <span className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Advertisement</span>
      <div
        className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl relative overflow-hidden shadow-sm"
        style={{
          width: '100%',
          maxWidth: dim.width,
          height: dim.height,
          minHeight: dim.height
        }}
      >
        {adSlot ? (
          <ins
            className="adsbygoogle block"
            style={{ display: 'block', width: '100%', height: '100%' }}
            data-ad-client={ADSENSE_CLIENT}
            data-ad-slot={adSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          <div className="text-center p-4 flex h-full items-center justify-center">
            <div>
              <div className="text-4xl mb-2">📢</div>
              <p className="text-sm font-medium text-gray-600">Ad Space</p>
              <p className="text-xs text-gray-400 mt-1">{dim.label}</p>
              <p className="text-xs text-gray-400">Set NEXT_PUBLIC_ADSENSE_SLOT_* env value</p>
            </div>
          </div>
        )}

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 opacity-50"></div>
      </div>
    </div>
  );
}
