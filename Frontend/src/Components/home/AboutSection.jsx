import React from "react";
import about from "../../assets/images/about.png";
import { GraduationCap, Handshake, TrendingUp } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="bg-gray-100 py-24 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            About Training & Placement Cell
          </h2>

          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            Our mission is to bridge the gap between academia and industry by
            providing students with world-class training and connecting them
            with leading employers.
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <div className="w-full">
            <img
              src={about}
              alt="Training and Placement"
              className="w-full h-[320px] object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Right Content */}
          <div className="space-y-10">

            {/* Feature 1 */}
            <div className="flex items-start gap-5">
              <div className="bg-red-600 text-white p-3 rounded-full">
                <GraduationCap size={22} />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Comprehensive Training
                </h3>

                <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                  Industry-oriented training programs covering technical skills,
                  soft skills, and aptitude development.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-5">
              <div className="bg-red-600 text-white p-3 rounded-full">
                <Handshake size={22} />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Industry Partnerships
                </h3>

                <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                  Strong relationships with 250+ leading companies across
                  diverse sectors and industries.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-5">
              <div className="bg-red-600 text-white p-3 rounded-full">
                <TrendingUp size={22} />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Career Development
                </h3>

                <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                  Personalized career counseling, resume building, and interview
                  preparation support.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};

export default AboutSection;