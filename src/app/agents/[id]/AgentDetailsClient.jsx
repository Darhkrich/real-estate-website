'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import OptimizedImage from '@/components/OptimizedImage';
import { agents } from '@/data/agents';
import { properties } from '@/data/properties';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Phone, Mail, MapPin, Award, Globe, Home, CheckCircle, ChevronRight, Share2,
  Building2,
} from 'lucide-react';

export default function AgentDetailsClient({ params }) {
  const { id } = useParams();
  const identifier = params?.id || id;
  const { formatPrice } = useCurrency();

  const [agent, setAgent] = useState(null);
  const [agentListings, setAgentListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (!identifier) {
      setError(true);
      setLoading(false);
      return;
    }
    const foundAgent = agents.find((a) => a.id === identifier || a.id === parseInt(identifier));
    if (foundAgent) {
      setAgent(foundAgent);
      setAgentListings(properties.filter((p) => p.agentId === foundAgent.id));
    } else {
      setError(true);
    }
    setLoading(false);
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

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Inquiry sent:', formData);
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !agent) {
    return (
      <div className="min-h-screen flex flex-col">
       
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Agent Not Found</h1>
            <Link href="/agents" className="text-amber-600">Browse All Agents</Link>
          </div>
        </div>
       
      </div>
    );
  }

  const totalListingValue = agentListings.reduce((sum, p) => sum + p.price, 0);
  const { phone, email, languages = [], specialty = [], socialLinks = {} } = agent;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
     
      {showShareToast && (
        <div className="fixed top-24 right-4 z-50 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg">
          Profile link copied!
        </div>
      )}

      {/* Hero Profile Banner */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
              <OptimizedImage src={agent.image} alt={agent.name} fill sizes="192px" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">{agent.name}</h1>
                {agent.yearsExperience && (
                  <span className="flex items-center gap-1 text-sm bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full">
                    <Award className="w-4 h-4" />{agent.yearsExperience}+ Years
                  </span>
                )}
              </div>
              <p className="text-amber-400 text-lg mb-3">{agent.title}</p>
              {agent.licenseNumber && <p className="text-gray-400 text-sm mb-4">License: {agent.licenseNumber}</p>}
              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-white">
                <div className="flex items-center gap-2"><Home className="w-5 h-5 text-amber-400" /><span><strong>{agentListings.length}</strong> Active Listings</span></div>
                <div className="flex items-center gap-2"><Building2 className="w-5 h-5 text-amber-400" /><span><strong>{formatPrice(totalListingValue)}</strong> Portfolio</span></div>
              </div>
            </div>
            <div className="flex flex-row md:flex-col gap-3">
              {phone && <a href={`tel:${phone.replace(/\D/g, '')}`} className="flex items-center gap-2 px-5 py-3 bg-amber-500 text-white rounded-xl"><Phone className="w-4 h-4" /><span className="hidden sm:inline">Call</span></a>}
              {email && <a href={`mailto:${email}`} className="flex items-center gap-2 px-5 py-3 bg-white/10 text-white rounded-xl border border-white/20"><Mail className="w-4 h-4" /><span className="hidden sm:inline">Email</span></a>}
              <button onClick={handleShare} className="flex items-center gap-2 px-5 py-3 bg-white/10 text-white rounded-xl border border-white/20"><Share2 className="w-4 h-4" /><span className="hidden sm:inline">Share</span></button>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {agent.bio && (
              <section className="bg-white rounded-2xl p-6 shadow-sm border">
                <h2 className="text-xl font-serif font-bold mb-4">About {agent.name}</h2>
                <p className="text-gray-600 leading-relaxed">{agent.bio}</p>
              </section>
            )}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-serif font-bold mb-4">Expertise</h2>
              {specialty.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {specialty.map((s, i) => <span key={i} className="bg-amber-50 text-amber-800 px-3 py-1.5 rounded-full text-sm">{s}</span>)}
                  </div>
                </div>
              )}
              {languages.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((l, i) => <span key={i} className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm"><Globe className="w-3 h-3" />{l}</span>)}
                  </div>
                </div>
              )}
            </section>
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-serif font-bold mb-4">Contact</h2>
              <div className="space-y-3">
                {phone && <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-amber-600" /><a href={`tel:${phone.replace(/\D/g, '')}`}>{phone}</a></div>}
                {email && <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-amber-600" /><a href={`mailto:${email}`}>{email}</a></div>}
              </div>
          
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Work with {agent.name?.split(' ')[0]}</h3>
              <p className="text-gray-500 text-sm mb-6">Send a message to start the conversation.</p>
              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="font-medium text-green-800">Message Sent!</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleFormChange} required className="w-full px-4 py-3 bg-gray-50 border rounded-xl" />
                  <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleFormChange} required className="w-full px-4 py-3 bg-gray-50 border rounded-xl" />
                  <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleFormChange} className="w-full px-4 py-3 bg-gray-50 border rounded-xl" />
                  <textarea name="message" placeholder="I'm interested in..." rows="4" value={formData.message} onChange={handleFormChange} className="w-full px-4 py-3 bg-gray-50 border rounded-xl resize-none" />
                  <button type="submit" className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-medium hover:bg-amber-600">Send Message</button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Agent's Listings */}
        <section className="mt-12 pt-8 border-t">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif font-bold">Properties Listed by {agent.name}</h2>
            {agentListings.length > 0 && (
              <Link href={`/properties?agent=${agent.id}`} className="text-amber-600 hover:text-amber-700">View All <ChevronRight className="w-4 h-4 ml-1" /></Link>
            )}
          </div>
          {agentListings.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border">No active listings.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agentListings.map((property) => {
                const img = property.images?.find((i) => i.isPrimary)?.url || property.images?.[0]?.url;
                return (
                  <Link href={`/properties/${property.slug || property.id}`} key={property.id} className="group">
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm border">
                      <div className="relative h-48 overflow-hidden bg-gray-200">
                        <OptimizedImage src={img} alt={property.title} fill sizes="(max-width:768px)100vw,200px" />
                        <div className="absolute top-3 right-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${property.status === 'buy' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                            {property.status === 'buy' ? 'For Sale' : 'For Rent'}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="font-bold text-lg">{formatPrice(property.price)}{property.status === 'rent' ? '/mo' : ''}</p>
                        <h3 className="font-medium group-hover:text-amber-600 truncate">{property.title}</h3>
                        <p className="text-sm text-gray-500 flex items-center mt-1"><MapPin className="w-3 h-3 mr-1" />{property.location?.city}, {property.location?.state}</p>
                        <div className="flex justify-between mt-3 text-sm text-gray-600">
                          <span><Home className="w-3 h-3 inline mr-1" />{property.beds} bd</span>
                          <span>{property.baths} ba</span>
                          <span>{property.sqft?.toLocaleString()} sqft</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>
     
    </div>
  );
}