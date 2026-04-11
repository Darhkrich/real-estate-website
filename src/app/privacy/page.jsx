export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Privacy Policy | Prime Estate',
  description: 'Learn how Prime Estate collects, uses, and protects your personal information.',
};



export default function PrivacyPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 pt-24 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">Your privacy is important to us.</p>
      </div>

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 prose prose-gray max-w-none">
          <p className="text-sm text-gray-500 mb-8">Last Updated: April 1, 2025</p>
          <h2 className="text-xl font-bold mt-0">1. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, or communicate with our agents.</p>
          <h2 className="text-xl font-bold">2. How We Use Your Information</h2>
          <p>We use the information to respond to inquiries, send property alerts, improve our services, and comply with legal obligations.</p>
          <h2 className="text-xl font-bold">3. Sharing Your Information</h2>
          <p>We do not sell, rent, or trade your personal information to third parties for their marketing purposes.</p>
          <h2 className="text-xl font-bold">4. Cookies and Tracking</h2>
          <p>Our website uses cookies to enhance your browsing experience. You can control cookie settings through your browser.</p>
          <h2 className="text-xl font-bold">5. Data Security</h2>
          <p>We implement reasonable security measures to protect your personal information.</p>
          <h2 className="text-xl font-bold">6. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal information. Contact us at <a href="mailto:privacy@primeestate.com" className="text-amber-600">privacy@primeestate.com</a>.</p>
          <h2 className="text-xl font-bold">7. Changes to This Policy</h2>
          <p>We may update this policy. We will notify you of any changes by posting the new policy on this page.</p>
          <h2 className="text-xl font-bold">8. Contact Us</h2>
          <p>Prime Estate<br />100 Luxury Lane, Penthouse<br />New York, NY 10012<br />Email: privacy@primeestate.com<br />Phone: +1 (212) 555-0199</p>
        </div>
      </main>
    </>
  );
}