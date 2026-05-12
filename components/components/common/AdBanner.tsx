'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const ADSENSE_CLIENT = 'ca-pub-2466646777584490';
const AD_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD;

/** Fixed IAB leaderboard (728×90) placement — optional AdSense via NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD */
export function AdBanner({ className = '' }: { className?: string }) {
  useEffect(() => {
    if (!AD_SLOT) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ads blocked or script unavailable
    }
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <span className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Advertisement</span>
      <div
        className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl relative overflow-hidden shadow-sm mx-auto"
        style={{
          width: '100%',
          maxWidth: '728px',
          height: '90px',
          minHeight: '90px',
        }}
      >
        {AD_SLOT ? (
          <ins
            className="adsbygoogle block mx-auto"
            style={{ display: 'block', width: '728px', height: '90px', maxWidth: '100%' }}
            data-ad-client={ADSENSE_CLIENT}
            data-ad-slot={AD_SLOT}
            data-ad-format="horizontal"
            data-full-width-responsive="false"
          />
        ) : (
          <div className="text-center flex h-full items-center justify-center px-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Ad Space</p>
              <p className="text-xs text-gray-400 mt-1">728×90</p>
            </div>
          </div>
        )}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 opacity-50" />
      </div>
    </div>
  );
}
