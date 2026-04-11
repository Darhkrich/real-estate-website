
import PropertyGridSkeleton from '@/components/skeletons/PropertyGridSkeleton';
export const dynamic = 'force-dynamic';
export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
        <PropertyGridSkeleton />
      </main>
    
    </div>
  );
}