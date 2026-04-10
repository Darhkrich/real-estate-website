import Link from 'next/link';

import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Static header – no client hooks */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-20 flex items-center px-6">
        <Link href="/" className="text-2xl font-serif font-bold text-gray-900">
          PRIME<span className="text-amber-600">ESTATE</span>.
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-serif font-bold text-amber-500">404</h1>
            <div className="h-1 w-20 bg-amber-500 mx-auto my-6" />
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <Link
              href="/properties"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              <Search className="w-4 h-4 mr-2" />
              Browse Properties
            </Link>
          </div>
        </div>
      </main>

    </div>
  );
}