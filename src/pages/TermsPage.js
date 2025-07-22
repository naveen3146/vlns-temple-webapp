import React from "react";

function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-3xl font-bold mb-4 text-yellow-900">Terms of Service</h2>
      <p className="mb-4">
        By accessing and using this website, you agree to the following terms and conditions.
      </p>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li>This website is for informational purposes about Sri Varaha Lakshmi Narasimha Swamy Temple.</li>
        <li>All content, images, and information are property of the temple or respective owners.</li>
        <li>You may not copy, reproduce, or distribute content without permission.</li>
        <li>We are not responsible for any inaccuracies or damages resulting from use of this site.</li>
        <li>We may update these terms at any time. Please check this page regularly.</li>
        <li>For questions, contact us at info@temple.com.</li>
      </ul>
      <p>
        Please also review our <a href="/privacy" className="text-yellow-700 underline">Privacy Policy</a>.
      </p>
    </div>
  );
}

export default TermsPage;