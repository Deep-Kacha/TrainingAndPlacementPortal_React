import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

const StudJobDetails = () => {
  // const navigate = useNavigate();
  // const location = useLocation();
  const job = location.state?.job || {
    id: 1,
    companyName: "TechCorp Solutions",
    jobPosition: "Software Development Engineer",
    jobLocation: "Bangalore, India",
    ctc: "₹8 LPA",
    internshipDuration: "6 Months",
    stipend: "₹25,000/month",
    bond: "1 Year",
    joinDate: "July 2026",
    eligibleBatches: ["2026"],
    eligibleCourses: ["B.Tech CSE", "B.Tech IT", "MCA"],
    description: "We are looking for a talented Software Development Engineer to join our dynamic team. You will be responsible for developing and maintaining high-quality software applications, working with cutting-edge technologies, and contributing to innovative projects that impact millions of users.",
    selectionProcess: "1. Online Aptitude Test\n2. Technical Interview\n3. HR Interview",
    driveDate: "Jan 15, 2026",
    website: "www.techcorp.com",
    additionalInfo: "Looking for immediate joiners with good problem-solving skills.",
    status: "Apply"
  };

  return (
    <div className="w-full">
      <div className="page-header">
        <h1 className="page-title">Company Job Description</h1>
        <p className="page-subtitle">Read All Information Properly Before Apply</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">

          {/* Header Card */}
          <div className="bg-[#ece6da] p-6 rounded-lg border border-[#e0dacd] shadow-sm flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-500 rounded-xl shadow-sm flex items-center justify-center shrink-0 text-white font-bold text-3xl">
              {job.companyName?.charAt(0) || "C"}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 m-0 mb-2">{job.jobPosition}</h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="text-blue-600">🏢</span> {job.companyName}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-blue-600">📍</span> {job.jobLocation}
                </div>
                {job.website && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-blue-600">🌐</span> <a href={`https://${job.website.replace('https://', '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{job.website}</a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#eafdf0] rounded-xl p-5 shadow-sm border border-[#d1f4da]">
              <div className="text-green-600 text-lg font-bold mb-1">{job.ctc || "N/A"}</div>
              <div className="text-gray-600 text-sm font-medium">Annual CTC</div>
            </div>
            <div className="bg-[#eff6ff] rounded-xl p-5 shadow-sm border border-[#dbeafe]">
              <div className="text-blue-700 text-lg font-bold mb-1">{job.stipend || "N/A"}</div>
              <div className="text-gray-600 text-sm font-medium">Stipend</div>
            </div>
            <div className="bg-[#fefce8] rounded-xl p-5 shadow-sm border border-[#fef08a]">
              <div className="text-yellow-700 text-lg font-bold mb-1">{job.internshipDuration || "N/A"}</div>
              <div className="text-gray-600 text-sm font-medium">Internship</div>
            </div>
            <div className="bg-[#fef2f2] rounded-xl p-5 shadow-sm border border-[#fecaca]">
              <div className="text-red-700 text-lg font-bold mb-1">{job.bond || "No"}</div>
              <div className="text-gray-600 text-sm font-medium">Bond</div>
            </div>
          </div>

          {/* Description Content */}
          <div className="bg-[#ece6da] p-6 rounded-lg border border-[#e0dacd] shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">About Company & Job Description</h3>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {job.description}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">Selection Process</h3>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {job.selectionProcess}
              </p>
            </div>

            {job.additionalInfo && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">Additional Information</h3>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {job.additionalInfo}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:col-span-1 space-y-6">

          <div className="bg-[#ece6da] p-6 rounded-lg border border-[#e0dacd] shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Eligibility & Dates</h3>

            <div className="space-y-4">
              <div>
                <div className="text-sm font-bold text-gray-900">Eligible Courses</div>
                <div className="text-sm text-gray-600">{(job.eligibleCourses || []).join(", ") || "Any"}</div>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">Eligible Batches</div>
                <div className="text-sm text-gray-600">{(job.eligibleBatches || []).join(", ") || "Any"}</div>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">Drive Date</div>
                <div className="text-sm text-gray-600">{job.driveDate || "TBA"}</div>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">Tentative Joining Date</div>
                <div className="text-sm text-gray-600">{job.joinDate || "TBA"}</div>
              </div>
            </div>
          </div>

          {/* <div className="bg-[#ece6da] p-6 rounded-lg border border-[#e0dacd] shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Key Dates</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center bg-gray-50/50 -mx-2 px-2 py-1 rounded">
                <span className="text-sm text-gray-600">Application Deadline</span>
                <span className="text-sm font-bold text-gray-900">Dec 30, 2024</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Online Test</span>
                <span className="text-sm font-bold text-gray-900">Jan 5, 2025</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50/50 -mx-2 px-2 py-1 rounded">
                <span className="text-sm text-gray-600">Interview Round</span>
                <span className="text-sm font-bold text-gray-900">Jan 12, 2025</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Result Declaration</span>
                <span className="text-sm font-bold text-gray-900">Jan 20, 2025</span>
              </div>
            </div>
          </div> */}

          <div className="pt-2 flex flex-col items-center">
            <button className="w-full py-4 rounded-xl font-bold text-white uppercase bg-primary-red hover:bg-red-700 transition-colors shadow-md flex items-center justify-center gap-2 mb-3">
              APPLY NOW <span className="text-xl leading-none">→</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudJobDetails;
