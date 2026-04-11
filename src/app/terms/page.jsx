export const dynamic = 'force-dynamic';


export const metadata = {
  title: 'Terms of Service | Prime Estate',
  description: 'Terms and conditions for using the Prime Estate website and services.',
};

export default function TermsPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 pt-24 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">Please read these terms carefully before using our website.</p>
      </div>

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 prose prose-gray max-w-none">
          <p className="text-sm text-gray-500 mb-8">Last Updated: April 1, 2025</p>
          <h2 className="text-xl font-bold mt-0">1. Acceptance of Terms</h2>
          <p>By using our website, you agree to these Terms of Service.</p>
          <h2 className="text-xl font-bold">2. Use of the Website</h2>
          <p>You may use our website for lawful purposes only.</p>
          <h2 className="text-xl font-bold">3. Property Listings</h2>
          <p>Property information is deemed reliable but not guaranteed. Verify all information independently.</p>
          <h2 className="text-xl font-bold">4. Intellectual Property</h2>
          <p>All content on this website is the property of Prime Estate and protected by copyright laws.</p>
          <h2 className="text-xl font-bold">5. Third-Party Links</h2>
          <p>We are not responsible for the content or privacy practices of third-party sites.</p>
          <h2 className="text-xl font-bold">6. Disclaimer of Warranties</h2>
          <p>The website is provided "as is" without warranties of any kind.</p>
          <h2 className="text-xl font-bold">7. Limitation of Liability</h2>
          <p>Prime Estate shall not be liable for any indirect, incidental, or consequential damages.</p>
          <h2 className="text-xl font-bold">8. Governing Law</h2>
          <p>These Terms shall be governed by the laws of the State of New York.</p>
          <h2 className="text-xl font-bold">9. Changes to Terms</h2>
          <p>We reserve the right to modify these Terms at any time.</p>
          <h2 className="text-xl font-bold">10. Contact</h2>
          <p>Questions? Contact us at <a href="mailto:legal@primeestate.com" className="text-amber-600">legal@primeestate.com</a>.</p>
        </div>
      </main>
    </>
  );
}