export default function AgentDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gray-300" />
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="h-8 w-48 bg-gray-300 rounded mx-auto md:mx-0" />
              <div className="h-5 w-64 bg-gray-300 rounded mx-auto md:mx-0" />
              <div className="h-4 w-32 bg-gray-300 rounded mx-auto md:mx-0" />
              <div className="flex justify-center md:justify-start gap-6">
                <div className="h-5 w-20 bg-gray-300 rounded" />
                <div className="h-5 w-24 bg-gray-300 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}