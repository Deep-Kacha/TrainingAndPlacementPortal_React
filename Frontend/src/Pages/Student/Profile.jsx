import { useState } from 'react';

const StudProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        fullName: 'Raj Patel',
        // studentTitle: 'Computer Science Student',
        enrollmentNo: '2023CS001',
        branch: 'Computer Engineering',
        cgpa: 8.2, // Number type
        mobileNumber: '+91 98765 43210',
        parentsName: 'Aman Patel',
        parentsMobile: '+91 98765 43210',
        emailAddress: 'raj.patel@rku.ac.in',
        dateOfBirth: '2001-08-15',
        academicYear: '2023-2024',
        semester: '3rd Semester'
    });

    const recentApplications = [
        { id: 1, position: 'Software Developer', type: 'Full-time', company: 'TechCorp Solutions', status: 'Interview Scheduled', statusClass: 'scheduled' },
        { id: 2, position: 'Frontend Developer', type: 'Internship', company: 'Digital Innovations', status: 'Under Review', statusClass: 'review' },
        { id: 3, position: 'Data Analyst', type: 'Full-time', company: 'Analytics Pro', status: 'Not Selected', statusClass: 'rejected' }
    ];

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        let newValue = value;

        if (name === 'fullName' || name === 'parentsName' || name === 'branch') {
            newValue = value.replace(/[^a-zA-Z\s]/g, '');
        } else if (name === 'academicYear') {
            newValue = value.replace(/[^0-9\-\s]/g, '');
        } else if (name === 'cgpa') {
            newValue = value.replace(/[^0-9.]/g, '');
            const parts = newValue.split('.');
            if (parts.length > 2) newValue = parts[0] + '.' + parts.slice(1).join('');
        } else if (name === 'mobileNumber' || name === 'parentsMobile') {
            newValue = value.replace(/\D/g, '');
        } else if (name === 'dateOfBirth') {
            newValue = value;
        }

        setProfileData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(newValue) || 0 : newValue
        }));
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="page-container max-w-6xl mx-auto pt-5">
            <header className="page-header">
                <h1 className="page-title">Your Profile</h1>
                <p className="page-subtitle">Read All Information Properly If Any Mistakes You can Edit It</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8 mb-10">
                {/* Left Side: Identity Card */}
                <div className="bg-[#ece6da] rounded-xl py-10 px-8 text-center flex flex-col items-center border border-[#e0dacd] shadow-sm">
                    <div className="w-24 h-24 bg-[#e7000b] rounded-full text-white flex items-center justify-center text-4xl font-bold mb-5 shadow-md">
                        {profileData.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'ST'}
                    </div>
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                name="fullName"
                                value={profileData.fullName}
                                onChange={handleInputChange}
                                className="text-[22px] mb-1 font-bold text-center bg-white border border-[#e7000b] focus:outline-none rounded-md p-1 w-full"
                            />
                        </>
                    ) : (
                        <>
                            <h2 className="text-[22px] mb-1 text-gray-900 font-bold">{profileData.fullName}</h2>
                            <p className="text-[#64748b] text-[14px] mb-8 font-medium">{profileData.studentTitle}</p>
                        </>
                    )}

                    <div className="w-full border-t border-[#e7000b] pt-4 pb-4 flex justify-between items-center text-[14px]">
                        <span className="text-gray-500 font-medium whitespace-nowrap mr-2">Enrollment No.</span>
                        {isEditing ? (
                            <input type="text" name="enrollmentNo" value={profileData.enrollmentNo} onChange={handleInputChange} className="font-bold bg-white border border-[#e7000b] focus:outline-none rounded p-1 w-2/3 text-right" />
                        ) : (
                            <span className="font-bold text-gray-900">{profileData.enrollmentNo}</span>
                        )}
                    </div>
                    <div className="w-full border-t border-[#d4cec3] pt-4 pb-4 flex justify-between items-center text-[14px]">
                        <span className="text-gray-500 font-medium whitespace-nowrap mr-2">Branch</span>
                        {isEditing ? (
                            <input type="text" name="branch" value={profileData.branch} onChange={handleInputChange} className="font-bold bg-white border border-[#e7000b] focus:outline-none rounded p-1 w-2/3 text-right" />
                        ) : (
                            <span className="font-bold text-gray-900">{profileData.branch}</span>
                        )}
                    </div>
                    <div className="w-full border-t border-b border-[#d4cec3] pt-4 pb-4 flex justify-between items-center text-[14px]">
                        <span className="text-gray-500 font-medium whitespace-nowrap mr-2">CGPA</span>
                        {isEditing ? (
                            <input type="number" step="0.01" name="cgpa" value={profileData.cgpa} onChange={handleInputChange} className="font-bold text-[#168a48] text-base bg-white border border-[#e7000b] focus:outline-none rounded p-1 w-1/3 text-right" />
                        ) : (
                            <span className="font-bold text-[#168a48] text-base">{profileData.cgpa}</span>
                        )}
                    </div>

                    <button className="bg-[#c72027] text-white rounded-md mt-6 w-full py-3 px-4 font-bold text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-red-800 transition shadow-sm" onClick={toggleEdit}>
                        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        {isEditing ? 'SAVE PROFILE' : 'EDIT CONTACT'}
                    </button>
                </div>

                {/* Right Side: Detailed Profile Info */}
                <div className="bg-[#ece6da] rounded-xl p-8 border border-[#e0dacd] shadow-sm">
                    <h3 className="text-[20px] mb-8 text-gray-900 font-bold">Profile Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-5">
                        {[
                            { label: "Full Name", name: "fullName", type: "text" },
                            { label: "Mobile Number", name: "mobileNumber", type: "tel" },
                            { label: "Parents Name", name: "parentsName", type: "text" },
                            { label: "Parents Mobile Number", name: "parentsMobile", type: "tel" },
                            { label: "Email Address", name: "emailAddress", type: "email" },
                            { label: "Date of Birth", name: "dateOfBirth", type: "date" },
                            { label: "Academic Year", name: "academicYear", type: "text" },
                            { label: "Semester", name: "semester", type: "select", options: ["1st Semester", "2nd Semester", "3rd Semester", "4th Semester", "5th Semester", "6th Semester", "7th Semester", "8th Semester"] },
                        ].map(field => (
                            <div className="flex flex-col gap-2" key={field.name}>
                                <label className="text-[13px] font-medium text-[#475569]">{field.label}</label>
                                {field.type === "select" ? (
                                    <select name={field.name} value={profileData[field.name]} onChange={handleInputChange} disabled={!isEditing} className="p-[14px] rounded-lg border-none bg-white text-[15px] font-medium text-gray-800 disabled:opacity-95 disabled:cursor-not-allowed shadow-sm outline-none focus:ring-2 focus:ring-[#c72027]">
                                        {field.options.map(opt => <option key={opt}>{opt}</option>)}
                                    </select>
                                ) : (
                                    <input type={field.type} step={field.step} name={field.name} value={profileData[field.name]} onChange={handleInputChange} disabled={!isEditing} className="p-[14px] rounded-lg border-none bg-white text-[15px] font-medium text-gray-800 disabled:opacity-95 disabled:cursor-not-allowed shadow-sm outline-none focus:ring-2 focus:ring-[#c72027]" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section: Recent Applications */}
            <div className="bg-[#ece6da] rounded-xl border border-[#e0dacd] overflow-hidden pb-0 mb-6 shadow-sm">
                <div className="px-8 py-6 pb-4">
                    <h3 className="m-0 text-[18px] font-bold text-gray-900">Recent Applications</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-[#e0dacd]/40">
                                <th className="text-center md:text-left py-4 px-8 text-[13px] text-gray-800 font-bold whitespace-nowrap border-b border-[#d4cec3]">Job Position</th>
                                <th className="text-center md:text-left py-4 px-8 text-[13px] text-gray-800 font-bold border-b border-[#d4cec3]">Company</th>
                                <th className="text-center md:text-left py-4 px-8 text-[13px] text-gray-800 font-bold border-b border-[#d4cec3]">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#d4cec3]">
                            {recentApplications.map(app => (
                                <tr key={app.id} className="bg-[#ece6da]">
                                    <td className="py-5 px-8">
                                        <p className="font-bold text-[15px] text-gray-900 m-0 whitespace-nowrap">{app.position}</p>
                                        <p className="text-[13px] font-medium text-[#64748b] mt-1 m-0">{app.type}</p>
                                    </td>
                                    <td className="py-5 px-8 text-center md:text-left">
                                        <span className="font-bold text-[15px] text-gray-800 whitespace-nowrap">{app.company}</span>
                                    </td>
                                    <td className="py-5 px-8 text-center md:text-left">
                                        <span className={`font-semibold text-[13px] whitespace-nowrap ${app.statusClass === 'scheduled' ? 'text-[#a16f2b]' : app.statusClass === 'review' ? 'text-blue-600' : 'text-red-600'}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudProfile;