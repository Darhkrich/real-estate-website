export default function ImageSliderSkeleton() {
  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] bg-gray-200 rounded-2xl overflow-hidden animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      <div className="absolute bottom-4 right-4 h-8 w-16 bg-gray-300 rounded-full" />
    </div>
  );
}