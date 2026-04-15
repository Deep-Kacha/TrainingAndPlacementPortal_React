import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner, FaTrophy, FaCalendarCheck, FaBriefcase, FaUserCircle } from "react-icons/fa";
import useSocketRefresh from "../../hooks/useSocketRefresh";

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

    const statusCards = [
        { 
            title: 'T&P Status', 
            status: stats?.counts?.isPlaced ? 'PLACED' : 'APPROVED', 
            detail: stats?.counts?.isPlaced ? 'Hired & Confirmed' : 'Registration Approved', 
            colorClass: stats?.counts?.isPlaced ? 'text-blue-700 bg-blue-100' : 'text-green-700 bg-[#e8f5e9]', 
            icon: stats?.counts?.isPlaced ? <FaTrophy /> : <FaCalendarCheck /> 
        },
        { 
            title: 'Applied', 
            status: stats?.counts?.applied ?? '0', 
            detail: 'Job Applications', 
            colorClass: 'text-indigo-700 bg-indigo-100', 
            icon: <FaBriefcase /> 
        },
        { 
            title: 'Interviews', 
            status: stats?.counts?.interviews ?? '0', 
            detail: 'Upcoming Rounds', 
            colorClass: 'text-orange-700 bg-orange-100', 
            icon: <FaCalendarCheck /> 
        }
    ];

    const quickActions = [
        { title: 'Browse Jobs', desc: 'Explore available opportunities', linkText: 'View Jobs', onclick: () => navigate("/StudJobs"), icon: '🔍' },
        { title: 'My Applied', desc: 'Track application status', linkText: 'View Applied', onclick: () => navigate("/StudApplications"), icon: '📋' },
        { title: 'Profile', desc: 'Update your information', linkText: 'Edit Profile', onclick: () => navigate("/StudProfile"), icon: '👤' },
        { title: 'Interviews', desc: 'Manage interview schedule', linkText: 'View Schedule', onclick: () => navigate("/StudInterviewSchedule"), icon: '🗓️' }
    ];

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <FaSpinner className="animate-spin text-red-600 text-4xl mb-4" />
                <p className="text-gray-500 font-medium font-bold uppercase tracking-wider">Gathering your placement data...</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <header className="mb-10">
                <div className="flex items-center gap-4">
                    <div className="bg-red-100 text-red-600 p-3 rounded-full hidden md:block">
                        <FaUserCircle className="text-3xl" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 m-0">
                            Welcome {stats?.studentName || "Student"}
                        </h1>
                        <p className="text-gray-500 font-medium m-0 mt-1 uppercase tracking-widest text-xs">
                            Enrollment: {stats?.enrollment || "RKU-XXXXX"}
                        </p>
                    </div>
                </div>
            </header>

            {/* Status Cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {statusCards.map((card, index) => (
                    <div key={index} className="bg-[#ece6da] p-6 rounded-xl border border-[#e0dacd] shadow-sm transition-all hover:shadow-md">
                        <div className="flex justify-between items-start mb-6">
                            <div className="text-2xl p-3 bg-[#d8cfc3] rounded-xl text-gray-800">
                                {card.icon}
                            </div>
                            <span className={`font-extrabold text-[10px] px-3 py-1.5 rounded-full uppercase tracking-widest ${card.colorClass}`}>
                                {card.status}
                            </span>
                        </div>
                        <div>
                            <h3 className="m-0 text-xl font-bold text-gray-900">{card.title}</h3>
                            <p className="mt-1 text-sm font-medium text-gray-600 uppercase tracking-widest text-[10px]">{card.detail}</p>
                        </div>
                    </div>
                ))}
            </section>

            {/* Quick Actions */}
            <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {quickActions.map((action, index) => (
                        <div key={index} className="bg-[#ece6da] border border-[#e0dacd] p-6 rounded-xl cursor-pointer hover:shadow-md transition-all flex flex-col items-center text-center group" onClick={action.onclick}>
                            <div className="w-16 h-16 bg-[#e9e2d5] rounded-full flex items-center justify-center mb-5 text-2xl group-hover:bg-red-50 transition-colors">
                                {action.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{action.title}</h3>
                            <p className="text-gray-600 text-xs font-medium mb-5 leading-relaxed">{action.desc}</p>
                            <span className="text-red-600 font-bold text-xs uppercase tracking-widest mt-auto border-b border-transparent group-hover:border-red-600">
                                {action.linkText} ➔
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default StudDashboard;