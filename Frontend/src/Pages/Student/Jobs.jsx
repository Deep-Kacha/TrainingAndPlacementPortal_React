import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSpinner, FaBriefcase, FaMapMarkerAlt, FaCheckCircle, FaSearch, FaRegLightbulb } from 'react-icons/fa';
import useSocketRefresh from "../../hooks/useSocketRefresh";

/**
 * Student › Jobs list page.
 * Fetches all approved jobs and student's personal application status.
 */
const StudJobs = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [applyingId, setApplyingId] = useState(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    useSocketRefresh('REFRESH_JOBS', fetchJobs);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("/api/student/jobs", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await res.json();
            if (result.success) setJobs(result.data);
        } catch (error) {
            console.error("Failed to fetch student jobs", error);
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async (jobId) => {
        if (!confirm("Are you sure you want to apply for this position?")) return;
        
        setApplyingId(jobId);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`/api/student/apply/${jobId}`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await res.json();
            if (result.success) {
                alert("Application submitted successfully!");
                fetchJobs(); // Refresh statuses
            } else {
                alert("Error: " + result.error);
            }
        } catch (error) {
            alert("Network error while applying.");
        } finally {
            setApplyingId(null);
        }
    };

    return (
        <div className="w-full">
            <header className="mb-10">
                <h1 className="text-2xl md:text-3xl font-bold text-red-600">Career Opportunities</h1>
                <p className="text-gray-600 text-sm md:text-base mt-1 font-medium">
                    Explore and apply for verified campus drives.
                </p>
            </header>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24">
                    <FaSpinner className="animate-spin text-red-600 text-4xl mb-4" />
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Finding available positions...</p>
                </div>
            ) : jobs.length === 0 ? (
                <div className="text-center py-20 bg-[#ece6da] rounded-xl border border-[#e0dacd] shadow-sm">
                    <FaBriefcase className="text-gray-300 text-6xl mx-auto mb-4" />
                    <p className="text-gray-600 text-lg font-bold">No active job drives found.</p>
                    <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">Check back later for new opportunities.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {jobs.map(job => (
                        <div className="bg-[#ece6da] p-6 rounded-xl border border-[#e0dacd] shadow-sm flex flex-col transition-all hover:shadow-md h-full" key={job.id}>
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center text-white font-extrabold text-2xl shrink-0 shadow-sm uppercase">
                                    {job.company?.[0] || 'C'}
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-xl font-extrabold m-0 text-gray-900 truncate uppercase tracking-tighter">{job.company || "Company"}</h2>
                                    <p className="text-gray-600 text-xs font-bold m-0 mt-0.5 uppercase tracking-widest leading-snug">{job.role || "Job Role"}</p>
                                </div>
                            </div>

                            <div className="text-red-700 text-3xl font-black mb-6 tracking-tighter">
                                {job.salary || "—"}
                            </div>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3 text-gray-700 text-sm font-bold uppercase tracking-widest text-[10px]">
                                    <FaMapMarkerAlt className="text-red-600 text-xs" />
                                    <span>{job.location || "Location TBD"}</span>
                                </div>
                                <div className="flex items-center gap-3 text-green-700 text-sm font-bold uppercase tracking-widest text-[10px]">
                                    <FaCheckCircle className="text-green-600 text-xs" />
                                    <span>Eligible for your profile ✔</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-500 text-sm font-bold uppercase tracking-widest text-[10px]">
                                    <FaRegLightbulb className="text-orange-500 text-xs" />
                                    <span>Deadline: {job.deadline}</span>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-auto">
                                <button 
                                    className="flex-1 border border-gray-400 text-gray-700 py-3 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-white/50 transition-colors shadow-sm"
                                    onClick={() => navigate('/StudJobDetails', { state: { job } })}
                                >
                                    VIEW DETAILS
                                </button>
                                {job.status === 'Applied' ? (
                                    <button className="flex-1 bg-gray-400 text-white py-3 rounded-lg font-bold text-[10px] uppercase tracking-widest cursor-not-allowed shadow-none" disabled>
                                        ✓ APPLIED
                                    </button>
                                ) : (
                                    <button
                                        className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-black transition-colors shadow-md disabled:bg-red-300"
                                        onClick={() => handleApply(job.id)}
                                        disabled={applyingId === job.id}
                                    >
                                        {applyingId === job.id ? "APPLYING..." : "APPLY NOW"}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudJobs;
