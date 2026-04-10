import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Award, Users, Target, Home } from 'lucide-react';

export const metadata = {
  title: 'About Us | Prime Estate',
  description: 'Discover the story behind Prime Estate – a luxury real estate firm built on trust, expertise, and an unwavering commitment to excellence.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 pt-24 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
          About Prime Estate
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Redefining luxury real estate through integrity, market intelligence, and a deeply personal approach.
        </p>
      </div>

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 py-12 w-full">
        {/* Our Story */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-serif font-bold mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Founded in 2010 by a group of visionary real estate professionals, Prime Estate was born from a simple belief:
            that buying or selling a luxury home should be as exceptional as the property itself. What began as a boutique
            firm in Manhattan has grown into a global network of elite agents, each hand‑selected for their market expertise
            and unwavering dedication to client success.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Today, we represent some of the world's most distinguished properties – from oceanfront villas in Malibu
            to historic brownstones in Boston. Our approach remains personal, our standards uncompromising, and our results
            speak for themselves.
          </p>
        </section>

        {/* Mission & Values */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 text-center">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Our Mission</h3>
            <p className="text-gray-600 text-sm">
              To connect discerning clients with extraordinary properties through unmatched market knowledge and white‑glove service.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 text-center">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Our Values</h3>
            <p className="text-gray-600 text-sm">
              Integrity, discretion, and an obsessive attention to detail guide every decision we make.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 text-center">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Our Promise</h3>
            <p className="text-gray-600 text-sm">
              A seamless, stress‑free experience that exceeds expectations – from first viewing to final closing.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-gray-900 rounded-2xl p-8 text-white mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-amber-400">$2.5B+</p>
              <p className="text-gray-300 mt-1">in closed transactions</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-amber-400">15+</p>
              <p className="text-gray-300 mt-1">years of excellence</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-amber-400">500+</p>
              <p className="text-gray-300 mt-1">luxury homes sold</p>
            </div>
          </div>
        </section>

        {/* Team CTA */}
        <section className="text-center bg-amber-50 rounded-2xl p-8 border border-amber-100">
          <h2 className="text-2xl font-serif font-bold mb-2">Meet Our Experts</h2>
          <p className="text-gray-600 mb-6">
            Our agents are industry leaders with deep local knowledge and a passion for luxury real estate.
          </p>
          <a
            href="/agents"
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors"
          >
            View Our Agents
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}