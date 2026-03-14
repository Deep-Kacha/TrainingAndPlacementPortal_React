import React from "react";
import { CheckCircle, FileText, ListChecks } from "lucide-react";

const PlacementPolicy = () => {
  return (
    <section className="bg-gray-100 py-5 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Placement Policy</h2>
          <p className="text-gray-500 mt-2">
            Understanding our placement process and guidelines
          </p>
        </div>

        {/* Top Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Eligibility */}
          <div className="bg-white rounded-xl shadow-md border-l-4 border-red-500 p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-red-500 text-white p-2 rounded-full">
                <CheckCircle size={20} />
              </div>
              <h3 className="text-xl font-semibold text-red-600">
                Eligibility Criteria
              </h3>
            </div>

            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-2">
                <CheckCircle className="text-green-500" size={18} />
                Minimum CGPA of 6.5 for most recruiters
              </li>

              <li className="flex gap-2">
                <CheckCircle className="text-green-500" size={18} />
                No active backlogs at the time of placement
              </li>

              <li className="flex gap-2">
                <CheckCircle className="text-green-500" size={18} />
                Regular attendance (minimum 75%)
              </li>

              <li className="flex gap-2">
                <CheckCircle className="text-green-500" size={18} />
                Valid and updated resume uploaded on portal
              </li>

              <li className="flex gap-2">
                <CheckCircle className="text-green-500" size={18} />
                Completion of mandatory training programs
              </li>
            </ul>
          </div>

          {/* Placement Rules */}
          <div className="bg-white rounded-xl shadow-md border-l-4 border-red-500 p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-red-500 text-white p-2 rounded-full">
                <FileText size={20} />
              </div>
              <h3 className="text-xl font-semibold text-red-600">
                Placement Rules
              </h3>
            </div>

            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                Students can apply to multiple companies
              </li>

              <li className="flex gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                Once placed, student cannot appear for further drives
              </li>

              <li className="flex gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                Attendance in pre-placement talks is mandatory
              </li>

              <li className="flex gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                Professional attire required during interviews
              </li>

              <li className="flex gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                No malpractice or misrepresentation allowed
              </li>
            </ul>
          </div>
        </div>

        {/* Selection Process */}
        <div className="mt-12 bg-gradient-to-r from-red-800 to-red-600 rounded-xl shadow-lg p-10 text-white">

          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white text-red-600 p-2 rounded-full">
              <ListChecks size={20} />
            </div>
            <h3 className="text-xl font-semibold">Selection Process</h3>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">

            <div>
              <div className="bg-white text-blue-900 font-bold w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-3">
                1
              </div>
              <h4 className="font-semibold">Registration</h4>
              <p className="text-sm text-gray-200">Apply through portal</p>
            </div>

            <div>
              <div className="bg-white text-blue-900 font-bold w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-3">
                2
              </div>
              <h4 className="font-semibold">Aptitude Test</h4>
              <p className="text-sm text-gray-200">Online/Offline exam</p>
            </div>

            <div>
              <div className="bg-white text-blue-900 font-bold w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-3">
                3
              </div>
              <h4 className="font-semibold">Technical Round</h4>
              <p className="text-sm text-gray-200">Technical interview</p>
            </div>

            <div>
              <div className="bg-white text-blue-900 font-bold w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-3">
                4
              </div>
              <h4 className="font-semibold">HR Round</h4>
              <p className="text-sm text-gray-200">Final interview</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default PlacementPolicy;