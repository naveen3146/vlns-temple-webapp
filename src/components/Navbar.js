import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-yellow-100 shadow p-4 flex flex-wrap justify-around text-lg font-semibold">
      <Link to="/">Home</Link>
      <Link to="/about">About Temple</Link>
      <Link to="/services">Services</Link>
      <Link to="/events">Events</Link>
      <Link to="/gallery">Gallery</Link>
      <Link to="/videos">Videos</Link>
      <Link to="/prasadam">Prasadam</Link>
      <Link to="/donations">Donations</Link>
      <Link to="/contact">Contact Us</Link>
    </nav>
  );
}

export default Navbar;