import React from "react";

function Footer() {
  return (
    <footer className="bg-yellow-100 text-gray-800 py-6 mt-12 w-full shadow-inner">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="font-semibold text-center mb-2">
          Sri Varaha Lakshmi Narasimha Swamy Temple
          <br />
          <span className="text-sm text-gray-600">శ్రీ వరాహ లక్ష్మి నరసింహ స్వామి ఆలయం</span>
          <br />
          <span className="text-sm">FJQ2+F6C, Polkampadu, Andhra Pradesh 522501, India</span>
        </div>
        <div className="flex space-x-4 mb-2">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-700">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-700">Instagram</a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-700">YouTube</a>
        </div>
        <div className="flex flex-wrap justify-center space-x-4 text-sm mb-2">
          <a href="/privacy" className="hover:text-yellow-700">Privacy Policy</a>
          <a href="/terms" className="hover:text-yellow-700">Terms of Service</a>
          <a href="/temple-info" className="hover:text-yellow-700">Temple Info</a>
        </div>
        <div className="text-center text-xs mt-2">
          © {new Date().getFullYear()} Sri Varaha Lakshmi Narasimha Swamy Temple
        </div>
      </div>
    </footer>
  );
}

export default Footer;