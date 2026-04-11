'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

import OptimizedImage from '@/components/OptimizedImage';
import { agents } from '@/data/agents';
import { properties } from '@/data/properties';
import {
  Phone, Mail, Award, Home, Globe, ChevronRight, Search, X,
} from 'lucide-react';

export default function AgentsClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const agentStats = useMemo(() => {
    return agents.map((agent) => {
      const listings = properties.filter((p) => p.agentId === agent.id);
      return { ...agent, activeListings: listings.length };
    });
  }, []);

  const allSpecialties = useMemo(() => {
    const specialties = new Set();
    agents.forEach((agent) => agent.specialty?.forEach((s) => specialties.add(s)));
    return ['all', ...Array.from(specialties).sort()];
  }, []);

  const allLanguages = useMemo(() => {
    const languages = new Set();
    agents.forEach((agent) => agent.languages?.forEach((l) => languages.add(l)));
    return ['all', ...Array.from(languages).sort()];
  }, []);

  const filteredAgents = useMemo(() => {
    return agentStats.filter((agent) => {
      const searchMatch =
        searchTerm === '' ||
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.specialty?.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

      const specialtyMatch = selectedSpecialty === 'all' || agent.specialty?.includes(selectedSpecialty);
      const languageMatch = selectedLanguage === 'all' || agent.languages?.includes(selectedLanguage);

      return searchMatch && specialtyMatch && languageMatch;
    });
  }, [agentStats, searchTerm, selectedSpecialty, selectedLanguage]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSpecialty('all');
    setSelectedLanguage('all');
  };

  const handleCall = (e, phone) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `tel:${phone.replace(/\D/g, '')}`;
  };

  const handleEmail = (e, email) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
  

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 pt-24 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Our Agents</h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Industry‑leading professionals dedicated to providing unparalleled service and market expertise.
        </p>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
        {/* Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, title, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/20"
            >
              {allSpecialties.map((s) => (
                <option key={s} value={s}>{s === 'all' ? 'All Specialties' : s}</option>
              ))}
            </select>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/20"
            >
              {allLanguages.map((l) => (
                <option key={l} value={l}>{l === 'all' ? 'All Languages' : l}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{filteredAgents.length}</span> agents found
            </p>
            {(searchTerm || selectedSpecialty !== 'all' || selectedLanguage !== 'all') && (
              <button onClick={clearFilters} className="text-sm text-amber-600 hover:text-amber-700">
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Agents Grid */}
        {filteredAgents.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border">
            <p className="text-gray-500">No agents match your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAgents.map((agent) => (
              <Link href={`/agents/${agent.id}`} key={agent.id} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border h-full flex flex-col">
                  <div className="relative h-72 overflow-hidden bg-gray-200">
                    <OptimizedImage
                      src={agent.image}
                      alt={agent.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      className="group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                          {agent.name}
                        </h3>
                        <p className="text-amber-600 font-medium text-sm">{agent.title}</p>
                      </div>
                      {agent.yearsExperience && (
                        <div className="flex items-center gap-1 text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full">
                          <Award className="w-3 h-3" />
                          {agent.yearsExperience}+ yrs
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {agent.specialty?.slice(0, 3).map((spec, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          {spec}
                        </span>
                      ))}
                      {agent.specialty?.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          +{agent.specialty.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100 mt-auto">
                      <div className="flex items-center gap-1">
                        <Home className="w-4 h-4" />
                        <span><strong>{agent.activeListings}</strong> active listings</span>
                      </div>
                      {agent.languages && agent.languages.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Globe className="w-4 h-4" />
                          <span>{agent.languages.slice(0, 2).join(', ')}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => handleCall(e, agent.phone)}
                          className="p-2 bg-gray-50 rounded-full hover:bg-gray-900 hover:text-white transition-colors"
                          aria-label={`Call ${agent.name}`}
                        >
                          <Phone className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleEmail(e, agent.email)}
                          className="p-2 bg-gray-50 rounded-full hover:bg-gray-900 hover:text-white transition-colors"
                          aria-label={`Email ${agent.name}`}
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-amber-600 font-medium text-sm flex items-center">
                        View Profile
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Join Team CTA */}
        <div className="mt-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Join Our Elite Team</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-6">
            Are you a top‑performing real estate professional? Join Prime Estate and elevate your career.
          </p>
          <Link
            href="/careers"
            className="inline-flex items-center px-6 py-3 bg-white text-amber-600 rounded-xl font-medium hover:bg-gray-100 transition-colors"
          >
            Explore Careers
            <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </main>

    </div>
  );
}