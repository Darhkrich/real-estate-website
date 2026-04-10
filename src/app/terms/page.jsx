import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms of Service | Prime Estate',
  description: 'Terms and conditions for using the Prime Estate website and services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 pt-24 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
          Terms of Service
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Please read these terms carefully before using our website and services.
        </p>
      </div>

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 prose prose-gray max-w-none">
          <p className="text-sm text-gray-500 mb-8">Last Updated: April 1, 2025</p>

          <h2 className="text-xl font-bold mt-0">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Prime Estate website, you agree to be bound by these Terms of Service.
            If you do not agree, please do not use our site.
          </p>

          <h2 className="text-xl font-bold">2. Use of the Website</h2>
          <p>
            You may use our website for lawful purposes only. You agree not to:
          </p>
          <ul className="list-disc pl-5">
            <li>Violate any applicable laws or regulations.</li>
            <li>Impersonate any person or entity.</li>
            <li>Interfere with the proper working of the website.</li>
            <li>Attempt to gain unauthorized access to any portion of the site.</li>
          </ul>

          <h2 className="text-xl font-bold">3. Property Listings</h2>
          <p>
            Property information on this website is deemed reliable but not guaranteed. All information should be
            verified by the buyer or their agent. Prices and availability are subject to change without notice.
          </p>

          <h2 className="text-xl font-bold">4. Intellectual Property</h2>
          <p>
            All content on this website, including text, images, logos, and software, is the property of Prime Estate
            or its licensors and is protected by copyright and trademark laws. You may not reproduce, distribute,
            or create derivative works without our express written permission.
          </p>

          <h2 className="text-xl font-bold">5. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the content or privacy
            practices of those sites.
          </p>

          <h2 className="text-xl font-bold">6. Disclaimer of Warranties</h2>
          <p>
            The website is provided "as is" without warranties of any kind, either express or implied. Prime Estate
            does not warrant that the site will be uninterrupted or error-free.
          </p>

          <h2 className="text-xl font-bold">7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Prime Estate shall not be liable for any indirect, incidental,
            special, or consequential damages arising out of or in connection with your use of the website.
          </p>

          <h2 className="text-xl font-bold">8. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of New York,
            without regard to its conflict of law provisions.
          </p>

          <h2 className="text-xl font-bold">9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Your continued use of the website after changes
            are posted constitutes acceptance of the revised Terms.
          </p>

          <h2 className="text-xl font-bold">10. Contact</h2>
          <p>Questions about these Terms? Contact us at:</p>
          <p>
            Prime Estate<br />
            Email: legal@primeestate.com<br />
            Phone: +1 (212) 555-0199
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}