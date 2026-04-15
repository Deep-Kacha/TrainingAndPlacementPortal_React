import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaBriefcase, FaMapMarkerAlt, FaRegClock, FaCheckCircle, 
  FaGlobe, FaScroll, FaUserGraduate, FaClipboardList, 
  FaMoneyBillWave, FaSpinner, FaChevronLeft
} from 'react-icons/fa';
import Toast from "../../Components/common/Toast";

const StudJobDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { job, isPlacedGlobally } = location.state || {};
  
  const [applying, setApplying] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-4">No job data selected</p>
        <button onClick={() => navigate('/StudJobs')} className="text-red-600 font-bold hover:underline">Back to Jobs</button>
      </div>
    );
  }

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 4000);
  };

  const handleApply = async () => {
    if (isPlacedGlobally) {
      showToast("Placement Policy: You are already placed and cannot apply for further drives.", "error");
      return;
    }
    
    setApplying(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/student/apply/${job.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        showToast("Application submitted successfully! 🎉", "success");
        job.applicationStatus = 'applied';
        job.isApplied = true;
      } else {
        showToast(result.error || "Failed to apply.", "error");
      }
    } catch {
      showToast("Network error. Please try again.", "error");
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="w-full pb-10">
      <Toast {...toast} />
      
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-500 font-semibold text-xs hover:text-red-600 transition-colors mb-4"
      >
        <FaChevronLeft /> Back to Listings
      </button>

      <h1 className="text-2xl md:text-3xl font-bold text-red-600">
        Job Opportunity Details
      </h1>
      <p className="text-gray-600 mb-8">
        Review all eligibility and terms thoroughly before applying.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Core Info */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Card */}
          <div className="bg-[#d8cfc3] rounded-xl border border-gray-200 shadow-sm p-8">
             <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-8">
                <div className="w-20 h-20 bg-red-600 text-white rounded-lg flex items-center justify-center font-bold text-3xl shadow-sm">
                  {job.company?.[0]}
                </div>
                <div>
                   <h2 className="text-2xl font-bold text-gray-800 mb-1">
                     {job.role}
                   </h2>
                   <div className="flex flex-wrap gap-4 items-center">
                      <span className="text-red-600 font-semibold text-sm flex items-center gap-2">
                        <FaBriefcase /> {job.company}
                      </span>
                      <span className="text-gray-500 font-semibold text-sm flex items-center gap-2">
                        <FaMapMarkerAlt className="text-gray-400" /> {job.location || "Multiple Locations"}
                      </span>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-gray-200 pt-6">
                <div>
                   <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-1">Package</p>
                   <p className="text-red-600 font-bold text-xl">{job.salary || "—"}</p>
                </div>
                <div>
                   <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-1">Drive Date</p>
                   <p className="text-gray-800 font-bold text-sm">{job.driveDate || "TBA"}</p>
                </div>
                <div>
                   <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-1">Deadline</p>
                   <p className="text-gray-800 font-bold text-sm">{job.deadline || "—"}</p>
                </div>
             </div>
          </div>

          {/* Description */}
          <div className="bg-[#d8cfc3] rounded-xl border border-gray-200 p-8">
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
               <FaClipboardList className="text-red-600" /> Overview
            </h3>
            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
              {job.description || "No detailed description available."}
            </div>
            
            {(job.requiredSkills || job.selectionProcess) && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-200">
                {job.requiredSkills && (
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-red-600 mb-3">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(job.requiredSkills) ? job.requiredSkills.map(s => (
                        <span key={s} className="bg-white px-3 py-1 rounded-md text-xs font-semibold text-gray-800 border border-gray-100">{s}</span>
                      )) : <span className="text-gray-700 text-xs font-semibold">{job.requiredSkills}</span>}
                    </div>
                  </div>
                )}
                {job.selectionProcess && (
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-red-600 mb-3">Process</h4>
                    <div className="text-xs font-medium text-gray-700 whitespace-pre-wrap">
                      {job.selectionProcess}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Policy Section */}
          <div className="bg-gray-800 text-white rounded-xl p-8">
            <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
               <FaScroll className="text-red-500" /> Terms
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Bond</p>
                  <p className="text-sm font-semibold">{job.bond || "No Bond"}</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Internship</p>
                  <p className="text-sm font-semibold">{job.internshipDuration || "N/A"}</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Stipend</p>
                  <p className="text-sm font-bold text-red-400">{job.stipend || "TBA"}</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Website</p>
                  {job.companyWebsite ? (
                    <a href={job.companyWebsite} target="_blank" rel="noreferrer" className="text-sm font-bold text-blue-400 hover:underline">
                      Visit Site →
                    </a>
                  ) : <p className="text-sm font-semibold">N/A</p>}
               </div>
            </div>
          </div>
        </div>

        {/* Right Column: Eligibility & Action */}
        <div className="space-y-6">
          
          {/* Eligibility Card */}
          <div className="bg-[#d8cfc3] rounded-xl border border-gray-200 p-8 shadow-sm">
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-6">
               <FaUserGraduate className="text-red-600" /> Eligibility
            </h3>
            <div className="space-y-4">
               <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 font-bold uppercase tracking-wider">Course</span>
                  <span className="text-gray-800 font-bold">
                    {Array.isArray(job.eligibleCourses) ? job.eligibleCourses.join(", ") : (job.eligibleCourses || "All")}
                  </span>
               </div>
               <div className="flex justify-between items-center bg-white/40 p-3 rounded-lg">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Min CGPA</span>
                  <span className="bg-red-600 text-white px-3 py-1 rounded-md font-bold text-xs">{job.eligibilityCriteria || "All"}</span>
               </div>
               <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 font-bold uppercase tracking-wider">Batch</span>
                  <span className="text-gray-800 font-bold">
                    {Array.isArray(job.eligibleBatches) ? job.eligibleBatches.join(", ") : (job.eligibleBatches || "All")}
                  </span>
               </div>
            </div>
          </div>

          {/* Action Card */}
          <div className="bg-white border-2 border-[#d8cfc3] p-8 rounded-xl text-center shadow-sm">
            <h4 className="text-xl font-bold text-gray-800 mb-2">Apply Now</h4>
            <p className="text-xs text-gray-500 mb-6">Review all details before applying.</p>
            
            {job.isApplied ? (
              <div className="w-full bg-green-50 text-green-700 py-3 rounded-lg font-bold text-xs uppercase tracking-widest border border-green-100">
                Applied Successfully
              </div>
            ) : job.deadlinePassed ? (
              <div className="w-full bg-red-50 text-red-700 py-3 rounded-lg font-bold text-xs uppercase tracking-widest border border-red-100">
                Deadline Expired
              </div>
            ) : isPlacedGlobally ? (
              <div className="w-full bg-gray-50 text-gray-500 py-3 rounded-lg font-bold text-[10px] uppercase tracking-widest border border-gray-100">
                Already Placed
              </div>
            ) : (
              <button 
                onClick={handleApply}
                disabled={applying}
                className="w-full py-3 bg-red-600 text-white rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-black transition-all disabled:opacity-50"
              >
                {applying ? "Submitting..." : "Apply Job"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudJobDetails;
