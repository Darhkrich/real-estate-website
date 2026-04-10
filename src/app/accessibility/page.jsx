import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Accessibility Statement | Prime Estate',
  description: 'Our commitment to digital accessibility for all users.',
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 pt-24 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
          Accessibility Statement
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          We are committed to ensuring digital accessibility for people with disabilities.
        </p>
      </div>

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h2 className="text-2xl font-serif font-bold">Our Commitment</h2>
          </div>

          <p className="text-gray-700 mb-4">
            Prime Estate is dedicated to providing a website that is accessible to the widest possible audience,
            regardless of technology or ability. We are actively working to increase the accessibility and usability
            of our website and in doing so adhere to many of the available standards and guidelines.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">Conformance Status</h3>
          <p className="text-gray-700 mb-4">
            The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to
            improve accessibility for people with disabilities. We aim to conform to WCAG 2.1 Level AA standards.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">Measures We Take</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Regular accessibility audits and user testing.</li>
            <li>Keyboard navigable interface.</li>
            <li>Sufficient color contrast for text and interactive elements.</li>
            <li>Alternative text for all meaningful images.</li>
            <li>Semantic HTML structure for screen reader compatibility.</li>
            <li>Resizable text without loss of functionality.</li>
          </ul>

          <h3 className="text-lg font-bold mt-6 mb-3">Feedback</h3>
          <p className="text-gray-700 mb-4">
            We welcome your feedback on the accessibility of the Prime Estate website. If you encounter any
            accessibility barriers, please let us know:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>Email: <a href="mailto:accessibility@primeestate.com" className="text-amber-600">accessibility@primeestate.com</a></li>
            <li>Phone: +1 (212) 555-0199</li>
            <li>Mailing Address: 100 Luxury Lane, Penthouse, New York, NY 10012</li>
          </ul>

          <p className="text-sm text-gray-500 mt-8">
            This statement was last updated on April 1, 2025.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}