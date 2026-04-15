import { useState, useEffect } from 'react';
import { FaEdit, FaSpinner, FaUserCircle, FaSave, FaTimes } from 'react-icons/fa';

const StudProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [recentApplications, setRecentApplications] = useState([]);
    const [profileData, setProfileData] = useState({
        name: '',
        enrollment_no: '',
        department: '',
        cgpa: 0,
        contact_number: '',
        parent_name: '',
        parent_mobile: '',
        email: '',
        personal_email: '',
        current_year: '',
        semester: ''
    });

    useEffect(() => {
        fetchProfile();
        fetchRecentApps();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("/api/student/profile", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await res.json();
            if (result.success) setProfileData(result.data);
        } catch (error) {
            console.error("Failed to fetch student profile", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRecentApps = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("/api/student/applications", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await res.json();
            if (result.success) setRecentApplications(result.data.slice(0, 3));
        } catch (error) {
            console.error("Failed to fetch recent apps", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("/api/student/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(profileData)
            });
            const result = await res.json();
            if (result.success) {
                alert("Profile updated successfully!");
                setIsEditing(false);
            } else {
                alert("Error: " + result.error);
            }
        } catch (error) {
            alert("Failed to save profile.");
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <FaSpinner className="animate-spin text-red-600 text-4xl mb-4" />
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading profile from RKU Database...</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto">
            <header className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-red-600">Student Profile</h1>
                <p className="text-gray-600 text-sm md:text-base mt-2 font-medium">Please ensure your information is accurate for placement verification.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 mb-10">
                {/* Left Side: Identity Card */}
                <div className="bg-[#ece6da] rounded-xl py-10 px-8 text-center flex flex-col items-center border border-[#e0dacd] shadow-sm">
                    <div className="w-24 h-24 bg-red-600 rounded-full text-white flex items-center justify-center text-4xl font-bold mb-6 shadow-md uppercase">
                        {profileData.name?.[0] || 'S'}
                    </div>
                    
                    <h2 className="text-xl mb-1 text-gray-900 font-black uppercase tracking-tighter">
                        {profileData.name}
                    </h2>
                    <p className="text-gray-500 text-[10px] mb-8 font-extrabold uppercase tracking-widest">
                        {profileData.department} Student
                    </p>

                    <div className="w-full border-t border-[#d8cfc3] pt-4 pb-4 flex justify-between items-center text-xs font-bold uppercase tracking-widest text-[#64748b]">
                        <span>Enrollment</span>
                        <span className="text-gray-900">{profileData.enrollment_no}</span>
                    </div>
                    <div className="w-full border-t border-[#d8cfc3] pt-4 pb-4 flex justify-between items-center text-xs font-bold uppercase tracking-widest text-[#64748b]">
                        <span>CGPA</span>
                        <span className="text-blue-700 font-black text-sm">{profileData.cgpa}</span>
                    </div>
                    <div className="w-full border-t border-b border-[#d8cfc3] pt-4 pb-4 flex justify-between items-center text-xs font-bold uppercase tracking-widest text-[#64748b]">
                        <span>Semester</span>
                        <span className="text-gray-900">{profileData.semester}</span>
                    </div>

                    {!isEditing ? (
                        <button 
                            className="bg-red-600 text-white rounded-lg mt-8 w-full py-3 px-4 font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-md"
                            onClick={() => setIsEditing(true)}
                        >
                            <FaEdit /> EDIT PROFILE
                        </button>
                    ) : (
                        <div className="flex gap-2 w-full mt-8">
                            <button 
                                className="flex-1 bg-green-700 text-white rounded-lg py-3 px-4 font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-green-800 transition-colors shadow-md"
                                onClick={handleSave}
                            >
                                <FaSave /> SAVE
                            </button>
                            <button 
                                className="flex-1 bg-white border border-gray-300 text-gray-700 rounded-lg py-3 px-4 font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm"
                                onClick={() => setIsEditing(false)}
                            >
                                <FaTimes /> CANCEL
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Side: Detailed Profile Info */}
                <div className="bg-[#ece6da] rounded-xl p-8 border border-[#e0dacd] shadow-sm">
                    <h3 className="text-lg font-bold mb-8 text-gray-900 uppercase tracking-widest flex items-center gap-3">
                        <FaUserCircle className="text-red-600" /> Information Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-6">
                        {[
                            { label: "Full Name", name: "name", type: "text" },
                            { label: "Phone Number", name: "contact_number", type: "tel" },
                            { label: "Parents Name", name: "parent_name", type: "text" },
                            { label: "Parents Mobile", name: "parent_mobile", type: "tel" },
                            { label: "Official Email", name: "email", type: "email", disabled: true },
                            { label: "Personal Email", name: "personal_email", type: "email" },
                            { label: "Department", name: "department", type: "text" },
                            { label: "Current Year", name: "current_year", type: "number" },
                        ].map(field => (
                            <div className="flex flex-col gap-2" key={field.name}>
                                <label className="text-[10px] font-extrabold text-[#64748b] uppercase tracking-widest">{field.label}</label>
                                <input 
                                    type={field.type} 
                                    name={field.name} 
                                    value={profileData[field.name] || ""} 
                                    onChange={handleInputChange} 
                                    disabled={!isEditing || field.disabled} 
                                    className="p-3.5 rounded-lg border border-transparent bg-white text-sm font-bold text-gray-800 disabled:opacity-80 disabled:cursor-not-allowed shadow-inner outline-none focus:border-red-600" 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section: Recent Applications */}
            <div className="bg-[#ece6da] rounded-xl border border-[#e0dacd] overflow-hidden shadow-sm mb-10">
                <div className="px-8 py-6 border-b border-[#d8cfc3] flex justify-between items-center">
                    <h3 className="m-0 text-lg font-bold text-gray-900 uppercase tracking-widest">Recent Applications</h3>
                    <button className="text-red-600 font-bold text-[10px] uppercase tracking-widest hover:underline" onClick={() => navigate("/StudApplications")}>View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead className="bg-[#d8cfc3]/30">
                            <tr>
                                <th className="text-left py-4 px-8 text-[10px] text-gray-700 font-extrabold uppercase tracking-widest">Job Role</th>
                                <th className="text-left py-4 px-8 text-[10px] text-gray-700 font-extrabold uppercase tracking-widest border-b border-[#d8cfc3]">Company</th>
                                <th className="text-left py-4 px-8 text-[10px] text-gray-700 font-extrabold uppercase tracking-widest border-b border-[#d8cfc3]">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#d8cfc3]">
                            {recentApplications.map(app => (
                                <tr key={app.id || app.applicationId} className="hover:bg-white/30 transition-colors">
                                    <td className="py-5 px-8">
                                        <p className="font-bold text-sm text-gray-900 m-0 uppercase tracking-tighter">{app.role}</p>
                                    </td>
                                    <td className="py-5 px-8">
                                        <span className="font-bold text-xs text-red-700 uppercase tracking-widest">{app.company}</span>
                                    </td>
                                    <td className="py-5 px-8">
                                        <span className="font-bold text-[10px] uppercase tracking-widest p-1.5 rounded-lg bg-gray-100 text-gray-600 border border-gray-200">
                                            {app.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {recentApplications.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="py-10 text-center text-gray-500 font-bold text-[10px] uppercase tracking-widest italic">
                                        No recent job applications to show.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudProfile;