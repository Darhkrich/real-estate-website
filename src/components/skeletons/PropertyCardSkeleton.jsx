export default function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-full flex flex-col animate-pulse">
      <div className="relative h-64 bg-gray-200" />
      <div className="p-5 flex flex-col flex-grow">
        <div className="h-7 bg-gray-200 rounded w-2/3 mb-2" />
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
          <div className="h-4 bg-gray-200 rounded w-10" />
          <div className="h-4 bg-gray-200 rounded w-10" />
          <div className="h-4 bg-gray-200 rounded w-16" />
        </div>
      </div>
    </div>
  );
}