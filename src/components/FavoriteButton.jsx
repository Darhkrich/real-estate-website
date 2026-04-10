'use client';

import { Heart } from 'lucide-react';
import { useFavorites } from '@/components/FavoritesContext';

export default function FavoriteButton({ property, className = '' }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(property.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property);
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full transition-all ${
        favorite
          ? 'bg-red-50 text-red-500 hover:bg-red-100'
          : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-red-500'
      } ${className}`}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart className={`w-5 h-5 ${favorite ? 'fill-current' : ''}`} />
    </button>
  );
}