'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ImageOff } from 'lucide-react';

const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'800\' height=\'600\' viewBox=\'0 0 800 600\'%3E%3Crect width=\'800\' height=\'600\' fill=\'%23f3f4f6\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'sans-serif\' font-size=\'20\' fill=\'%239ca3af\'%3ENo Image%3C/text%3E%3C/svg%3E';

export default function OptimizedImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  objectFit = 'cover',
  fallbackSrc = PLACEHOLDER_IMAGE,
  showFallbackIcon = false,
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // If src is empty or undefined, use fallback immediately
  if (!src || src === '') {
    return (
      <div className={`relative ${fill ? 'w-full h-full' : ''} ${className} bg-gray-100 flex items-center justify-center`}>
        <ImageOff className="w-8 h-8 text-gray-400" />
      </div>
    );
  }

  const imageProps = fill
    ? { fill: true, sizes }
    : { width: width || 800, height: height || 600 };

  return (
    <div className={`relative ${fill ? 'w-full h-full' : ''} ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}
      <Image
        src={imgSrc}
        alt={alt}
        {...imageProps}
        priority={priority}
        className={`${objectFit === 'cover' ? 'object-cover' : 'object-contain'} ${
          fill ? 'w-full h-full' : ''
        } transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onError={handleError}
        onLoad={handleLoad}
        unoptimized={imgSrc === fallbackSrc} // Skip optimization for fallback
        {...props}
      />
      {hasError && showFallbackIcon && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <ImageOff className="w-8 h-8 text-gray-400" />
        </div>
      )}
    </div>
  );
}