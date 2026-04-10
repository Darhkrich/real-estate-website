import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyGridSkeleton from '@/components/skeletons/PropertyGridSkeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
        <PropertyGridSkeleton />
      </main>
      <Footer />
    </div>
  );
}