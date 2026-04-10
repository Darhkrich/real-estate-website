'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageSlider from '@/components/ImageSlider';
import VirtualTour from '@/components/VirtualTour';
import FavoriteButton from '@/components/FavoriteButton';
import PropertyMap from '@/components/PropertyMap';
import OptimizedImage from '@/components/OptimizedImage';
import { properties } from '@/data/properties';
import { agents } from '@/data/agents';
import { useCurrency } from '@/context/CurrencyContext';
import {
  MapPin, Bed, Bath, Maximize, CheckCircle, Share2, Calendar,
  Ruler, Building2, Phone, Mail, ChevronRight, Check,
} from 'lucide-react';

export default function PropertyDetailsClient({ params }) {
  const { id } = useParams();
  const identifier = params?.id || id;

  const [property, setProperty] = useState(null);
  const [agent, setAgent] = useState(null);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Always call useCurrency unconditionally
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (!identifier) {
      setError(true);
      setLoading(false);
      return;
    }

    let found = properties.find((p) => p.slug === identifier);
    if (!found) {
      found = properties.find((p) => p.id === identifier || p.id === parseInt(identifier));
    }

    if (found) {
      setProperty(found);
      const foundAgent = agents.find((a) => a.id === found.agentId);
      setAgent(foundAgent || null);

      const similar = properties
        .filter(
          (p) =>
            p.id !== found.id &&
            (p.type === found.type || p.location?.city === found.location?.city)
        )
        .slice(0, 3);
      setSimilarProperties(similar);

      setLoading(false);
    } else {
      setError(true);
      setLoading(false);
    }
  }, [identifier]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Property Not Found</h1>
            <p className="text-gray-600 mb-8">The property you're looking for doesn't exist.</p>
            <Link href="/properties" className="px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600">
              Browse All Properties
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const primaryImage =
    property.images?.find((img) => img.isPrimary)?.url || property.images?.[0]?.url;

  const statusConfig = {
    buy: { label: 'For Sale', color: 'bg-blue-100 text-blue-800' },
    rent: { label: 'For Rent', color: 'bg-green-100 text-green-800' },
    new: { label: 'New Development', color: 'bg-purple-100 text-purple-800' },
    sold: { label: 'Sold', color: 'bg-red-100 text-red-800' },
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  };
  const statusStyle = statusConfig[property.status] || statusConfig.buy;

  const priceWithPeriod = property.status === 'rent'
    ? `${formatPrice(property.price)}/mo`
    : formatPrice(property.price);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      {showShareToast && (
        <div className="fixed top-24 right-4 z-50 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <Check className="w-4 h-4 text-green-400" />
          Link copied to clipboard!
        </div>
      )}

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
          <ImageSlider images={property.images || []} propertyTitle={property.title} showThumbs />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${statusStyle.color}`}>
                  {statusStyle.label}
                </span>
                {property.listingDate && (
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Listed {new Date(property.listingDate).toLocaleDateString()}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-3">
                {property.title}
              </h1>

              <div className="flex items-center text-gray-600 text-lg mb-4">
                <MapPin className="w-5 h-5 mr-2 text-amber-600 flex-shrink-0" />
                <span>
                  {property.location?.address && `${property.location.address}, `}
                  {property.location?.city}, {property.location?.state} {property.location?.zipCode}
                </span>
              </div>

              <div className="text-3xl md:text-4xl font-bold text-gray-900">
                {priceWithPeriod}
                {property.pricePerSqft && (
                  <span className="text-base font-normal text-gray-500 ml-2">
                    ({formatPrice(property.pricePerSqft)}/sqft)
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="p-3 border border-gray-200 rounded-full hover:bg-gray-50"
                aria-label="Share"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <FavoriteButton property={property} className="p-3 border border-gray-200" />
            </div>
          </div>
        </div>

        <div className="border-y border-gray-100 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-lg"><Bed className="w-6 h-6 text-amber-600" /></div>
                <div><p className="text-sm text-gray-500">Bedrooms</p><p className="text-xl font-semibold">{property.beds}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-lg"><Bath className="w-6 h-6 text-amber-600" /></div>
                <div><p className="text-sm text-gray-500">Bathrooms</p><p className="text-xl font-semibold">{property.baths}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-lg"><Ruler className="w-6 h-6 text-amber-600" /></div>
                <div><p className="text-sm text-gray-500">Square Feet</p><p className="text-xl font-semibold">{property.sqft.toLocaleString()}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-lg"><Building2 className="w-6 h-6 text-amber-600" /></div>
                <div><p className="text-sm text-gray-500">Property Type</p><p className="text-xl font-semibold">{property.type}</p></div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <section>
                <h2 className="text-2xl font-serif font-bold mb-4">Description</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{property.description}</p>
              </section>

              {(property.features?.length > 0 || property.amenities?.length > 0) && (
                <section>
                  <h2 className="text-2xl font-serif font-bold mb-4">Features & Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                    {property.features?.map((f, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{f}</span>
                      </div>
                    ))}
                    {property.amenities?.map((a, i) => (
                      <div key={`amenity-${i}`} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{a}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="bg-gray-50 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">Property Details</h2>
                <dl className="grid grid-cols-2 sm:grid-cols-2 gap-4 text-sm">
                  {property.yearBuilt && (<><dt className="text-gray-500">Year Built</dt><dd className="font-medium">{property.yearBuilt}</dd></>)}
                  {property.lotSize && (<><dt className="text-gray-500">Lot Size</dt><dd className="font-medium">{property.lotSize.toLocaleString()} sqft</dd></>)}
                  <dt className="text-gray-500">MLS ID</dt><dd className="font-medium">{property.id}</dd>
                  <dt className="text-gray-500">Status</dt><dd className="font-medium">{statusStyle.label}</dd>
                </dl>
              </section>

              {property.virtualTourUrl && (
                <VirtualTour url={property.virtualTourUrl} coverImage={primaryImage} propertyTitle={property.title} />
              )}

              {property.location?.coordinates ? (
                <section>
                  <h2 className="text-2xl font-serif font-bold mb-4">Location</h2>
                  <PropertyMap
                    lat={property.location.coordinates.lat}
                    lng={property.location.coordinates.lng}
                    title={property.title}
                    address={`${property.location.address}, ${property.location.city}, ${property.location.state}`}
                  />
                </section>
              ) : (
                <section>
                  <h2 className="text-2xl font-serif font-bold mb-4">Location</h2>
                  <div className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center text-gray-500">
                    Map coordinates not available.
                  </div>
                </section>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {agent && (
                  <div className="bg-white border rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold mb-4">Listing Agent</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                        <OptimizedImage src={agent.image} alt={agent.name} fill sizes="64px" />
                      </div>
                      <div>
                        <p className="font-bold">{agent.name}</p>
                        <p className="text-sm text-gray-500">{agent.title}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <a href={`tel:${agent.phone?.replace(/\D/g, '')}`} className="flex items-center gap-2 hover:text-amber-600">
                        <Phone className="w-4 h-4" />{agent.phone}
                      </a>
                      <a href={`mailto:${agent.email}`} className="flex items-center gap-2 hover:text-amber-600">
                        <Mail className="w-4 h-4" />{agent.email}
                      </a>
                    </div>
                    <Link href={`/agents/${agent.id}`} className="mt-4 inline-flex items-center text-amber-600 text-sm">
                      View Profile <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                )}

                <div className="bg-white border rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-2">Request Information</h3>
                  <p className="text-gray-500 text-sm mb-6">Schedule a viewing or ask a question.</p>
                  {formSubmitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                      <Check className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <p className="font-medium text-green-800">Message sent!</p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleFormChange} required className="w-full px-4 py-3 bg-gray-50 border rounded-xl" />
                      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleFormChange} required className="w-full px-4 py-3 bg-gray-50 border rounded-xl" />
                      <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleFormChange} className="w-full px-4 py-3 bg-gray-50 border rounded-xl" />
                      <textarea name="message" placeholder="I'm interested in..." rows="4" value={formData.message} onChange={handleFormChange} className="w-full px-4 py-3 bg-gray-50 border rounded-xl resize-none" />
                      <button type="submit" className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-medium hover:bg-amber-600">
                        Send Message
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          {similarProperties.length > 0 && (
            <section className="mt-16 pt-8 border-t">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif font-bold">Similar Properties</h2>
                <Link href="/properties" className="text-amber-600 hover:text-amber-700 flex items-center">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarProperties.map((similar) => {
                  const img = similar.images?.find((i) => i.isPrimary)?.url || similar.images?.[0]?.url;
                  return (
                    <Link href={`/properties/${similar.slug || similar.id}`} key={similar.id} className="group">
                      <div className="bg-white rounded-xl overflow-hidden shadow-sm border">
                        <div className="relative h-48 overflow-hidden bg-gray-200">
                          <OptimizedImage src={img} alt={similar.title} fill sizes="(max-width:768px)100vw,200px" className="group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="p-4">
                          <p className="font-bold group-hover:text-amber-600">{formatPrice(similar.price)}{similar.status === 'rent' ? '/mo' : ''}</p>
                          <p className="text-sm truncate">{similar.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{similar.location?.city}, {similar.location?.state}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}