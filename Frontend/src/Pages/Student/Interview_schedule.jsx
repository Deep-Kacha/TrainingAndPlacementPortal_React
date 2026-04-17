import { useState, useEffect, useCallback } from "react";
import { FaSpinner, FaCalendarDay, FaClock, FaVideo, FaBuilding, FaLink, FaMapMarkerAlt, FaLayerGroup, FaCalendarCheck } from "react-icons/fa";
import { getAvatarColor } from "../../utils/ui";
import useSocketRefresh from "../../hooks/useSocketRefresh";


const StudInterviewSchedule = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchInterviews = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("/api/student/interviews", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await res.json();
            if (result.success) setInterviews(result.data);
        } catch (error) {
            console.error("Failed to fetch student interviews", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchInterviews();
    }, [fetchInterviews]);

    useSocketRefresh('REFRESH_INTERVIEWS', fetchInterviews);


    const ICONS = {
        Online: <FaVideo />,
        Offline: <FaBuilding />,
        venue: <FaMapMarkerAlt />,
        link: <FaLink />
    };

    // Group interviews by Company + Role
    const groupedInterviews = interviews.reduce((acc, item) => {
        const key = `${item.company}-${item.role}`;
        if (!acc[key]) {
            acc[key] = {
                company: item.company,
                role: item.role,
                rounds: []
            };
        }
        acc[key].rounds.push(item);
        return acc;
    }, {});

    return (
        <div className="w-full">
            <h1 className="text-2xl md:text-3xl font-bold text-red-600">
                Interview Pipeline
            </h1>
            <p className="text-gray-600 mb-8">
                Your progressive selection rounds organized by job application.
            </p>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24">
                    <FaSpinner className="animate-spin text-red-600 text-4xl mb-4" />
                    <p className="text-gray-500 font-medium font-bold uppercase tracking-widest text-[10px]">Syncing schedules...</p>
                </div>
            ) : Object.keys(groupedInterviews).length === 0 ? (
                <div className="text-center py-24 bg-white rounded-xl border border-gray-200 border-dashed">
                    <FaCalendarCheck className="text-gray-200 text-6xl mx-auto mb-4" />
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No interviews scheduled.</p>
                </div>
            ) : (
                <div className="space-y-12">
                    {Object.values(groupedInterviews).map((group, gIdx) => (
                        <div key={gIdx} className="space-y-6">
                            {/* Group Header */}
                            <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
                                <div className={`${getAvatarColor(group.company)} text-white rounded-lg flex items-center justify-center font-bold text-xl uppercase shadow-md w-12 h-12`}>
                                    {group.company?.[0] || 'C'}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 leading-tight">{group.company}</h3>
                                    <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1">{group.role}</p>
                                </div>
                            </div>

                            {/* Rounds Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {group.rounds.map((item) => (
                                    <div key={item.id} className="bg-[#d8cfc3] p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col group transition-all hover:shadow-md h-full">
                                        <div className="flex justify-between items-start mb-6">
                                            <p className="text-red-700 font-bold text-xs uppercase tracking-widest bg-white/50 px-3 py-1 rounded-lg border border-white/60">{item.round}</p>
                                            <span className={`px-2 py-1 rounded text-white font-bold text-[8px] uppercase tracking-widest shadow-sm ${item.statusColor === 'red' ? 'bg-red-600' : 'bg-green-600'}`}>
                                                {item.status}
                                            </span>
                                        </div>

                                        <div className="space-y-4 mb-6 pt-4 border-t border-white/20">
                                            <div className="flex items-center gap-6">
                                                <div className="flex-1">
                                                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Date</p>
                                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                                                        <FaCalendarDay className="text-red-600" /> {item.date}
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Time</p>
                                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                                                        <FaClock className="text-red-600" /> {item.time}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex-1">
                                                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Venue / Access</p>
                                                <div className="flex items-center gap-2 text-xs font-bold text-gray-800 truncate">
                                                    <span className="bg-white/60 p-1.5 rounded-lg text-gray-600">{ICONS[item.mode] || <FaVideo />}</span>
                                                    <span className="truncate">{item.venue || "TBD"}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-4 border-t border-white/20 flex justify-end">
                                            {item.mode === 'Online' && item.venue && (
                                                <a href={item.venue} target="_blank" rel="noreferrer" className="bg-white text-blue-700 border border-blue-100 shadow-sm px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all">
                                                    Join Interview →
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudInterviewSchedule;