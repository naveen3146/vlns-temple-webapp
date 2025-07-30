import React from "react";

function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 bg-white rounded-lg shadow-lg mt-8">
      <h1 className="text-3xl font-bold text-yellow-900 mb-2">Contact Us</h1>
      <nav className="text-sm mb-4 text-gray-600">
        <a href="/" className="hover:underline">Home</a> &gt; Contact Us
      </nav>
      <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
      <blockquote className="italic text-gray-700 mb-2">
        దేవతా కార్య సిద్ధ్యర్థం సభా స్థంభ సముద్భవమ్ |<br />
        శ్రీ నృసింహం మహావీరం నమామి ఋణ ముక్తయే ||
      </blockquote>
      <p className="mb-4 text-gray-600">
        <strong>దేవతల పనులు (కార్యాలు) సిద్ధించేందుకు, సభా మందిరంలోని స్థంభం నుండి ఆవిర్భవించిన, మహాప్రతాపశాలి అయిన శ్రీ నృసింహ స్వామిని, ఋణముల నుండి విముక్తి (విడుదల) కోసం నేను నమస్కరిస్తున్నాను.</strong>
      </p>
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-yellow-800 mb-1">Visit us</h3>
        <p className="mb-2">Sri Varaha Lakshmi Narasimha Swamy Temple is open every day.</p>
        <p className="text-gray-700">FJQ2+F6C, Polkampadu, Andhra Pradesh 522501, India</p> 
      </div>
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-yellow-800 mb-1">Call us</h3>
        <p className="mb-2">Call us to book temple services or for information.</p>
        <p className="text-gray-700">+91-12345-67890</p>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-yellow-800 mb-1">Contact us</h3>
        <p className="mb-2">Email us to know more about events.</p>
        <p className="text-gray-700">info@temple.com</p>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-yellow-800 mb-1">Follow us on Facebook for Updates</h3>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:underline"
        >
          Facebook
        </a>
      </div>
      <div className="my-8">
        <h3 className="text-xl font-bold mb-2">Temple Location</h3>
        <iframe
          title="Temple Location"
          width="100%"
          height="350"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps?q=Sri+Varaha+Lakshmi+Narasimha+Swamy+Temple,+FJQ2%2BF6C,+Polkampadu,+Andhra+Pradesh+522501,+India&output=embed"
        ></iframe>
      </div>
      <hr className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div>
          <h4 className="font-semibold mb-1">Useful Pages</h4>
          <ul className="list-disc list-inside text-gray-700">
            <li><a href="/about" className="hover:underline">About Temple</a></li>
            <li><a href="/events" className="hover:underline">Events</a></li>
            <li><a href="/services" className="hover:underline">Services</a></li>
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-1">Contact Information</h4>
          <p className="text-gray-700 mb-1">+91-12345-67890</p>
          <p className="text-gray-700 mb-1">FJQ2+F6C, Polkampadu, Andhra Pradesh 522501, India</p>
          <p className="text-gray-700 mb-1">info@temple.com</p>
          <div className="flex space-x-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">Facebook</a>
            <a href="mailto:info@temple.com" className="hover:text-yellow-700">Email</a>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-8">
        Copyright © {new Date().getFullYear()} Sri Varaha Lakshmi Narasimha Swamy Temple.
      </div>
    </div>
  );
}

export default ContactPage;