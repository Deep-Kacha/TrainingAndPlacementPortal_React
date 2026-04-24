import { useState, useEffect } from "react";
import { FaSpinner, FaBriefcase } from "react-icons/fa";

const CompanyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/company/jobs", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        setJobs(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <FaSpinner className="animate-spin text-red-600 text-4xl mb-4" />
        <p className="text-gray-500 font-medium">Loading Job Postings...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-red-600">My Job Postings</h1>
          <p className="text-gray-600">Review the active job drives you have created.</p>
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <FaBriefcase className="text-gray-300 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-700">No Job Postings Yet</h3>
          <p className="text-gray-500 mt-2">You haven't posted any jobs to the portal yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{job.job_title}</h3>
                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                  <p><span className="font-semibold">Type:</span> {job.job_type}</p>
                  <p><span className="font-semibold">CTC:</span> {job.ctc_package}</p>
                  <p><span className="font-semibold">Location:</span> {job.location}</p>
                </div>
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  job.status === 'approved' ? 'bg-green-100 text-green-700' :
                  job.status === 'rejected' ? 'bg-red-100 text-red-700' :
                  job.status === 'closed' ? 'bg-gray-100 text-gray-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyJobs;
