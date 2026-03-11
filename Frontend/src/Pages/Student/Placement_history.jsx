import React from 'react';
import { FaBuilding, FaCalendarAlt, FaCheckCircle, FaStar, FaPaperPlane, FaTimesCircle } from "react-icons/fa";

const Placement_history = () => {

    const placementRecords = [
        {
            company: "Google Inc.",
            role: "Software Engineer",
            package: "₹18 LPA",
            offerDate: "Jan 12, 2026",
            joiningDate: "July 12, 2026",
            status: "Selected",
            iconBg: "bg-[#e1f0ff]",
            iconText: "text-[#3b82f6]",
            statusBg: "bg-[#dcfae6]",
            statusText: "text-[#16a34a]",
            StatusIcon: FaCheckCircle
        },
        {
            company: "Microsoft",
            role: "Cloud Solutions Architect",
            package: "₹22 LPA",
            offerDate: "-",
            joiningDate: "-",
            status: "Interview Scheduled",
            iconBg: "bg-[#dcfae6]",
            iconText: "text-[#22c55e]",
            statusBg: "bg-[#d9dee6]",
            statusText: "text-[#314a72]",
            StatusIcon: FaCalendarAlt
        },
        {
            company: "Amazon",
            role: "SDE II",
            package: "₹25 LPA",
            offerDate: "Mar 10, 2026",
            joiningDate: "Sep 15, 2026",
            status: "Shortlisted",
            iconBg: "bg-[#f3e8ff]",
            iconText: "text-[#a855f7]",
            statusBg: "bg-[#dbeafe]",
            statusText: "text-[#3b82f6]",
            StatusIcon: FaStar
        },
        {
            company: "Adobe Systems",
            role: "Frontend Developer",
            package: "₹16 LPA",
            offerDate: "Apr 05, 2026",
            joiningDate: "Oct 10, 2026",
            status: "Applied",
            iconBg: "bg-[#ffedd5]",
            iconText: "text-[#f97316]",
            statusBg: "bg-[#dbeafe]",
            statusText: "text-[#3b82f6]",
            StatusIcon: FaPaperPlane
        },
        {
            company: "Oracle",
            role: "Database Administrator",
            package: "₹14 LPA",
            offerDate: "May 20, 2026",
            joiningDate: "Nov 01, 2026",
            status: "Rejected",
            iconBg: "bg-[#fee2e2]",
            iconText: "text-[#ef4444]",
            statusBg: "bg-[#fee2e2]",
            statusText: "text-[#dc2626]",
            StatusIcon: FaTimesCircle
        },
        {
            company: "IBM",
            role: "Data Scientist",
            package: "₹20 LPA",
            offerDate: "Jun 18, 2026",
            joiningDate: "Dec 05, 2026",
            status: "Applied",
            iconBg: "bg-[#e0e7ff]",
            iconText: "text-[#6366f1]",
            statusBg: "bg-[#dbeafe]",
            statusText: "text-[#3b82f6]",
            StatusIcon: FaPaperPlane
        },
        {
            company: "Infosys",
            role: "System Engineer",
            package: "₹8 LPA",
            offerDate: "Jul 22, 2026",
            joiningDate: "Jan 10, 2027",
            status: "Shortlisted",
            iconBg: "bg-[#ccfbf1]",
            iconText: "text-[#14b8a6]",
            statusBg: "bg-[#dbeafe]",
            statusText: "text-[#3b82f6]",
            StatusIcon: FaStar
        }
    ];

    const currentOffer = {
        company: "Google Inc.",
        role: "Software Engineer",
        package: "₹18 LPA",
        offerDate: "Jan 12, 2026",
        joiningDate: "July 12, 2026",
        status: "Selected",
        statusBg: "bg-[#dcfae6]",
        statusText: "text-[#16a34a]",
        StatusIcon: FaCheckCircle
    };

    return (
        <div className="w-full">
            <header className="page-header flex justify-between items-start mb-6">
                <div>
                    <h1 className="page-title text-[#e7000b] text-[2rem] font-bold m-0 mb-2">Placement History</h1>
                    <p className="page-subtitle text-[#666] text-base m-0">View your final offers.</p>
                </div>
            </header>

            {/* Current Placement Status Card */}
            <div className="bg-[#ece6da] border text-left border-[#e0d8cc] p-6 md:p-8 rounded-[12px] shadow-sm w-full mb-10">
                <h2 className="text-[1.5rem] font-bold text-[#333] mb-6 m-0 relative">Current Placement Status</h2>

                <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                    <div>
                        <p className="text-[#888] text-[0.85rem] font-medium mb-2 m-0 mt-3">Status</p>
                        <span className={`inline-flex items-center gap-2 px-3 py-[6px] rounded-full text-[14px] font-[700] ${currentOffer.statusBg} ${currentOffer.statusText}`}>
                            <currentOffer.StatusIcon size={14} /> {currentOffer.status}
                        </span>
                    </div>
                    <div>
                        <p className="text-[#888] text-[0.85rem] font-medium mb-2 m-0 mt-3">Company Name</p>
                        <p className="text-[1.1rem] font-bold text-[#333] m-0">{currentOffer.company}</p>
                    </div>
                    <div>
                        <p className="text-[#888] text-[0.85rem] font-medium mb-1 m-0 mt-3">Job Role</p>
                        <p className="text-[1.05rem] font-bold text-[#444] m-0">{currentOffer.role}</p>
                    </div>
                    <div>
                        <p className="text-[#888] text-[0.85rem] font-medium mb-1 m-0 mt-3">Package</p>
                        <p className="text-[1.05rem] font-bold text-[#444] m-0">{currentOffer.package}</p>
                    </div>
                    <div>
                        <p className="text-[#888] text-[0.85rem] font-medium mb-1 m-0 mt-3">Offer Date</p>
                        <p className="text-[1.05rem] font-bold text-[#444] m-0">{currentOffer.offerDate}</p>
                    </div>
                    <div>
                        <p className="text-[#888] text-[0.85rem] font-medium mb-1 m-0 mt-3">Joining Date</p>
                        <p className="text-[1.05rem] font-bold text-[#444] m-0">{currentOffer.joiningDate}</p>
                    </div>
                </div>
            </div>

            {/* Placement Records */}
            <div className="mb-6">
                <h2 className="text-[1.8rem] font-bold text-[#e7000b] m-0 mb-2">Placement Records</h2>
                <p className="text-[#64748b] text-[15px] font-medium m-0">Complete history of your placement applications and outcomes</p>
            </div>

            {/* Table */}
            <div className="bg-[#ece6da] rounded-[16px] overflow-hidden shadow-sm">
                {/* Table Header */}
                <div className="grid grid-cols-6 gap-4 px-8 py-5 border-b border-[#c4bcae]/50 bg-[#fbfaf8]">
                    <div className="font-bold text-[#444] text-[14px] col-span-1 pl-[60px]">Company Name</div>
                    <div className="font-bold text-[#444] text-[14px] text-center">Job Role</div>
                    <div className="font-bold text-[#444] text-[14px] text-center">Package</div>
                    <div className="font-bold text-[#444] text-[14px] text-center">Offer Date</div>
                    <div className="font-bold text-[#444] text-[14px] text-center">Joining Date</div>
                    <div className="font-bold text-[#444] text-[14px] text-center">Status</div>
                </div>

                {/* Table Rows */}
                <div className="flex flex-col">
                    {placementRecords.map((app, index) => (
                        <div
                            key={index}
                            className={`grid grid-cols-6 gap-4 px-8 py-[22px] items-center bg-[#ece6da] border-b border-[#c4bcae]/30 ${index % 2 === 0 ? 'bg-[#e2dacb]' : 'bg-[#ece6da]'}`}
                        >
                            <div className="flex items-center gap-4 col-span-1">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${app.iconBg} ${app.iconText}`}>
                                    <FaBuilding size={18} />
                                </div>
                                <span className="font-bold text-[#222] text-[14.5px] lg:text-[15.5px] whitespace-nowrap">{app.company}</span>
                            </div>

                            <div className="text-[#555] text-[14px] lg:text-[15px] text-center whitespace-nowrap overflow-hidden text-ellipsis px-1">
                                {app.role}
                            </div>

                            <div className="font-[800] text-[#333] text-[14px] lg:text-[15px] text-center whitespace-nowrap">
                                {app.package}
                            </div>

                            <div className="text-[#666] text-[14px] lg:text-[15px] text-center whitespace-nowrap">
                                {app.offerDate}
                            </div>

                            <div className="text-[#666] text-[14px] lg:text-[15px] text-center whitespace-nowrap">
                                {app.joiningDate}
                            </div>

                            <div className="flex justify-center">
                                <span className={`inline-flex items-center gap-2 px-2 lg:px-3 py-[6px] rounded-full text-[12px] lg:text-[13px] font-[700] ${app.statusBg} ${app.statusText}`}>
                                    <app.StatusIcon size={11} />
                                    {app.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Placement_history;