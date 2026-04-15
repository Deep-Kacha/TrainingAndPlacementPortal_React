import { useState, useEffect, useCallback } from "react";
import { FaSpinner, FaHistory, FaCheckCircle, FaHourglassHalf, FaTrophy, FaTimesCircle } from "react-icons/fa";
import useSocketRefresh from "../../hooks/useSocketRefresh";

const StudApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchApplications = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("/api/student/applications", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await res.json();
            if (result.success) setApplications(result.data);
        } catch (error) {
            console.error("Failed to fetch applications", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchApplications();
    }, [fetchApplications]);

    // Real-time listener
    useSocketRefresh('REFRESH_APPLICATIONS', fetchApplications);

    const STATUS_UI = {
        applied: { icon: <FaHourglassHalf />, label: "Pending Review", color: "text-blue-600 bg-blue-50 border-blue-100" },
        shortlisted: { icon: <FaCheckCircle />, label: "Shortlisted", color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
        interview: { icon: <FaCheckCircle />, label: "In Interview", color: "text-orange-600 bg-orange-50 border-orange-100" },
        selected: { icon: <FaTrophy />, label: "Selected 🎉", color: "text-green-700 bg-green-50 border-green-200" },
        rejected: { icon: <FaTimesCircle />, label: "Rejected", color: "text-red-700 bg-red-50 border-red-100" }
    };

    return (
        <div className="w-full">
            <header className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-red-600">Application History</h1>
                <p className="text-gray-600 text-sm md:text-base mt-1 font-medium">Track your selection journey across all Job Drives.</p>
            </header>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <FaSpinner className="animate-spin text-red-600 text-3xl mb-4" />
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Retrieving your history...</p>
                </div>
            ) : applications.length === 0 ? (
                <div className="text-center py-24 bg-[#ece6da] rounded-xl border border-[#e0dacd] shadow-sm">
                    <FaHistory className="text-gray-300 text-6xl mx-auto mb-4" />
                    <p className="text-gray-600 text-lg font-bold">No applications found.</p>
                    <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">Start your career journey by applying for jobs!</p>
                </div>
            ) : (
                <div className="bg-[#ece6da] rounded-xl border border-[#e0dacd] shadow-sm overflow-hidden overflow-x-auto">
                    <table className="w-full text-left min-w-[800px] border-collapse">
                        <thead className="bg-[#d8cfc3] text-[10px] font-extrabold uppercase tracking-widest text-gray-700 border-b border-[#c4b5a6]">
                            <tr>
                                <th className="p-5">Company</th>
                                <th className="p-5">Role & Salary</th>
                                <th className="p-5">Applied Date</th>
                                <th className="p-5">Current Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#d8cfc3]">
                            {applications.map((app) => {
                                const ui = STATUS_UI[app.status] || STATUS_UI.applied;
                                return (
                                    <tr key={app.applicationId} className="hover:bg-white/30 transition-colors">
                                        <td className="p-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-red-600 text-white rounded-lg flex items-center justify-center font-black text-xl shadow-sm uppercase">
                                                    {app.company?.[0] || 'C'}
                                                </div>
                                                <span className="font-extrabold text-gray-900 uppercase tracking-tighter">{app.company}</span>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <p className="font-bold text-gray-800 m-0 text-sm uppercase tracking-widest leading-none">{app.role}</p>
                                            <p className="text-red-700 font-black mt-1.5 text-lg m-0">{app.salary}</p>
                                        </td>
                                        <td className="p-5">
                                            <span className="text-gray-600 font-bold text-xs uppercase tracking-widest">{app.appliedAt}</span>
                                        </td>
                                        <td className="p-5">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-extrabold uppercase tracking-widest shadow-sm ${ui.color}`}>
                                                {ui.icon}
                                                {ui.label}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default StudApplications;