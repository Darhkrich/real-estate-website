import Link from 'next/link';
import { Briefcase, Star, TrendingUp, Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Careers | Prime Estate',
  description: 'Join our team of elite real estate professionals and elevate your career with unparalleled support and exclusive listings.',
};

const openings = [
  { title: 'Senior Luxury Real Estate Agent', location: 'New York, NY', type: 'Full-time' },
  { title: 'New Development Specialist', location: 'Miami, FL', type: 'Full-time' },
  { title: 'Marketing & Brand Manager', location: 'Los Angeles, CA', type: 'Full-time' },
  { title: 'Client Concierge Coordinator', location: 'New York, NY', type: 'Full-time' },
];

export default function CareersPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 pt-24 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Join Prime Estate</h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Elevate your career with a firm that values excellence, integrity, and growth.
        </p>
      </div>

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 py-12 w-full">
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-serif font-bold mb-6 text-center">Why Work With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <TrendingUp className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-1">Unlimited Growth</h3>
                <p className="text-gray-600 text-sm">Access to exclusive listings, mentorship from top producers, and a clear path to leadership.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Star className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-1">Premium Brand</h3>
                <p className="text-gray-600 text-sm">Represent a globally recognized luxury brand with a reputation for excellence.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Users className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-1">Collaborative Culture</h3>
                <p className="text-gray-600 text-sm">Work alongside industry veterans who share knowledge and celebrate collective success.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Briefcase className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-1">Best-in-Class Tools</h3>
                <p className="text-gray-600 text-sm">Cutting-edge technology, marketing support, and administrative assistance.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-serif font-bold mb-6">Open Positions</h2>
          <div className="space-y-3">
            {openings.map((job, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50">
                <div>
                  <p className="font-semibold text-gray-900">{job.title}</p>
                  <p className="text-sm text-gray-500">{job.location} · {job.type}</p>
                </div>
                <Link href={`/contact?subject=Application: ${encodeURIComponent(job.title)}`} className="mt-3 sm:mt-0 text-amber-600 text-sm font-medium hover:text-amber-700">
                  Apply Now →
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center bg-amber-50 rounded-2xl p-8 border border-amber-100">
          <h2 className="text-2xl font-serif font-bold mb-2">Don't See Your Role?</h2>
          <p className="text-gray-600 mb-6">We're always looking for exceptional talent. Send us your resume.</p>
          <Link href="/contact?subject=General Application" className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-amber-600">
            Contact Us
          </Link>
        </section>
      </main>
    </>
  );
}