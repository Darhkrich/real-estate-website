'use client';

import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Thumbs, Keyboard } from 'swiper/modules';
import OptimizedImage from '@/components/OptimizedImage';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

export default function ImageSlider({
  images = [],
  propertyTitle = 'Property',
  showThumbs = true,
  loop = true,
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenRef = useRef(null);
  const fullscreenSwiperRef = useRef(null);

  const normalizedImages = images.map((img) => {
    if (typeof img === 'string') {
      return { url: img, alt: `${propertyTitle} - Image`, isPrimary: false };
    }
    return {
      url: img.url,
      alt: img.alt || `${propertyTitle} - Image`,
      isPrimary: img.isPrimary || false,
    };
  });

  if (!normalizedImages.length) {
    return (
      <div className="relative w-full h-[50vh] md:h-[70vh] bg-gray-200 rounded-2xl overflow-hidden flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  const totalImages = normalizedImages.length;
  const showNavigation = totalImages > 1;

  const openFullscreen = () => setIsFullscreen(true);
  const closeFullscreen = () => setIsFullscreen(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) closeFullscreen();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isFullscreen]);

  return (
    <>
      <div className="relative w-full group">
        <div className="relative w-full h-[50vh] md:h-[70vh] bg-gray-100 rounded-2xl overflow-hidden shadow-2xl">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, Thumbs, Keyboard]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={showNavigation}
            pagination={showNavigation ? { clickable: true, dynamicBullets: true } : false}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
            loop={loop && showNavigation}
            thumbs={{ swiper: thumbsSwiper }}
            keyboard={{ enabled: true }}
            onSwiper={setMainSwiper}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="h-full w-full"
          >
            {normalizedImages.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative w-full h-full">
                  <OptimizedImage
                    src={img.url}
                    alt={img.alt}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {showNavigation && (
            <div className="absolute bottom-4 right-4 z-10 bg-black/50 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full border border-white/20">
              {activeIndex + 1} / {totalImages}
            </div>
          )}

          <button
            onClick={openFullscreen}
            className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 border border-white/20"
            aria-label="View fullscreen"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>

        {showThumbs && showNavigation && (
          <div className="mt-4 px-1">
            <Swiper
              modules={[Thumbs, Navigation]}
              watchSlidesProgress
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              breakpoints={{
                640: { slidesPerView: 5 },
                768: { slidesPerView: 6 },
                1024: { slidesPerView: 8 },
              }}
              navigation
              className="thumbs-swiper"
            >
              {normalizedImages.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer border-2 border-transparent transition-all hover:border-amber-400 [&.swiper-slide-thumb-active]:border-amber-500">
                    <OptimizedImage
                      src={img.url}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="100px"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>

      {isFullscreen && (
        <div
          ref={fullscreenRef}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeFullscreen}
        >
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 z-20 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative w-full h-full max-w-7xl mx-auto flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Swiper
              modules={[Navigation, Pagination, Keyboard]}
              spaceBetween={0}
              slidesPerView={1}
              navigation={{
                prevEl: '.fullscreen-prev',
                nextEl: '.fullscreen-next',
              }}
              pagination={{ clickable: true, dynamicBullets: true }}
              keyboard={{ enabled: true }}
              loop={loop && showNavigation}
              initialSlide={activeIndex}
              onSwiper={(swiper) => { fullscreenSwiperRef.current = swiper; }}
              className="h-full w-full"
            >
              {normalizedImages.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex items-center justify-center w-full h-full p-4 md:p-8">
                    <OptimizedImage
                      src={img.url}
                      alt={img.alt}
                      width={1200}
                      height={800}
                      className="max-w-full max-h-full object-contain"
                      sizes="(max-width: 768px) 100vw, 1200px"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {showNavigation && (
              <>
                <button
                  className="fullscreen-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-3 rounded-full transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  className="fullscreen-next absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-3 rounded-full transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}