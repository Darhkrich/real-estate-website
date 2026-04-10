import ImageSliderSkeleton from './ImageSliderSkeleton';

export default function PropertyDetailsSkeleton() {
  return (
    <div className="bg-white min-h-screen animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <ImageSliderSkeleton />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-10 w-3/4 bg-gray-200 rounded" />
            <div className="h-6 w-1/2 bg-gray-200 rounded" />
            <div className="h-10 w-48 bg-gray-200 rounded" />
          </div>
          <div className="flex gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full" />
            <div className="w-12 h-12 bg-gray-200 rounded-full" />
          </div>
        </div>
      </div>
      <div className="border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                <div className="flex-1">
                  <div className="h-4 w-16 bg-gray-200 rounded mb-1" />
                  <div className="h-6 w-12 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}