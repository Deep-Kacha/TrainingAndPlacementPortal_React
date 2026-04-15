import { useState, useEffect } from 'react';
import { FaBuilding, FaSpinner, FaTrophy, FaDownload, FaHistory } from "react-icons/fa";

const StudPlacementHistory = () => {
    const [placements, setPlacements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlacements = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("/api/student/placements", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const result = await res.json();
                if (result.success) setPlacements(result.data);
            } catch (error) {
                console.error("Failed to fetch placement history", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPlacements();
    }, []);

    const currentOffer = placements.length > 0 ? placements[0] : null;

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <FaSpinner className="animate-spin text-red-600 text-4xl mb-4" />
                <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Loading your achievements...</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <header className="mb-10">
                <h1 className="text-2xl md:text-3xl font-bold text-red-600 uppercase tracking-tighter">Placement History</h1>
                <p className="text-gray-600 text-sm md:text-base mt-2 font-medium tracking-tight">Your verified selection records and offer details.</p>
            </header>

            {/* Current Placement Status Card */}
            {currentOffer ? (
                <div className="bg-[#ece6da] border border-[#e0dacd] p-8 rounded-xl shadow-sm mb-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 text-black opacity-10">
                        <FaTrophy className="text-8xl -rotate-12" />
                    </div>
                    
                    <div className="relative z-10">
                        <h2 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-widest border-b border-[#d8cfc3] pb-4">
                            Latest Selection Result
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-8">
                            <div>
                                <p className="text-[#64748b] text-[10px] font-extrabold uppercase tracking-widest mb-2 m-0">Selection Status</p>
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest bg-green-700 text-white shadow-sm">
                                    <FaTrophy /> SELECTED
                                </span>
                            </div>
                            <div>
                                <p className="text-[#64748b] text-[10px] font-extrabold uppercase tracking-widest mb-2 m-0">Company</p>
                                <p className="text-lg font-black text-gray-900 m-0 uppercase tracking-tighter">{currentOffer.company}</p>
                            </div>
                            <div>
                                <p className="text-[#64748b] text-[10px] font-extrabold uppercase tracking-widest mb-2 m-0">Position</p>
                                <p className="text-lg font-bold text-gray-800 m-0 uppercase tracking-tight">{currentOffer.role}</p>
                            </div>
                            <div>
                                <p className="text-[#64748b] text-[10px] font-extrabold uppercase tracking-widest mb-2 m-0">Compensation</p>
                                <p className="text-2xl font-black text-red-700 m-0 tracking-tighter">{currentOffer.salary}</p>
                            </div>
                            <div>
                                <p className="text-[#64748b] text-[10px] font-extrabold uppercase tracking-widest mb-2 m-0">Offer Date</p>
                                <p className="text-lg font-bold text-gray-700 m-0">{currentOffer.date}</p>
                            </div>
                            <div>
                                <p className="text-[#64748b] text-[10px] font-extrabold uppercase tracking-widest mb-2 m-0">Documents</p>
                                {currentOffer.offerLetterUrl ? (
                                    <a href={currentOffer.offerLetterUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-red-600 font-black text-xs uppercase hover:underline">
                                        <FaDownload /> Download Offer Letter
                                    </a>
                                ) : (
                                    <span className="text-gray-400 font-bold text-[10px] uppercase italic">Awaiting document upload</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-[#ece6da]/50 border-2 border-dashed border-[#d8cfc3] p-10 rounded-xl text-center mb-12">
                    <FaTrophy className="text-gray-300 text-5xl mx-auto mb-4" />
                    <p className="text-gray-600 font-bold uppercase tracking-widest text-sm">No active placement records found.</p>
                    <p className="text-gray-400 text-[10px] font-medium uppercase mt-2">Applications in progress will appear in your application history.</p>
                </div>
            )}

            {/* Placement Records Table */}
            <div className="mb-6">
                <h2 className="text-xl font-bold text-red-600 uppercase tracking-widest flex items-center gap-3">
                    <FaHistory /> ALL PLACEMENT RECORDS
                </h2>
            </div>

            <div className="bg-[#ece6da] rounded-xl border border-[#e0dacd] shadow-sm overflow-hidden overflow-x-auto">
                <table className="w-full text-left min-w-[900px] border-collapse">
                    <thead className="bg-[#d8cfc3] text-[10px] font-extrabold uppercase tracking-widest text-gray-700 border-b border-[#c4b5a6]">
                        <tr>
                            <th className="p-5">Company</th>
                            <th className="p-5">Role</th>
                            <th className="p-5 text-center">Package</th>
                            <th className="p-5 text-center">Selected Date</th>
                            <th className="p-5 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#d8cfc3]">
                        {placements.map((row, index) => (
                            <tr key={index} className="hover:bg-white/30 transition-colors">
                                <td className="p-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-red-600 text-white rounded-lg flex items-center justify-center font-black text-lg shadow-sm">
                                            {row.company?.[0] || 'C'}
                                        </div>
                                        <span className="font-extrabold text-gray-900 uppercase tracking-tighter">{row.company}</span>
                                    </div>
                                </td>
                                <td className="p-5">
                                    <span className="font-bold text-gray-700 text-xs uppercase tracking-widest">{row.role}</span>
                                </td>
                                <td className="p-5 text-center font-black text-red-700 text-base">
                                    {row.salary}
                                </td>
                                <td className="p-5 text-center text-gray-600 font-bold text-xs uppercase tracking-widest">
                                    {row.date}
                                </td>
                                <td className="p-5 text-right">
                                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest bg-green-100 text-green-700 border border-green-200">
                                        <FaTrophy /> SELECTED
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {placements.length === 0 && (
                            <tr>
                                <td colSpan="5" className="py-12 text-center text-gray-400 font-bold text-[10px] uppercase tracking-widest italic">
                                    No records available at this time.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudPlacementHistory;