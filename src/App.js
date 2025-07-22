import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import EventsPage from "./pages/EventsPage";
import GalleryPage from "./pages/GalleryPage";
import VideosPage from "./pages/VideosPage";
import ContactPage from "./pages/ContactPage";
import PrasadamPage from "./pages/PrasadamPage";
import DonationPage from "./pages/DonationPage";
import TempleInfoPage from "./pages/TempleInfoPage";
import TermsPage from "./pages/TermsPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/prasadam" element={<PrasadamPage />} />
        <Route path="/donations" element={<DonationPage />} />
        <Route path="/temple-info" element={<TempleInfoPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
