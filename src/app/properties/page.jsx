import { Suspense } from 'react';

import SearchBar from '@/components/SearchBar';
import PropertiesContent from '@/components/PropertiesContent';
import { properties } from '@/data/properties';
import PropertyGridSkeleton from '@/components/skeletons/PropertyGridSkeleton';

export const metadata = {
  title: 'Properties | Company Name',
  description: 'Browse our curated collection of luxury properties for sale and rent.',
};

async function getFilteredProperties(searchParams) {
  const allProperties = properties;

  const locationFilter = searchParams.location || '';
  const statusFilter = searchParams.status || 'all';
  const typeFilter = searchParams.type || 'all';
  const minPrice = searchParams.minPrice ? Number(searchParams.minPrice) : null;
  const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : null;
  const bedsFilter = searchParams.beds || 'any';
  const bathsFilter = searchParams.baths || 'any';
  const sortBy = searchParams.sort || 'newest';

  let filtered = allProperties;

  if (locationFilter) {
    filtered = filtered.filter((prop) =>
      `${prop.location?.city || prop.location}, ${prop.location?.state || ''}`
        .toLowerCase()
        .includes(locationFilter.toLowerCase())
    );
  }

  if (statusFilter !== 'all') {
    filtered = filtered.filter((prop) => prop.status === statusFilter);
  }

  if (typeFilter !== 'all') {
    filtered = filtered.filter((prop) => prop.type === typeFilter);
  }

  if (minPrice !== null) {
    filtered = filtered.filter((prop) => prop.price >= minPrice);
  }

  if (maxPrice !== null) {
    filtered = filtered.filter((prop) => prop.price <= maxPrice);
  }

  if (bedsFilter !== 'any') {
    filtered = filtered.filter((prop) => prop.beds >= parseInt(bedsFilter));
  }

  if (bathsFilter !== 'any') {
    filtered = filtered.filter((prop) => prop.baths >= parseFloat(bathsFilter));
  }

  switch (sortBy) {
    case 'price-asc':
      filtered = [...filtered].sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered = [...filtered].sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      filtered = [...filtered].sort(
        (a, b) => new Date(b.listingDate || 0) - new Date(a.listingDate || 0)
      );
      break;
    case 'oldest':
      filtered = [...filtered].sort(
        (a, b) => new Date(a.listingDate || 0) - new Date(b.listingDate || 0)
      );
      break;
  }

  return filtered;
}

export default async function PropertiesPage({ searchParams }) {
  const params = await searchParams;
  const filteredProperties = await getFilteredProperties(params);

  const pageTitle =
    params.status === 'rent'
      ? 'Properties for Rent'
      : params.status === 'new'
      ? 'New Developments'
      : params.status === 'buy'
      ? 'Properties for Sale'
      : 'All Properties';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
   

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 pt-24 pb-28 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
          {pageTitle}
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Discover exceptional real estate tailored to your lifestyle.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 mb-8 w-full">
        <Suspense fallback={<div className="h-20 bg-white/70 rounded-3xl animate-pulse" />}>
          <SearchBar initialStatus={params.status || 'all'} />
        </Suspense>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
      <Suspense fallback={<PropertyGridSkeleton />}>
  <PropertiesContent initialProperties={filteredProperties} searchParams={params} />
</Suspense>
      </main>

   
    </div>
  );
}

