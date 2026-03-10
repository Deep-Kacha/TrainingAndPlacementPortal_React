import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const JobDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const job = location.state?.job || {
    company: "TechCorp Solutions",
    role: "Software Development Engineer",
    location: "Bangalore, India",
    salary: "₹8 LPA",
    cgpa: "7.0",
    id: 1,
    status: "Apply"
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Company Job Description</h1>
        <p className="page-subtitle">Read All Information Properly Before Apply</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">

          {/* Header Card */}
          <div className="card-basic flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-500 rounded-xl shadow-sm flex items-center justify-center shrink-0 text-white font-bold text-3xl">
              {job.company.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 m-0 mb-2">{job.role}</h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="text-blue-600">🏢</span> {job.company}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-blue-600">📍</span> {job.location}
                </div>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#eafdf0] rounded-xl p-5 shadow-sm border border-[#d1f4da]">
              <div className="text-green-600 text-xl font-bold mb-1">{job.salary}</div>
              <div className="text-gray-600 text-sm font-medium">Annual CTC</div>
            </div>
            <div className="bg-[#eff6ff] rounded-xl p-5 shadow-sm border border-[#dbeafe]">
              <div className="text-blue-700 text-xl font-bold mb-1">Full-time</div>
              <div className="text-gray-600 text-sm font-medium">Employment Type</div>
            </div>
          </div>

          {/* Description Content */}
          <div className="card-basic">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">Job Description</h3>
              <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                We are looking for a talented Software Development Engineer to join our dynamic team. You will be responsible for developing and maintaining high-quality software applications, working with cutting-edge technologies, and contributing to innovative projects that impact millions of users.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                As part of our engineering team, you'll collaborate with cross-functional teams to design, develop, and deploy scalable software solutions. This is an excellent opportunity for recent graduates to kickstart their career in software development with mentorship from senior engineers.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">Key Responsibilities</h3>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                <li>Design and develop web applications using React.js and Node.js</li>
                <li>Write clean, maintainable, and efficient code</li>
                <li>Collaborate with product managers and designers to implement user-friendly interfaces</li>
                <li>Participate in code reviews and maintain coding standards</li>
                <li>Debug and troubleshoot application issues</li>
                <li>Stay updated with latest technology trends and best practices</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-3">
                <span className="text-sm font-semibold text-blue-600">React.js</span>
                <span className="text-sm font-semibold text-green-600">Node.js</span>
                <span className="text-sm font-semibold text-yellow-600">JavaScript</span>
                <span className="text-sm font-semibold text-purple-600">HTML/CSS</span>
                <span className="text-sm font-semibold text-red-500">Git</span>
                <span className="text-sm font-semibold text-indigo-600">MongoDB</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">What We Offer</h3>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                <li>Competitive salary and benefits package</li>
                <li>Health insurance and wellness programs</li>
                <li>Professional development opportunities</li>
                <li>Flexible working hours and remote work options</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:col-span-1 space-y-6">

          <div className="card-basic">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Eligibility Criteria</h3>

            <div className="space-y-4">
              <div>
                <div className="text-sm font-bold text-gray-900">CGPA Requirement</div>
                <div className="text-sm text-gray-600">Minimum {job.cgpa}</div>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">Branch</div>
                <div className="text-sm text-gray-600">CS/IT</div>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">Graduation Year</div>
                <div className="text-sm text-gray-600">2026</div>
              </div>
            </div>
          </div>

          {/* <div className="card-basic">
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

export default JobDetails;
