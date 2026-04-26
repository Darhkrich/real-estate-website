import { Suspense } from 'react';
import { FavoritesProvider } from '@/components/FavoritesContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { GoogleAnalytics, FacebookPixel } from '@/components/Analytics';
import PageViewTracker from '@/components/PageViewTracker';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata = {
  title: {
    default: 'Estate Website | Luxury Real Estate',
    template: '%s | Prime Estate',
  },
  description:
    'Discover exceptional luxury properties with Prime Estate. Browse curated homes, penthouses, villas, and estates with award-winning agents.',
  keywords: ['luxury real estate', 'homes for sale', 'penthouses', 'villas', 'estates'],
  authors: [{ name: 'DevMasters' }],
  creator: 'DevMasters.tech',
  publisher: 'Prime Estate',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://estatewebsite.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Prime Estate | Luxury Real Estate',
    description: 'Discover exceptional luxury properties with Prime Estate.',
    url: '/',
    siteName: 'Prime Estate',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Prime Estate' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prime Estate | Luxury Real Estate',
    description: 'Discover exceptional luxury properties with Prime Estate.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />
        <FacebookPixel />
        <CurrencyProvider>
          <FavoritesProvider>
            <Suspense fallback={null}>
              <PageViewTracker />
            </Suspense>
            {/* Wrap Navbar in Suspense to handle any client hooks */}
            <Suspense fallback={<div className="h-20 bg-white/90" />}>
              <Navbar />
            </Suspense>
            {children}
            <Footer />
          </FavoritesProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}