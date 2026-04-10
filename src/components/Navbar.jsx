'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  Search,
  X,
  ChevronRight,
  Home,
  Building2,
  Users,
  Heart,
  Globe,
  Phone,
} from 'lucide-react';
import { useFavorites } from '@/components/FavoritesContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function Navbar() {
  const pathname = usePathname();
  const { favorites } = useFavorites();
  const { selectedCurrency, setSelectedCurrency, supportedCurrencies } = useCurrency();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);

  const currencyMenuRef = useRef(null);
  const searchInputRef = useRef(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setShowCurrencyMenu(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Close currency dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (currencyMenuRef.current && !currencyMenuRef.current.contains(e.target)) {
        setShowCurrencyMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/properties', label: 'Properties', icon: Building2 },
    { href: '/agents', label: 'Agents', icon: Users },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white/90 backdrop-blur-md'
        } border-b border-gray-100`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-serif font-bold tracking-tighter text-gray-900 hover:text-amber-600 transition-colors"
              aria-label="Prime Estate Home"
            >
              PRIME<span className="text-amber-600">ESTATE</span>
              <span className="text-amber-600">.</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all ${
                      active
                        ? 'text-amber-600 bg-amber-50'
                        : 'text-gray-700 hover:text-amber-600 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute -bottom-[21px] left-1/2 -translate-x-1/2 w-6 h-0.5 bg-amber-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Currency Selector */}
              <div className="relative" ref={currencyMenuRef}>
                <button
                  onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-1"
                  aria-label="Select currency"
                  aria-expanded={showCurrencyMenu}
                >
                  <Globe className="w-5 h-5 text-gray-600" />
                  <span className="hidden lg:inline text-sm font-medium text-gray-700">
                    {selectedCurrency}
                  </span>
                </button>
                {showCurrencyMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b border-gray-100">
                      Select Currency
                    </div>
                    {Object.entries(supportedCurrencies).map(([code, { name, symbol }]) => (
                      <button
                        key={code}
                        onClick={() => {
                          setSelectedCurrency(code);
                          setShowCurrencyMenu(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center justify-between transition-colors ${
                          selectedCurrency === code ? 'text-amber-600 font-medium bg-amber-50/50' : 'text-gray-700'
                        }`}
                      >
                        <span>{code} – {name}</span>
                        <span className="text-gray-400">{symbol}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Favorites Link */}
              <Link
                href="/favorites"
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Saved properties"
              >
                <Heart className="w-5 h-5 text-gray-600" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {favorites.length > 9 ? '9+' : favorites.length}
                  </span>
                )}
              </Link>

              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Search properties"
                aria-expanded={isSearchOpen}
              >
                {isSearchOpen ? (
                  <X className="w-5 h-5 text-gray-600" />
                ) : (
                  <Search className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {/* List Property CTA (Desktop) */}
              <Link
                href="/list-property"
                className="hidden lg:inline-flex items-center bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-amber-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                List Property
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>

              {/* Contact Phone (Desktop) */}
              <a
                href="tel:+12125550199"
                className="hidden xl:flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+1 (212) 555-0199</span>
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-900" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-900" />
                )}
              </button>
            </div>
          </div>

          {/* Expandable Search Bar */}
          {isSearchOpen && (
            <div className="py-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search by city, address, or MLS #..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setIsSearchOpen(false);
                  }}
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-xs text-gray-500">Popular:</span>
                {['New York', 'Malibu', 'Miami', 'Boston', 'Nashville'].map((city) => (
                  <button
                    key={city}
                    className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    onClick={() => {
                      window.location.href = `/properties?location=${encodeURIComponent(city)}`;
                    }}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Menu Panel */}
          <div className="absolute right-0 top-20 w-[280px] h-[calc(100vh-5rem)] bg-white shadow-xl animate-in slide-in-from-right duration-200">
            <div className="p-6 space-y-6 overflow-y-auto h-full">
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                        active
                          ? 'bg-amber-50 text-amber-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  );
                })}
                <Link
                  href="/favorites"
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">Favorites</span>
                  {favorites.length > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {favorites.length}
                    </span>
                  )}
                </Link>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-3">
                <Link
                  href="/list-property"
                  className="flex items-center justify-center w-full bg-gray-900 text-white px-4 py-3 rounded-xl text-sm font-medium hover:bg-amber-600 transition-colors"
                >
                  List Your Property
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
                <a
                  href="tel:+12125550199"
                  className="flex items-center justify-center w-full border border-gray-200 text-gray-700 px-4 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  +1 (212) 555-0199
                </a>
              </div>

              {/* Currency selector in mobile menu */}
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs font-medium text-gray-500 mb-2 px-2">Currency</p>
                <div className="grid grid-cols-2 gap-1">
                  {Object.entries(supportedCurrencies).map(([code, { symbol }]) => (
                    <button
                      key={code}
                      onClick={() => setSelectedCurrency(code)}
                      className={`px-3 py-2 text-sm rounded-lg text-left ${
                        selectedCurrency === code
                          ? 'bg-amber-50 text-amber-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {code} {symbol}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-xs text-gray-400 text-center pt-4">
                © 2025 Prime Estate
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}