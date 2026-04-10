'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FavoriteButton from '@/components/FavoriteButton';
import OptimizedImage from './OptimizedImage';
import { useCurrency } from '@/context/CurrencyContext';
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  SlidersHorizontal,
  ChevronDown,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const ITEMS_PER_PAGE = 9;

const statusConfig = {
  buy: { label: 'For Sale', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  rent: { label: 'For Rent', color: 'bg-green-100 text-green-800 border-green-200' },
  new: { label: 'New Development', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  sold: { label: 'Sold', color: 'bg-red-100 text-red-800 border-red-200' },
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
};

export default function PropertiesContent({ initialProperties, searchParams }) {
  const router = useRouter();
  const [sortBy, setSortBy] = useState(searchParams.sort || 'newest');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({
    min: searchParams.minPrice || '',
    max: searchParams.maxPrice || '',
  });
  const [bedsFilter, setBedsFilter] = useState(searchParams.beds || 'any');
  const [bathsFilter, setBathsFilter] = useState(searchParams.baths || 'any');
  const [currentPage, setCurrentPage] = useState(Number(searchParams.page) || 1);

  // Always call useCurrency unconditionally
  const { formatPrice } = useCurrency();

  const getPriceWithPeriod = (prop) => {
    const base = formatPrice(prop.price);
    return prop.status === 'rent' ? `${base}/mo` : base;
  };

  const filteredProperties = useMemo(() => {
    let filtered = initialProperties;

    if (priceRange.min) {
      filtered = filtered.filter((p) => p.price >= Number(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter((p) => p.price <= Number(priceRange.max));
    }
    if (bedsFilter !== 'any') {
      filtered = filtered.filter((p) => p.beds >= parseInt(bedsFilter));
    }
    if (bathsFilter !== 'any') {
      filtered = filtered.filter((p) => p.baths >= parseFloat(bathsFilter));
    }

    switch (sortBy) {
      case 'price-asc':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'newest':
        return [...filtered].sort(
          (a, b) => new Date(b.listingDate || 0) - new Date(a.listingDate || 0)
        );
      case 'oldest':
        return [...filtered].sort(
          (a, b) => new Date(a.listingDate || 0) - new Date(b.listingDate || 0)
        );
      default:
        return filtered;
    }
  }, [initialProperties, priceRange, bedsFilter, bathsFilter, sortBy]);

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const updateUrlParams = (updates) => {
    const params = new URLSearchParams(window.location.search);
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== 'any') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`/properties?${params.toString()}`, { scroll: false });
  };

  const handleApplyFilters = () => {
    updateUrlParams({
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      beds: bedsFilter,
      baths: bathsFilter,
      sort: sortBy,
    });
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setPriceRange({ min: '', max: '' });
    setBedsFilter('any');
    setBathsFilter('any');
    setSortBy('newest');
    router.push('/properties');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const params = new URLSearchParams(window.location.search);
    params.set('page', page);
    router.push(`/properties?${params.toString()}`, { scroll: false });
  };

  const getPrimaryImage = (prop) => {
    if (!prop.images?.length) return '/placeholder.jpg';
    const primary = prop.images.find((img) => img.isPrimary);
    return primary?.url || prop.images[0]?.url || prop.images[0];
  };

  return (
    <>
      {/* Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{filteredProperties.length}</span> properties
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                updateUrlParams({ sort: e.target.value });
              }}
              className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="price-desc">Price: High-Low</option>
              <option value="price-asc">Price: Low-High</option>
            </select>

            <div className="hidden md:flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-amber-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-amber-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Price Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange((p) => ({ ...p, min: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange((p) => ({ ...p, max: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Beds</label>
              <select
                value={bedsFilter}
                onChange={(e) => setBedsFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg"
              >
                <option value="any">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Baths</label>
              <select
                value={bathsFilter}
                onChange={(e) => setBathsFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg"
              >
                <option value="any">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
            <div className="flex items-end gap-2">
              <button onClick={handleApplyFilters} className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm">
                Apply
              </button>
              <button onClick={handleClearFilters} className="px-4 py-2 text-amber-600 text-sm">
                Clear
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {paginatedProperties.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border">
          <p className="text-gray-500">No properties match your criteria.</p>
          <button onClick={handleClearFilters} className="mt-4 text-amber-600">
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {paginatedProperties.map((property) => {
              const primaryImage = getPrimaryImage(property);
              const statusStyle = statusConfig[property.status] || statusConfig.buy;

              if (viewMode === 'grid') {
                return (
                  <Link href={`/properties/${property.slug || property.id}`} key={property.id} className="group">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl h-full flex flex-col">
                      <div className="relative h-64 overflow-hidden bg-gray-200">
                        <OptimizedImage
                          src={primaryImage}
                          alt={property.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                          className="group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-3 left-3 z-10">
                          <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm border ${statusStyle.color}`}>
                            {statusStyle.label}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3 z-10">
                          <FavoriteButton property={property} />
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {getPriceWithPeriod(property)}
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-amber-600 line-clamp-1">
                          {property.title}
                        </h3>
                        <div className="flex items-center text-gray-600 text-sm mb-4">
                          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                          <span className="truncate">
                            {property.location?.city || property.location}, {property.location?.state || ''}
                          </span>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto text-sm text-gray-600">
                          <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {property.beds}</span>
                          <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {property.baths}</span>
                          <span className="flex items-center gap-1"><Maximize className="w-4 h-4" /> {property.sqft?.toLocaleString()} sqft</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              } else {
                return (
                  <Link href={`/properties/${property.slug || property.id}`} key={property.id} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-64 h-48 md:h-auto overflow-hidden bg-gray-200">
                        <OptimizedImage
                          src={primaryImage}
                          alt={property.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 256px"
                          className="group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-3 left-3 z-10">
                          <span className={`px-2 py-0.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm border ${statusStyle.color}`}>
                            {statusStyle.label}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3 z-10">
                          <FavoriteButton property={property} />
                        </div>
                      </div>
                      <div className="flex-1 p-5">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-medium group-hover:text-amber-600">{property.title}</h3>
                            <div className="flex items-center text-gray-600 text-sm mt-1">
                              <MapPin className="w-4 h-4 mr-1" />
                              {property.location?.city || property.location}, {property.location?.state || ''}
                            </div>
                          </div>
                          <div className="text-2xl font-bold">{getPriceWithPeriod(property)}</div>
                        </div>
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{property.shortDescription || property.description}</p>
                        <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {property.beds} beds</span>
                          <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {property.baths} baths</span>
                          <span className="flex items-center gap-1"><Maximize className="w-4 h-4" /> {property.sqft?.toLocaleString()} sqft</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              }
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium ${
                          currentPage === page ? 'bg-amber-500 text-white' : 'border hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-1">...</span>;
                  }
                  return null;
                })}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </nav>
            </div>
          )}
          <p className="text-center text-sm text-gray-500 mt-4">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredProperties.length)} of {filteredProperties.length}
          </p>
        </>
      )}
    </>
  );
}