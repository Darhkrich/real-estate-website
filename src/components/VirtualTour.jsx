'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, X, Maximize2, Minimize2, Loader2 } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
export default function VirtualTour({ url, coverImage, propertyTitle = 'Property' }) {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState(false);
  const containerRef = useRef(null);
  const iframeRef = useRef(null);

  if (!url) return null;

  const handleActivate = () => {
    setIsActive(true);
    setIsLoading(true);
    setError(false);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError(true);
  };

  const handleClose = () => {
    setIsActive(false);
    setIsFullscreen(false);
    setError(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Extract provider from URL for better UX
  const getProviderName = (url) => {
    if (url.includes('matterport')) return 'Matterport 3D Tour';
    if (url.includes('kuula')) return 'Kuula Virtual Tour';
    if (url.includes('roundme')) return 'Roundme Tour';
    if (url.includes('youtube') || url.includes('youtu.be')) return 'Video Tour';
    return '3D Virtual Tour';
  };

  const providerName = getProviderName(url);

  return (
    <div className="w-full my-12" ref={containerRef}>
      {/* Header with title and fullscreen toggle (when active) */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-serif font-bold text-gray-900">
          Virtual Tour
          <span className="ml-2 text-sm font-normal text-gray-500 font-sans">
            {providerName}
          </span>
        </h3>
        {isActive && !error && (
          <button
            onClick={toggleFullscreen}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5" />
            ) : (
              <Maximize2 className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {/* Tour Container */}
      <div className="relative w-full h-[500px] md:h-[600px] bg-gray-900 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
        {!isActive ? (
          // Cover State
          <div
            className="relative w-full h-full cursor-pointer group"
            onClick={handleActivate}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleActivate()}
            aria-label={`Launch virtual tour for ${propertyTitle}`}
          >
            {/* Cover Image */}
            <OptimizedImage
              src={coverImage}
              alt={`${propertyTitle} - Virtual Tour Cover`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, , 800px"
            
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

            {/* Center Play Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="bg-white/20 backdrop-blur-md p-5 md:p-6 rounded-full mb-4 border border-white/30 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300 shadow-lg">
                <Play className="w-10 h-10 md:w-12 md:h-12 text-white fill-white drop-shadow-lg" />
              </div>
              <p className="text-white text-base md:text-lg font-medium tracking-widest uppercase drop-shadow-md">
                Launch 3D Tour
              </p>
              <p className="text-white/80 text-sm mt-2 max-w-xs text-center px-4">
                Explore {propertyTitle} in immersive 3D
              </p>
            </div>

            {/* Provider Badge */}
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full border border-white/20">
              {providerName}
            </div>
          </div>
        ) : error ? (
          // Error State
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-red-50 p-4 rounded-full mb-4">
              <X className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-gray-700 font-medium mb-2">
              Unable to load virtual tour
            </p>
            <p className="text-gray-500 text-sm mb-4">
              The tour may be temporarily unavailable.
            </p>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        ) : (
          // Active Tour with Loading and Controls
          <div className="relative w-full h-full">
            {/* Loading Spinner */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
                <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
                <span className="ml-3 text-white">Loading tour...</span>
              </div>
            )}

            {/* Close Button (top-right) */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-colors border border-white/20"
              aria-label="Close virtual tour"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Tour Iframe */}
            <iframe
              ref={iframeRef}
              src={url}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="w-full h-full"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              title={`Virtual tour of ${propertyTitle}`}
            />
          </div>
        )}
      </div>

      {/* Tour Instructions (shown below) */}
      {!isActive && (
        <p className="text-sm text-gray-500 mt-3 text-center">
          Click to explore this property in an immersive 3D experience
        </p>
      )}
    </div>
  );
}