'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const ADSENSE_CLIENT = 'ca-pub-2466646777584490';
const AD_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD;

/** Minimum reserved height to limit CLS while ads load. */
const AD_MIN_HEIGHT = 250;

type AdBannerProps = {
  className?: string;
  /** When false, reserve space but do not request an ad (tool pages before results). */
  active?: boolean;
  /** Defer ad request until the slot is near the viewport. */
  lazy?: boolean;
};

export function AdBanner({
  className = '',
  active = true,
  lazy = false,
}: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pushedRef = useRef(false);
  const [inView, setInView] = useState(!lazy);

  useEffect(() => {
    if (!lazy || !containerRef.current) return;

    const node = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '240px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [lazy]);

  useEffect(() => {
    if (!AD_SLOT || !active || !inView || pushedRef.current) return;

    pushedRef.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ads blocked or script unavailable
    }
  }, [active, inView]);

  if (!AD_SLOT) {
    return null;
  }

  const shouldRenderUnit = active && inView;

  return (
    <div
      ref={containerRef}
      className={`flex w-full max-w-full flex-col items-center justify-center ${className}`}
      aria-label="Advertisement"
    >
      <span className="mb-2 text-xs uppercase tracking-wide text-gray-400">
        Advertisement
      </span>
      <div
        className="relative mx-auto w-full overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm"
        style={{
          minHeight: AD_MIN_HEIGHT,
          width: '100%',
          maxWidth: '728px',
        }}
      >
        {shouldRenderUnit ? (
          <ins
            className="adsbygoogle block"
            style={{
              display: 'block',
              width: '100%',
              minHeight: AD_MIN_HEIGHT,
            }}
            data-ad-client={ADSENSE_CLIENT}
            data-ad-slot={AD_SLOT}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : null}
        <div className="pointer-events-none absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 opacity-50" />
      </div>
    </div>
  );
}

export function hasAdSenseSlot() {
  return Boolean(AD_SLOT);
}

/**
 * Safe wrapper with spacing from nearby interactive elements (AdSense placement policy).
 */
export function AdPlacement({
  className = '',
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={className}
      style={{
        marginTop: 150,
        marginBottom: 150,
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}
