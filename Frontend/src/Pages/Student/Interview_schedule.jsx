import { useState, useEffect } from "react";
import { FaSpinner, FaCalendarDay, FaClock, FaVideo, FaBuilding, FaLink, FaMapMarkerAlt, FaLayerGroup, FaCalendarCheck } from "react-icons/fa";

const StudInterviewSchedule = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInterviews = async () => {
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
        };
        fetchInterviews();
    }, []);

    const ICONS = {
        Online: <FaVideo />,
        Offline: <FaBuilding />,
        venue: <FaMapMarkerAlt />,
        link: <FaLink />
    };

    return (
        <div className="w-full">
            <header className="mb-10">
                <h1 className="text-2xl md:text-3xl font-bold text-red-600 uppercase tracking-tighter">Your Interview Schedule</h1>
                <p className="text-gray-600 text-sm md:text-base mt-2 font-medium tracking-tight">Stay updated on your upcoming selection rounds.</p>
            </header>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <FaSpinner className="animate-spin text-red-600 text-4xl mb-4" />
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Syncing schedules...</p>
                </div>
            ) : interviews.length === 0 ? (
                <div className="text-center py-24 bg-[#ece6da] rounded-xl border border-[#e0dacd] shadow-sm">
                    <FaCalendarCheck className="text-gray-300 text-6xl mx-auto mb-4" />
                    <p className="text-gray-600 text-lg font-bold">No interviews scheduled yet.</p>
                    <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">Shortlisted students will see their rounds here.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {interviews.map((item) => (
                        <div key={item.id} className="bg-[#ece6da] p-6 rounded-xl border border-[#e0dacd] shadow-sm relative flex flex-col transition-all hover:scale-[1.01] hover:shadow-md h-full">

                            {/* Header Section */}
                            <div className="flex flex-row items-center gap-5 mb-8">
                                <div className="w-16 h-16 bg-red-600 text-white rounded-xl flex items-center justify-center font-black text-3xl shrink-0 uppercase shadow-sm">
                                    {item.company?.[0] || 'C'}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="m-0 text-xl font-extrabold text-gray-900 uppercase tracking-tighter truncate">{item.company}</h3>
                                    <p className="m-0 text-gray-600 text-[10px] font-extrabold uppercase tracking-widest leading-loose">{item.role}</p>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-4 text-gray-700 text-[11px] font-bold uppercase tracking-widest mb-20 md:mb-16">
                                <div className="flex items-center gap-3">
                                    <FaCalendarDay className="text-red-600" /> {item.date}
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaClock className="text-red-600" /> {item.time}
                                </div>
                                <div className="flex items-center gap-3">
                                    {ICONS[item.mode] || <FaVideo />} {item.mode}
                                </div>
                                <div className="flex items-center gap-3 overflow-hidden">
                                    {item.mode === 'Online' ? ICONS.link : ICONS.venue} 
                                    <span className="truncate">{item.venue || "TBD"}</span>
                                </div>
                                <div className="flex items-center gap-3 sm:col-span-2 text-red-700">
                                    <FaLayerGroup /> {item.round}
                                </div>
                            </div>

                            {/* Status Button */}
                            <div className="absolute bottom-6 right-6 mt-auto">
                                <span className={`px-5 py-2.5 rounded-lg text-white font-black text-[10px] uppercase tracking-widest shadow-md inline-flex items-center gap-2 ${item.statusColor === 'red' ? 'bg-red-700' : 'bg-green-700'}`}>
                                    <span className={`w-2 h-2 rounded-full animate-pulse ${item.statusColor === 'red' ? 'bg-white' : 'bg-green-300'}`}></span>
                                    {item.status}
                                </span>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudInterviewSchedule;