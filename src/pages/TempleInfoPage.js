// filepath: /Users/naveengudipudi/workspace/temple_web_workspace/vlns-temple-app/src/pages/TempleInfoPage.js
import React from "react";

function TempleInfoPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-3xl font-bold mb-4 text-yellow-900">Temple Information</h2>
      <p className="mb-4">
        <strong>Temple Timings:</strong> 6:00 AM – 8:00 PM
      </p>
      <p className="mb-4">
        <strong>Address:</strong> FJQ2+F6C, Polkampadu, Andhra Pradesh 522501, India
      </p>
      <p className="mb-4">
        <strong>About:</strong> Sri Varaha Lakshmi Narasimha Swamy Temple is a sacred Hindu temple dedicated to Lakshmi Narasimha Swamy, located in Polkampadu, Andhra Pradesh.
      </p>
      {/* Add more info as needed */}
    </div>
  );
}

export default TempleInfoPage;