import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Newspaper, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Press & Media | Prime Estate',
  description: 'Latest news, media coverage, and press releases from Prime Estate.',
};

export default function PressPage() {
  const articles = [
    {
      outlet: 'The Wall Street Journal',
      title: 'Prime Estate Closes Record-Breaking Penthouse Sale',
      date: 'March 15, 2025',
      url: '#',
    },
    {
      outlet: 'Forbes',
      title: 'How Prime Estate is Redefining Luxury Real Estate in 2025',
      date: 'February 28, 2025',
      url: '#',
    },
    {
      outlet: 'Mansion Global',
      title: 'Exclusive: Inside the Malibu Villa Listed by Prime Estate',
      date: 'January 20, 2025',
      url: '#',
    },
    {
      outlet: 'The Real Deal',
      title: 'Prime Estate Expands to Miami with New Development Division',
      date: 'December 5, 2024',
      url: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 pt-24 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
          Press & Media
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Latest news and media coverage about Prime Estate.
        </p>
      </div>

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 py-12 w-full">
        {/* Media Contact */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-serif font-bold mb-4">Media Inquiries</h2>
          <p className="text-gray-700 mb-4">
            For press inquiries, interview requests, or media assets, please contact our communications team.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:press@primeestate.com"
              className="inline-flex items-center px-5 py-2 bg-gray-900 text-white rounded-xl hover:bg-amber-600 transition-colors"
            >
              press@primeestate.com
            </a>
            <a
              href="tel:+12125550199"
              className="inline-flex items-center px-5 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              +1 (212) 555-0199
            </a>
          </div>
        </section>

        {/* Recent Coverage */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <Newspaper className="w-5 h-5 text-amber-600" />
            <h2 className="text-2xl font-serif font-bold">Recent Coverage</h2>
          </div>
          <div className="space-y-4">
            {articles.map((article, idx) => (
              <div
                key={idx}
                className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
              >
                <p className="text-sm text-amber-600 font-medium mb-1">{article.outlet}</p>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{article.title}</h3>
                    <p className="text-sm text-gray-500">{article.date}</p>
                  </div>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Read article"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Press Kit - Static Link */}
        <section className="mt-8 text-center bg-gray-100 rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-2">Download Press Kit</h2>
          <p className="text-gray-600 mb-4">
            Brand assets, executive bios, and high-resolution photography.
          </p>
          <a
            href="/press-kit.pdf"
            download
            className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Download (PDF)
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}