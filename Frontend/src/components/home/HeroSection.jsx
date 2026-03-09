import React from "react";
import heroBg from "../../assets/images/hero.jpg";

const HeroSection = () => {
  return (
    <section id='home'
      className="relative min-h-[520px] flex items-center bg-cover bg-left"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/50"></div>

      {/* Content */}
      <div className="relative max-w-7xl px-8 lg:px-16 py-45">

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Welcome to Training <br /> & Placement Cell
        </h1>

        <p className="mt-3 text-gray-600 font-medium">
          RK University
        </p>

        <p className="mt-4 max-w-lg text-gray-700">
          Empowering students to achieve their career aspirations through
          industry connections and comprehensive placement support.
        </p>

        <button className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
          Register as Student →
        </button>

      </div>
    </section>
  );
};

export default HeroSection;