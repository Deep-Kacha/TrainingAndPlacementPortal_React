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
    <section id="recruiters" className="py-18 bg-gray-100 overflow-hidden">

      {/* Heading */}
      <div className="text-center  mb-14">
        <h2 className="text-3xl font-bold text-gray-800">
          Our Top Recruiters
        </h2>

        <p className="text-gray-500 mt-2">
          Trusted by leading organizations worldwide
        </p>
      </div>

      {/* Slider */}
      <div className="flex animate-scroll gap-20 w-max px-20">

        {companies.concat(companies).map((logo, index) => (
          <div
            key={index}
            className="bg-[#d8d1c7] flex items-center justify-center
            rounded-lg shadow-md px-25 py-20 min-w-[200px] h-[100px]"
          >
            <img
              src={logo}
              alt="company"
              className="max-h-30 object-contain"
            />
          </div>
        ))}

      </div>

    </section>
  );
};

export default Recruiters;