import React from "react";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen justify-between bg-yellow-50">
      <div className="w-full max-w-4xl mx-auto bg-white bg-opacity-95 rounded-xl shadow-2xl mt-12 mb-8 p-6 flex flex-col items-center border border-yellow-200">
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-900 mb-4 text-center">
          శ్రీభూ వరాహ లక్ష్మీ నరసింహ స్వామి వారి దేవస్థానం
        </h1>
      <p className="text-base md:text-lg text-yellow-800 mb-6 text-center">
          A sacred Hindu temple dedicated to Lakshmi Narasimha Swamy, located in the PolakamPadu, Andhra Pradesh.
        </p>
        <img
          src="/images/Home_tab_image.jpeg"
          alt="Temple God"
          className="w-full max-w-3xl h-auto rounded-lg shadow-lg border-4 border-yellow-200"
        />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;