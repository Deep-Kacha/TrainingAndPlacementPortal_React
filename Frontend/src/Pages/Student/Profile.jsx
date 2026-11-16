import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

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

    const navigate = useNavigate();

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
            <div className="flex flex-col items-center justify-center py-24">
                <FaSpinner className="animate-spin text-red-600 text-4xl mb-4" />
                <p className="text-gray-500 font-medium">Loading Profile...</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <h1 className="text-2xl md:text-3xl font-bold text-red-600">
                My Profile
            </h1>
            <p className="text-gray-600 mb-8">
                Verify and maintain your academic and personal profile information.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 mb-10">
                {/* Left Side: Identity Card */}
                <div className="bg-[#d8cfc3] rounded-xl p-8 text-center border border-gray-200 shadow-sm">
                    <div className="w-20 h-20 bg-red-600 text-white rounded-lg flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-sm">
                        {profileData.name?.[0] || 'S'}
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-800 mb-1 truncate">
                        {profileData.name}
                    </h2>
                    <p className="text-gray-500 text-sm mb-6">
                        {profileData.department} Student
                    </p>

                    <div className="space-y-3 w-full text-left">
                        <div className="bg-white p-3 rounded-lg border border-gray-100 flex justify-between items-center text-xs">
                            <span className="text-gray-500 font-semibold uppercase tracking-wider">Enrollment</span>
                            <span className="text-gray-800 font-bold">{profileData.enrollment_no}</span>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-100 flex justify-between items-center text-xs">
                            <span className="text-gray-500 font-semibold uppercase tracking-wider">CGPA</span>
                            <span className="text-blue-700 font-bold">{profileData.cgpa}</span>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-100 flex justify-between items-center text-xs">
                            <span className="text-gray-500 font-semibold uppercase tracking-wider">Semester</span>
                            <span className="text-gray-800 font-bold">{profileData.semester}</span>
                        </div>
                    </div>

                    {!isEditing ? (
                        <button 
                            className="bg-gray-800 text-white rounded-lg mt-6 w-full py-3 px-4 font-semibold text-sm hover:bg-black transition-all"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <div className="space-y-2 mt-6">
                            <button 
                                className="w-full bg-green-600 text-white rounded-lg py-3 px-4 font-semibold text-sm hover:bg-green-700 transition-all"
                                onClick={handleSave}
                            >
                                Save Changes
                            </button>
                            <button 
                                className="w-full bg-white border border-gray-300 text-gray-700 rounded-lg py-3 px-4 font-semibold text-sm hover:bg-gray-50 transition-all"
                                onClick={() => {
                                    setIsEditing(false);
                                    fetchProfile();
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Side: Detailed Profile Info */}
                <div className="bg-[#d8cfc3] rounded-xl p-8 border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2">Detailed Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { label: "Full Name", name: "name", type: "text" },
                            { label: "Contact Number", name: "contact_number", type: "tel" },
                            { label: "Father Name", name: "parent_name", type: "text" },
                            { label: "Parent Mobile", name: "parent_mobile", type: "tel" },
                            { label: "Official Email", name: "email", type: "email", disabled: true },
                            { label: "Personal Email", name: "personal_email", type: "email" },
                            { label: "Department", name: "department", type: "text" },
                            { label: "Current Year", name: "current_year", type: "number" },
                        ].map(field => (
                            <div className="space-y-1" key={field.name}>
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{field.label}</label>
                                <input 
                                    type={field.type} 
                                    name={field.name} 
                                    value={profileData[field.name] || ""} 
                                    onChange={handleInputChange} 
                                    disabled={!isEditing || field.disabled} 
                                    className="w-full p-3 rounded-lg border border-gray-300 bg-white text-sm font-semibold text-gray-800 disabled:bg-gray-50 disabled:text-gray-500 focus:border-red-600 outline-none transition-all shadow-sm"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section: Recent Applications */}
            <h2 className="text-xl md:text-2xl font-bold text-red-600 mb-6 flex justify-between items-center">
                Recent Applications
                <button 
                    className="text-red-700 text-xs font-bold uppercase tracking-wider hover:underline"
                    onClick={() => navigate("/StudApplications")}
                >
                    View All →
                </button>
            </h2>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[480px]">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">Company</th>
                            <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">Role</th>
                            <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {recentApplications.map(app => (
                            <tr key={app.id || app.applicationId} className="hover:bg-gray-50/60 transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-semibold text-gray-800 text-sm">{app.company}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">{app.role}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest border border-gray-100 bg-gray-50 text-gray-600 shadow-sm`}>
                                        {app.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {recentApplications.length === 0 && (
                            <tr>
                                <td colSpan="3" className="py-10 text-center text-gray-400 text-xs italic">
                                    No recent applications.
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