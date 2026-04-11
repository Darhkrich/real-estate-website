'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { agents } from '@/data/agents';

export const dynamic = 'force-dynamic';

// Inner component that safely uses useSearchParams
function ContactContent() {
  const searchParams = useSearchParams();
  const subjectParam = searchParams.get('subject');

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: subjectParam === 'list' ? 'List My Property' : '', message: '', preferredAgent: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (subjectParam === 'list') {
      setFormData((prev) => ({ ...prev, subject: 'List My Property' }));
    }
  }, [subjectParam]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    console.log('Contact form:', formData);
    setIsSubmitting(false);
    setFormSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '', preferredAgent: '' });
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const officeInfo = {
    address: '100 Luxury Lane, Penthouse\nNew York, NY 10012',
    phone: agents[0]?.phone || '+1 (212) 555-0199',
    email: 'concierge@primeestate.com',
    hours: [
      { day: 'Monday - Friday', time: '9:00 AM - 7:00 PM' },
      { day: 'Saturday', time: '10:00 AM - 5:00 PM' },
      { day: 'Sunday', time: 'By Appointment' },
    ],
  };

  return (
    <>
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 pt-20 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Contact Us</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">Let&apos;s discuss your real estate goals.</p>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-serif font-bold mb-6">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-amber-600 mt-0.5" /><div><p className="font-medium">Office Address</p><p className="text-gray-600 whitespace-pre-line">{officeInfo.address}</p></div></div>
                <div className="flex items-start gap-3"><Phone className="w-5 h-5 text-amber-600 mt-0.5" /><div><p className="font-medium">Phone</p><a href={`tel:${officeInfo.phone.replace(/\D/g, '')}`} className="text-gray-600 hover:text-amber-600">{officeInfo.phone}</a></div></div>
                <div className="flex items-start gap-3"><Mail className="w-5 h-5 text-amber-600 mt-0.5" /><div><p className="font-medium">Email</p><a href={`mailto:${officeInfo.email}`} className="text-gray-600 hover:text-amber-600">{officeInfo.email}</a></div></div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-serif font-bold mb-4">Business Hours</h2>
              <div className="space-y-2">{officeInfo.hours.map((h, i) => <div key={i} className="flex justify-between text-sm"><span className="text-gray-600">{h.day}</span><span className="font-medium">{h.time}</span></div>)}</div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border">
              <h2 className="text-2xl font-serif font-bold mb-2">Send Us a Message</h2>
              <p className="text-gray-500 mb-6">Fill out the form below and we&apos;ll get back to you.</p>
              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-800 mb-2">Thank You!</h3>
                  <p className="text-green-600">Your message has been received.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label><input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border rounded-xl" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Email *</label><input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border rounded-xl" /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border rounded-xl" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label><select name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border rounded-xl"><option value="">Select</option><option>General Inquiry</option><option>Property Question</option><option>List My Property</option><option>Schedule Viewing</option></select></div>
                  </div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Preferred Agent</label><select name="preferredAgent" value={formData.preferredAgent} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border rounded-xl"><option value="">No preference</option>{agents.map((a) => <option key={a.id} value={a.name}>{a.name} - {a.title}</option>)}</select></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Message *</label><textarea name="message" rows="5" value={formData.message} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border rounded-xl resize-none" /></div>
                  <button type="submit" disabled={isSubmitting} className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-amber-600 disabled:opacity-50">{isSubmitting ? 'Sending...' : <><Send className="w-4 h-4 mr-2" /> Send Message</>}</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// Default export wraps ContactContent in Suspense (required by Next.js for useSearchParams)
export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    }>
      <ContactContent />
    </Suspense>
  );
}