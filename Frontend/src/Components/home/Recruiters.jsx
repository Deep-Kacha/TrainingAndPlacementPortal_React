import React from "react";

import gateway from "../../assets/images/Recrutiers/gateway.jpg";
import multiicon from "../../assets/images/Recrutiers/multiicon.jpg";
import qtonz from "../../assets/images/Recrutiers/qtonz.png";
import rkit from "../../assets/images/Recrutiers/rkit.jpg";
import infinity from "../../assets/images/Recrutiers/infinity.jpg";
import tcs from "../../assets/images/Recrutiers/tcs.jpg";
import rtcamp from "../../assets/images/Recrutiers/rtcamp.png";

const Recruiters = () => {

  const companies = [gateway, multiicon, qtonz, rkit, infinity, tcs, rtcamp];

  return (
    <section id="recruiters" className="py-12 sm:py-16 bg-gray-100 overflow-hidden">

      {/* Heading */}
      <div className="text-center mb-8 sm:mb-14 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Our Top Recruiters
        </h2>

        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Trusted by leading organizations worldwide
        </p>
      </div>

      {/* Slider */}
      <div className="flex animate-scroll gap-6 sm:gap-12 w-max px-4 sm:px-12">

        {companies.concat(companies).map((logo, index) => (
          <div
            key={index}
            className="bg-[#d8d1c7] flex items-center justify-center
            rounded-lg shadow-md px-6 py-4 w-44 sm:w-52 h-24 flex-shrink-0"
          >
            <img
              src={logo}
              alt="company"
              className="max-h-14 w-auto object-contain"
            />
          </div>
        ))}

      </div>

    </section>
  );
};

export default Recruiters;