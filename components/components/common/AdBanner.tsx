'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const ADSENSE_CLIENT = 'ca-pub-2466646777584490';
const AD_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD;

function useIsHomePage() {
  const pathname = usePathname();
  return pathname === '/';
}

/** Leaderboard ad — visible on homepage only; hidden (display:none) on all other routes. */
export function AdBanner({ className = '' }: { className?: string }) {
  const isHome = useIsHomePage();

  useEffect(() => {
    if (!AD_SLOT || !isHome) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ads blocked or script unavailable
    }
  }, [isHome]);

  if (!AD_SLOT) {
    return null;
  }

  return (
    <div
      className={`flex flex-col items-center justify-center ${className}`}
      style={isHome ? undefined : { display: 'none' }}
      aria-hidden={!isHome}
      hidden={!isHome}
    >
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
        <ins
          className="adsbygoogle block mx-auto"
          style={{ display: 'block', width: '728px', height: '90px', maxWidth: '100%' }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={AD_SLOT}
          data-ad-format="horizontal"
          data-full-width-responsive="false"
        />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 opacity-50" />
      </div>
    </div>
  );
}

export function hasAdSenseSlot() {
  return Boolean(AD_SLOT);
}

/** Wraps ad markup; hidden off homepage (display:none, no layout gap). */
export function AdPlacement({
  className = '',
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const isHome = useIsHomePage();

  return (
    <div
      className={className}
      style={
        isHome
          ? undefined
          : { display: 'none', margin: 0, padding: 0, height: 0, overflow: 'hidden' }
      }
      aria-hidden={!isHome}
      hidden={!isHome}
    >
      {children}
    </div>
  );
}
