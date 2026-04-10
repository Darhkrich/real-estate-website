import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


export const metadata = {
  title: 'Privacy Policy | Prime Estate',
  description: 'Learn how Prime Estate collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 pt-24 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Your privacy is important to us. This policy explains how we handle your information.
        </p>
      </div>

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 prose prose-gray max-w-none">
          <p className="text-sm text-gray-500 mb-8">Last Updated: April 1, 2025</p>

          <h2 className="text-xl font-bold mt-0">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you fill out a contact form,
            subscribe to our newsletter, or communicate with our agents. This may include your name,
            email address, phone number, and property preferences.
          </p>

          <h2 className="text-xl font-bold">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-5">
            <li>Respond to your inquiries and provide requested services.</li>
            <li>Send you property alerts, newsletters, and marketing communications (you may opt out at any time).</li>
            <li>Improve our website and services.</li>
            <li>Comply with legal obligations.</li>
          </ul>

          <h2 className="text-xl font-bold">3. Sharing Your Information</h2>
          <p>
            We do not sell, rent, or trade your personal information to third parties for their marketing purposes.
            We may share information with trusted service providers who assist us in operating our website and
            conducting our business, provided they agree to keep this information confidential.
          </p>

          <h2 className="text-xl font-bold">4. Cookies and Tracking</h2>
          <p>
            Our website uses cookies to enhance your browsing experience, analyze site traffic, and personalize content.
            You can control cookie settings through your browser.
          </p>

          <h2 className="text-xl font-bold">5. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your personal information from unauthorized access,
            disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
          </p>

          <h2 className="text-xl font-bold">6. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. You may also opt out of
            marketing communications at any time. To exercise these rights, please contact us at{' '}
            <a href="mailto:privacy@primeestate.com" className="text-amber-600">
              privacy@primeestate.com
            </a>.
          </p>

          <h2 className="text-xl font-bold">7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
            new policy on this page. Your continued use of our services after such changes constitutes acceptance.
          </p>

          <h2 className="text-xl font-bold">8. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at:</p>
          <p>
            Prime Estate<br />
            100 Luxury Lane, Penthouse<br />
            New York, NY 10012<br />
            Email: privacy@primeestate.com<br />
            Phone: +1 (212) 555-0199
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}