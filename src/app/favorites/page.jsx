'use client';

import Link from 'next/link';
import { useFavorites } from '@/components/FavoritesContext';
import OptimizedImage from '@/components/OptimizedImage';
import FavoriteButton from '@/components/FavoriteButton';
import { MapPin, Bed, Bath, Maximize, Heart } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function FavoritesPage() {
  const { favorites, isLoaded } = useFavorites();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 pt-24 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Saved Properties</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">Your collection of favorite properties.</p>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
        {favorites.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No saved properties</h2>
            <p className="text-gray-600 mb-6">Start exploring and save properties you love.</p>
            <Link href="/properties" className="inline-flex items-center px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600">
              Browse Properties
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-6">{favorites.length} saved</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((property) => {
                const img = property.images?.find((i) => i.isPrimary)?.url || property.images?.[0]?.url;
                return (
                  <Link href={`/properties/${property.slug || property.id}`} key={property.id} className="group">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border h-full flex flex-col">
                      <div className="relative h-64 overflow-hidden">
                        <OptimizedImage src={img} alt={property.title} fill sizes="(max-width:768px)100vw,400px" />
                        <div className="absolute top-3 right-3 z-10"><FavoriteButton property={property} /></div>
                      </div>
                      <div className="p-5">
                        <div className="text-2xl font-bold">{property.formattedPrice || `$${property.price?.toLocaleString()}`}</div>
                        <h3 className="text-lg font-medium group-hover:text-amber-600">{property.title}</h3>
                        <div className="flex items-center text-gray-600 text-sm mt-1"><MapPin className="w-4 h-4 mr-1" />{property.location?.city}</div>
                        <div className="flex items-center justify-between border-t pt-4 mt-4 text-sm text-gray-600">
                          <span><Bed className="w-4 h-4 inline mr-1" />{property.beds}</span>
                          <span><Bath className="w-4 h-4 inline mr-1" />{property.baths}</span>
                          <span><Maximize className="w-4 h-4 inline mr-1" />{property.sqft?.toLocaleString()} sqft</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </main>
    </>
  );
}