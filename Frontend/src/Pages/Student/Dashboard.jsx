import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner, FaTrophy, FaCalendarCheck, FaBriefcase, FaUserCircle } from "react-icons/fa";
import useSocketRefresh from "../../hooks/useSocketRefresh";
import { PORTAL_BRANDING } from "../../demo/demoConfig";

const StudDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchStats = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("/api/student/dashboard-stats", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await res.json();
            if (result.success) {
                setStats(result.data);
            }
        } catch (error) {
            console.error("Failed to fetch student stats", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    // Real-time listeners
    useSocketRefresh('REFRESH_STATS', fetchStats);
    useSocketRefresh('REFRESH_APPLICATIONS', fetchStats);
    useSocketRefresh('REFRESH_INTERVIEWS', fetchStats);
    useSocketRefresh('REFRESH_STUDENTS', fetchStats);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <FaSpinner className="animate-spin text-red-600 text-4xl mb-4" />
                <p className="text-gray-500 font-medium">Loading Statistics...</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <h1 className="text-2xl md:text-3xl font-bold text-red-600">
                Welcome, {stats?.studentName || "Student"}
            </h1>
            <p className="text-gray-600 mb-8">
                Enrollment: {stats?.enrollment || "PENDING"} | Overview of your placement progress.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div 
                    onClick={() => navigate("/StudApplications")}
                    className="flex justify-between items-center bg-[#d8cfc3] p-6 rounded-xl shadow-sm cursor-pointer hover:bg-[#cec3b3] transition-colors group"
                >
                    <div>
                        <p className="text-gray-600 font-medium text-sm">Applied Jobs</p>
                        <h2 className="text-2xl font-bold text-blue-700">{stats?.counts?.applied || 0}</h2>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-100 text-blue-600 text-xl group-hover:scale-110 transition-transform">
                        <FaBriefcase />
                    </div>
                </div>

                <div 
                    onClick={() => navigate("/StudInterviewSchedule")}
                    className="flex justify-between items-center bg-[#d8cfc3] p-6 rounded-xl shadow-sm cursor-pointer hover:bg-[#cec3b3] transition-colors group"
                >
                    <div>
                        <p className="text-gray-600 font-medium text-sm">Active Rounds</p>
                        <h2 className="text-2xl font-bold text-orange-700">{stats?.counts?.interviews || 0}</h2>
                    </div>
                    <div className="p-3 rounded-lg bg-orange-100 text-orange-600 text-xl group-hover:scale-110 transition-transform">
                        <FaCalendarCheck />
                    </div>
                </div>

                <div className="flex justify-between items-center bg-[#d8cfc3] p-6 rounded-xl shadow-sm">
                    <div>
                        <p className="text-gray-600 font-medium text-sm">Status</p>
                        <h2 className={`text-xl font-bold ${stats?.counts?.isPlaced ? 'text-green-700' : 'text-blue-700'}`}>
                            {stats?.counts?.isPlaced ? 'PLACED' : 'APPROVED'}
                        </h2>
                    </div>
                    <div className={`p-3 rounded-lg text-xl ${stats?.counts?.isPlaced ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                        <FaTrophy />
                    </div>
                </div>

                {/* Extra Slot or Branding */}
                <div className="flex justify-between items-center bg-[#d8cfc3] p-6 rounded-xl shadow-sm">
                    <div>
                        <p className="text-gray-600 font-medium text-sm">{PORTAL_BRANDING.shortName} Portal</p>
                        <h2 className="text-lg font-bold text-gray-800">Verified</h2>
                    </div>
                    <div className="p-3 rounded-lg bg-red-100 text-red-600 text-xl">
                        <FaUserCircle />
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <h2 className="text-xl md:text-2xl font-bold text-red-600 mb-6 font-semibold">
                Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-[#d8cfc3] p-8 rounded-xl shadow text-center">
                    <div className="flex justify-center mb-4 text-3xl text-orange-500">
                        🔍
                    </div>
                    <h3 className="text-lg font-semibold mb-1">Browse Jobs</h3>
                    <p className="text-gray-600 text-sm">Explore opportunities</p>
                    <button onClick={() => navigate("/StudJobs")} className="mt-4 font-semibold text-orange-600">
                        View Jobs →
                    </button>
                </div>

                <div className="bg-[#d8cfc3] p-8 rounded-xl shadow text-center">
                    <div className="flex justify-center mb-4 text-3xl text-blue-600">
                        📋
                    </div>
                    <h3 className="text-lg font-semibold mb-1">My Applied</h3>
                    <p className="text-gray-600 text-sm">Track your progress</p>
                    <button onClick={() => navigate("/StudApplications")} className="mt-4 font-semibold text-blue-700">
                        View History →
                    </button>
                </div>

                <div className="bg-[#d8cfc3] p-8 rounded-xl shadow text-center">
                    <div className="flex justify-center mb-4 text-3xl text-purple-600">
                        👤
                    </div>
                    <h3 className="text-lg font-semibold mb-1">My Profile</h3>
                    <p className="text-gray-600 text-sm">Update info</p>
                    <button onClick={() => navigate("/StudProfile")} className="mt-4 font-semibold text-purple-600">
                        Edit Profile →
                    </button>
                </div>

                <div className="bg-[#d8cfc3] p-8 rounded-xl shadow text-center">
                    <div className="flex justify-center mb-4 text-3xl text-green-600">
                        🏆
                    </div>
                    <h3 className="text-lg font-semibold mb-1">Placement</h3>
                    <p className="text-gray-600 text-sm">View achievements</p>
                    <button onClick={() => navigate("/StudPlacementHistory")} className="mt-4 font-semibold text-green-700">
                        View Records →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudDashboard;