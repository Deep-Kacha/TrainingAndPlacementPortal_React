import { useState, useEffect } from "react";
import { FaSpinner, FaTrophy, FaDownload } from "react-icons/fa";

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
            <div className="flex flex-col items-center justify-center py-24">
                <FaSpinner className="animate-spin text-red-600 text-4xl mb-4" />
                <p className="text-gray-500 font-medium">Loading History...</p>
            </div>
        );
    }

    return (
        <div className="w-full pb-10">
            <h1 className="text-2xl md:text-3xl font-bold text-red-600">
                Placement History
            </h1>
            <p className="text-gray-600 mb-8">
                Your verified selection records and official offers.
            </p>

            {/* Current Placement Status Card */}
            {currentOffer ? (
                <div className="bg-[#d8cfc3] p-8 rounded-xl shadow-sm mb-12 relative overflow-hidden group border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-red-600 text-white rounded-lg flex items-center justify-center font-bold text-xl uppercase shadow-sm">
                            <FaTrophy />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">Latest Selection Result</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div>
                            <p className="text-gray-600 text-[11px] font-bold uppercase tracking-widest mb-1">Company</p>
                            <p className="text-xl font-bold text-gray-800">{currentOffer.company}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 text-[11px] font-bold uppercase tracking-widest mb-1">Designation</p>
                            <p className="text-lg font-semibold text-gray-700">{currentOffer.role}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 text-[11px] font-bold uppercase tracking-widest mb-1">Salary Package</p>
                            <p className="text-2xl font-bold text-red-600">{currentOffer.salary}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 text-[11px] font-bold uppercase tracking-widest mb-1">Status</p>
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-green-100 text-green-700 border border-green-200">
                                Verified Selection
                            </span>
                        </div>
                        <div>
                            <p className="text-gray-600 text-[11px] font-bold uppercase tracking-widest mb-1">Date</p>
                            <p className="text-sm font-semibold text-gray-700">{currentOffer.date}</p>
                        </div>
                        {currentOffer.offerLetterUrl && (
                            <div>
                                <p className="text-gray-600 text-[11px] font-bold uppercase tracking-widest mb-1">Documents</p>
                                <a href={currentOffer.offerLetterUrl} target="_blank" rel="noreferrer" className="text-blue-600 font-bold text-xs uppercase hover:underline flex items-center gap-2">
                                    <FaDownload /> Download Letter
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="bg-white border border-gray-200 border-dashed p-12 rounded-xl text-center mb-12">
                    <FaTrophy className="text-gray-200 text-6xl mx-auto mb-4" />
                    <p className="text-gray-500 font-bold">No historical records available.</p>
                </div>
            )}

            {/* Placement Records Table */}
            <h2 className="text-xl md:text-2xl font-bold text-red-600 mb-6">
                Achievement Log
            </h2>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left min-w-[900px]">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">Company</th>
                            <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">Designation</th>
                            <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400 text-center">Package</th>
                            <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400 text-center">Date</th>
                            <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400 text-right">Verification</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {placements.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50/60 transition-colors">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-red-600 text-white rounded-lg flex items-center justify-center font-bold text-base uppercase">
                                            {row.company?.[0] || 'C'}
                                        </div>
                                        <span className="font-semibold text-gray-800 text-sm">{row.company}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-gray-700 text-sm font-medium">
                                    {row.role}
                                </td>
                                <td className="px-6 py-5 text-center font-bold text-red-600">
                                    {row.salary}
                                </td>
                                <td className="px-6 py-5 text-center text-gray-600 text-sm font-semibold">
                                    {row.date}
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest bg-green-50 text-green-700 border border-green-100">
                                        Verified
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {placements.length === 0 && (
                <div className="py-10 text-center text-gray-400 text-xs italic">
                    No placement records found.
                </div>
            )}
        </div>
    );
};


export default StudPlacementHistory;