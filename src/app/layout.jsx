import { Suspense } from 'react';
import { FavoritesProvider } from '@/components/FavoritesContext';
import { GoogleAnalytics, FacebookPixel } from '@/components/Analytics';
import PageViewTracker from '@/components/PageViewTracker';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CurrencyProvider } from '@/context/CurrencyContext';
import './globals.css';



export const metadata = {

  title: {
    default: ' Estate Website | Luxury Real Estate',
    template: '%s |Estate Website',
  },
  description: 'Discover exceptional luxury properties with Prime Estate. Browse curated homes, penthouses, villas, and estates with award-winning agents.',
  keywords: ['luxury real estate', 'homes for sale', 'penthouses', 'villas', 'estates', 'Prime Estate'],
  authors: [{ name: 'DevMasters' }],
  creator: 'DevMasters.tech',
  publisher: 'Prime Estate',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://estatewebsite.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: ' Estate Website | Luxury Real Estate',
    description: 'Discover exceptional luxury properties with Prime Estate. Browse curated homes, penthouses, villas, and estates with award-winning agents.',
    url: '/',
    siteName: 'Prime Estate',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Prime Estate - Luxury Real Estate',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: ' Estate Website| Luxury Real Estate',
    description: 'Discover exceptional luxury properties with Prime Estate.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes if needed
    // google: 'your-google-verification-code',
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
            <PageViewTracker />
            <Suspense fallback={<div className="h-20 bg-white/90" />}>
            
            </Suspense>
            {children}
            
          </FavoritesProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}