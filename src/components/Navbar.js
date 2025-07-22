import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-yellow-100 shadow p-4 flex flex-wrap items-center justify-around text-lg font-semibold">
      {/* Emblem on the left */}
      <Link to="/" className="flex items-center mr-4">
        <img
          src="/images/VLNS_Swami_Emblem.png"
          alt="Temple Emblem"
          className="w-16 h-16 object-contain rounded-full shadow"
        />
      </Link>
      {/* Navigation links */}
      <div className="flex-1 flex justify-around">
        <Link to="/">Home</Link>
        <Link to="/about">About Temple</Link>
        <Link to="/services">Services</Link>
        <Link to="/events">Events</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/videos">Videos</Link>
        <Link to="/prasadam">Prasadam</Link>
        <Link to="/donations">Donations</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
    </nav>
  );
}

export default Navbar;