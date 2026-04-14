import { useState, useEffect } from "react";
import { FaSpinner, FaUsers } from "react-icons/fa";

const CompanyApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/company/applicants", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        setApplicants(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch applicants", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <FaSpinner className="animate-spin text-red-600 text-4xl mb-4" />
        <p className="text-gray-500 font-medium">Loading Applicants...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-red-600">Job Applicants</h1>
        <p className="text-gray-600">Review all students who have applied to your active job drives.</p>
      </div>

      {applicants.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <FaUsers className="text-gray-300 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-700">No Applicants Yet</h3>
          <p className="text-gray-500 mt-2">There are currently no students who have applied to your jobs.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm border-b border-gray-200">
                  <th className="p-4 font-semibold">Student Name</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Enrollment No</th>
                  <th className="p-4 font-semibold">CGPA</th>
                  <th className="p-4 font-semibold">Job Title</th>
                  <th className="p-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-200">
                {applicants.map((app) => (
                  <tr key={app.applicationId} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-gray-800">{app.studentName}</td>
                    <td className="p-4 text-gray-600">{app.studentEmail}</td>
                    <td className="p-4 text-gray-600">{app.enrollmentNo}</td>
                    <td className="p-4 font-semibold text-gray-700">{app.cgpa}</td>
                    <td className="p-4 text-gray-600">{app.jobTitle}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded font-semibold ${
                        app.applicationStatus === 'selected' ? 'bg-green-100 text-green-700' :
                        app.applicationStatus === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {app.applicationStatus.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyApplicants;
