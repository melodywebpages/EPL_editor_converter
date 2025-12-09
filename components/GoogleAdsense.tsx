'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function GoogleAdsense() {
  // Use the client ID provided by Google AdSense
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-9735530948817519';

  useEffect(() => {
    // Push ads after component mount
    if (adsenseClientId) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, [adsenseClientId]);

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

