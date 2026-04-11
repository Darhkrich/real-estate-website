import { CheckCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Accessibility Statement | Prime Estate',
  description: 'Our commitment to digital accessibility for all users.',
};

export default function AccessibilityPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 pt-24 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Accessibility Statement</h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">We are committed to ensuring digital accessibility for people with disabilities.</p>
      </div>

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h2 className="text-2xl font-serif font-bold">Our Commitment</h2>
          </div>
          <p className="text-gray-700 mb-4">Prime Estate is dedicated to providing a website that is accessible to the widest possible audience.</p>
          <h3 className="text-lg font-bold mt-6 mb-3">Conformance Status</h3>
          <p className="text-gray-700 mb-4">We aim to conform to WCAG 2.1 Level AA standards.</p>
          <h3 className="text-lg font-bold mt-6 mb-3">Measures We Take</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Regular accessibility audits and user testing.</li>
            <li>Keyboard navigable interface.</li>
            <li>Sufficient color contrast.</li>
            <li>Alternative text for images.</li>
          </ul>
          <h3 className="text-lg font-bold mt-6 mb-3">Feedback</h3>
          <p className="text-gray-700 mb-4">If you encounter any accessibility barriers, please let us know:</p>
          <ul className="space-y-2 text-gray-700">
            <li>Email: <a href="mailto:accessibility@primeestate.com" className="text-amber-600">accessibility@primeestate.com</a></li>
            <li>Phone: +1 (212) 555-0199</li>
          </ul>
          <p className="text-sm text-gray-500 mt-8">Last updated: April 1, 2025.</p>
        </div>
      </main>
    </>
  );
}