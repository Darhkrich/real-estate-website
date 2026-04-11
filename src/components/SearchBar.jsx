'use client';

import { useState, useEffect, useRef, useCallback, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, MapPin, X } from 'lucide-react';
import { properties } from '@/data/properties';

// Debounce utility inline to avoid extra file issues
function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// ----------------------------------------------------------------------
// Internal component that actually uses useSearchParams
// ----------------------------------------------------------------------
function SearchBarContent({ initialStatus = 'all' }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [status, setStatus] = useState(searchParams.get('status') || initialStatus);
  const [type, setType] = useState(searchParams.get('type') || 'all');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);

  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Memoize unique locations to prevent infinite loops
  const uniqueLocations = useMemo(() => {
    const locations = properties.map((p) => {
      const city = p.location?.city || p.location;
      const state = p.location?.state || '';
      return `${city}, ${state}`.trim();
    });
    return [...new Set(locations)].filter(Boolean).sort();
  }, []);

  // Update suggestions when location changes
  useEffect(() => {
    if (location.trim().length > 0) {
      const filtered = uniqueLocations.filter((loc) =>
        loc.toLowerCase().includes(location.toLowerCase())
      );
      setFilteredLocations(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredLocations(uniqueLocations);
      setShowSuggestions(false);
    }
  }, [location, uniqueLocations]);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced URL update
  const updateUrlParams = useCallback(
    (newLocation, newStatus, newType) => {
      const params = new URLSearchParams();
      if (newLocation) params.set('location', newLocation);
      if (newStatus !== 'all') params.set('status', newStatus);
      if (newType !== 'all') params.set('type', newType);
      router.push(`/properties?${params.toString()}`, { scroll: false });
    },
    [router]
  );

  const debouncedUpdate = useMemo(
    () => debounce(updateUrlParams, 400),
    [updateUrlParams]
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debouncedUpdate.cancel) debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    debouncedUpdate(value, status, type);
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatus(value);
    updateUrlParams(location, value, type);
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setType(value);
    updateUrlParams(location, status, value);
  };

  const handleLocationSelect = (selected) => {
    setLocation(selected);
    setShowSuggestions(false);
    updateUrlParams(selected, status, type);
  };

  const handleClearLocation = () => {
    setLocation('');
    updateUrlParams('', status, type);
    inputRef.current?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (status !== 'all') params.set('status', status);
    if (type !== 'all') params.set('type', type);
    router.push(`/properties?${params.toString()}`);
    setShowSuggestions(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-20 flex flex-col md:flex-row items-stretch md:items-center bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-3xl p-3 gap-3 w-full max-w-4xl mx-auto mt-[-40px]"
    >
      <div className="flex-1 relative">
        <div className="flex items-center bg-white/50 rounded-2xl px-4 py-3 border border-white/60 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all">
          <MapPin className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="City, Neighborhood, or Zip"
            value={location}
            onChange={handleLocationChange}
            onFocus={() => setShowSuggestions(true)}
            className="w-full bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-600 font-medium"
            autoComplete="off"
          />
          {location && (
            <button
              type="button"
              onClick={handleClearLocation}
              className="ml-2 p-1 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {showSuggestions && filteredLocations.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-30"
          >
            {filteredLocations.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => handleLocationSelect(loc)}
                className="w-full text-left px-4 py-3 hover:bg-amber-50 transition-colors flex items-center space-x-2 text-gray-700"
              >
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>{loc}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex w-full md:w-auto gap-3">
        <div className="relative flex-1 md:w-40">
          <select
            value={status}
            onChange={handleStatusChange}
            className="w-full bg-white/50 rounded-2xl px-4 py-3 border border-white/60 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 text-gray-800 appearance-none font-medium cursor-pointer"
          >
            <option value="all">Any Status</option>
            <option value="buy">For Sale</option>
            <option value="rent">For Rent</option>
            <option value="new">New Dev</option>
          </select>
        </div>

        <div className="relative flex-1 md:w-40">
          <select
            value={type}
            onChange={handleTypeChange}
            className="w-full bg-white/50 rounded-2xl px-4 py-3 border border-white/60 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 text-gray-800 appearance-none font-medium cursor-pointer"
          >
            <option value="all">Any Type</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Villa">Villa</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Townhouse">Townhouse</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full md:w-auto bg-gray-900 text-white px-8 py-3 rounded-2xl font-medium hover:bg-amber-600 transition-colors flex items-center justify-center shadow-lg shadow-gray-900/20 hover:shadow-amber-600/20"
      >
        <Search className="w-5 h-5 md:mr-2" />
        <span className="hidden md:inline">Search</span>
      </button>
    </form>
  );
}

// ----------------------------------------------------------------------
// Default export wrapped in Suspense to fix build errors
// ----------------------------------------------------------------------
export default function SearchBar(props) {
  return (
    <Suspense fallback={<div className="text-center py-4">Loading search...</div>}>
      <SearchBarContent {...props} />
    </Suspense>
  );
}