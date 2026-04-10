'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import OptimizedImage from '@/components/OptimizedImage';
import FavoriteButton from '@/components/FavoriteButton';
import { properties } from '@/data/properties';
import { agents } from '@/data/agents';
import { testimonials } from '@/data/testimonials';
import { useCurrency } from '@/context/CurrencyContext';
import {
  MapPin, Bed, Bath, Maximize, ArrowRight, Star, Shield, Award, Clock, ChevronRight,
} from 'lucide-react';

const statusConfig = {
  buy: { label: 'For Sale', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  rent: { label: 'For Rent', color: 'bg-green-100 text-green-800 border-green-200' },
  new: { label: 'New Development', color: 'bg-purple-100 text-purple-800 border-purple-200' },
};

export default function HomePage() {
  // Always call useCurrency unconditionally
  const { formatPrice } = useCurrency();

  const featuredProperties = properties.filter((p) => p.isFeatured).slice(0, 6);
  const spotlightAgent = agents[0];
  const featuredTestimonials = testimonials?.slice(0, 3) || [];

  const getPrimaryImage = (prop) => {
    if (!prop.images?.length) return '/placeholder.jpg';
    const primary = prop.images.find((img) => img.isPrimary);
    if (primary) return primary.url || primary;
    const first = prop.images[0];
    return typeof first === 'string' ? first : first?.url || '/placeholder.jpg';
  };

  const getLocationString = (prop) => {
    if (prop.location?.city) return `${prop.location.city}, ${prop.location.state || ''}`;
    if (typeof prop.location === 'string') return prop.location;
    return 'Location unavailable';
  };

  const getPriceWithPeriod = (prop) => {
    const base = formatPrice(prop.price);
    return prop.status === 'rent' ? `${base}/mo` : base;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <section className="relative min-h-[60vh] sm:min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <OptimizedImage src="/hero-1.jpg" alt="Luxury home exterior" fill priority sizes="100vw" className="brightness-50" />
        </div>
        <div className="relative z-10 w-full px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-center text-white pt-20 pb-32 sm:py-24">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
              Find Your<span className="text-amber-400"> Sanctuary</span>
            </h1>
            <p className="text-lg md:text-2xl font-light opacity-90 mb-8 max-w-3xl mx-auto px-4">
              Exclusive properties for the discerning few. Experience luxury living redefined.
            </p>
          </div>
        </div>
      </section>

      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 -mt-16 sm:-mt-20 mb-8">
        <SearchBar />
      </div>

      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-xl"><Shield className="w-6 h-6 text-amber-600" /></div>
              <div><h3 className="font-semibold text-gray-900">Verified Listings</h3><p className="text-sm text-gray-600">Every property personally vetted</p></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-xl"><Award className="w-6 h-6 text-amber-600" /></div>
              <div><h3 className="font-semibold text-gray-900">Award-Winning Agents</h3><p className="text-sm text-gray-600">Industry leaders at your service</p></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-xl"><Clock className="w-6 h-6 text-amber-600" /></div>
              <div><h3 className="font-semibold text-gray-900">24/7 Concierge</h3><p className="text-sm text-gray-600">Always available for you</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Featured Properties</h2>
            <p className="text-gray-600 mt-2">Hand-picked luxury residences for the most discerning buyers</p>
          </div>
          <Link href="/properties" className="mt-4 sm:mt-0 inline-flex items-center text-amber-600 font-medium hover:text-amber-700 group">
            View All Properties<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {featuredProperties.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border"><p className="text-gray-500">No featured properties at the moment.</p></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProperties.map((property) => {
              const primaryImage = getPrimaryImage(property);
              const location = getLocationString(property);
              const price = getPriceWithPeriod(property);
              const statusStyle = statusConfig[property.status] || statusConfig.buy;

              return (
                <Link href={`/properties/${property.slug || property.id}`} key={property.id} className="group">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                    <div className="relative h-64 overflow-hidden bg-gray-200">
                      <OptimizedImage src={primaryImage} alt={property.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px" className="group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-3 left-3 z-10">
                        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm border ${statusStyle.color}`}>{statusStyle.label}</span>
                      </div>
                      <div className="absolute top-3 right-3 z-10">
                        <FavoriteButton property={property} />
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="text-2xl font-bold text-gray-900 mb-1">{price}</div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1 group-hover:text-amber-600 transition-colors line-clamp-1">{property.title}</h3>
                      <div className="flex items-center text-gray-600 text-sm mb-4">
                        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" /><span className="truncate">{location}</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto text-sm text-gray-600">
                        <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {property.beds || '-'}</span>
                        <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {property.baths || '-'}</span>
                        <span className="flex items-center gap-1"><Maximize className="w-4 h-4" /> {property.sqft?.toLocaleString() || '-'} sqft</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {spotlightAgent && (
        <section className="bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-1/3">
                <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden border-4 border-amber-100 shadow-xl bg-gray-200">
                  <OptimizedImage src={spotlightAgent.image} alt={spotlightAgent.name} fill sizes="(max-width: 768px) 256px, 320px" />
                </div>
              </div>
              <div className="md:w-2/3 text-center md:text-left">
                <p className="text-amber-600 font-medium uppercase tracking-wider text-sm mb-2">Meet Our Top Agent</p>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">{spotlightAgent.name}</h2>
                <p className="text-lg text-gray-600 mb-2">{spotlightAgent.title}</p>
                <p className="text-gray-600 mb-6 max-w-2xl">{spotlightAgent.bio?.substring(0, 200)}...</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <Link href={`/agents/${spotlightAgent.id}`} className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-amber-600 transition-colors">
                    View Profile<ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                  <Link href={`/properties?agent=${spotlightAgent.id}`} className="inline-flex items-center px-6 py-3 border border-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors">
                    View Listings
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {featuredTestimonials.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20 w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Don't just take our word for it — hear from our satisfied clients.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  {testimonial.avatar && (
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 relative">
                      <OptimizedImage src={testimonial.avatar} alt={testimonial.author} fill sizes="40px" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 md:py-20 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">Let our expert agents guide you through the world's most exclusive properties.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/properties" className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 text-white rounded-full font-medium hover:bg-amber-600 transition-colors">
              Browse Properties<ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors border border-white/20">
              Contact an Agent
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}