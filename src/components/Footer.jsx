'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Linkedin,
  Twitter,
} from 'lucide-react';
import { agents } from '@/data/agents';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setIsSubmitted(true);
    setEmail('');
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const mainOffice = {
    address: '100 Luxury Lane, Penthouse\nNew York, NY 10012',
    phone: agents[0]?.phone || '+1 (000) 123-5467',
    email: 'info@pcompanyemail.com',
  };



  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 overflow-hidden">
      <div className="bg-[#0a0a0a] border-t border-white/10 pt-12 md:pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          {/* Main Grid - Centered on mobile, left on desktop */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 mb-12">
            
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-5 text-center md:text-left">
              <Link
                href="/"
                className="text-3xl font-serif font-bold tracking-tighter text-white inline-block"
              >
                COMPANY<span className="text-amber-400">NAME</span>
                <span className="text-amber-400">.</span>
              </Link>
              <p className="text-gray-200 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
                Curating the world's most exceptional properties. Experience luxury living
                with uncompromising architectural beauty and design.
              </p>
              
            </div>

            {/* Explore Links */}
            <div className="lg:col-span-2 text-center md:text-left">
              <h4 className="text-white font-semibold mb-5 uppercase tracking-wider text-xs">
                Explore
              </h4>
              <ul className="space-y-3 text-white">
                <li className="flex justify-center md:justify-start">
                  <FooterLink href="/properties?status=buy">Buy a Home</FooterLink>
                </li>
                <li className="flex justify-center md:justify-start">
                  <FooterLink href="/properties?status=rent">Rentals</FooterLink>
                </li>
                <li className="flex justify-center md:justify-start">
                  <FooterLink href="/properties?status=new">New Developments</FooterLink>
                </li>
                <li className="flex justify-center md:justify-start">
                  <FooterLink href="/agents">Our Agents</FooterLink>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div className="lg:col-span-2 text-center md:text-left">
              <h4 className="text-white font-semibold mb-5 uppercase tracking-wider text-xs">
                Company
              </h4>
              <ul className="space-y-3">
                <li className="flex justify-center md:justify-start">
                  <FooterLink href="/about">About Us</FooterLink>
                </li>
                <li className="flex justify-center md:justify-start">
                  <FooterLink href="/careers">Careers</FooterLink>
                </li>
                <li className="flex justify-center md:justify-start">
                  <FooterLink href="/press">Press</FooterLink>
                </li>
                <li className="flex justify-center md:justify-start">
                  <FooterLink href="/contact">Contact</FooterLink>
                </li>
                <li className="flex justify-center md:justify-start">
                  <FooterLink href="/accessibility">Accessibility</FooterLink>
                </li>
                <li className="flex justify-center md:justify-start">
                  <FooterLink href="/terms">Terms of Service</FooterLink>
                </li>
                <li className="flex justify-center md:justify-start">
                  <FooterLink href="/privacy">Privacy Policy</FooterLink>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 text-center md:text-left">
              <h4 className="text-white font-semibold mb-5 uppercase tracking-wider text-xs">
                Connect
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start justify-center md:justify-start">
                  <MapPin className="w-5 h-5 mr-3 mt-0.5 text-amber-400 flex-shrink-0" />
                  <span className="text-gray-200 text-sm leading-relaxed whitespace-pre-line text-left">
                    {mainOffice.address}
                  </span>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <Phone className="w-5 h-5 mr-3 text-amber-400 flex-shrink-0" />
                  <a
                    href={`tel:${mainOffice.phone.replace(/\D/g, '')}`}
                    className="text-gray-200 hover:text-white transition-colors text-sm"
                  >
                    {mainOffice.phone}
                  </a>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <Mail className="w-5 h-5 mr-3 text-amber-400 flex-shrink-0" />
                  <a
                    href={`mailto:${mainOffice.email}`}
                    className="text-gray-200 hover:text-white transition-colors text-sm"
                  >
                    {mainOffice.email}
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-2 text-center md:text-left">
              <h4 className="text-white font-semibold mb-5 uppercase tracking-wider text-xs">
                Private List
              </h4>
              <p className="text-gray-200 text-sm mb-4 mx-auto md:mx-0 max-w-xs md:max-w-none">
                Exclusive off-market listings delivered to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="relative max-w-sm mx-auto md:mx-0">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 px-4 py-3.5 pr-14 rounded-xl focus:outline-none focus:bg-white/15 focus:border-amber-400/50 transition-all text-sm"
                  required
                  disabled={isSubmitted}
                />
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-amber-500 hover:bg-amber-400 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              {isSubmitted && (
                <p className="text-amber-400 text-xs mt-2 font-medium">
                  ✓ Thank you for subscribing!
                </p>
              )}
            </div>
          </div>

          {/* Bottom Bar - Centered on mobile */}
          <div className="border-t border-white/10 pt-6 flex flex-col items-center text-center sm:flex-row sm:justify-between text-xs text-gray-300">
            <p className="mb-3 sm:mb-0">&copy; {currentYear} DevMasters. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className="text-gray-200 hover:text-amber-400 transition-colors inline-flex items-center group text-sm font-medium"
    >
      <span className="w-0 h-px bg-amber-400 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300" />
      {children}
    </Link>
  );
}