'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

// ----------------------------------------------------------------------
// Google Analytics Page View Tracker (Client Component with Suspense)
// ----------------------------------------------------------------------
function GoogleAnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (GA_MEASUREMENT_ID && typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname + searchParams.toString(),
      });
    }
  }, [pathname, searchParams]);

  return null; // This component doesn't render anything
}

// ----------------------------------------------------------------------
// Facebook Pixel Page View Tracker
// ----------------------------------------------------------------------
function FacebookPixelTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (FB_PIXEL_ID && typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }
  }, [pathname]);

  return null;
}

// ----------------------------------------------------------------------
// Suspense Wrappers for Safe Usage in Layouts
// ----------------------------------------------------------------------
export function GoogleAnalyticsPageView() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsTracker />
    </Suspense>
  );
}

export function FacebookPixelPageView() {
  // Facebook tracker doesn't use searchParams, so Suspense is optional
  // but we include it for consistency and safety.
  return (
    <Suspense fallback={null}>
      <FacebookPixelTracker />
    </Suspense>
  );
}

// ----------------------------------------------------------------------
// Combined Page View Tracker (use this in your layout)
// ----------------------------------------------------------------------
export function AnalyticsPageView() {
  return (
    <>
      <GoogleAnalyticsPageView />
      <FacebookPixelPageView />
    </>
  );
}

// ----------------------------------------------------------------------
// Legacy Hook Exports (optional, but recommend using components above)
// ----------------------------------------------------------------------
export function usePageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (GA_MEASUREMENT_ID && typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname + searchParams.toString(),
      });
    }
  }, [pathname, searchParams]);
}

export function useFbPageView() {
  const pathname = usePathname();

  useEffect(() => {
    if (FB_PIXEL_ID && typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }
  }, [pathname]);
}

// ----------------------------------------------------------------------
// Analytics Script Components (unchanged, but included for completeness)
// ----------------------------------------------------------------------
export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

export function FacebookPixel() {
  if (!FB_PIXEL_ID) return null;

  return (
    <Script
      id="facebook-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${FB_PIXEL_ID}');
          fbq('track', 'PageView');
        `,
      }}
    />
  );
}